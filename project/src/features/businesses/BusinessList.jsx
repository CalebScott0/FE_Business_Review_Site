import { NavLink, useParams } from "react-router-dom";
import { useGetBusinessListQuery } from "./businessSlice";
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
import ReactStars from "react-rating-stars-component";
import { CircleUser } from "lucide-react";

const BusinessList = () => {
  // grab category name from url
  const { category } = useParams();
  const navigate = useNavigate();
  let count = 1;
  const {
    data = {},
    error,
    isLoading,
  } = useGetBusinessListQuery({ category, page: count, limit: 10 });

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
  if (data) {
    return (
      <main className="m-5 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* <Button onClick={() => count++}>Click</Button> */}
        {/* {!data.businesses &&
        Array.from({ length: 10 }).map((_, idx) => (
          <div key={idx} className="mt-4">
            <Skeleton className="mx-4 h-16" />
          </div>
        ))} */}
        {data.businesses.map((bus) => (
          <NavLink to={`/business/${bus.name}/${bus.id}`}>
            <Card
              key={bus.id}
              className="mx-auto w-96 duration-300 hover:-translate-y-1 hover:shadow-md dark:hover:shadow-gray-500"
            >
              <CardHeader>
                <CardTitle className="text-center">
                  <span className="text-xl leading-5 tracking-wide">
                    {bus.name}
                  </span>
                </CardTitle>
                <div className="flex place-content-center items-center space-x-1.5">
                  <ReactStars
                    value={bus.stars}
                    size={20}
                    edit={false}
                    isHalf={true}
                  />
                  <span className="text-sm">{bus.stars.toFixed(1)}</span>
                  <span className="text-xs">{`(${bus.reviewCount}) reviews`}</span>
                </div>
              </CardHeader>
              <CardContent>
                {/* After images work, change this to show all other pictures
              underneath in an infinite carousel (width of larger image and scrolls left to right)? 
              Starting with a random index photo to show at the start*/}
                <div className="flex space-x-2">
                  <img
                    className="box-border size-24 border object-cover"
                    src={`../../../photos/${bus.Photos[0].id}.jpg`}
                    alt={
                      bus.Photos[0].caption ? bus.Photos[0].caption : bus.name
                    }
                  />
                  <Badge
                    variant="outline"
                    className={`h-fit text-muted ${bus.isOpen ? "bg-emerald-500" : "bg-destructive"}`}
                  >
                    {bus.isOpen ? "Open" : "Closed"}
                  </Badge>
                </div>
                <div className="mt-2 flex items-center space-x-1">
                  <CircleUser className="mt-2 size-5" />
                  <p className="mt-2 text-xs tracking-tighter text-muted-foreground">
                    @
                    {
                      // slice out '#' from username
                      bus.Reviews[0].author.username.slice(
                        0,
                        bus.Reviews[0].author.username.indexOf("#"),
                      )
                    }
                  </p>
                </div>
                <p className="mt-2 line-clamp-2 text-xs tracking-tight">
                  {bus.Reviews[0].text}
                </p>
              </CardContent>
              <CardDescription className="ml-3 space-x-0.5 space-y-0.5 pb-2">
                {bus.Categories.slice(0, 5).map((item) => (
                  // {bus.Categories.map((item) => (
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
              <CardFooter>{/* Stars / Review */}</CardFooter>
            </Card>
          </NavLink>
        ))}
      </main>
    );
  }
};
export default BusinessList;
