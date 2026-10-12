import React, { useState, useEffect, useMemo } from 'react'
import TypeSwitcher from './components/TypeSwitcher.jsx'
import BetonKonfigurator from './components/beton/BetonKonfigurator.jsx'
import HolzKonfigurator from './components/holz/HolzKonfigurator.jsx'
import PriceBar from './components/PriceBar.jsx'
import GalleryPanel from './components/GalleryPanel.jsx'
import { useBetonState } from './hooks/useBetonState.js'
import { useHolzState } from './hooks/useHolzState.js'
import { buildBetonLineItems, buildHolzLineItems } from './utils/cart.js'
import { useShopifyPrices } from './hooks/useShopifyPrice.js'

// Valid values for URL params
const BETON_MOTIFS   = ['Fels','Nostalgie','Romania','Schiefer','Holzoptik','Modern','Mosaik','Lamella','Mikado']
const HOLZ_MATERIALS = ['RedClass','Kiefer','KieferBlack']

/**
 * Parse the URL hash into { type, param }
 *
 * Supported formats:
 *   #betonzaun            → type='beton'
 *   #betonzaun/Fels       → type='beton', param='Fels'  (preselect motif)
 *   #holz                 → type='holz'
 *   #holz/RedClass        → type='holz',  param='RedClass' (preselect material)
 */
function parseHash(hash) {
  const raw    = hash.replace(/^#/, '').toLowerCase()
  const parts  = raw.split('/')
  const typeSeg = parts[0]
  const paramSeg = parts[1] || null

  let type  = null
  let param = null

  if (typeSeg === 'betonzaun' || typeSeg === 'beton') {
    type = 'beton'
    // Match param case-insensitively against valid motif IDs
    if (paramSeg) {
      param = BETON_MOTIFS.find(m => m.toLowerCase() === paramSeg) || null
    }
  } else if (typeSeg === 'holz' || typeSeg === 'holz-beton') {
    type = 'holz'
    if (paramSeg) {
      param = HOLZ_MATERIALS.find(m => m.toLowerCase() === paramSeg) || null
    }
  }

  return { type, param }
}

/**
 * Write the current state back to the hash without triggering a navigation.
 */
function updateHash(type, param) {
  const seg   = type === 'beton' ? 'betonzaun' : 'holz'
  const hash  = param ? `#${seg}/${param}` : `#${seg}`
  window.history.replaceState(null, '', hash)
}

export default function App() {
  const [activeType, setActiveType] = useState('beton')
  const betonState = useBetonState()
  const holzState  = useHolzState()

  // ── Read initial hash on mount ──────────────────────────────────────────
  useEffect(() => {
    const { type, param } = parseHash(window.location.hash)

    if (type === 'beton') {
      setActiveType('beton')
      if (param) betonState.setMotif(param)
    } else if (type === 'holz') {
      setActiveType('holz')
      if (param) holzState.setHolzMaterial(param)
    }
    // If no hash, default to beton (already the useState default)
  }, []) // run once on mount

  // ── Listen for hash changes (back/forward, or external link changes) ────
  useEffect(() => {
    function onHashChange() {
      const { type, param } = parseHash(window.location.hash)
      if (type === 'beton') {
        setActiveType('beton')
        if (param) betonState.setMotif(param)
      } else if (type === 'holz') {
        setActiveType('holz')
        if (param) holzState.setHolzMaterial(param)
      }
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [betonState, holzState])

  // ── Keep hash in sync when user changes tab/motif/material ──────────────
  useEffect(() => {
    if (activeType === 'beton') {
      updateHash('beton', betonState.motif)
    } else {
      updateHash('holz', holzState.holzMaterial)
    }
  }, [activeType, betonState.motif, holzState.holzMaterial])

  // ── Tab switch handler ───────────────────────────────────────────────────
  function handleTypeChange(type) {
    setActiveType(type)
  }

  const activeMotif   = activeType === 'beton' ? betonState.motif : holzState.motif
  const activeHolzMat = holzState.holzMaterial

  // Build line items + fetch prices for the gallery component list
  const { items: lineItems } = useMemo(() => {
    try {
      return activeType === 'beton'
        ? buildBetonLineItems(betonState)
        : buildHolzLineItems(holzState)
    } catch { return { items: [] } }
  }, [activeType, betonState, holzState])

  const { priceFn } = useShopifyPrices()

  return (
    <div className="app">
      <TypeSwitcher activeType={activeType} onChange={handleTypeChange} />

      <div className="konfigurator-layout">
        {/* ── Left: sticky gallery ── */}
        <div className="gallery-col">
          <div className="gallery-sticky">
            <GalleryPanel
              activeType={activeType}
              motif={activeMotif}
              holzMaterial={activeHolzMat}
              lineItems={lineItems}
              priceFn={priceFn}
            />
          </div>
        </div>

        {/* ── Right: configurator steps + sticky price bar ── */}
        <div className="konfigurator-col">
          {activeType === 'beton'
            ? <BetonKonfigurator state={betonState} />
            : <HolzKonfigurator  state={holzState}  />
          }
          <PriceBar
            activeType={activeType}
            betonState={betonState}
            holzState={holzState}
          />
        </div>
      </div>
    </div>
  )
}
