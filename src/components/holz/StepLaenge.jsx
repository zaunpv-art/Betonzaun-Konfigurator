import React from 'react'
import Step from '../shared/Step.jsx'
import LengthStepper from '../shared/LengthStepper.jsx'
import { calcSections, calcPfosten } from '../../utils/calculations.js'

export default function HolzStepLaenge({ state }) {
  const { laenge, eckpfosten, endpfosten, setLaenge } = state
  const sections = calcSections(laenge)
  const pfosten  = calcPfosten(sections, eckpfosten, endpfosten)

  return (
    <Step num="05" title="Zaunlänge" sub="Gesamtlänge in Metern">
      <LengthStepper value={laenge} onChange={setLaenge} />
    </Step>
  )
}
