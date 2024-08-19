import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const CategoryMenu = ({ icon, title, array, handleClick }) => {
  return (
    <NavigationMenuList>
      <NavigationMenuItem>
        <NavigationMenuTrigger>
          {icon}
          <span>{title}</span>
        </NavigationMenuTrigger>
        <NavigationMenuContent className="flex min-w-80 flex-wrap pb-0.5">
          {array.map((item, index) => (
            <NavigationMenuLink
              key={index}
              className="flex w-40 flex-row rounded-md p-2 text-sm leading-6 hover:bg-destructive"
              onClick={() => handleClick(item.categoryName)}
            >
              {item.icon}
              {item.name}
            </NavigationMenuLink>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenuList>
  );
};
export default CategoryMenu;
