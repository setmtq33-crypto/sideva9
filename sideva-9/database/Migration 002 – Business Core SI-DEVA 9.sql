-- ==========================================
-- SI-DEVA 9
-- MIGRATION 002 - BUSINESS CORE
-- ==========================================

-- ==========================================
-- ENUMS
-- ==========================================

do $$
begin

    if not exists (
        select 1
        from pg_type
        where typname = 'procurement_method'
    ) then

        create type public.procurement_method as enum (
            'ECATALOG',
            'PENGADAAN_LANGSUNG',
            'MINI_KOMPETISI'
        );

    end if;

    if not exists (
        select 1
        from pg_type
        where typname = 'package_status'
    ) then

        create type public.package_status as enum (
            'PERENCANAAN',
            'PERSIAPAN',
            'PELAKSANAAN',
            'SELESAI'
        );

    end if;

end $$;

-- ==========================================
-- AUDIT LOGS
-- ==========================================

create table if not exists system.audit_logs (

    id uuid primary key default gen_random_uuid(),

    tenant_id uuid,
    opd_id uuid,

    actor_id uuid,

    action text not null,

    table_name text not null,

    record_id uuid,

    old_data jsonb,

    new_data jsonb,

    created_at timestamptz not null default now()

);

-- ==========================================
-- PACKAGES
-- ==========================================

create table if not exists business.packages (

    id uuid primary key default gen_random_uuid(),

    tenant_id uuid not null
        references public.tenants(id),

    opd_id uuid not null
        references public.opds(id),

    package_code text,

    package_name text not null,

    fiscal_year integer not null,

    procurement_method public.procurement_method not null,

    budget_ceiling numeric(18,2) default 0,

    status public.package_status
        not null
        default 'PERENCANAAN',

    created_by uuid,

    created_at timestamptz not null default now(),

    updated_at timestamptz not null default now()

);

-- ==========================================
-- PACKAGE ITEMS
-- ==========================================

create table if not exists business.package_items (

    id uuid primary key default gen_random_uuid(),

    tenant_id uuid not null
        references public.tenants(id),

    opd_id uuid not null
        references public.opds(id),

    package_id uuid not null
        references business.packages(id)
        on delete cascade,

    item_name text not null,

    specification text,

    quantity numeric(18,2) default 0,

    unit text,

    estimated_price numeric(18,2) default 0,

    created_at timestamptz not null default now(),

    updated_at timestamptz not null default now()

);

-- ==========================================
-- PRICE SURVEYS
-- ==========================================

create table if not exists business.price_surveys (

    id uuid primary key default gen_random_uuid(),

    tenant_id uuid not null
        references public.tenants(id),

    opd_id uuid not null
        references public.opds(id),

    package_item_id uuid not null
        references business.package_items(id)
        on delete cascade,

    vendor_name text not null,

    survey_price numeric(18,2) not null,

    negotiated_price numeric(18,2),

    is_candidate boolean not null default false,

    is_winner boolean not null default false,

    survey_date date,

    notes text,

    created_at timestamptz not null default now()

);

-- ==========================================
-- INDEXES
-- ==========================================

create index if not exists idx_packages_tenant
on business.packages(tenant_id);

create index if not exists idx_packages_opd
on business.packages(opd_id);

create index if not exists idx_package_items_package
on business.package_items(package_id);

create index if not exists idx_price_surveys_item
on business.price_surveys(package_item_id);

-- ==========================================
-- UPDATED AT TRIGGERS
-- ==========================================

create trigger trg_packages_updated_at
before update
on business.packages
for each row
execute function public.set_updated_at();

create trigger trg_package_items_updated_at
before update
on business.package_items
for each row
execute function public.set_updated_at();

-- ==========================================
-- RLS
-- ==========================================

alter table business.packages
enable row level security;

alter table business.package_items
enable row level security;

alter table business.price_surveys
enable row level security;

-- PACKAGES

create policy packages_select_policy
on business.packages
for select
using (
    security.is_super_admin()
    or
    (
        tenant_id = security.current_tenant_id()
        and
        opd_id = security.current_opd_id()
    )
);

create policy packages_insert_policy
on business.packages
for insert
with check (
    security.is_super_admin()
    or
    (
        tenant_id = security.current_tenant_id()
        and
        opd_id = security.current_opd_id()
    )
);

create policy packages_update_policy
on business.packages
for update
using (
    security.is_super_admin()
    or
    (
        tenant_id = security.current_tenant_id()
        and
        opd_id = security.current_opd_id()
    )
);

-- PACKAGE ITEMS

create policy package_items_policy
on business.package_items
for all
using (
    security.is_super_admin()
    or
    (
        tenant_id = security.current_tenant_id()
        and
        opd_id = security.current_opd_id()
    )
)
with check (
    security.is_super_admin()
    or
    (
        tenant_id = security.current_tenant_id()
        and
        opd_id = security.current_opd_id()
    )
);

-- PRICE SURVEYS

create policy price_surveys_policy
on business.price_surveys
for all
using (
    security.is_super_admin()
    or
    (
        tenant_id = security.current_tenant_id()
        and
        opd_id = security.current_opd_id()
    )
)
with check (
    security.is_super_admin()
    or
    (
        tenant_id = security.current_tenant_id()
        and
        opd_id = security.current_opd_id()
    )
);

-- ==========================================
-- END MIGRATION 002
-- ==========================================