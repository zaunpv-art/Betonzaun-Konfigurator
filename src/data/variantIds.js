/**
 * SHOPIFY VARIANT IDs — populated from admin URLs + CSV export

 */

// ─── BETON PLATTEN ────────────────────────────────────────────────────────────
// PLATE_VARIANTS[plateHeight][motif][seiten][farbe]

export const PLATE_VARIANTS = {
  '26': {
    Fels: {
      beidseitig: {
        Naturgrau: '53439095963912',
        Anthrazit: '53439095996680',
        Schwarz:   '53439096029448',
      },
    },
    Nostalgie: {
      beidseitig: {
        Naturgrau: '53479425147144',
        Anthrazit: '53479425179912',
        Schwarz:   '53479425212680',
      },
    },
    Romania: {
      beidseitig: {
        Naturgrau: '53479398277384',
        Anthrazit: '53479398310152',
        Schwarz:   '53479398342920',
      },
    },
    Schiefer: {
      beidseitig: {
        Naturgrau: '53479327400200',
        Anthrazit: '53479327432968',
        Schwarz:   '53479327465736',
      },
    },
    Holzoptik: {
      beidseitig: {
        Naturgrau: '53439073255688',
        Anthrazit: '53439073288456',
        Schwarz:   '53439073321224',
      },
    },
    Modern: {
      beidseitig: {
        Naturgrau: '53439085117704',
        Anthrazit: '53439085150472',
        Schwarz:   '53439085183240',
      },
    },
    Mosaik: {
      beidseitig: {
        Naturgrau: '', // 26cm not in Shopify yet
        Anthrazit: '',
        Schwarz:   '',
      },
    },
    Lamella: {
      beidseitig: {
        Naturgrau: '53439088296200',
        Anthrazit: '53439088328968',
        Schwarz:   '53439088361736',
      },
    },
    Mikado: {
      beidseitig: {
        Naturgrau: '', // 26cm not in Shopify yet
        Anthrazit: '',
        Schwarz:   '',
      },
    },
  },
  '36': {
    Fels: {
      beidseitig: {
        Naturgrau: '53479284080904',
        Anthrazit: '53479284113672',
        Schwarz:   '53479284146440',
      },
      einseitig: {
        Naturgrau: '53479284179208',
      },
    },
    Nostalgie: {
      beidseitig: {
        Naturgrau: '53479425245448',
        Anthrazit: '53479425310984',
        Schwarz:   '53479425343752',
      },
      einseitig: {
        Naturgrau: '53479425278216',
      },
    },
    Romania: {
      beidseitig: {
        Naturgrau: '53479398375688',
        Anthrazit: '53479398441224',
        Schwarz:   '53479398473992',
      },
      einseitig: {
        Naturgrau: '53479398408456',
      },
    },
    Schiefer: {
      beidseitig: {
        Naturgrau: '53479327498504',
        Anthrazit: '53479327531272',
        Schwarz:   '53479327564040',
      },
      einseitig: {
        Naturgrau: '53479327596808',
      },
    },
    Holzoptik: {
      beidseitig: {
        Naturgrau: '', // not in Shopify yet
        Anthrazit: '',
        Schwarz:   '',
      },
    },
    Mosaik: {
      beidseitig: {
        Naturgrau: '53439120015624',
        Anthrazit: '53439120048392',
        Schwarz:   '53439120081160',
      },
    },
    Mikado: {
      beidseitig: {
        Naturgrau: '53439116804360',
        Anthrazit: '53439116837128',
        Schwarz:   '53439116869896',
      },
    },
  },
}

// ─── BETON PFOSTEN ───────────────────────────────────────────────────────────
// PFOSTEN_VARIANTS[type][buildHeight][farbe]

