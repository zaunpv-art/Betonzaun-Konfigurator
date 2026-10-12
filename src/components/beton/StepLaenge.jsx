import React from 'react'
import Step from '../shared/Step.jsx'
import LengthStepper from '../shared/LengthStepper.jsx'
import { calcSections } from '../../utils/calculations.js'

export default function StepLaenge({ state }) {
  const { laenge, setLaenge } = state
  const sections = calcSections(laenge)

  return (
    <Step num="04" title="Zaunlänge" sub="Gesamtlänge Ihres Zauns in Metern">
      <LengthStepper value={laenge} onChange={setLaenge} />
    </Step>
  )
}
