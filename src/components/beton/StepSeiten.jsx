import React from 'react'
import Step from '../shared/Step.jsx'
import TogglePills from '../shared/TogglePills.jsx'

export default function StepSeiten({ state }) {
  const { seiten, canEinseitig, plateHeight, motif, setSeiten } = state

  const options = [
    { id: 'beidseitig', label: 'Beidseitig' },
    { id: 'einseitig',  label: 'Einseitig', disabled: !canEinseitig },
  ]

  const showNote = !canEinseitig && plateHeight === '36'

  return (
    <Step num="03" title="Seitenausführung" sub="Strukturierung eine oder beide Seiten">
      <TogglePills options={options} activeId={seiten} onSelect={setSeiten} />
      {showNote && (
        <div className="info-note visible">
          {motif} ist in 36 cm nur beidseitig verfügbar.
        </div>
      )}
    </Step>
  )
}
