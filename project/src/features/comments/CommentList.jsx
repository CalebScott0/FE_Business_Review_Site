import { ChevronDown, ChevronUp, Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";
import CommentButton from "./CommentButton";
import CommentForm from "./CommentForm";
import { useDeleteCommentMutation } from "./commentSlice";

const Commentlist = ({ TOKEN, data, isUserReview, reviewId, userId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [commentId, setCommentId] = useState(null);

  const [deleteComment] = useDeleteCommentMutation();

  const handleClick = () => {
    setIsCommenting(true);
  };

  const handleEditClick = (commentId) => {
    setIsEditing(true);
    setCommentId(commentId);
  };

  const handleDeleteClick = (commentId) => {
    setIsDeleting(true);
    setCommentId(commentId);
  };
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-fit space-y-2"
    >
      <section>
        {!isUserReview && (
          <div className="w-screen">
            <CommentButton
              handleClick={handleClick}
              TOKEN={TOKEN}
              isCommenting={isCommenting}
            />
            {isCommenting && (
              <CommentForm
                setIsCommenting={setIsCommenting}
                reviewId={reviewId}
              />
            )}
          </div>
        )}
      </section>
      {data.length === 0 && (
        <p className="ml-3 text-sm font-medium">comments (0)</p>
      )}
      {data.length !== 0 && (
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm">
            comments ({data.length})
            {!isOpen && <ChevronDown className="size-4" />}
            {isOpen && <ChevronUp className="size-4" />}
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      )}
      <CollapsibleContent className="space-y-2">
        {data.map((item) => (
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
              </div>
            )}
            {(item.id !== commentId ||
              (item.id === commentId && isDeleting)) && <p>{item.text}</p>}
            {isEditing && item.id === commentId && (
              <CommentForm
                setIsCommenting={setIsCommenting}
                setIsEditing={setIsEditing}
                reviewId={reviewId}
                setCommentId={setCommentId}
                commentId={commentId}
                text={item.text}
                isEditing={isEditing}
              />
            )}
          </section>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
  // }
};

export default Commentlist;
