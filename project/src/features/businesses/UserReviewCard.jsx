import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ReactStars from "react-rating-stars-component";
import { CircleUser } from "lucide-react";
import CommentList from "../comments/CommentList";

const UserReviewCard = ({
  deleteError,
  handleDelete,
  handleEditClick,
  isDelete,
  status,
  userReview,
  userReviewDate,
}) => {
  {
    /* on refetch after delete - status will be pending - hide userReview immediately as there is a delay in delete */
  }
  if (userReview && status !== "pending") {
    return (
      <Card className="mb-10">
        <CardHeader>
          <CardTitle>
            {deleteError && <p>{deleteError}</p>}
            <p className="-mt-2 mb-4 font-normal tracking-wide">{`Your review from ${userReviewDate}`}</p>
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
              <span className="-mt-0.5 ml-1 text-sm">{userReview.stars}</span>
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
          <CardDescription>{userReviewDate}</CardDescription>
        </CardHeader>
        <CardContent>{userReview.text}</CardContent>
        <CardFooter>
          <CommentList data={userReview.Comments} isUserReview={true} />
        </CardFooter>
      </Card>
    );
  }
};
export default UserReviewCard;
