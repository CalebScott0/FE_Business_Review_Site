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
import CategoryMenu from "./CategoryMenu";
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

export const healthArr = [
  {
    categoryName: "Active Life",
    name: "Active Life",
    icon: <Dumbbell className="mr-2 size-6" />,
  },
  {
    categoryName: "Beauty & Spas",
    name: "Beauty & Spas",
    icon: <Flower className="mr-2 size-6" />,
  },
  {
    categoryName: "Health & Medical",
    name: "Medical",
    icon: <Cross className="mr-2 size-6" />,
  },
  {
    categoryName: "Arts & Entertainment",
    name: "Entertainment",
    icon: <Drama className="mr-2 size-6" />,
  },
  {
    categoryName: "Education",
    name: "Education",
    icon: <Microscope className="mr-2 size-6" />,
  },
];

export const foodAndDrinksArr = [
  {
    categoryName: "Restaurants",
    name: "Restaurants",
    icon: <Utensils className="mr-2 size-6" />,
  },
  {
    categoryName: "Food",
    name: "Food",
    icon: <Pizza className="mr-2 size-6" />,
  },
  {
    categoryName: "Bars",
    name: "Bars",
    icon: <Beer className="mr-2 size-6" />,
  },
  {
    categoryName: "Local Flavor",
    name: "Local Flavor",
    icon: <Soup className="mr-2 size-6" />,
  },
  {
    categoryName: "Nightlife",
    name: "Nightlife",
    icon: <Martini className="mr-2 size-6" />,
  },
];

export const servicesArr = [
  {
    categoryName: "Automotive",
    name: "Auto Repair",
    icon: <Car className="mr-2 size-6" />,
  },
  {
    categoryName: "Event Planning & Services",
    name: "Event Planning",
    icon: <PartyPopper className="mr-2 size-6" />,
  },
  {
    categoryName: "Financial Services",
    name: "Finances",
    icon: <BadgeCent className="mr-2 size-6" />,
  },
  {
    categoryName: "Professional Services",
    name: "Professional",
    icon: <BriefcaseBusiness className="mr-2 size-6" />,
  },
  {
    categoryName: "Home Services",
    name: "Home Services",
    icon: <House className="mr-2 size-6" />,
  },
  {
    categoryName: "Local Services",
    name: "Local Services",
    icon: <Hammer className="mr-2 size-6" />,
  },
];

export const miscArr = [
  {
    categoryName: "Mass Media",
    name: "Mass Media",
    icon: <Newspaper className="mr-2 size-6" />,
  },
  {
    categoryName: "Public Services & Government",
    name: "Government",
    icon: <Landmark className="mr-2 size-6" />,
  },
  {
    categoryName: "Real Estate",
    name: "Real Estate",
    icon: <MapPinHouse className="mr-2 size-6" />,
  },
  {
    categoryName: "Religious Organizations",
    name: "Religion",
    icon: <Church className="mr-2 size-6" />,
  },
];
export const singleCategoryArr = [
  {
    categoryName: "Hotels & Travel",
    icon: <Plane className="mr-2 size-6" />,
  },
  {
    categoryName: "Pets",
    icon: <Cat className="mr-2 size-6" />,
  },
  {
    categoryName: "Shopping",
    icon: <ShoppingBag className="mr-2 size-6" />,
  },
];
