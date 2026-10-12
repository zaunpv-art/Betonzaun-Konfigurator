import React, { useState, useEffect } from 'react'

// ─── BETON MOTIF GALLERIES ────────────────────────────────────────────────────

const MOTIF_GALLERY = {
  Modern: [
    'https://cdn.shopify.com/s/files/1/1029/2848/2568/files/Betonzaun_1114_Modern.webp?v=1773029535',
    'https://cdn.shopify.com/s/files/1/1029/2848/2568/files/betonzaun_modern_1142.webp?v=1773030992',
    'https://cdn.shopify.com/s/files/1/1029/2848/2568/files/Betonzaun_Modern-18.webp?v=1773028236',
    'https://cdn.shopify.com/s/files/1/1029/2848/2568/files/Betonzaun_Modern-15.webp?v=1773028262',
    'https://cdn.shopify.com/s/files/1/1029/2848/2568/files/Betonzaun_Modern-9.webp?v=1773028286',
    'https://cdn.shopify.com/s/files/1/1029/2848/2568/files/Betonzaun_Modern-21.webp?v=1773028205',
    'https://cdn.shopify.com/s/files/1/1029/2848/2568/files/Betonzaun_1128_Modern.webp?v=1773029533',
    'https://cdn.shopify.com/s/files/1/1029/2848/2568/files/Betonzaun_Modern-19.webp?v=1773028417',
    'https://cdn.shopify.com/s/files/1/1029/2848/2568/files/Betonzaun_Modern-11.webp?v=1773028396',
    'https://cdn.shopify.com/s/files/1/1029/2848/2568/files/Betonzaun_1120_Modern.webp?v=1773029534',
  ],
  Fels: [
    'https://cdn.shopify.com/s/files/1/1029/2848/2568/files/Betonzaun_1113_Fels.webp?v=1773029535',
    'https://cdn.shopify.com/s/files/1/1029/2848/2568/files/Betonzaun_Felsmotiv_81.webp?v=1773027980',
    'https://cdn.shopify.com/s/files/1/1029/2848/2568/files/Betonzaun_Felsmotiv-8.webp?v=1773028088',
    'https://cdn.shopify.com/s/files/1/1029/2848/2568/files/Betonzaun_Felsmotiv-9.webp?v=1773028121',
    'https://cdn.shopify.com/s/files/1/1029/2848/2568/files/Betonzaun_Felsmotiv-12.webp?v=1773028181',
    'https://cdn.shopify.com/s/files/1/1029/2848/2568/files/Betonzaun_Felsmotiv-7.webp?v=1773028148',
    'https://cdn.shopify.com/s/files/1/1029/2848/2568/files/Betonzaun_Felsmotiv-16.webp?v=1773028037',
    'https://cdn.shopify.com/s/files/1/1029/2848/2568/files/Betonzaun_1119_Fels.webp?v=1773029535',
  ],
  Holzoptik: [
    'https://cdn.shopify.com/s/files/1/1029/2848/2568/files/Betonzaun_Holzoptik-7.webp?v=1773027801',
    'https://cdn.shopify.com/s/files/1/1029/2848/2568/files/Betonzaun_Holzoptik-17.webp?v=1773027696',
    'https://cdn.shopify.com/s/files/1/1029/2848/2568/files/Betonzaun_Holzoptik.webp?v=1773026644',
    'https://cdn.shopify.com/s/files/1/1029/2848/2568/files/Betonzaun_Holzoptik-16.webp?v=1773027769',
    'https://cdn.shopify.com/s/files/1/1029/2848/2568/files/Betonzaun_Holzoptik-13.webp?v=1773027832',
    'https://cdn.shopify.com/s/files/1/1029/2848/2568/files/Betonzaun_1123_Holzoptik.webp?v=1773029535',
    'https://cdn.shopify.com/s/files/1/1029/2848/2568/files/Betonzaun_holzoptik_1137.webp?v=1773030991',
  ],
  Lamella: [
    'https://cdn.shopify.com/s/files/1/1029/2848/2568/files/betonzaun_lamella.webp?v=1773115291',
    'https://cdn.shopify.com/s/files/1/1029/2848/2568/files/Betonzaun_1117_Lamella.webp?v=1773115291',
    'https://cdn.shopify.com/s/files/1/1029/2848/2568/files/Betonzaun_Lamella-1.webp?v=1773115291',
    'https://cdn.shopify.com/s/files/1/1029/2848/2568/files/Betonzaun_1129_Lamella.webp?v=1773115291',
  ],
  Mikado: [
    'https://cdn.shopify.com/s/files/1/1029/2848/2568/files/Betonzaun_Mikado-6.webp?v=1773027132',
    'https://cdn.shopify.com/s/files/1/1029/2848/2568/files/Betonzaun_1130_Mikado.webp?v=1773029535',
    'https://cdn.shopify.com/s/files/1/1029/2848/2568/files/Betonzaun_1116_Mikado.webp?v=1773029535',
    'https://cdn.shopify.com/s/files/1/1029/2848/2568/files/Betonzaun_1125_Mikado.webp?v=1773029535',
  ],
  Mosaik: [
    'https://cdn.shopify.com/s/files/1/1029/2848/2568/files/Betonzaun_1118_Mosaik.webp?v=1773029534',
    'https://cdn.shopify.com/s/files/1/1029/2848/2568/files/Betonzaun_Mosaik-4.webp?v=1773028678',
    'https://cdn.shopify.com/s/files/1/1029/2848/2568/files/Betonzaun_Mosaik-7.webp?v=1773027194',
    'https://cdn.shopify.com/s/files/1/1029/2848/2568/files/Betonzaun_Mosaik.webp?v=1773027167',
  ],
  Nostalgie: [
    'https://cdn.shopify.com/s/files/1/1029/2848/2568/files/Betonzaun_Nostalgie_78.webp?v=1773284851',
    'https://cdn.shopify.com/s/files/1/1029/2848/2568/files/Betonzaun_Nostalgie_3.webp?v=1773284851',
    'https://cdn.shopify.com/s/files/1/1029/2848/2568/files/Betonzaun_Nostalgie-3.webp?v=1773284851',
    'https://cdn.shopify.com/s/files/1/1029/2848/2568/files/Betonzaun_Nostalgie-14.webp?v=1773284851',
    'https://cdn.shopify.com/s/files/1/1029/2848/2568/files/Betonzaun_Nostalgie-20.webp?v=1773284851',
    'https://cdn.shopify.com/s/files/1/1029/2848/2568/files/Betonzaun_Nostalgie_0.webp?v=1773284661',
    'https://cdn.shopify.com/s/files/1/1029/2848/2568/files/Betonzaun_Nostalgie-6.webp?v=1773284851',
  ],
  Schiefer: [
    'https://cdn.shopify.com/s/files/1/1029/2848/2568/files/Betonzaun_1115_Schiefer.webp?v=1773284773',
    'https://cdn.shopify.com/s/files/1/1029/2848/2568/files/Betonzaun_Shiefer-10.webp?v=1773284773',
    'https://cdn.shopify.com/s/files/1/1029/2848/2568/files/Betonzaun_1126_Schiefer.webp?v=1773284773',
    'https://cdn.shopify.com/s/files/1/1029/2848/2568/files/Betonzaun_Shiefer-11.webp?v=1773284773',
    'https://cdn.shopify.com/s/files/1/1029/2848/2568/files/Betonzaun_Shiefer-12.webp?v=1773284773',
    'https://cdn.shopify.com/s/files/1/1029/2848/2568/files/Betonzaun_Shiefer-8.webp?v=1773284773',
  ],
  Romania: [
    'https://cdn.shopify.com/s/files/1/1029/2848/2568/files/Betonzaun_Romania-14.webp?v=1773284966',
    'https://cdn.shopify.com/s/files/1/1029/2848/2568/files/Betonzaun_Romania-10.webp?v=1773284966',
    'https://cdn.shopify.com/s/files/1/1029/2848/2568/files/Betonzaun_Romania-9.webp?v=1773284633',
  ],
}

