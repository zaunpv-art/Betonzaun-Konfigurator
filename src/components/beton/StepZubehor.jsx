import React from 'react'
import Step from '../shared/Step.jsx'
import TogglePills from '../shared/TogglePills.jsx'
import ColorPills from '../shared/ColorPills.jsx'
import { BETON_BAGS } from '../../data/betonData.js'
import { COLORS } from '../../data/betonData.js'
import { calcSections, calcPfosten } from '../../utils/calculations.js'

export default function StepZubehor({ state, stepNum = '09' }) {
  const {
    beton, setBeton, betonLocked,
    torSize, setTorSize,
    torFarbe, setTorFarbe,
    brilluxColor, setBrilluxColor,
    laenge, buildHeight, eckpfosten, endpfosten,
  } = state

  const sections     = calcSections(laenge)
  const pfosten      = calcPfosten(sections, eckpfosten, endpfosten)
  const bags         = BETON_BAGS[buildHeight] || 4
  const totalBags    = bags * pfosten.total

  const torOptions = [
    { id: '180', label: 'Tor 180 cm' },
    { id: '200', label: 'Tor 200 cm' },
  ]

  return (
    <Step num={stepNum} title="Zubehör" sub="Befestigungsmaterial und Extras">

      {/* Beton */}
      <div className="zubehor-item">
        <div className="zubehor-row">
          <div className="zubehor-info">
            <div className="zubehor-title">
              Trockenbeton
              {betonLocked && <span className="optional-badge" style={{ background: '#fef3c7', color: '#92400e' }}>Inklusive</span>}
            </div>
            <div className="zubehor-desc">Einbeton für die Pfosten</div>
          </div>
          <label className="toggle-switch" style={{ opacity: betonLocked ? 0.4 : 1, pointerEvents: betonLocked ? 'none' : 'auto' }}>
            <input type="checkbox" checked={beton} onChange={e => !betonLocked && setBeton(e.target.checked)} disabled={betonLocked} />
            <span className="slider" />
          </label>
        </div>

      </div>

      {/* Tor */}
      <div className="zubehor-item">
        <div className="zubehor-row">
          <div className="zubehor-info">
            <div className="zubehor-title">Tor <span className="optional-badge">Optional</span></div>
            <div className="zubehor-desc">Einfahrts- oder Gartentor hinzufügen</div>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={!!torSize}
              onChange={e => setTorSize(e.target.checked ? '180' : null)}
            />
            <span className="slider" />
          </label>
        </div>
        {torSize && (
          <div style={{ marginTop: '.7rem', display: 'flex', flexDirection: 'column', gap: '.7rem' }}>
            <TogglePills options={torOptions} activeId={torSize} onSelect={setTorSize} />
            <div className="label-row">
              <span className="field-label">Tor Farbe</span>
              <span className="field-val">{torFarbe}</span>
            </div>
            <ColorPills
              colors={COLORS.filter(c => c.id !== 'Schwarz')}
              activeId={torFarbe}
              onSelect={setTorFarbe}
            />
          </div>
        )}
      </div>

      {/* Farbe Brillux */}
      <div className="zubehor-item">
        <div className="zubehor-row">
          <div className="zubehor-info">
            <div className="zubehor-title">Farbe Brillux <span className="optional-badge">Optional</span></div>
            <div className="zubehor-desc">Individuelle Farbgestaltung · 1 Eimer (15L) pro 10 m</div>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={brilluxColor !== null && brilluxColor !== undefined && brilluxColor !== ''}
              onChange={e => setBrilluxColor(e.target.checked ? ' ' : '')}
            />
            <span className="slider" />
          </label>
        </div>
        {brilluxColor !== '' && (
          <div className="calc-note" style={{ marginBottom: '.5rem' }}>
            → {Math.ceil(laenge / 10)} Eimer × 15L benötigt
          </div>
        )}
        {brilluxColor !== '' && (
          <input
            id="brillux-color-input"
            className={`text-input ${brilluxColor.trim() ? '' : 'text-input-warn'}`}
            style={{ marginTop: '.7rem' }}
            type="text"
            placeholder="Farbnummer eingeben (z.B. 3040)"
            value={brilluxColor.trim()}
            onChange={e => setBrilluxColor(e.target.value || ' ')}
          />
        )}
        {brilluxColor !== '' && !brilluxColor.trim() && (
          <div className="info-note visible" style={{ marginTop: '.5rem' }}>
            Bitte Brillux Farbnummer eingeben — ohne Farbnummer wird keine Farbe in den Warenkorb gelegt.
          </div>
        )}
      </div>

    </Step>
  )
}
