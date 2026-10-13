import React from 'react'
import Step from '../shared/Step.jsx'
import TogglePills from '../shared/TogglePills.jsx'
import { HOLZ_MATERIALS } from '../../data/holzData.js'
import { INFO } from '../../data/infoTexts.js'

const TOR_SIZES = [
  { id: '100', label: 'Breite 100 cm' },
  { id: '120', label: 'Breite 120 cm' },
]

export default function HolzStepTor({ state }) {
  const { torSize, holzMaterial, setTorSize } = state
  const materialLabel = HOLZ_MATERIALS.find(m => m.id === holzMaterial)?.label || holzMaterial

  return (
    <Step num="07" title={<>Holz-Tor <span className="optional-badge">Optional</span></>} sub="Tor in gleicher Holzart wie Sichtschutz" info={INFO.holzTor}>
      <div className="zubehor-row">
        <div className="zubehor-info">
          <div className="zubehor-title">Tor hinzufügen</div>
          <div className="zubehor-desc">{materialLabel}</div>
        </div>
        <label className="toggle-switch">
          <input
            type="checkbox"
            checked={!!torSize}
            onChange={e => setTorSize(e.target.checked ? '100' : null)}
          />
          <span className="slider" />
        </label>
      </div>

      {torSize && (
        <div style={{ marginTop: '.7rem' }}>
          <TogglePills options={TOR_SIZES} activeId={torSize} onSelect={setTorSize} />
        </div>
      )}
    </Step>
  )
}
