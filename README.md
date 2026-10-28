# AnimeVault.id — Version 3 (Admin panel + GitHub Pages ready)

## What is included
- `index.html`: public gallery
- `styles.css`: responsive styles
- `app.js`: gallery logic and downloads
- `wallpapers.json`: public catalogue loaded by the site when hosted
- `admin.html` + `admin.js`: local catalogue editor
- `images/`: place artwork you own or are licensed to use here

## Run locally
Extract the ZIP and open `index.html` in a browser. Local file previews use the built-in demo data because browsers may block `fetch()` from `file://`. The admin panel can be opened at `admin.html`.

## Admin panel limitations (important)
GitHub Pages serves static files only. This panel stores edits in the current browser's localStorage and exports/imports `wallpapers.json`. It does NOT write changes to the public site automatically, and it is not a secure authenticated admin area. To publish edits, export `wallpapers.json`, upload/commit it to the repository root, and commit image files separately into `images/`. Do not put GitHub tokens or passwords in this panel.

## Add an image
1. Put your licensed JPG/PNG/WebP in `images/`.
2. In `admin.html`, add a catalogue entry using a relative path such as `images/your-image.jpg`.
3. Export `wallpapers.json`.
4. Upload the image and JSON to the repository; commit the changes.

## Publish with GitHub Pages
1. Create a **public** repository named `animevault-id` on your GitHub account.
2. Upload the contents of this folder to the repository root (not the ZIP file).
3. Go to Settings → Pages.
4. Under Build and deployment, choose **Deploy from a branch**, branch `main`, folder `/(root)`, then Save.
5. Wait for deployment. The URL will look like `https://YOUR-GITHUB-USERNAME.github.io/animevault-id/`.
6. Use `admin.html` on that URL to edit locally, export `wallpapers.json`, then commit that file to publish the changes.

A custom domain `AnimeVault.id` requires owning/configuring the domain separately.
