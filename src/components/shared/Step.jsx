import React from 'react'
import InfoTip from './InfoTip.jsx'

/**
 * info - optional { title, text, link } shown behind an ⓘ next to the title
 */
export default function Step({ num, title, sub, info, children }) {
  return (
    <section className="step">
      <div className="step-header">
        <span className="step-num">{num}</span>
        <div>
          <div className="step-title">
            {title}
            {info && <InfoTip {...info} />}
          </div>
          {sub && <div className="step-sub">{sub}</div>}
        </div>
      </div>
      {children}
    </section>
  )
}
