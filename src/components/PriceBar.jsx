import React, { useState, useMemo, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { buildBetonLineItems } from '../utils/cart.js'
import { buildHolzLineItems }  from '../utils/cart.js'
import { addToShopifyCart }    from '../utils/cart.js'
import { useShopifyPrices, calcTotal } from '../hooks/useShopifyPrice.js'

const fmt = n => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €'

/**
 * Compact one-row price bar: total on the left, CTA on the right.
 * The breakdown opens as a sheet above the bar instead of growing the bar.
 * The bar is only shown while `anchorRef` (the configurator layout) is on screen,
 * so it never covers the theme footer or other page sections.
 */
export default function PriceBar({ activeType, betonState, holzState, anchorRef }) {
  const [expanded,  setExpanded]  = useState(false)
  const [adding,    setAdding]    = useState(false)
  const [cartError, setCartError] = useState(null)
  const [inView,    setInView]    = useState(true)

  const { priceFn, loading } = useShopifyPrices()

  const { items } = useMemo(() => {
    if (activeType === 'beton') return buildBetonLineItems(betonState)
    return buildHolzLineItems(holzState)
  }, [activeType, betonState, holzState])

  const shopifyItems = useMemo(() => items.filter(i => i.variantId), [items])
  const fixedItems   = useMemo(() => items.filter(i => !i.variantId && i.fixedPrice != null), [items])

  const total    = calcTotal(items, priceFn)
  const hasTotal = items.some(i => i.fixedPrice != null || priceFn(i.variantId) != null)

  // Show the bar only while the configurator is visible
  useEffect(() => {
    const el = anchorRef?.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: '0px 0px -120px 0px' },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [anchorRef])

  useEffect(() => {
    if (!inView) setExpanded(false)
  }, [inView])

  async function handleAddToCart() {
    if (shopifyItems.length === 0) {
      alert('Bitte treffen Sie zuerst Ihre Auswahl.')
      return
    }

    setAdding(true)
    setCartError(null)

    const properties = {}
    if (activeType === 'beton' && betonState.brilluxColor?.trim()) {
      properties['Brillux Farbnummer'] = betonState.brilluxColor.trim()
    }
    fixedItems.forEach(i => {
      properties[i.label] = fmt(i.fixedPrice * i.qty)
    })

    try {
      await addToShopifyCart(shopifyItems, properties)
      window.location.href = '/cart'
    } catch (err) {
      setCartError(err.message)
      setAdding(false)
    }
  }

  const priceDisplay = loading
    ? 'Laden…'
    : hasTotal ? fmt(total) : '— €'

  return createPortal(
    <>
      {expanded && <div className="price-sheet-backdrop" onClick={() => setExpanded(false)} />}

      <div className={`price-bar ${inView ? '' : 'price-bar-hidden'}`}>
        {/* Breakdown sheet — slides up above the bar */}
        <div className={`price-sheet ${expanded ? 'open' : ''}`} aria-hidden={!expanded}>
          <div className="price-sheet-head">
            <span>Ihre Konfiguration</span>
            <button className="price-sheet-close" onClick={() => setExpanded(false)} aria-label="Schließen">×</button>
          </div>
          <div className="price-sheet-list">
            {items.map((item, i) => {
              const linePrice = item.fixedPrice != null
                ? item.fixedPrice * item.qty
                : priceFn(item.variantId) != null
                  ? priceFn(item.variantId) * item.qty
                  : null
              return (
                <div key={i} className="price-line">
                  <span className="price-line-label">{item.label} <span className="price-line-qty">× {item.qty}</span></span>
                  <span className="price-line-val">
                    {linePrice != null ? fmt(linePrice) : loading ? '…' : '—'}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="price-bar-inner">
          <button
            className="price-summary"
            onClick={() => setExpanded(e => !e)}
            disabled={items.length === 0}
            aria-expanded={expanded}
          >
            <span className="price-amount">{priceDisplay}</span>
            <span className="price-note">
              inkl. MwSt., zzgl. Lieferung
              {items.length > 0 && <span className="price-details-link"> · Details {expanded ? '▾' : '▴'}</span>}
            </span>
          </button>

          <button className="cta-btn" onClick={handleAddToCart} disabled={adding}>
            <span>{adding ? 'Wird hinzugefügt…' : 'In den Warenkorb'}</span>
            {!adding && <span className="cta-arrow">→</span>}
          </button>
        </div>

        {cartError && <div className="price-error">{cartError}</div>}
      </div>
    </>,
    document.body
  )
}