export const PFOSTEN_VARIANTS = {
  zwischen: {
    '180': { Naturgrau: '53439148327176', Anthrazit: '53439148359944', Schwarz: '53439148392712' },
    '182': { Naturgrau: '53479012598024', Anthrazit: '53479012630792', Schwarz: '53479012663560' },
    '208': { Naturgrau: '53479012696328', Anthrazit: '53479012729096', Schwarz: '53479012761864' },
    '216': { Naturgrau: '53479012794632', Anthrazit: '53479012827400', Schwarz: '53479012860168' },
    '234': { Naturgrau: '53479012892936', Anthrazit: '53479012925704', Schwarz: '53479012958472' },
    '252': { Naturgrau: '53479012991240', Anthrazit: '53479013024008', Schwarz: '53479013056776' },
  },
  eck: {
    '180': { Naturgrau: '53439150850312', Anthrazit: '53439150883080', Schwarz: '53439150915848' },
    '182': { Naturgrau: '53480023752968', Anthrazit: '53480023785736', Schwarz: '53480023818504' },
    '208': { Naturgrau: '53480023851272', Anthrazit: '53480023884040', Schwarz: '53480023916808' },
    '216': { Naturgrau: '53480023949576', Anthrazit: '53480023982344', Schwarz: '53480024015112' },
    '234': { Naturgrau: '53480024047880', Anthrazit: '53480024080648', Schwarz: '53480024113416' },
    '252': { Naturgrau: '53480024146184', Anthrazit: '53480024178952', Schwarz: '53480024211720' },
  },
  end: {
    '180': { Naturgrau: '53480248017160', Anthrazit: '53480248049928', Schwarz: '53480248082696' },
    '182': { Naturgrau: '53480248115464', Anthrazit: '53480248148232', Schwarz: '53480248181000' },
    '208': { Naturgrau: '53480248213768', Anthrazit: '53480248246536', Schwarz: '53480248279304' },
    '216': { Naturgrau: '53480248312072', Anthrazit: '53480248344840', Schwarz: '53480248377608' },
    '234': { Naturgrau: '53480248410376', Anthrazit: '53480248443144', Schwarz: '53480248475912' },
    '252': { Naturgrau: '53480248508680', Anthrazit: '53480248541448', Schwarz: '53480248574216' },
  },
}

// ─── PFOSTENKAPPEN ───────────────────────────────────────────────────────────

export const KAPPE_VARIANTS = {
  abgeschlossen: {
    Flach:   { Naturgrau: '53439226282248', Anthrazit: '53439226315016', Schwarz: '53439226347784' },
    Diamant: { Naturgrau: '53439233229064', Anthrazit: '53439233261832', Schwarz: '53439233294600' },
  },
  eck: {
    Flach:   { Naturgrau: '53439224643848', Anthrazit: '53439224676616', Schwarz: '53439224709384' },
    Diamant: { Naturgrau: '53439230869768', Anthrazit: '53439230902536', Schwarz: '53439230935304' },
  },
  end: {
    Flach:   { Naturgrau: '53439223464200', Anthrazit: '53439223496968', Schwarz: '53439223529736' },
    Diamant: { Naturgrau: '53439229853960', Anthrazit: '53439229886728', Schwarz: '53439229919496' },
  },
  zwischen: {
    Flach:   { Naturgrau: '53439220777224', Anthrazit: '53439220809992', Schwarz: '53439220842760' },
    Diamant: { Naturgrau: '53439228215560', Anthrazit: '53439228248328', Schwarz: '53439228281096' },
  },
}

// ─── ABDECKUNGEN ─────────────────────────────────────────────────────────────

export const ABDECKUNG_VARIANTS = {
  Flach:   { Naturgrau: '53439235227912', Anthrazit: '53439235260680', Schwarz: '53439235293448' },
  Diamant: { Naturgrau: '53439237193992', Anthrazit: '53439237226760', Schwarz: '53439237259528' },
}

// ─── BETON 25KG ──────────────────────────────────────────────────────────────

export const BETON_VARIANT_ID = '54976624656648'

// ─── TOR (Betonzaun) ─────────────────────────────────────────────────────────

export const TOR_VARIANTS = {
  '180': { Naturgrau: '54980810801416', Anthrazit: '54980810768648' },
  '200': { Naturgrau: '54980810866952', Anthrazit: '54980810834184' },
}

// ─── DOPPELFLÜGELTOR ─────────────────────────────────────────────────────────

export const DOPPELFLUGELTOR_VARIANT_ID = '54980839244040' // Anthrazit only

// ─── HOLZ SICHTSCHUTZ ────────────────────────────────────────────────────────

export const HOLZ_SICHTSCHUTZ_VARIANTS = {
  RedClass:    { '90': '53450417307912', '150': '53450417340680', '180': '53450417373448' },
  Kiefer:      { '90': '53450413539592', '150': '53450413572360', '180': '53450413605128' },
  KieferBlack: { '90': '53450278338824', '150': '53450278371592', '180': '53450278404360' },
}

