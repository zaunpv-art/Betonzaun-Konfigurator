/**
 * Send a consultation request.
 *
 * Default route is Shopify's own contact form (`POST /contact`), so no extra
 * backend is needed: the shop emails the request to the address under
 * Settings → Notifications → "Contact customer" / customer service email.
 * Every `contact[…]` field is listed in that email, which is how the
 * configuration is delivered.
 *
 * The theme can route it somewhere else instead (CRM, Make, Zapier) by setting
 * these before the bundle loads:
 *   window.BETONZAUN_LEAD_ENDPOINT = 'https://hook.example.com/...'
 *   window.BETONZAUN_LEAD_MODE     = 'json'   // posts JSON instead of a form
 */

const DEFAULT_ENDPOINT = '/contact'

const endpoint = () => window.BETONZAUN_LEAD_ENDPOINT || DEFAULT_ENDPOINT
const mode     = () => window.BETONZAUN_LEAD_MODE || (window.BETONZAUN_LEAD_ENDPOINT ? 'json' : 'shopify')

export const privacyUrl = () => window.BETONZAUN_PRIVACY_URL || '/policies/privacy-policy'

/**
 * @param {object} lead  { name, email, phone, plz, message, configText, configFields, attribution, type }
 * @returns {Promise<void>} resolves when the request was accepted, throws otherwise
 */
export async function submitLead(lead) {
  if (mode() === 'json') return submitJson(lead)
  return submitShopifyContact(lead)
}

// ─── Shopify contact form ────────────────────────────────────────────────────

async function submitShopifyContact(lead) {
  const body = new URLSearchParams()
  body.set('form_type', 'contact')
  body.set('utf8', '✓')

  body.set('contact[name]',  lead.name)
  body.set('contact[email]', lead.email)
  body.set('contact[phone]', lead.phone)
  body.set('contact[Postleitzahl]', lead.plz)
  body.set('contact[Anfrage]', 'Beratung zur Konfiguration (Zaun-Konfigurator)')

  // The message plus the full configuration — the body is what the email leads with
  const parts = []
  if (lead.message?.trim()) parts.push(`NACHRICHT\n${lead.message.trim()}`, '')
  parts.push(lead.configText)
  body.set('contact[body]', parts.join('\n'))

  // Ad parameters as their own fields, so they can be copied into the CRM
  for (const [key, value] of Object.entries(lead.attribution || {})) {
    body.set(`contact[${key}]`, value)
  }

  let res
  try {
    res = await fetch(endpoint(), {
      method:  'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
      body:    body.toString(),
    })
  } catch {
    throw new Error('Die Anfrage konnte nicht gesendet werden. Bitte prüfen Sie Ihre Internetverbindung.')
  }

  // Shopify redirects to …?contact_posted=true once the form is accepted.
  // A 200 without it means the form came back with an error, so it is not
  // treated as sent — the customer must never see a thank-you for a lost request.
  const accepted = res.ok && /contact_posted=true/.test(res.url || '')
  if (!accepted) {
    throw new Error('Die Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder rufen Sie uns an.')
  }
}

// ─── Generic JSON endpoint ───────────────────────────────────────────────────

async function submitJson(lead) {
  let res
  try {
    res = await fetch(endpoint(), {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name:    lead.name,
        email:   lead.email,
        phone:   lead.phone,
        plz:     lead.plz,
        message: lead.message || '',
        consent: true,
        consentText: lead.consentText,
        consentAt:   new Date().toISOString(),
        type:        lead.type,
        configuration: lead.configFields,
        configurationText: lead.configText,
        attribution: lead.attribution || {},
        page: window.location.href,
      }),
    })
  } catch {
    throw new Error('Die Anfrage konnte nicht gesendet werden. Bitte prüfen Sie Ihre Internetverbindung.')
  }

  if (!res.ok) {
    throw new Error('Die Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder rufen Sie uns an.')
  }
}
