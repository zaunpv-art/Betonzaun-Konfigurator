import React from 'react'
import InfoTip from './InfoTip.jsx'

export default function Counter({ label, sub, info, value, min = 0, onChange }) {
  function adjust(delta) {
    onChange(Math.max(min, value + delta))
  }

  function onInput(e) {
    onChange(Math.max(min, parseInt(e.target.value) || min))
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
