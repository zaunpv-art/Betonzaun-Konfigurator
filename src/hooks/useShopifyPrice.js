import { useState, useEffect } from 'react'
import {
  PLATE_VARIANTS, PFOSTEN_VARIANTS, KAPPE_VARIANTS, ABDECKUNG_VARIANTS,
  BETON_VARIANT_ID, TOR_VARIANTS, DOPPELFLUGELTOR_VARIANT_ID,
  HOLZ_SICHTSCHUTZ_VARIANTS, HOLZ_ABDECKLEISTUNG_VARIANTS, HOLZ_TOR_VARIANTS,
  HOLZ_PFOSTEN_VARIANTS, HOLZ_TORRAHMEN_VARIANTS, HOLZ_PLATTENKLOBEN_VARIANT_ID,
  HOLZ_BEFESTIGUNGSSET_VARIANT_ID, FARBE_VARIANT_ID,
  MONTAGE_PROFI_VARIANT_ID, MONTAGE_HILFE_VARIANT_ID, MONTAGE_ANFAHRT_VARIANT_ID,
  KABELKANAL_VARIANTS,
} from '../data/variantIds.js'

// ─── COLLECT ALL VARIANT IDs ──────────────────────────────────────────────────
// Walk the entire variantIds map and return every non-empty ID

function collectAllVariantIds() {
  const ids = new Set()
  const add = v => { if (v && v !== '') ids.add(String(v)) }

  // Plates: [plateHeight][motif][seiten][farbe]
  Object.values(PLATE_VARIANTS).forEach(byMotif =>
    Object.values(byMotif).forEach(bySeiten =>
      Object.values(bySeiten).forEach(byFarbe =>
        Object.values(byFarbe).forEach(add)
      )
    )
  )

  // Beton pfosten: [type][height][farbe]
  Object.values(PFOSTEN_VARIANTS).forEach(byHeight =>
    Object.values(byHeight).forEach(byFarbe =>
      Object.values(byFarbe).forEach(add)
    )
  )

  // Kappen: [type][shape][farbe]
  Object.values(KAPPE_VARIANTS).forEach(byShape =>
    Object.values(byShape).forEach(byFarbe =>
      Object.values(byFarbe).forEach(add)
    )
  )

  // Abdeckungen: [shape][farbe]
  Object.values(ABDECKUNG_VARIANTS).forEach(byFarbe =>
    Object.values(byFarbe).forEach(add)
  )

  // Beton tor: [size][farbe]
  Object.values(TOR_VARIANTS).forEach(byFarbe =>
    Object.values(byFarbe).forEach(add)
  )
  add(DOPPELFLUGELTOR_VARIANT_ID)

  // Holz Sichtschutz: [material][cm]
  Object.values(HOLZ_SICHTSCHUTZ_VARIANTS).forEach(byCm =>
    Object.values(byCm).forEach(add)
  )

  // Holz Abdeckleistung: [material]
  Object.values(HOLZ_ABDECKLEISTUNG_VARIANTS).forEach(add)

  // Holz Tor: [material][size]
  Object.values(HOLZ_TOR_VARIANTS).forEach(bySize =>
    Object.values(bySize).forEach(add)
  )

  // Holz Torrahmen: [material]
  Object.values(HOLZ_TORRAHMEN_VARIANTS).forEach(add)

  // Holz Pfosten: [type][key][farbe]
  Object.values(HOLZ_PFOSTEN_VARIANTS).forEach(byKey =>
    Object.values(byKey).forEach(byFarbe =>
      Object.values(byFarbe).forEach(add)
    )
  )

  // Single variants
  add(BETON_VARIANT_ID)
  add(HOLZ_PLATTENKLOBEN_VARIANT_ID)
  add(HOLZ_BEFESTIGUNGSSET_VARIANT_ID)
  add(FARBE_VARIANT_ID)
  add(MONTAGE_PROFI_VARIANT_ID)
  add(MONTAGE_HILFE_VARIANT_ID)
  add(MONTAGE_ANFAHRT_VARIANT_ID)

  // Kabelkanalzwischenpfosten
  Object.values(KABELKANAL_VARIANTS).forEach(byFarbe =>
    Object.values(byFarbe).forEach(add)
  )

  return [...ids]
}

// ─── FETCH WITH CONCURRENCY POOL ─────────────────────────────────────────────
// Cap parallel requests at 6 to avoid hammering the server

async function fetchVariantPrice(variantId) {
  try {
    const res = await fetch(`/variants/${variantId}.js`)
    if (!res.ok) return null
    const data = await res.json()
    return data.price / 100  // Shopify returns price in cents
  } catch {
    return null
  }
}

async function fetchAllPrices(ids, concurrency = 6) {
  const results = {}
  const queue   = [...ids]

  async function worker() {
    while (queue.length > 0) {
      const id    = queue.shift()
      const price = await fetchVariantPrice(id)
      if (price !== null) results[id] = price
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(concurrency, ids.length) }, () => worker())
  )

  return results
}

// ─── MODULE-LEVEL CACHE ───────────────────────────────────────────────────────
// Fetched once on first render, reused across all components for the session

let priceCache   = null
let fetchPromise = null

function getPrices() {
  if (priceCache)   return Promise.resolve(priceCache)
  if (!fetchPromise) {
    fetchPromise = fetchAllPrices(collectAllVariantIds()).then(results => {
      priceCache = results
      return results
    })
  }
  return fetchPromise
}

// ─── MAIN HOOK ────────────────────────────────────────────────────────────────

/**
 * useShopifyPrices()
 *
 * Returns:
 *   priceFn(variantId) → price in € (number) or null if not loaded yet
 *   loading            → true while initial fetch is in progress
 */
export function useShopifyPrices() {
  const [prices,  setPrices]  = useState(priceCache || {})
  const [loading, setLoading] = useState(!priceCache)

  useEffect(() => {
    if (priceCache) {
      setPrices(priceCache)
      setLoading(false)
      return
    }
    setLoading(true)
    getPrices().then(p => {
      setPrices(p)
      setLoading(false)
    })
  }, [])

  function priceFn(variantId) {
    if (!variantId) return null
    return prices[String(variantId)] ?? null
  }

  return { priceFn, loading }
}

/**
 * calcTotal(lineItems, priceFn)
 * Sums up the total price for a list of line items.
 * Items with fixedPrice use that; others use priceFn.
 */
export function calcTotal(lineItems, priceFn) {
  return lineItems.reduce((sum, item) => {
    if (item.fixedPrice != null) return sum + item.fixedPrice * item.qty
    const p = priceFn(item.variantId)
    return p != null ? sum + p * item.qty : sum
  }, 0)
}
