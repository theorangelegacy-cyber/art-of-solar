-- =====================================================================
-- Sevbo Solar - lead capture, contact tracking, private inbox
-- Applied to project isghtmwaxyocvxorprhw (familycourthelpnow-security)
-- on 2026-09-01. Same design as DSC: the website can WRITE through two
-- functions and can READ nothing at all. Reads need an admin token.
-- =====================================================================

-- ---------------------------------------------------------------------
-- 1. leads
-- ---------------------------------------------------------------------
create table if not exists public.sevbo_leads (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz not null default now(),

  full_name       text not null,
  phone           text not null,
  email           text,
  city            text,
  service         text,
  timeline        text,
  project_details text,

  page_url        text,
  referrer        text,
  utm_source      text,
  utm_medium      text,
  utm_campaign    text,
  gclid           text,
  user_agent      text,
  client_ip       text,

  status          text not null default 'new',
  notes           text,
  contacted_at    timestamptz,

  constraint sevbo_leads_full_name_len    check (char_length(full_name) between 1 and 120),
  constraint sevbo_leads_phone_len        check (char_length(phone) between 7 and 40),
  constraint sevbo_leads_email_len        check (email is null or char_length(email) <= 200),
  constraint sevbo_leads_city_len         check (city is null or char_length(city) <= 120),
  constraint sevbo_leads_service_len      check (service is null or char_length(service) <= 120),
  constraint sevbo_leads_timeline_len     check (timeline is null or char_length(timeline) <= 60),
  constraint sevbo_leads_details_len      check (project_details is null or char_length(project_details) <= 4000),
  constraint sevbo_leads_page_url_len     check (page_url is null or char_length(page_url) <= 800),
  constraint sevbo_leads_referrer_len     check (referrer is null or char_length(referrer) <= 800),
  constraint sevbo_leads_utm_source_len   check (utm_source is null or char_length(utm_source) <= 200),
  constraint sevbo_leads_utm_medium_len   check (utm_medium is null or char_length(utm_medium) <= 200),
  constraint sevbo_leads_utm_campaign_len check (utm_campaign is null or char_length(utm_campaign) <= 200),
  constraint sevbo_leads_gclid_len        check (gclid is null or char_length(gclid) <= 200),
  constraint sevbo_leads_user_agent_len   check (user_agent is null or char_length(user_agent) <= 500),
  constraint sevbo_leads_notes_len        check (notes is null or char_length(notes) <= 4000),
  constraint sevbo_leads_status_allowed   check (status in ('new','contacted','quoted','won','lost','spam'))
);

create index if not exists sevbo_leads_created_at_idx on public.sevbo_leads (created_at desc);
create index if not exists sevbo_leads_status_idx     on public.sevbo_leads (status, created_at desc);
create index if not exists sevbo_leads_client_ip_idx  on public.sevbo_leads (client_ip, created_at desc);

alter table public.sevbo_leads enable row level security;
revoke all on public.sevbo_leads from anon, authenticated;

create or replace function public.submit_sevbo_lead(payload jsonb)
returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_ip     text;
  v_recent int;
  v_name   text;
  v_phone  text;
  v_id     uuid;
