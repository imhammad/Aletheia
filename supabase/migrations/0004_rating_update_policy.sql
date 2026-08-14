-- Already have "Users can update their own rating" from the initial schema —
-- this migration just double-checks it's an UPSERT-compatible policy.
-- If Phase 6c testing shows update failures, run:

drop policy if exists "Users can update their own rating" on public.roadmap_ratings;

create policy "Users can update their own rating" on public.roadmap_ratings
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);