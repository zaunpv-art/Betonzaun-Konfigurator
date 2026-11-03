# Theme files for betonzaun.de (Dawn 15.4)

Group the configurator's cart lines into sets on the cart page and in the cart drawer.

The configurator adds every line of one configuration with the properties
`Konfiguration` ("Betonzaun-Konfigurator · Set 1") and `_konfig_set` (hidden id);
one line also carries the customer's selections. These files show one heading
per set — name, selections, set total — with the set's products indented under it.
Products added on their own stay as normal rows.

| File | Action |
| --- | --- |
| `snippets/konfig-set-header.liquid` | **new** — Snippets → Add a new snippet → `konfig-set-header` |
| `sections/main-cart-items.liquid` | replace (cart page) |
| `snippets/cart-drawer.liquid` | replace (cart drawer, only if Cart type = Drawer) |

Based on Dawn 15.4 (`main-cart-items.liquid` matches the shop's copy). Every
change is marked with a `Konfigurator-Set` comment.
