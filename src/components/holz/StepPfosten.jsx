import React from 'react'
import Step from '../shared/Step.jsx'
import ColorPills from '../shared/ColorPills.jsx'
import PfostenCounters from '../shared/PfostenCounters.jsx'
import { COLORS as ALL_COLORS } from '../../data/holzData.js'
import { INFO } from '../../data/infoTexts.js'

const COLORS = ALL_COLORS.filter(c => c.id !== 'Anthrazit')

export default function HolzStepPfosten({ state }) {
  const {
    postenFarbe, setPostenFarbe,
  } = state

  return (
    <Step num="06" title="Pfosten" sub="Zwischen-, Eck- und Endpfosten für Ihr Projekt" info={INFO.holzPfosten}>
      <div className="label-row">
        <span className="field-label">Pfosten Farbe</span>
        <span className="field-val">{postenFarbe}</span>
      </div>
      <ColorPills colors={COLORS} activeId={postenFarbe} onSelect={setPostenFarbe} />

      <div style={{ marginTop: '1rem' }}>
        <PfostenCounters state={state} />
      </div>
    </Step>
  )
}
