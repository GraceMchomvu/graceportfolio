# Olmera asset map

Stable filenames used on the portfolio so bag mockups and the cover can be swapped without editing HTML.

Case study page: Selected Work modal on `index.html` (also `index-light.html` and `index-dark.html`).
Card and highlight image: `img/portfolio/9.jpg` (and `img/portfolio/9.webp`).

## Files in `img/portfolio/olmera/`

| File | Used as | Swap? |
|---|---|---|
| `01_cover.jpg` / `01_cover.webp` | Case-study cover still (same art as the card). Also copied to `img/portfolio/9.jpg` and `assets/olmera.jpg`. | **Yes — being redesigned.** Replace these three plus the webp. |
| `02_olmera_ad_HD.mp4` | Launch ad in the case study (`<video>`). Phone-safe HD encode: H.264 High, level 4.0, 1920×1080, 30 fps, yuv420p, AAC stereo, +faststart, ~7.4 MB. Source: `coffee_brand/contra_v2/mobile/olmera_ad_HD_1080p_mobile.mp4`. Attributes: playsinline, webkit-playsinline, muted, autoplay, loop, controls, poster. | No, unless the ad is re-exported. Keep the same phone-safe 1080p profile so it plays on mobile. |
| `02_olmera_ad_poster.jpg` | `poster` image on the `<video>` (frame at 3s). | Only if the ad changes. |
| `03_mark_concept.jpg` / `.webp` | Mark concept board | No |
| `04_identity_logo_palette_type.jpg` / `.webp` | Logo, palette and type | No |
| `05_packaging_labels_flat.jpg` / `.webp` | Flat labels | No |
| `06_packaging_trio_mockup.jpg` / `.webp` | Bag trio mockup | **Yes — being redesigned.** |
| `07_kibo_ember_hero_mockup.jpg` / `.webp` | Kibo Ember hero mockup | **Yes — being redesigned.** |
| `08_posters_overview.jpg` / `.webp` | Poster series overview | No |
| `09_posters_crafted_kibo.jpg` / `.webp` | Crafted / Kibo posters | No |
| `10_posters_trio_noir.jpg` / `.webp` | Poster trio / Usiku Noir | No |
| `11_tshirt_mockup.jpg` / `.webp` | T-shirt mockup | No |
| `12_tshirt_print_artwork.jpg` / `.webp` | T-shirt artwork | No |
| `14_closing.jpg` / `.webp` | Closing board | No |

## How to swap the cover or bag mockups

Keep the same file names and 4:3 art (1400×1050 JPEG + WebP, quality ~85).

1. **Cover:** overwrite `img/portfolio/olmera/01_cover.jpg` and `.webp`, then also replace `img/portfolio/9.jpg`, `img/portfolio/9.webp`, and `assets/olmera.jpg` with the same image (the card, Project Highlights avatar, and case-study hero all point at `img/portfolio/9.jpg`).
2. **Bag trio:** overwrite `img/portfolio/olmera/06_packaging_trio_mockup.jpg` and `.webp`.
3. **Kibo Ember hero:** overwrite `img/portfolio/olmera/07_kibo_ember_hero_mockup.jpg` and `.webp`.

No HTML changes are needed if the names stay the same.

## Left out on purpose

Storefront, café, and interior images. The vertical ad is not on the site; the landscape phone-safe ad is used instead so it plays on desktop and mobile.

