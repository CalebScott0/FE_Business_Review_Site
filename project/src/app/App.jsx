import { ThemeProvider } from "@/components/theme-provider";
import NavBar from "@/features/navbar/NavBar";
import HomePage from "@/features/HomePage";
import BusinessList from "@/features/businesses/BusinessList";
import { Route, Routes } from "react-router-dom";

const App = () => {
  /* categoryIwill be set in SearchCategories component,
   used to filter and render businesses */

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/businesses/:category" element={<BusinessList />} />
        {/* Add 404 route for "/*"" */}
      </Routes>
    </ThemeProvider>
  );
};

export default App;
