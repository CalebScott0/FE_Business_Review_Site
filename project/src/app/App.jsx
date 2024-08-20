import { ThemeProvider } from "@/components/theme-provider";
import NavBar from "@/features/navbar/NavBar";
import HomePage from "@/features/HomePage";
import Businesses from "@/features/businesses/Businesses";
import { Route, Routes } from "react-router-dom";

const App = () => {
  /* categoryId will be set in SearchCategories component,
   used to filter and render businesses */

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <NavBar category={category} setCategory={setCategory} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/businesses/:category" element={<Businesses />} />
        {/* Add 404 route for "/*"" */}
      </Routes>
    </ThemeProvider>
  );
};

export default App;
