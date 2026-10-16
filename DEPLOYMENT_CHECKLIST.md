# Deployment checklist

## Stage 1 — GitHub source
- [ ] App source and reusable skill appear in this repository.
- [ ] No real resumes, private candidate records or secret values are committed.

## Stage 2 — Open in Codex
- [ ] Connect GitHub to Codex and select this repository.
- [ ] Ask Codex: “Read AGENTS.md. Install dependencies, prepare assets, run the app and verify the fictional example and PDF export. Preserve the UI. Report blockers before deployment.”
- [ ] Confirm the preview loads and upload text extraction works.
- [ ] Confirm the fictional PDF is searchable and one page.

## Stage 3 — Make independent hosting work
- [ ] Have Codex inspect the retained Vinext/Sites build configuration.
- [ ] Configure a separate Cloudflare Worker without the original Site identity.
- [ ] Confirm build and deployment commands in this repository, rather than guessing them.
- [ ] Confirm the deployed site loads and /api/tailor reports not ready without credentials.

## Stage 4 — Enable the pilot
- [ ] Configure OPENAI_API_KEY, OPENAI_MODEL and TAILOR_ACCESS_CODE as runtime values.
- [ ] Keep the API key and access code secret; do not enter them in source files.
- [ ] Test a real generation, source checks, editing, and PDF export.
- [ ] Test a second fictional applicant: no creator details or first-applicant facts should leak into the output.
- [ ] Test invalid input, bad access code and provider failure.
- [ ] Invite three pilot users and collect results before opening access more widely.

## Stage 5 — Broader public use
- [ ] Replace the shared pilot gate with a suitable access and durable usage-control approach.
- [ ] Define costs, user limits and handling of uploaded resume data.
- [ ] Publish clear product/privacy information matching the actual implementation.

A deployed URL and working AI generation are separate milestones. GitHub stores the source; Codex develops it; Cloudflare runs the app; the server-side AI provider generates drafts.
