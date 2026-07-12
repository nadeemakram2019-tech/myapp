# Design System - Paysetra

This project is a Spend and Expense Management application styled after the **Paysetra** brand (https://paysetra.ai/). It uses a clean, modern, and professional SaaS layout that supports adaptive light and dark modes with a blue-centric visual accent.

---

## Stack

- **Framework:** Angular 21 (Standalone components, signals-based state, router)
- **Component Library:** PrimeNG 21 (Custom-themed components like inputs, buttons, tables)
- **Styling:** Tailwind CSS v4 (Via `@import "tailwindcss"` in `src/styles.css` and PostCSS configuration)
- **Icons:** Lucide Angular (Lucide icons integration for Angular templates)
- **Fonts:** Clean UI sans-serif font stack for general interface elements, and UI monospace for technical codes, item IDs, and currency tags.
- **Dark mode:** Class-based dark mode (`.dark`) toggled on the main `html` or `body` element.

---

## Visual Direction

The app represents a professional SaaS workspace for accounts receivable, bill processing, and expense management.

- **Adaptive Lighting:** Designed to transition smoothly between a clean light theme and a dark theme.
- **Base Aesthetics:** Use soft gray/zinc borders and backgrounds with clear visual hierarchies. No flashy gradients or highly saturated neon accents.
- **Accent Theme:** Standardize primary interactive states, buttons, links, and selection focus highlights on a vibrant corporate **Blue**.
- **Tactile Elements:** Soft rounded corners (`rounded-xl` to `rounded-2xl`), faint shadows, subtle border highlights on hover, and explicit focus rings for accessibility.

---

## Tokens (Shadcn & Tailwind v4 Custom Properties)

These semantic design tokens are mapped in the `:root` and `.dark` selectors of the theme configuration:

| Token | Light Mode (HEX / Value) | Dark Mode (HEX / Value) | Usage |
| --- | --- | --- | --- |
| `background` | `0 0% 100%` (`#ffffff`) | `0 0% 3.9%` (`#0a0a0a`) | Main viewport canvas background |
| `foreground` | `0 0% 3.9%` (`#0a0a0a`) | `0 0% 98%` (`#fafafa`) | Primary body text and titles |
| `card` | `0 0% 100%` (`#ffffff`) | `0 0% 3.9%` (`#0a0a0a`) | Card panels, containers, and cards list |
| `primary` | `0 0% 9%` (`#171717`) | `0 0% 98%` (`#fafafa`) | Primary buttons and key focus actions |
| `accent` | `221.2 83.2% 53.3%` (`#2563eb`) | `217.2 91.2% 59.8%` (`#3b82f6`) | Paysetra Blue theme accents / highlights |
| `muted` | `0 0% 96.1%` (`#f4f4f5`) | `0 0% 14.9%` (`#27272a`) | Inactive states, disabled input fills |
| `muted-foreground` | `0 0% 45.1%` (`#737373`) | `0 0% 63.9%` (`#a3a3a3`) | Supporting text, subtitles, table headers |
| `border` | `0 0% 89.8%` (`#e4e4e7`) | `0 0% 14.9%` (`#27272a`) | Borders for inputs, tables, dividers, cards |
| `input` | `0 0% 89.8%` (`#e4e4e7`) | `0 0% 14.9%` (`#27272a`) | Unfocused text fields and borders |
| `ring` | `221.2 83.2% 53.3%` (`#2563eb`) | `217.2 91.2% 59.8%` (`#3b82f6`) | Focus indicators on fields and buttons |
| `destructive` | `0 84.2% 60.2%` (`#ef4444`) | `0 62.8% 30.6%` (`#7f1d1d`) | Errors, alerts, danger states, deletes |

---

## Typography

| Style Class | Font Stack | Usage |
| --- | --- | --- |
| **System Sans-serif** | `ui-sans-serif, system-ui, sans-serif` | General copy, labels, inputs, table cells, headers |
| **System Monospace** | `ui-monospace, SFMono-Regular, monospace` | Invoice IDs, currency values, numeric data, badge text |

### Guidelines:
- **Headers:** Page titles should use a strong semibold or bold weight (`font-bold` or `font-extrabold`) with tight tracking (`tracking-tight`) to project authority and structure.
- **Body Copy:** Keep sizes standard (e.g. `text-sm` or `text-base`) to ensure clean readability under multiple devices.
- **ID & Tags:** Use monospace fonts for invoice IDs and amounts (e.g. `font-mono`) to keep digits aligned and easily scannable.

---

## Key Components & UI Elements

### 1. Sidebar Navigation
- Vertical navigation layout with a fixed width of `18rem` (`w-72`) on desktop.
- Translucent backdrop blurred sidebar in dark mode (`bg-[#0b1324]/90` + `backdrop-blur-xl`).
- Highlighting active links with a subtle blue tint (e.g. `bg-blue-300/10 text-blue-600 border-blue-200/40` or equivalent gray transitions).

### 2. Main Page Panels
- Flex columns utilizing full viewport space, with a light gray/slate base (`bg-gray-50/50`) or near-black base.
- Sticky or fixed-top action headers containing the view title, supporting summary, and button triggers.

### 3. Buttons
- **Primary Actions:** Solid colored buttons using Paysetra Blue (`bg-blue-600 hover:bg-blue-700 text-white`) with rounded edges (`rounded-xl` or `rounded-2xl`).
- **Secondary Actions:** White or gray outline buttons (`border-gray-200 text-gray-700 hover:bg-gray-50 bg-white`).

### 4. Status Badges
Status indicators use soft-tinted pill layouts to display workflow states:
- **Approved / Success:** Green color family (`bg-emerald-50 text-emerald-700 border-emerald-200` in light).
- **Pending / Action Needed:** Amber/Yellow color family (`bg-amber-50 text-amber-700 border-amber-200`).
- **Rejected / Error:** Red color family (`bg-rose-50 text-rose-700 border-rose-200`).
- **Reimbursed / Paid / Info:** Blue color family (`bg-blue-50 text-blue-700 border-blue-200`).

### 5. Lists & Data Tables
- Clean container lists showing items (bills, expenses, vendors).
- Each list card represents an entity with a thick left-accent line reflecting its workflow status.
- Soft border lines separating content blocks (`border-gray-100` / `border-gray-200`).

---

## Layout Grid
The layout adjusts gracefully to varying screens:
- Desktop utilizes a split layout: `app-shell` with a sticky left sidebar and a flexible right-hand workspace.
- Mobile screens automatically collapse the sidebar to allow a vertical single-column view with responsive toggle navigation elements.

---

## Interactions & Accessibility
- **Hover Transitions:** Smooth transitions (`transition-all duration-300`) with minor transformations (`hover:-translate-y-0.5`) on primary cards/buttons.
- **Focus Rings:** Explicit focus indicator ring (`focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500`) to guarantee accessibility for keyboard users.
- **Visual Indicators:** Explicit text labels and status icons (like checkmarks or warning symbols) alongside colored statuses to support color-blind accessibility.
