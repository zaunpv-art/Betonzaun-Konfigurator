import { useState, useEffect } from 'react'
import { normaliseEndpfosten } from '../utils/calculations.js'

export function useHolzState() {
  const [motif,          setMotif]          = useState(null)  // no preselection
  const [buildHeight,    setBuildHeight]    = useState('116')
  const [betonPlatten,   setBetonPlatten]   = useState(1)
  const [holzCm,         setHolzCm]         = useState('90')
  const [holzMaterial,   setHolzMaterial]   = useState(null)  // no preselection
  const [abdeckleistung, setAbdeckleistung] = useState(false)
  const [laenge,         setLaenge]         = useState(10)
  const [postenFarbe,    setPostenFarbe]    = useState('Naturgrau')
  const [eckpfosten,     setEckpfosten]     = useState(0)
  const [endpfosten,     setEndpfosten]     = useState(2)
  const [montage,        setMontage]        = useState('profi')
  const [beton,          setBeton]          = useState(true)
  const [torSize,        setTorSize]        = useState(null)
  // Betonplatte (sockel) appearance
  const [farbe,          setFarbe]          = useState('Naturgrau')
  // Only beidseitig plates are offered
  const seiten = 'beidseitig'

  // When height changes, reset betonPlatten and holzCm
  useEffect(() => {
    if (buildHeight === '116') {
      setBetonPlatten(1)
      setHolzCm('90')
    } else {
      setBetonPlatten(1)
      setHolzCm('180')
    }
  }, [buildHeight])

  // When betonPlatten changes (206cm only), update holzCm
  useEffect(() => {
    if (buildHeight === '206') {
      setHolzCm(betonPlatten === 1 ? '180' : '150')
    }
  }, [betonPlatten])

  // Auto-select and lock Beton for profi or hilfe montage
  useEffect(() => {
    if (montage === 'profi' || montage === 'hilfe') setBeton(true)
  }, [montage])

  const betonLocked = montage === 'profi' || montage === 'hilfe'

  function handleSetEndpfosten(val, dir = 1) {
    setEndpfosten(normaliseEndpfosten(val, dir))
  }

  function handleSetEckpfosten(val) {
    setEckpfosten(Math.max(0, val))
  }

  return {
    motif, buildHeight, betonPlatten, holzCm, holzMaterial,
    abdeckleistung, laenge, postenFarbe, eckpfosten, endpfosten,
    montage, beton, betonLocked, torSize,
    farbe, seiten,
    setMotif,
    setBuildHeight,
    setBetonPlatten,
    setHolzMaterial,
    setAbdeckleistung,
    setLaenge,
    setPostenFarbe,
    setEckpfosten: handleSetEckpfosten,
    setEndpfosten: handleSetEndpfosten,
    setMontage,
    setBeton,
    setTorSize,
    setFarbe,
  }
}
