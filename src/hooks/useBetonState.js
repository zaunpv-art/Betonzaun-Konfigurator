import { useState, useEffect } from 'react'
import { AVAILABILITY, MOTIFS_BY_PLATE, BUILD_HEIGHTS } from '../data/betonData.js'
import { normaliseEndpfosten } from '../utils/calculations.js'
import { hasPlateVariant } from '../data/variantIds.js'

export function useBetonState() {
  const [motif,          setMotif]          = useState('Fels')
  const [plateHeight,    setPlateHeight]    = useState('26')
  const [buildHeight,    setBuildHeight]    = useState('182')
  const [farbe,          setFarbe]          = useState('Naturgrau')
  const [laenge,         setLaenge]         = useState(10)
  const [postenFarbe,    setPostenFarbe]    = useState('Naturgrau')
  const [eckpfosten,     setEckpfosten]     = useState(0)
  const [endpfosten,     setEndpfosten]     = useState(2)
  const [kappe,          setKappe]          = useState('none')
  const [kappeFarbe,     setKappeFarbe]     = useState('Naturgrau')
  const [abdeckung,      setAbdeckung]      = useState('none')
  const [abdeckungFarbe, setAbdeckungFarbe] = useState('Naturgrau')
  const [montage,        setMontage]        = useState('profi')
  const [beton,          setBeton]          = useState(true)
  const [torSize,        setTorSize]        = useState(null)
  const [brilluxColor,   setBrilluxColor]   = useState('')
  const [kabelkanal,     setKabelkanal]     = useState(0)
  const [torFarbe,       setTorFarbe]       = useState('Naturgrau')

  // ── Derived availability ─────────────────────────────────────────────────

  // Only beidseitig plates are offered
  const seiten = 'beidseitig'

  // Motifs offered for this plate height that also exist in Shopify
  const availableMotifs = (MOTIFS_BY_PLATE[plateHeight] || [])
    .filter(m => hasPlateVariant(plateHeight, m))

  const motifAvail = AVAILABILITY[plateHeight]?.[motif] || null

  const allowedColors = motifAvail?.[seiten] || []

  // ── Side effects: enforce constraints when upstream selections change ─────

  // If motif becomes unavailable for new plate height, reset to first available
  useEffect(() => {
    if (!availableMotifs.includes(motif)) {
      setMotif(availableMotifs[0])
    }
  }, [plateHeight])

  // If a motif is set that only exists in the other plate height (e.g. from a
  // #betonzaun/Mosaik link), switch the plate height instead of the motif
  useEffect(() => {
    if (availableMotifs.includes(motif)) return
    const other = plateHeight === '26' ? '36' : '26'
    if (MOTIFS_BY_PLATE[other]?.includes(motif) && hasPlateVariant(other, motif)) {
      setPlateHeight(other)
    }
  }, [motif])

  // If plate height changes, reset build height to first option
  useEffect(() => {
    const heights = BUILD_HEIGHTS[plateHeight]
    if (heights && !heights.find(h => h.cm === buildHeight)) {
      setBuildHeight(heights[0].cm)
    }
  }, [plateHeight])

  // If current farbe is not in allowedColors, reset to first allowed
  useEffect(() => {
    if (allowedColors.length > 0 && !allowedColors.includes(farbe)) {
      setFarbe(allowedColors[0])
    }
  }, [motif, plateHeight])

  // Auto-select and lock Beton when montage = profi or hilfe
  useEffect(() => {
    if (montage === 'profi' || montage === 'hilfe') setBeton(true)
  }, [montage])

  // Derived: beton cannot be toggled off when professional montage is selected
  const betonLocked = montage === 'profi' || montage === 'hilfe'

  // ── Helpers ──────────────────────────────────────────────────────────────

  function handleSetPlateHeight(val) {
    setPlateHeight(val)
  }

  function handleSetFarbe(val) {
    if (!allowedColors.includes(val)) return
    setFarbe(val)
  }

  function handleSetEndpfosten(val, dir = 1) {
    setEndpfosten(normaliseEndpfosten(val, dir))
  }

  function handleSetEckpfosten(val) {
    setEckpfosten(Math.max(0, val))
  }

  return {
    // state
    motif, plateHeight, buildHeight, seiten, farbe,
    laenge, postenFarbe, eckpfosten, endpfosten,
    kappe, kappeFarbe, abdeckung, abdeckungFarbe,
    montage, beton, betonLocked, torSize, brilluxColor,
    torFarbe, kabelkanal,
    // derived
    availableMotifs, allowedColors,
    // setters
    setMotif,
    setPlateHeight: handleSetPlateHeight,
    setBuildHeight,
    setFarbe: handleSetFarbe,
    setLaenge,
    setPostenFarbe,
    setEckpfosten: handleSetEckpfosten,
    setEndpfosten: handleSetEndpfosten,
    setKappe,
    setKappeFarbe,
    setAbdeckung,
    setAbdeckungFarbe,
    setMontage,
    setBeton,
    setTorSize,
    setBrilluxColor,
    torFarbe, setTorFarbe,
    kabelkanal, setKabelkanal,
  }
}
