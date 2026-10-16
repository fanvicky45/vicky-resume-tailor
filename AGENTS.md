# Working on Vicky’s Resume Tailor

Preserve the existing simple interface and core workflow: master resume → job description → editable draft → PDF export.

Read `skills/vickys-resume-tailoring-agent/SKILL.md` before changing tailoring behaviour. Candidate facts belong to each user's input, never to shared code. Do not include the creator's private resume, evidence record, contact details or application history in examples. Use fictional sample data.

Maintain a one-sentence positioning profile, separate skills/languages lines, selective bolding, and source-grounded metrics. Aim for one A4 page with each bullet within two rendered lines. Never invent facts to meet bullet counts. Explain unsupported requirements as gaps outside the CV.

The production prompt lives in `lib/tailor.ts`; copying a skill into the repository does not automatically execute it. Keep instructions, schema and rendered layout consistent.

## Start-up task

1. Inspect package scripts and existing runtime/build integration.
2. Install the locked dependencies and explicitly run `pnpm run prepare:assets`.
3. Test the fictional example, editable preview and PDF export without calling a paid AI service.
4. Determine the minimum changes for independent Cloudflare hosting. Do not reuse the original ChatGPT Site identity.
5. Configure AI only after owner credential setup. Never print secrets or commit them.
6. Test live upload-to-generation-to-export with authorized credentials; clearly report any untested path.

Do not describe source transfer as public deployment. Do not silently remove the access-code gate to make generation appear functional. Add durable usage controls before unrestricted public generation. Do not submit job applications.
