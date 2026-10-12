// ─── MOTIFS ───────────────────────────────────────────────────────────────────

export const BETON_MOTIFS = [
  { id: 'Fels',      label: 'Fels',      swatch: 's-fels'      },
  { id: 'Nostalgie', label: 'Nostalgie', swatch: 's-nostalgie' },
  { id: 'Romania',   label: 'Romania',   swatch: 's-romania'   },
  { id: 'Schiefer',  label: 'Schiefer',  swatch: 's-schiefer'  },
  { id: 'Holzoptik', label: 'Holzoptik', swatch: 's-holzoptik' },
  { id: 'Modern',    label: 'Modern',    swatch: 's-modern'    },
  { id: 'Mosaik',    label: 'Mosaik',    swatch: 's-mosaik'    },
  { id: 'Lamella',   label: 'Lamella',   swatch: 's-lamella'   },
  { id: 'Mikado',    label: 'Mikado',    swatch: 's-mikado'    },
]

// ─── MOTIFS AVAILABLE BY PLATE HEIGHT ────────────────────────────────────────

export const MOTIFS_BY_PLATE = {
  '26': ['Fels','Nostalgie','Romania','Schiefer','Holzoptik','Modern','Mosaik','Lamella','Mikado'],
  '36': ['Fels','Nostalgie','Romania','Schiefer','Holzoptik','Mosaik','Mikado'],
}

// ─── AVAILABILITY MATRIX ─────────────────────────────────────────────────────
// [plateHeight][motif][seiten] → array of available colors

export const AVAILABILITY = {
  '26': {
    Fels:      { beidseitig: ['Naturgrau','Anthrazit','Schwarz'], einseitig: [] },
    Nostalgie: { beidseitig: ['Naturgrau','Anthrazit','Schwarz'], einseitig: [] },
    Romania:   { beidseitig: ['Naturgrau','Anthrazit','Schwarz'], einseitig: [] },
    Schiefer:  { beidseitig: ['Naturgrau','Anthrazit','Schwarz'], einseitig: [] },
    Holzoptik: { beidseitig: ['Naturgrau','Anthrazit','Schwarz'], einseitig: [] },
    Modern:    { beidseitig: ['Naturgrau','Anthrazit','Schwarz'], einseitig: [] },
    Mosaik:    { beidseitig: ['Naturgrau','Anthrazit','Schwarz'], einseitig: [] },
    Lamella:   { beidseitig: ['Naturgrau','Anthrazit','Schwarz'], einseitig: [] },
    Mikado:    { beidseitig: ['Naturgrau','Anthrazit','Schwarz'], einseitig: [] },
  },
  '36': {
    Fels:      { beidseitig: ['Naturgrau','Anthrazit','Schwarz'], einseitig: ['Naturgrau'] },
    Nostalgie: { beidseitig: ['Naturgrau','Anthrazit','Schwarz'], einseitig: ['Naturgrau'] },
    Romania:   { beidseitig: ['Naturgrau','Anthrazit','Schwarz'], einseitig: ['Naturgrau'] },
    Schiefer:  { beidseitig: ['Naturgrau','Anthrazit','Schwarz'], einseitig: ['Naturgrau'] },
    Holzoptik: { beidseitig: ['Naturgrau','Anthrazit','Schwarz'], einseitig: [] },
    Mosaik:    { beidseitig: ['Naturgrau','Anthrazit','Schwarz'], einseitig: [] },
    Mikado:    { beidseitig: ['Naturgrau','Anthrazit','Schwarz'], einseitig: [] },
  }
}

// ─── BUILDING HEIGHTS ────────────────────────────────────────────────────────

export const BUILD_HEIGHTS = {
  '26': [
    { cm: '182', plates: 7, label: '182 cm', sub: '7 × 26 cm' },
    { cm: '208', plates: 8, label: '208 cm', sub: '8 × 26 cm' },
    { cm: '234', plates: 9, label: '234 cm', sub: '9 × 26 cm' },
  ],
  '36': [
    { cm: '180', plates: 5, label: '180 cm', sub: '5 × 36 cm' },
    { cm: '216', plates: 6, label: '216 cm', sub: '6 × 36 cm' },
    { cm: '252', plates: 7, label: '252 cm', sub: '7 × 36 cm' },
  ],
}

// ─── BETON BAGS PER PFOSTEN ───────────────────────────────────────────────────

export const BETON_BAGS = {
  '180': 4, '182': 4, '208': 4, '216': 4,
  '234': 6, '252': 6,
}

// ─── SECTION WIDTH ────────────────────────────────────────────────────────────

export const SECTION_WIDTH_CM = 191

// ─── COLORS ───────────────────────────────────────────────────────────────────

export const COLORS = [
  { id: 'Naturgrau', label: 'Naturgrau',           dot: 'd-naturgrau' },
  { id: 'Anthrazit', label: 'Anthrazit durchgefärbt', dot: 'd-anthrazit' },
  { id: 'Schwarz',   label: 'Schwarz/Coating',     dot: 'd-coated'    },
]

// ─── KAPPE SHAPES ────────────────────────────────────────────────────────────

export const KAPPE_SHAPES = ['Flach', 'Diamant']
