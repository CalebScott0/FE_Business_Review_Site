import { ModeToggle } from "@/components/ModeToggle";
import { Separator } from "@/components/ui/separator";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import SearchCategories from "./SearchCategories";
import LogoutButton from "../auth/LogoutButton";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import AuthLinks from "./AuthLinks";
import { Search } from "lucide-react";

const NavBar = ({ TOKEN }) => {
  // category name set by category selection
  const [category, setCategory] = useState("");
  // value for category search box, reset on go button click
  const [value, setValue] = useState("");
  const { pathname } = useLocation();

  const navigate = useNavigate();
  // request location in browser, return latitute/longitude
  // https://developers.google.com/maps/documentation/javascript/geolocation#maps_map_geolocation-javascript
  // if (navigator.geolocation) {
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     const pos = {
  //       lat: position.coords.latitude,
  //       lng: position.coords.longitude,
  //     };
  //     console.log(pos);
  //   });
  // } else {
  // show message that browser does not support Geolocation/
  // if user does not allow location:
  // Location will have to be entered manually in search box!
  // REQUIRE THIS STEP BEFORE SEARCHING IS POSSIBLE TO FILTER SEARCH INITIALLY
  // }
  const handleClick = (categoryName) => {
    navigate(`/businesses/${categoryName}`);
    setValue("");
  };
  // onclick go directly to businesseses if location is provided!!
  //  or just set a default location?
  return (
    <nav>
      <div className="flex flex-wrap items-center justify-between space-x-10 bg-accent p-5 pr-10">
        <NavLink to="/" className="ml-10 flex items-center">
          <img src="../../../assets/favicon.ico" />
          <h2 className="ml-3 text-xl font-semibold tracking-wider">
            Review Guru
          </h2>
        </NavLink>
        {/* Have to filter by location before any search allowed */}
        {pathname !== "/" && (
          <div className="flex space-x-0.5">
            <SearchCategories
              setCategory={setCategory}
              value={value}
              setValue={setValue}
            />
            {/* put another search for business names here */}
            <Button
              size="icon"
              variant="outline"
              // HIGHLIGHT OR SHOW MESSAGE IF NO CATEGORY SELECTED
              // Reset combobox on click
              onClick={() => {
                category && handleClick(category);
              }}
            >
              <Search />
            </Button>
          </div>
        )}
        <div className="flex space-x-5">
          <ModeToggle />
          {TOKEN ? <LogoutButton /> : <AuthLinks />}
          {TOKEN && (
            <NavLink to="/profile">
              <Button>Profile</Button>
            </NavLink>
          )}
        </div>
      </div>
      <Separator className="mb-2" />
    </nav>
  );
};
export default NavBar;
