import { ThemeProvider } from "@/components/theme-provider";
import HomePage from "@/features/HomePage";
import NavBar from "@/features/navbar/NavBar";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";

const App = () => {
  /* categoryId will be set in SearchCategories component,
   used to filter and render businesses */
  const [category, setCategory] = useState("");
  console.log(category);

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <NavBar setCategory={setCategory} />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        {/* Add 404 route for "/*"" */}
      </Routes>
    </ThemeProvider>
  );
};

export default App;
