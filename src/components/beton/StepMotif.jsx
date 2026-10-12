import React from 'react'
import Step from '../shared/Step.jsx'
import MotifGrid from '../shared/MotifGrid.jsx'
import BeidseitigNote from '../shared/BeidseitigNote.jsx'
import { BETON_MOTIFS, MOTIFS_BY_PLATE } from '../../data/betonData.js'
import { hasPlateVariant } from '../../data/variantIds.js'

export default function StepMotif({ state }) {
  const { motif, plateHeight, farbe, seiten, availableMotifs, setMotif } = state
  const disabled  = BETON_MOTIFS.map(m => m.id).filter(id => !availableMotifs.includes(id))

  // Tell the customer where a greyed-out motif is available instead
  const other = plateHeight === '26' ? '36' : '26'
  const hints = Object.fromEntries(disabled.map(id => [
    id,
    MOTIFS_BY_PLATE[other]?.includes(id) && hasPlateVariant(other, id)
      ? `nur ${other} cm`
      : 'bald verfügbar',
  ]))

  return (
    <Step num="01" title="Motiv wählen" sub="Wählen Sie Ihr gewünschtes Betonzaun-Motiv">
      <MotifGrid
        motifs={BETON_MOTIFS}
        activeId={motif}
        disabledIds={disabled}
        hints={hints}
        onSelect={setMotif}
        plateHeight={plateHeight}
        farbe={farbe}
        seiten={seiten}
      />
      <BeidseitigNote />
    </Step>
  )
}
