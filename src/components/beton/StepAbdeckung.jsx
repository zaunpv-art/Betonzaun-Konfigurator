import React from 'react'
import Step from '../shared/Step.jsx'
import TogglePills from '../shared/TogglePills.jsx'
import ColorPills from '../shared/ColorPills.jsx'
import { COLORS } from '../../data/betonData.js'
import { INFO } from '../../data/infoTexts.js'

import { calcSections } from '../../utils/calculations.js'

const OPTIONS = [
  { id: 'none',    label: 'Keine' },
  { id: 'Flach',   label: 'Flach' },
  { id: 'Diamant', label: 'Diamant' },
]

export default function StepAbdeckung({ state }) {
  const {
    abdeckung, abdeckungFarbe, laenge,
    setAbdeckung, setAbdeckungFarbe,
  } = state

  const sections = calcSections(laenge)

  return (
    <Step num="07" title={<>Abdeckungen <span className="optional-badge">Optional</span></>} sub="Abdeckung oben auf jedem Zaunfeld" info={INFO.abdeckung}>
      <TogglePills options={OPTIONS} activeId={abdeckung} onSelect={setAbdeckung} />

      {abdeckung !== 'none' && (
        <>
          <div style={{ marginTop: '.9rem' }}>
            <div className="label-row">
              <span className="field-label">Abdeckungsfarbe</span>
              <span className="field-val">{abdeckungFarbe}</span>
            </div>
            <ColorPills colors={COLORS} activeId={abdeckungFarbe} onSelect={setAbdeckungFarbe} />
          </div>
          <div className="calc-note" style={{ marginTop: '.6rem' }}>
            → {sections} Abdeckung(en) · 1 pro Zaunfeld
          </div>
          <div className="info-note visible" style={{ marginTop: '.5rem' }}>
            Pfostenkappen sind nicht enthalten — bei Bedarf in Schritt 06 wählen.
          </div>
        </>
      )}
    </Step>
  )
}
