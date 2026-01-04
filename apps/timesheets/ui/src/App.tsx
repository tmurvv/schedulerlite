// src/App.tsx
import { Navigate, Route, Routes } from "react-router-dom";

import { HomePage } from "./pages/HomePage";
import { TimesheetPage } from "./pages/TimesheetPage";

export const App = () => (
  <Routes>
    <Route path="/home" element={<HomePage />} />
    <Route path="/timesheets/new" element={<TimesheetPage />} />
    <Route path="*" element={<Navigate to="/home" replace />} />
  </Routes>
);
