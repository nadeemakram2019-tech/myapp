-- ============================================================
-- AR Accounts - Supabase Migration Script
-- Run this in Supabase SQL Editor
-- ============================================================

-- 1. CUSTOMERS TABLE
CREATE TABLE IF NOT EXISTS customers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  location TEXT,
  website TEXT,
  avatar TEXT,
  status TEXT CHECK (status IN ('Active', 'Inactive')) DEFAULT 'Active',
  type TEXT CHECK (type IN ('Business', 'Individual')) DEFAULT 'Business',
  currency TEXT DEFAULT 'USD',
  added_date DATE DEFAULT CURRENT_DATE,
  total_spent DECIMAL(12,2) DEFAULT 0,
  invoices_count INTEGER DEFAULT 0,
  last_activity TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. INVOICES TABLE
CREATE TABLE IF NOT EXISTS invoices (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  invoice_id TEXT UNIQUE NOT NULL,
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  customer_name TEXT NOT NULL,
  customer_avatar TEXT,
  amount DECIMAL(12,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  status TEXT CHECK (status IN ('Paid', 'Pending', 'Overdue', 'Draft', 'Cancelled')) DEFAULT 'Draft',
  issued_date DATE DEFAULT CURRENT_DATE,
  due_date DATE NOT NULL,
  paid_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. INVOICE LINE ITEMS
CREATE TABLE IF NOT EXISTS invoice_line_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  invoice_id UUID REFERENCES invoices(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  quantity INTEGER DEFAULT 1,
  unit_price DECIMAL(12,2) DEFAULT 0,
  amount DECIMAL(12,2) DEFAULT 0
);

-- 4. INVOICE PAYMENTS
CREATE TABLE IF NOT EXISTS invoice_payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  invoice_id UUID REFERENCES invoices(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  method TEXT NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  reference TEXT,
  status TEXT DEFAULT 'Cleared'
);

-- 5. CREDIT NOTES TABLE
CREATE TABLE IF NOT EXISTS credit_notes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  credit_note_id TEXT UNIQUE NOT NULL,
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  customer_name TEXT NOT NULL,
  customer_avatar TEXT,
  amount DECIMAL(12,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  reason TEXT,
  status TEXT CHECK (status IN ('Issued', 'Applied', 'Expired', 'Draft')) DEFAULT 'Draft',
  invoice_ref TEXT,
  issued_date DATE DEFAULT CURRENT_DATE,
  applied_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. SCHEDULED PAYMENTS TABLE
CREATE TABLE IF NOT EXISTS scheduled_payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  schedule_id TEXT UNIQUE NOT NULL,
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  customer_name TEXT NOT NULL,
  customer_avatar TEXT,
  amount DECIMAL(12,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  schedule_date DATE NOT NULL,
  payment_method TEXT NOT NULL,
  status TEXT CHECK (status IN ('Scheduled', 'Processing', 'Completed', 'Cancelled')) DEFAULT 'Scheduled',
  recurring TEXT CHECK (recurring IN ('None', 'Weekly', 'Monthly', 'Quarterly')) DEFAULT 'None',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. VENDORS TABLE
CREATE TABLE IF NOT EXISTS vendors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  vendor_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  location TEXT,
  website TEXT,
  avatar TEXT,
  status TEXT CHECK (status IN ('Active', 'Inactive')) DEFAULT 'Active',
  type TEXT CHECK (type IN ('Business', 'Individual')) DEFAULT 'Business',
  currency TEXT DEFAULT 'CAD',
  added_date DATE DEFAULT CURRENT_DATE,
  verification_status TEXT,
  qbo_status TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoice_line_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoice_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE credit_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE scheduled_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (for development)
CREATE POLICY "Enable all for authenticated users" ON customers FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all for authenticated users" ON invoices FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all for authenticated users" ON invoice_line_items FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all for authenticated users" ON invoice_payments FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all for authenticated users" ON credit_notes FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all for authenticated users" ON scheduled_payments FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all for authenticated users" ON vendors FOR ALL USING (true) WITH CHECK (true);

-- 8. EXPENSES TABLE
CREATE TABLE IF NOT EXISTS expenses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  expense_id TEXT UNIQUE NOT NULL,
  employee_name TEXT NOT NULL,
  employee_avatar TEXT,
  employee_initials TEXT,
  employee_color TEXT,
  category TEXT NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  date DATE NOT NULL,
  status TEXT CHECK (status IN ('Pending', 'Approved', 'Rejected', 'Reimbursed')) DEFAULT 'Pending',
  description TEXT,
  receipt BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. PAYMENTS TABLE
CREATE TABLE IF NOT EXISTS payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  payment_id TEXT UNIQUE NOT NULL,
  vendor_name TEXT NOT NULL,
  vendor_logo TEXT,
  vendor_initials TEXT,
  vendor_color TEXT,
  amount DECIMAL(12,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  date DATE NOT NULL,
  method TEXT NOT NULL,
  status TEXT CHECK (status IN ('Completed', 'Pending', 'Failed', 'Processing')) DEFAULT 'Pending',
  reference TEXT,
  bill_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. EMPLOYEES TABLE
CREATE TABLE IF NOT EXISTS employees (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  initials TEXT,
  color TEXT,
  department TEXT NOT NULL,
  role TEXT NOT NULL,
  status TEXT CHECK (status IN ('Active', 'On Leave', 'Inactive')) DEFAULT 'Active',
  join_date DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. BILLS TABLE
CREATE TABLE IF NOT EXISTS bills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  bill_id TEXT UNIQUE NOT NULL,
  vendor_name TEXT NOT NULL,
  vendor_initials TEXT,
  vendor_color TEXT,
  date TEXT NOT NULL,
  due_date TEXT NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  status TEXT CHECK (status IN ('Pending Approval', 'Approved', 'Paid', 'Overdue')) DEFAULT 'Pending Approval',
  category TEXT DEFAULT 'Other',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. PURCHASE ORDERS TABLE
CREATE TABLE IF NOT EXISTS purchase_orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  po_id TEXT UNIQUE NOT NULL,
  po_number TEXT NOT NULL,
  vendor_name TEXT NOT NULL,
  created_date TEXT NOT NULL,
  approved_amount DECIMAL(12,2) DEFAULT 0,
  available_balance DECIMAL(12,2) DEFAULT 0,
  currency TEXT DEFAULT 'USD',
  status TEXT CHECK (status IN ('Open', 'Draft', 'Completed')) DEFAULT 'Draft',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. DOCUMENTS TABLE
CREATE TABLE IF NOT EXISTS documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  document_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  size TEXT,
  uploaded_by TEXT NOT NULL,
  uploaded_date DATE DEFAULT CURRENT_DATE,
  status TEXT CHECK (status IN ('Approved', 'Pending', 'Rejected', 'Draft')) DEFAULT 'Pending',
  folder TEXT DEFAULT 'General',
  file_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. PAYMENT LINKS TABLE
CREATE TABLE IF NOT EXISTS payment_links (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  link_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  package_name TEXT,
  created_date DATE DEFAULT CURRENT_DATE,
  expiry_date DATE NOT NULL,
  total_amount TEXT,
  total_subtext TEXT,
  checkouts INTEGER DEFAULT 0,
  status TEXT CHECK (status IN ('Active', 'Draft', '')) DEFAULT 'Active',
  url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 15. APPROVAL DELEGATIONS TABLE
CREATE TABLE IF NOT EXISTS approval_delegations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  delegation_id TEXT UNIQUE NOT NULL,
  delegated_to_id TEXT,
  delegated_to_name TEXT NOT NULL,
  delegated_to_email TEXT,
  delegated_to_avatar TEXT,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status TEXT CHECK (status IN ('Active', 'Scheduled', 'Expired')) DEFAULT 'Active',
  reason TEXT,
  date_created DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 16. APPROVAL REQUESTS TABLE
CREATE TABLE IF NOT EXISTS approval_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  request_id TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  submitter_name TEXT NOT NULL,
  submitter_email TEXT,
  submitter_avatar TEXT,
  department TEXT NOT NULL,
  type TEXT CHECK (type IN ('Bill', 'Expense')) DEFAULT 'Bill',
  amount DECIMAL(12,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  submit_date DATE DEFAULT CURRENT_DATE,
  status TEXT CHECK (status IN ('Pending', 'Approved', 'Rejected')) DEFAULT 'Pending',
  description TEXT,
  rejection_reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 17. DATA BATCHES TABLE (Datastream)
CREATE TABLE IF NOT EXISTS data_batches (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  batch_number TEXT UNIQUE NOT NULL,
  file_name TEXT NOT NULL,
  uploaded_by TEXT NOT NULL,
  uploaded_at TIMESTAMPTZ DEFAULT NOW(),
  data_type TEXT NOT NULL,
  total_records INTEGER DEFAULT 0,
  valid_records INTEGER DEFAULT 0,
  error_records INTEGER DEFAULT 0,
  status TEXT CHECK (status IN ('pending', 'processing', 'completed', 'failed')) DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 18. INTELI CAPTURE DOCUMENTS TABLE
CREATE TABLE IF NOT EXISTS intelli_capture_docs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  doc_id TEXT UNIQUE NOT NULL,
  file_name TEXT NOT NULL,
  vendor_name TEXT,
  tax_id TEXT,
  address TEXT,
  invoice_date DATE,
  due_date DATE,
  invoice_number TEXT,
  amount DECIMAL(12,2) DEFAULT 0,
  currency TEXT DEFAULT 'USD',
  tax_amount DECIMAL(12,2) DEFAULT 0,
  subtotal DECIMAL(12,2) DEFAULT 0,
  extraction_status TEXT CHECK (extraction_status IN ('Succeeded', 'Processing', 'Needs Review', 'Failed', 'Duplicate')) DEFAULT 'Processing',
  confidence_score DECIMAL(5,2) DEFAULT 0,
  file_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 19. CARD TRANSACTIONS TABLE
CREATE TABLE IF NOT EXISTS card_transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  transaction_id TEXT UNIQUE NOT NULL,
  brand TEXT,
  amount DECIMAL(12,2) DEFAULT 0,
  currency TEXT DEFAULT 'USD',
  status TEXT,
  transaction_date DATE DEFAULT CURRENT_DATE,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for new tables
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE bills ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchase_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE approval_delegations ENABLE ROW LEVEL SECURITY;
ALTER TABLE approval_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE data_batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE intelli_capture_docs ENABLE ROW LEVEL SECURITY;
ALTER TABLE card_transactions ENABLE ROW LEVEL SECURITY;

-- Create policies for new tables
CREATE POLICY "Enable all for authenticated users" ON expenses FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all for authenticated users" ON payments FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all for authenticated users" ON employees FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all for authenticated users" ON bills FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all for authenticated users" ON purchase_orders FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all for authenticated users" ON documents FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all for authenticated users" ON payment_links FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all for authenticated users" ON approval_delegations FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all for authenticated users" ON approval_requests FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all for authenticated users" ON data_batches FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all for authenticated users" ON intelli_capture_docs FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all for authenticated users" ON card_transactions FOR ALL USING (true) WITH CHECK (true);

-- Insert sample data
INSERT INTO customers (customer_id, name, email, phone, location, website, avatar, status, type, currency, added_date, total_spent, invoices_count, last_activity) VALUES
('CUST-001', 'Acme Corporation', 'billing@acmecorp.com', '+1-555-0101', 'New York, NY, USA', 'https://acmecorp.com', 'https://avatar.vercel.sh/Acme%20Corporation.png', 'Active', 'Business', 'USD', '2025-01-15', 284500, 48, 'Today'),
('CUST-002', 'Northern Lights Retail', 'orders@northernlights.ca', '+1-555-0102', 'Toronto, ON, Canada', NULL, 'https://avatar.vercel.sh/Northern%20Lights%20Retail.png', 'Active', 'Business', 'CAD', '2025-02-03', 152300, 24, 'Yesterday'),
('CUST-003', 'Sarah Johnson', 'sarah.j@email.com', '+1-555-0103', 'Chicago, IL, USA', NULL, 'https://avatar.vercel.sh/Sarah%20Johnson.png', 'Active', 'Individual', 'USD', '2025-03-22', 8750, 6, '3 days ago'),
('CUST-004', 'Pacific Tech Solutions', 'billing@pacifictech.io', '+1-555-0104', 'San Francisco, CA, USA', 'https://pacifictech.io', 'https://avatar.vercel.sh/Pacific%20Tech%20Solutions.png', 'Active', 'Business', 'USD', '2025-04-10', 423000, 67, 'Yesterday');

-- Insert sample data for new tables
INSERT INTO vendors (vendor_id, name, email, phone, location, website, avatar, status, type, currency) VALUES
('VEND-001', 'TechCorp Solutions', 'billing@techcorp.com', '+1-555-0123', 'Toronto, ON, Canada', 'https://techcorp.com', 'https://avatar.vercel.sh/TechCorp%20Solutions.png', 'Active', 'Business', 'CAD'),
('VEND-002', 'Office Supplies Plus', 'orders@officesupplies.com', '+1-555-0124', 'Vancouver, BC, Canada', NULL, 'https://avatar.vercel.sh/Office%20Supplies%20Plus.png', 'Active', 'Business', 'CAD'),
('VEND-003', 'Marketing Pro', 'info@marketingpro.com', '+1-555-0125', 'Montreal, QC, Canada', NULL, 'https://avatar.vercel.sh/Marketing%20Pro.png', 'Active', 'Business', 'CAD'),
('VEND-004', 'IT Services Inc', 'billing@itservices.com', '+1-555-0126', 'Calgary, AB, Canada', NULL, 'https://avatar.vercel.sh/IT%20Services%20Inc.png', 'Active', 'Business', 'CAD');

INSERT INTO expenses (expense_id, employee_name, employee_initials, employee_color, category, amount, currency, date, status, description, receipt) VALUES
('EXP-001', 'John Smith', 'JS', 'blue', 'Travel', 1250.00, 'USD', '2024-01-15', 'Approved', 'Flight tickets for client meeting', TRUE),
('EXP-002', 'Sarah Johnson', 'SJ', 'purple', 'Meals', 85.50, 'USD', '2024-01-14', 'Reimbursed', 'Client dinner at Restaurant', TRUE),
('EXP-003', 'Mike Davis', 'MD', 'emerald', 'Office Supplies', 234.00, 'USD', '2024-01-16', 'Pending', 'Printer ink and paper', TRUE),
('EXP-004', 'Emily Chen', 'EC', 'orange', 'Software', 599.00, 'USD', '2024-01-13', 'Rejected', 'Software subscription - duplicate request', TRUE);

INSERT INTO employees (employee_id, name, email, initials, color, department, role, status, join_date) VALUES
('EMP-001', 'Alice Cooper', 'alice.c@paysetra.ai', 'AC', 'bg-emerald-100 text-emerald-700', 'Engineering', 'Senior Developer', 'Active', '2023-01-15'),
('EMP-002', 'Bob Smith', 'bob.s@paysetra.ai', 'BS', 'bg-blue-100 text-blue-700', 'Marketing', 'Marketing Manager', 'Active', '2023-03-22'),
('EMP-003', 'Charlie Davis', 'charlie.d@paysetra.ai', 'CD', 'bg-amber-100 text-amber-700', 'Sales', 'Account Executive', 'On Leave', '2022-11-05'),
('EMP-004', 'Diana Prince', 'diana.p@paysetra.ai', 'DP', 'bg-purple-100 text-purple-700', 'HR', 'HR Director', 'Active', '2021-08-10'),
('EMP-005', 'Evan Wright', 'evan.w@paysetra.ai', 'EW', 'bg-rose-100 text-rose-700', 'Engineering', 'DevOps Engineer', 'Inactive', '2022-05-18');
