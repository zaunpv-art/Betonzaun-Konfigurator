import React, { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { buildConfigFields, buildConfigText, fmtPrice } from '../utils/summary.js'
import { submitLead, privacyUrl } from '../utils/leadForm.js'
import { getAttribution, trackLeadSubmitted, newRequestId } from '../utils/tracking.js'

const CONSENT_TEXT =
  'Ich habe die Datenschutzerklärung gelesen und willige ein, dass meine Angaben zur Bearbeitung meiner Anfrage gespeichert und verarbeitet werden. Ich kann diese Einwilligung jederzeit widerrufen.'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/
const PLZ_RE   = /^\d{4,5}$/

function validate(values) {
  const errors = {}
  if (values.name.trim().length < 2)        errors.name  = 'Bitte geben Sie Ihren Namen an.'
  if (!EMAIL_RE.test(values.email.trim()))  errors.email = 'Bitte geben Sie eine gültige E-Mail-Adresse an.'
  if (values.phone.replace(/[^\d]/g, '').length < 6) errors.phone = 'Bitte geben Sie Ihre Telefonnummer an.'
  if (!PLZ_RE.test(values.plz.trim()))      errors.plz   = 'Bitte geben Sie Ihre Postleitzahl an.'
  if (!values.consent)                      errors.consent = 'Bitte stimmen Sie der Datenschutzerklärung zu.'
  return errors
}

/**
 * "Beratung anfragen": the customer's contact details plus the configuration
 * they are looking at. The thank-you state appears only once the request was
 * really accepted — that is the moment the conversion is tracked.
 */
export default function BeratungModal({ open, onClose, activeType, state, items, priceFn, total, hasTotal, confirmed }) {
  const [values, setValues] = useState({ name: '', email: '', phone: '', plz: '', message: '', consent: false })
  const [errors,  setErrors]  = useState({})
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState(null)
  const [sent,    setSent]    = useState(false)
  const [showConfig, setShowConfig] = useState(false)

  const dialogRef = useRef(null)
  const firstRef  = useRef(null)
  const trapRef   = useRef(null)   // honeypot: real people never fill this
  // The parent passes a new onClose on every render; read it through a ref so
  // re-renders (e.g. prices arriving) never reset the form while it is open
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  const configFields = open ? buildConfigFields(activeType, state) : []

  // Reset for a new request, lock the page behind the dialog, focus the first field
  useEffect(() => {
    if (!open) return
    setErrors({}); setSendError(null); setShowConfig(false)
    // Opened by a confirmed return from Shopify's page submit: straight to the thank-you
    setSent(!!confirmed)
    if (confirmed?.email) setValues(v => ({ ...v, email: confirmed.email }))

    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const t = setTimeout(() => firstRef.current?.focus(), 60)

    function onKey(e) { if (e.key === 'Escape') onCloseRef.current() }
    document.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = prev
      document.removeEventListener('keydown', onKey)
      clearTimeout(t)
    }
  }, [open, confirmed])

  if (!open) return null

  function setField(key, value) {
    setValues(v => ({ ...v, [key]: value }))
    setErrors(e => (e[key] ? { ...e, [key]: undefined } : e))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (sending) return

    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length > 0) {
      const firstKey = ['name', 'email', 'phone', 'plz', 'consent'].find(k => found[k])
      document.getElementById(`beratung-${firstKey}`)?.focus()
      return
    }

    if (trapRef.current?.value) { setSent(true); return } // silently drop bots

    setSending(true)
    setSendError(null)

    try {
      const leadType  = activeType === 'beton' ? 'Betonzaun' : 'Holz-Betonzaun'
      const leadTotal = hasTotal ? total : 0   // numeric total from the price calculation
      const requestId = newRequestId()        // Shopify's contact form returns no id of its own

      const result = await submitLead({
        name:    values.name.trim(),
        email:   values.email.trim(),
        phone:   values.phone.trim(),
        plz:     values.plz.trim(),
        message: values.message,
        type:    activeType === 'beton' ? 'Betonzaun' : 'Holz-Betonzaun',
        configFields,
        configText: buildConfigText({ activeType, state, items, priceFn, total, hasTotal }),
        consentText: CONSENT_TEXT,
        attribution: getAttribution(),
        // Kept for the return trip if Shopify needs a page submit (captcha)
        pending: { type: leadType, total: leadTotal, requestId, email: values.email.trim() },
      })

      // The page is being submitted to Shopify; the thank-you follows on return.
      // Keep the button in its sending state until the browser navigates.
      if (result?.redirecting) return

      // Only now: the request is on its way, so the thank-you and the
      // conversion event are both true
      setSent(true)
      setSending(false)
      trackLeadSubmitted({ type: leadType, total: leadTotal, requestId })
    } catch (err) {
      setSendError(err.message)
      setSending(false)
    }
  }

  const field = (key, label, type, extra = {}) => (
    <div className="beratung-field">
      <label htmlFor={`beratung-${key}`}>
        {label} {extra.optional && <span className="beratung-optional">(optional)</span>}
      </label>
      <input
        id={`beratung-${key}`}
        ref={key === 'name' ? firstRef : undefined}
        className={`text-input ${errors[key] ? 'text-input-error' : ''}`}
        type={type}
        value={values[key]}
        autoComplete={extra.autoComplete}
        inputMode={extra.inputMode}
        aria-invalid={errors[key] ? 'true' : undefined}
        aria-describedby={errors[key] ? `beratung-${key}-err` : undefined}
        onChange={e => setField(key, e.target.value)}
      />
      {errors[key] && <div className="beratung-error" id={`beratung-${key}-err`}>{errors[key]}</div>}
    </div>
  )

  return createPortal(
    <div className="beratung-overlay" onMouseDown={e => { if (e.target === e.currentTarget) onClose() }}>
      <div
        className="beratung-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="beratung-title"
        ref={dialogRef}
      >
        <div className="beratung-head">
          <h2 id="beratung-title">{sent ? 'Vielen Dank für Ihre Anfrage' : 'Beratung anfragen'}</h2>
          <button type="button" className="beratung-close" onClick={onClose} aria-label="Schließen">×</button>
        </div>

        {sent ? (
          /* ── Success: shown only after the request was accepted ── */
          <div className="beratung-success" role="status">
            <div className="beratung-success-icon" aria-hidden="true">✓</div>
            <p className="beratung-success-lead">
              Ihre Konfiguration ist bei uns eingegangen.
            </p>
            <p>
              Wir prüfen Ihre Angaben und melden uns per E-Mail
              unter <strong>{values.email.trim()}</strong> oder telefonisch bei Ihnen.
            </p>
            <button type="button" className="cta-btn beratung-submit" onClick={onClose}>
              Zurück zum Konfigurator
            </button>
          </div>
        ) : (
          <form className="beratung-body" onSubmit={handleSubmit} noValidate>
            <p className="beratung-intro">
              Senden Sie uns Ihre Konfiguration – wir prüfen sie und beraten Sie kostenlos.
              Ihre Auswahl wird automatisch mitgeschickt.
            </p>

            {/* What gets sent along, open to inspection */}
            <div className="beratung-config">
              <button
                type="button"
                className="beratung-config-toggle"
                onClick={() => setShowConfig(s => !s)}
                aria-expanded={showConfig}
              >
                <span>Ihre Konfiguration {hasTotal && <strong>· {fmtPrice(total)}</strong>}</span>
                <span className="beratung-config-caret">{showConfig ? '▲' : '▼'}</span>
              </button>
              {showConfig && (
                <dl className="beratung-config-list">
                  {configFields.map(({ label, value }) => (
                    <div className="beratung-config-row" key={label}>
                      <dt>{label}</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>

            <div className="beratung-grid">
              {field('name',  'Name',           'text',  { autoComplete: 'name' })}
              {field('email', 'E-Mail',         'email', { autoComplete: 'email' })}
              {field('phone', 'Telefon',        'tel',   { autoComplete: 'tel' })}
              {field('plz',   'Postleitzahl',   'text',  { autoComplete: 'postal-code', inputMode: 'numeric' })}
            </div>

            <div className="beratung-field">
              <label htmlFor="beratung-message">
                Ihre Nachricht <span className="beratung-optional">(optional)</span>
              </label>
              <textarea
                id="beratung-message"
                className="text-input beratung-textarea"
                rows={3}
                value={values.message}
                placeholder="Gibt es Besonderheiten – Hanglage, Ecken, Wunschtermin?"
                onChange={e => setField('message', e.target.value)}
              />
            </div>

            {/* Honeypot — hidden from people, filled by bots */}
            <input
              ref={trapRef}
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="beratung-trap"
            />

            <div className={`beratung-consent ${errors.consent ? 'has-error' : ''}`}>
              <input
                id="beratung-consent"
                type="checkbox"
                checked={values.consent}
                aria-invalid={errors.consent ? 'true' : undefined}
                aria-describedby={errors.consent ? 'beratung-consent-err' : undefined}
                onChange={e => setField('consent', e.target.checked)}
              />
              <label htmlFor="beratung-consent">
                Ich habe die{' '}
                <a href={privacyUrl()} target="_blank" rel="noopener noreferrer">Datenschutzerklärung</a>{' '}
                gelesen und willige ein, dass meine Angaben zur Bearbeitung meiner Anfrage
                gespeichert und verarbeitet werden. Ich kann diese Einwilligung jederzeit widerrufen.
              </label>
            </div>
            {errors.consent && <div className="beratung-error" id="beratung-consent-err">{errors.consent}</div>}

            {sendError && <div className="beratung-senderror" role="alert">{sendError}</div>}

            <button type="submit" className="cta-btn beratung-submit" disabled={sending}>
              <span>{sending ? 'Wird gesendet…' : 'Anfrage senden'}</span>
              {!sending && <span className="cta-arrow">→</span>}
            </button>

          </form>
        )}
      </div>
    </div>,
    document.body
  )
}
