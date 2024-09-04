import { ChevronDown, ChevronUp, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";
import CommentButton from "./CommentButton";

const Commentlist = ({ TOKEN, data, isUserReview }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);

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
          <div>
            <CommentButton handleClick={handleClick} TOKEN={TOKEN} />
            {isCommenting && (
              <p>
                Hi{" "}
                <X
                  onClick={() => setIsCommenting(false)}
                  className="cursor-pointer"
                />
              </p>
            )}
          </div>
        )}
      </section>
      <CollapsibleTrigger asChild>
        <Button variant="ghost" size="sm">
          comments ({data.length})
          {!isOpen && <ChevronDown className="size-4" />}
          {isOpen && <ChevronUp className="size-4" />}
          <span className="sr-only">Toggle</span>
        </Button>
      </CollapsibleTrigger>
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
