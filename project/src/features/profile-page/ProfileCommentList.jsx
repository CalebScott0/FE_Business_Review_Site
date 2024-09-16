import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import Loader from "@/components/Loader";

const ProfileCommentList = ({ TOKEN }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null)(
      // grab logged in user's comments
      async () => {
        setIsLoading(true);
        try {
          const response = await fetch(
            "http://localhost:8080/api/user/comments",
            {
              headers: {
                authorization: `Bearer ${TOKEN}`,
              },
            },
          );
          const json = await response.json();
          setComments(json.comments);
        } catch (error) {
          console.log(error);
          setError("Failed to load user comments, please try again");
        }
        setIsLoading(false);
      },
    )();
  }, []);

  const commentDate = (date) => {
    const commentDate = new Date(date);
    return (
      commentDate.toDateString() + " - " + commentDate.toLocaleTimeString()
    );
  };

  if (isLoading) return <Loader />;

  if (error) return <p>{error}</p>;

  if (comments.length > 0) {
    return (
      <Carousel
        opts={{
          align: "start",
        }}
        orientation="vertical"
        className="w-full max-w-xs"
      >
        <CarouselContent className="-mt-1 h-full max-h-[650px]">
          {comments.map((comment) => (
            <CarouselItem
              key={comment.id}
              // className="md:basis-1/2 lg:basis-1/3"
            >
              <Card className="w-full">
                <CardHeader className="text-center text-base">
                  <CardDescription className="text-sm">
                    {commentDate(comment.createdAt)}
                  </CardDescription>
                  <Separator />
                  <CardTitle className="text-base font-normal tracking-wide">
                    <div>
                      You Commented on{" "}
                      <span className="font-bold">
                        {comment.reviewAuthor.slice(
                          0,
                          comment.reviewAuthor.indexOf("#"),
                        )}
                        's
                      </span>{" "}
                      Review
                    </div>
                    <p>
                      For{" "}
                      <span className="font-bold">{comment.businessName}</span>
                    </p>
                  </CardTitle>
                </CardHeader>
                <Separator className="mx-auto w-[90%]" />
                <CardDescription className="ml-2 text-xs">
                  Comment:
                </CardDescription>
                <CardContent>{comment.text}</CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    );
  }
};
export default ProfileCommentList;
