import CommentList from "../comments/CommentList";
import { CircleUser } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ReactStars from "react-rating-stars-component";
import useTruncatedElement from "../../utilities/useTruncatedElement";
import { useRef } from "react";
import { Button } from "@/components/ui/button";

const ReviewCard = ({ review, dateFormatter, TOKEN, USER_ID }) => {
  const ref = useRef(null);

  const { isTruncated, isShowingMore, toggleIsShowingMore } =
    useTruncatedElement({
      ref,
    });

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex">
            <ReactStars
              value={review.stars}
              size={18}
              edit={false}
              isHalf={false}
            />
            <span className="-mt-0.5 ml-1 text-sm">{review.stars}</span>
          </div>
          <div className="mt-5 flex space-x-1">
            <CircleUser className="-mt-0.5 size-6" />
            <span className="-mt-1 text-base tracking-wide">
              {
                // slice out '#' from username
                review.author.indexOf("#") < 0
                  ? review.author
                  : review.author.slice(0, review.author.indexOf("#"))
              }
              :
            </span>
          </div>
        </CardTitle>
        <CardDescription>{dateFormatter(review.createdAt)}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col">
        <blockquote
          ref={ref}
          className={`mb-3 line-clamp-${isShowingMore ? 0 : 5}`}
        >
          {review.text}
        </blockquote>
        {isTruncated && (
          <Button
            className="self-end"
            variant="ghost"
            onClick={toggleIsShowingMore}
          >
            {!isShowingMore ? `Read More` : `See less`}
          </Button>
        )}
      </CardContent>
      <CardFooter>
        <CommentList
          reviewDate={dateFormatter(review.createdAt)}
          dateFormatter={dateFormatter}
          TOKEN={TOKEN}
          reviewId={review.id}
          isUserReview={false}
          userId={USER_ID}
        />
      </CardFooter>
    </Card>
  );
};

export default ReviewCard;
