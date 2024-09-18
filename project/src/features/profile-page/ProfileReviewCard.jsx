import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ReactStars from "react-rating-stars-component";
import { Separator } from "@/components/ui/separator";
import { useRef } from "react";
import useTruncatedElement from "../../utilities/useTruncatedElement";
import { Button } from "@/components/ui/button";

const ProfileReviewCard = ({ review, reviewDate }) => {
  const ref = useRef(null);
  const { isTruncated, isShowingMore, toggleIsShowingMore } =
    useTruncatedElement({
      ref,
    });
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-sm">
          <h4 className="mb-2 text-lg font-semibold">{review.businessName}</h4>
          <div className="flex items-center gap-2">
            <ReactStars
              edit={false}
              isHalf={false}
              size={18}
              value={review.stars}
              activeColor="#ff001a"
            />
            {review.stars}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col">
      <Separator className="mx-auto w-[98%] mb-3" />
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
      <Separator className="mx-auto w-[98%]" />
      <CardDescription className="my-2 mx-12 text-sm">
        {reviewDate(review.createdAt)}
      </CardDescription>
    </Card>
  );
};

export default ProfileReviewCard;
