alter function public.is_admin() set search_path = '';

create table public.news_posts (
  id bigint generated always as identity primary key,
  title text not null check (char_length(title) between 5 and 180),
  slug text not null unique check (
    char_length(slug) between 3 and 180
    and slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'
  ),
  excerpt text not null check (char_length(excerpt) between 20 and 500),
  content text not null check (char_length(content) between 50 and 20000),
  category text not null default 'Company news' check (char_length(category) between 2 and 80),
  cover_image_url text,
  author_name text not null default 'CHILL TECH LTD' check (char_length(author_name) between 2 and 120),
  is_featured boolean not null default false,
  is_published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.news_posts enable row level security;

create index news_posts_published_at_idx
  on public.news_posts (published_at desc)
  where is_published = true;

create policy "Public can view published news"
  on public.news_posts for select
  to anon, authenticated
  using (is_published = true or (select public.is_admin()));

create policy "Admins can create news"
  on public.news_posts for insert
  to authenticated
  with check ((select public.is_admin()));

create policy "Admins can update news"
  on public.news_posts for update
  to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

create policy "Admins can delete news"
  on public.news_posts for delete
  to authenticated
  using ((select public.is_admin()));

grant select on public.news_posts to anon, authenticated;
grant insert, update, delete on public.news_posts to authenticated;
grant usage, select on sequence public.news_posts_id_seq to authenticated;
