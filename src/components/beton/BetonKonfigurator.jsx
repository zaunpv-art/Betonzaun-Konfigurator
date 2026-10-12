import React from 'react'
import StepMotif     from './StepMotif.jsx'
import StepHeight    from './StepHeight.jsx'
import StepSeiten    from './StepSeiten.jsx'
import StepFarbe     from './StepFarbe.jsx'
import StepLaenge    from './StepLaenge.jsx'
import StepPfosten   from './StepPfosten.jsx'
import StepKappe     from './StepKappe.jsx'
import StepAbdeckung from './StepAbdeckung.jsx'
import StepMontage   from './StepMontage.jsx'
import StepZubehor   from './StepZubehor.jsx'

export default function BetonKonfigurator({ state }) {
  return (
    <div className="konfigurator-wrap">
      <StepMotif     state={state} />
      <StepHeight    state={state} />
      <StepSeiten    state={state} />
      <StepFarbe     state={state} />
      <StepLaenge    state={state} />
      <StepPfosten   state={state} />
      <StepKappe     state={state} />
      <StepAbdeckung state={state} />
      <StepMontage   state={state} stepNum="09" />
      <StepZubehor   state={state} stepNum="10" />
    </div>
  )
}
