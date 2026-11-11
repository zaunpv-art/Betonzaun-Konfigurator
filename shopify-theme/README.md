# Theme files for betonzaun.de (Dawn 15.4)

## Native cart page (replaces the EComposer cart)

| File | Action |
| --- | --- |
| `sections/betonzaun-cart.liquid` | **new** — Sections → Add a new section → `betonzaun-cart` |
| `snippets/bz-cart-line.liquid` | **new** — Snippets → Add a new snippet → `bz-cart-line` |
| `templates/cart.json` | replace — Templates → `cart.json` |

What it does:

- Layout of the current EComposer cart: order steps, product table, note to the
  seller, Profi-Montage banner, trust badges, summary with discount code and AGB
  checkbox, shipping estimate by postcode, contact card.
- Configurator sets (lines with the hidden property `_konfig_set`) are grouped under
  one heading with the customer's selections, the set total and "Set entfernen";
  products added on their own are listed under "Einzelprodukte".
- Quantities, removing, the note and the summary update without reloading.
- "Angebot anfragen" opens the configurator's consultation form and e-mails the cart
  (grouped by set) through Shopify's contact form, marked as
  "Profi-Montage-Anfrage aus dem Warenkorb". Captcha fallback, consent, gclid/UTM and
  the Google Ads conversion work as in the configurator.
- Texts, phone, WhatsApp link, colours and links are editable in the theme editor.

Switching over: first turn the EComposer cart page off (EComposer → Pages → Cart →
Unpublish), otherwise EComposer keeps serving its own cart. Then save the files above.

## Cart drawer grouping (only if Cart type = Drawer)

| File | Action |
| --- | --- |
| `snippets/konfig-set-header.liquid` | **new** |
| `snippets/cart-drawer.liquid` | replace |

`sections/main-cart-items.liquid` is the earlier grouping for Dawn's own cart page;
it is no longer needed once `templates/cart.json` uses `betonzaun-cart`.
