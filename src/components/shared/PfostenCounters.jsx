import React from 'react'
import Counter from './Counter.jsx'
import { INFO } from '../../data/infoTexts.js'

/**
 * Zwischen-, Eck- and Endpfosten counters, shared by both configurators.
 * Zwischenpfosten are preselected (sections + 1, adjusted by Eck-/Endpfosten)
 * and can be overridden; Eck- and Endpfosten start at 0 and are free.
 * Kabelkanalzwischenpfosten sit next to Zwischenpfosten when the configurator
 * offers them (Betonzaun only).
 */
export default function PfostenCounters({ state }) {
  const {
    pfosten, eckpfosten, endpfosten,
    setZwischenpfosten, setEckpfosten, setEndpfosten,
    kabelkanal, setKabelkanal,
  } = state

  const adjusted = pfosten.zwischen !== pfosten.autoZwischen

  return (
    <>
      <div className="counter-grid">
        <div className="counter-cell">
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
        {setKabelkanal && (
          <Counter
            label={<>Kabelkanal&shy;zwischenpfosten</>}
            sub="ersetzt Zwischenpfosten"
            info={INFO.kabelkanal}
            value={kabelkanal}
            min={0}
            onChange={setKabelkanal}
          />
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
    </>
  )
}