begin
  begin
    v_ip := split_part(
      coalesce((current_setting('request.headers', true)::jsonb ->> 'x-forwarded-for'), ''), ',', 1);
    v_ip := nullif(btrim(v_ip), '');
  exception when others then
    v_ip := null;
  end;

  -- abuse brake: 5 submissions per IP per hour
  if v_ip is not null then
    select count(*) into v_recent
      from public.sevbo_leads
     where client_ip = v_ip and created_at > now() - interval '1 hour';
    if v_recent >= 5 then
      raise exception 'rate_limited' using errcode = 'P0001';
    end if;
  end if;

  v_name  := btrim(coalesce(payload ->> 'full_name', ''));
  v_phone := btrim(coalesce(payload ->> 'phone', ''));

  if v_name = '' then
    raise exception 'name_required' using errcode = 'P0001';
  end if;
  if length(regexp_replace(v_phone, '\D', '', 'g')) < 10 then
    raise exception 'phone_invalid' using errcode = 'P0001';
  end if;

  insert into public.sevbo_leads (
    full_name, phone, email, city, service, timeline, project_details,
    page_url, referrer, utm_source, utm_medium, utm_campaign, gclid,
    user_agent, client_ip
  ) values (
    left(v_name, 120),
    left(v_phone, 40),
    left(nullif(btrim(coalesce(payload ->> 'email', '')), ''), 200),
    left(nullif(btrim(coalesce(payload ->> 'city', '')), ''), 120),
    left(nullif(btrim(coalesce(payload ->> 'service', '')), ''), 120),
    left(nullif(btrim(coalesce(payload ->> 'timeline', '')), ''), 60),
    left(nullif(btrim(coalesce(payload ->> 'project_details', '')), ''), 4000),
    left(nullif(payload ->> 'page_url', ''), 800),
    left(nullif(payload ->> 'referrer', ''), 800),
    left(nullif(payload ->> 'utm_source', ''), 200),
    left(nullif(payload ->> 'utm_medium', ''), 200),
    left(nullif(payload ->> 'utm_campaign', ''), 200),
    left(nullif(payload ->> 'gclid', ''), 200),
    left(nullif(payload ->> 'user_agent', ''), 500),
    v_ip
  )
  returning id into v_id;

  return jsonb_build_object('ok', true, 'reference', upper(left(v_id::text, 8)));
end;
$$;

revoke all on function public.submit_sevbo_lead(jsonb) from public;
grant execute on function public.submit_sevbo_lead(jsonb) to anon, authenticated;

-- ---------------------------------------------------------------------
-- 2. events (page views and contact taps)
-- ---------------------------------------------------------------------
create table if not exists public.sevbo_events (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),

  event        text not null,
  channel      text,
  label        text,

  page_path    text,
  page_url     text,
  referrer     text,
  utm_source   text,
  utm_medium   text,
  utm_campaign text,
  gclid        text,

  city         text,
  service      text,

  session_id   text,
  user_agent   text,
  client_ip    text,

  constraint sevbo_events_event_allowed check (event in (
    'page_view','form_start','form_submit',
    'call_click','text_click','whatsapp_click','email_click','quote_click','other'
  )),
  constraint sevbo_events_channel_len check (channel is null or char_length(channel) <= 40),
  constraint sevbo_events_label_len   check (label   is null or char_length(label)   <= 60),
  constraint sevbo_events_path_len    check (page_path is null or char_length(page_path) <= 400),
  constraint sevbo_events_url_len     check (page_url  is null or char_length(page_url)  <= 800),
  constraint sevbo_events_ref_len     check (referrer  is null or char_length(referrer)  <= 800),
  constraint sevbo_events_city_len    check (city    is null or char_length(city)    <= 120),
  constraint sevbo_events_service_len check (service is null or char_length(service) <= 120),
  constraint sevbo_events_session_len check (session_id is null or char_length(session_id) <= 64)
);

create index if not exists sevbo_events_created_idx on public.sevbo_events (created_at desc);
create index if not exists sevbo_events_event_idx   on public.sevbo_events (event, created_at desc);
create index if not exists sevbo_events_ip_idx      on public.sevbo_events (client_ip, created_at desc);

alter table public.sevbo_events enable row level security;
revoke all on public.sevbo_events from anon, authenticated;

