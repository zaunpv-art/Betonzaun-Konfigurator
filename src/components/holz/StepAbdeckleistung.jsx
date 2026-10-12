import React from 'react'
import Step from '../shared/Step.jsx'
import TogglePills from '../shared/TogglePills.jsx'

const OPTIONS = [
  { id: 'none', label: 'Keine' },
  { id: 'yes',  label: 'Abdeckleistung hinzufügen' },
]

export default function HolzStepAbdeckleistung({ state }) {
  const { abdeckleistung, holzMaterial, setAbdeckleistung } = state

  return (
    <Step num="04" title={<>Abdeckleistung <span className="optional-badge">Optional</span></>} sub="Holzabdeckung oben (1 pro Feld, gleiche Holzart)">
      <TogglePills
        options={OPTIONS}
        activeId={abdeckleistung ? 'yes' : 'none'}
        onSelect={val => setAbdeckleistung(val === 'yes')}
      />
    </Step>
  )
}
