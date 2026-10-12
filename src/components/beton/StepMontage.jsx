import React from 'react'
import Step from '../shared/Step.jsx'

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

export default function StepMontage({ state, stepNum = '09' }) {
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

      {/* Disclaimer shown when Montagehilfe is selected */}
      {activeOption?.disclaimer && (
        <div className="info-note visible" style={{ marginTop: '.75rem' }}>
          ℹ️ {activeOption.disclaimer}
        </div>
      )}
    </Step>
  )
}
