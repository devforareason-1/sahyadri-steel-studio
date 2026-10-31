# Sahyadri Steel Studio

Website for Sahyadri Steel Studio, a women-led design studio for
stainless-steel kitchens, glass-and-steel wardrobes and vanities, with
studios in Shivamogga and Udupi, Karnataka.

Next.js 16, React 19, Tailwind CSS v4 and Motion, hosted on Vercel.

## Run locally

    npm install
    npm run dev      # http://localhost:3000
    npm run build    # production build, as Vercel runs it
    npm run lint

`npx tsc --noEmit` type-checks the project.

## Deploy

The site is hosted on Vercel, connected to this GitHub repository: every
push to `main` goes live, and every other branch (including `Dev`) gets
its own preview link. From the command line, `vercel` makes a preview
deployment and `vercel --prod` a production one.

`site.url`, used for the sitemap, robots.txt and link previews, comes from
Vercel's production address. Once the studio's own domain is connected,
set `NEXT_PUBLIC_SITE_URL` (e.g. `https://sahyadristeelstudio.com`, no
trailing slash) in the Vercel project's environment variables.

## Where to edit content

Almost everything a visitor reads lives in `src/data/`, so most updates
never touch a component.

| What | File |
| --- | --- |
| Every photograph (swap concept images for real ones) | `src/data/images.ts` |
| Site URL, WhatsApp, phone, email, Instagram, form endpoint | `src/data/site.ts` |
| Studio addresses, hours and phone numbers | `src/data/site.ts` (`locations`) |
| Solutions (kitchens, wardrobes, vanities, full home) and their pages | `src/data/services.ts` |
| Concept projects (set `completed: true` for real work) | `src/data/projects.ts` |
| Finishes, hardware, range sizes, testimonials, partner brands | `src/data/content.ts` |
| Instagram posts, and the switch that shows the section | `src/data/instagram.ts` |
| Header menu | `src/data/navigation.ts` |
| Partner logo files | `public/images/partners/` |
| Privacy page (placeholder) | `src/app/privacy/page.tsx` |

A few short lists sit beside the component that shows them: the studio
facts (`Studio.tsx`), process steps (`Process.tsx`), reasons for steel
(`WhySteel.tsx`), the contact steps (`Contact.tsx`) and the budget bands in
the enquiry form (`EnquiryForm.tsx`).

## How the site is put together

- **Home page** (`src/app/page.tsx`): Hero, Studio, Spaces, Materials
  (finish library and builder), Process, Projects, Why steel, Partners,
  Instagram (off for now), Testimonials, Contact.
- **Hero** (`Hero.tsx`): a dark kitchen pinned on screen while the visitor
  scrolls; the scroll widens a pool of light and reveals the studio's name,
  then the headline and buttons. Visitors who prefer reduced motion, and
  browsers without JavaScript, see the lit scene straight away. The header
  stays transparent until the hero has scrolled past.
- **Solution pages** (`src/app/services/[slug]/page.tsx`): one per entry in
  `services.ts`. The kitchens page adds the finish builder; the wardrobes
  page adds the wardrobe planner. On phones both keep their preview pinned
  under the header while the options scroll.
- **Enquiry form** (`EnquiryForm.tsx`): posts to the Google Apps Script in
  `site.formEndpoint`. If that is empty it hands the enquiry to WhatsApp
  instead. Reference images always go via WhatsApp (`formAcceptsFiles`).
- **Sections hide themselves when empty**: testimonials and partners
  disappear while their lists are empty; Instagram follows `showInstagram`.
- **Styles**: design tokens, section spacing and shared classes (`.section`,
  `.folio`, `.display`, `.btn`) are in `src/app/globals.css`.
- **Images**: `next/image` with a custom loader (`src/lib/image-loader.ts`)
  that asks the Unsplash and Pexels CDNs for each responsive size, so stock
  photos don't use Vercel's image-optimisation allowance. Local files in
  `public/` are served as they are. An empty `src` shows a brushed-steel
  "photograph to come" plate.
- **SEO**: each page builds its title, description, canonical address and
  link-preview tags through `pageMetadata` in `src/lib/metadata.ts` (the
  home page's wording lives there too). Structured data for the business,
  and for each solution page with its breadcrumb, is in
  `src/lib/structured-data.ts`. Plus `sitemap.ts` and `robots.ts`.
- **Link previews**: the picture shown when a page is shared is drawn by
  `src/lib/og-card.tsx` from the `opengraph-image.tsx` files (one for the
  home page, one per solution) and saved as a small JPEG with `sharp`, so
  WhatsApp shows it.

## Rules for content

- **No wood in any image.** The studio works in steel and glass only, so
  no photograph may show wood fronts or wooden cabinetry. Wood-look finishes
  in the finish library are printed finishes on steel and are fine.
- **Royalty-free images only** (Unsplash or Pexels licence) until the
  studio's own photography is ready.
- **Concepts stay labelled.** Stock images are shown as concept visuals.
  Add a location, client or budget to a project only once it is a real,
  completed job.
- **Partners and reviews need permission.** List a brand only once the
  partnership and the right to show its logo are confirmed; publish a
  review only with the client's consent.
- **Don't send test enquiries to the live form.** When testing the form,
  block or intercept requests to `script.google.com`, or clear
  `site.formEndpoint` locally.

## Before launch

- [ ] Remove `robots: { index: false, follow: false }` in `src/app/layout.tsx`.
- [ ] Connect the real domain in Vercel and set `NEXT_PUBLIC_SITE_URL` to it.
- [ ] Fill in `site.phone`, `site.email` and each studio's address, hours and phone.
- [ ] Replace the sample testimonials (`sample: true`) with real reviews.
- [ ] Set the range sizes in `finishRange` (`src/data/content.ts`).
- [ ] Replace concept images with the studio's own photography, and fill
      the empty `src` entries in `images.ts`.
- [ ] Publish a reviewed privacy policy in `src/app/privacy/page.tsx`.
- [ ] Add Instagram posts and set `showInstagram = true` when ready.
- [ ] Confirm the final logo (the header uses `Wordmark.tsx`).
