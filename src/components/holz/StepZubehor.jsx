import React from 'react'
import Step from '../shared/Step.jsx'
import { HOLZ_BETON_BAGS_PER_PFOSTEN } from '../../data/holzData.js'
import { INFO } from '../../data/infoTexts.js'
import InfoTip from '../shared/InfoTip.jsx'

export default function HolzStepZubehor({ state }) {
  const { beton, setBeton, betonLocked, pfosten } = state
  const totalBags  = HOLZ_BETON_BAGS_PER_PFOSTEN * pfosten.total

  return (
    <Step num="09" title="Zubehör" sub="Befestigungsmaterial">
      <div className="zubehor-item">
        <div className="zubehor-row">
          <div className="zubehor-info">
            <div className="zubehor-title">
              Trockenbeton
              <InfoTip
                {...INFO.trockenbeton}
                text={[...INFO.trockenbeton.text, `Für Ihren Zaun: ${totalBags} Säcke (${HOLZ_BETON_BAGS_PER_PFOSTEN} pro Pfosten × ${pfosten.total} Pfosten).`]}
              />
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
