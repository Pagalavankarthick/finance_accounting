import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BalanceSheet.css";

const balanceSheetData = {
  currentAssets: [
    {
      account: "Cash & Cash Equivalents",
      current: 4250000,
      previous: 3820000,
    },
    {
      account: "Accounts Receivable",
      current: 6850000,
      previous: 6240000,
    },
    {
      account: "Inventory",
      current: 4250000,
      previous: 3910000,
    },
    {
      account: "Short-term Investments",
      current: 1750000,
      previous: 1500000,
    },
  ],

  fixedAssets: [
    {
      account: "Property & Equipment",
      current: 9800000,
      previous: 9100000,
    },
    {
      account: "Accumulated Depreciation",
      current: -1850000,
      previous: -1620000,
    },
    {
      account: "Vehicles",
      current: 3250000,
      previous: 2900000,
    },
  ],

  currentLiabilities: [
    {
      account: "Accounts Payable",
      current: 4850000,
      previous: 4210000,
    },
    {
      account: "Short-term Loans",
      current: 2250000,
      previous: 1800000,
    },
    {
      account: "Accrued Expenses",
      current: 1250000,
      previous: 1080000,
    },
    {
      account: "Tax Payable",
      current: 850000,
      previous: 720000,
    },
  ],

  longTermLiabilities: [
    {
      account: "Long-term Bank Loan",
      current: 6750000,
      previous: 6100000,
    },
    {
      account: "Lease Liabilities",
      current: 1850000,
      previous: 1720000,
    },
  ],

  equity: [
    {
      account: "Share Capital",
      current: 7500000,
      previous: 7500000,
    },
    {
      account: "Retained Earnings",
      current: 13750000,
      previous: 11950000,
    },
  ],
};

const formatCurrency = (value) => {
  if (value === null || value === undefined) {
    return "—";
  }

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
};

const calculateTotal = (items) => {
  return items.reduce((total, item) => total + item.current, 0);
};

const calculatePreviousTotal = (items) => {
  return items.reduce((total, item) => total + item.previous, 0);
};
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
  positive = true,
  icon,
}) {
  return (
    <div className="summary-card">
      <div className="summary-top">
        <span className="summary-title">
          {title}
        </span>

        <span className="summary-icon">
          {icon}
        </span>
      </div>

      <div className="summary-value">
        {value}
      </div>

      <div
        className={`summary-change ${
          positive ? "positive" : "negative"
        }`}
      >
        {positive ? "↑" : "↓"} {change}

        <span>
          {" "}
          vs previous period
        </span>
      </div>
    </div>
  );
}

function Section({
  title,
  subtitle,
  items,
  totalLabel,
}) {
  const currentTotal = calculateTotal(items);

  const previousTotal =
    calculatePreviousTotal(items);

  const percentageChange =
    previousTotal === 0
      ? 0
      : ((currentTotal - previousTotal) /
          previousTotal) *
        100;

  return (
    <div className="statement-section">

      <div className="section-heading">
        <div>
          <h3>{title}</h3>

          <p>{subtitle}</p>
        </div>

        <span className="section-total">
          {formatCurrency(currentTotal)}
        </span>
      </div>
      <div className="section-table">

        {items.map((item, index) => (
          <div
            className="statement-row"
            key={index}
          >

            <div className="account-name">
              <span className="account-dot"></span>

              {item.account}
            </div>

            <div className="previous-value">
              {formatCurrency(item.previous)}
            </div>

            <div className="current-value">
              {formatCurrency(item.current)}
            </div>

            <div
              className={
                percentageChange >= 0
                  ? "change-value positive"
                  : "change-value negative"
              }
            >
              {percentageChange >= 0
                ? "+"
                : ""}

              {percentageChange.toFixed(1)}%
            </div>

          </div>
        ))}
        <div className="section-total-row">

          <strong>
            {totalLabel}
          </strong>

          <span>
            {formatCurrency(previousTotal)}
          </span>

          <strong>
            {formatCurrency(currentTotal)}
          </strong>

          <span>
            {percentageChange >= 0
              ? "+"
              : ""}

            {percentageChange.toFixed(1)}%
          </span>

        </div>

      </div>
    </div>
  );
}

