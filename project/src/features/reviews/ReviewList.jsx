import { useEffect, useState } from "react";
import { useDeleteReviewMutation } from "../reviews/reviewSlice";
import UserReviewCard from "./UserReviewCard";
import { useNavigate } from "react-router-dom";
import ReviewButton from "../reviews/ReviewButton";
import ReviewCard from "./ReviewCard";

// returns date formatted as yyyy-mm-dd
const dateFormatter = (inpDate) => {
  const date = new Date(inpDate);
  let year = date.getFullYear();

  // getMonth will return a number 0-11
  let month = date.getMonth() + 1;
  month = month < 10 ? `0${month}` : month;

  let day = date.getDate();
  day = day < 10 ? `0${day}` : day;

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};

const ReviewList = ({
  businessId,
  name,
  TOKEN,
  USER_ID,
  setIsEditReview,
  reviewCount,
  setRefetch,
  refetch,
}) => {
  const [deleteReview] = useDeleteReviewMutation();
  const [isDelete, setIsDelete] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const [reviews, setReviews] = useState([]);

  const navigate = useNavigate();
  const handleEditClick = ({ reviewId, stars, text }) => {
    setIsEditReview(true);
    // set router state with stars and text to edit form
    navigate(`/business/${name}/editreview/${reviewId}`, {
      state: {
        stars,
        text,
      },
    });
  };

  useEffect(() => {
    // fetch reviews for business on mount
    (async function () {
      try {
        const response = await fetch(
          `http://localhost:8080/api/businesses/${businessId}/reviews`,
        );
        const json = await response.json();
        setReviews(json.reviews);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleDelete = async ({ reviewId }) => {
    setIsDelete(true);
    try {
      await deleteReview(reviewId);
      setRefetch(!refetch);
    } catch (error) {
      setDeleteError("Unable to delete review. Please try again.");
    }
    setIsDelete(false);
  };

  // if userReview, take out of array and display on top of reviews
  const userReview = reviews?.find((rev) => rev.authorId === USER_ID);
  const userReviewDate = dateFormatter(new Date(userReview?.createdAt));

  // take userReview out of review list if it exists
  const reviewList = userReview
    ? reviews?.toSpliced(reviews?.indexOf(userReview), 1)
    : reviews;

  if (reviews.length !== 0) {
    return (
      <section>
        <span className="mx-5">{reviewCount} reviews</span>
        {!userReview && (
          <ReviewButton
            businessId={businessId}
            name={name}
            setIsEditReview={setIsEditReview}
            TOKEN={TOKEN}
          />
        )}
        {/* userReview card */}
        <UserReviewCard
          deleteError={deleteError}
          handleDelete={handleDelete}
          handleEditClick={handleEditClick}
          isDelete={isDelete}
          userReview={userReview}
          userReviewDate={userReviewDate}
        />
        {/* map the rest of reviews */}
        {reviewList.map((review) => (
          <ReviewCard
            review={review}
            dateFormatter={dateFormatter}
            TOKEN={TOKEN}
            USER_ID={USER_ID}
          />
        ))}
      </section>
    );
  }
};

export default ReviewList;
