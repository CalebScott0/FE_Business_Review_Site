import { useEffect, useState } from "react";
import { useDeleteReviewMutation } from "../reviews/reviewSlice";
import UserReviewCard from "./UserReviewCard";
import { useNavigate } from "react-router-dom";
import ReviewButton from "../reviews/ReviewButton";
import ReviewCard from "./ReviewCard";
import Loader from "@/components/Loader";
import InfiniteScroll from "react-infinite-scroll-component";

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
  const [isDelete, setIsDelete] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [index, setIndex] = useState(5);
  const [hasMore, setHasMore] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(false);

  const [deleteReview] = useDeleteReviewMutation();

  const navigate = useNavigate();

  useEffect(() => {
    // fetch reviews for business on mount
    (async function () {
      setIsInitialLoad(true);
      try {
        const response = await fetch(
          `http://localhost:8080/api/businesses/${businessId}/reviews?offset=0&limit=5`,
        );
        const json = await response.json();

        setReviews(json.reviews);
        json.reviews.length < 5 && setHasMore(false);
      } catch (error) {
        console.log(error);
      }
      setIsInitialLoad(false);
    })();
  }, []);

  const fetchMoreReviews = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/businesses/${businessId}/reviews?offset=${index}&limit=5`,
      );
      const json = await response.json();
      // return and end scroll if no more data
      console.log(json.reviews.length);
      if (!json.reviews.length) {
        setHasMore(false);
        return;
      }
      setHasMore(true);
      // append new reviews to reviews state
      setReviews((prevReviews) => [...prevReviews, ...json.reviews]);
    } catch (error) {
      console.log(error);
    }
    setIndex((prevIndex) => prevIndex + 5);
  };
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

  const handleDeleteClick = async ({ reviewId }) => {
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

  if (reviews.length > 0) {
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
          handleDeleteClick={handleDeleteClick}
          handleEditClick={handleEditClick}
          isDelete={isDelete}
          userReview={userReview}
          userReviewDate={userReviewDate}
        />
        {/* map the rest of reviews */}
        <InfiniteScroll
          dataLength={reviews.length}
          next={fetchMoreReviews}
          hasMore={hasMore}
          loader={
            <div className="mt-2 text-center">
              <Loader />
            </div>
          }
          endMessage={<p className="text-center mt-4">End of list</p>}
        >
          <div>
            {reviewList.map((review) => (
              <ReviewCard
                key={review.id}
                review={review}
                dateFormatter={dateFormatter}
                TOKEN={TOKEN}
                USER_ID={USER_ID}
              />
            ))}
          </div>
        </InfiniteScroll>
      </section>
    );
  }
};

export default ReviewList;
