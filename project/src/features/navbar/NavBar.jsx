import { ModeToggle } from "@/components/ModeToggle";
import { Separator } from "@/components/ui/separator";
import { NavLink, useNavigate } from "react-router-dom";
import { useGetCategoriesQuery } from "./categoryslice";
import SearchCategories from "./SearchCategories";
const NavBar = () => {
  const { data = {}, error, isLoading } = useGetCategoriesQuery();
  let categoryArr;
  if (data) {
    categoryArr = data.categories;
  }
  return (
    <div>
      <ModeToggle />
      <SearchCategories categories={categoryArr} />
      <Separator />
    </div>
  );
};
export default NavBar;
