import React from 'react'

export default function Step({ num, title, sub, children }) {
  return (
    <section className="step">
      <div className="step-header">
        <span className="step-num">{num}</span>
        <div>
          <div className="step-title">{title}</div>
          {sub && <div className="step-sub">{sub}</div>}
        </div>
      </div>
      {children}
    </section>
  )
}
