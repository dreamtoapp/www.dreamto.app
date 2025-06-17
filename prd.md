# 🧠 Cursor Pro AI Instructions

These instructions are tailored for a solo developer using:
- Next.js (App Router, Server Components)
- MongoDB + Prisma
- Tailwind CSS + shadcn/ui
- Zod + React Hook Form
- Zustand for state
- next-intl (Arabic & English)
- Highest performance, full SEO
- TypeScript only (no any/unknown)
- Clean code, simple structure, no complexity

---

## 📁 Project Structure Rules

- Each route lives in its own folder: `app/[route]/`
  - `components/` → route-specific components
  - `actions/` → server actions
  - `helpers/` → hooks, utils
  - `loading.tsx` → always included, use shadcn skeleton
  - `page.tsx` → always use server components unless needed otherwise
- Feature-based folder structure
- All reusable components/hooks go under `components/ui/` or `lib/hooks/`

---

## 🧾 Coding Conventions

- ✅ TypeScript only, 100% type-safe (no `any`, `unknown`)
- ✅ camelCase for variables
- ✅ PascalCase for files, functions, components
- ✅ Short but meaningful comments
- ✅ Use SOLID principles — readable, maintainable, scalable
- ✅ Always prefer simple & clean over clever or complex

---

## 🌍 Localization

- Use `next-intl` for multilingual support (Arabic & English)
- Default language = Arabic
- File structure under `/messages/` with `ar.json` and `en.json`
- Support RTL with Tailwind (`dir="rtl"` via `html` element)

---

## 🔐 Authentication

- Use `NextAuth.js`
- Protect routes using server actions + middleware if needed
- Get user session with helper: `getServerSessionUser()`

---

## ⚡ Performance & SEO

- Always use semantic HTML
- Add meta tags in layout with dynamic metadata
- Optimize images (next/image, lazy loading)
- Responsive-first design (Tailwind)
- Highest PageSpeed score is priority

---

## 📦 Components & Forms

- Use `shadcn/ui` for all UI elements
- Use `react-hook-form` with `zod` for validation
- Prefer server components + server actions for forms

---

## 📚 Official Documentation & Best Practices

Cursor AI should follow the **latest official documentation** and **best practices** from the following sources:

- 🔗 [Next.js Documentation](https://nextjs.org/docs) — App Router, Server Components, Metadata, SEO, Performance
- 🔗 [React Docs (Beta)](https://react.dev/) — Hooks, Server/Client components, Concurrent rendering
- 🔗 [Prisma Docs](https://www.prisma.io/docs) — MongoDB setup, relationships, and type-safety
- 🔗 [Tailwind CSS Docs](https://tailwindcss.com/docs) — Responsive-first styling, RTL support
- 🔗 [shadcn/ui Docs](https://ui.shadcn.com/docs) — Best practices for modern UI components
- 🔗 [Zod Docs](https://zod.dev/) — Schema validation and type inference
- 🔗 [React Hook Form Docs](https://react-hook-form.com/) — Form performance, validation, accessibility
- 🔗 [NextAuth Docs](https://next-auth.js.org/) — Secure and scalable authentication
- 🔗 [next-intl Docs](https://next-intl-docs.vercel.app/) — Multilingual support for App Router with RTL handling

---

## 🧠 AI Helper Instructions

AI should:
- Write full components when asked
- Suggest best practices (clean code, SOLID)
- Refactor when code grows large or repetitive
- Name functions clearly and semantically
- Always write minimal, readable code (no bloat)