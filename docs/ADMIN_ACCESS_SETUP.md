# Setting Up Admin Access

If you're unable to access the admin dashboard after signing in, it means your user profile doesn't exist in the database or doesn't have admin privileges.

## Quick Fix (Recommended)

1. **Go to your Supabase Dashboard**: https://supabase.com/dashboard/project/YOUR_PROJECT/editor
2. **Open the SQL Editor**
3. **Run this SQL command** (replace with your actual email):

\`\`\`sql
-- Create admin profile for your user
INSERT INTO public.user_profiles (id, email, full_name, role)
SELECT 
  au.id,
  au.email,
  'Admin User', -- Change to your name
  'admin'
FROM auth.users au
WHERE au.email = 'your-email@example.com' -- CHANGE THIS
ON CONFLICT (id) DO UPDATE 
SET role = 'admin', updated_at = now();
\`\`\`

4. **Sign out and sign back in**

## Alternative: Use the Provided Script

Run the script `scripts/005_create_missing_profile.sql` in your Supabase SQL Editor:
- Edit the email address in the script first
- Execute the entire script
- Check the output to confirm profile creation

## Why This Happens

When you first sign up or sign in via OAuth, Supabase creates an authentication record but not a user profile. The profile is created automatically on subsequent sign-ins through the `/auth/callback` route, but if this fails or if you signed up before this feature was added, you'll need to create it manually.

## Verify Your Access

After running the SQL, verify your profile exists:

\`\`\`sql
SELECT id, email, role, created_at 
FROM public.user_profiles 
WHERE email = 'your-email@example.com';
\`\`\`

You should see:
- Your user ID
- Your email
- Role: 'admin'
- Created timestamp

## Making Other Users Admins

To grant admin access to additional users:

\`\`\`sql
UPDATE public.user_profiles
SET role = 'admin'
WHERE email = 'other-user@example.com';
\`\`\`

## Troubleshooting

If you still can't access admin after creating the profile:

1. **Clear browser cookies** for the site
2. **Sign out completely** 
3. **Sign back in**
4. **Check browser console** for any errors (F12 → Console tab)
5. **Verify RLS policies** allow admin users to read their own profiles

### Check RLS Policies

Run this to verify your RLS policies are correct:

\`\`\`sql
-- Should show policies for user_profiles table
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE tablename = 'user_profiles';
\`\`\`

The policies should allow users to read their own profile:
\`\`\`sql
CREATE POLICY "Users can read own profile"
ON user_profiles FOR SELECT
USING (auth.uid() = id);
