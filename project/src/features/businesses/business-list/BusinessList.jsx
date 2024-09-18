import { NavLink, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { CircleUser } from "lucide-react";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import InfiniteScroll from "react-infinite-scroll-component";
import BusinessListPhoto from "./BusinessListPhoto";
import { Badge } from "@/components/ui/badge";

const BusinessList = ({ BASE_URL }) => {
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
        // usage of fetch over RTK Query is to exponentially speed up api get requests
        const response = await fetch(
          `${BASE_URL}/businesses/list/category/${categoryName}?offset=0&limit=10`,
        );
        const json = await response.json();

        setBusinesses(json.businesses);
        json.businesses?.length < 10 && setHasMore(false);
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
        `${BASE_URL}/businesses/list/category/${categoryName}?offset=${index}0&limit=10`,
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
   Make it look like loaded businesses so it's not just rectangles */
  if (isInitialLoad) {
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
  if (error)
    return (
      <p className="mt-2 text-center text-2xl text-destructive">{error}</p>
    );
  return (
    <main className="mx-20">
      <h1 className="my-6 ml-12 text-4xl font-semibold leading-6 tracking-wide">
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
        {/* <div className="my-5"> */}
          <div className="my-5 grid grid-cols-1 gap-8 md:grid-cols-1 lg:grid-cols-2">
          {!isInitialLoad &&
            businesses.map((business) => (
              <Card className="mx-auto w-full my-8 duration-300 hover:-translate-y-1 hover:shadow-md dark:hover:shadow-gray-500">
                <NavLink
                  to={`/business/${business.name}/${business.id}`}
                  key={business.id}
                >
                  <CardHeader>
                    <CardTitle className="flex space-x-2">
                      <h2 className="text-2xl leading-5 tracking-wide">
                        {business.name}
                      </h2>
                      <Badge
                        variant="outline"
                        className={`mx-auto size-fit text-muted ${business.isOpen ? "bg-emerald-500" : "bg-destructive"}`}
                      >
                        {business.isOpen ? "Open" : "Closed"}
                      </Badge>
                    </CardTitle>
                    <div className="flex items-center space-x-1.5">
                      <ReactStars
                        value={business.stars}
                        size={24}
                        edit={false}
                        isHalf={true}
                      />
                      <span>{business.stars.toFixed(1)}</span>
                    </div>
                      <p>{`(${business.reviewCount}) reviews`}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex space-x-2">
                      <div>
                        <BusinessListPhoto
                          businessId={business.id}
                          BASE_URL={BASE_URL}
                        />
                      </div>
                    </div>
                    {/* 
                    <div>
                      <div className="mt-2 flex items-center space-x-1">
                        <CircleUser className="mt-2 size-5" />
                        <p className="mt-2 text-xs tracking-tighter text-muted-foreground">
                          @
                          {
                            // slice out '#' from username
                            business.review[0].author.slice(
                              0,
                              business.review[0].author.indexOf("#"),
                            )
                          }
                        </p>
                      </div>
                      <p className="mt-2 line-clamp-2 text-xs tracking-tight">
                        {business.review[0].text}
                      </p>
                    </div> */}
                  </CardContent>
                </NavLink>
                <CardDescription className="ml-3 space-x-0.5 space-y-0.5 pb-2">
                  {/* {business.categories.slice(0, 5).map((item, idx) => (
                    // {business.categories.map((item) => (
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
                  ))} */}
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
