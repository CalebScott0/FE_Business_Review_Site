import { useState, useEffect } from "react";

const UserReviews = ({ TOKEN }) => {
  const [reviews, setReviews] = useState();

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

  return <p>User Reviews</p>;
};

export default UserReviews;
