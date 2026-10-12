import { calcSections, calcPfosten } from './calculations.js'
import { BETON_BAGS, BUILD_HEIGHTS } from '../data/betonData.js'
import { HOLZ_BETON_BAGS_PER_PFOSTEN } from '../data/holzData.js'
import {
  PLATE_VARIANTS,
  PFOSTEN_VARIANTS,
  KAPPE_VARIANTS,
  ABDECKUNG_VARIANTS,
  BETON_VARIANT_ID,
  TOR_VARIANTS,
  HOLZ_SICHTSCHUTZ_VARIANTS,
  HOLZ_ABDECKLEISTUNG_VARIANTS,
  HOLZ_TOR_VARIANTS,
  HOLZ_PFOSTEN_VARIANTS,
  HOLZ_TORRAHMEN_VARIANTS,
  HOLZ_PLATTENKLOBEN_VARIANT_ID,
  HOLZ_BEFESTIGUNGSSET_VARIANT_ID,
  FARBE_VARIANT_ID,
  MONTAGE_PROFI_VARIANT_ID,
  MONTAGE_HILFE_VARIANT_ID,
  MONTAGE_ANFAHRT_VARIANT_ID,
  KABELKANAL_VARIANTS,
} from '../data/variantIds.js'

// ─── MONTAGE LINE ITEMS ───────────────────────────────────────────────────────
// profi: 1 Shopify item per meter of fence
// hilfe: 1 flat Shopify item (up to 2 days incl. travel & accommodation)
// diy:   nothing

export function calcMontageItems(montage, laenge) {
  const meters = Math.ceil(laenge)
  if (montage === 'profi') {
    return [
      {
        label: `Profimontage (${meters} m)`,
        qty: meters,
        variantId: MONTAGE_PROFI_VARIANT_ID,
      },
      {
        label: 'Anfahrt',
        qty: 1,
        variantId: MONTAGE_ANFAHRT_VARIANT_ID,
      },
    ]
  }
  if (montage === 'hilfe') {
    return [{
      label: 'Montagehilfe (bis 2 Tage inkl. Anfahrt & Unterkunft)',
      qty: 1,
      variantId: MONTAGE_HILFE_VARIANT_ID,
      disclaimer: 'Montagehilfe umfasst bis zu 2 Arbeitstage inkl. Anfahrtskosten und Unterkunft.',
    }]
  }
  return []
}

// ─── FARBE BUCKETS ────────────────────────────────────────────────────────────
// 1 bucket (15L) per 10m, always rounded up
// 0–10m → 1, 11–20m → 2, 21–30m → 3, etc.

function calcFarbeBuckets(laenge) {
  return Math.ceil(laenge / 10)
}

// ─── BETON LINE ITEMS ────────────────────────────────────────────────────────

