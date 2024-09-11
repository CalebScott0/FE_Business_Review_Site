import { useEffect, useState, useRef, useCallback } from "react";
import { useDeleteReviewMutation } from "../reviews/reviewSlice";
import UserReviewCard from "./UserReviewCard";
import { useNavigate } from "react-router-dom";
import ReviewButton from "../reviews/ReviewButton";
import ReviewCard from "./ReviewCard";
import Loader from "@/components/Loader";

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
  const [isLoading, setIsLoading] = useState(false);
  const [index, setIndex] = useState(5);
  const [isMoreData, setIsMoreData] = useState(true);

  const loaderRef = useRef(null);
  const [deleteReview] = useDeleteReviewMutation();

  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    // escape function if loading or no more data to fetch
    if (isLoading || !isMoreData) return;

    setIsLoading(true);
    setIsMoreData(true);

    try {
      const response = await fetch(
        `http://localhost:8080/api/businesses/${businessId}/reviews?offset=${index}&limit=5`,
      );
      const json = await response.json();
      // return if no more data
      if (!json.reviews) {
        setIsLoading(false);
        setIsMoreData(false);
        return;
      }
      // append new reviews to reviews state
      setReviews((prevReviews) => [...prevReviews, ...json.reviews]);
    } catch (error) {
      console.log(error);
    }
    // increment index
    setIndex((prevIndex) => prevIndex + 5);

    setIsLoading(false);
  }, [index, isLoading]);

  useEffect(() => {
    // add observer for loader ref to fetch data according to target
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        fetchData();
      }
    });
    if (loaderRef.current) {
      // add loaderRef element to the set of target elements watched by IntersectionObserver
      observer.observe(loaderRef.current);
    }
    // cleanup function to ensure loader element is not observed when component is unmounted
    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [fetchData]);

  useEffect(() => {
  
    // fetch reviews for business on mount
    (async function () {
      try {
        const response = await fetch(
          `http://localhost:8080/api/businesses/${businessId}/reviews?offset=0&limit=5`,
        );
        const json = await response.json();
        setReviews(json.reviews);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

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
        <div ref={loaderRef} className="mt-6 text-center">
          {isLoading && <Loader />}
        </div>
        {!isMoreData && <p className="mt-6 text-center">End of list.</p>}
      </section>
    );
  }
};

export default ReviewList;
