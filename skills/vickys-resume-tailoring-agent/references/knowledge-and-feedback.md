# Candidate knowledge and feedback

## Keep records separate

The shared skill owns the workflow and default quality contract. A private candidate record owns one person's experience and preferences. A separate application record owns one JD, its keyword map and its output versions. Do not store these private records in the shared skill directory or a shared/public git repository.

Use a durable user-owned location when supported. Follow its storage skill and retain file identity/version guards when updating. In a multi-user web app, retrieve records only within the authenticated user's scope; a skill alone does not supply authentication, a database or isolation. If there is no persistent store, export the record and explain that it must be reattached later. Never silently claim cross-session recall.

## Establish provenance

Give every meaningful factual claim a stable ID. Record the supplied wording, employer/activity, dates, source file or message, and confirmation status. Store metric meaning separately: value, unit, baseline if known, period if known, population if known, and attribution qualifier. Leave unknown fields unknown.

Distinguish user-supplied evidence from independent verification. Explicit confirmation can resolve ambiguity; it does not certify employment or metric accuracy. Preserve the original record when a correction supersedes it.

Source precedence:
1. Latest explicit factual correction from the candidate.
2. Latest user-provided master record.
3. Identified earlier source claims not superseded or contradicted.
4. Older tailored outputs as phrasing references only, not new evidence.

A larger number in an older resume is not a reason to override the latest master. A request to "sound like an expert" is a style request, not evidence of expertise.

## Classify feedback

| Feedback | Record update | Future scope |
|---|---|---|
| "My email changed" | Update contact; retain dated correction | All future CVs for this candidate |
| "I launched the platform in two months" | Add user-supplied claim with source | Use when relevant; do not add code or stack claims |
| "Use this corrected role title" | Record candidate-confirmed title and original wording | Future CVs; do not describe it as independently verified |
| "Keep the profile to one sentence" | Update candidate formatting preference | All this candidate's CVs |
| "Lead this role with outbound hunting" | Update application emphasis | Current sales JD only |
| "I'd like to run university workshops" | Store proposed initiative | Future proposal, never completed achievement |
| "That stronger bullet sounds good" | Approve wording only | Do not infer confirmation of altered metrics or scope |

## Apply an iteration

1. Identify the exact changed fact or preference; ask only if ambiguity materially changes the claim.
2. Update the current draft, candidate record or application record as appropriate.
3. Record the change date, source and superseded value; never erase contradictory evidence silently.
4. Re-run source and keyword audits. Re-render after any layout-affecting edit.
5. Save the updated records and output versions. Give a short description of what changed.

Do not rewrite every historical application automatically. Correct the active CV and future source record unless the user asks for earlier outputs to change.

## Maintain a compact record

Keep the master experience comprehensive, but separate confirmed facts, unresolved questions, preferences and job-specific drafts. Archive long revision histories rather than injecting every past draft into every new task. Retain enough provenance to audit a changed claim.

Keep unrelated article revisions, health information, images and other projects out of resume records unless the candidate explicitly supplies relevant career evidence from them. Do not share one candidate's details through the reusable skill.

## Capture improvements without claiming training

Evaluate improvements through saved outputs and tests. User corrections update the available evidence or instructions; they do not retrain the underlying model. Export confirmed facts and preferences so another authorised agent can reproduce the decision without relying on chat history.
