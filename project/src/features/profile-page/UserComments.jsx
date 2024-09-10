import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const UserComments = ({ TOKEN }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // grab logged in user's comments
    (async function () {
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
        console.log(json.comments);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const commentDate = (date) => {
    const commentDate = new Date(date);
    return commentDate.toDateString() + " - " + commentDate.toLocaleTimeString();
  };

  if (comments.length !== 0) {
    return (
      <section className="flex flex-wrap justify-center gap-2">
        {comments.map((comment) => (
          <Card key={comment.id} className="w-full max-w-md">
            <CardHeader className="text-sm">
              <CardTitle className="text-sm">
                {commentDate(comment.createdAt)}
              </CardTitle>
              <Separator />
              <div>
                You Commented on{" "}
                <span className="font-semibold">
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
                <span className="font-semibold">{comment.businessName}</span>
              </p>
            </CardHeader>
            <Separator className="mx-auto w-[90%]" />
            <CardDescription className="ml-2">Comment:</CardDescription>
            <CardContent>{comment.text}</CardContent>
          </Card>
        ))}
      </section>
    );
  }
};
export default UserComments;
