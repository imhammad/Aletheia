create policy "Roadmap creator can add resources" on public.roadmap_resources
  for insert
  with check (
    exists (
      select 1 from public.roadmaps
      where roadmaps.id = roadmap_resources.roadmap_id
      and roadmaps.created_by = auth.uid()
    )
  );