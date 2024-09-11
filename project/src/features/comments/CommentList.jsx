import {
  ChevronDown,
  ChevronUp,
  CircleUser,
  Edit2,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Loader from "../../components/Loader";
import { useState, useEffect } from "react";
import CommentButton from "./CommentButton";
import CommentForm from "./CommentForm";
import { useDeleteCommentMutation } from "./commentSlice";

const Commentlist = ({
  TOKEN,
  isUserReview,
  reviewId,
  userId,
  dateFormatter,
  reviewDate,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [commentId, setCommentId] = useState(null);
  const [deleteError, setDeleteError] = useState(null);
  const [comments, setComments] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const [index, setIndex] = useState(2);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [deleteComment] = useDeleteCommentMutation();

  const handleCommentClick = () => {
    setIsCommenting(true);
  };

  const handleEditClick = (commentId) => {
    setIsEditing(true);
    setCommentId(commentId);
  };

  // delete comment and refetch list
  const handleDeleteClick = async (commentId) => {
    setIsDeleting(true);
    setCommentId(commentId);
    try {
      await deleteComment({ commentId }).unwrap();
      setRefetch(!refetch);
      setIsDeleting(false);
    } catch (error) {
      setDeleteError("Unable to delete comment. Please try again.");
    }
    setCommentId(null);
  };

  // fetch comments for reviews on initial mount - and on comment functions with refresh
  useEffect(() => {
    (async function () {
      isUserReview && console.log("user review");
      setIsLoading(true);
      setIndex(2);
      setHasMore(true);
      try {
        const response = await fetch(
          `http://localhost:8080/api/businesses/reviews/${reviewId}/comments?offset=0&limit=2`,
        );
        const json = await response.json();
        setComments(json.comments);

        if (json.comments.length < 2) {
          setHasMore(false);
          setIsLoading(false);
          return;
        }
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    })();
  }, [refetch]);

  const fetchMoreComments = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8080/api/businesses/reviews/${reviewId}/comments?offset=${index}&limit=2`,
      );
      const json = await response.json();
      if (json.comments.length < 2) {
        setHasMore(false);
        setIsLoading(false);
        return;
      }
      setHasMore(true);

      setComments((prevComments) => [...prevComments, ...json.comments]);
    } catch (error) {
      console.log(error);
    }

    setIndex((prevIndex) => prevIndex + 2);
    setIsLoading(false);
  };

  const commentDate = (date) => {
    // accidentally seeded comment dates w/o taking into account review date - handle that here
    const comDate = dateFormatter(date);
    return comDate < reviewDate ? reviewDate : comDate;
  };

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-fit space-y-2"
    >
      <section>
        {!isUserReview && (
          <div className="md:w-[500px]">
            <CommentButton
              handleClick={handleCommentClick}
              TOKEN={TOKEN}
              isCommenting={isCommenting}
            />
            {isCommenting && (
              <CommentForm
                setIsCommenting={setIsCommenting}
                setIsEditing={setIsEditing}
                reviewId={reviewId}
                setCommentId={setCommentId}
                setRefetch={setRefetch}
                refetch={refetch}
              />
            )}
          </div>
        )}
      </section>
      <CollapsibleTrigger asChild>
        {!isLoading && (
          <Button
            variant="ghost"
            size="sm"
            // onClick={() => !isOpen && fetchComments()}
          >
            See comments
            {!isOpen && <ChevronDown className="size-4" />}
            {isOpen && <ChevronUp className="size-4" />}
            <span className="sr-only">Toggle</span>
          </Button>
        )}
      </CollapsibleTrigger>
      {/* hide comments on form function */}
      {/* {!isCommenting && !loading && ( */}
      {!isCommenting && (
        <CollapsibleContent className="space-y-2">
          {comments.map((comment) => (
            <Card
              key={comment.id}
              className="rounded-md border px-4 py-2 text-sm shadow-sm"
            >
              <CardHeader>
                <CardTitle className="flex items-center space-x-1 text-sm">
                  <CircleUser className="size-5" />
                  <span>
                    {/* slice out # from username if it exists */}
                    {comment.author.indexOf("#") < 0
                      ? comment.author
                      : comment.author.slice(0, comment.author.indexOf("#"))}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-base">
                {comment.id !== commentId && comment.text}
                {isEditing && comment.id === commentId && (
                  <CommentForm
                    setIsCommenting={setIsCommenting}
                    setIsEditing={setIsEditing}
                    reviewId={reviewId}
                    setCommentId={setCommentId}
                    commentId={commentId}
                    text={comment.text}
                    isEditing={isEditing}
                    setRefetch={setRefetch}
                    refetch={refetch}
                  />
                )}
              </CardContent>
              {isDeleting && comment.id === commentId && (
                <CardFooter>Deleting comment...</CardFooter>
              )}
              {!isEditing && (
                <CardDescription className="ml-5">
                  {commentDate(comment.createdAt)}
                </CardDescription>
              )}
              {comment.authorId === userId && comment.id !== commentId && (
                <CardFooter className="-mb-6 -ml-2.5 mt-2 flex space-x-2">
                  <Button variant="ghost" size="icon">
                    <Edit2
                      size="20"
                      onClick={() => handleEditClick(comment.id)}
                    />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-destructive"
                  >
                    <Trash2
                      size="20"
                      onClick={() => handleDeleteClick(comment.id)}
                    />
                  </Button>
                  {deleteError && (
                    <p className="text-destructive">{deleteError}</p>
                  )}
                </CardFooter>
              )}
            </Card>
          ))}
          {hasMore && (
            <Button onClick={() => fetchMoreComments()}>Load More</Button>
          )}
        </CollapsibleContent>
      )}
      {isLoading && <Loader />}
    </Collapsible>
  );
};

export default Commentlist;
