import { ThemeProvider } from "@/components/theme-provider";
import NavBar from "@/features/navbar/NavBar";
import LandingPage from "@/features/landing-page/LandingPage";
import BusinessList from "@/features/businesses/business-list/BusinessList";
import SingleBusiness from "@/features/businesses/single-business/SingleBusiness";
import { Route, Routes } from "react-router-dom";
import AuthForm from "@/features/auth/AuthForm";
import { useLocation } from "react-router-dom";
import ProfilePage from "@/features/profile-page/ProfilePage";
import ReviewForm from "@/features/reviews/ReviewForm";
import { useSelector } from "react-redux";

import { useState } from "react";

const App = () => {
  const { pathname } = useLocation();
  const TOKEN = useSelector((state) => state.auth.token);
  const USER_ID = useSelector((state) => state.auth.userId);

  const BASE_URL = "https://api-business-review-site.onrender.com/api";

  const [isEditReview, setIsEditReview] = useState(false);

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      {/* Hide navbar in auth */}
      {pathname !== "/login" && pathname !== "/register" && (
        <NavBar TOKEN={TOKEN} />
      )}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/businesses/:categoryName"
          element={<BusinessList BASE_URL={BASE_URL} />}
        />
        <Route
          path="/business/:name/:id"
          element={
            <SingleBusiness
              TOKEN={TOKEN}
              USER_ID={USER_ID}
              setIsEditReview={setIsEditReview}
            />
          }
        />
        {/* google better way to do the below location pathname?*/}
        <Route path="/login" element={<AuthForm />} />
        <Route path="/register" element={<AuthForm />} />
        <Route path="/profile" element={<ProfilePage TOKEN={TOKEN} />} />
        <Route
          path={`/business/:name/${!isEditReview ? "createreview/:businessId" : "editreview/:reviewId"}`}
          element={
            <ReviewForm
              TOKEN={TOKEN}
              isEdit={isEditReview}
              setIsEditReview={setIsEditReview}
            />
          }
        />
        {/* Add 404 route for "/*"" */}
      </Routes>
    </ThemeProvider>
  );
};

export default App;
