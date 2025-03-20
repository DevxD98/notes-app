-- Create a table for public notes
create table notes (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  content text,
  user_id uuid references auth.users not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS)
alter table notes enable row level security;

-- Create policies
create policy "Users can view their own notes" on notes
  for select using (auth.uid() = user_id);

create policy "Users can create their own notes" on notes
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own notes" on notes
  for update using (auth.uid() = user_id);

create policy "Users can delete their own notes" on notes
  for delete using (auth.uid() = user_id);