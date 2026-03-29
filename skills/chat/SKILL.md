---
name: chat
description: Implement and evolve features in this chat frontend with repo-consistent architecture and delivery workflow. Auto-use when requests involve auth/login/register forms, conversations, groups, friends, calls, settings, React Router routes or guards, Redux Toolkit slices/selectors/thunks, socket events/hooks, API client methods in src/utils/api.ts, UI components/pages, or frontend tests. Also use for frontend bug fixes, refactors, validation updates, and UX tweaks in this repo even when the user does not mention $chat.
---

# Chat Platform React Dev

## Automatic Invocation Signals

Use this skill by default when the request is about this repository's chat frontend, including:

- Adding or fixing chat product behavior in auth, conversations, groups, friends, calls, or settings flows.
- Updating route wiring, route guards, page composition, or route-level UX.
- Modifying shared app state (Redux slices/selectors), API client calls, payload types, or socket-driven behavior.
- Adjusting form validation, UI feedback/toasts, component behavior, or frontend tests tied to chat workflows.

Do not use this skill for backend-only implementation, infrastructure setup, or non-frontend repository tasks.

## Quick Start

1. Clarify the feature outcome and acceptance criteria before editing.
2. Load the minimum references needed for the task:

- Read `references/architecture-map.md` for route and state ownership.
- Read `references/frontend-patterns.md` for implementation conventions.
- Read `references/feature-checklist.md` before finalizing changes.

3. Reuse existing API methods, types, and component patterns before adding new abstractions.
4. Validate changes with focused checks and summarize impact and risks.

## Feature Workflow

### 1) Analyze

- Identify the primary user flow affected by the request.
- Map touched areas: route/page, component tree, API calls, Redux slice/state, and socket behavior.
- Verify whether similar behavior already exists and mirror the established pattern.

### 2) Implement

- Keep changes minimal and local to the feature boundary.
- Prefer extending existing modules over creating parallel patterns.
- Add or update typed data contracts when payload shapes change.
- Keep naming and file organization aligned with existing feature folders.

### 3) Verify

- Run the narrowest validation that gives confidence first.
- Check runtime-critical paths manually when tests are missing.
- Confirm no obvious regressions in auth state, route access, and realtime updates.

### 4) Finalize

- Summarize what changed, why it changed, and what was validated.
- Call out remaining risks or follow-up work clearly.

## Repository Conventions

- Use `src/utils/api.ts` as the source of truth for HTTP requests.
- Keep network payload types in `src/utils/types.ts` and `src/utils/types/*`.
- Use `react-hook-form` for form state and validation in form components.
- Use existing toast patterns (`react-toastify` and `useToast`) for success/error feedback.
- Follow route structure and guard boundaries defined in `src/App.tsx` and `src/guards/*`.
- Use Redux Toolkit slices in `src/store/*` for shared feature state.
- Treat Redux Toolkit as the default global state solution in this repo; only introduce Zustand for isolated local UI state when explicitly requested.
- Preserve current styling approach by matching existing module scss and styled utility usage.
- Build responsive UI mobile-first and compose class names via `cn(...)` when conditions or variants are involved; prefer breakpoint classes directly in class strings (for example: `cn("grid grid-cols-1 gap-3 md:grid-cols-2 lg:gap-4", isStacked && "md:grid-cols-1")`).

## Task Routing Guide

- For route/page flow work, start with `references/architecture-map.md`.
- For form, API, state, and UI behavior details, read `references/frontend-patterns.md`.
- For validation and release-readiness checks, run through `references/feature-checklist.md`.

## Output Expectations

- Return concrete file-level changes, not abstract guidance.
- Preserve backward compatibility unless the request explicitly changes behavior.
- Prefer short, testable increments that can be reviewed quickly.
- Flag assumptions immediately when backend behavior or API contracts are uncertain.
