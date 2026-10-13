import React from 'react'
import Step from '../shared/Step.jsx'
import ColorPills from '../shared/ColorPills.jsx'
import PfostenCounters from '../shared/PfostenCounters.jsx'
import { COLORS } from '../../data/betonData.js'
import { INFO } from '../../data/infoTexts.js'

export default function StepPfosten({ state }) {
  const {
    postenFarbe, setPostenFarbe,
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
    </Step>
  )
}
