import { NavLink, useParams } from "react-router-dom";
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
import Loader from "../../components/Loader";
import InfiniteScroll from "react-infinite-scroll-component";

const BusinessList = () => {
  const [businesses, setBusinesses] = useState([]);
  const [error, setError] = useState(null);
  const [index, setIndex] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(false);

  // grab category name from url
  const { categoryName } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // fetch initial page data
    (async () => {
      setHasMore(true);
      setIndex(1);
      setIsInitialLoad(true);
      setError(null);
      // get businesses in category with page and limit parameters
      try {
        const response = await fetch(
          `http://localhost:8080/api/businesses/list/category/${categoryName}?offset=0&limit=10`,
        );
        const json = await response.json();

        setBusinesses(json.businesses);
        json.businesses.length < 10 && setHasMore(false);
      } catch (error) {
        console.log(error);
        setError("Failed to load businesses, please try again.");
      }
      setIsInitialLoad(false);
    })();
  }, [categoryName]);

  const fetchMoreBusinesses = async () => {
    setError(null);
    // get businesses in category with page and limit parameters
    try {
      const response = await fetch(
        `http://localhost:8080/api/businesses/list/category/${categoryName}?offset=${index}0&limit=10`,
      );
      const json = await response.json();
      // return and end inifinite scroll if no more data
      if (json.businesses.length < 10) {
        setHasMore(false);
        return;
      }
      setHasMore(true);
      // append new businesses to businesses state
      setBusinesses((prevBusinesses) => [
        ...prevBusinesses,
        ...json.businesses,
      ]);
    } catch (error) {
      console.log(error);
      setError("Failed to load businesses, please try again.");
    }

    setIndex((prevIndex) => prevIndex + 1);
  };

  // navigate to category on badge click on business card
  const handleBadgeClick = (categoryName) => {
    navigate(`/businesses/${categoryName}`);
  };

  /*  Style this sizing / spacing after businesses are styled on page
   Make it look different than loaded businesses so it's not just rectangles */
  // if (isLoading) {
  //   return (
  //     <div className="py-5">
  //       {Array.from({ length: 10 }).map((_, idx) => (
  //         <div key={idx} className="mt-4">
  //           <Skeleton className="mx-4 h-16" />
  //         </div>
  //       ))}
  //     </div>
  //   );
  // }
  if (error) return <p>{error}</p>;
  return (
    <main>
      <h1 className="m-5 text-2xl font-semibold leading-6 tracking-wide">
        {categoryName}
      </h1>
      <InfiniteScroll
        dataLength={businesses.length}
        next={fetchMoreBusinesses}
        hasMore={hasMore}
        loader={
          <div className="mt-2 text-center">
            <Loader />
          </div>
        }
        endMessage={<p className="text-center">End of list</p>}
      >
        <div className="m-5 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* <Button onClick={() => count++}>Click</Button> */}
          {/* {!data.businesses &&
        Array.from({ length: 10 }).map((_, idx) => (
          <div key={idx} className="mt-4">
            <Skeleton className="mx-4 h-16" />
          </div>
        ))} */}
          {/* {data.businesses.map((bus) => ( */}
          {!isInitialLoad &&
            businesses.map((bus) => (
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
                    <div className="flex space-x-2">
                      <img
                        className="box-border size-24 border object-cover"
                        src={`../../../photos/${bus.photos[0].id}.jpg`}
                        alt={
                          bus.photos[0].caption
                            ? bus.photos[0].caption
                            : bus.name
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
                <CardFooter></CardFooter>
              </Card>
            ))}
        </div>
      </InfiniteScroll>
    </main>
  );
};
export default BusinessList;
