import React from 'react'
import Counter from './Counter.jsx'
import { INFO } from '../../data/infoTexts.js'

/**
 * Zwischen-, Eck- and Endpfosten counters, shared by both configurators.
 * Zwischenpfosten are preselected (sections + 1, adjusted by Eck-/Endpfosten)
 * and can be overridden; Eck- and Endpfosten start at 0 and are free.
 */
export default function PfostenCounters({ state }) {
  const {
    pfosten, eckpfosten, endpfosten,
    setZwischenpfosten, setEckpfosten, setEndpfosten,
  } = state

  const adjusted = pfosten.zwischen !== pfosten.autoZwischen

  return (
    <>
      <div className="counter-zwischen">
        <Counter
          label="Zwischenpfosten"
          sub="zwischen zwei Zaunfeldern"
          info={INFO.zwischenpfosten}
          value={pfosten.zwischen}
          min={0}
          onChange={setZwischenpfosten}
        />
        {adjusted && (
          <button
            type="button"
            className="counter-reset"
            onClick={() => setZwischenpfosten(pfosten.autoZwischen)}
          >
            ↺ Vorschlag übernehmen ({pfosten.autoZwischen})
          </button>
        )}
      </div>

      <div className="counter-grid" style={{ marginTop: '.75rem' }}>
        <Counter
          label="Eckpfosten"
          sub="für 90°-Ecken"
          info={INFO.eckpfosten}
          value={eckpfosten}
          min={0}
          onChange={setEckpfosten}
        />
        <Counter
          label="Endpfosten"
          sub="Zaunende & Tor"
          info={INFO.endpfosten}
          value={endpfosten}
          min={0}
          onChange={setEndpfosten}
        />
      </div>

      <div className="info-note visible" style={{ marginTop: '.6rem' }}>
        Geben Sie die Anzahl Ihrer Eck- und Endpfosten an – die Zwischenpfosten passen sich automatisch an.
      </div>
    </>
  )
}
