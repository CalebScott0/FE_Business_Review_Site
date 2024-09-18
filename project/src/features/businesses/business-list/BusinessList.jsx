import { NavLink, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import InfiniteScroll from "react-infinite-scroll-component";
import BusinessListPhoto from "./BusinessListPhoto";
import BusinessListCategoryBadges from "./BusinessListCategoryBadges";
import BusinessListReview from "./BusinessListReview";

const BusinessList = ({ BASE_URL }) => {
  const [businesses, setBusinesses] = useState([]);
  const [error, setError] = useState(null);
  const [index, setIndex] = useState(5);
  const [hasMore, setHasMore] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(false);

  // grab category name from url
  const { categoryName } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // fetch initial page data
    (async () => {
      setHasMore(true);
      setIsInitialLoad(true);
      setError(null);
      // get businesses in category with page and limit parameters
      try {
        // usage of fetch over RTK Query is to exponentially speed up api get requests
        const response = await fetch(
          `${BASE_URL}/businesses/list/category/${categoryName}?offset=0&limit=5`,
        );
        const json = await response.json();

        setBusinesses(json.businesses);
        json.businesses?.length < 5 && setHasMore(false);
      } catch (error) {
        console.log(error);
        setError("Failed to load businesses, please try again.");
      }
      // end initial screen load
      setIsInitialLoad(false);
    })();
  }, [categoryName]);

  const fetchMoreBusinesses = async () => {
    setError(null);
    // get businesses in category with page and limit parameters
    try {
      const response = await fetch(
        `${BASE_URL}/businesses/list/category/${categoryName}?offset=${index}&limit=5`,
      );
      const json = await response.json();
      // return and end inifinite scroll if no more data
      if (json.businesses.length < 5 || !json.businesses) {
        setHasMore(false);
        return;
      }
      setHasMore(true);
      // append new businesses to businesses state
      setBusinesses((prevBusinesses) => [
        ...prevBusinesses,
        ...json.businesses,
      ]);
      setIndex((prevIndex) => prevIndex + 5);
    } catch (error) {
      console.log(error);
      setError("Failed to load businesses, please try again.");
    }
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
    <main className="mx-12">
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
        <div className="my-5">
          {/* <div className="my-5 grid grid-cols-1 gap-8 md:grid-cols-1 lg:grid-cols-2"> */}
          {!isInitialLoad &&
            businesses.map((business) => (
              <Card
                key={business.id}
                className="shadow-lg mx-auto my-8 w-full cursor-pointer pl-6 duration-300 hover:-translate-y-1 hover:shadow-md dark:hover:shadow-gray-500"
              >
                <NavLink to={`/business/${business.name}/${business.id}`}>
                  <div className="flex">
                    <CardHeader className="w-1/3">
                      <CardTitle className="flex space-x-2">
                        <h2 className="text-2xl leading-5 tracking-wide">
                          {business.name}
                        </h2>
                        <Badge
                          variant="outline"
                          className={`size-fit tracking-wide text-white ${business.isOpen ? "bg-emerald-500" : "bg-destructive"}`}
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
                          activeColor="#ff001a"
                        />
                        <span>{business.stars.toFixed(1)}</span>
                        <p>{`(${business.reviewCount}) reviews`}</p>
                      </div>
                      <CardDescription className="text-base">
                        <span className="mt-3 block">{business.address}</span>
                        <span>{business.city} </span>
                        <span>{business.state}</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="-ml-3 flex space-x-6 py-12">
                      <BusinessListPhoto
                        businessId={business.id}
                        BASE_URL={BASE_URL}
                      />
                      <div className="max-w-[350px] self-end">
                        <BusinessListReview
                          businessId={business.id}
                          BASE_URL={BASE_URL}
                        />
                      </div>
                    </CardContent>
                  </div>
                </NavLink>
                <CardDescription className="relative -top-32 -mb-6 ml-3 w-1/4 space-x-0.5 space-y-0.5">
                  <BusinessListCategoryBadges
                    BASE_URL={BASE_URL}
                    businessId={business.id}
                    handleBadgeClick={handleBadgeClick}
                  />
                </CardDescription>
              </Card>
            ))}
        </div>
      </InfiniteScroll>
    </main>
  );
};
export default BusinessList;
