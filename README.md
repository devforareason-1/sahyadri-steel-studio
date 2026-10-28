# Sahyadri Steel Studio

Website for Sahyadri Steel Studio (Shivamogga & Udupi). Next.js static export,
Tailwind CSS v4, deployed to GitHub Pages.

## Run locally

    npm install
    npm run dev

## Where to edit content

| What | File |
| --- | --- |
| All photographs (swap concept images for real ones) | `src/data/images.ts` |
| Phone, email, form endpoint, WhatsApp, Instagram | `src/data/site.ts` |
| Studio addresses, hours, phone numbers | `src/data/site.ts` (`locations`) |
| Solutions and their pages | `src/data/services.ts` |
| Featured projects (set `completed: true` for real work) | `src/data/projects.ts` |
| Features, finishes, testimonials, partner brands, Instagram tiles | `src/data/content.ts` |
| Privacy page (placeholder) | `src/app/privacy/page.tsx` |

Before launch, also remove the temporary `robots: { index: false }` line in
`src/app/layout.tsx` and set `site.url` to the real domain.
