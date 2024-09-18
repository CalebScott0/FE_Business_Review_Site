import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ReactStars from "react-rating-stars-component";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import ReviewList from "../../reviews/ReviewList";
import SingleBusinessPhotos from "./SingleBusinessPhotos";
import { useNavigate } from "react-router-dom";

const SingleBusiness = ({ TOKEN, USER_ID, setIsEditReview }) => {
  const { id, name } = useParams();

  const [business, setBusiness] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const navigate = useNavigate();

  // const {data , error, isLoading, isFetching } = useGetBusinessByIdQuery(id);
  useEffect(() => {
    setIsLoading(true);

    // fetch business on mount / url id change to new business
    (async () => {
      setError(null);

      try {
        const response = await fetch(
          `https://api-business-review-site.onrender.com/api/businesses/${id}`,
        );
        const json = await response.json();
        setBusiness(json.business);
      } catch (error) {
        console.log(error);
        setError("Failed to load business, please try again.");
      }
      setIsLoading(false);
    })();
    // refetch on id change (new business loaded) & review deletion
  }, [id, refetch]);

  // navigate to category on badge click on business card
  const handleBadgeClick = (categoryName) => {
    navigate(`/businesses/${categoryName}`);
  };

  if (error) return <p>{error}</p>;

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
  if (business.id) {
    return (
      <main>
        {/* Business card */}
        <Card className="border-none">
          <CardHeader>
            <CardTitle>
              <div className="flex items-center space-x-2">
                <span className="text-2xl leading-10 tracking-wide">
                  {business.name}
                </span>
                <Badge
                  variant="outline"
                  className={`h-fit text-muted ${business.isOpen ? "bg-emerald-500" : "bg-destructive"}`}
                >
                  {business.isOpen === true ? "Open" : "Closed"}
                </Badge>
              </div>
            </CardTitle>
            <div className="flex items-center space-x-1.5">
              <ReactStars
                value={business.stars}
                size={24}
                edit={false}
                isHalf={true}
              />
              <span>{business.stars?.toFixed(1)}</span>
            </div>
          </CardHeader>
          <CardDescription className="-mt-4 mb-4 ml-6">
            <div>
              {`
            ${business.address} 
            ${business.city}, 
            ${business.state} 
            ${business.zipCode}
            `}
            </div>
          </CardDescription>
          <CardContent>
            <SingleBusinessPhotos businessId={id} />
          </CardContent>
          <CardFooter>
            <div className="flex flex-wrap">
              {business.categories
                .sort((a, b) => (a.categoryName < b.categoryName ? -1 : 1))
                .map((category, idx) => (
                  <Badge
                    className="mx-0.5 mb-2 h-6 w-fit cursor-pointer"
                    key={idx}
                    onClick={() => handleBadgeClick(category.categoryName)}
                  >
                    {category.categoryName}
                  </Badge>
                ))}
            </div>
          </CardFooter>
        </Card>
        <Separator className="my-2" />
        <ReviewList
          businessId={id}
          name={name}
          TOKEN={TOKEN}
          USER_ID={USER_ID}
          setIsEditReview={setIsEditReview}
          reviewCount={business.reviewCount}
          setRefetch={setRefetch}
          refetch={refetch}
        />
      </main>
    );
  }
};
export default SingleBusiness;
