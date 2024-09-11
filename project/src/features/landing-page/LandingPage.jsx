import { CarouselTemplate } from "@/components/Carousel";
import { useState } from "react";
import ReviewCards from "./ReviewCards";
import CategoryMenu from "../navbar/CategoryMenu";
import {
  foodAndDrinksArr,
  healthArr,
  servicesArr,
  miscArr,
} from "./categoryArrays.jsx";
import { HeartPulse, Layers, Sandwich, Search, Wrench } from "lucide-react";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import { useNavigate } from "react-router-dom";
import SearchCategories from "../navbar/SearchCategories";
import SearchBusinessByName from "../navbar/SearchBusinessByName";
import { Button } from "@/components/ui/button";

const LandingPage = () => {
  // category name set by category selection
  const [category, setCategory] = useState("");
  // value for category search box, reset on go button click
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const handleClick = (categoryName) => {
    navigate(`/businesses/${categoryName}`);
    // setValue("");
  };
  return (
    <main>
      <section className="h-60 bg-muted">
        {" "}
        <div className="ml-4 flex space-x-2">
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
        <div className="ml-10 mt-10 flex items-center space-x-0.5">
          <SearchCategories
            setCategory={setCategory}
            value={value}
            setValue={setValue}
          />
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
        <div className="ml-10 mt-10 flex items-center space-x-0.5">
          <SearchBusinessByName />
        </div>
      </section>
      <div className="mt-20">
        <ReviewCards />
      </div>
    </main>
  );
};
export default LandingPage;
