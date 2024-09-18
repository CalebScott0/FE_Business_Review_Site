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
        <NavigationMenuTrigger className="mt-3 hover:border">
          {icon}
          <span>{title}</span>
        </NavigationMenuTrigger>
        <NavigationMenuContent className="flex min-w-80 cursor-pointer flex-wrap pb-0.5">
          {array.map((item, index) => (
            <NavigationMenuLink
              key={index}
              className="flex w-40 flex-row rounded-md p-2 text-sm leading-6 hover:bg-accent"
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
