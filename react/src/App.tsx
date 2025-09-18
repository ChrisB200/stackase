import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { FormStoreProvider } from "./contexts/FormStoreContext";
import Home from "./pages/Home/Home";
import Signup from "./pages/Signup/Signup";
import Verify from "./pages/Verify/Verify";
import Login from "./pages/Login/Login";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import NotFound from "./pages/NotFound/NotFound";
import CompleteSignup from "./pages/CompleteSignup/CompleteSignup";
import { UserProvider } from "./contexts/UserContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthCallback from "./pages/AuthCallback/AuthCallback";

function App() {
  return (
    <UserProvider>
      <ThemeProvider defaultTheme="light" storageKey="ui-theme">
        <FormStoreProvider>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/onboarding" element={<CompleteSignup />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </FormStoreProvider>
      </ThemeProvider>
    </UserProvider>
  );
}

export default App;
