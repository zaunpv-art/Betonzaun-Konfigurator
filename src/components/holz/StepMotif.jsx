import React from 'react'
import Step from '../shared/Step.jsx'
import MotifGrid from '../shared/MotifGrid.jsx'
import ColorPills from '../shared/ColorPills.jsx'
import BeidseitigNote from '../shared/BeidseitigNote.jsx'
import { HOLZ_MOTIFS } from '../../data/holzData.js'
import { COLORS } from '../../data/betonData.js'

export default function HolzStepMotif({ state }) {
  const { motif, farbe, seiten, setMotif, setFarbe } = state

  return (
    <Step num="02" title="Beton-Motiv wählen" sub="Motiv und Farbe der Betonplatte (26 cm Sockel)">
      <MotifGrid
        motifs={HOLZ_MOTIFS}
        activeId={motif}
        onSelect={setMotif}
        plateHeight="26"
        farbe={farbe}
        seiten={seiten}
      />
      <BeidseitigNote />

      <div className="label-row" style={{ marginTop: '1rem' }}>
        <span className="field-label">Farbe</span>
        <span className="field-val">{farbe}</span>
      </div>
      <ColorPills
        colors={COLORS}
        activeId={farbe}
        onSelect={setFarbe}
      />
    </Step>
  )
}
