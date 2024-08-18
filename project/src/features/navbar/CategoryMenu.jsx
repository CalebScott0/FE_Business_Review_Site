import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Dumbbell,
  Flower,
  Cross,
  Drama,
  Microscope,
  Car,
  PartyPopper,
  BadgeCent,
  BriefcaseBusiness,
  Hammer,
  House,
  Utensils,
  Pizza,
  Martini,
  Soup,
  Beer,
  Newspaper,
  Landmark,
  MapPinHouse,
  Church,
  Plane,
  ShoppingBag,
  Cat,
} from "lucide-react";

const categoriesArray = [
  // "Active Life",
  // "Beauty & Spas",
  // "Health & Medical",
  // "Arts & Entertainment",
  // "Education",
  // "Automotive",
  // "Event Planning & Services",
  // "Financial Services",
  // "Professional Services",
  // "Home Services",
  // "Local Services",
  // "Restaurants",
  // "Food",
  // "Local Flavor",
  // "Nightlife",
  //   "Hotels & Travel",
  //   "Shopping",
  //   "Pets",
  // "Mass Media",
  // "Public Services & Government",
  // "Real Estate",
  // "Religious Organizations",
];

const healthAndWellnessArr = [
  {
    name: "Active Life",
    icon: <Dumbbell className="mr-2 size-6" />,
  },
  {
    name: "Beauty & Spas",
    icon: <Flower className="mr-2 size-6" />,
  },
  {
    name: "Health & Medical",
    icon: <Cross className="mr-2 size-6" />,
  },
  {
    name: "Arts & Entertainment",
    icon: <Drama className="mr-2 size-6" />,
  },
  {
    name: "Education",
    icon: <Microscope className="mr-2 size-6" />,
  },
];

const servicesArr = [
  {
    name: "Automotive",
    icon: <Car className="mr-2 size-6" />,
  },
  {
    name: "Event Planning & Services",
    icon: <PartyPopper className="mr-2 size-6" />,
  },
  {
    name: "Financial Services",
    icon: <BadgeCent className="mr-2 size-6" />,
  },
  {
    name: "Professional Services",
    icon: <BriefcaseBusiness className="mr-2 size-6" />,
  },
  {
    name: "Home Services",
    icon: <House className="mr-2 size-6" />,
  },
  {
    name: "Local Services",
    icon: <Hammer className="mr-2 size-6" />,
  },
];

const foodAndDrinksArr = [
  {
    name: "Restaurants",
    icon: <Utensils className="mr-2 size-6" />,
  },
  {
    name: "Food",
    icon: <Pizza className="mr-2 size-6" />,
  },
  {
    name: "Bars",
    icon: <Beer className="mr-2 size-6" />,
  },
  {
    name: "Local Flavor",
    icon: <Soup className="mr-2 size-6" />,
  },
  {
    name: "Nightlife",
    icon: <Martini className="mr-2 size-6" />,
  },
];

const miscArr = [
  {
    name: "Mass Media",
    icon: <Newspaper className="mr-2 size-6" />,
  },
  {
    name: "Public Services & Government",
    icon: <Landmark className="mr-2 size-6" />,
  },
  {
    name: "Real Estate",
    icon: <MapPinHouse className="mr-2 size-6" />,
  },
  {
    name: "Religious Organizations",
    icon: <Church className="mr-2 size-6" />,
  },
];
const hotelsAndTravel = {
  name: "Hotels & Travel",
  icon: <Plane className="mr-2 size-6" />,
};
const shopping = {
  name: "Shopping",
  icon: <ShoppingBag className="mr-2 size-6" />,
};
const pets = {
  name: "Pets",
  icon: <Cat className="mr-2 size-6" />,
};

const CategoryMenu = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            {healthAndWellnessArr[0].icon}
            <span>{healthAndWellnessArr[0].name}</span>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink>Link</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
export default CategoryMenu;
