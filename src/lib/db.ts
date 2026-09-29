import { SQL } from 'bun'
import { env } from '../config/env'

export const db = new SQL(env.DATABASE_URL)

export async function initDb() {
  await db`
    create table if not exists assets (
      id bigserial primary key,
      key text unique not null,
      title text,
      size bigint not null default 0,
      mime text,
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now()
    )
  `
  await db`
    create table if not exists settings (
      key text primary key,
      value jsonb not null,
      updated_at timestamptz not null default now()
    )
  `
  await db`
    create table if not exists courses (
      id bigserial primary key,
      slug text unique not null,
      title text not null,
      description text not null default '',
      cover_asset_id bigint references assets(id) on delete set null,
      published boolean not null default false,
      position integer not null default 0,
      created_at timestamptz not null default now()
    )
  `
  await db`
    create table if not exists modules (
      id bigserial primary key,
      course_id bigint not null references courses(id) on delete cascade,
      title text not null default '',
      position integer not null default 0,
      created_at timestamptz not null default now()
    )
  `
  await db`
    create table if not exists lessons (
      id bigserial primary key,
      course_id bigint not null references courses(id) on delete cascade,
      asset_id bigint not null references assets(id) on delete cascade,
      title text not null default '',
      position integer not null default 0,
      created_at timestamptz not null default now()
    )
  `
  await db`alter table lessons add column if not exists free boolean not null default false`
  await db`alter table lessons add column if not exists module_id bigint references modules(id) on delete set null`
  await db`alter table lessons add column if not exists type text not null default 'video'`
  await db`alter table lessons add column if not exists body text not null default ''`
  await db`alter table lessons alter column asset_id drop not null`
  await db`
    create table if not exists grants (
      id bigserial primary key,
      email text not null,
      course_id bigint not null references courses(id) on delete cascade,
      status text not null default 'active',
      expires_at timestamptz,
      source text not null default 'manual',
      created_at timestamptz not null default now()
    )
  `
  await db`
    create unique index if not exists grants_email_course
    on grants (lower(email), course_id)
  `
}

export async function initTestimonials() {
  await db`
    create table if not exists testimonials (
      id bigserial primary key,
      asset_id bigint not null references assets(id) on delete cascade,
      title text not null default '',
      quote text not null default '',
      author text not null default '',
      poster_key text,
      web_key text,
      status text not null default 'pending',
      published boolean not null default false,
      position integer not null default 0,
      created_at timestamptz not null default now()
    )
  `
}

export async function initProgress() {
  await db`
    create table if not exists lesson_progress (
      id bigserial primary key,
      email text not null,
      lesson_id bigint not null references lessons(id) on delete cascade,
      completed_at timestamptz not null default now(),
      unique (email, lesson_id)
    )
  `
}
