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

/**
 * Tell the analytics layer that a request was really sent.
 * Fires only from the success state, never on a click or a failed submit, so
 * the conversion counted in Google Ads is a request that actually arrived.
 */
export function trackLeadSubmitted(detail = {}) {
  const payload = {
    event:          'beratung_anfrage',
    konfigurator:   detail.type || '',
    konfig_wert:    detail.value ?? null,
    waehrung:       'EUR',
    ...getAttribution(),
  }

  try {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push(payload)
  } catch { /* no dataLayer on the page */ }

  try {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'generate_lead', {
        currency: 'EUR',
        value:    detail.value ?? 0,
        lead_source: 'Konfigurator',
      })
    }
  } catch { /* gtag not loaded */ }

  // Lets the theme hook in its own tracking without touching this bundle
  try {
    window.dispatchEvent(new CustomEvent('betonzaun:lead-submitted', { detail: payload }))
  } catch { /* older browser */ }
}
