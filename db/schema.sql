create extension if not exists "uuid-ossp";

create table if not exists public.recipes (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  ingredients text not null,
  steps text not null,
  imageUrl text not null,
  created_at timestamptz default now()
);
