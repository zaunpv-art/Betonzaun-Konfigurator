import React from 'react'

// All plates are sold beidseitig only — shown under the motif grid
export default function BeidseitigNote() {
  return (
    <div className="beidseitig-note">
      <span className="beidseitig-icon">⇄</span>
      <span>
        <strong>Alle Platten beidseitig strukturiert</strong> — das Motiv ist auf beiden Zaunseiten sichtbar.
      </span>
    </div>
  )
}
