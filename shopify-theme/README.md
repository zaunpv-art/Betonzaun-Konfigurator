# Theme files for betonzaun.de (Dawn 15.4)

## Native cart page (replaces the EComposer cart)

**One file:** paste `sections/main-cart-items.liquid` over the code of the theme's
existing `sections/main-cart-items.liquid` (Dawn's cart section). No new files, no
template change: `templates/cart.json` already uses this section, and the file keeps
Dawn's `color_scheme` / `padding_top` / `padding_bottom` settings so that template
stays valid.

Steps:
1. Duplicate the live theme and work on the copy.
2. EComposer → Pages → Cart → Unpublish, so Shopify serves the theme's own cart again.
   Check Templates → `cart.json` now lists `"type": "main-cart-items"`.
3. Paste this file into `sections/main-cart-items.liquid` and save.
4. Customise → Cart: hide the "Subtotal" section (Dawn's `main-cart-footer`) — the new
   section has its own summary and checkout button. Add the WhatsApp link.

What it does:

- Layout of the current EComposer cart: order steps, product table, note to the
  seller, Profi-Montage banner, trust badges, summary with discount code and AGB
  checkbox, shipping estimate by postcode, contact card.
- One card per configurator set (lines with the hidden property `_konfig_set`):
  icon, "Betonzaun-Konfigurator · Set 1", "Konfiguriertes Set · N Positionen",
  "Set entfernen", the selections folded under "Ihre Auswahl anzeigen". Products
  added on their own go into a separate card "Einzelne Produkte".
- "Warenkorb leeren" (with confirmation). Dawn's own subtotal box is hidden.
- Check what the configurator put into the cart: open `/cart?bzdebug=1` — it lists
  every line with all its properties, also the hidden ones.
- Quantities, removing, the note and the summary update without reloading.
- "Angebot anfragen" opens the configurator's consultation form and e-mails the cart
  (grouped by set) through Shopify's contact form, marked as
  "Profi-Montage-Anfrage aus dem Warenkorb". Captcha fallback, consent, gclid/UTM and
  the Google Ads conversion work as in the configurator.
- Texts, phone, WhatsApp link, colours and links are editable in the theme editor.

## Cart drawer grouping (only if Cart type = Drawer)

| File | Action |
| --- | --- |
| `snippets/konfig-set-header.liquid` | **new** |
| `snippets/cart-drawer.liquid` | replace |

