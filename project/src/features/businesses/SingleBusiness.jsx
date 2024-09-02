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
import CommentList from "./CommentList";
import ReviewButton from "../reviews/ReviewButton";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useDeleteReviewMutation } from "../reviews/reviewSlice";
import { useState } from "react";

const SingleBusiness = ({ TOKEN, USER_ID, setIsEditReview }) => {
  const { id, name } = useParams();
  const [deleteReview] = useDeleteReviewMutation();
  const [isDelete, setIsDelete] = useState(false);

  const navigate = useNavigate();

  const { data, error, isLoading } = useGetBusinessByIdQuery(id);

  if (isLoading) {
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
      setError("Unable to delete review. Please try again.");
    }
  };

  if (data && data.business) {
    // if userReview, take out of array and display on top of reviews
    const userReview = data.business.Reviews?.find(
      (rev) => rev.authorId === USER_ID,
    );
    const reviewList = userReview
      ? data.business.Reviews?.toSpliced(
          data.business.Reviews.indexOf(userReview),
          1,
        )
      : data.business.Reviews;

    // change the below once inifinite scroll pagination is implemented
    const reviews = reviewList.slice(0, 10);

    return (
      <main>
        {/* Business card */}
        <Card className="border-none">
          <CardHeader>
            <CardTitle>
              <div className="flex items-center space-x-2">
                <span className="text-2xl leading-10 tracking-wide">
                  {data.business.name}
                </span>
                <Badge
                  variant="outline"
                  className={`h-fit text-muted ${data.business.isOpen ? "bg-emerald-500" : "bg-destructive"}`}
                >
                  {data.business.isOpen === true ? "Open" : "Closed"}
                </Badge>
              </div>
            </CardTitle>
            <div className="flex items-center space-x-1.5">
              <ReactStars
                value={data.business.stars}
                size={24}
                edit={false}
                isHalf={true}
              />
              <span>{data.business.stars.toFixed(1)}</span>
            </div>
          </CardHeader>
          <CardDescription className="ml-4">
            {`
            ${data.business.address} 
            ${data.business.city}, 
            ${data.business.state} 
            ${data.business.zipCode}
            `}
          </CardDescription>
          <CardFooter>
            {!userReview && (
              <ReviewButton
                name={data.business.name}
                businessId={id}
                TOKEN={TOKEN}
                setIsEditReview={setIsEditReview}
              />
            )}
          </CardFooter>
        </Card>
        <Separator className="my-2" />
        {/* userReview card */}
        <span className="ml-5">{data.business.Reviews.length} reviews</span>
        {userReview && (
          <Card className="mb-10">
            <CardHeader>
              <CardTitle>
                <p className="-mt-2 mb-4 font-normal tracking-wide">{`Your review from ${userReview.createdAt
                  .toLocaleString()
                  .slice(
                    0,
                    userReview.createdAt.toLocaleString().indexOf("T"),
                  )}`}</p>
                <Button
                  onClick={() =>
                    handleEditClick({
                      reviewId: userReview.id,
                      stars: userReview.stars,
                      text: userReview.text,
                    })
                  }
                  className="mb-2"
                >
                  Edit Review
                </Button>
                {!isDelete && (
                  <p
                    className="ml-2 inline cursor-pointer"
                    onClick={() =>
                      handleDelete({
                        reviewId: userReview.id,
                      })
                    }
                  >
                    Delete Review
                  </p>
                )}
                {isDelete && (
                  <p className="ml-2 inline text-base">Deleting Review...</p>
                )}
                <div className="flex">
                  <ReactStars
                    value={userReview.stars}
                    size={18}
                    edit={false}
                    isHalf={false}
                  />
                  <span className="-mt-0.5 ml-1 text-sm">
                    {userReview.stars}
                  </span>
                </div>
                <div className="mt-5 flex space-x-1">
                  <CircleUser className="-mt-0.5 size-5" />
                  <span className="-mt-1 text-base tracking-wide">
                    {
                      // slice out '#' from username
                      userReview.author.username.slice(
                        0,
                        userReview.author.username.indexOf("#"),
                      )
                    }
                    :
                  </span>
                </div>
              </CardTitle>
              <CardDescription>
                {userReview.createdAt
                  .toLocaleString()
                  .slice(0, userReview.createdAt.toLocaleString().indexOf("T"))}
              </CardDescription>
            </CardHeader>
            <CardContent>{userReview.text}</CardContent>
            <CardContent>
              <span className="text-sm font-semibold">
                comments ({userReview.Comments.length})
              </span>
            </CardContent>
            <CardFooter>
              <CommentList data={userReview.Comments} />
            </CardFooter>
          </Card>
        )}
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
                  <span className="-mt-1 text-base tracking-wide">
                    {
                      // slice out '#' from username
                      rev.author.username.slice(
                        0,
                        rev.author.username.indexOf("#"),
                      )
                    }
                    :
                  </span>
                </div>
              </CardTitle>
              <CardDescription>
                {rev.createdAt
                  .toLocaleString()
                  .slice(0, rev.createdAt.toLocaleString().indexOf("T"))}
              </CardDescription>
            </CardHeader>
            <CardContent>{rev.text}</CardContent>
            <CardContent>
              <span className="text-sm font-semibold">
                comments ({rev.Comments.length})
              </span>
            </CardContent>
            <CardFooter>
              <CommentList data={rev.Comments} />
            </CardFooter>
          </Card>
        ))}
      </main>
    );
  }
};
export default SingleBusiness;
