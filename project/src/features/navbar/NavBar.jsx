import { ModeToggle } from "@/components/ModeToggle";
import { Separator } from "@/components/ui/separator";
import { NavLink, useNavigate } from "react-router-dom";
import SearchCategories from "./SearchCategories";
import CategoryMenu from "./CategoryMenu";
import LogoutButton from "../auth/LogoutButton";
import {
  foodAndDrinksArr,
  healthArr,
  servicesArr,
  miscArr,
} from "./categoryArrays";
import { HeartPulse, Layers, Sandwich, Shell, Wrench } from "lucide-react";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import AuthLinks from "./AuthLinks";

const NavBar = ({ TOKEN }) => {
  // category name set by category selection
  const [category, setCategory] = useState("");
  // value for category search box, reset on go button click
  const [value, setValue] = useState("");

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
    <nav className="space-x-2">
      <div className="flex flex-wrap items-center space-x-10 bg-accent p-5">
        <NavLink to="/">
          <Button className="ml-2">
            <Shell />
            Home
          </Button>
        </NavLink>
        {/* Have to filter by location before any search allowed */}
        <SearchCategories
          setCategory={setCategory}
          value={value}
          setValue={setValue}
        />{" "}
        <span className="">OR</span>
        {/* put another search for business names here */}
        <Button
          size="sm"
          // HIGHLIGHT OR SHOW MESSAGE IF NO CATEGORY SELECTED
          // Reset combobox on click
          onClick={() => {
            category && handleClick(category);
          }}
        >
          Go
        </Button>
        <ModeToggle />
        {TOKEN ? <LogoutButton /> : <AuthLinks />}
        {TOKEN && (
          <NavLink to="/profile">
            <Button>Profile</Button>
          </NavLink>
        )}
      </div>
      <Separator className="mb-2" />
      <div className="ml-0.5 flex">
        <NavigationMenu>
          <CategoryMenu
            icon={<Sandwich className="mr-2 size-6" />}
            title="Food"
            array={foodAndDrinksArr}
            handleClick={handleClick}
          />
        </NavigationMenu>
        <NavigationMenu>
          <CategoryMenu
            icon={<HeartPulse className="mr-2 size-6" />}
            title="Health & Wellness"
            array={healthArr}
            handleClick={handleClick}
          />
        </NavigationMenu>
        <NavigationMenu>
          <CategoryMenu
            icon={<Wrench className="mr-2 size-6" />}
            title="Services"
            array={servicesArr}
            handleClick={handleClick}
          />
        </NavigationMenu>
        <NavigationMenu>
          <CategoryMenu
            icon={<Layers className="mr-2 size-6" />}
            title="Miscellanous"
            array={miscArr}
            handleClick={handleClick}
          />
        </NavigationMenu>
      </div>
    </nav>
  );
};
export default NavBar;
