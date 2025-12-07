import { Route, Routes, useParams } from "react-router-dom";
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
import UserStacks from "./pages/UserStacks/UserStacks";
import StackShowcase from "./pages/StackShowcase/StackShowcase";
import { Toaster } from "sonner";
import StackCreation from "./pages/StackCreation/StackCreation";
import { UploadProvider } from "./contexts/UploadContext";

function App() {
  return (
    <UserProvider>
      <ThemeProvider defaultTheme="system" storageKey="ui-theme">
        <FormStoreProvider>
          <Toaster toastOptions={{ duration: 1000 }} />
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="/:username/stacks" element={<UserStacks />} />
            <Route path="/:username/:stackTitle" element={<StackShowcase />} />
            <Route path="/" element={<Home />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/onboarding" element={<CompleteSignup />} />
              <Route
                path="/upload"
                element={
                  <UploadProvider>
                    <StackCreation />
                  </UploadProvider>
                }
              />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </FormStoreProvider>
      </ThemeProvider>
    </UserProvider>
  );
}

export default App;
