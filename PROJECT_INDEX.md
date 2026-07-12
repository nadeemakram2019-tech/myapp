# Paysetra Spend & Expense Management App - Project Index

This document provides a comprehensive structural index of the **Paysetra** Spend and Expense Management application. It catalogs the technology stack, application routing layout, feature modules, state management signals, styling tokens, and mock data models.

---

## 1. Technical Stack & Ecosystem

The application is built as a single-page SaaS interface with the following technologies:

*   **Core Framework:** [Angular 21](https://angular.dev/) using standalone components, signals-based state management, and declarative router configurations.
*   **UI Component Library:** [PrimeNG 21](https://primeng.org/) for highly styled drawer panels (`p-drawer`), buttons (`p-button`), and input fields.
*   **Styling Engine:** [Tailwind CSS v4](https://tailwindcss.com/) with custom configuration properties defined in the global stylesheet.
*   **Icon Library:** [Lucide Angular](https://lucide.dev/) for dynamic corporate SVG icons.
*   **Quality Assurance:** [Vitest](https://vitest.dev/) for unit testing, and [Playwright](https://playwright.dev/) for end-to-end testing.

---

## 2. Global Styling & Design Tokens

Styling rules conform to the Paysetra brand guidelines outlined in [DESIGN.md](file:///c:/Users/Nadeem%20Akram/Desktop/myapp/DESIGN.md). The application implements theme toggle switches syncing light and dark states through the root `<html>` element class list and `localStorage`.

### Color Theme Tokens
Mapped in [styles.css](file:///c:/Users/Nadeem%20Akram/Desktop/myapp/src/styles.css):

| CSS Custom Variable | Light Mode (HSL) | Dark Mode (HSL) | Component Mapping |
| :--- | :--- | :--- | :--- |
| `--background` | `0, 0%, 100%` | `0, 0%, 3.9%` | Primary background canvas |
| `--foreground` | `0, 0%, 3.9%` | `0, 0%, 98%` | Primary text and headings |
| `--card` | `0, 0%, 100%` | `0, 0%, 3.9%` | Card backgrounds, lists container panels |
| `--primary` | `0, 0%, 9%` | `0, 0%, 98%` | Primary buttons & core interactions |
| `--accent` | `221.2, 83.2%, 53.3%` | `217.2, 91.2%, 59.8%` | Paysetra Corporate Blue accents |
| `--border` | `0, 0%, 89.8%` | `0, 0%, 14.9%` | Containers, inputs, and list borders |
| `--input` | `0, 0%, 89.8%` | `0, 0%, 14.9%` | Unfocused form fields |
| `--ring` | `221.2, 83.2%, 53.3%` | `217.2, 91.2%, 59.8%` | Keyboard focus outline highlights |
| `--destructive` | `0, 84.2%, 60.2%` | `0, 62.8%, 30.6%` | Errors, warnings, and delete actions |

### Visual Utilities
*   **Tactile Cards (`.card-tactile`):** Implements smooth animations (`transition-all duration-200`) and slight elevation on hover (`hover:-translate-y-0.5 hover:border-accent shadow-sm`).
*   **Theme Transitions (`.transition-theme`):** Controls transitions (`0.3s ease`) on color variables when toggling Dark/Light mode.
*   **Typography:** Sans-serif font stack for copy, labels, and text fields; Monospace stack (`font-mono`) for invoice numbers, numeric tags, currencies, and IDs.

---

## 3. Core Shell & Routing Structure

The main shell layout is defined in the root component files:
*   [app.ts](file:///c:/Users/Nadeem%20Akram/Desktop/myapp/src/app/app.ts): Controls sidebar expand/collapse, manages dark/light mode toggle states using Angular signals (`darkMode` and `sidebarCollapsed`), and persists selection in `localStorage`.
*   [app.html](file:///c:/Users/Nadeem%20Akram/Desktop/myapp/src/app/app.html): Render structure containing the fixed vertical left sidebar navigation and the flexible main routing outlet content area.
*   [app.routes.ts](file:///c:/Users/Nadeem%20Akram/Desktop/myapp/src/app/app.routes.ts): Catalogs all lazy-loaded routes inside the application.

### Route Catalog Mapping

| Path Route | Target Component | File Location | Status / Sidebar Link |
| :--- | :--- | :--- | :--- |
| `/` | Redirects to `/planner` | - | - |
| `/planner` | `PlannerPageComponent` | [planner-page.component.ts](file:///c:/Users/Nadeem%20Akram/Desktop/myapp/src/app/planner/planner-page.component.ts) | Active |
| `/datastream` | `DatastreamComponent` | [datastream.component.ts](file:///c:/Users/Nadeem%20Akram/Desktop/myapp/src/app/datastream/datastream.component.ts) | Active |
| `/dashboard` | `DashboardComponent` | [dashboard.component.ts](file:///c:/Users/Nadeem%20Akram/Desktop/myapp/src/app/dashboard/dashboard.component.ts) | Active |
| `/reconciliation/card-transactions` | `CardTransactionsComponent` | [card-transactions.component.ts](file:///c:/Users/Nadeem%20Akram/Desktop/myapp/src/app/reconciliation/card-transactions.component.ts) | Active |
| `/tasks` | `TasksComponent` | [tasks.component.ts](file:///c:/Users/Nadeem%20Akram/Desktop/myapp/src/app/tasks/tasks.component.ts) | Active |
| `/bills` | `BillsComponent` | [bills.component.ts](file:///c:/Users/Nadeem%20Akram/Desktop/myapp/src/app/bills/bills.component.ts) | Active |
| `/purchase-orders` | `PurchaseOrdersComponent` | [purchase-orders.component.ts](file:///c:/Users/Nadeem%20Akram/Desktop/myapp/src/app/purchase-orders/purchase-orders.component.ts) | Active |
| `/payment-links` | `PaymentLinksComponent` | [payment-links.component.ts](file:///c:/Users/Nadeem%20Akram/Desktop/myapp/src/app/payment-links/payment-links.component.ts) | Active |
| `/intellicapture` | `IntelliCaptureComponent` | [intelli-capture.component.ts](file:///c:/Users/Nadeem%20Akram/Desktop/myapp/src/app/intelli-capture/intelli-capture.component.ts) | Active |
| `/approval-delegations` | `ApprovalDelegationsComponent` | [approval-delegations.component.ts](file:///c:/Users/Nadeem%20Akram/Desktop/myapp/src/app/approval-delegations/approval-delegations.component.ts) | Active |
| `/employees` | `EmployeesComponent` | [employees.component.ts](file:///c:/Users/Nadeem%20Akram/Desktop/myapp/src/app/employees/employees.component.ts) | Active |
| *No Mapped Route* | `VendorsComponent` | [vendors.component.ts](file:///c:/Users/Nadeem%20Akram/Desktop/myapp/src/app/vendors/vendors.component.ts) | Coming Soon (Disabled Link) |
| *No Mapped Route* | `ExpensesComponent` | [expenses.component.ts](file:///c:/Users/Nadeem%20Akram/Desktop/myapp/src/app/expenses/expenses.component.ts) | Coming Soon (Disabled Link) |
| *No Mapped Route* | `ReportsComponent` | [reports.component.ts](file:///c:/Users/Nadeem%20Akram/Desktop/myapp/src/app/reports.component.ts) | Hidden (Unlinked) |

---

## 4. Feature Component Directory

### 4.1 Planner (`/planner`)
An AI-driven project brief planner designed to generate boilerplate application models based on text prompts.
*   **Store:** [planner-store.service.ts](file:///c:/Users/Nadeem%20Akram/Desktop/myapp/src/app/planner/planner-store.service.ts) manages brief generation status, drafts, execution flows, and copied signals.
*   **Components:**
    *   [PlannerPageComponent](file:///c:/Users/Nadeem%20Akram/Desktop/myapp/src/app/planner/planner-page.component.ts): Main interface that shows instructions, draft examples, generated schemas, and an interactive graph layout.
    *   [ListEditorComponent](file:///c:/Users/Nadeem%20Akram/Desktop/myapp/src/app/planner/list-editor.component.ts): Custom helper component for reviewing and modifying list items.
*   **Key States & computed values:** `graphNodes` determines coordinate plots on an SVG layout mapping schemas and entity relationships.
*   **Mock Services:** [mock-planner-ai.service.ts](file:///c:/Users/Nadeem%20Akram/Desktop/myapp/src/app/planner/mock-planner-ai.service.ts) generates structure suggestions representing typical micro-SaaS database models.

### 4.2 Data Stream (`/datastream`)
A transaction tracking screen that lists incoming batches of file uploads (CSV, PDF, XLSX).
*   **Component:** [DatastreamComponent](file:///c:/Users/Nadeem%20Akram/Desktop/myapp/src/app/datastream/datastream.component.ts)
*   **State & Functions:**
    *   `activeTab` ('pending' | 'completed')
    *   `searchQuery` and `selectedDataType` filters.
    *   `filteredBatches` computes listing data matching search bounds.
*   **Data Model:** `DataBatch` containing file sizes, uploadedBy user tag, extraction status (pending, processing, completed, failed), and error record counts.

### 4.3 Dashboard (`/dashboard`)
The central landing screen displaying cashflows, aging accounts receivable, debtor matrices, and team activities.
*   **Component:** [DashboardComponent](file:///c:/Users/Nadeem%20Akram/Desktop/myapp/src/app/dashboard/dashboard.component.ts)
*   **Key UI Sections:**
    *   *A/R Aging Analysis:* Shows outstanding categories (Current, 1-30, 31-60, etc.) with custom colored meter bars.
    *   *Top Paid Customers:* Quick summary of payments made by top clients.
    *   *Projected Receipts:* Switchable target forecasting boxes.
    *   *Team Activity Feed:* Paginated list of team member creation and communication logs.
*   **States:** Paginated array calculations (`paginatedActivities`, `selectedActivityPage`, `pageSize`).

### 4.4 Reconciliation (`/reconciliation/card-transactions`)
A financial card ledger summary for viewing payment channel transactions, deposits, chargebacks, and billing.
*   **Component:** [CardTransactionsComponent](file:///c:/Users/Nadeem%20Akram/Desktop/myapp/src/app/reconciliation/card-transactions.component.ts)
*   **Data Models:** Mappings for payment methods (Mastercard, Visa, Amex), monthly refunds, deposits, and billing amounts.
*   **Interactions:** Sub-tab controls (`Summary`, `Transactions`, `Deposits`, `Billing`, `Chargebacks`) and custom view toggle alerts.

### 4.5 Tasks (`/tasks`)
A task board matching follow-ups, dispute resolution queues, and tax auditing actions.
*   **Component:** [TasksComponent](file:///c:/Users/Nadeem%20Akram/Desktop/myapp/src/app/tasks/tasks.component.ts)
*   **Key States (Signals):**
    *   `activeTab` (e.g. My Tasks, In Progress, Overdue, Cadence Queue, Upcoming, Completed)
    *   `searchQuery`, `currentPage`, `activeDropdown`, `activeStatusDropdown`
*   **Computed Values:**
    *   `filteredTasks` maps status conditions and query parameters.
    *   `paginatedTasks` limits active results based on the current page.

### 4.6 Bills (`/bills`)
Accounts payable portal facilitating bill overview, disputes, and manual ledger additions.
*   **Components:**
    *   [BillsComponent](file:///c:/Users/Nadeem%20Akram/Desktop/myapp/src/app/bills/bills.component.ts): Manages parent modal states (`isAddBillModalOpen`, `isDisputeModalOpen`, `isViewBillModalOpen`).
    *   [AddBillComponent](file:///c:/Users/Nadeem%20Akram/Desktop/myapp/src/app/bills/add-bill.component.ts): Interactive modal component providing vendor selection and amount validation.
    *   [ViewBillComponent](file:///c:/Users/Nadeem%20Akram/Desktop/myapp/src/app/bills/view-bill.component.ts): Full detailed breakdown drawer showing payments details and approval pathways.
    *   [DisputeBillComponent](file:///c:/Users/Nadeem%20Akram/Desktop/myapp/src/app/bills/dispute-bill/dispute-bill.component.ts): Text dialogue to register reasons for payment holds.
    *   [GlDistributionComponent](file:///c:/Users/Nadeem%20Akram/Desktop/myapp/src/app/bills/gl-distribution.component.ts): Table matching bill lines with corresponding General Ledger chart of accounts.

### 4.7 Purchase Orders (`/purchase-orders`)
Management directory showing official corporate procurement records.
*   **Component:** [PurchaseOrdersComponent](file:///c:/Users/Nadeem%20Akram/Desktop/myapp/src/app/purchase-orders/purchase-orders.component.ts)
*   **UI Features:** Tab filters (Open, Draft, Completed), search utilities, and custom inline pagination layout controls.

### 4.8 Payment Links (`/payment-links`)
A package-based invoicing engine supporting direct client checkouts.
*   **Component:** [PaymentLinksComponent](file:///c:/Users/Nadeem%20Akram/Desktop/myapp/src/app/payment-links/payment-links.component.ts)
*   **Interactions:** Copy-to-clipboard actions (notifies user with visual "Copied" tag), and a 3-step setup modal for generating custom packages.

### 4.9 Intelli Capture (`/intellicapture`)
An intelligent document ingestion and OCR extraction dashboard for processing bills.
*   **Component:** [IntelliCaptureComponent](file:///c:/Users/Nadeem%20Akram/Desktop/myapp/src/app/intelli-capture/intelli-capture.component.ts)
*   **Features:**
    *   *Verification Drawer:* Uses PrimeNG Drawer to inspect extracted text fields, confidence scores, and line items.
    *   *Confidence Scoring & Validation:* Compiles confidence levels, highlights low scores, and allows direct field modification.
    *   *Upload Simulation:* Mock file uploads that dynamically push new document models to the dashboard queue.

### 4.10 Approval Delegations (`/approval-delegations`)
A portal for managing incoming spend approvals and configuring back-up delegatees.
*   **Component:** [ApprovalDelegationsComponent](file:///c:/Users/Nadeem%20Akram/Desktop/myapp/src/app/approval-delegations/approval-delegations.component.ts)
*   **Features:**
    *   *Delegations Scheduler:* Custom forms to schedule employee backups during absences.
    *   *Dynamic Status Calculator:* Computes statuses (`Active`, `Scheduled`, `Expired`) relative to start/end ranges against the system clock.
    *   *Detail Inspector Drawer:* PrimeNG sidebar showing request items, timeline audits, approval actions, or rejection text flows.

### 4.11 Employees (`/employees`)
A simple company staff member directory.
*   **Component:** [EmployeesComponent](file:///c:/Users/Nadeem%20Akram/Desktop/myapp/src/app/employees/employees.component.ts)
*   **States:** `searchQuery` and `filteredEmployees` matching department, name, or role.

### 4.12 Vendors (Coming Soon)
A ledger mapping third-party business partners, featuring sync integration indicators for QuickBooks Online (QBO).
*   **Component:** [VendorsComponent](file:///c:/Users/Nadeem%20Akram/Desktop/myapp/src/app/vendors/vendors.component.ts)
*   **Mock State:** Tracking sync statuses (`synced`, `syncing`, `error`) and verification flags.

### 4.13 Reports Component (Hidden)
A data grid facilitating group-by groupings.
*   **Component:** [ReportsComponent](file:///c:/Users/Nadeem%20Akram/Desktop/myapp/src/app/reports.component.ts)
*   **Features:** Allows grouping dataset arrays dynamically by Vendor, Category, or Status; supports collapsible group headers and subtotal summations.

---

## 5. Status Badge Specifications

The application uses standard color indicator bands to visually denote state transitions:

*   **Approved / Success:** Emerald Green (`bg-emerald-50 text-emerald-700 border-emerald-200`)
*   **Pending / Needs Attention:** Amber/Yellow (`bg-amber-50 text-amber-700 border-amber-200`)
*   **Rejected / Failure / Error:** Rose/Red (`bg-rose-50 text-rose-700 border-rose-200`)
*   **Paid / Active / Information:** Blue (`bg-blue-50 text-blue-700 border-blue-200`)
