import React, { useState, useMemo } from 'react'
import { createPortal } from 'react-dom'
import { buildBetonLineItems } from '../utils/cart.js'
import { buildHolzLineItems }  from '../utils/cart.js'
import { addToShopifyCart }    from '../utils/cart.js'
import { useShopifyPrices, calcTotal } from '../hooks/useShopifyPrice.js'

export default function PriceBar({ activeType, betonState, holzState }) {
  const [expanded,  setExpanded]  = useState(false)
  const [adding,    setAdding]    = useState(false)
  const [cartError, setCartError] = useState(null)

  const { priceFn, loading } = useShopifyPrices()

  const { items } = useMemo(() => {
    if (activeType === 'beton') return buildBetonLineItems(betonState)
    return buildHolzLineItems(holzState)
  }, [activeType, betonState, holzState])

  const shopifyItems = useMemo(() => items.filter(i => i.variantId), [items])
  const fixedItems   = useMemo(() => items.filter(i => !i.variantId && i.fixedPrice != null), [items])

  const total    = calcTotal(items, priceFn)
  const hasTotal = items.some(i => i.fixedPrice != null || priceFn(i.variantId) != null)

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
      properties[i.label] = `${(i.fixedPrice * i.qty).toLocaleString('de-DE', { minimumFractionDigits: 2 })} €`
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
    : hasTotal
      ? total.toLocaleString('de-DE', { minimumFractionDigits: 2 }) + ' €'
      : '— €'

  return createPortal(
    <div className="price-bar">
      <div className="price-bar-inner">

        {/* Expandable breakdown */}
        <div className={`price-breakdown ${expanded ? 'expanded' : ''}`}>
          {items.map((item, i) => {
            const linePrice = item.fixedPrice != null
              ? item.fixedPrice * item.qty
              : priceFn(item.variantId) != null
                ? priceFn(item.variantId) * item.qty
                : null
            return (
              <div key={i} className="price-line">
                <span>{item.label} × {item.qty}</span>
                <span>
                  {linePrice != null
                    ? linePrice.toLocaleString('de-DE', { minimumFractionDigits: 2 }) + ' €'
                    : loading ? '…' : '—'}
                </span>
              </div>
            )
          })}
        </div>

        {/* Total row */}
        <div className="price-total-row" onClick={() => setExpanded(e => !e)} style={{ cursor: 'pointer' }}>
          <div>
            <div className="price-label">
              Geschätzter Gesamtpreis {items.length > 0 && (
                <span style={{ fontSize: '.65rem', color: 'var(--gray-400)' }}>{expanded ? '▲' : '▼'}</span>
              )}
            </div>
            <div className="price-note">inkl. MwSt., zzgl. Lieferung</div>
          </div>
          <div className="price-amount">{priceDisplay}</div>
        </div>

        {cartError && (
          <div style={{ fontSize: '.75rem', color: '#dc2626', textAlign: 'center' }}>
            {cartError}
          </div>
        )}

        <button className="cta-btn" onClick={handleAddToCart} disabled={adding}>
          <span>{adding ? 'Wird hinzugefügt…' : 'In den Warenkorb'}</span>
          {!adding && <span className="cta-arrow">→</span>}
        </button>

        <div className="price-disclaimer">* Preise inkl. MwSt.</div>
      </div>
    </div>,
    document.body
  )
}
