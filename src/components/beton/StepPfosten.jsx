import React from 'react'
import Step from '../shared/Step.jsx'
import ColorPills from '../shared/ColorPills.jsx'
import Counter from '../shared/Counter.jsx'
import PfostenCounters from '../shared/PfostenCounters.jsx'
import { COLORS } from '../../data/betonData.js'
import { INFO } from '../../data/infoTexts.js'
import InfoTip from '../shared/InfoTip.jsx'

export default function StepPfosten({ state }) {
  const {
    postenFarbe, setPostenFarbe,
    kabelkanal, setKabelkanal,
  } = state

  return (
    <Step num="05" title="Pfosten" info={INFO.pfosten} sub="Zwischen-, Eck- und Endpfosten für Ihr Projekt">
      <div className="label-row">
        <span className="field-label">Pfosten Farbe</span>
        <span className="field-val">{postenFarbe}</span>
      </div>
      <ColorPills
        colors={COLORS}
        activeId={postenFarbe}
        onSelect={setPostenFarbe}
      />

      <div style={{ marginTop: '1rem' }}>
        <PfostenCounters state={state} />
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
