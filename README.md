# Vicky’s Resume Tailor

Upload one master resume, paste a job description, review a tailored CV, and download a searchable one-page PDF. Built to reduce repetitive resume editing while keeping claims grounded in the applicant’s own experience.

## What is ready

- Minimal black-and-white interface with PDF, DOCX, Markdown and text input.
- Fictional example, editable draft, role-alignment review and browser PDF export.
- Prepared server-side OpenAI integration, disabled until runtime credentials are configured.
- Reusable tailoring skill in `skills/vickys-resume-tailoring-agent/`.

## Start here in Codex

1. Open this repository in Codex.
2. Read `AGENTS.md` and `DEPLOYMENT_CHECKLIST.md`.
3. Ask Codex to install dependencies, prepare assets and run the preview.
4. Verify the fictional example and PDF export before configuring AI.

## Local setup

Use Node.js 22.13 or later and the pnpm version declared in `package.json`.

```sh
pnpm install --frozen-lockfile
pnpm run prepare:assets
pnpm run dev
```

Use the address printed by the development server. `pnpm run build` builds the Worker. Some package managers require explicit approval for dependency lifecycle scripts; `prepare:assets` is provided as an explicit step regardless.

The browser PDF parsing worker is generated from `pdfjs-dist` after installation, rather than committed as a large generated file.

## Agent instructions

- `skills/vickys-resume-tailoring-agent/SKILL.md`: reusable editorial workflow.
- `public/Tailor_Agent.md`: downloadable user instructions.
- `lib/tailor.ts`: current API output schema, runtime prompt and source-quote check.

The backend currently uses the prompt in `lib/tailor.ts`; it does not automatically load the skill folder. Keep these sources aligned when changing rules. The source-quote check confirms quote presence, not that every claim is true.

## AI configuration

Runtime bindings expected by `app/api/tailor/route.ts`:

| Binding | Purpose |
| --- | --- |
| `OPENAI_API_KEY` | Server-only OpenAI credential |
| `OPENAI_MODEL` | Model with access to the required structured output capability |
| `TAILOR_ACCESS_CODE` | Shared code for a small pilot |

`.dev.vars.example` contains empty placeholders. Never put keys or real applicant records in source control. A shared access code is not individual account authentication.

## Deployment status

This is a source handoff from an existing ChatGPT Sites/Vinext app, not a verified independent Cloudflare deployment. Original Site identity was removed; the original hosting environment was not changed. The code retains its Sites build integration and needs independent host configuration verified before deployment. See the checklist. GitHub Pages alone cannot run the server-side generation route.

## Pilot limits

No persistent applicant accounts or resume storage. Inputs are held in the page and sent to the AI service when live generation is used. The current in-memory rate limiter is best-effort and not a durable cost-control mechanism. Provider error paths, generated output quality and independent hosting remain to be tested with owner-authorized credentials.
