import { ThemeProvider } from "@/components/theme-provider";
import NavBar from "@/features/navbar/NavBar";
import HomePage from "@/features/HomePage";
import BusinessList from "@/features/businesses/BusinessList";
import SingleBusiness from "@/features/businesses/SingleBusiness";
import { Route, Routes } from "react-router-dom";
import AuthForm from "@/features/auth/AuthForm";
import { useLocation } from "react-router-dom";
import ProfilePage from "@/features/ProfilePage";
import ReviewForm from "@/features/reviews/ReviewForm";
import { useSelector } from "react-redux";

const App = () => {
  const location = useLocation();
  const TOKEN = useSelector((state) => state.auth.token);
  const USERID = useSelector((state) => state.auth.userId);

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      {/* Hide navbar in auth */}
      {location.pathname !== "/login" && location.pathname !== "/register" && (
        <NavBar TOKEN={TOKEN} />
      )}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/businesses/:category" element={<BusinessList />} />
        <Route
          path="/business/:name/:id"
          element={<SingleBusiness TOKEN={TOKEN} USERID={USERID} />}
        />
        {/* google better way to do the below location pathname?*/}
        <Route path="/login" element={<AuthForm location={location} />} />
        <Route path="/register" element={<AuthForm location={location} />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route
          path="/business/:businessName/createreview/:businessId"
          element={<ReviewForm TOKEN={TOKEN} />}
        />
        {/* Add 404 route for "/*"" */}
      </Routes>
    </ThemeProvider>
  );
};

export default App;
