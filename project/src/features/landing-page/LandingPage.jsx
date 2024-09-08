import { CarouselTemplate } from "@/components/Carousel";
import { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
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
import { Button } from "@/components/ui/button";

const LandingPage = () => {
  const [recentReviews, setRecentReviews] = useState([]);
  // category name set by category selection
  const [category, setCategory] = useState("");
  // value for category search box, reset on go button click
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  // const imageArr = [
  //   {
  //     src: "../../assets/home-page-pic-1.png",
  //     alt: "A shopping center.",
  //   },
  //   {
  //     src: "../../assets/home-page-pic-2.png",
  //     alt: "A table at a nice restaurant.",
  //   },
  //   {
  //     src: "../../assets/home-page-pic-3.png",
  //     alt: "A group of people doing yoga in a park",
  //   },
  //   {
  //     src: "../../assets/home-page-pic-4.png",
  //     alt: "A plumber working in a home",
  //   },
  //   {
  //     src: "../../assets/home-page-pic-5.png",
  //     alt: "An auto repair shop",
  //   },
  // ];
  useEffect(() => {
    // grab most recent reviews on mount
    (async function () {
      try {
        const response = await fetch("http://localhost:8080/api/review/recent");
        const json = await response.json();
        setRecentReviews(json.reviews);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleClick = (categoryName) => {
    navigate(`/businesses/${categoryName}`);
    // setValue("");
  };
  return (
    <main>
      <section className="h-48 bg-muted">
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
        <div className="flex items-center">
          <SearchCategories
            setCategory={setCategory}
            value={value}
            setValue={setValue}
          />
          <Button
            size="icon"
            className="-ml-1 rounded-l-none border-l-0"
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
      </section>
      {/* <main className="mt-10 flex flex-col items-center"> */}
      {/* <CarouselTemplate imageArr={imageArr} /> */}
      <ReviewCard data={recentReviews} />
    </main>
  );
};
export default LandingPage;
