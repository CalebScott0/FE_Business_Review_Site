import { useParams } from "react-router-dom";
import { useGetBusinessesByCategoryQuery } from "./businessSlice";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";

const Businesses = () => {
  // grab category name from url
  const { category } = useParams();
  const navigate = useNavigate();

  const {
    data = {},
    error,
    isLoading,
  } = useGetBusinessesByCategoryQuery(category);
  if (data.businesses) {
    console.log(data.businesses[0].Categories);
  }
  const handleBadgeClick = (categoryName) => {
    navigate(`/businesses/${categoryName}`);
  };
  // For the below, "refreshing page on new category"
  //  Try useffect with something!

  // figure out how to also show this when a new category is selected
  // while still on businesses page, or speed up back end query?
  /*  Style this sizing / spacing after businesses are styled on page
   Make it look different than loaded businesses so it's not just rectangles,
    like how hulu does it in app? */
  if (isLoading) {
    return (
      <div className="py-5">
        {Array.from({ length: 10 }).map((_, idx) => (
          <div key={idx} className="mt-4">
            <Skeleton className="mx-4 h-16" />
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="flex flex-wrap justify-center">
      {/* {!data.businesses &&
        Array.from({ length: 10 }).map((_, idx) => (
          <div key={idx} className="mt-4">
            <Skeleton className="mx-4 h-16" />
          </div>
        ))} */}
      {data.businesses &&
        data.businesses.map((bus) => (
          <Card key={bus.id} className="mx-10 mt-10 pb-2 w-80">
            <CardHeader>
              <CardTitle>
                <span className="text-lg">{bus.name}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* After images work, change this to show all other pictures
              underneath in an infinite carousel (width of larger image and scrolls left to right)? 
              Starting with a random index photo to show at the start*/}
              <img
              className="size-52 object-cover mx-auto"
                src={`../../../photos/${bus.Photos[0].id}.jpg`}
                alt={bus.Photos[0].caption ? bus.Photos[0].caption : bus.name}
              />
            </CardContent>
            {/* take 5 (or all if business has <= 5) categories */}
            <CardDescription className="ml-1 space-x-0.5 space-y-0.5 pb-2">
              {bus.Categories.slice(0, 5).map((item) => (
                // MAKE THESE VARIOUS COLORS
                // (Array of colors in tailwind class syntax w/ random in badge classname?)
                <Badge
                  className="cursor-pointer font-normal leading-3"
                  onClick={() => handleBadgeClick(item.categoryName)}
                >
                  {item.categoryName}
                </Badge>
              ))}
            </CardDescription>
          </Card>
        ))}
    </div>
  );
};
export default Businesses;
