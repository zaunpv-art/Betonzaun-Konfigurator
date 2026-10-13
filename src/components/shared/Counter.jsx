import React from 'react'
import { normaliseEndpfosten } from '../../utils/calculations.js'
import InfoTip from './InfoTip.jsx'

export default function Counter({ label, sub, info, value, min = 0, onChange, isEnd = false }) {
  function adjust(delta) {
    let next = value + delta
    if (isEnd) {
      next = normaliseEndpfosten(next, delta)
    } else {
      next = Math.max(min, next)
    }
    onChange(next, delta)
  }

  function onInput(e) {
    let val = parseInt(e.target.value) || min
    if (isEnd) val = normaliseEndpfosten(val, 1)
    else val = Math.max(min, val)
    onChange(val, 1)
  }

  return (
    <div className="counter-item">
      <div className="counter-label">{label}{info && <InfoTip {...info} />}</div>
      {sub && <div className="counter-sub">{sub}</div>}
      <div className="counter-wrap">
        <button className="cnt-btn" onClick={() => adjust(-1)}>−</button>
        <input
          className="cnt-input"
          type="number"
          value={value}
          min={min}
          onChange={onInput}
        />
        <button className="cnt-btn" onClick={() => adjust(1)}>+</button>
      </div>
    </div>
  )
}