// ─── HOLZ MATERIAL-SPECIFIC IMAGES ───────────────────────────────────────────

const HOLZ_MATERIAL_IMAGES = {
  RedClass: [
    'https://cdn.shopify.com/s/files/1/1029/2848/2568/files/holz-beton_red_class_nostalgie.webp?v=1774579315',
    'https://cdn.shopify.com/s/files/1/1029/2848/2568/files/holz-beton_red_class_modern_3.webp?v=1774579315',
    'https://cdn.shopify.com/s/files/1/1029/2848/2568/files/holz-beton_red_class_fels_1.webp?v=1774579315',
    'https://cdn.shopify.com/s/files/1/1029/2848/2568/files/holz-beton_red_class_shiefer.webp?v=1774579314',
  ],
  Kiefer: [
    'https://cdn.shopify.com/s/files/1/1029/2848/2568/files/holz-beton_kiefer_fels.webp?v=1774579315',
    'https://cdn.shopify.com/s/files/1/1029/2848/2568/files/holz-beton_kiefer_modern.webp?v=1774579315',
    'https://cdn.shopify.com/s/files/1/1029/2848/2568/files/holz-beton_kiefer_fels_3.webp?v=1774579315',
  ],
  KieferBlack: [
    'https://cdn.shopify.com/s/files/1/1029/2848/2568/files/holz-beton_kiefer_romania.webp?v=1774579314',
  ],
}