// ─── HOLZ ABDECKLEISTUNG ─────────────────────────────────────────────────────

export const HOLZ_ABDECKLEISTUNG_VARIANTS = {
  RedClass:    '53450432676104',
  Kiefer:      '53450431201544',
  KieferBlack: '53450428252424',
}

// ─── HOLZ TOR ────────────────────────────────────────────────────────────────

export const HOLZ_TOR_VARIANTS = {
  RedClass:    { '100': '53454684455176', '120': '53454684487944' },
  Kiefer:      { '100': '53454668529928', '120': '53454668562696' },
  KieferBlack: { '100': '53454637498632', '120': '53454637531400' },
}

// ─── HOLZ PFOSTEN ────────────────────────────────────────────────────────────

export const HOLZ_PFOSTEN_VARIANTS = {
  zwischen: {
    '116':        { Naturgrau: '54974409900296', Anthrazit: '', Schwarz: '54974409933064' },
    '206-holz150': { Naturgrau: '54974409965832', Anthrazit: '', Schwarz: '54974409998600' },
    '206-holz180': { Naturgrau: '54974410031368', Anthrazit: '', Schwarz: '54974410064136' },
  },
  eck: {
    '116':        { Naturgrau: '53480387379464', Anthrazit: '', Schwarz: '53480387412232' },
    '206-holz150': { Naturgrau: '53480387445000', Anthrazit: '', Schwarz: '53480387477768' },
    '206-holz180': { Naturgrau: '53480387510536', Anthrazit: '', Schwarz: '53480387543304' },
  },
  end: {
    '116':        { Naturgrau: '53480381677832', Anthrazit: '', Schwarz: '53480381710600' },
    '206-holz150': { Naturgrau: '53480381743368', Anthrazit: '', Schwarz: '53480381776136' },
    '206-holz180': { Naturgrau: '53480381808904', Anthrazit: '', Schwarz: '53480381841672' },
  },
}

// ─── HOLZ TORRAHMEN ──────────────────────────────────────────────────────────
// 1 per tor order, same wood type as Holz-Tor

export const HOLZ_TORRAHMEN_VARIANTS = {
  RedClass:    '57136118268168',
  Kiefer:      '57136118235400',
  KieferBlack: '53454711816456',
}

// ─── HOLZ-BETON PLATTENKLOBEN ────────────────────────────────────────────────
// 1 set per tor order

export const HOLZ_PLATTENKLOBEN_VARIANT_ID = '54982867321096'

// ─── BEFESTIGUNGSSET EDELSTAHL ───────────────────────────────────────────────
// 1 set per Sichtschutz section

export const HOLZ_BEFESTIGUNGSSET_VARIANT_ID = '54982867124488'

// ─── FARBE (Betonzaun coating) ───────────────────────────────────────────────
// 1 bucket per 10m of fence length (ceil)

export const FARBE_VARIANT_ID = '54976623804680'

// ─── MONTAGE ─────────────────────────────────────────────────────────────────

export const MONTAGE_PROFI_VARIANT_ID  = '57446597394696' // 1 per 1m of fence
export const MONTAGE_HILFE_VARIANT_ID  = '57446597427464' // 1 per order (up to 2 days)
export const MONTAGE_ANFAHRT_VARIANT_ID = '57774211137800' // 1 per order, auto-added with profi

// ─── KABELKANALZWISCHENPFOSTEN ────────────────────────────────────────────────
// Same heights and colors as regular Zwischenpfosten

export const KABELKANAL_VARIANTS = {
  '180': { Naturgrau: '53439193186568', Anthrazit: '53439193219336', Schwarz: '53439193252104' },
  '182': { Naturgrau: '57913289376008', Anthrazit: '57913289408776', Schwarz: '57913289441544' },
  '208': { Naturgrau: '57913289474312', Anthrazit: '57913289507080', Schwarz: '57913289539848' },
  '216': { Naturgrau: '57913289572616', Anthrazit: '57913289605384', Schwarz: '57913289638152' },
  '234': { Naturgrau: '57913289670920', Anthrazit: '57913289703688', Schwarz: '57913289736456' },
  '252': { Naturgrau: '57913289769224', Anthrazit: '57913289801992', Schwarz: '57913289834760' },
}
