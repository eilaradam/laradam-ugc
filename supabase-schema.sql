-- Roda esse SQL no SQL Editor do seu projeto Supabase (Settings → SQL Editor → New query)

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  source text not null check (source in ('popup', 'contact')),
  name text,
  email text not null,
  phone text,
  brand text,
  budget text,
  message text
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_source_idx on public.leads (source);

-- RLS: liga proteção e libera só pra usuários autenticados (a página /admin)
alter table public.leads enable row level security;

drop policy if exists "Authenticated can read leads" on public.leads;
create policy "Authenticated can read leads"
  on public.leads
  for select
  to authenticated
  using (true);

-- Insert é feito SEMPRE pelo service_role (api routes do Next),
-- então não precisa de policy de insert pública.