export function buildBetonLineItems(s) {
  const sections  = calcSections(s.laenge)
  const pfosten   = calcPfosten(sections, s.eckpfosten, s.endpfosten)
  const heightObj = BUILD_HEIGHTS[s.plateHeight]?.find(h => h.cm === s.buildHeight)
  const platesPerSection = heightObj?.plates || 0
  const plateCount = sections * platesPerSection
  const bags = BETON_BAGS[s.buildHeight] || 4

  const items = []

  // 1. Plates
  const plateVariantId = PLATE_VARIANTS[s.plateHeight]?.[s.motif]?.[s.seiten]?.[s.farbe]
  if (plateVariantId) {
    items.push({
      label: `Betonplatte ${s.motif} ${s.plateHeight}cm ${s.seiten} ${s.farbe}`,
      qty: plateCount,
      variantId: plateVariantId,
    })
  }

  // 2. Zwischenpfosten (subtract kabelkanal count)
  const kabelCount   = Math.min(s.kabelkanal || 0, pfosten.zwischen)
  const zwischenRest = pfosten.zwischen - kabelCount
  if (zwischenRest > 0) {
    const v = PFOSTEN_VARIANTS.zwischen?.[s.buildHeight]?.[s.postenFarbe]
    items.push({ label: `Zwischenpfosten H${s.buildHeight} ${s.postenFarbe}`, qty: zwischenRest, variantId: v })
  }

  // 2b. Kabelkanalzwischenpfosten
  if (kabelCount > 0) {
    const v = KABELKANAL_VARIANTS?.[s.buildHeight]?.[s.postenFarbe]
    items.push({ label: `Kabelkanalzwischenpfosten H${s.buildHeight} ${s.postenFarbe}`, qty: kabelCount, variantId: v })
  }

  // 3. Eckpfosten
  if (pfosten.eck > 0) {
    const v = PFOSTEN_VARIANTS.eck?.[s.buildHeight]?.[s.postenFarbe]
    items.push({ label: `Eckpfosten H${s.buildHeight} ${s.postenFarbe}`, qty: pfosten.eck, variantId: v })
  }

  // 4. Endpfosten
  if (pfosten.end > 0) {
    const v = PFOSTEN_VARIANTS.end?.[s.buildHeight]?.[s.postenFarbe]
    items.push({ label: `Endpfosten H${s.buildHeight} ${s.postenFarbe}`, qty: pfosten.end, variantId: v })
  }

  // 5. Kappen
  if (s.kappe !== 'none') {
    if (s.abdeckung === 'none') {
      const v = KAPPE_VARIANTS.abgeschlossen?.[s.kappe]?.[s.kappeFarbe]
      items.push({ label: `Pfostenkappe ${s.kappe} ${s.kappeFarbe}`, qty: pfosten.total, variantId: v })
    } else {
      if (pfosten.eck > 0) {
        const v = KAPPE_VARIANTS.eck?.[s.kappe]?.[s.kappeFarbe]
        items.push({ label: `Eckkappe ${s.kappe} ${s.kappeFarbe}`, qty: pfosten.eck, variantId: v })
      }
      if (pfosten.end > 0) {
        const v = KAPPE_VARIANTS.end?.[s.kappe]?.[s.kappeFarbe]
        items.push({ label: `Endkappe ${s.kappe} ${s.kappeFarbe}`, qty: pfosten.end, variantId: v })
      }
      if (pfosten.zwischen > 0) {
        const v = KAPPE_VARIANTS.zwischen?.[s.kappe]?.[s.kappeFarbe]
        items.push({ label: `Zwischenkappe ${s.kappe} ${s.kappeFarbe}`, qty: pfosten.zwischen, variantId: v })
      }
    }
  }

  // 6. Abdeckungen (1 per section)
  if (s.abdeckung !== 'none') {
    const v = ABDECKUNG_VARIANTS?.[s.abdeckung]?.[s.abdeckungFarbe]
    items.push({ label: `Abdeckung ${s.abdeckung} ${s.abdeckungFarbe}`, qty: sections, variantId: v })
  }

  // 7. Beton
  if (s.beton) {
    const totalBags = bags * pfosten.total
    items.push({ label: `Trockenbeton`, qty: totalBags, variantId: BETON_VARIANT_ID })
  }

  // 8. Tor (Naturgrau or Anthrazit)
  if (s.torSize) {
    const torV = TOR_VARIANTS[s.torSize]?.[s.torFarbe] || TOR_VARIANTS[s.torSize]?.['Naturgrau']
    items.push({ label: `Tor ${s.torSize} cm ${s.torFarbe}`, qty: 1, variantId: torV })
  }

  // 10. Farbe Brillux — 1 bucket (15L) per 10m, only if color number entered
  if (s.brilluxColor?.trim()) {
    const buckets = calcFarbeBuckets(s.laenge)
    items.push({ label: `Farbe Brillux 15L (${buckets} Eimer)`, qty: buckets, variantId: FARBE_VARIANT_ID })
  }

  // 11. Montage
  items.push(...calcMontageItems(s.montage, s.laenge))

  return { items, sections, pfosten, platesPerSection, plateCount, bags }
}

// ─── HOLZ LINE ITEMS ─────────────────────────────────────────────────────────

