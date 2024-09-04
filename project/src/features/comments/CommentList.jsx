import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";
import CommentButton from "./CommentButton";
import CommentForm from "./CommentForm";

const Commentlist = ({ TOKEN, data, isUserReview, reviewId, userId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);
  let count = 0;
  console.log("userId", userId);
  const handleClick = () => {
    setIsCommenting(true);
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
          <p
            key={item.id}
            className="rounded-md border px-4 py-2 text-sm shadow-sm"
          >
            {item.text}
          </p>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
  // }
};

export default Commentlist;
