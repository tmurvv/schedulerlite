// src/App.tsx
import { Navigate, Route, Routes } from "react-router-dom";

import { LoginPage } from "./pages/LoginPage";
import { TimesheetPage } from "./pages/TimesheetPage";

export const App = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/timesheets/new" element={<TimesheetPage />} />
    <Route path="*" element={<Navigate to="/login" replace />} />
  </Routes>
);
