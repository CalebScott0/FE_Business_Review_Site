import { ModeToggle } from "@/components/ModeToggle";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import SearchCategories from "./SearchCategories";
import CategoryMenu from "./CategoryMenu";
import {
  foodAndDrinksArr,
  healthArr,
  servicesArr,
  miscArr,
  singleCategoryArr,
} from "./categoryArrays";
import { HeartPulse, Layers, Sandwich, Wrench } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";

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
    // show message that browser does not support Geolocation/
    // if user does not allow location:
    // Location will have to be entered manually in search box!
    // REQUIRE THIS STEP BEFORE SEARCHING IS POSSIBLE TO FILTER SEARCH INITIALLY
  }
  const handleClick = (category) => {
    console.log(category);
  };
  // onclick go directly to businesseses if location is provided?
  //  or just set a default location?
  return (
    <div className="mt-2">
      <SearchCategories setCategory={setCategory} /> OR
      <ModeToggle />
      <Separator className="mt-2" />
      <div className="ml-0.5 flex">
        {singleCategoryArr.map((item, index) => (
          <Button variant="ghost" key={index}>
            {item.icon}
            {item.categoryName}
          </Button>
        ))}
        <NavigationMenu>
          <CategoryMenu
            icon={<Sandwich className="mr-2 size-6" />}
            title="Food"
            array={foodAndDrinksArr}
            handleClick={handleClick}
          />
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
          <CategoryMenu
            icon={<Layers className="mr-2 size-6" />}
            title="Miscellanous"
            array={miscArr}
            handleClick={handleClick}
          />
        </NavigationMenu>
      </div>
    </div>
  );
};
export default NavBar;
