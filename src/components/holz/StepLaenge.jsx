import React from 'react'
import Step from '../shared/Step.jsx'
import LengthStepper from '../shared/LengthStepper.jsx'
import { calcSections, calcPfosten } from '../../utils/calculations.js'
import { INFO } from '../../data/infoTexts.js'

export default function HolzStepLaenge({ state }) {
  const { laenge, eckpfosten, endpfosten, setLaenge } = state
  const sections = calcSections(laenge)
  const pfosten  = calcPfosten(sections, eckpfosten, endpfosten)

  return (
    <Step num="05" title="Zaunlänge" sub="Gesamtlänge in Metern" info={INFO.zaunlaenge}>
      <LengthStepper value={laenge} onChange={setLaenge} />
      <div className="calc-note">
        → {sections} Zaunfeld{sections === 1 ? '' : 'er'} à 1,91 m
      </div>
    </Step>
  )
}
