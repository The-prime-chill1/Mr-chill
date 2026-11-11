-- Run after the existing enquiries/projects SQL.

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 120),
  company text,
  email text not null check (char_length(email) between 5 and 254),
  project text,
  rating smallint not null check (rating between 1 and 5),
  review text not null check (char_length(review) between 20 and 3000),
  consent boolean not null default false,
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  created_at timestamptz not null default now()
);

create table if not exists public.invoices (
  id uuid primary key default gen_random_uuid(),
  invoice_number text not null,
  issue_date date not null,
  due_date date,
  currency text not null check (currency in ('NGN','USD','GBP')),
  client_name text,
  client_company text,
  client_email text,
  client_address text,
  items jsonb not null default '[]'::jsonb,
  subtotal numeric(14,2) not null default 0,
  tax_percent numeric(7,2) not null default 0,
  tax_amount numeric(14,2) not null default 0,
  discount numeric(14,2) not null default 0,
  total numeric(14,2) not null default 0,
  notes text,
  status text not null default 'draft' check (status in ('draft','sent','paid','cancelled')),
  created_at timestamptz not null default now()
);

alter table public.reviews enable row level security;
alter table public.invoices enable row level security;

drop policy if exists "Anyone can submit a pending review" on public.reviews;
create policy "Anyone can submit a pending review"
  on public.reviews for insert to anon, authenticated
  with check (status = 'pending');

drop policy if exists "Public can view approved reviews" on public.reviews;
create policy "Public can view approved reviews"
  on public.reviews for select to anon, authenticated
  using (status = 'approved' or public.is_admin());

drop policy if exists "Admins can update reviews" on public.reviews;
create policy "Admins can update reviews"
  on public.reviews for update to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Admins can delete reviews" on public.reviews;
create policy "Admins can delete reviews"
  on public.reviews for delete to authenticated
  using (public.is_admin());

drop policy if exists "Anyone can create a draft invoice" on public.invoices;
create policy "Anyone can create a draft invoice"
  on public.invoices for insert to anon, authenticated
  with check (status = 'draft');

drop policy if exists "Admins can read invoices" on public.invoices;
create policy "Admins can read invoices"
  on public.invoices for select to authenticated
  using (public.is_admin());

drop policy if exists "Admins can update invoices" on public.invoices;
create policy "Admins can update invoices"
  on public.invoices for update to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Admins can delete invoices" on public.invoices;
create policy "Admins can delete invoices"
  on public.invoices for delete to authenticated
  using (public.is_admin());

grant insert on public.reviews to anon, authenticated;
grant select on public.reviews to anon, authenticated;
grant update, delete on public.reviews to authenticated;
grant insert on public.invoices to anon, authenticated;
grant select, update, delete on public.invoices to authenticated;