export default function BalanceSheet() {
  const [period, setPeriod] =
    useState("October 2026");

  const [search, setSearch] =
    useState("");

  const currentAssets =
    calculateTotal(
      balanceSheetData.currentAssets
    ) +
    calculateTotal(
      balanceSheetData.fixedAssets
    );

  const previousAssets =
    calculatePreviousTotal(
      balanceSheetData.currentAssets
    ) +
    calculatePreviousTotal(
      balanceSheetData.fixedAssets
    );

  const currentLiabilities =
    calculateTotal(
      balanceSheetData.currentLiabilities
    ) +
    calculateTotal(
      balanceSheetData.longTermLiabilities
    );

  const previousLiabilities =
    calculatePreviousTotal(
      balanceSheetData.currentLiabilities
    ) +
    calculatePreviousTotal(
      balanceSheetData.longTermLiabilities
    );

  const currentEquity =
    calculateTotal(
      balanceSheetData.equity
    );

  const previousEquity =
    calculatePreviousTotal(
      balanceSheetData.equity
    );

  const totalLiabilitiesEquity =
    currentLiabilities +
    currentEquity;

  const isBalanced =
    Math.round(currentAssets) ===
    Math.round(totalLiabilitiesEquity);

  const assetChange =
    previousAssets === 0
      ? 0
      : ((currentAssets - previousAssets) /
          previousAssets) *
        100;

  const liabilityChange =
    previousLiabilities === 0
      ? 0
      : ((currentLiabilities -
          previousLiabilities) /
          previousLiabilities) *
        100;

  const equityChange =
    previousEquity === 0
      ? 0
      : ((currentEquity - previousEquity) /
          previousEquity) *
        100;

  return (
    <div className="balance-app">
      <aside className="balance-sidebar">

        {/* Logo */}
        <div className="balance-logo">

          <div className="balance-logo-mark">
            A
          </div>

          <span>
            Accounting
          </span>

        </div>
        <nav className="balance-navigation">

          <NavItem
            icon="▣"
            label="Bills"
          />

          <NavItem
            icon="↻"
            label="Recurring Bills"
          />

          <NavItem
            icon="↗"
            label="Payments Made"
          />

          <NavItem
            icon="↩"
            label="Vendor Credits"
          />

          <div className="balance-nav-heading">
            ACCOUNTING
          </div>

          <NavItem
            icon="▤"
            label="Chart of Accounts"
          />

          <NavItem
            icon="☷"
            label="Journal Entries"
          />
          <NavItem
            icon="▥"
            label="General Ledger"
            path="/general-ledger"
          />

          <NavItem
            icon="▦"
            label="Trial Balance"
          />

          <NavItem
            icon="⌁"
            label="Profit & Loss"
          />
          <NavItem
            icon="▤"
            label="Balance Sheet"
            path="/balance-sheet"
            active={true}
          />

          <div className="balance-nav-heading">
            BANKING & TAX
          </div>

          <NavItem
            icon="▣"
            label="Banking"
          />

          <NavItem
            icon="%"
            label="Taxation"
          />

          <NavItem
            icon="▥"
            label="Budgeting"
          />

          <div className="balance-nav-heading">
            REPORTS
          </div>

          <NavItem
            icon="▤"
            label="Financial Reports"
          />

        </nav>
      </aside>

      <main className="balance-main">
        <header className="balance-topbar">

          <div className="balance-search">

            <span>⌕</span>

            <input
              type="text"
              placeholder="Search transactions, accounts..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

            <kbd>
              Ctrl K
            </kbd>

          </div>

          <div className="balance-top-actions">

            <button className="balance-top-icon">
              ◔
            </button>

            <button className="balance-top-icon notification">
              ♢
              <span></span>
            </button>

            <div className="balance-profile">

              <div className="balance-avatar">
                G
              </div>

              <div>
                <strong>
                  Pagalavan
                </strong>

                <small>
                  Administrator
                </small>
              </div>

              <span>
                ⌄
              </span>

            </div>

          </div>

        </header>

        <div className="balance-page">


          <div className="balance-page-header">

            <div>

              <h1>
                Balance Sheet
              </h1>

              <p>
                View your company's assets,
                liabilities, and equity at a glance.
              </p>

            </div>

            <div className="balance-header-actions">

              <button className="balance-secondary-btn">
                ↓ Export
              </button>

              <button className="balance-primary-btn">
                + Add Adjustment
              </button>

            </div>

          </div>
          <section className="balance-summary-grid">

            <SummaryCard
              title="Total Assets"
              value={formatCurrency(
                currentAssets
              )}
              change={`${assetChange.toFixed(
                1
              )}%`}
              positive={assetChange >= 0}
              icon="◆"
            />

            <SummaryCard
              title="Total Liabilities"
              value={formatCurrency(
                currentLiabilities
              )}
              change={`${liabilityChange.toFixed(
                1
              )}%`}
              positive={
                liabilityChange >= 0
              }
              icon="▰"
            />

            <SummaryCard
              title="Total Equity"
              value={formatCurrency(
                currentEquity
              )}
              change={`${equityChange.toFixed(
                1
              )}%`}
              positive={equityChange >= 0}
              icon="◈"
            />

            <SummaryCard
              title="Net Worth"
              value={formatCurrency(
                currentEquity
              )}
              change="Strong"
              positive={true}
              icon="✓"
            />

          </section>
          <section className="balance-card">

            {/* Card Header */}

            <div className="balance-card-header">

              <div>

                <h2>
                  Balance Sheet Overview
                </h2>

                <p>
                  Financial position as of{" "}
                  <strong>
                    31 October 2026
                  </strong>
                </p>

              </div>

              <div className="balance-card-actions">

                <button className="balance-outline-btn">
                  ⚙ Filter
                </button>

                <button className="balance-outline-btn">
                  ↓ Export
                </button>

              </div>

            </div>

            <div className="balance-filters">

              <div className="balance-filter-field">

                <label>
                  Financial Year
                </label>

                <select>
                  <option>
                    2026 - 2027
                  </option>

                  <option>
                    2025 - 2026
                  </option>

                  <option>
                    2024 - 2025
                  </option>
                </select>

              </div>

              <div className="balance-filter-field">

                <label>
                  Reporting Period
                </label>

                <select
                  value={period}
                  onChange={(e) =>
                    setPeriod(e.target.value)
                  }
                >

                  <option>
                    October 2026
                  </option>

                  <option>
                    September 2026
                  </option>

                  <option>
                    August 2026
                  </option>

                  <option>
                    July 2026
                  </option>

                </select>

              </div>

              <div className="balance-filter-field">

                <label>
                  Currency
                </label>

                <select>

                  <option>
                    INR (₹)
                  </option>

                  <option>
                    USD ($)
                  </option>

                </select>

              </div>

              <div className="balance-filter-field">

                <label>
                  Comparison
                </label>

                <select>

                  <option>
                    Previous Period
                  </option>

                  <option>
                    Previous Year
                  </option>

                  <option>
                    None
                  </option>

                </select>

              </div>

            </div>

            <div
              className={`balance-status ${
                isBalanced
                  ? "balanced"
                  : "not-balanced"
              }`}
            >

              <div className="status-left">

                <span className="status-circle">
                  {isBalanced ? "✓" : "!"}
                </span>

                <div>

                  <strong>
                    {isBalanced
                      ? "Balance Sheet is balanced"
                      : "Balance Sheet is not balanced"}
                  </strong>

                  <small>
                    Assets = Liabilities + Equity
                  </small>

                </div>

              </div>

              <div className="status-equation">

                {formatCurrency(
                  currentAssets
                )}

                <span>=</span>

                {formatCurrency(
                  currentLiabilities
                )}

                <span>+</span>

                {formatCurrency(
                  currentEquity
                )}

              </div>

            </div>
            <div className="statement-column-header">

              <div>
                Account
              </div>

              <div>
                Previous Period
              </div>

              <div>
                Current Period
              </div>

              <div>
                Change
              </div>

            </div>
            <div className="major-section">

              <div className="major-section-title">

                <div>

                  <span className="major-icon assets">
                    ◆
                  </span>

                  <div>

                    <h2>
                      Assets
                    </h2>

                    <p>
                      Resources owned by the business
                    </p>

                  </div>

                </div>

                <strong>
                  {formatCurrency(
                    currentAssets
                  )}
                </strong>

              </div>

              <Section
                title="Current Assets"
                subtitle="Assets expected to be converted to cash within one year"
                items={
                  balanceSheetData.currentAssets
                }
                totalLabel="Total Current Assets"
              />

              <Section
                title="Fixed Assets"
                subtitle="Long-term assets used in business operations"
                items={
                  balanceSheetData.fixedAssets
                }
                totalLabel="Total Fixed Assets"
              />

              <div className="major-total assets-total">

                <strong>
                  Total Assets
                </strong>

                <span>
                  {formatCurrency(
                    previousAssets
                  )}
                </span>

                <strong>
                  {formatCurrency(
                    currentAssets
                  )}
                </strong>

                <span className="positive">
                  {assetChange >= 0
                    ? "+"
                    : ""}

                  {assetChange.toFixed(1)}%
                </span>

              </div>

            </div>
            <div className="major-section">

              <div className="major-section-title">

                <div>

                  <span className="major-icon liabilities">
                    ▰
                  </span>

                  <div>

                    <h2>
                      Liabilities
                    </h2>

                    <p>
                      Obligations owed by the business
                    </p>

                  </div>

                </div>

                <strong>
                  {formatCurrency(
                    currentLiabilities
                  )}
                </strong>

              </div>

              <Section
                title="Current Liabilities"
                subtitle="Obligations due within one year"
                items={
                  balanceSheetData.currentLiabilities
                }
                totalLabel="Total Current Liabilities"
              />

              <Section
                title="Long-term Liabilities"
                subtitle="Obligations due after one year"
                items={
                  balanceSheetData.longTermLiabilities
                }
                totalLabel="Total Long-term Liabilities"
              />

              <div className="major-total liability-total">

                <strong>
                  Total Liabilities
                </strong>

                <span>
                  {formatCurrency(
                    previousLiabilities
                  )}
                </span>

                <strong>
                  {formatCurrency(
                    currentLiabilities
                  )}
                </strong>

                <span>
                  {liabilityChange >= 0
                    ? "+"
                    : ""}

                  {liabilityChange.toFixed(1)}%
                </span>

              </div>

            </div>
            <div className="major-section">

              <div className="major-section-title">

                <div>

                  <span className="major-icon equity">
                    ◈
                  </span>

                  <div>

                    <h2>
                      Equity
                    </h2>

                    <p>
                      Owner's interest in the business
                    </p>

                  </div>

                </div>

                <strong>
                  {formatCurrency(
                    currentEquity
                  )}
                </strong>

              </div>

              <Section
                title="Shareholders' Equity"
                subtitle="Capital contributed and retained earnings"
                items={
                  balanceSheetData.equity
                }
                totalLabel="Total Equity"
              />

              <div className="major-total equity-total">

                <strong>
                  Total Equity
                </strong>

                <span>
                  {formatCurrency(
                    previousEquity
                  )}
                </span>

                <strong>
                  {formatCurrency(
                    currentEquity
                  )}
                </strong>

                <span className="positive">
                  {equityChange >= 0
                    ? "+"
                    : ""}

                  {equityChange.toFixed(1)}%
                </span>

              </div>

            </div>
            <div className="final-equation">

              <div className="equation-title">

                <span className="equation-icon">
                  ✓
                </span>

                <div>

                  <strong>
                    Accounting Equation
                  </strong>

                  <small>
                    Total Assets must equal
                    Total Liabilities + Equity
                  </small>

                </div>

              </div>

              <div className="equation-values">

                <strong>
                  {formatCurrency(
                    currentAssets
                  )}
                </strong>

                <span>=</span>

                <strong>
                  {formatCurrency(
                    currentLiabilities
                  )}
                </strong>

                <span>+</span>

                <strong>
                  {formatCurrency(
                    currentEquity
                  )}
                </strong>

              </div>

            </div>
            <div className="balance-footer">

              <span>
                Last updated: 05 Oct 2026
              </span>

              <span>
                Financial Year:{" "}
                <strong>
                  2026 - 2027
                </strong>
              </span>

            </div>

          </section>

        </div>

      </main>

    </div>
  );
}