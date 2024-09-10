import { ChevronDown, ChevronUp, CloudCog, Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useEffect, useState } from "react";
import CommentButton from "./CommentButton";
import CommentForm from "./CommentForm";
import { useDeleteCommentMutation } from "./commentSlice";
import { Skeleton } from "@/components/ui/skeleton";

const Commentlist = ({ TOKEN, isUserReview, reviewId, userId }) => {
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
      setIsDeleting(false);
      setRefetch(!refetch);
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
      <CollapsibleContent className="space-y-2">
        {!loading && <p>comments ({comments.length})</p>}
        {/* comments.length !== 0 && */}
        {comments.map((item) => (
          <section
            key={item.id}
            className="rounded-md border px-4 py-2 text-sm shadow-sm"
          >
            {item.authorId === userId && item.id !== commentId && (
              <div className="flex space-x-2">
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
              </div>
            )}
            {item.id !== commentId && <p>{item.text}</p>}
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
            {isDeleting && item.id === commentId && <p>Deleting comment...</p>}
          </section>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default Commentlist;
