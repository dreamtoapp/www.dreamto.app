# Action Plan: Client Portal & Floating CTA for Free Consultation

## 1. Client Portal: Login & Request Submission

### 1.1. Authentication
- Integrate NextAuth.js for secure authentication (email/password, social login optional).
- Set up user registration, login, and password reset flows.
- Protect client portal routes using middleware and server actions.

### 1.2. Client Dashboard
- After login, redirect clients to a dashboard (`/dashboard`).
- Dashboard features:
  - Welcome message and client info
  - List of submitted requests (with status: open, in progress, resolved, etc.)
  - Button to submit a new request

### 1.3. Request Submission
- Create a form for submitting requests:
  - Type: Update, Bug, Enhancement (dropdown)
  - Title (short summary)
  - Description (detailed info)
  - Optional file attachment (screenshots, docs)
- Validate input with Zod + React Hook Form.
- On submit, save request to MongoDB via Prisma.
- Notify admin (email or dashboard notification).

### 1.4. Request Management (Admin)
- Admin dashboard to view, filter, and update request statuses.
- Option to comment/respond to client requests.
- Email notifications for status changes or admin replies.

### 1.5. Security & Privacy
- Only authenticated clients can view/submit their own requests.
- Admins can view all requests.
- All sensitive data handled via environment variables.

---

## 2. Floating CTA: Free Consultation for Visitors

### 2.1. UI/UX
- Floating button (bottom-right) visible to all visitors (except logged-in clients).
- Modern, attractive design (shadcn/ui + Tailwind CSS, with icon/animation).
- Button text: "Free Consultation" (localized).

### 2.2. Consultation Modal
- On click, open a modal with a short form:
  - Name
  - Email
  - Phone (optional)
  - Message (what do you need help with?)
- Validate input (Zod + React Hook Form).
- On submit, send data to backend (store in DB and/or send email notification).
- Show success/failure feedback to user.

### 2.3. Analytics & Tracking
- Track CTA clicks and submissions (for conversion analysis).

---

## 3. Internationalization
- All new UI and messages must support both Arabic and English (next-intl).
- RTL support for Arabic.

---

## 4. Next Steps
- Review and discuss this plan.
- Approve or suggest changes.
- Once approved, implement features in prioritized order (CTA or client portal first). 