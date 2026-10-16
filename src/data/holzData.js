export const HOLZ_MOTIFS = [
  { id: 'Nostalgie', label: 'Nostalgie', swatch: 's-nostalgie' },
  { id: 'Fels',      label: 'Fels',      swatch: 's-fels'      },
  { id: 'Schiefer',  label: 'Schiefer',  swatch: 's-schiefer'  },
  { id: 'Romania',   label: 'Romania',   swatch: 's-romania'   },
  { id: 'Holzoptik', label: 'Holzoptik', swatch: 's-holzoptik' },
  { id: 'Modern',    label: 'Modern',    swatch: 's-modern'    },
  { id: 'Lamella',   label: 'Lamella',   swatch: 's-lamella'   },
  { id: 'Mosaik',    label: 'Mosaik',    swatch: 's-mosaik'    },
  { id: 'Mikado',    label: 'Mikado',    swatch: 's-mikado'    },
]

export const HOLZ_MATERIALS = [
  { id: 'RedClass',    label: 'Red Class',    swatch: 'mat-red'         },
  { id: 'Kiefer',      label: 'Kiefer',       swatch: 'mat-kiefer'      },
  { id: 'KieferBlack', label: 'Kiefer Black', swatch: 'mat-kieferblack' },
]

// 116cm: always 1 beton plate + 90cm holz
// 206cm: user picks 1 plate (180cm holz) or 2 plates (150cm holz)
export const HOLZ_HEIGHT_CONFIG = {
  '116': { fixedPlatten: 1, holzOptions: [{ platten: 1, holzCm: '90' }] },
  '206': { fixedPlatten: null, holzOptions: [
    { platten: 1, holzCm: '180', label: '1 Platte → Holz 180 cm' },
    { platten: 2, holzCm: '150', label: '2 Platten → Holz 150 cm' },
  ]},
}

export const HOLZ_BETON_BAGS_PER_PFOSTEN = 4

export const COLORS = [
  { id: 'Naturgrau', label: 'Naturgrau',              dot: 'd-naturgrau' },
  { id: 'Anthrazit', label: 'Anthrazit durchgefärbt', dot: 'd-anthrazit' },
  { id: 'Schwarz',   label: 'Schwarz/Coating',        dot: 'd-coated'    },
]