export function buildHolzLineItems(s) {
  // Guard: material or motif not yet selected
  if (!s.holzMaterial || !s.motif) return { items: [], sections: 0, pfosten: { zwischen: 0, eck: 0, end: 0, total: 0 } }

  const sections = calcSections(s.laenge)
  const pfosten  = calcPfosten(sections, s.eckpfosten, s.endpfosten)

  const items = []

  // 1. Betonplatte 26cm base (1 or 2 per section depending on height config)
  const plateCount     = sections * s.betonPlatten
  const plateSeitenKey = s.seiten || 'beidseitig'
  const plateFarbe     = s.farbe  || 'Naturgrau'
  const plateVar = PLATE_VARIANTS['26']?.[s.motif]?.[plateSeitenKey]?.[plateFarbe]
  if (plateVar) {
    items.push({
      label: `Betonplatte 26cm ${s.motif} ${plateSeitenKey} ${plateFarbe} (Basis)`,
      qty: plateCount,
      variantId: plateVar,
    })
  }

  // 2. Holz-Sichtschutz (1 per section)
  const holzVar = HOLZ_SICHTSCHUTZ_VARIANTS?.[s.holzMaterial]?.[s.holzCm]
  items.push({ label: `Holz-Sichtschutz ${s.holzCm}cm (${s.holzMaterial})`, qty: sections, variantId: holzVar })

  // 3. Befestigungsset Edelstahl — 1 per section, always included with Sichtschutz
  items.push({ label: 'Befestigungsset Edelstahl', qty: sections, variantId: HOLZ_BEFESTIGUNGSSET_VARIANT_ID })

  // 4. Abdeckleistung (1 per section, optional)
  if (s.abdeckleistung) {
    const v = HOLZ_ABDECKLEISTUNG_VARIANTS?.[s.holzMaterial]
    items.push({ label: `Abdeckleistung (${s.holzMaterial})`, qty: sections, variantId: v })
  }

  // 5. Pfosten
  // Key for 206cm builds depends on holzCm: '206-holz150' or '206-holz180'
  // Only Naturgrau and Schwarz available — Anthrazit not offered for holz-beton pfosten
  const holzPfostenKey  = s.buildHeight === '206' ? `206-holz${s.holzCm}` : s.buildHeight
  const holzPostenFarbe = s.postenFarbe === 'Anthrazit' ? 'Naturgrau' : s.postenFarbe

  if (pfosten.zwischen > 0) {
    const v = HOLZ_PFOSTEN_VARIANTS.zwischen?.[holzPfostenKey]?.[holzPostenFarbe]
    items.push({ label: `Zwischenpfosten H${s.buildHeight} ${holzPostenFarbe}`, qty: pfosten.zwischen, variantId: v })
  }
  if (pfosten.eck > 0) {
    const v = HOLZ_PFOSTEN_VARIANTS.eck?.[holzPfostenKey]?.[holzPostenFarbe]
    items.push({ label: `Eckpfosten H${s.buildHeight} ${holzPostenFarbe}`, qty: pfosten.eck, variantId: v })
  }
  if (pfosten.end > 0) {
    const v = HOLZ_PFOSTEN_VARIANTS.end?.[holzPfostenKey]?.[holzPostenFarbe]
    items.push({ label: `Endpfosten H${s.buildHeight} ${holzPostenFarbe}`, qty: pfosten.end, variantId: v })
  }

  // 6. Holz-Tor (optional) — always auto-adds Torrahmen + Plattenkloben
  if (s.torSize) {
    const torV = HOLZ_TOR_VARIANTS?.[s.holzMaterial]?.[s.torSize]
    items.push({ label: `Holz-Tor ${s.torSize}cm (${s.holzMaterial})`, qty: 1, variantId: torV })

    const torrahmenV = HOLZ_TORRAHMEN_VARIANTS?.[s.holzMaterial]
    items.push({ label: `Torrahmen (${s.holzMaterial})`, qty: 1, variantId: torrahmenV })

    items.push({ label: 'Holz-Beton Plattenkloben', qty: 1, variantId: HOLZ_PLATTENKLOBEN_VARIANT_ID })
  }

  // 7. Beton
  if (s.beton) {
    const totalBags = HOLZ_BETON_BAGS_PER_PFOSTEN * pfosten.total
    items.push({ label: `Trockenbeton`, qty: totalBags, variantId: BETON_VARIANT_ID })
  }

  // 8. Montage
  items.push(...calcMontageItems(s.montage, s.laenge))

  return { items, sections, pfosten }
}

// ─── ADD TO SHOPIFY CART ─────────────────────────────────────────────────────

export async function addToShopifyCart(lineItems, properties = {}) {
  const cartItems = lineItems
    .filter(i => i.variantId)
    .map((i, idx) => ({
      id: i.variantId,
      quantity: i.qty,
      ...(idx === 0 && Object.keys(properties).length > 0 ? { properties } : {}),
    }))

  const res = await fetch('/cart/add.js', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items: cartItems }),
  })

  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.description || 'Cart error')
  }

  return res.json()
}
