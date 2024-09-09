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
import { useEffect, useState } from "react";

const BusinessList = () => {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(false);

  // grab category name from url
  const { categoryName } = useParams();
  const navigate = useNavigate();
  let count = 1;
  // const {
  //   data = {},
  //   error,
  //   isLoading,
  //   isFetching,
  // } = useGetBusinessListQuery({ category, page: count, limit: 10 });
  useEffect(() => {
    setLoading(true);
    (async function () {
      // get businesses in category with page and limit parameters
      try {
        const response = await fetch(
          `http://localhost:8080/api/businesses/category/${categoryName}?page=${count}&limit=10`,
        );
        const json = await response.json();
        setBusinesses(json.businesses);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    })();
  }, [categoryName]);

  const handleBadgeClick = (categoryName) => {
    navigate(`/businesses/${categoryName}`);
  };

  /*  Style this sizing / spacing after businesses are styled on page
   Make it look different than loaded businesses so it's not just rectangles,
    like how hulu does it in app? */
  if (loading) {
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
    <main>
      <h1 className="m-5 text-2xl font-semibold leading-6 tracking-wide">
        {categoryName}
      </h1>
      <div className="m-5 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* <Button onClick={() => count++}>Click</Button> */}
        {/* {!data.businesses &&
        Array.from({ length: 10 }).map((_, idx) => (
          <div key={idx} className="mt-4">
            <Skeleton className="mx-4 h-16" />
          </div>
        ))} */}
        {/* {data.businesses.map((bus) => ( */}
        {businesses.map((bus) => (
          <Card className="mx-auto w-96 duration-300 hover:-translate-y-1 hover:shadow-md dark:hover:shadow-gray-500">
            <NavLink to={`/business/${bus.name}/${bus.id}`} key={bus.id}>
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
                    src={`../../../photos/${bus.photos[0].id}.jpg`}
                    alt={
                      bus.photos[0].caption ? bus.photos[0].caption : bus.name
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
                      bus.reviews[0].author.slice(
                        0,
                        bus.reviews[0].author.indexOf("#"),
                      )
                    }
                  </p>
                </div>
                <p className="mt-2 line-clamp-2 text-xs tracking-tight">
                  {bus.reviews[0].text}
                </p>
              </CardContent>
            </NavLink>
            <CardDescription className="ml-3 space-x-0.5 space-y-0.5 pb-2">
              {bus.categories.slice(0, 5).map((item, idx) => (
                // {bus.categories.map((item) => (
                // MAKE THESE VARIOUS COLORS
                // (Array of colors in tailwind class syntax w/ random in badge classname?)
                <Badge
                  key={idx}
                  className="cursor-pointer"
                  onClick={() => handleBadgeClick(item.categoryName)}
                >
                  <span className="font-normal leading-3">
                    {item.categoryName}
                  </span>
                </Badge>
              ))}
            </CardDescription>
            <CardFooter>{/* Stars / Review */}</CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
};
export default BusinessList;
