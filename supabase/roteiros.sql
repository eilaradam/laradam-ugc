-- Roteiros compartilhados com a marca (ugc.laradam.com/roteiro/<slug>).
-- Sem policy de leitura: só as rotas do site (service role) acessam.
-- O slug é o "link secreto" da marca; chave_lara libera aceitar/recusar.

create table if not exists public.roteiros_marca (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  chave_lara text not null,
  conteudo jsonb not null,
  gancho_escolhido text,
  gancho_escolhido_por text,
  aprovado_em timestamptz,
  aprovado_por text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.roteiros_marca_notas (
  id uuid primary key default gen_random_uuid(),
  roteiro_id uuid not null references public.roteiros_marca(id) on delete cascade,
  parent_id uuid references public.roteiros_marca_notas(id) on delete cascade,
  alvo text not null,
  tipo text not null check (tipo in ('comentario', 'sugestao', 'resposta')),
  autor text not null,
  autor_lara boolean not null default false,
  texto text,
  original text,
  sugerido text,
  status text not null default 'aberta'
    check (status in ('aberta', 'aceita', 'recusada', 'resolvida')),
  created_at timestamptz not null default now()
);

create index if not exists roteiros_marca_notas_idx on public.roteiros_marca_notas (roteiro_id, created_at);

alter table public.roteiros_marca enable row level security;
alter table public.roteiros_marca_notas enable row level security;
