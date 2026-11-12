alter table public.news_posts
  add column if not exists cover_image_path text;

do $$
begin
  if to_regprocedure('public.rls_auto_enable()') is not null then
    execute 'revoke execute on function public.rls_auto_enable() from public, anon, authenticated';
  end if;
end
$$;

insert into storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
values (
  'news-images',
  'news-images',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update
set
  name = excluded.name,
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Admins can view news images" on storage.objects;
create policy "Admins can view news images"
  on storage.objects for select
  to authenticated
  using (
    bucket_id = 'news-images'
    and (select public.is_admin())
  );

drop policy if exists "Admins can upload news images" on storage.objects;
create policy "Admins can upload news images"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'news-images'
    and (select public.is_admin())
  );

drop policy if exists "Admins can update news images" on storage.objects;
create policy "Admins can update news images"
  on storage.objects for update
  to authenticated
  using (
    bucket_id = 'news-images'
    and (select public.is_admin())
  )
  with check (
    bucket_id = 'news-images'
    and (select public.is_admin())
  );

drop policy if exists "Admins can delete news images" on storage.objects;
create policy "Admins can delete news images"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'news-images'
    and (select public.is_admin())
  );

insert into public.news_posts (
  title,
  slug,
  excerpt,
  content,
  category,
  cover_image_url,
  cover_image_path,
  author_name,
  is_featured,
  is_published,
  published_at
)
values (
  'Refer & Earn 15% Commission',
  'refer-and-earn-15-percent-commission',
  'Introduce a paying website or software client to CHILL TECH LTD and earn 15% of the qualifying development fee.',
  E'Know someone who needs a professional website, e-commerce store, business platform, or custom software solution? Introduce them to CHILL TECH LTD through one of our official contact channels and you may earn a 15% referral commission.\n\nThe commission is calculated from the development fee for the qualifying project. Domain registration, deployment, hosting, payment processing, and other third-party costs are not included in the commission calculation.\n\nCommission becomes payable after the referred client has made the qualifying project payment and the payment has been confirmed by CHILL TECH LTD. Unpaid, cancelled, or refunded work is not commissionable.\n\nTo make sure the referral is recorded correctly, introduce the prospective client through our official enquiry form, company email, or WhatsApp contact and include your full name. We will confirm the referral and keep you informed when the project qualifies.\n\nA referral does not increase the client\'s invoice. The commission is paid separately by CHILL TECH LTD as a thank-you for helping another business find the right technology partner.',
  'Referral programme',
  'https://www.chilltechltd.com/social-preview.png',
  null,
  'CHILL TECH LTD',
  true,
  true,
  now()
)
on conflict (slug) do update
set
  title = excluded.title,
  excerpt = excluded.excerpt,
  content = excluded.content,
  category = excluded.category,
  author_name = excluded.author_name,
  is_featured = true,
  is_published = true,
  published_at = coalesce(public.news_posts.published_at, excluded.published_at),
  updated_at = now();
