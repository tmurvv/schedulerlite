import { Navigate, Route, Routes } from "react-router-dom";

import {
  AddTimesheetPage,
  HomePage,
  ProfilePage,
  ViewTimesheetsPage,
} from "./pages";
import { Header, NavBar } from "./components";

export const App = () => (
  <>
    <Header />
    <NavBar />

    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/timesheets" element={<ViewTimesheetsPage />} />
      <Route path="/timesheets/new" element={<AddTimesheetPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </>
);
