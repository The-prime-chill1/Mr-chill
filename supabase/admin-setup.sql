-- 1. Create the administrator in Supabase Dashboard:
--    Authentication > Users > Add user
--    Use the administrator email and password supplied by the site owner.
--
-- 2. Run this statement in the SQL Editor to grant the protected admin role.

update auth.users
set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb) || '{"role":"admin"}'::jsonb
where email = 'lamidiabdulhameedolawale21@gmail.com';

-- 3. Log out and log back in so the new JWT includes app_metadata.role = admin.
