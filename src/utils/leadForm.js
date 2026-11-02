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
 * @returns {Promise<{sent: true} | {redirecting: true}>}
 *   sent        — accepted, show the thank-you now
 *   redirecting — the page is being submitted; the thank-you follows on return
 *   throws when the request could not be sent
 */
export async function submitLead(lead) {
  if (mode() === 'json') { await submitJson(lead); return { sent: true } }
  return submitShopifyContact(lead)
}

// ─── Shopify contact form ────────────────────────────────────────────────────

// Set right before the page-level fallback submit, read back when Shopify
// redirects to ?contact_posted=true (see takeConfirmedLead)
const PENDING_KEY = 'betonzaun_lead_pending'
const PENDING_MAX_AGE = 30 * 60 * 1000 // a captcha may take a while

function shopifyFields(lead) {
  const fields = [
    ['form_type', 'contact'],
    ['utf8', '✓'],
    ['contact[name]',  lead.name],
    ['contact[email]', lead.email],
    ['contact[phone]', lead.phone],
    ['contact[Postleitzahl]', lead.plz],
    ['contact[Anfrage]', 'Beratung zur Konfiguration (Zaun-Konfigurator)'],
  ]

  // The message plus the full configuration — the body is what the email leads with
  const parts = []
  if (lead.message?.trim()) parts.push(`NACHRICHT\n${lead.message.trim()}`, '')
  parts.push(lead.configText)
  fields.push(['contact[body]', parts.join('\n')])

  // Ad parameters as their own fields, so they can be copied into the CRM
  for (const [key, value] of Object.entries(lead.attribution || {})) {
    fields.push([`contact[${key}]`, value])
  }
  return fields
}

/**
 * First try in the background, so the customer stays in the configurator.
 * Shopify confirms with a redirect to …?contact_posted=true.
 *
 * Shops with spam protection (hCaptcha on the contact form) do not accept a
 * background submit: Shopify answers with its /challenge page instead. Then
 * the same fields are posted as a normal page submit, so Shopify can show the
 * captcha and redirect back to the configurator with ?contact_posted=true.
 * The thank-you and the conversion only appear after that confirmed return.
 *
 * @returns {{ sent: true } | { redirecting: true }}
 */
async function submitShopifyContact(lead) {
  const fields = shopifyFields(lead)

  let res
  try {
    res = await fetch(endpoint(), {
      method:  'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
      body:    new URLSearchParams(fields).toString(),
    })
  } catch {
    throw new Error('Die Anfrage konnte nicht gesendet werden. Bitte prüfen Sie Ihre Internetverbindung.')
  }

  if (res.ok && /contact_posted=true/.test(res.url || '')) return { sent: true }

  // Not confirmed in the background (captcha or another check) — hand over to
  // a normal page submit, which Shopify handles the same way as its own form
  console.warn('[Beratung] Shopify did not confirm the background submit, using a page submit instead.',
    { status: res.status, url: res.url })
  postAsPage(fields, lead.pending)
  return { redirecting: true }
}

function postAsPage(fields, pending) {
  try {
    sessionStorage.setItem(PENDING_KEY, JSON.stringify({ ...pending, at: Date.now() }))
  } catch { /* storage blocked — the thank-you then shows without the e-mail line */ }

  const form = document.createElement('form')
  form.method = 'POST'
  form.action = endpoint()
  form.acceptCharset = 'UTF-8'
  form.style.display = 'none'
  for (const [name, value] of fields) {
    const input = document.createElement('input')
    input.type  = 'hidden'
    input.name  = name
    input.value = value ?? ''
    form.appendChild(input)
  }
  document.body.appendChild(form)
  form.submit()
}

/**
 * After a page submit Shopify sends the customer back with ?contact_posted=true.
 * Returns the stored request details exactly once (then clears them and the
 * URL parameter), or null when this page load is not such a confirmed return.
 */
export function takeConfirmedLead() {
  let params
  try { params = new URLSearchParams(window.location.search) } catch { return null }
  if (params.get('contact_posted') !== 'true') return null

  let pending = null
  try {
    pending = JSON.parse(sessionStorage.getItem(PENDING_KEY) || 'null')
    sessionStorage.removeItem(PENDING_KEY)
  } catch { /* storage blocked */ }

  // Only a return from OUR request counts — not the theme's own contact form
  if (!pending || Date.now() - pending.at > PENDING_MAX_AGE) return null

  // Clean the URL so a reload does not count the request twice
  try {
    params.delete('contact_posted')
    const qs = params.toString()
    const hash = /^#contact_form$/.test(window.location.hash) ? '' : window.location.hash
    window.history.replaceState(null, '', window.location.pathname + (qs ? `?${qs}` : '') + hash)
  } catch { /* old browser */ }

  return pending
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
