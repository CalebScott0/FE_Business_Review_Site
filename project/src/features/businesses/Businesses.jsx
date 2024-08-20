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

const Businesses = () => {
  // grab category name from url
  const { category } = useParams();

  const {
    data = {},
    error,
    isLoading,
  } = useGetBusinessesByCategoryQuery(category);
  if (data.businesses) {
    console.log(data.businesses[0].Categories);
  }
  // figure out how to also show this when a new category is selected
  // while still on businesses page, or speed up back end query?
  /*  Style this sizing / spacing after businesses are styled on page
   Make it look different than loaded businesses so it's not just rectangles,
    like how hulu does it in app? */
  if (isLoading) {
    console.log("Loading...");
    return (
      <div>
        {Array.from({ length: 10 }).map((_, idx) => (
          <div key={idx} className="mt-4">
            <Skeleton className="mx-4 h-16" />
          </div>
        ))}
      </div>
    );
  }
  return (
    <>
      {/* {!data.businesses &&
        Array.from({ length: 10 }).map((_, idx) => (
          <div key={idx} className="mt-4">
            <Skeleton className="mx-4 h-16" />
          </div>
        ))} */}
      {data.businesses &&
        data.businesses.map((bus) => (
          <Card key={bus.id}>
            <CardHeader>
              <CardTitle>
                <span className="text-lg">{bus.name}</span>
                {/* {bus.categories.map((item) => (
                  <Badge>{item.categoryName}</Badge>
                ))} */}
              </CardTitle>
            </CardHeader>
          </Card>
        ))}
    </>
  );
};
export default Businesses;
