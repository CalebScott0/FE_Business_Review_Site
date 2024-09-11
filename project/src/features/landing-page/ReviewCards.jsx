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
  // // setState to reviews in localstorage or empty array fallback
  const [reviews, setReviews] = useState(
    JSON.parse(localStorage.getItem("landing-page-reviews")) || [],
  );
  // const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    // setIsMounted(true);
    // grab most recent reviews on mount - will update every 5 seconds
    (async function () {
      try {
        const response = await fetch(
          "http://localhost:8080/api/landing-page/reviews/recent",
        );
        const json = await response.json();
        // if(!isMounted) return
        // localStorage.removeItem("landing-page-reviews");
        localStorage.setItem(
          "landing-page-reviews",
          JSON.stringify(json.reviews),
        );
        setReviews(JSON.parse(localStorage.getItem("landing-page-reviews")));
      } catch (error) {
        console.log(error);
      }
    })();

    // set interval to fetch reviews every 5 seconds after mount
    // const intervalId = setInterval(() => {
    // fetchReviews();
    // }, 5000);
    // clear interval and set is mounted to false
    // return () => {
    // clearInterval(intervalId);
    // setIsMounted(false);
    // };
  }, []);

  if (reviews.length > 0) {
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
