/**
 * Capture the advertising parameters of the visit so a lead can be matched
 * back to the click that produced it.
 *
 * The parameters only ride along on the first page of a visit, but the
 * customer may configure and send the form minutes later on another page, so
 * the first page that loads the configurator stores them and every later
 * request reuses them.
 *
 * Stored in localStorage for 90 days — the usual Google Ads lookback window.
 * A new click (new gclid/gbraid/wbraid or a new utm set) overwrites the old one.
 */

const KEY     = 'betonzaun_attribution'
const MAX_AGE = 90 * 24 * 60 * 60 * 1000 // 90 days

// Click ids of the ad networks, then the campaign tags
const CLICK_IDS = ['gclid', 'gbraid', 'wbraid', 'msclkid', 'fbclid', 'ttclid']
const UTM_KEYS  = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'utm_id']
const ALL_KEYS  = [...CLICK_IDS, ...UTM_KEYS]

function read() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return null
    const data = JSON.parse(raw)
    if (!data || typeof data !== 'object') return null
    if (!data.savedAt || Date.now() - data.savedAt > MAX_AGE) return null
    return data
  } catch {
    return null // private mode, blocked storage, corrupt value
  }
}

function write(data) {
  try {
    localStorage.setItem(KEY, JSON.stringify(data))
  } catch {
    /* storage unavailable — the in-memory copy below still serves this visit */
  }
}

// Survives a blocked localStorage for the length of this page view
let memory = null

/**
 * Read the ad parameters off the current URL and store them when there are any.
 * Safe to call on every mount.
 */
export function captureAttribution() {
  let params
  try {
    params = new URLSearchParams(window.location.search)
  } catch {
    return
  }

  const found = {}
  for (const key of ALL_KEYS) {
    const value = params.get(key)
    if (value) found[key] = value.slice(0, 200)
  }

  if (Object.keys(found).length === 0) return // ordinary visit, keep what we have

  const data = {
    ...found,
    landingPage: window.location.href.slice(0, 500),
    referrer:    (document.referrer || '').slice(0, 500),
    savedAt:     Date.now(),
  }

  memory = data
  write(data)
}

/**
 * The stored parameters, as flat fields for the lead form.
 * Empty object when the visit carries none.
 */
export function getAttribution() {
  const data = memory || read()
  if (!data) return {}

  const out = {}
  for (const key of ALL_KEYS) {
    if (data[key]) out[key] = data[key]
  }
  if (data.landingPage) out.landing_page = data.landingPage
  if (data.referrer)    out.referrer     = data.referrer
  if (data.savedAt)     out.first_seen   = new Date(data.savedAt).toISOString()
  return out
}

// ─── Google Ads conversion ───────────────────────────────────────────────────

const ADS_SEND_TO   = 'AW-10840469103/NqVECKyCvLAdEO_ckbEo'
const LEAD_SHARE    = 0.2  // lead value = 20 % of the configuration price
const LEAD_FALLBACK = 100  // € when no price is available
const FIRED_KEY     = 'betonzaun_leads_tracked'

/** A unique id per request; also stops a double submit from counting twice. */
export function newRequestId() {
  return 'cfg-' + Date.now()
}

/** Lead value in whole euros from the configurator's numeric total. */
export function leadValueFor(total) {
  const value = Math.round((Number(total) || 0) * LEAD_SHARE)
  return value || LEAD_FALLBACK
}

// Remember tracked request ids for this browser tab, so reopening the
// thank-you, a reload or a second success callback never counts one twice
function alreadyTracked(requestId) {
  if (!requestId) return false
  try {
    const ids = JSON.parse(sessionStorage.getItem(FIRED_KEY) || '[]')
    if (ids.includes(requestId)) return true
    sessionStorage.setItem(FIRED_KEY, JSON.stringify([...ids, requestId].slice(-20)))
  } catch {
    if (alreadyTracked.memory?.has(requestId)) return true
    ;(alreadyTracked.memory ||= new Set()).add(requestId)
  }
  return false
}

/**
 * Tell Google Ads and the analytics layer that a request was really sent.
 *
 * Called ONLY when the thank-you opens after a confirmed send — never on the
 * button click, never when sending fails or the form is invalid.
 *
 * Uses the gtag.js already on the page (Shopify's Google channel); this bundle
 * never loads it, which would double-count. Consent is left to the cookie
 * banner and Google's Consent Mode.
 *
 * @param {{ type: string, total: number, requestId: string }} detail
 */
export function trackLeadSubmitted(detail = {}) {
  const requestId = detail.requestId || newRequestId()
  if (alreadyTracked(requestId)) return

  const leadValue = leadValueFor(detail.total)

  if (typeof window.gtag === 'function') {
    try {
      window.gtag('event', 'conversion', {
        send_to:        ADS_SEND_TO,
        value:          leadValue,
        currency:       'EUR',
        transaction_id: requestId,
      })
    } catch { /* gtag present but broken — nothing more to do here */ }
  } else {
    // No gtag on the page: hand the event to a Shopify custom pixel instead
    try {
      window.Shopify?.analytics?.publish?.('configurator_request_sent', {
        value:      leadValue,
        request_id: requestId,
      })
    } catch { /* not on a Shopify storefront */ }
  }

  // A DOM event for the theme's own tools. Deliberately no dataLayer push:
  // the Google tag reads window.dataLayer too, and an extra event there could
  // count a second conversion.
  const payload = {
    konfigurator: detail.type || '',
    lead_value:   leadValue,
    request_id:   requestId,
    waehrung:     'EUR',
    ...getAttribution(),
  }

  try {
    window.dispatchEvent(new CustomEvent('betonzaun:lead-submitted', { detail: payload }))
  } catch { /* older browser */ }
}
