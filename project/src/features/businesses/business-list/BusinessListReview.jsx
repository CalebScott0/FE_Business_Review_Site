import { useState, useEffect } from "react";
import { CircleUser } from "lucide-react";
import Loader from "@/components/Loader";

const BusinessListReview = ({ BASE_URL, businessId }) => {
  const [review, setReview] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      setError(null);
      try {
        // get review for a business
        const response = await fetch(
          `${BASE_URL}/businesses/${businessId}/reviews?offset=0&limit=1`,
        );

        const json = await response.json();

        setReview(json.reviews[0]);
        console.log(json.reviews);
      } catch (error) {
        setError("Unable to load review");
      }
      setIsLoading(false);
    })();
  }, []);

  if (isLoading)
    return (
      <div className="flex size-72 items-end">
        <Loader />
      </div>
    );

  if (error)
    return <p className="mt-2 text-center text-destructive">{error}</p>;

  return (
    review?.id && (
      <section className="bg-secondary border rounded-[.75rem] box-border p-3 relative top-10 drop-shadow-md">
        <div className="mt-2 flex items-center space-x-1">
          <CircleUser className="mt-2 size-5" />
          <p className="mt-2 text-base tracking-tighter text-muted-foreground">
            @{" "}
            {
              //    slice out '#' from username
              review.author.slice(0, review.author.indexOf("#"))
            }
          </p>
        </div>

        <q className="mt-2 line-clamp-5 text-lg text-secondary-foreground font-medium">
          {review.text}
        </q>
      </section>
    )
  );
};

export default BusinessListReview;
