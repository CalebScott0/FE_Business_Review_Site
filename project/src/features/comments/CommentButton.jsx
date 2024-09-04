import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import LoginPopupForm from "../auth/LoginPopupForm";
import { MessageCircle } from "lucide-react";

const CommentButton = ({ TOKEN }) => {
  let loginFormMsg = "Please log in to your account before leaving a comment.";

  if (!TOKEN) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          Add a Comment <MessageCircle className="size-4" />
        </DialogTrigger>
        <LoginPopupForm loginFormMsg={loginFormMsg} />
      </Dialog>
    );
  }
  return <Button variant="outline">Add a Comment</Button>;
};

export default CommentButton;
