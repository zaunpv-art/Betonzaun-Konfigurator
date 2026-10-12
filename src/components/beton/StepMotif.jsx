import React from 'react'
import Step from '../shared/Step.jsx'
import MotifGrid from '../shared/MotifGrid.jsx'
import BeidseitigNote from '../shared/BeidseitigNote.jsx'
import { BETON_MOTIFS, MOTIFS_BY_PLATE } from '../../data/betonData.js'

export default function StepMotif({ state }) {
  const { motif, plateHeight, farbe, seiten, setMotif } = state
  const available = MOTIFS_BY_PLATE[plateHeight] || []
  const disabled  = BETON_MOTIFS.map(m => m.id).filter(id => !available.includes(id))

  return (
    <Step num="01" title="Motiv wählen" sub="Wählen Sie Ihr gewünschtes Betonzaun-Motiv">
      <MotifGrid
        motifs={BETON_MOTIFS}
        activeId={motif}
        disabledIds={disabled}
        onSelect={setMotif}
        plateHeight={plateHeight}
        farbe={farbe}
        seiten={seiten}
      />
      <BeidseitigNote />
    </Step>
  )
}
