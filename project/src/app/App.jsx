import { ThemeProvider } from "@/components/theme-provider";
import HomePage from "@/features/HomePage";
import NavBar from "@/features/navbar/NavBar";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        {/* Add 404 route for "/*"" */}
      </Routes>
    </ThemeProvider>
  );
};

export default App;
