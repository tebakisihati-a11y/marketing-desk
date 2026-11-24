-- Skema database untuk Ruang Marketing (Supabase / PostgreSQL)
-- Jalankan di Supabase Dashboard > SQL Editor

-- 1. Tabel tasks
create table if not exists public.tasks (
  id bigserial primary key,
  title text not null,
  project text not null,
  due text not null,
  status text not null default 'Belum mulai',
  done boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2. Tabel posts (kalender konten)
create table if not exists public.posts (
  id bigserial primary key,
  title text not null,
  channel text not null,
  date text not null,
  month text not null,
  status text not null default 'Ide',
  color text not null default 'coral',
  created_at timestamptz not null default now()
);

-- 3. Tabel projects
create table if not exists public.projects (
  id bigserial primary key,
  name text not null unique,
  label text not null,
  progress int not null default 0,
  color text not null default 'coral',
  due text not null,
  created_at timestamptz not null default now()
);

-- 4. Tabel sales
create table if not exists public.sales (
  id bigserial primary key,
  name text not null,
  followup text not null,
  created_at timestamptz not null default now()
);

-- 5. Tabel messages (chat tim)
create table if not exists public.messages (
  id bigserial primary key,
  text text not null,
  author text not null,
  created_at timestamptz not null default now()
);

-- 6. Row Level Security (RLS)
-- Semua tabel bisa dibaca & ditulis oleh authenticated users (tanpa policy tambahan karena default-deny)
-- Gunakan Supabase Auth (email/password atau OAuth). Untuk demo cepat: aktifkan anon access terbatas.

alter table public.tasks enable row level security;
alter table public.posts enable row level security;
alter table public.projects enable row level security;
alter table public.sales enable row level security;
alter table public.messages enable row level security;

-- Policy: authenticated users (login) bisa CRUD semua data
create policy "authenticated all" on public.tasks for all to authenticated using (true) with check (true);
create policy "authenticated all" on public.posts for all to authenticated using (true) with check (true);
create policy "authenticated all" on public.projects for all to authenticated using (true) with check (true);
create policy "authenticated all" on public.sales for all to authenticated using (true) with check (true);
create policy "authenticated all" on public.messages for all to authenticated using (true) with check (true);

-- OPSIONAL: Izinkan anonymous read-only (jika mau demo publik tanpa login)
-- create policy "anon read" on public.tasks for select to anon using (true);
-- create policy "anon read" on public.posts for select to anon using (true);
-- create policy "anon read" on public.projects for select to anon using (true);
-- create policy "anon read" on public.sales for select to anon using (true);
-- create policy "anon read" on public.messages for select to anon using (true);

-- 7. Index untuk performa
create index if not exists tasks_created_at_idx on public.tasks (created_at desc);
create index if not exists posts_created_at_idx on public.posts (created_at desc);
create index if not exists projects_created_at_idx on public.projects (created_at desc);
create index if not exists messages_created_at_idx on public.messages (created_at asc);

-- 8. Trigger updated_at (opsional)
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

create trigger tasks_updated_at before update on public.tasks
for each row execute function public.set_updated_at();