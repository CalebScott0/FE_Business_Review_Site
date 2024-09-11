import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CircleUser } from "lucide-react";
import ReactStars from "react-rating-stars-component";
import { useEffect, useState } from "react";

const ReviewCards = () => {
  // setState to revies in localstorage or empty array fallback
  const [reviews, setReviews] = useState(
    JSON.parse(localStorage.getItem("landing-page-reviews")) || [],
  );
  useEffect(() => {
    // grab most recent reviews on mount - will update every 5 seconds
    // const intervalId = setInterval(() => {
    (async function () {
      try {
        const response = await fetch(
          "http://localhost:8080/api/landing-page/reviews/recent",
        );
        const json = await response.json();
        localStorage.setItem(
          "landing-page-reviews",
          JSON.stringify(json.reviews),
        );
        setReviews(JSON.parse(localStorage.getItem("landing-page-reviews")));
      } catch (error) {
        console.log(error);
      }
    })();
    // }, 5000);
    // clear interval only if no reviews are in local storage (avoid 5 second delay on initial mount)
    // return () => clearInterval(intervalId);
  }, []);

  if (reviews.length) {
    return (
      <section className="m-10 grid grid-cols-5 items-center gap-2 gap-x-0">
        {reviews.map((review) => (
          <Card
            className="box-border h-fit w-full max-w-[250px] animate-bounce"
            key={review.id}
          >
            <CardHeader>
              <CardTitle className="flex items-end space-x-2 text-xs">
                <CircleUser />
                <span>
                  {review.author.username.slice(
                    0,
                    review.author.username.indexOf("#"),
                  )}
                </span>
              </CardTitle>
              <CardDescription>
                <p>
                  reviewed{" "}
                  <span className="text-black dark:text-white">
                    {review.business.name}
                  </span>
                </p>
              </CardDescription>
            </CardHeader>
            <CardContent className="-mt-4">
              <ReactStars value={review.stars} size={20} edit={false} />
              <q className="line-clamp-5 text-sm leading-7 tracking-wide">
                {/* <q className="line-clamp-5 text-sm leading-7 tracking-wide hover:line-clamp-none"> */}
                {review.text}
              </q>
            </CardContent>
          </Card>
        ))}
      </section>
    );
  }
};

export default ReviewCards;
