# WARCRAFTS Scale Models — storefront

A fast, dependency-free static e-commerce site for scale models (jets, helicopters, warships…), built for **Netlify**.

- **No build step** — plain HTML/CSS/JS in `site/`
- **Cart** stored in the browser (localStorage)
- **Checkout** submits orders to **Netlify Forms** (you get an email for each order) and/or sends the order on **WhatsApp**
- Cash on Delivery / Bank Transfer / JazzCash-Easypaisa options

## Project layout

```
images/                  ← original photos (never modified)
scripts/
  prepare-images.ps1     ← copies & optimises photos into site/assets/products/<id>/
  serve.js               ← local preview server
site/                    ← THIS is what gets deployed
  index.html  shop.html  product.html  checkout.html  contact.html  thank-you*.html  404.html
  css/styles.css
  js/config.js           ← brand name, currency, WhatsApp number, shipping, payment methods
  js/products.js         ← the catalogue (names, prices, stock, descriptions)
  js/app.js              ← storefront logic
  assets/products/<id>/  ← 1.jpg, 2.jpg … (+ sq/ square versions for cards)
netlify.toml
```

## Everyday edits

| I want to…                         | Edit                                   |
|------------------------------------|----------------------------------------|
| Change prices / stock / text       | `site/js/products.js`                  |
| Change WhatsApp number, email, fees| `site/js/config.js`                    |
| Mark a model as an assembly kit    | set `build: "kit"` in `products.js`    |
| Mark sold out                      | set `stock: 0`                         |

### Adding a new product
1. Put its photos in `images/My_/`.
2. Add an entry to the `$map` list in `scripts/prepare-images.ps1` (first photo = main photo).
3. Run: `powershell -ExecutionPolicy Bypass -File scripts\prepare-images.ps1`
4. Add the product to `site/js/products.js` (use the same `id`, set `images:` to the photo count).

Tanks & satellites categories already exist (shown as "Incoming") — once you add a product with
`category: "armor"` or `"space"`, remove `comingSoon: true` from that category in `products.js`.

## Preview locally
```
node scripts/serve.js
```
Open http://localhost:8080 (order forms only actually submit once deployed on Netlify).

## Deploy to Netlify
**Option A — drag & drop (quickest):** go to https://app.netlify.com/drop and drop the `site` folder.

**Option B — Git (recommended):** push this repo to GitHub → Netlify → *Add new site → Import from Git*.
`netlify.toml` already sets the publish directory to `site`, no build command needed.

**After the first deploy:**
1. Netlify dashboard → **Forms** → *Enable form detection*, then redeploy once.
2. **Forms → Form notifications** → add an email notification for the `order` form so every order lands in your inbox.
3. (Optional) **Domain management** → add your custom domain.
