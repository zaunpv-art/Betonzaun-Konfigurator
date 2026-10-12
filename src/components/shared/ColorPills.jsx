import React from 'react'

export default function ColorPills({ colors, activeId, disabledIds = [], onSelect }) {
  return (
    <div className="color-pills">
      {colors.map(c => (
        <button
          key={c.id}
          className={[
            'color-pill',
            activeId === c.id ? 'active' : '',
            disabledIds.includes(c.id) ? 'disabled' : '',
          ].join(' ')}
          onClick={() => !disabledIds.includes(c.id) && onSelect(c.id)}
          disabled={disabledIds.includes(c.id)}
        >
          <span className={`color-dot ${c.dot}`} />
          {c.label}
        </button>
      ))}
    </div>
  )
}
