import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import Notes from "./components/Notes/Notes";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          isAuthenticated ? <Navigate to="/notes" /> : <Navigate to="/login" />
        } />
        <Route path="/login" element={
          isAuthenticated ? <Navigate to="/notes" /> : <LoginPage />
        } />
        <Route path="/notes" element={
          <ProtectedRoute>
            <Notes />
          </ProtectedRoute>
        } />
        <Route path="/signup" element={
          isAuthenticated ? <Navigate to="/notes" /> : <SignUpPage />
        } />
      </Routes>
    </Router>
  );
}

export default App;