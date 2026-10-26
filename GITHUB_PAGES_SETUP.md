# Clean Tailor frontend + separate API

The screenshot's clean interface is the real React app, not a static screenshot. `pnpm run build:pages` creates `dist-pages/index.html` and all required assets. Upload the entire folder, not index.html alone. It must be served over HTTP(S), not opened as a file URL.

## Host the API first

Use Node 24 and the pinned pnpm version. Install with `pnpm install --frozen-lockfile`.

1. Run `pnpm exec wrangler login` and complete Cloudflare sign-in.
2. Run `pnpm run deploy:api` to create the independent Worker.
3. Run `pnpm exec wrangler secret put OPENAI_API_KEY --config wrangler.api.jsonc` and enter the API key privately.
4. Run `pnpm exec wrangler secret put TAILOR_ACCESS_CODE --config wrangler.api.jsonc` and choose a private pilot code.
5. Copy the HTTPS Worker origin. Do not append `/api/tailor`.

`wrangler.api.jsonc` specifies the model and exact permitted frontend origin `https://fanvicky45.github.io`. Update that origin if using a different account or custom domain. Production access protection stays enabled. The existing in-memory rate limit is for a restricted pilot, not unrestricted public use.

## Publish on GitHub Pages

In repository Settings → Pages, choose GitHub Actions as the source. Under Settings → Secrets and variables → Actions → Variables, create `TAILOR_API_BASE` with the Worker HTTPS origin. This is a public URL, not a secret. Never place an API key in a repository variable, frontend file or Pages artifact.

Copy `deployment/pages-workflow.yml` to `.github/workflows/pages.yml` using the GitHub website (the current local Git token cannot create workflow files). Then run the “Publish clean frontend to GitHub Pages” workflow from Actions. It refuses to publish without an HTTPS API URL configured.

Alternatively build locally, set `window.TAILOR_API_BASE` in `dist-pages/config.js`, then publish the whole `dist-pages` directory with your existing static hosting process. `config.js` deliberately remains editable without rebuilding.

## Acceptance check

Open the Pages URL, confirm the pilot-code field appears, upload a text-based resume, review the extracted text, paste a complete job description, enter the pilot code, tailor, edit and download. Verify one-page output and factual accuracy. Scanned/image-only PDFs require pasted text. Nothing is stored in an account; refreshing clears inputs.

Current checks cover parser extraction on sample PDF/DOCX, CORS acceptance/rejection, input validation, production access checks and a real fictional generation through the local API. A live Cloudflare/Pages deployment and browser upload interaction must still be verified after sign-in and deployment.
