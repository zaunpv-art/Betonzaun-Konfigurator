import React from 'react'
import Step from '../shared/Step.jsx'
import TogglePills from '../shared/TogglePills.jsx'
import ColorPills from '../shared/ColorPills.jsx'
import { COLORS } from '../../data/betonData.js'
import { INFO } from '../../data/infoTexts.js'

const KAPPE_OPTIONS = [
  { id: 'none',    label: 'Keine Kappen' },
  { id: 'Flach',   label: 'Flach' },
  { id: 'Diamant', label: 'Diamant' },
]

export default function StepKappe({ state }) {
  const { kappe, kappeFarbe, setKappe, setKappeFarbe } = state

  return (
    <Step num="06" title={<>Pfostenkappen <span className="optional-badge">Optional</span></>} sub="Abschluss für jeden Pfosten" info={INFO.kappen}>
      <TogglePills options={KAPPE_OPTIONS} activeId={kappe} onSelect={setKappe} />

      {kappe !== 'none' && (
        <div style={{ marginTop: '.9rem' }}>
          <div className="label-row">
            <span className="field-label">Kappenfarbe</span>
            <span className="field-val">{kappeFarbe}</span>
          </div>
          <ColorPills colors={COLORS} activeId={kappeFarbe} onSelect={setKappeFarbe} />
        </div>
      )}
    </Step>
  )
}
