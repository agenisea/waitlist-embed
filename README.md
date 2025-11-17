# Waitlist Embed

**Self-contained waitlist system with embeddable widget and backend API.**

[![Status](https://img.shields.io/badge/status-self--contained-brightgreen)]()
[![Next.js](https://img.shields.io/badge/Next.js-15.5.6-black)]()
[![React](https://img.shields.io/badge/React-18%2B-blue)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)]()
[![Tailwind](https://img.shields.io/badge/Tailwind-4.1.9-38bdf8)]()

![Waitlist Demo](demo.png)

---

## Overview

A complete, self-contained waitlist system with both frontend and backend components, designed for easy deployment and embedding.

- 📝 **Multi-Step Form** - 4-step carousel with client-side validation
- 🎨 **Embeddable Widget** - CSP frame-ancestors security for iframe embedding
- 🌐 **Standalone Page** - Non-embedded page with full layout
- ✅ **Self-Contained** - Complete full-stack solution with root layout
- 🚀 **Backend API Included** - Ready-to-deploy with Supabase integration
- 🔒 **Secure** - Built-in CORS, CSRF, and input validation

---

## Quick Start

```bash
# 1. Clone/copy app-waitlist-embed to your deployment location
cd app-waitlist-embed

# 2. Install dependencies
npm install

# 3. Configure environment variables
cat > .env.local <<EOF
NEXT_PUBLIC_APP_URL=https://your-domain.com
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_KEY=your-service-key
ALLOWED_EMBED_ORIGINS=https://yoursite.com,https://marketing.yoursite.com

# Optional: SMTP for confirmation emails
SMTP_HOST=smtp.zoho.com
SMTP_PORT=465
SMTP_USER=your-email@domain.com
SMTP_PASS=your-password
SMTP_FROM=noreply@domain.com
EOF

# 4. Set up database in Supabase
# Run the SQL schema file in Supabase SQL Editor:
# Copy contents from: database/schema.sql
# Or run: psql -h <host> -U postgres -d postgres -f database/schema.sql

# 5. Build and deploy
npm run build
npm run start

# 6. Access your waitlist:
# Standalone: https://your-domain.com/waitlist
# Embedded: https://your-domain.com/embed/waitlist

# 7. Embed on your marketing site (optional)
# <iframe src="https://your-domain.com/embed/waitlist" ...></iframe>
```

---

## Features

### 📝 Multi-Step Waitlist Form

- **4-Step Carousel**: Interest reason → Use case → Importance rating → Contact details
- **Client-Side Validation**: Real-time validation for all fields
- **Progress Indicators**: Visual step tracking
- **Responsive Design**: Optimized for desktop and mobile

### 🎨 Embeddable Widget

- **iframe Support**: Designed for embedding on external sites
- **CSP Protection**: Frame-ancestors security configuration
- **Google Analytics**: Optional tracking integration (configurable)
- **Responsive Layout**: Adapts to iframe dimensions

### 🔒 Security Features

- **CORS Protection**: Configurable allowed origins
- **CSRF Validation**: Server-side origin checking
- **Input Validation**: Client-side and server-side validation
- **Email Validation**: Regex-based email format checking

---

## Table of Contents

1. [File Inventory](#1-file-inventory)
2. [Dependencies](#2-dependencies)
3. [Integration Guide](#3-integration-guide)
4. [Database Schema](#4-database-schema)
5. [Configuration](#5-configuration)
6. [Deployment](#6-deployment)
7. [Summary](#7-summary)

---

## 1. File Inventory

```
app-waitlist-embed/                                    (33 files total)
├── app/
│   ├── layout.tsx                               # Root layout (Next.js required)
│   ├── globals.css                              # Global styles and Tailwind v4
│   ├── waitlist/
│   │   └── page.tsx                             # Standalone waitlist page
│   ├── embed/
│   │   └── waitlist/
│   │       └── page.tsx                         # Embeddable waitlist (iframe)
│   └── api/
│       └── waitlist/
│           └── join/
│               └── route.ts                     # Waitlist API endpoint
│
├── components/
│   ├── waitlist/
│   │   └── waitlist-carousel.tsx                # Multi-step form component
│   └── ui/                                      # shadcn/ui components (7 files)
│       ├── card.tsx
│       ├── button.tsx
│       ├── badge.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── sheet.tsx
│       └── alert-dialog.tsx
│
├── lib/
│   ├── waitlist/
│   │   ├── manager.ts                           # Waitlist business logic
│   │   └── constants.ts                         # Waitlist constants
│   ├── security/
│   │   └── csrf.ts                              # CSRF validation
│   ├── types/
│   │   └── index.ts                             # TypeScript types
│   ├── db/
│   │   ├── client.ts                            # Supabase client
│   │   └── supabase-adapter.ts                  # Database adapter
│   ├── server/
│   │   ├── email.ts                             # SMTP email sending
│   │   └── email-templates.ts                   # Email HTML templates
│   ├── utils/
│   │   ├── fetch.ts                             # Retry logic
│   │   └── constants.ts                         # Shared constants
│   └── client/
│       └── use-close-on-orientation-change.ts   # Orientation hook
│
├── database/
│   └── schema.sql                               # Complete database schema
│
├── package.json                                 # Dependencies
├── tsconfig.json                                # TypeScript config
├── postcss.config.mjs                           # PostCSS/Tailwind v4 config
└── README.md                                    # This file
```

### Key Components

**app/waitlist/page.tsx**
- **Purpose**: Standalone waitlist page with full layout
- **Route**: `/waitlist`
- **Features**: Full page layout, responsive design, public-facing

**app/embed/waitlist/page.tsx**
- **Purpose**: Embeddable waitlist page for iframe integration
- **Route**: `/embed/waitlist`
- **Features**:
  - CSP frame-ancestors protection via `ALLOWED_EMBED_ORIGINS`
  - Google Analytics integration (configurable)
  - Minimal chrome, optimized for embedding

**components/waitlist/waitlist-carousel.tsx**
- **Purpose**: Multi-step form component for waitlist signup
- **Features**: 4-step carousel, validation, API integration

**app/api/waitlist/join/route.ts**
- **Purpose**: Backend API endpoint for waitlist submissions
- **Route**: `POST /api/waitlist/join`
- **Features**: CSRF protection, email validation, database storage, confirmation emails

---

## 2. Dependencies

### 2.1 NPM Packages Required

```json
{
  "dependencies": {
    "@radix-ui/react-dialog": "^1.1.15",
    "@radix-ui/react-label": "^2.1.8",
    "@radix-ui/react-slot": "^1.2.4",
    "@supabase/supabase-js": "^2.39.0",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "geist": "^1.5.1",
    "lucide-react": "^0.263.1",
    "next": "^15.5.6",
    "nodemailer": "^6.9.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "tailwind-merge": "^3.4.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "4.1.9",
    "@types/node": "^20.0.0",
    "@types/nodemailer": "^6.4.14",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "tailwindcss": "4.1.9",
    "typescript": "^5.0.0"
  }
}
```

### 2.2 External Services

**Required**:
- **Supabase**: Database for storing waitlist entries
  - Free tier available
  - Requires `waitlist` table (see Database Schema section)

**Optional**:
- **SMTP Server**: For sending confirmation emails
  - Works with Gmail, Zoho, SendGrid, etc.
  - Not required for basic functionality

---

## 3. Integration Guide

### 3.1 Setup Steps

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure TypeScript** (`tsconfig.json` already included):
   ```json
   {
     "compilerOptions": {
       "baseUrl": ".",
       "paths": {
         "@/*": ["./*"]
       }
     }
   }
   ```

3. **Set environment variables** (`.env.local`):
   ```bash
   # Required
   NEXT_PUBLIC_APP_URL=https://your-domain.com
   SUPABASE_URL=https://xxx.supabase.co
   SUPABASE_KEY=your-service-role-key

   # Optional: Allow embedding on specific domains
   ALLOWED_EMBED_ORIGINS=https://marketing-site.com,https://landing.com

   # Optional: SMTP for confirmation emails
   SMTP_HOST=smtp.zoho.com
   SMTP_PORT=465
   SMTP_USER=noreply@yourdomain.com
   SMTP_PASS=your-password
   SMTP_FROM=noreply@yourdomain.com
   ```

4. **Set up database** (see Database Schema section below)

5. **Build and deploy**:
   ```bash
   npm run build
   npm run start
   ```

### 3.2 Embedding the Widget

```html
<!-- On your marketing site -->
<iframe
  src="https://your-app.com/embed/waitlist"
  width="100%"
  height="700"
  frameborder="0"
  style="border: none; max-width: 800px;"
  allow="analytics"
></iframe>
```

### 3.3 Security Configuration

**CSP frame-ancestors** protection is configured via `ALLOWED_EMBED_ORIGINS`:

```bash
# Production: Allow specific domains to embed
ALLOWED_EMBED_ORIGINS=https://example.com,https://marketing.example.com

# Development: Allow all origins (not recommended for production)
# Leave empty or omit the variable
```

---

## 4. Database Schema

### Quick Setup

**File Location:** `database/schema.sql`

Run the complete schema file in your Supabase SQL Editor:

1. Open Supabase Dashboard → SQL Editor
2. Copy the entire contents of `database/schema.sql`
3. Click "Run" to execute

**What's Included:**
- ✅ `core.waitlist` table with all columns
- ✅ Primary key and constraints
- ✅ Performance indexes (email, status, created_at)
- ✅ Row Level Security (RLS) policies
- ✅ Permissions for anon, authenticated, and service_role
- ✅ Table and column comments for documentation

### Table Structure

**Table:** `core.waitlist`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `waitlist_id` | UUID | PRIMARY KEY | Unique identifier (auto-generated) |
| `first_name` | TEXT | - | User's first name |
| `last_name` | TEXT | - | User's last name |
| `email` | TEXT | NOT NULL, UNIQUE | Email address (case-insensitive unique) |
| `organization_name` | TEXT | - | Company/organization name |
| `job_title` | TEXT | - | User's job title |
| `interest_reason` | TEXT | - | Why they're interested |
| `use_case` | TEXT | - | Intended use case |
| `feedback_importance` | INTEGER | 1-10 range | Importance rating (1-10) |
| `subscribe_newsletter` | BOOLEAN | DEFAULT false | Newsletter opt-in |
| `status` | TEXT | DEFAULT 'pending' | Status: pending/approved/rejected |
| `invite_id` | UUID | NULLABLE | Associated invite (after approval) |
| `created_at` | TIMESTAMPTZ | DEFAULT now() | Creation timestamp |
| `updated_at` | TIMESTAMPTZ | DEFAULT now() | Last update timestamp |

### Indexes

- **Email (Unique):** `idx_waitlist_email_unique` - Case-insensitive email lookup
- **Status:** `idx_waitlist_status` - Fast filtering by status
- **Created At:** `idx_waitlist_created_at` - Sorting by date (DESC)

### Row Level Security

**Enabled:** Yes

**Policies:**
1. `allow_public_insert` - Anyone can submit to waitlist (INSERT)
2. `allow_service_role_all` - Service role has full access (ALL)

**Permissions:**
- `anon` - INSERT only (public waitlist submissions)
- `authenticated` - SELECT, INSERT
- `service_role` - ALL (admin access)

### Environment Variables for Database

```bash
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_KEY=your-service-role-key  # Service role key, not anon key
```

---

## 5. Configuration

### 5.1 Environment Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `NEXT_PUBLIC_APP_URL` | Yes | Application base URL | `https://widget.example.com` |
| `SUPABASE_URL` | Yes | Supabase project URL | `https://xxx.supabase.co` |
| `SUPABASE_KEY` | Yes | Supabase service role key | `eyJhbGc...` |
| `ALLOWED_EMBED_ORIGINS` | No | Comma-separated domains allowed to embed | `https://site1.com,https://site2.com` |
| `SMTP_HOST` | No | SMTP server hostname | `smtp.zoho.com` |
| `SMTP_PORT` | No | SMTP server port | `465` (SSL) or `587` (TLS) |
| `SMTP_USER` | No | SMTP username/email | `noreply@example.com` |
| `SMTP_PASS` | No | SMTP password | `your-password` |
| `SMTP_FROM` | No | From email address | `noreply@example.com` |

### 5.2 Customization

**Branding**:
- Update logo in `/public/logo.webp`
- Modify email templates in `lib/server/email.ts` and `lib/server/email-templates.ts`
- Update colors and styling in component files

**Google Analytics** (optional):
- Update tracking ID in `app/embed/waitlist/page.tsx` (line 16 and 24)
- Current placeholder: `G-GABCD1234`

---

## 6. Deployment

### Option 1: Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
# Add all required env vars from section 5.1
```

### Option 2: Docker

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

```bash
docker build -t app-waitlist-embed .
docker run -p 3000:3000 --env-file .env app-waitlist-embed
```

### Option 3: Self-Hosted

```bash
# Build
npm run build

# Start production server
npm run start

# Use PM2 for process management (optional)
npm install -g pm2
pm2 start npm --name "waitlist" -- start
```

---

## 7. Summary

**Status**: ✅ **Production Ready** - Self-contained waitlist system

**What's Included**:
- ✅ Standalone waitlist page (`/waitlist`)
- ✅ Embeddable waitlist widget (`/embed/waitlist`)
- ✅ Backend API endpoint (`POST /api/waitlist/join`)
- ✅ Supabase database adapter
- ✅ Waitlist manager with business logic
- ✅ CSRF protection and security validation
- ✅ Email confirmation system (optional)
- ✅ Multi-step form with validation
- ✅ All UI components (shadcn/ui based)

**What's NOT Included**:
- ❌ Authentication system
- ❌ Admin dashboard for managing entries
- ❌ User management or RBAC
- ❌ Advanced analytics or reporting

**Technology Stack**:
- **Frontend**: Next.js 15.5.6 (App Router), React 18+, TypeScript
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Email**: Nodemailer (optional)
- **Styling**: Tailwind CSS 4.1.9

**Deployment Requirements**:
1. Node.js 20+ runtime
2. Supabase account (free tier works)
3. SMTP server (optional, for emails)

**Next Steps**:
1. Set up Supabase project and create `waitlist` table
2. Configure environment variables
3. Customize branding (logo, colors, email templates)
4. Deploy to your preferred platform
5. Embed on marketing site (optional)

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**End of Documentation**
