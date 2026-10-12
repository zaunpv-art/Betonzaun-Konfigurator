import React from 'react'

export default function LengthStepper({ value, onChange }) {
  function adjust(delta) {
    onChange(Math.max(1, value + delta))
  }

  return (
    <div className="length-wrap">
      <button className="len-btn" onClick={() => adjust(-1)}>−</button>
      <input
        className="len-input"
        type="number"
        value={value}
        min={1}
        onChange={e => onChange(Math.max(1, parseInt(e.target.value) || 1))}
      />
      <span className="len-unit">m</span>
      <button className="len-btn" onClick={() => adjust(1)}>+</button>
    </div>
  )
}
