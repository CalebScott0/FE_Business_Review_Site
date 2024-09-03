import { ChevronDown, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";

const Commentlist = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  // if (data.length) {
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-fit space-y-2"
    >
      <CollapsibleTrigger asChild>
        <Button variant="ghost" size="sm">
          comments ({data.length})
          <ChevronDown className="size-4" />
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
