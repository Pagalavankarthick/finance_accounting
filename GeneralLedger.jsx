import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./GeneralLedger.css";

const ledgerData = [
  {
    date: "01 Oct 2026",
    account: "Cash Account",
    description: "Opening Balance",
    reference: "OB-001",
    debit: null,
    credit: null,
    balance: 1825000,
  },
  {
    date: "02 Oct 2026",
    account: "Sales Revenue",
    description: "Product Sales",
    reference: "INV-1042",
    debit: null,
    credit: 250000,
    balance: 2075000,
  },
  {
    date: "03 Oct 2026",
    account: "Office Supplies",
    description: "Stationery Purchase",
    reference: "BILL-208",
    debit: 18500,
    credit: null,
    balance: 2056500,
  },
  {
    date: "05 Oct 2026",
    account: "Accounts Receivable",
    description: "Customer Payment",
    reference: "RCPT-331",
    debit: null,
    credit: 125000,
    balance: 2181500,
  },
  {
    date: "08 Oct 2026",
    account: "Rent Expense",
    description: "Office Rent",
    reference: "JE-109",
    debit: 75000,
    credit: null,
    balance: 2106500,
  },
  {
    date: "10 Oct 2026",
    account: "Sales Revenue",
    description: "Product Sales",
    reference: "INV-1068",
    debit: null,
    credit: 180000,
    balance: 2286500,
  },
  {
    date: "12 Oct 2026",
    account: "Utilities Expense",
    description: "Electricity Bill",
    reference: "BILL-221",
    debit: 24500,
    credit: null,
    balance: 2262000,
  },
  {
    date: "15 Oct 2026",
    account: "Accounts Payable",
    description: "Vendor Payment",
    reference: "PAY-452",
    debit: 92000,
    credit: null,
    balance: 2170000,
  },
];

const formatCurrency = (value) => {
  if (value === null || value === undefined) return "—";

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
};

function Icon({ children }) {
  return <span className="icon">{children}</span>;
}