create or replace function public.track_sevbo_event(payload jsonb)
returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_ip text; v_recent int; v_event text;
begin
  begin
    v_ip := split_part(
      coalesce((current_setting('request.headers', true)::jsonb ->> 'x-forwarded-for'), ''), ',', 1);
    v_ip := nullif(btrim(v_ip), '');
  exception when others then v_ip := null;
  end;

  if v_ip is not null then
    select count(*) into v_recent from public.sevbo_events
     where client_ip = v_ip and created_at > now() - interval '1 hour';
    if v_recent >= 200 then
      return jsonb_build_object('ok', false, 'reason', 'rate_limited');
    end if;
  end if;

  v_event := btrim(coalesce(payload ->> 'event', ''));
  if v_event not in ('page_view','form_start','form_submit','call_click','text_click',
                     'whatsapp_click','email_click','quote_click') then
    v_event := 'other';
  end if;

  insert into public.sevbo_events (
    event, channel, label, page_path, page_url, referrer,
    utm_source, utm_medium, utm_campaign, gclid,
    city, service, session_id, user_agent, client_ip
  ) values (
    v_event,
    left(nullif(btrim(coalesce(payload ->> 'channel', '')), ''), 40),
    left(nullif(btrim(coalesce(payload ->> 'label', '')), ''), 60),
    left(nullif(payload ->> 'page_path', ''), 400),
    left(nullif(payload ->> 'page_url', ''), 800),
    left(nullif(payload ->> 'referrer', ''), 800),
    left(nullif(payload ->> 'utm_source', ''), 200),
    left(nullif(payload ->> 'utm_medium', ''), 200),
    left(nullif(payload ->> 'utm_campaign', ''), 200),
    left(nullif(payload ->> 'gclid', ''), 200),
    left(nullif(payload ->> 'city', ''), 120),
    left(nullif(payload ->> 'service', ''), 120),
    left(nullif(payload ->> 'session_id', ''), 64),
    left(nullif(payload ->> 'user_agent', ''), 500),
    v_ip
  );
  return jsonb_build_object('ok', true);
exception when others then
  return jsonb_build_object('ok', false);
end;
$$;

revoke all on function public.track_sevbo_event(jsonb) from public;
grant execute on function public.track_sevbo_event(jsonb) to anon, authenticated;

-- ---------------------------------------------------------------------
-- 3. admin tokens (only the sha256 hash is stored)
--
-- Issue one:
--   with t as (select 'sevbo-' || encode(extensions.gen_random_bytes(12),'hex') as tok)
--   insert into public.sevbo_admin_tokens (label, token_hash)
--   select 'label here', encode(extensions.digest(tok,'sha256'),'hex') from t
--   returning (select tok from t) as your_token;
-- Revoke one:
--   update public.sevbo_admin_tokens set revoked_at = now() where label = 'label here';
-- ---------------------------------------------------------------------
create table if not exists public.sevbo_admin_tokens (
  id         uuid primary key default gen_random_uuid(),
  label      text not null,
  token_hash text not null unique,
  created_at timestamptz not null default now(),
  revoked_at timestamptz
);

alter table public.sevbo_admin_tokens enable row level security;
revoke all on public.sevbo_admin_tokens from anon, authenticated;

create or replace function public.sevbo_token_ok(p_token text)
returns boolean
language sql stable security definer
set search_path = public, extensions, pg_temp
as $$
  select exists (
    select 1 from public.sevbo_admin_tokens
     where revoked_at is null
       and token_hash = encode(extensions.digest(coalesce(p_token, ''), 'sha256'), 'hex')
  );
$$;

revoke all on function public.sevbo_token_ok(text) from public;

create or replace function public.sevbo_recent_leads(p_token text, p_limit integer default 100)
returns jsonb
language plpgsql
stable security definer
set search_path = public, extensions, pg_temp
as $$
declare
  v_limit int := greatest(1, least(coalesce(p_limit, 100), 300));
begin
  if not public.sevbo_token_ok(p_token) then
    raise exception 'unauthorized' using errcode = 'P0001';
  end if;

  return (
    select coalesce(jsonb_agg(row_to_json(l) order by l.created_at desc), '[]'::jsonb)
    from (
      select id, created_at, full_name, phone, email, city, service, timeline,
             project_details, page_url, utm_source, status
      from public.sevbo_leads
      order by created_at desc
      limit v_limit
    ) l
  );
end;
$$;

revoke all on function public.sevbo_recent_leads(text, integer) from public;
grant execute on function public.sevbo_recent_leads(text, integer) to anon, authenticated;
