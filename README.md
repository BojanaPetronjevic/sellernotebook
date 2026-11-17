# Seller Notebook (sellernotebook.com)

A small content site with honest AI guides for online sellers. Plain HTML and CSS, no frameworks, hosted free on GitHub Pages (repository `BojanaPetronjevic/sellernotebook`). The domain is registered at Porkbun.

## What each file is
| File / folder | What it is |
|---|---|
| `index.html` | Home page |
| `styles.css` | The whole look of the site, shared by every page |
| `animations.js` | Scroll and hover animations; timings are in `ANIMATION_SETTINGS` at the top |
| `photo-viewer.js` | Opens a photo bigger on top of the page; used by links with `data-photo-viewer` |
| `listings/`, `product-photos/`, `customer-service/`, `marketing/`, `shop-seo/` | Topic pages that list the guides |
| `etsy-product-descriptions-ai/`, `ai-prompts-customer-messages/`, `ai-product-titles/`, `white-background-product-photos-ai/`, `etsy-tags/` | Guides (each guide is a folder with an `index.html`, so its address is short) |
| `prompts/` | Prompt library: links to every prompt in the guides |
| `tools/` | Tools tested: how tools are tested and the reviews |
| `about/`, `contact/`, `privacy/`, `disclosure/` | Info pages |
| `404.html` | Page shown for a wrong address |
| `favicon.svg` | Browser tab icon |
| `sitemap.xml` | List of pages for Google; add every new page here |
| `robots.txt` | Tells search engines where the sitemap is |
| `CNAME` | Tells GitHub Pages the site's domain. Don't delete it |
| `downloads/seller-notebook-prompt-pack.pdf` | The free prompt pack (PDF) linked from the home and Prompts pages |
| `images/` | Photos and the simple guide thumbnails (`thumb-*.svg`) |
| `drafts/` | Research notes, the prompt pack page (`prompt-pack.html`) and its build script (not uploaded to the site) |
| `PLAN.md` | The site plan and the list of 30 planned guides (not uploaded to the site) |

## Where to change things
- **Colours, fonts, grain strength:** the `:root` block at the top of `styles.css`. `--grain-opacity` sets how strong the grain is (light and dark mode have separate values).
- **Animations:** speeds and delays are in `ANIMATION_SETTINGS` at the top of `animations.js`; the animation styles are at the bottom of `styles.css`. Visitors who turn off motion in their device settings see no animations.
- **Menu and footer links:** in every page's `<header>` and `<footer>`; they are the same on every page.
- **Author name and email:** in the About, Contact and Privacy pages and the author box at the end of each guide.

## Launch status (launched 2026-11-09)
- Done: noindex removed from every page except `404.html` (an error page should stay out of Google; new pages must NOT get a noindex line).
- Done: email forwarding hello@sellernotebook.com → thesellernotebook@gmail.com in Porkbun.
- Done: HTTPS (certificate issued 2026-11-08, "Enforce HTTPS" ticked). If it ever breaks, remove and re-add the custom domain in GitHub → Settings → Pages.
- Done: Search Console (Domain property), sitemap submitted 2026-11-09, indexing requested for the home page and both guides.
- Done: Bing Webmaster Tools (imported from Search Console 2026-11-09, sitemap submitted, all 15 pages sent through URL Submission). New guides: also submit them in Bing → URL Submission.
- Done: Ahrefs Webmaster Tools (project added 2026-11-17, verified with the `ahrefs-site-verification` meta tag in `index.html`; don't remove that line). Free weekly Site Audit, Tuesdays 08:00 Belgrade time.
- Done: Search Console linked in Ahrefs (GSC Insights), 2026-11-17.
- Done: Ahrefs Web Analytics (2026-11-17). Its `<script src="https://analytics.ahrefs.com/analytics.js" ...>` line sits just before `</head>` on every page, and the Privacy page names it. **New pages must get the same line** (copying a guide folder does this).

## Adding a new guide
1. Copy one guide folder, rename it to the new short address, and change the title, description, date, text and the schema block in the `<head>`.
2. Link it from its topic page (replace the "Coming soon" card) and from the Prompt library if it has prompts.
3. Add its address to `sitemap.xml`.
4. Upload (see "Uploading changes" below), then request indexing in Search Console.

## Uploading changes
This folder is connected to the GitHub repository, so one command uploads everything that changed. In Terminal, in this folder:

```bash
git add -A && git commit -m "Short note on what changed" && git push
```

The site updates about a minute later. `drafts/` and `PLAN.md` are never uploaded (they're listed in `.git/info/exclude`, which stays on this computer). The sign-in is GitHub's own tool, `gh`, installed at `~/.local/bin/gh`. If a push ever asks for a password, run `~/.local/bin/gh auth login` again.

## Rules for the content
- Never invent facts, prices, features or test results. Check prices and plans on the official page on the day of writing; if something can't be confirmed, write it generally.
- Tools are recommended only after being tested.

## Updating the free prompt pack
The PDF is made from the prompts on the site, word for word.
1. Run `python3 drafts/build_prompt_pack.py .` in this folder. It rebuilds `drafts/prompt-pack.html` and prints how many prompts it found.
2. Turn it into a PDF with Chrome: open `drafts/prompt-pack.html` in Chrome, press Cmd+P, choose "Save as PDF", turn off headers and footers, and save it as `downloads/seller-notebook-prompt-pack.pdf`.
3. If the number of prompts changed, update "All 16 prompts" in the download boxes on the home page and the Prompts page.
4. Upload the new PDF.
