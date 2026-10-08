import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import GeneralLedger from "./GeneralLedger";
import BalanceSheet from "./BalanceSheet";

import "./GeneralLedger.css";
import "./BalanceSheet.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Navigate to="/general-ledger" replace />}
        />

        <Route
          path="/general-ledger"
          element={<GeneralLedger />}
        />

        <Route
          path="/balance-sheet"
          element={<BalanceSheet />}
        />

        <Route
          path="*"
          element={<Navigate to="/general-ledger" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;