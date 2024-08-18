import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

// const categories = [
//   "Active Life",
//   "Beauty & Spas",
//   "Health & Medical",
//   "Arts & Entertainment",
//   "Education",
//   "Automotive",
//   "Event Planning & Services",
//   "Financial Services",
//   "Public Services & Government",
//   "Professional Services",
//   "Home Services",
//   "Restaurants",
//   "Food",
//   "Local Flavor",
//   "Nightlife",
//   "Hotels & Travel",
//   "Local Services",
//   "Mass Media",
//   "Shopping",
//   "Pets",
//   "Real Estate",
//   "Religious Organizations",
// ];
const healthAndWellnessArr = [{
    
}]

const CategoryMenu = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink>Link</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
export default CategoryMenu;
