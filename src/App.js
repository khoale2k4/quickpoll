import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register"; // ✅ Import Register page
import Dashboard from "./pages/Dashboard";
import Setup from "./pages/Setup";
import Intergration from "./pages/Intergration";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> {/* ✅ Add Register Route */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register/setup" element={<Setup />} />
        <Route path="/register/intergration" element={<Intergration />} />
      </Routes>
    </Router>
  );
}

export default App;
