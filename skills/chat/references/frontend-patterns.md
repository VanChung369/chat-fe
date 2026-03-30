# Frontend Patterns

## Forms and Validation

- Build forms with `react-hook-form` and typed params from `src/utils/types.ts`.
- Use field components for register flow (`UsernameField`, `NameField`, `PasswordField`) when extending auth forms.
- Prefer `reValidateMode: 'onBlur'` for flows that already use blur-driven validation.
- Keep form error strings stable when tests assert exact text.

## API Layer

- Add or update requests in `src/utils/api.ts` instead of calling axios directly in UI components.
- Reuse `axiosClient` and `config` (`withCredentials`) for authenticated requests.
- Type API responses and request payloads to keep compile-time safety.
- Keep endpoint naming consistent with existing patterns (`fetch*`, `get*`, `post*`, `update*`).

## Types and Contracts

- Place shared payload/entity types in `src/utils/types.ts` or `src/utils/types/*`.
- Update types together with API method changes to avoid drift.
- Avoid inline ad-hoc types in deeply reused components.

## Routing and Guards

- Define route changes in `src/App.tsx`.
- Keep authentication checks in `AuthenticatedRoute` and guard-specific checks in `src/guards/*`.
- Use nested routes for feature detail pages (`:id`) to match current composition.

## State Management

- Use Redux Toolkit slices for shared feature state.
- Treat Redux Toolkit as the default global store in this repo.
- Do not introduce Zustand for overlapping domain state unless the request explicitly asks for that migration.
- Keep thunk or async behavior near the relevant feature slice when possible.
- Disable serializable constraints only at store level (already configured); do not duplicate this setting per feature.

## UI and Styling

- Follow existing style mix:
- Module SCSS in component folders for local layout styling.
- Shared styled utilities from `src/utils/styles/*` for reusable primitives.
- Match current labels and button copy style for auth and chat actions.
- Apply responsive styles mobile-first (`base`, then `sm:`, `md:`, `lg:`).
- Use `cn(...)` to compose conditional responsive class sets instead of manual string concatenation.
- Keep breakpoint intent explicit in one place when possible (example: `cn("flex flex-col gap-3 md:flex-row md:items-center", isCompact && "md:gap-2")`).

## Toast and Feedback

- Use `react-toastify` for user feedback in submit flows.
- Reuse `useToast` helper for consistent success/error/info formatting when practical.
- Clear stale toast queues in flows where repeated actions can spam notifications.

## Realtime and Socket Behavior

- Use `SocketContext` rather than creating ad-hoc socket clients in components.
- Keep call and realtime event behavior inside socket hooks under `src/utils/hooks/sockets/*`.
- Validate connect/disconnect assumptions when touching auth login/logout flows.

## Testing and Safety

- Mirror existing testing style with React Testing Library and role/label queries.
- Preserve snapshot stability only when behavior remains unchanged.
- Add focused tests for new validation rules or critical flow branching.

## Portability Notes

When reusing this skill in another chat frontend project:

- Update route map and guard names first.
- Update API URL env variables and auth cookie strategy assumptions.
- Replace domain-specific slice names while keeping the same workflow sequence.
