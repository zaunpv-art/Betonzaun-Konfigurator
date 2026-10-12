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
 * - zwischenpfosten = sections - 1
 * - subtract eckpfosten from zwischenpfosten
 * - for every 2 extra endpfosten above 2, subtract 1 zwischenpfosten
 * - zwischenpfosten never goes below 0
 */
export function calcPfosten(sections, eckpfosten, endpfosten) {
  let zwischen = sections - 1
  zwischen = Math.max(0, zwischen - eckpfosten)
  const extraEnd = Math.max(0, endpfosten - 2)
  zwischen = Math.max(0, zwischen - Math.floor(extraEnd / 2))
  return {
    zwischen,
    eck: eckpfosten,
    end: endpfosten,
    total: zwischen + eckpfosten + endpfosten,
  }
}

/**
 * Enforce endpfosten rules:
 * - minimum 2
 * - if > 2 must be even
 */
export function normaliseEndpfosten(val, direction = 1) {
  let v = Math.max(2, val)
  if (v > 2 && v % 2 !== 0) {
    v = direction >= 0 ? v + 1 : v - 1
    v = Math.max(2, v)
  }
  return v
}
