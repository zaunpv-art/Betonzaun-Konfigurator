import React from 'react'
import Step from '../shared/Step.jsx'
import ColorPills from '../shared/ColorPills.jsx'
import { COLORS } from '../../data/betonData.js'

export default function StepFarbe({ state }) {
  const { farbe, allowedColors, seiten, setFarbe } = state
  const disabledIds = COLORS.map(c => c.id).filter(id => !allowedColors.includes(id))

  return (
    <Step num="04" title="Farbe" sub="Wählen Sie die Farbe Ihrer Platten">
      <ColorPills
        colors={COLORS}
        activeId={farbe}
        disabledIds={disabledIds}
        onSelect={setFarbe}
      />
      {seiten === 'einseitig' && (
        <div className="info-note visible">
          Einseitig ist nur in Naturgrau verfügbar.
        </div>
      )}
    </Step>
  )
}
