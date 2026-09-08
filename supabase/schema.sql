create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  phone text,
  name text default '',
  email text default '',
  district text default '',
  address text default '',
  document_name text default '',
  document_path text default '',
  updated_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can create their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

insert into storage.buckets (id, name, public)
values ('profile-documents', 'profile-documents', true)
on conflict (id) do nothing;

create policy "Users can upload their own documents"
  on storage.objects for insert
  with check (bucket_id = 'profile-documents' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "Users can view their own documents"
  on storage.objects for select
  using (bucket_id = 'profile-documents' and (storage.foldername(name))[1] = auth.uid()::text);
