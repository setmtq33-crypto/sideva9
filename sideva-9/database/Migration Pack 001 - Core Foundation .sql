-- ==========================================
-- SI-DEVA 9
-- MIGRATION 001 - CORE FOUNDATION
-- ==========================================

create extension if not exists pgcrypto;

-- ==========================================
-- SCHEMA
-- ==========================================

create schema if not exists security;
create schema if not exists business;
create schema if not exists system;

-- ==========================================
-- ENUM ROLE
-- ==========================================

do $$
begin

    if not exists (
        select 1
        from pg_type
        where typname = 'user_role'
    ) then

        create type public.user_role as enum (
            'SUPER_ADMIN',
            'ADMIN_OPD'
        );

    end if;

end $$;

-- ==========================================
-- TENANTS
-- ==========================================

create table if not exists public.tenants (

    id uuid primary key default gen_random_uuid(),

    code text not null unique,

    name text not null,

    is_active boolean not null default true,

    created_at timestamptz not null default now()

);

-- ==========================================
-- OPDS
-- ==========================================

create table if not exists public.opds (

    id uuid primary key default gen_random_uuid(),

    tenant_id uuid not null
        references public.tenants(id)
        on delete restrict,

    code text not null,

    name text not null,

    is_active boolean not null default true,

    created_at timestamptz not null default now(),

    unique(tenant_id, code)

);

create index if not exists idx_opds_tenant_id
on public.opds(tenant_id);

-- ==========================================
-- PROFILES
-- ==========================================

create table if not exists public.profiles (

    id uuid primary key default gen_random_uuid(),

    auth_user_id uuid not null unique
        references auth.users(id)
        on delete cascade,

    tenant_id uuid not null
        references public.tenants(id)
        on delete restrict,

    opd_id uuid
        references public.opds(id)
        on delete restrict,

    role public.user_role not null,

    full_name text not null,

    email text not null,

    is_active boolean not null default true,

    created_at timestamptz not null default now(),

    updated_at timestamptz not null default now()

);

create index if not exists idx_profiles_auth_user_id
on public.profiles(auth_user_id);

create index if not exists idx_profiles_tenant_id
on public.profiles(tenant_id);

create index if not exists idx_profiles_opd_id
on public.profiles(opd_id);

-- ==========================================
-- UPDATED AT FUNCTION
-- ==========================================

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
    new.updated_at = now();
    return new;
end;
$$;

drop trigger if exists trg_profiles_updated_at
on public.profiles;

create trigger trg_profiles_updated_at
before update
on public.profiles
for each row
execute function public.set_updated_at();

-- ==========================================
-- SECURITY FUNCTIONS
-- ==========================================

create or replace function security.current_tenant_id()
returns uuid
language sql
security definer
set search_path = public
as $$
    select tenant_id
    from public.profiles
    where auth_user_id = auth.uid()
    limit 1;
$$;

create or replace function security.current_opd_id()
returns uuid
language sql
security definer
set search_path = public
as $$
    select opd_id
    from public.profiles
    where auth_user_id = auth.uid()
    limit 1;
$$;

create or replace function security.is_super_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
    select exists (
        select 1
        from public.profiles
        where auth_user_id = auth.uid()
          and role = 'SUPER_ADMIN'
          and is_active = true
    );
$$;

-- ==========================================
-- RLS
-- ==========================================

alter table public.profiles
enable row level security;

-- super admin lihat semua profile

create policy profiles_super_admin_select
on public.profiles
for select
using (
    security.is_super_admin()
);

-- admin opd hanya lihat profile opd sendiri

create policy profiles_admin_opd_select
on public.profiles
for select
using (

    tenant_id = security.current_tenant_id()

    and

    opd_id = security.current_opd_id()

);

-- ==========================================
-- END MIGRATION 001
-- ==========================================