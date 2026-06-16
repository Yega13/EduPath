# EduPath Backlog

Items not done in Day 3. Pick these up in future sessions.

## UX Polish
- [ ] Profile page: after saving, sync `full_name` to Supabase `user_metadata` so it shows instantly in Navbar
- [ ] Auth page: after sign-in, if there's a `?next=` param in URL, redirect there instead of dashboard (for "Prepare me" flow when not logged in)
- [ ] Add skeleton loaders to: profile page, opportunities list, leaderboard
- [ ] Mobile: bottom nav active state highlight (currently no active indicator)

## Content
- [ ] Replace picsum.photos placeholder image in hero with a real photo of Armenian students
- [ ] Add a proper About / Pitch page (linked from "Beta — Free during SSS Demo" badge)
- [ ] Add more events to the `events` table (currently only 8 seed rows)
- [ ] Armenian translations for leaderboard page (currently hardcoded English strings)

## Features
- [ ] Streak system: increment `streak_days` when user completes a lesson on a new calendar day
- [ ] Owner dashboard: let event organizers submit and manage their own events (`/owner/*` pages — stubs exist)
- [ ] Admin panel: approve/reject submitted events (`/admin` page — stub exists)
- [ ] Roadmap page (`/roadmap/[chatId]`): visual timeline of lessons — stub exists

## Infrastructure
- [ ] Rate limiting on `/api/chat` and `/api/create-chat` (currently anyone can burn Claude credits)
- [ ] Error monitoring (Sentry or similar)
- [ ] Email confirmation flow for sign-up (currently Supabase sends email but UX doesn't guide user)
