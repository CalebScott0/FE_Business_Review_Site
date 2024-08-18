import { ModeToggle } from "@/components/ModeToggle";
import { Separator } from "@/components/ui/separator";
import { NavLink, useNavigate } from "react-router-dom";
import SearchCategories from "./SearchCategories";
import CategoryMenu from "./CategoryMenu";
const NavBar = ({ setCategory }) => {
  // request location in browser, return latitute/longitude
  // https://developers.google.com/maps/documentation/javascript/geolocation#maps_map_geolocation-javascript
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      console.log(pos);
    });
  } else {
    // show message that browser does not support Geolocation
    // Location will have to be entered manually in search box
  }
  return (
    <div>
      <ModeToggle />
      <SearchCategories setCategory={setCategory} /> OR
      <Separator />
      <div className="ml-96">
        <CategoryMenu />
      </div>
    </div>
  );
};
export default NavBar;
