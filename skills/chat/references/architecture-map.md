# Architecture Map

## Purpose

Use this map to locate where frontend chat features live before editing code.

## Runtime Shell

- App entry is `src/App.tsx`.
- Providers are composed in `AppWithProviders`:
- `ReduxProvider` for global state.
- `AuthContext` for authenticated user.
- `SocketContext` for socket.io client.

## Route Topology

- Public routes:
- `/register` -> `RegisterPage`.
- `/login` -> `LoginPage`.
- Protected app wrapper:
- `AuthenticatedRoute` wraps `AppPage`.
- Nested feature routes:
- `/conversations/:id` with `ConversationPageGuard`.
- `/groups/:id` with `GroupPageGuard`.
- `/friends/requests` and `/friends/blocked`.
- `/settings/profile` and `/settings/appearance`.
- `/calls/current`.

## Feature Domains

- `src/components/forms/*`: Auth and feature forms.
- `src/components/messages/*`: Message rendering and editing.
- `src/components/groups/*`: Group list and group-level actions.
- `src/components/friends/*`: Friend list and friend request flows.
- `src/components/calls/*`: Call UI and call-side panels.
- `src/pages/*`: Route-level composition.
- `src/guards/*`: Route access and route data guards.

## State Ownership (Redux)

Store setup lives in `src/store/index.ts`.

Primary slices:

- `conversation`: private conversation collections.
- `messages`: direct-message payloads and mutations.
- `selectedConversationType`: active mode selection.
- `friends`: friend list and request data.
- `groups`: group entities and group list data.
- `groupMessages`: messages in group channels.
- `messageContainer`: message list UI state.
- `groupSidebar`: group recipients sidebar state.
- `rateLimit`: throttle-related frontend state.
- `messagePanel`: message panel-level state.
- `systemMessages`: system-event message state.
- `settings`: UI appearance and settings state.
- `call`: call lifecycle state.

## Integration Boundaries

- HTTP requests are centralized in `src/utils/api.ts`.
- Shared domain types are in `src/utils/types.ts`.
- Socket hooks live under `src/utils/hooks/sockets/*`.

## Change Routing Heuristics

- If request changes route behavior, start in `src/App.tsx` and related `src/pages/*`.
- If request changes fetching or mutation behavior, start in `src/utils/api.ts` then update types.
- If request changes shared UI behavior, find matching slice in `src/store/*` and connected components.
- If request affects realtime behavior, inspect socket hooks before altering UI logic.
