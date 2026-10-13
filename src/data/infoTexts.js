/**
 * Tooltip texts shown behind the ⓘ icons in the configurator.
 * Based on the product pages and Ratgeber on betonzaun.de.
 * Each entry: { title?, text: string | string[], link?: { href, label } }
 */

const SITE = 'https://betonzaun.de'

export const INFO = {

  // ─── BETONZAUN ─────────────────────────────────────────────────────────────

  plattenhoehe: {
    title: '26 cm oder 36 cm Platten?',
    text: [
      '26 cm Platten wiegen ca. 40 kg und lassen sich von 2 Personen gut tragen und einsetzen – ideal für die Selbstmontage.',
      '36 cm Platten wiegen ca. 60 kg. Sie brauchen weniger Platten pro Feld und damit weniger Fugen, sind aber deutlich schwerer.',
    ],
  },

  bauhoehe: {
    title: 'Bauhöhe',
    text: [
      'Die Bauhöhe ergibt sich aus der Anzahl der Platten pro Feld (z. B. 7 × 26 cm = 182 cm).',
      'Abdeckungen machen den Zaun ca. 4 cm höher. Die Pfosten sind länger als die Bauhöhe, da sie im Fundament einbetoniert werden.',
    ],
  },

  farbe: {
    title: 'Farben im Vergleich',
    text: [
      'Naturgrau – unbehandelter Beton im natürlichen Grauton.',
      'Anthrazit durchgefärbt – das Pigment steckt in der gesamten Betonmasse, nicht nur an der Oberfläche.',
      'Schwarz/Coating – mit zusätzlichem Schutzanstrich (Coating) beschichtet.',
    ],
  },

  zaunlaenge: {
    title: 'Zaunlänge & Felder',
    text: [
      'Ein Zaunfeld ist 1,91 m breit (Platten + Pfosten). Die Anzahl der Felder wird immer aufgerundet – halbe Felder gibt es nicht.',
      'Tipp: Wenn nichts anderes geregelt ist, sollte der Zaun ca. 50 cm von der Grundstücksgrenze entfernt stehen.',
    ],
    link: { href: `${SITE}/fragen-und-antworten/`, label: 'Fragen & Antworten' },
  },

  pfosten: {
    title: 'Welche Pfosten brauche ich?',
    text: [
      'Zwischenpfosten stehen zwischen zwei Zaunfeldern und halten Platten auf beiden Seiten. Endpfosten schließen einen Zaunzug ab (z. B. am Zaunende oder neben einem Tor) und haben nur auf einer Seite eine Nut. Eckpfosten verbinden zwei Zaunzüge im 90°-Winkel.',
      'Die Zwischenpfosten berechnen wir aus Ihrer Zaunlänge vor – Sie können alle Werte selbst anpassen.',
    ],
  },

  zwischenpfosten: {
    title: 'Zwischenpfosten',
    text: [
      'Vorausgewählt: Anzahl Zaunfelder + 1 (bei 6 Feldern also 7 Zwischenpfosten).',
      'Eck- und Endpfosten ersetzen Zwischenpfosten – die Anzahl passt sich automatisch an. Sie können den Wert jederzeit selbst ändern.',
    ],
  },

  eckpfosten: {
    title: 'Eckpfosten',
    text: 'Ein Eckpfosten pro 90°-Ecke. Er hat Nuten an zwei angrenzenden Seiten und ersetzt dort einen Zwischenpfosten.',
  },

  endpfosten: {
    title: 'Endpfosten',
    text: [
      'Endpfosten setzen Sie am Anfang und Ende eines Zaunzugs sowie neben Toren oder Durchgängen ein. Die Anzahl ist frei wählbar.',
      'Je 2 Endpfosten ersetzen 1 Zwischenpfosten: 1 Endpfosten → keine Änderung, 2 oder 3 → 1 Zwischenpfosten weniger, 4 → 2 weniger usw.',
      'Wenn Sie ein Tor hinzufügen, ergänzen wir automatisch 2 Endpfosten – je einen links und rechts der Toröffnung.',
    ],
  },

  kabelkanal: {
    text: 'Zwischenpfosten mit integriertem Kabelkanal für Strom- oder Datenleitungen, z. B. für eine Zaunbeleuchtung.',
  },

  kappen: {
    title: 'Pfostenkappen',
    text: [
      'Die Kappe ist der obere Abschluss des Pfostens (14,5 × 14,5 × 5 cm) und schützt ihn vor Witterung.',
      'Flach – gerade Oberseite. Diamant – pyramidenförmige Spitze.',
      'Ohne Abdeckung erhalten Sie geschlossene Kappen. Mit Abdeckung passen wir die Kappen automatisch an (Eck-, End- und Durchgangskappen mit Aussparung für die Abdeckung).',
    ],
    link: { href: `${SITE}/pfostenkappen/`, label: 'Pfostenkappen ansehen' },
  },

  abdeckung: {
    title: 'Abdeckungen',
    text: [
      'Betonleiste als oberer Abschluss jedes Zaunfelds (ca. 180 × 8 × 4,5 cm), in den gleichen Farben wie Platten und Pfosten.',
      'Pfostenkappen sind nicht enthalten und werden separat in Schritt 06 gewählt.',
    ],
    link: { href: `${SITE}/abdeckung/`, label: 'Abdeckungen ansehen' },
  },

  trockenbeton: {
    title: 'Trockenbeton',
    text: [
      'Fertigbeton im Sack für die Pfostenfundamente – wird nur mit Wasser angemischt.',
      'Bei Profimontage und Montagehilfe ist Trockenbeton immer enthalten.',
    ],
  },

  tor: {
    title: 'Tor',
    text: [
      'Tor mit 100 cm Breite, wählbar in 180 oder 200 cm Höhe. Scharniere, Riegel und Schloss aus Edelstahl.',
      'Mit dem Tor werden automatisch 2 Endpfosten ergänzt (Schritt 05) – je einer links und rechts der Toröffnung.',
    ],
    link: { href: `${SITE}/ratgeber/tore/`, label: 'Tor- und Türmontage' },
  },

  brillux: {
    title: 'Farbe Brillux',
    text: [
      'Brillux Evocryl 200 mit Protect – schützt den Zaun zusätzlich vor Algen- und Pilzbefall.',
      'Verbrauch ca. 0,2–0,4 l pro m². Geben Sie die gewünschte Brillux Farbnummer an.',
    ],
    link: { href: `${SITE}/ratgeber/farbanstrich-eines-betonzauns/`, label: 'Ratgeber Farbanstrich' },
  },

  // ─── HOLZ-BETON ────────────────────────────────────────────────────────────

  holzart: {
    title: 'Holz-Sichtschutz',
    text: [
      'Jedes Holzfeld besteht aus 19 Brettern (1,6 × 14 cm) mit Zwischenleiste. Die Höhe des Holzfelds ergibt sich aus der gewählten Bauhöhe.',
      'Kiefer Black ist schwarz lackiertes Kiefernholz.',
      'Pro Feld ist ein Befestigungsset aus Edelstahl automatisch enthalten.',
    ],
    link: { href: `${SITE}/sichtschutz/`, label: 'Sichtschutz ansehen' },
  },

  holzSockel: {
    text: 'Die Betonplatte (26 cm) bildet den Sockel unter dem Holzfeld. Bei 206 cm Bauhöhe können Sie in Schritt 03 auch 2 Platten als Sockel wählen.',
  },

  holzBauhoehe: {
    title: 'Aufbau der Bauhöhe',
    text: [
      '116 cm: 1 Betonplatte (26 cm) + Holzfeld 90 cm.',
      '206 cm: wahlweise 1 Betonplatte + Holzfeld 180 cm, oder 2 Betonplatten + Holzfeld 150 cm für einen höheren Betonsockel.',
    ],
  },

  abdeckleiste: {
    title: 'Abdeckleiste',
    text: 'Holzleiste als oberer Abschluss des Holzfelds (180 cm, gleiche Holzart). Sie schützt die Oberkanten der Bretter vor Regen und verlängert die Lebensdauer.',
    link: { href: `${SITE}/abdeckleisten/`, label: 'Abdeckleisten ansehen' },
  },

  holzPfosten: {
    title: 'Pfosten Holz-Beton',
    text: [
      'Holz-Beton-Pfosten gibt es in Naturgrau und Schwarz/Coating.',
      'Zwischenpfosten berechnen wir aus Ihrer Zaunlänge vor. Endpfosten schließen einen Zaunzug ab (z. B. am Zaunende oder neben einem Tor), Eckpfosten verbinden zwei Zaunzüge im 90°-Winkel. Alle Werte können Sie selbst anpassen.',
    ],
  },

  holzTor: {
    title: 'Holz-Tor',
    text: [
      'Tor in derselben Holzart wie der Sichtschutz, 100 oder 120 cm breit.',
      'Torrahmen und Plattenkloben (Befestigung am Betonpfosten) werden automatisch mitbestellt, dazu 2 Endpfosten (Schritt 06) für beide Seiten der Toröffnung.',
    ],
    link: { href: `${SITE}/torrahmen/`, label: 'Torrahmen ansehen' },
  },
}

