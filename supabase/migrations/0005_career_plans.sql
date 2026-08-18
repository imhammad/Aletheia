create table public.career_plans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  target_role text not null,
  current_field text,
  plan_data jsonb not null,
  created_at timestamptz not null default now()
);

alter table public.career_plans enable row level security;

create policy "Users can view their own career plans" on public.career_plans
  for select using (auth.uid() = user_id);

create policy "Users can create their own career plans" on public.career_plans
  for insert with check (auth.uid() = user_id);