import { calcSections } from './calculations.js'
import { COLORS, BUILD_HEIGHTS } from '../data/betonData.js'
import { HOLZ_MATERIALS } from '../data/holzData.js'

/**
 * Turn the current configuration into plain text, so the team receives the
 * full spec in the request email and can rebuild it without guessing.
 */

export const fmtPrice = n =>
  n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €'

const colorLabel    = id => COLORS.find(c => c.id === id)?.label || id || '—'
const materialLabel = id => HOLZ_MATERIALS.find(m => m.id === id)?.label || id || '—'

const MONTAGE_LABEL = {
  profi: 'Profimontage',
  hilfe: 'Montagehilfe',
  diy:   'DIY Selbstmontage',
}

function pfostenLine(state) {
  const p = state.pfosten || { zwischen: 0, eck: 0, end: 0 }
  const kabel  = Math.min(state.kabelkanal || 0, p.zwischen)
  const normal = p.zwischen - kabel
  const parts = [`${normal} Zwischenpfosten`]
  if (kabel > 0) parts.push(`${kabel} Kabelkanalzwischenpfosten`)
  parts.push(`${p.eck} Eckpfosten`, `${p.end} Endpfosten`)
  return parts.join(', ')
}

/**
 * Field list of the configuration: [{ label, value }]
 * Used both for the email body and for the preview inside the form.
 */
export function buildConfigFields(activeType, state) {
  const sections = calcSections(state.laenge)
  const rows = []
  const add  = (label, value) => { if (value != null && value !== '') rows.push({ label, value }) }

  if (activeType === 'beton') {
    const height = BUILD_HEIGHTS[state.plateHeight]?.find(h => h.cm === state.buildHeight)

    add('Zaunart',      'Betonzaun')
    add('Motiv',        state.motif)
    add('Plattenhöhe',  `${state.plateHeight} cm`)
    add('Bauhöhe',      `${state.buildHeight} cm${height ? ` (${height.sub})` : ''}`)
    add('Farbe',        colorLabel(state.farbe))
    add('Ausführung',   'beidseitig')
    add('Zaunlänge',    `${state.laenge} m (${sections} Zaunfelder à 1,91 m)`)
    add('Pfosten',      pfostenLine(state))
    add('Pfostenfarbe', colorLabel(state.postenFarbe))
    add('Pfostenkappen', state.kappe === 'none' ? 'keine' : `${state.kappe}, ${colorLabel(state.kappeFarbe)}`)
    add('Abdeckungen',  state.abdeckung === 'none' ? 'keine' : `${state.abdeckung}, ${colorLabel(state.abdeckungFarbe)}`)
    add('Tor',          state.torSize ? `${state.torSize} cm Höhe, ${colorLabel(state.torFarbe)}` : 'nein')
    add('Farbe Brillux', state.brilluxColor?.trim() ? `Farbnummer ${state.brilluxColor.trim()}` : 'nein')
  } else {
    add('Zaunart',      'Holz-Betonzaun')
    add('Holzart',      materialLabel(state.holzMaterial))
    add('Holz-Sichtschutz', `${state.holzCm} cm`)
    add('Beton-Motiv',  state.motif || '—')
    add('Beton-Farbe',  colorLabel(state.farbe))
    add('Ausführung',   'beidseitig')
    add('Bauhöhe',      `${state.buildHeight} cm (${state.betonPlatten} Betonplatte${state.betonPlatten > 1 ? 'n' : ''} + Holz ${state.holzCm} cm)`)
    add('Abdeckleistung', state.abdeckleistung ? 'ja' : 'nein')
    add('Zaunlänge',    `${state.laenge} m (${sections} Zaunfelder à 1,91 m)`)
    add('Pfosten',      pfostenLine(state))
    add('Pfostenfarbe', colorLabel(state.postenFarbe))
    add('Tor',          state.torSize ? `Holz-Tor ${state.torSize} cm Breite` : 'nein')
  }

  add('Montage',      MONTAGE_LABEL[state.montage] || state.montage)
  add('Trockenbeton', state.beton ? 'ja' : 'nein')

  return rows
}

/**
 * The whole request as text: configuration, every position with its price,
 * the total shown to the customer, and the page it was configured on.
 */
export function buildConfigText({ activeType, state, items, priceFn, total, hasTotal }) {
  const lines = []

  lines.push('KONFIGURATION')
  for (const { label, value } of buildConfigFields(activeType, state)) {
    lines.push(`${label}: ${value}`)
  }

  lines.push('', 'POSITIONEN')
  for (const item of items) {
    const unit = item.fixedPrice != null ? item.fixedPrice : priceFn(item.variantId)
    const sum  = unit != null ? fmtPrice(unit * item.qty) : '—'
    lines.push(`${item.qty} × ${item.label}: ${sum}`)
  }

  lines.push('', `Angezeigter Gesamtpreis: ${hasTotal ? fmtPrice(total) : '—'} (inkl. MwSt., zzgl. Lieferung)`)
  lines.push(`Konfiguriert am: ${new Date().toLocaleString('de-DE')}`)
  lines.push(`Seite: ${window.location.href}`)

  return lines.join('\n')
}
