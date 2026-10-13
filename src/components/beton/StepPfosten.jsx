import React from 'react'
import Step from '../shared/Step.jsx'
import ColorPills from '../shared/ColorPills.jsx'
import Counter from '../shared/Counter.jsx'
import { COLORS } from '../../data/betonData.js'
import { calcSections, calcPfosten } from '../../utils/calculations.js'
import { INFO } from '../../data/infoTexts.js'
import InfoTip from '../shared/InfoTip.jsx'

export default function StepPfosten({ state }) {
  const {
    laenge, buildHeight, eckpfosten, endpfosten,
    postenFarbe, setPostenFarbe, setEckpfosten, setEndpfosten,
    kabelkanal, setKabelkanal,
  } = state

  return (
    <Step num="05" title="Pfosten" info={INFO.pfosten} sub="Eck- und Endpfosten für Ihr Projekt">
      <div className="label-row">
        <span className="field-label">Pfosten Farbe</span>
        <span className="field-val">{postenFarbe}</span>
      </div>
      <ColorPills
        colors={COLORS}
        activeId={postenFarbe}
        onSelect={setPostenFarbe}
      />

      <div className="counter-grid" style={{ marginTop: '1rem' }}>
        <Counter
          label="Eckpfosten"
          info={INFO.eckpfosten}
          sub="für 90°-Ecken"
          value={eckpfosten}
          min={0}
          onChange={setEckpfosten}
        />
        <Counter
          label="Endpfosten"
          info={INFO.endpfosten}
          sub="mind. 2 (immer gerade)"
          value={endpfosten}
          min={2}
          isEnd
          onChange={setEndpfosten}
        />
      </div>

      <div className="info-note visible" style={{ marginTop: '.6rem' }}>
        Wie viele Ecken hat Ihr Zaun? Geben Sie die Anzahl der Eckpfosten für 90°-Kurven an.
      </div>

      {/* Kabelkanalzwischenpfosten */}
      <div className="kabelkanal-box" style={{ marginTop: '1.1rem' }}>
        <div className="kabelkanal-header">
          <span className="kabelkanal-icon">💡</span>
          <div>
            <div className="kabelkanal-title">Kabelkanalzwischenpfosten <InfoTip {...INFO.kabelkanal} /></div>
            <div className="kabelkanal-desc">
              Spezialpfosten mit integriertem Kabelkanal — ideal für Beleuchtung entlang des Zauns.
              Wählen Sie, wie viele dieser Pfosten Sie in Ihrem Projekt benötigen.
              Sie ersetzen entsprechende Zwischenpfosten.
            </div>
          </div>
        </div>
        <div style={{ marginTop: '.75rem' }}>
          <Counter
            label="Kabelkanalzwischenpfosten"
            sub="ersetzt Zwischenpfosten"
            value={kabelkanal}
            min={0}
            onChange={(val) => setKabelkanal(Math.max(0, val))}
          />
        </div>
        {kabelkanal > 0 && (
          <div className="calc-note" style={{ marginTop: '.5rem' }}>
            → {kabelkanal} Kabelkanal · verbleibende Zwischenpfosten werden automatisch angepasst
          </div>
        )}
      </div>
    </Step>
  )
}
