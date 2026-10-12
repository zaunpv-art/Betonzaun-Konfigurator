import React from 'react'
import Step from '../shared/Step.jsx'
import TogglePills from '../shared/TogglePills.jsx'
import { BUILD_HEIGHTS } from '../../data/betonData.js'

export default function StepHeight({ state }) {
  const { plateHeight, buildHeight, setPlateHeight, setBuildHeight } = state

  const plateOptions = [
    { id: '26', label: '26 cm Platten' },
    { id: '36', label: '36 cm Platten' },
  ]

  const heightOptions = BUILD_HEIGHTS[plateHeight].map(h => ({
    id: h.cm,
    label: <>{h.label}<span className="height-sub">{h.sub}</span></>,
  }))

  return (
    <Step num="02" title="Plattenhöhe & Bauhöhe" sub="Plattenformat und Gesamthöhe des Zauns">
      <div className="label-row">
        <span className="field-label">Plattenhöhe</span>
        <span className="field-val">{plateHeight} cm</span>
      </div>
      <TogglePills options={plateOptions} activeId={plateHeight} onSelect={setPlateHeight} />

      <div className="label-row" style={{ marginTop: '1.1rem' }}>
        <span className="field-label">Bauhöhe</span>
        <span className="field-val">{buildHeight} cm</span>
      </div>
      <div className="height-options">
        {BUILD_HEIGHTS[plateHeight].map(h => (
          <button
            key={h.cm}
            className={`height-btn ${buildHeight === h.cm ? 'active' : ''}`}
            onClick={() => setBuildHeight(h.cm)}
          >
            {h.label}
            <span className="height-sub">{h.sub}</span>
          </button>
        ))}
      </div>
    </Step>
  )
}
