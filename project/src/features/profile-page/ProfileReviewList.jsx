import { useState, useEffect } from "react";
import ProfileReviewCard from "./ProfileReviewCard.jsx";

const ProfileReviewList = ({ TOKEN }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    (async function () {
      // grab a logged in user's reviews
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
    })();
  }, []);

  const reviewDate = (date) => {
    const reviewDate = new Date(date);
    return reviewDate.toDateString() + " - " + reviewDate.toLocaleTimeString();
  };

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
