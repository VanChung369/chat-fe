# Feature Checklist

## Use This Checklist

Use this checklist before finalizing any feature implemented with this skill.

## 1) Scope and Design

- Confirm the user-facing behavior and success condition.
- Confirm in-scope and out-of-scope changes.
- Identify dependencies on backend API or socket events.
- Identify whether route or guard behavior is affected.

## 2) Implementation Safety

- Reuse existing API methods and types where possible.
- Keep modifications inside the smallest valid feature boundary.
- Avoid introducing parallel abstractions when existing utilities fit.
- Keep error-handling and toast behavior consistent with current UX.

## 3) Validation

- Run the smallest meaningful test/build/check first.
- Exercise the main happy path manually when no automated test exists.
- Exercise one failure path (validation/network/permission).
- Confirm no obvious regressions in auth, routing, and realtime updates.

## 4) Delivery Quality

- Summarize changed files and behavior impact.
- List what was validated and what was not validated.
- Explicitly call out assumptions tied to backend behavior.
- Record any follow-up tasks needed for full confidence.

## Forward-Use Prompt Set

Use these prompts to smoke-test whether the skill guidance remains practical.

### Prompt A: Feature Add

Use `$chat` to add an unread badge indicator in the conversation sidebar, reusing current store and message update flow.

Expected guidance shape:

- Start from architecture map and identify conversation + message state ownership.
- Extend current state/selectors before introducing new store structures.
- Add a focused validation plan for sidebar rendering and unread count updates.

### Prompt B: Form Update

Use `$chat` to update register form validation so password must be at least 10 characters, and keep tests in sync.

Expected guidance shape:

- Update react-hook-form rules in register form field components.
- Preserve existing error copy style or update assertions with intent.
- Add targeted tests for validation trigger and error removal.

### Prompt C: UI and Route Behavior

Use `$chat` to add a new settings sub-page route and keep guard behavior consistent.

Expected guidance shape:

- Update nested route declarations in `src/App.tsx`.
- Reuse existing settings page/sidebar composition patterns.
- Verify navigation path, route rendering, and authenticated access behavior.
