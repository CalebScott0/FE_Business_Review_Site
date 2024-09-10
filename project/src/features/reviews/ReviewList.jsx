import { useEffect, useState } from "react";
import { CircleGauge, CircleUser } from "lucide-react";
import CommentList from "../comments/CommentList";
import { useDeleteReviewMutation } from "../reviews/reviewSlice";
import { useEditCommentMutation } from "../comments/commentSlice";
import UserReviewCard from "./UserReviewCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import ReviewButton from "../reviews/ReviewButton";
import ReactStars from "react-rating-stars-component";

// returns date formatted as yyyy-mm-dd
const dateFormatter = (date) => {
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
      console.log(refetch);
      await deleteReview(reviewId);
      setIsDelete(false);
      setRefetch(!refetch);
    } catch (error) {
      setDeleteError("Unable to delete review. Please try again.");
    }
  };

  // if userReview, take out of array and display on top of reviews
  const userReview = reviews?.find((rev) => rev.authorId === USER_ID);
  const userReviewDate = dateFormatter(new Date(userReview?.createdAt));

  // take userReview out of review list if it exists
  const reviewList = userReview
    ? reviews?.toSpliced(reviews?.indexOf(userReview), 1)
    : reviews;

  if (reviews.length) {
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
        {reviewList.map((rev) => (
          <Card key={rev.id}>
            <CardHeader>
              <CardTitle>
                <div className="flex">
                  <ReactStars
                    value={rev.stars}
                    size={18}
                    edit={false}
                    isHalf={false}
                  />
                  <span className="-mt-0.5 ml-1 text-sm">{rev.stars}</span>
                </div>
                <div className="mt-5 flex space-x-1">
                  <CircleUser className="-mt-0.5 size-5" />
                  <span className="-mt-1 text-base tracking-wide">
                    {
                      // slice out '#' from username
                      rev.author.slice(0, rev.author.indexOf("#"))
                    }
                    :
                  </span>
                </div>
              </CardTitle>
              <CardDescription>
                {dateFormatter(new Date(rev.createdAt))}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <blockquote>{rev.text}</blockquote>
            </CardContent>
            <CardFooter>
              <CommentList
                TOKEN={TOKEN}
                reviewId={rev.id}
                isUserReview={false}
                userId={USER_ID}
              />
            </CardFooter>
          </Card>
        ))}
      </section>
    );
  }
};

export default ReviewList;
