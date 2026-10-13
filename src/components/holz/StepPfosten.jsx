import React from 'react'
import Step from '../shared/Step.jsx'
import ColorPills from '../shared/ColorPills.jsx'
import Counter from '../shared/Counter.jsx'
import { COLORS as ALL_COLORS } from '../../data/holzData.js'
import { INFO } from '../../data/infoTexts.js'

const COLORS = ALL_COLORS.filter(c => c.id !== 'Anthrazit')

export default function HolzStepPfosten({ state }) {
  const {
    laenge, eckpfosten, endpfosten, postenFarbe,
    setPostenFarbe, setEckpfosten, setEndpfosten,
  } = state

  return (
    <Step num="06" title="Pfosten" sub="Eck- und Endpfosten für Ihr Projekt" info={INFO.holzPfosten}>
      <div className="label-row">
        <span className="field-label">Pfosten Farbe</span>
        <span className="field-val">{postenFarbe}</span>
      </div>
      <ColorPills colors={COLORS} activeId={postenFarbe} onSelect={setPostenFarbe} />

      <div className="counter-grid" style={{ marginTop: '1rem' }}>
        <Counter label="Eckpfosten" sub="für 90°-Ecken" info={INFO.eckpfosten} value={eckpfosten} min={0} onChange={setEckpfosten} />
        <Counter label="Endpfosten" sub="mind. 2 (immer gerade)" info={INFO.endpfosten} value={endpfosten} min={2} isEnd onChange={setEndpfosten} />
      </div>

      <div className="info-note visible" style={{ marginTop: '.6rem' }}>
        Wie viele Ecken hat Ihr Zaun? Geben Sie die Anzahl der Eckpfosten für 90°-Kurven an.
      </div>
    </Step>
  )
}
