import React, { useState } from 'react'
import { MOTIF_IMAGES } from '../../data/motifImages.js'

/**
 * Props:
 *   motifs       - [{ id, label, swatch }]
 *   activeId     - selected motif id
 *   disabledIds  - grayed out motif ids
 *   hints        - { motifId: text } small badge shown on disabled motifs
 *   onSelect     - callback(motifId)
 *   plateHeight  - '26' | '36' (unused for images now, kept for API compat)
 *   farbe        - kept for API compat
 *   seiten       - kept for API compat
 */
export default function MotifGrid({
  motifs,
  activeId,
  disabledIds = [],
  hints = {},
  onSelect,
}) {
  return (
    <div className="motif-grid">
      {motifs.map(m => (
        <MotifBtn
          key={m.id}
          motif={m}
          active={activeId === m.id}
          disabled={disabledIds.includes(m.id)}
          hint={disabledIds.includes(m.id) ? hints[m.id] : null}
          onSelect={onSelect}
        />
      ))}
    </div>
  )
}

function MotifBtn({ motif, active, disabled, hint, onSelect }) {
  const [imgError, setImgError] = useState(false)
  const imgUrl = MOTIF_IMAGES[motif.id]

  return (
    <button
      className={[
        'motif-btn',
        active   ? 'active'   : '',
        disabled ? 'disabled' : '',
      ].join(' ')}
      onClick={() => !disabled && onSelect(motif.id)}
      disabled={disabled}
      title={hint || undefined}
    >
      {imgUrl && !imgError ? (
        <img
          src={imgUrl}
          alt={motif.label}
          className="motif-swatch motif-swatch-img"
          onError={() => setImgError(true)}
          loading="lazy"
        />
      ) : (
        <div className={`motif-swatch ${motif.swatch}`} />
      )}
      {hint && <div className="motif-hint">{hint}</div>}
      <div className="motif-name-label">{motif.label}</div>
    </button>
  )
}
