# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Package Manager**: This project uses pnpm (version 10.11.1+)

**Development workflow**:

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm lint         # Run ESLint
pnpm format       # Format code with Prettier
```

**Environment Setup**: Copy `.env.example` to `.env.local` and configure Supabase credentials:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Architecture Overview

**Tech Stack**: Next.js 13+ with App Router, TypeScript, Tailwind CSS, Supabase

**Project Structure**:

- `app/` - Next.js App Router pages and layouts
- `components/` - Reusable React components
- `lib/` - Utilities (Supabase client, image upload logic)
- `styles/` - Global CSS styles

**Data Layer**:

- Supabase PostgreSQL database with `recipes` table
- Supabase Storage bucket `recipes-images` for image uploads
- Direct Supabase client calls in Server Components for data fetching

**Key Features**:

- Recipe CRUD operations with image upload
- Search functionality using Supabase `.or()` queries on title and content
- Sorting by creation date (asc/desc)
- Markdown rendering for recipe content using react-markdown

**Image Upload**: Custom implementation using XMLHttpRequest for progress tracking, uploads to Supabase Storage with URL-encoded paths to handle special characters.

**UI Language**: Traditional Chinese (zh-tw) - all user-facing text should be in Traditional Chinese.

**Component Patterns**:

- Server Components for data fetching (pages)
- Client Components for interactivity (forms, search, image upload)
- React Hook Form for form handling
- Link components for navigation with hover transitions
