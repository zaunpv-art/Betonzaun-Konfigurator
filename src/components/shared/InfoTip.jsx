import React, { useState, useRef, useEffect, useLayoutEffect } from 'react'
import { createPortal } from 'react-dom'

const WIDTH  = 290
const MARGIN = 12

/**
 * Small ⓘ button that shows extra information.
 * Hover opens it on desktop, tap toggles it on touch devices.
 * The popover is portalled to <body> with fixed positioning so step cards
 * (overflow, z-index) never clip it, and it is clamped to the viewport.
 *
 * Props:
 *   text  - string | string[]   paragraphs to show
 *   link  - { href, label }     optional "Mehr erfahren" link
 *   title - string              optional bold heading
 */
export default function InfoTip({ text, link, title }) {
  const [open, setOpen] = useState(false)
  const [pos,  setPos]  = useState(null)
  const btnRef  = useRef(null)
  const popRef  = useRef(null)
  const closeT  = useRef(0)
  const canHover = typeof window !== 'undefined' && window.matchMedia?.('(hover: hover)').matches

  const paragraphs = Array.isArray(text) ? text : [text]

  function show()  { clearTimeout(closeT.current); setOpen(true) }
  function hideSoon() { clearTimeout(closeT.current); closeT.current = setTimeout(() => setOpen(false), 120) }

  // Position next to the button, flipped above when there is no room below
  useLayoutEffect(() => {
    if (!open || !btnRef.current) return
    const r     = btnRef.current.getBoundingClientRect()
    const vw    = window.innerWidth
    const vh    = window.innerHeight
    const width = Math.min(WIDTH, vw - MARGIN * 2)
    const left  = Math.min(Math.max(r.left + r.width / 2 - width / 2, MARGIN), vw - width - MARGIN)
    const popH  = popRef.current?.offsetHeight || 160
    const below = r.bottom + 8 + popH < vh - 80 // keep clear of the price bar
    setPos(below
      ? { left, width, top: r.bottom + 8 }
      : { left, width, top: Math.max(MARGIN, r.top - 8 - popH) })
  }, [open])

  // Close on outside tap, Escape or scrolling away
  useEffect(() => {
    if (!open) return
    function onDown(e) {
      if (btnRef.current?.contains(e.target) || popRef.current?.contains(e.target)) return
      setOpen(false)
    }
    function onKey(e) { if (e.key === 'Escape') setOpen(false) }
    // Ignore small scrolls (smooth-scroll settling, mobile address bar)
    const startY = window.scrollY
    function onScroll() { if (Math.abs(window.scrollY - startY) > 40) setOpen(false) }
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('scroll', onScroll)
    }
  }, [open])

  useEffect(() => () => clearTimeout(closeT.current), [])

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        className={`info-tip-btn ${open ? 'open' : ''}`}
        aria-label={title ? `Info: ${title}` : 'Mehr Informationen'}
        aria-expanded={open}
        onClick={e => {
          e.stopPropagation(); e.preventDefault()
          // With a mouse, hover already opened it — a click must not close it again
          if (canHover) show()
          else setOpen(o => !o)
        }}
        onMouseEnter={canHover ? show : undefined}
        onMouseLeave={canHover ? hideSoon : undefined}
      >
        i
      </button>

      {open && createPortal(
        <div
          ref={popRef}
          className="info-tip-pop"
          role="tooltip"
          style={pos
            ? { left: pos.left, top: pos.top, width: pos.width }
            : { left: -9999, top: 0, width: WIDTH }}
          onMouseEnter={canHover ? show : undefined}
          onMouseLeave={canHover ? hideSoon : undefined}
        >
          {title && <div className="info-tip-title">{title}</div>}
          {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          {link && (
            <a href={link.href} target="_blank" rel="noopener noreferrer" className="info-tip-link">
              {link.label || 'Mehr erfahren'} →
            </a>
          )}
        </div>,
        document.body
      )}
    </>
  )
}
