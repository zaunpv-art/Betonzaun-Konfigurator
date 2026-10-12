import React from 'react'
import StepMontageBase from '../beton/StepMontage.jsx'

// Holz Montage reuses the same component — just a different step number
export default function HolzStepMontage({ state }) {
  return <StepMontageBase state={state} stepNum="08" />
}