// Shared holz plate images — mixed from all motifs, shown when no material-specific images
const HOLZ_SHARED_IMAGES = [
  ...MOTIF_GALLERY.Fels.slice(0, 2),
  ...MOTIF_GALLERY.Nostalgie.slice(0, 2),
  ...MOTIF_GALLERY.Schiefer.slice(0, 2),
  ...MOTIF_GALLERY.Romania,
]

// ─── USP PILLS ────────────────────────────────────────────────────────────────

const USP_PILLS = [
  { icon: '🏭', text: 'Direkt vom Hersteller' },
  { icon: '🚚', text: 'Lieferung DE & AT' },
  { icon: '⭐', text: '4.9 / 5 Bewertungen' },
  { icon: '🔧', text: 'Profimontage möglich' },
  { icon: '📐', text: 'Individuelle Maße' },
  { icon: '🌿', text: '30 Jahre Garantie' },
]

// ─── COMPONENT ────────────────────────────────────────────────────────────────

/**
 * Props:
 *   activeType   - 'beton' | 'holz'
 *   motif        - selected motif id
 *   holzMaterial - selected holz material id (only used when activeType='holz')
 */
export default function GalleryPanel({ activeType, motif, holzMaterial, lineItems = [], priceFn = () => null }) {
  const [active, setActive] = useState(0)

  // Resolve which images to show
  let images
  let label

  if (activeType === 'holz') {
    const materialImages = holzMaterial ? (HOLZ_MATERIAL_IMAGES[holzMaterial] || []) : []
    if (!holzMaterial || materialImages.length === 0) {
      // No material selected or no dedicated images — show full shared gallery
      images = HOLZ_SHARED_IMAGES
      label  = 'Holz-Beton'
    } else {
      // Material selected with dedicated images
      images = materialImages
      const labels = { RedClass: 'Red Class', Kiefer: 'Kiefer', KieferBlack: 'Kiefer Black' }
      label  = labels[holzMaterial] || holzMaterial
    }
  } else {
    images = MOTIF_GALLERY[motif] || MOTIF_GALLERY['Fels']
    label  = motif
  }

  // Reset to first image when gallery changes
  useEffect(() => {
    setActive(0)
  }, [motif, holzMaterial, activeType])

  // Auto-advance every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActive(i => (i + 1) % images.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [images])

  return (
    <div className="gallery-panel">
      {/* Main image */}
      <div className="gallery-main">
        {images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`${label} ${i + 1}`}
            className={`gallery-main-img ${i === active ? 'visible' : ''}`}
            loading={i === 0 ? 'eager' : 'lazy'}
          />
        ))}
        <div className="gallery-label">{label}</div>
      </div>

      {/* Thumbnail strip */}
      <div className="gallery-thumbs">
        {images.map((src, i) => (
          <button
            key={src}
            className={`gallery-thumb ${i === active ? 'active' : ''}`}
            onClick={() => setActive(i)}
          >
            <img src={src} alt="" loading="lazy" />
          </button>
        ))}
      </div>

      {/* USP pills */}
      <div className="gallery-usps">
        {USP_PILLS.map(p => (
          <div key={p.text} className="usp-pill">
            <span className="usp-icon">{p.icon}</span>
            <span className="usp-text">{p.text}</span>
          </div>
        ))}
      </div>

      {/* Component list */}
      {lineItems.length > 0 && (
        <div className="gallery-components">
          <div className="gallery-components-title">Konfiguration</div>
          <div className="gallery-components-list">
            {lineItems.map((item, i) => {
              const linePrice = item.fixedPrice != null
                ? item.fixedPrice * item.qty
                : priceFn(item.variantId) != null
                  ? priceFn(item.variantId) * item.qty
                  : null
              const hasQty = item.qty > 0

              return (
                <div key={i} className="gallery-component-row">
                  <div className="gallery-component-left">
                    <span className="gallery-component-name">{item.label}</span>
                    {hasQty && (
                      <span className="gallery-component-qty">× {item.qty}</span>
                    )}
                  </div>
                  <span className="gallery-component-price">
                    {linePrice != null
                      ? linePrice.toLocaleString('de-DE', { minimumFractionDigits: 2 }) + ' €'
                      : <span className="gallery-component-price-loading">—</span>
                    }
                  </span>
                </div>
              )
            })}
          </div>

          {/* Total */}
          <div className="gallery-components-total">
            <span>Gesamt</span>
            <span>
              {(() => {
                const total = lineItems.reduce((sum, item) => {
                  const p = item.fixedPrice != null
                    ? item.fixedPrice * item.qty
                    : priceFn(item.variantId) != null
                      ? priceFn(item.variantId) * item.qty
                      : null
                  return p != null ? sum + p : sum
                }, 0)
                const hasAny = lineItems.some(item =>
                  item.fixedPrice != null || priceFn(item.variantId) != null
                )
                return hasAny
                  ? total.toLocaleString('de-DE', { minimumFractionDigits: 2 }) + ' €'
                  : '—'
              })()}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
