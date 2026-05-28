import { Routes, Route, BrowserRouter } from "react-router-dom";
import LoginCard from "./LoginCard";
import RegisterCard from "./Register";
import Dashboard from "./Dashboard";
import ProtectedRoutes from "./Routes/Protectedroutes";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginCard />} />
        <Route path="/signup" element={<RegisterCard />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoutes>
              <Dashboard />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;