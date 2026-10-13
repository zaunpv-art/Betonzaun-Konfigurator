import React from 'react'
import Step from '../shared/Step.jsx'
import LengthStepper from '../shared/LengthStepper.jsx'
import { calcSections } from '../../utils/calculations.js'
import { INFO } from '../../data/infoTexts.js'

export default function StepLaenge({ state }) {
  const { laenge, setLaenge } = state
  const sections = calcSections(laenge)

  return (
    <Step num="04" title="Zaunlänge" info={INFO.zaunlaenge} sub="Gesamtlänge Ihres Zauns in Metern">
      <LengthStepper value={laenge} onChange={setLaenge} />
      <div className="calc-note">
        → {sections} Zaunfeld{sections === 1 ? '' : 'er'} à 1,91 m
      </div>
    </Step>
  )
}
