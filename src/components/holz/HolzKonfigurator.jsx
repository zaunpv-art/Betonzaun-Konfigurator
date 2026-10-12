import React from 'react'
import HolzStepMaterial       from './StepMaterial.jsx'
import HolzStepMotif          from './StepMotif.jsx'
import HolzStepHeight         from './StepHeight.jsx'
import HolzStepAbdeckleistung from './StepAbdeckleistung.jsx'
import HolzStepLaenge         from './StepLaenge.jsx'
import HolzStepPfosten        from './StepPfosten.jsx'
import HolzStepTor            from './StepTor.jsx'
import HolzStepMontage        from './StepMontage.jsx'
import HolzStepZubehor        from './StepZubehor.jsx'

export default function HolzKonfigurator({ state }) {
  return (
    <div className="konfigurator-wrap">
      <HolzStepMaterial       state={state} />
      <HolzStepMotif          state={state} />
      <HolzStepHeight         state={state} />
      <HolzStepAbdeckleistung state={state} />
      <HolzStepLaenge         state={state} />
      <HolzStepPfosten        state={state} />
      <HolzStepTor            state={state} />
      <HolzStepMontage        state={state} />
      <HolzStepZubehor        state={state} />
    </div>
  )
}
