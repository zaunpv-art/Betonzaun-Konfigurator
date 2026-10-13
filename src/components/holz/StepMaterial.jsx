import React from 'react'
import Step from '../shared/Step.jsx'
import { HOLZ_MATERIALS } from '../../data/holzData.js'
import { INFO } from '../../data/infoTexts.js'

const MATERIAL_IMAGES = {
  RedClass:    'https://cdn.shopify.com/s/files/1/1029/2848/2568/files/holz_sichtschutz-52.png?v=1772935088',
  Kiefer:      'https://cdn.shopify.com/s/files/1/1029/2848/2568/files/holz_sichtschutz-55.png?v=1772935089',
  KieferBlack: 'https://cdn.shopify.com/s/files/1/1029/2848/2568/files/holz_sichtschutz-59.png?v=1772935087',
}

function MaterialCard({ material, active, onClick }) {
  const imgUrl = MATERIAL_IMAGES[material.id]

  return (
    <button
      className={`material-card ${active ? 'active' : ''}`}
      onClick={onClick}
    >
      {imgUrl ? (
        <img
          src={imgUrl}
          alt={material.label}
          className="material-swatch"
          style={{ objectFit: 'cover', display: 'block' }}
          loading="lazy"
        />
      ) : (
        <div className={`material-swatch ${material.swatch}`} />
      )}
      <div className="material-name">{material.label}</div>
    </button>
  )
}

export default function HolzStepMaterial({ state }) {
  const { holzMaterial, holzCm, setHolzMaterial } = state

  return (
    <Step num="01" title="Holzart wählen" sub="Holzart für den Sichtschutz" info={INFO.holzart}>
      <div className="material-options">
        {HOLZ_MATERIALS.map(m => (
          <MaterialCard
            key={m.id}
            material={m}
            active={holzMaterial === m.id}
            onClick={() => setHolzMaterial(m.id)}
          />
        ))}
      </div>
      {holzMaterial && (
        <div className="calc-note" style={{ marginTop: '.7rem' }}>
          → Holz-Sichtschutz {holzCm} cm ({HOLZ_MATERIALS.find(m => m.id === holzMaterial)?.label})
        </div>
      )}
    </Step>
  )
}
