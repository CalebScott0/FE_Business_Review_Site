import { ModeToggle } from "@/components/ModeToggle";
import { Separator } from "@/components/ui/separator";
import { NavLink, useNavigate } from "react-router-dom";
import SearchCategories from "./SearchCategories";
const NavBar = () => {
  return (
    <div>
      <ModeToggle />
      <SearchCategories />
      <Separator />
    </div>
  );
};
export default NavBar;
