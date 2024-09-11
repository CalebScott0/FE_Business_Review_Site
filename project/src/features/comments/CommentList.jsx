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

import { useEffect, useState } from "react";
import CommentButton from "./CommentButton";
import CommentForm from "./CommentForm";
import { useDeleteCommentMutation } from "./commentSlice";
import { Skeleton } from "@/components/ui/skeleton";

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
  const [loading, setLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [commentId, setCommentId] = useState(null);
  const [deleteError, setDeleteError] = useState(null);
  const [comments, setComments] = useState([]);
  const [refetch, setRefetch] = useState(false);

  // useEffect(() => {
  // setCommentId(null);
  // }, [data]);

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
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:8080/api/businesses/reviews/${reviewId}/comments`,
        );
        const json = await response.json();
        setComments(json.comments);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    })();
  }, [refetch]);

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
        <Button variant="ghost" size="sm">
          See comments
          {!isOpen && <ChevronDown className="size-4" />}
          {isOpen && <ChevronUp className="size-4" />}
          <span className="sr-only">Toggle</span>
        </Button>
      </CollapsibleTrigger>
      {/* hide comments on form function */}
      {/* {!isCommenting && !loading && ( */}
      {!isCommenting && (
        <CollapsibleContent className="space-y-2">
          <p>comments ({comments.length})</p>
          {/* comments.length !== 0 && */}
          {comments.map((item) => (
            <Card
              key={item.id}
              className="rounded-md border px-4 py-2 text-sm shadow-sm"
            >
              <CardHeader>
                <CardTitle className="flex items-center space-x-1 text-sm">
                  <CircleUser className="size-5" />
                  <span>{item.author.slice(0, item.author.indexOf("#"))}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-base">
                {item.id !== commentId && item.text}
                {isEditing && item.id === commentId && (
                  <CommentForm
                    setIsCommenting={setIsCommenting}
                    setIsEditing={setIsEditing}
                    reviewId={reviewId}
                    setCommentId={setCommentId}
                    commentId={commentId}
                    text={item.text}
                    isEditing={isEditing}
                    setRefetch={setRefetch}
                    refetch={refetch}
                  />
                )}
              </CardContent>
              {isDeleting && item.id === commentId && (
                <CardFooter>Deleting comment...</CardFooter>
              )}
              {!isEditing && (
                <CardDescription className="ml-5">
                  {commentDate(item.createdAt)}
                </CardDescription>
              )}
              {item.authorId === userId && item.id !== commentId && (
                <CardFooter className="-mb-6 -ml-2.5 mt-2 flex space-x-2">
                  <Button variant="ghost" size="icon">
                    <Edit2 size="20" onClick={() => handleEditClick(item.id)} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-destructive"
                  >
                    <Trash2
                      size="20"
                      onClick={() => handleDeleteClick(item.id)}
                    />
                  </Button>
                  {deleteError && (
                    <p className="text-destructive">{deleteError}</p>
                  )}
                </CardFooter>
              )}
            </Card>
          ))}
        </CollapsibleContent>
      )}
    </Collapsible>
  );
};

export default Commentlist;
