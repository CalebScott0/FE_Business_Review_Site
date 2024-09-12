import { useState, useEffect } from "react";
import ProfileReviewCard from "./ProfileReviewCard.jsx";
import Loader from "@/components/Loader.jsx";

const ProfileReviewList = ({ TOKEN }) => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      // grab a logged in user's reviews
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:8080/api/user/reviews", {
          headers: {
            authorization: `Bearer ${TOKEN}`,
          },
        });
        const json = await response.json();
        setReviews(json.reviews);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    })();
  }, []);

  const reviewDate = (date) => {
    const reviewDate = new Date(date);
    return reviewDate.toDateString() + " - " + reviewDate.toLocaleTimeString();
  };

  if (isLoading) return <Loader />;

  if (reviews.length > 0) {
    return (
      <section>
        {reviews.map((review) => (
          <ProfileReviewCard
            key={review.id}
            review={review}
            reviewDate={reviewDate}
          />
        ))}
      </section>
    );
  }
};

export default ProfileReviewList;
