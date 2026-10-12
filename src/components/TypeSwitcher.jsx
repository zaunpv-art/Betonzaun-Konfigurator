import React from 'react'

export default function TypeSwitcher({ activeType, onChange }) {
  return (
    <div className="type-switcher-bar">
      <div className="type-switcher-inner">
        <button
          className={`type-tab ${activeType === 'beton' ? 'active' : ''}`}
          onClick={() => onChange('beton')}
        >
          <span className="type-icon">🧱</span> Betonzaun
        </button>
        <button
          className={`type-tab ${activeType === 'holz' ? 'active' : ''}`}
          onClick={() => onChange('holz')}
        >
          <span className="type-icon">🌲</span> Holz-Betonzaun
        </button>
      </div>
    </div>
  )
}
