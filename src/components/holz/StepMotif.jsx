import React from 'react'
import Step from '../shared/Step.jsx'
import MotifGrid from '../shared/MotifGrid.jsx'
import TogglePills from '../shared/TogglePills.jsx'
import ColorPills from '../shared/ColorPills.jsx'
import { HOLZ_MOTIFS } from '../../data/holzData.js'
import { COLORS } from '../../data/betonData.js'

export default function HolzStepMotif({ state }) {
  const { motif, farbe, seiten, setMotif, setFarbe, setSeiten } = state

  return (
    <Step num="02" title="Beton-Motiv wählen" sub="Motiv, Farbe und Ausführung der Betonplatte (26 cm Sockel)">
      <MotifGrid
        motifs={HOLZ_MOTIFS}
        activeId={motif}
        onSelect={setMotif}
        plateHeight="26"
        farbe={farbe}
        seiten={seiten}
      />

      <div className="label-row" style={{ marginTop: '1.1rem' }}>
        <span className="field-label">Seitenausführung</span>
      </div>
      <TogglePills
        options={[
          { id: 'beidseitig', label: 'Beidseitig' },
          { id: 'einseitig',  label: 'Einseitig'  },
        ]}
        activeId={seiten}
        onSelect={setSeiten}
      />

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
