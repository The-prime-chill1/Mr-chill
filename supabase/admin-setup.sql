-- 1. Create the administrator in Supabase Dashboard:
--    Authentication > Users > Add user
--    Use the administrator email and password supplied by the site owner.
--
-- 2. Run this script in the SQL Editor to verify the user and grant the
--    protected admin role. The script stops with a clear error if the
--    Authentication user has not been created yet.

do $$
begin
  if not exists (
    select 1
    from auth.users
    where lower(email) = lower('lamidiabdulhameedolawale21@gmail.com')
  ) then
    raise exception 'Admin user does not exist. Create it in Authentication > Users first.';
  end if;
end
$$;

update auth.users
set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb) || '{"role":"admin"}'::jsonb
where lower(email) = lower('lamidiabdulhameedolawale21@gmail.com');

-- This result should show a confirmation date and role = admin.
select
  email,
  email_confirmed_at,
  raw_app_meta_data ->> 'role' as role
from auth.users
where lower(email) = lower('lamidiabdulhameedolawale21@gmail.com');

-- 3. Log out and log back in so the new JWT includes app_metadata.role = admin.
