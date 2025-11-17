-- =====================================================
-- Waitlist Embed - Database Schema
-- =====================================================
-- This file contains the complete database schema for the waitlist system.
-- Run this in your Supabase SQL editor or via migration tools.

-- Create core schema if it doesn't exist
CREATE SCHEMA IF NOT EXISTS "core";

-- =====================================================
-- Table: core.waitlist
-- =====================================================
-- Stores waitlist registration submissions
CREATE TABLE IF NOT EXISTS "core"."waitlist" (
    "waitlist_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "first_name" "text",
    "last_name" "text",
    "email" "text" NOT NULL,
    "organization_name" "text",
    "job_title" "text",
    "interest_reason" "text",
    "use_case" "text",
    "feedback_importance" integer,
    "subscribe_newsletter" boolean DEFAULT false,
    "status" "text" DEFAULT 'pending'::"text" NOT NULL,
    "invite_id" "uuid",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    CONSTRAINT "valid_status" CHECK ((status = ANY (ARRAY['pending'::"text", 'approved'::"text", 'rejected'::"text"]))),
    CONSTRAINT "valid_feedback_score" CHECK (((feedback_importance >= 1) AND (feedback_importance <= 10)))
);

-- Set table owner
ALTER TABLE "core"."waitlist" OWNER TO "postgres";

-- =====================================================
-- Primary Key
-- =====================================================
ALTER TABLE ONLY "core"."waitlist"
    ADD CONSTRAINT "waitlist_pkey" PRIMARY KEY ("waitlist_id");

-- =====================================================
-- Indexes
-- =====================================================
-- Unique index on email (case-insensitive)
CREATE UNIQUE INDEX IF NOT EXISTS "idx_waitlist_email_unique"
    ON "core"."waitlist" USING "btree" (LOWER("email"));

-- Index on status for filtering
CREATE INDEX IF NOT EXISTS "idx_waitlist_status"
    ON "core"."waitlist" USING "btree" ("status");

-- Index on created_at for sorting (most recent first)
CREATE INDEX IF NOT EXISTS "idx_waitlist_created_at"
    ON "core"."waitlist" USING "btree" ("created_at" DESC);

-- =====================================================
-- Row Level Security (RLS)
-- =====================================================
-- Enable RLS on the waitlist table
ALTER TABLE "core"."waitlist" ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public INSERT (for waitlist submissions)
CREATE POLICY "allow_public_insert" ON "core"."waitlist"
    FOR INSERT
    TO public
    WITH CHECK (true);

-- Policy: Allow service role full access
CREATE POLICY "allow_service_role_all" ON "core"."waitlist"
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- =====================================================
-- Permissions
-- =====================================================
-- Grant permissions to anon (public access)
GRANT INSERT ON TABLE "core"."waitlist" TO "anon";

-- Grant permissions to authenticated users
GRANT SELECT, INSERT ON TABLE "core"."waitlist" TO "authenticated";

-- Grant all permissions to service role
GRANT ALL ON TABLE "core"."waitlist" TO "service_role";

-- =====================================================
-- Comments
-- =====================================================
COMMENT ON TABLE "core"."waitlist" IS 'Stores waitlist registration submissions';
COMMENT ON COLUMN "core"."waitlist"."waitlist_id" IS 'Unique identifier for the waitlist entry';
COMMENT ON COLUMN "core"."waitlist"."email" IS 'Email address (unique, case-insensitive)';
COMMENT ON COLUMN "core"."waitlist"."status" IS 'Status: pending, approved, or rejected';
COMMENT ON COLUMN "core"."waitlist"."feedback_importance" IS 'User-rated importance (1-10 scale)';
COMMENT ON COLUMN "core"."waitlist"."invite_id" IS 'Optional: Associated invite ID after approval';
