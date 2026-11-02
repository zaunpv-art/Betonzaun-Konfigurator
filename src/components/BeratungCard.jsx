import React from 'react'

/**
 * Sits at the end of the configurator steps, directly above the price bar.
 *
 * Not inside the price bar: that bar is one compact row that follows the
 * customer the whole way, and a second button there would shrink "In den
 * Warenkorb" on a phone and pull people away from the purchase before they
 * have finished. Here the offer appears exactly where someone who is unsure
 * runs out of steps, and there is room to say what it is for.
 */
export default function BeratungCard({ onOpen }) {
  return (
    <section className="beratung-card">
      <p className="beratung-card-text">
        <strong>Unsicher bei der Auswahl?</strong> Senden Sie uns Ihre Konfiguration –
        wir prüfen sie und beraten Sie kostenlos.
      </p>
      <button type="button" className="beratung-card-btn" onClick={onOpen}>
        Beratung anfragen
      </button>
    </section>
  )
}
