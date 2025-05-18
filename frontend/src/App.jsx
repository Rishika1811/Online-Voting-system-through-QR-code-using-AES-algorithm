// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import UserDetails from "./pages/UserDetails";
import VotingScreen from "./pages/VotingScreen";
import ResultScreen from "./pages/ResultScreen";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/details/:token" element={<UserDetails />} />
        <Route
          path="/vote/:voterId"
          element={
            <ProtectedRoute>
              <VotingScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/results"
          element={
            <ProtectedRoute>
              <ResultScreen />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
