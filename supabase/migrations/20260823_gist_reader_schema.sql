-- Gist (book summaries app) — profiles, saved shelf and reading progress.
-- Applied to the Supabase project "inkwell". All tables are prefixed gist_ so they
-- sit alongside unrelated tables already in that project.

create table if not exists public.gist_profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.gist_shelf_items (
  user_id uuid not null references auth.users (id) on delete cascade,
  book_id text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, book_id)
);

create table if not exists public.gist_progress (
  user_id uuid not null references auth.users (id) on delete cascade,
  book_id text not null,
  idea_index integer not null default 0 check (idea_index >= 0),
  finished boolean not null default false,
  updated_at timestamptz not null default now(),
  primary key (user_id, book_id)
);

create index if not exists gist_shelf_items_user_idx on public.gist_shelf_items (user_id, created_at desc);
create index if not exists gist_progress_user_idx on public.gist_progress (user_id, updated_at desc);

-- Keep updated_at honest on the app's own tables.
create or replace function public.gist_touch_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists gist_profiles_touch on public.gist_profiles;
create trigger gist_profiles_touch before update on public.gist_profiles
  for each row execute function public.gist_touch_updated_at();

drop trigger if exists gist_progress_touch on public.gist_progress;
create trigger gist_progress_touch before update on public.gist_progress
  for each row execute function public.gist_touch_updated_at();

-- Row level security: a signed-in reader sees and writes only their own rows.
alter table public.gist_profiles enable row level security;
alter table public.gist_shelf_items enable row level security;
alter table public.gist_progress enable row level security;

drop policy if exists gist_profiles_select_own on public.gist_profiles;
create policy gist_profiles_select_own on public.gist_profiles
  for select to authenticated using ((select auth.uid()) = id);

drop policy if exists gist_profiles_insert_own on public.gist_profiles;
create policy gist_profiles_insert_own on public.gist_profiles
  for insert to authenticated with check ((select auth.uid()) = id);

drop policy if exists gist_profiles_update_own on public.gist_profiles;
create policy gist_profiles_update_own on public.gist_profiles
  for update to authenticated using ((select auth.uid()) = id) with check ((select auth.uid()) = id);

drop policy if exists gist_shelf_items_select_own on public.gist_shelf_items;
create policy gist_shelf_items_select_own on public.gist_shelf_items
  for select to authenticated using ((select auth.uid()) = user_id);

drop policy if exists gist_shelf_items_insert_own on public.gist_shelf_items;
create policy gist_shelf_items_insert_own on public.gist_shelf_items
  for insert to authenticated with check ((select auth.uid()) = user_id);

drop policy if exists gist_shelf_items_delete_own on public.gist_shelf_items;
create policy gist_shelf_items_delete_own on public.gist_shelf_items
  for delete to authenticated using ((select auth.uid()) = user_id);

drop policy if exists gist_progress_select_own on public.gist_progress;
create policy gist_progress_select_own on public.gist_progress
  for select to authenticated using ((select auth.uid()) = user_id);

drop policy if exists gist_progress_insert_own on public.gist_progress;
create policy gist_progress_insert_own on public.gist_progress
  for insert to authenticated with check ((select auth.uid()) = user_id);

drop policy if exists gist_progress_update_own on public.gist_progress;
create policy gist_progress_update_own on public.gist_progress
  for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

drop policy if exists gist_progress_delete_own on public.gist_progress;
create policy gist_progress_delete_own on public.gist_progress
  for delete to authenticated using ((select auth.uid()) = user_id);
