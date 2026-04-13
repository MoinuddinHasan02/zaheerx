# Zaheerx.com Web App Upgrade Plan (Approved-Ready)

This document outlines the architecture, tech stack, and implementation steps for upgrading `zaheerx.com` with robust backend functionality.

## Overview & Requirements
- **Goal:** Upgrade to a modern, dynamic web app with full backend support.
- **Key Features:** Admin Dashboard, Blog, Institutional Showcase, and **Lead Management**.
- **Backend Features:** Actionable phone contact, Leads to WhatsApp (+91 77951 40616), and Database persistence for enquiries.

## Finalized Configuration
- **Official Number:** +91 77951 40616 (WhatsApp & Voice)
- **Lead Capture:** Every enquiry from the contact form will be saved securely in the SQLite database for record-keeping.
- **WhatsApp Flow:** User fills form -> Data saved to DB -> Redirected to WhatsApp with pre-filled message.

## Proposed Changes

### 1. Database (Prisma)
- **Model:** Add `Enquiry` model to `schema.prisma` with fields: `name`, `email`, `phone`, `message`, `createdAt`.
- **Sync:** Run `npx prisma db push` to update the local SQLite database.

### 2. Backend (API)
- **Contact Route:** Modify `src/app/api/contact/route.ts` to create a record in the `Enquiry` table using Prisma.

### 3. Frontend Integration
- **Contact Form:**
  - Update submission logic to construct a WhatsApp link: `https://wa.me/917795140616?text=...`
  - Ensure the redirect happens after a successful database save.
- **Interactive UI:**
  - Update `Phone` icons to use `tel:+917795140616`.
  - Update `WhatsApp` icons to use the direct chat link.

### 4. Admin Dashboard
- **Leads Section:** Add a new tab in the Admin panel to view and delete captured enquiries (optional but recommended).

## Verification Plan
- **Data Integrity:** Submit a test enquiry and verify it appears in Prisma Studio.
- **UX Flow:** Verify the browser opens WhatsApp with the correct message formatting.
- **Responsive:** Ensure contact links work on both mobile (calls/WhatsApp) and desktop (WhatsApp Web).


