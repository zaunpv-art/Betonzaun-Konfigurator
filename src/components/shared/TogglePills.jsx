import React from 'react'

/**
 * options: [{ id, label, disabled? }]
 */
export default function TogglePills({ options, activeId, onSelect }) {
  return (
    <div className="toggle-pills">
      {options.map(opt => (
        <button
          key={opt.id}
          className={[
            'toggle-pill',
            activeId === opt.id ? 'active' : '',
            opt.disabled ? 'disabled' : '',
          ].join(' ')}
          onClick={() => !opt.disabled && onSelect(opt.id)}
          disabled={opt.disabled}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
