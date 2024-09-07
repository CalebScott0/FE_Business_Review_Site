import { useParams } from "react-router-dom";
import { useGetBusinessByIdQuery } from "./businessSlice";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ReactStars from "react-rating-stars-component";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CircleUser } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import CommentList from "../comments/CommentList";
import ReviewButton from "../reviews/ReviewButton";
import { useNavigate } from "react-router-dom";
import { useDeleteReviewMutation } from "../reviews/reviewSlice";
import { useEffect, useState } from "react";
import UserReviewCard from "./UserReviewCard";

const SingleBusiness = ({ TOKEN, USER_ID, setIsEditReview }) => {
  const { id, name } = useParams();
  const [deleteReview] = useDeleteReviewMutation();
  const [isDelete, setIsDelete] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const [business, setBusiness] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // const {data , error, isLoading, isFetching } = useGetBusinessByIdQuery(id);
  useEffect(() => {
    setLoading(true);
    try {
      async function fetchBusiness() {
        const res = await fetch(`http://localhost:8080/api/businesses/${id}`);
        const json = await res.json();
        setBusiness(json.business);
        setLoading(false);
      }
      fetchBusiness();
    } catch (error) {
      console.log(error);
    }
    // refetch on id change (new business loaded) - review deletion?
  }, [id]);
  // if (error) {
  // }
  if (loading) {
    return (
      <div className="py-5">
        {Array.from({ length: 10 }).map((_, idx) => (
          <div key={idx} className="mt-4">
            <Skeleton className="mx-4 h-16" />
          </div>
        ))}
      </div>
    );
  }

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

  const handleEditClick = ({ reviewId, stars, text }) => {
    // navigate to review form in edit mode and pass stars and text to router location state
    setIsEditReview(true);
    navigate(`/business/${name}/editreview/${reviewId}`, {
      state: {
        stars,
        text,
      },
    });
  };
  const handleDelete = async ({ reviewId }) => {
    setIsDelete(true);
    try {
      await deleteReview(reviewId);
      setIsDelete(false);
    } catch (error) {
      setDeleteError("Unable to delete review. Please try again.");
    }
  };

  // if userReview, take out of array and display on top of reviews
  const userReview = business.reviews?.find((rev) => rev.authorId === USER_ID);
  const userReviewDate = dateFormatter(new Date(userReview?.createdAt));

  // take userReview out of review list if it exists
  const reviewList = userReview
    ? business.reviews?.toSpliced(business.reviews.indexOf(userReview), 1)
    : business.reviews;

  // change the below once inifinite scroll pagination is implemented - also do this for comments
  const reviews = reviewList?.slice(0, 10);

  return (
    <main>
      {/* Business card */}
      {business.id && (
        <Card className="border-none">
          <CardHeader>
            <CardTitle>
              <div className="flex items-center space-x-2">
                <span className="text-2xl leading-10 tracking-wide">
                  {business.name}
                </span>
                <Badge
                  variant="outline"
                  className={`h-fit text-muted ${business.isOpen ? "bg-emerald-500" : "bg-destructive"}`}
                >
                  {business.isOpen === true ? "Open" : "Closed"}
                </Badge>
              </div>
            </CardTitle>
            <div className="flex items-center space-x-1.5">
              <ReactStars
                value={business.stars}
                size={24}
                edit={false}
                isHalf={true}
              />
              <span>{business.stars?.toFixed(1)}</span>
            </div>
          </CardHeader>
          <CardDescription className="ml-4">
            {`
            ${business.address} 
            ${business.city}, 
            ${business.state} 
            ${business.zipCode}
            `}
          </CardDescription>
          <CardFooter>
            {!userReview && (
              <ReviewButton
                businessId={id}
                name={business.name}
                setIsEditReview={setIsEditReview}
                TOKEN={TOKEN}
              />
            )}
          </CardFooter>
        </Card>
      )}
      <span className="ml-5">{business.reviews?.length} reviews</span>
      <Separator className="my-2" />
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
      {reviews?.map((rev) => (
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
                {/* <span className="-mt-1 text-base tracking-wide">
                  {
                    // slice out '#' from username
                    rev.author.username.slice(
                      0,
                      rev.author.username.indexOf("#"),
                    )
                  }
                  :
                </span> */}
              </div>
            </CardTitle>
            <CardDescription>
              {dateFormatter(new Date(rev.createdAt))}
            </CardDescription>
          </CardHeader>
          <CardContent>{rev.text}</CardContent>
          <CardFooter>
            {/* {rev.comments.length && ( */}
            {/* <CommentList */}
            {/* TOKEN={TOKEN} */}
            {/* data={rev.Comments} */}
            {/* reviewId={rev.id} */}
            {/* isUserReview={false} */}
            {/* userId={USER_ID} */}
            {/* /> */}
            {/* )} */}
          </CardFooter>
        </Card>
      ))}
    </main>
  );
};
export default SingleBusiness;
