# Seller Notebook (sellernotebook.com)

A small content site with honest AI guides for online sellers. Plain HTML and CSS, no frameworks, hosted free on GitHub Pages (repository `BojanaPetronjevic/sellernotebook`). The domain is registered at Porkbun.

## What each file is
| File / folder | What it is |
|---|---|
| `index.html` | Home page |
| `styles.css` | The whole look of the site, shared by every page |
| `listings/`, `product-photos/`, `customer-service/`, `marketing/`, `shop-seo/` | Topic pages that list the guides |
| `etsy-product-descriptions-ai/`, `ai-prompts-customer-messages/` | Guides (each guide is a folder with an `index.html`, so its address is short) |
| `prompts/` | Prompt library: links to every prompt in the guides |
| `tools/` | Tools tested: how tools are tested and the reviews |
| `about/`, `contact/`, `privacy/`, `disclosure/` | Info pages |
| `404.html` | Page shown for a wrong address |
| `favicon.svg` | Browser tab icon |
| `sitemap.xml` | List of pages for Google; add every new page here |
| `robots.txt` | Tells search engines where the sitemap is |
| `CNAME` | Tells GitHub Pages the site's domain. Don't delete it |
| `PLAN.md` | The site plan and the list of 30 planned guides (not uploaded to the site) |

## Where to change things
- **Colours, fonts, grain strength:** the `:root` block at the top of `styles.css`. `--grain-opacity` sets how strong the grain is (light and dark mode have separate values).
- **Menu and footer links:** in every page's `<header>` and `<footer>`; they are the same on every page.
- **Author name and email:** in the About, Contact and Privacy pages and the author box at the end of each guide.

## Before launch
1. Remove the `<meta name="robots" content="noindex">` line from every page (it is marked `LAUNCH:`).
2. Set up the email forwarding for hello@sellernotebook.com in Porkbun.
3. Tick "Enforce HTTPS" in GitHub → Settings → Pages.
4. Add Search Console (Domain property), Ahrefs Webmaster Tools, Ahrefs Web Analytics and Bing Webmaster Tools.

## Adding a new guide
1. Copy one guide folder, rename it to the new short address, and change the title, description, date, text and the schema block in the `<head>`.
2. Link it from its topic page (replace the "Coming soon" card) and from the Prompt library if it has prompts.
3. Add its address to `sitemap.xml`.
4. Upload, then request indexing in Search Console.

## Rules for the content
- Never invent facts, prices, features or test results. Check prices and plans on the official page on the day of writing; if something can't be confirmed, write it generally.
- Tools are recommended only after being tested.
