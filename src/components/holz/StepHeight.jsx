import React from 'react'
import Step from '../shared/Step.jsx'
import TogglePills from '../shared/TogglePills.jsx'
import { HOLZ_HEIGHT_CONFIG } from '../../data/holzData.js'
import { INFO } from '../../data/infoTexts.js'

export default function HolzStepHeight({ state }) {
  const { buildHeight, betonPlatten, setBuildHeight, setBetonPlatten } = state

  const heightOptions = [
    { id: '116', label: '116 cm' },
    { id: '206', label: '206 cm' },
  ]

  const config = HOLZ_HEIGHT_CONFIG[buildHeight]
  const show206Options = buildHeight === '206'

  const plattenOptions = config?.holzOptions?.map(o => ({
    id: String(o.platten),
    label: o.label || `${o.platten} Platte${o.platten > 1 ? 'n' : ''} → Holz ${o.holzCm} cm`,
  })) || []

  return (
    <Step num="03" title="Bauhöhe" sub="Gesamthöhe des Holz-Betonzauns" info={INFO.holzBauhoehe}>
      <TogglePills options={heightOptions} activeId={buildHeight} onSelect={setBuildHeight} />

      {show206Options && (
        <div style={{ marginTop: '1rem' }}>
          <div className="label-row">
            <span className="field-label">Sockelplatten</span>
          </div>
          <TogglePills
            options={plattenOptions}
            activeId={String(betonPlatten)}
            onSelect={val => setBetonPlatten(parseInt(val))}
          />
        </div>
      )}
    </Step>
  )
}
