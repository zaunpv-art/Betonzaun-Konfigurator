import { SECTION_WIDTH_CM } from '../data/betonData.js'

/**
 * Calculate number of fence sections from length in metres.
 * Always rounds UP — we never sell half plates.
 */
export function calcSections(laengeM) {
  const laengeCm = laengeM * 100
  return Math.ceil(laengeCm / SECTION_WIDTH_CM)
}

/**
 * Calculate pfosten distribution.
 *
 * Rules:
 * - suggested zwischenpfosten = sections + 1
 * - each eckpfosten replaces 1 zwischenpfosten
 * - every 2 endpfosten replace 1 zwischenpfosten (1 → 0, 2 → 1, 3 → 1, 4 → 2 …)
 * - zwischenDelta: the customer's manual adjustment on top of the suggestion
 * - zwischenpfosten never goes below 0
 */
export function calcPfosten(sections, eckpfosten, endpfosten, zwischenDelta = 0) {
  const autoZwischen = Math.max(0, sections + 1 - eckpfosten - Math.floor(endpfosten / 2))
  const zwischen     = Math.max(0, autoZwischen + zwischenDelta)
  return {
    zwischen,
    autoZwischen,
    eck: eckpfosten,
    end: endpfosten,
    total: zwischen + eckpfosten + endpfosten,
  }
}
