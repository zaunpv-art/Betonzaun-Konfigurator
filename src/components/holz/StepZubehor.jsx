import React from 'react'
import Step from '../shared/Step.jsx'
import { HOLZ_BETON_BAGS_PER_PFOSTEN } from '../../data/holzData.js'
import { calcSections, calcPfosten } from '../../utils/calculations.js'

export default function HolzStepZubehor({ state }) {
  const { beton, setBeton, betonLocked, laenge, eckpfosten, endpfosten } = state
  const sections   = calcSections(laenge)
  const pfosten    = calcPfosten(sections, eckpfosten, endpfosten)
  const totalBags  = HOLZ_BETON_BAGS_PER_PFOSTEN * pfosten.total

  return (
    <Step num="09" title="Zubehör" sub="Befestigungsmaterial">
      <div className="zubehor-item">
        <div className="zubehor-row">
          <div className="zubehor-info">
            <div className="zubehor-title">
              Trockenbeton
            </div>
            <div className="zubehor-desc">Einbeton für die Pfosten</div>
          </div>
          <label className="toggle-switch" style={{ opacity: betonLocked ? 0.4 : 1, pointerEvents: betonLocked ? 'none' : 'auto' }}>
            <input
              type="checkbox"
              checked={beton}
              onChange={e => !betonLocked && setBeton(e.target.checked)}
              disabled={betonLocked}
            />
            <span className="slider" />
          </label>
        </div>

      </div>
    </Step>
  )
}
