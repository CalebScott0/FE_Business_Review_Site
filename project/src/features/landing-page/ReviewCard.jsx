import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CircleUser } from "lucide-react";
import ReactStars from "react-rating-stars-component";

const ReviewCard = ({ data }) => {
  console.table(data);
  return (
    data.length !== 0 && (
      <section className="m-10 grid grid-cols-5 items-center gap-2 gap-x-0">
        {data.map((review) => (
          <Card
            className="box-border h-fit w-full max-w-[250px]"
            key={review.id}
          >
            <CardHeader>
              <CardTitle className="flex items-end space-x-2 text-xs">
                <CircleUser />
                <span>
                  {review.author.username.slice(
                    0,
                    review.author.username.indexOf("#"),
                  )}
                </span>
              </CardTitle>
              <CardDescription>
                <p>
                  reviewed{" "}
                  <span className="text-black">{review.business.name}</span>
                </p>
              </CardDescription>
            </CardHeader>
            <CardContent className="-mt-4">
              <ReactStars value={review.stars} size={20} edit={false} />
              <blockquote className="line-clamp-5 text-sm leading-7 tracking-wide hover:line-clamp-none">
                {review.text}
              </blockquote>
            </CardContent>
          </Card>
        ))}
      </section>
    )
  );
};

export default ReviewCard;
