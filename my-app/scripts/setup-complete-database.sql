-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create user_profiles table with auto-creation trigger
create table if not exists public.user_profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  display_name text,
  role text not null default 'user' check (role in ('user', 'elder', 'author', 'moderator', 'admin')),
  subscription_tier text not null default 'free' check (subscription_tier in ('free', 'premium')),
  preferences jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.user_profiles enable row level security;

-- RLS Policies
create policy "Users can view their own profile"
  on public.user_profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.user_profiles for update
  using (auth.uid() = id);

create policy "Admins can view all profiles"
  on public.user_profiles for select
  using (
    exists (
      select 1 from public.user_profiles
      where id = auth.uid() and role = 'admin'
    )
  );

create policy "Admins can update all profiles"
  on public.user_profiles for update
  using (
    exists (
      select 1 from public.user_profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Function to auto-create user profile
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.user_profiles (id, email, display_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)));
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to auto-create profile on signup
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Create conversations table
create table if not exists public.conversations (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  title text,
  mode text not null check (mode in ('draft', 'analyze', 'chat')),
  status text not null default 'draft' check (status in ('draft', 'completed')),
  content jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.conversations enable row level security;

-- RLS Policies for conversations
create policy "Users can view their own conversations"
  on public.conversations for select
  using (auth.uid() = user_id);

create policy "Users can insert their own conversations"
  on public.conversations for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own conversations"
  on public.conversations for update
  using (auth.uid() = user_id);

create policy "Users can delete their own conversations"
  on public.conversations for delete
  using (auth.uid() = user_id);

-- Create indexes
create index if not exists conversations_user_id_idx on public.conversations(user_id);
create index if not exists conversations_status_idx on public.conversations(status);
create index if not exists user_profiles_email_idx on public.user_profiles(email);
create index if not exists user_profiles_role_idx on public.user_profiles(role);

-- Insert first admin user (replace with your email)
-- Run this separately after signup: UPDATE user_profiles SET role = 'admin' WHERE email = 'sol@hearthsideworks.com';