export default function GeneralLedger() {
  const [search, setSearch] = useState("");
  const [account, setAccount] = useState("All Accounts");
  const [accountType, setAccountType] = useState("All Types");

  const filteredData = ledgerData.filter((item) => {
    const matchesSearch =
      item.account.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase()) ||
      item.reference.toLowerCase().includes(search.toLowerCase());

    const matchesAccount =
      account === "All Accounts" || item.account === account;

    return matchesSearch && matchesAccount;
  });

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="logo">
          <div className="logo-mark">A</div>
          <span>Accounting</span>
        </div>

        <nav className="navigation">
          <NavItem icon="▣" label="Bills" />
          <NavItem icon="↻" label="Recurring Bills" />
          <NavItem icon="↗" label="Payments Made" />
          <NavItem icon="↩" label="Vendor Credits" />

          <div className="nav-heading">ACCOUNTING</div>

          <NavItem icon="▤" label="Chart of Accounts" />
          <NavItem icon="☷" label="Journal Entries" />

          <NavItem
            icon="▥"
            label="General Ledger"
            active
            path="/general-ledger"
          />

          <NavItem icon="▦" label="Trial Balance" />
          <NavItem icon="⌁" label="Profit & Loss" />
          <NavItem
            icon="▤"
            label="Balance Sheet"
            path="/balance-sheet"
          />

          <div className="nav-heading">BANKING & TAX</div>

          <NavItem icon="▣" label="Banking" />
          <NavItem icon="%" label="Taxation" />
          <NavItem icon="▥" label="Budgeting" />

          <div className="nav-heading">REPORTS</div>

          <NavItem icon="▤" label="Financial Reports" />
        </nav>
      </aside>
      <main className="main-content">
        <header className="topbar">
          <div className="search-box">
            <span>⌕</span>

            <input
              placeholder="Search transactions, accounts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <kbd>Ctrl K</kbd>
          </div>

          <div className="top-actions">
            <button className="top-icon">◔</button>

            <button className="top-icon notification">
              ♢
              <span></span>
            </button>

            <div className="profile">
              <div className="avatar">P</div>

              <div>
                <strong>Pagalavan</strong>
                <small>Administrator</small>
              </div>

              <span>⌄</span>
            </div>
          </div>
        </header>

        <div className="page-container">
          {/* Page heading */}
          <div className="page-header">
            <div>
              <h1>General Ledger</h1>

              <p>
                Review account activity, journal entries, and running
                balances.
              </p>
            </div>

            <div className="header-buttons">
              <button className="btn secondary">
                ↓ Export
              </button>

              <button className="btn primary">
                + Add Journal Entry
              </button>
            </div>
          </div>

          <section className="summary-grid">
            <SummaryCard
              title="Total Debits"
              value="₹42,85,000"
              change="+8.4%"
              positive
            />

            <SummaryCard
              title="Total Credits"
              value="₹39,70,000"
              change="+5.2%"
              positive
            />

            <SummaryCard
              title="Opening Balance"
              value="₹18,25,000"
              subtitle="As of 01 Oct 2026"
            />

            <SummaryCard
              title="Closing Balance"
              value="₹21,40,000"
              subtitle="As of 31 Oct 2026"
            />
          </section>
          <section className="ledger-card">
            <div className="ledger-header">
              <div>
                <h2>General Ledger Overview</h2>

                <p>
                  Manage and review all account transactions.
                </p>
              </div>

              <div className="ledger-actions">
                <button className="outline-btn">
                  ⚙ Filter
                </button>

                <button className="outline-btn">
                  ↓ Export
                </button>
              </div>
            </div>

            <div className="filters">
              <div className="filter-field">
                <label>Financial Year</label>

                <select>
                  <option>2026 - 2027</option>
                  <option>2025 - 2026</option>
                  <option>2024 - 2025</option>
                </select>
              </div>

              <div className="filter-field">
                <label>Period</label>

                <select>
                  <option>October 2026</option>
                  <option>September 2026</option>
                  <option>August 2026</option>
                </select>
              </div>

              <div className="filter-field">
                <label>Account</label>

                <select
                  value={account}
                  onChange={(e) => setAccount(e.target.value)}
                >
                  <option>All Accounts</option>
                  <option>Cash Account</option>
                  <option>Sales Revenue</option>
                  <option>Office Supplies</option>
                  <option>Accounts Receivable</option>
                  <option>Rent Expense</option>
                  <option>Utilities Expense</option>
                  <option>Accounts Payable</option>
                </select>
              </div>

              <div className="filter-field">
                <label>Account Type</label>

                <select
                  value={accountType}
                  onChange={(e) =>
                    setAccountType(e.target.value)
                  }
                >
                  <option>All Types</option>
                  <option>Assets</option>
                  <option>Liabilities</option>
                  <option>Equity</option>
                  <option>Revenue</option>
                  <option>Expenses</option>
                </select>
              </div>
            </div>
            <div className="filter-row">
              <div className="date-filter">
                <label>Date Range</label>

                <div className="date-input">
                  <span>▣</span>

                  <input
                    type="date"
                    defaultValue="2026-10-01"
                  />

                  <span>→</span>

                  <input
                    type="date"
                    defaultValue="2026-10-31"
                  />
                </div>
              </div>

              <div className="transaction-search">
                <label>Search Transactions</label>

                <div className="search-input">
                  <span>⌕</span>

                  <input
                    placeholder="Search by account, description or reference..."
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                  />
                </div>
              </div>

              <button
                className="reset-btn"
                onClick={() => {
                  setSearch("");
                  setAccount("All Accounts");
                  setAccountType("All Types");
                }}
              >
                Reset
              </button>

              <button className="apply-btn">
                Apply Filters
              </button>
            </div>
            <div className="ledger-status">
              <div className="balance-status">
                <span className="status-dot"></span>
                Books are balanced
              </div>

              <div className="transaction-count">
                {filteredData.length} of 248 transactions
              </div>
            </div>
            <div className="table-wrapper">
              <table className="ledger-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Account</th>
                    <th>Description</th>
                    <th>Reference</th>
                    <th className="amount">Debit</th>
                    <th className="amount">Credit</th>
                    <th className="amount">Balance</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredData.length > 0 ? (
                    filteredData.map((item, index) => (
                      <tr key={index}>
                        <td className="date-cell">
                          {item.date}
                        </td>

                        <td>
                          <button className="account-link">
                            {item.account}
                          </button>
                        </td>

                        <td>
                          <div className="description">
                            {item.description}
                          </div>
                        </td>

                        <td>
                          <span className="reference">
                            {item.reference}
                          </span>
                        </td>

                        <td className="amount debit">
                          {formatCurrency(item.debit)}
                        </td>

                        <td className="amount credit">
                          {formatCurrency(item.credit)}
                        </td>

                        <td className="amount balance">
                          {formatCurrency(item.balance)}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7">
                        <div className="empty-state">
                          <div className="empty-icon">
                            ▤
                          </div>

                          <h3>
                            No ledger transactions found
                          </h3>

                          <p>
                            There are no transactions matching
                            your selected filters.
                          </p>

                          <button className="btn primary">
                            + Add Journal Entry
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="table-footer">
              <div className="showing">
                Showing <strong>1–8</strong> of{" "}
                <strong>248</strong> transactions
              </div>

              <div className="pagination">
                <button disabled>‹</button>

                <button className="active">1</button>

                <button>2</button>
                <button>3</button>
                <button>4</button>
                <button>5</button>

                <span>...</span>

                <button>25</button>

                <button>›</button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
function NavItem({
  icon,
  label,
  active = false,
  path,
}) {
  const navigate = useNavigate();

  const handleNavigation = () => {
    if (path) {
      navigate(path);
    }
  };

  return (
    <div
      className={`nav-item ${active ? "active" : ""}`}
      onClick={handleNavigation}
      style={{
        cursor: path ? "pointer" : "default",
      }}
    >
      <span className="nav-icon">{icon}</span>
      <span>{label}</span>
    </div>
  );
}

function SummaryCard({
  title,
  value,
  change,
  positive,
  subtitle,
}) {
  return (
    <div className="summary-card">
      <div className="summary-title">
        {title}
      </div>

      <div className="summary-value">
        {value}
      </div>

      {change && (
        <div
          className={`summary-change ${
            positive ? "positive" : ""
          }`}
        >
          ↑ {change}

          <span>
            from previous period
          </span>
        </div>
      )}

      {subtitle && (
        <div className="summary-subtitle">
          {subtitle}
        </div>
      )}
    </div>
  );
}