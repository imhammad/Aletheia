-- profiles: extends auth.users with app-specific fields
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique,
  avatar_url text,
  created_at timestamptz not null default now()
);

-- topics: visualization-tab content
create table public.topics (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  domain text not null,              -- e.g. "Data Structures & Algorithms"
  renderer_type text not null check (renderer_type in ('step_player', 'node_graph', 'pipeline')),
  difficulty text check (difficulty in ('beginner', 'intermediate', 'advanced')),
  summary text,
  notes text,                        -- explanatory notes/markdown shown alongside the visualization
  visualization_data jsonb not null, -- the renderer-specific config (steps/nodes/edges)
  created_at timestamptz not null default now()
);

-- roadmaps: learning paths per CS field
create table public.roadmaps (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  field text not null,               -- e.g. "Backend Engineering", "Machine Learning"
  description text,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

-- roadmap_resources: books/videos/sites attached to a roadmap
create table public.roadmap_resources (
  id uuid primary key default gen_random_uuid(),
  roadmap_id uuid not null references public.roadmaps(id) on delete cascade,
  title text not null,
  url text not null,
  resource_type text check (resource_type in ('book', 'video', 'article', 'course', 'other')),
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- roadmap_ratings: community ratings
create table public.roadmap_ratings (
  id uuid primary key default gen_random_uuid(),
  roadmap_id uuid not null references public.roadmaps(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  rating int not null check (rating between 1 and 5),
  review text,
  created_at timestamptz not null default now(),
  unique (roadmap_id, user_id)        -- one rating per user per roadmap
);

-- Enable RLS on every table
alter table public.profiles enable row level security;
alter table public.topics enable row level security;
alter table public.roadmaps enable row level security;
alter table public.roadmap_resources enable row level security;
alter table public.roadmap_ratings enable row level security;

-- profiles: anyone can view, only the owner can edit their own
create policy "Profiles are viewable by everyone" on public.profiles
  for select using (true);
create policy "Users can update their own profile" on public.profiles
  for update using (auth.uid() = id);

-- topics: publicly readable (no write policy yet — you'll seed these yourself via the dashboard for now)
create policy "Topics are viewable by everyone" on public.topics
  for select using (true);

-- roadmaps: publicly readable, only logged-in users can create
create policy "Roadmaps are viewable by everyone" on public.roadmaps
  for select using (true);
create policy "Authenticated users can create roadmaps" on public.roadmaps
  for insert with check (auth.uid() = created_by);

-- roadmap_resources: publicly readable
create policy "Resources are viewable by everyone" on public.roadmap_resources
  for select using (true);

-- roadmap_ratings: publicly readable, users can only insert/edit their own rating
create policy "Ratings are viewable by everyone" on public.roadmap_ratings
  for select using (true);
create policy "Users can rate roadmaps" on public.roadmap_ratings
  for insert with check (auth.uid() = user_id);
create policy "Users can update their own rating" on public.roadmap_ratings
  for update using (auth.uid() = user_id);