// ─── MONTAGE (shown under the cards for the selected option) ─────────────────

export const MONTAGE_INFO = {
  profi: {
    text: 'Unser Montageteam übernimmt den kompletten Aufbau: Zaunverlauf abstecken, Fundamente ausheben, Pfosten einbetonieren und Platten setzen. Abrechnung pro Meter plus einmalige Anfahrt. Trockenbeton ist automatisch enthalten.',
    link: { href: `${SITE}/beratung/professionelle-montage/`, label: 'Mehr zur Profimontage' },
  },
  hilfe: {
    text: 'Ein Profimonteur baut den Zaun gemeinsam mit Ihnen auf und bringt Werkzeug, Laserwaage und Maurerschnur mit. Sie stellen 2 kräftige Helfer, einen 230-V-Stromanschluss und Wasser (Gartenschlauch genügt).',
    link: { href: `${SITE}/ratgeber/montage/`, label: 'Mehr zur Montagehilfe' },
  },
  diy: {
    text: 'Sie bauen selbst. Pfostenfundamente ca. 30–40 cm Durchmesser und 60 cm tief (frostfrei). Tipp: 26 cm Platten lassen sich zu zweit gut tragen.',
    link: { href: `${SITE}/ratgeber/diy-betonzaun-montageanleitung/`, label: 'DIY-Montageanleitung' },
  },
}
