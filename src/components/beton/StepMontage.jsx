import React from 'react'
import Step from '../shared/Step.jsx'
import { MONTAGE_INFO } from '../../data/infoTexts.js'

const OPTIONS = [
  {
    id:   'profi',
    icon: '🔧',
    title: 'Profimontage',
    desc: 'Komplett-Service durch unser Fachteam',
  },
  {
    id:   'hilfe',
    icon: '🤝',
    title: 'Montagehilfe',
    desc: 'Unterstützung bei der Montage',
    disclaimer: 'Montagehilfe umfasst bis zu 2 Arbeitstage inkl. Anfahrtskosten und Unterkunft.',
  },
  {
    id:   'diy',
    icon: '🏠',
    title: 'DIY Selbstmontage',
    desc: 'Alles selbst montieren',
  },
]

export default function StepMontage({ state, stepNum = '08' }) {
  const { montage, setMontage } = state
  const activeOption = OPTIONS.find(o => o.id === montage)

  return (
    <Step num={stepNum} title="Montage" sub="Wählen Sie Ihre Montageoption">
      <div className="montage-options">
        {OPTIONS.map(o => (
          <button
            key={o.id}
            className={`montage-card ${montage === o.id ? 'active' : ''}`}
            onClick={() => setMontage(o.id)}
          >
            <div className="montage-icon">{o.icon}</div>
            <div className="montage-title">{o.title}</div>
            <div className="montage-desc">{o.desc}</div>
          </button>
        ))}
      </div>

      {/* Details for the selected option */}
      {MONTAGE_INFO[montage] && (
        <div className="montage-details">
          <p>{MONTAGE_INFO[montage].text}</p>
          {activeOption?.disclaimer && <p className="montage-disclaimer">ℹ️ {activeOption.disclaimer}</p>}
          {MONTAGE_INFO[montage].link && (
            <a href={MONTAGE_INFO[montage].link.href} target="_blank" rel="noopener noreferrer" className="info-tip-link">
              {MONTAGE_INFO[montage].link.label} →
            </a>
          )}
        </div>
      )}
    </Step>
  )
}
