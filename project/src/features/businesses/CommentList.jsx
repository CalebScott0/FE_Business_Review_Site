import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";

const Commentlist = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  if (data.length) {
    return (
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="w-[350px] space-y-2"
      >
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm">
            <MessageCircle className="size-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
        <div className="rounded-md border px-4 py-2 text-sm shadow-sm">
          {data[0].text}
        </div>
        <CollapsibleContent className="space-y-2">
          {data.slice(1).map((item) => (
            <div
              key={item.id}
              className="rounded-md border px-4 py-2 text-sm shadow-sm"
            >
              {item.text}
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>
    );
  }
};

export default Commentlist;
