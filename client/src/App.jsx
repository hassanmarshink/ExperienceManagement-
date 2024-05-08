import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Homepage from "./pages/HomePage";
import ProtectedRoute from "./pages/ProtectedRoute";
import { SurveyCreatorWidget } from "./components/SurveyCreator";
import SendSurveyForm from "./components/SendSurveyForm";
import FormDisplayAdmin from "./components/FormDisplayAdmin";
// import PdfGenerator from "./components/PdfGenerator";
import AnalyzeDisplayAdmin from "./components/AnalyzeDisplayAdmin";
import Login from "./pages/Login";
import User from "./components/User";
import FormDisplayViaEmail from "./components/FormDisplayViaEmail";
import PageNotFound from "./pages/PageNotFound";
import PageNav from "./pages/PageNav";
import React from "react";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}

function AppContent() {
  const navigate = useNavigate();
  const { isAuthenticated, surveyForms, error } = useAuth();
  const location = useLocation(); // Get current location

  const showPageNav = !location.pathname.startsWith("/take-survey");

  return (
    <>
      {showPageNav && isAuthenticated && <PageNav />}

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/create-survey"
          element={
            <ProtectedRoute>
              <SurveyCreatorWidget />
            </ProtectedRoute>
          }
        />
        <Route
          path="/send-survey"
          element={
            <ProtectedRoute>
              <SendSurveyForm surveyForms={surveyForms} error={error} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/display-survey-forms"
          element={
            <ProtectedRoute>
              <FormDisplayAdmin surveyForms={surveyForms} error={error} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/analyze-survey"
          element={
            <ProtectedRoute>
              <AnalyzeDisplayAdmin surveyForms={surveyForms} error={error} />
            </ProtectedRoute>
          }
        />
        <Route path="/logout" element={<User />} />
        <Route path="/login" element={<Login />} />
        <Route path="/take-survey" element={<FormDisplayViaEmail />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
