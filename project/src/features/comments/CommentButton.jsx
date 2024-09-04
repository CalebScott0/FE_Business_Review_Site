import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import LoginPopupForm from "../auth/LoginPopupForm";
import { MessageCircle } from "lucide-react";

const CommentButton = ({ TOKEN, handleClick }) => {
  let loginFormMsg = "Please log in to your account before leaving a comment.";

  if (!TOKEN) {
    return (
      <Dialog>
        <div className="flex">
          Add a Comment
          <DialogTrigger asChild>
            <MessageCircle className="mx-1.5 my-0.5 size-5 cursor-pointer text-zinc-500" />
          </DialogTrigger>
        </div>
        <LoginPopupForm loginFormMsg={loginFormMsg} />
      </Dialog>
    );
  }
  return (
    <div className="flex">
      Add a comment{" "}
      <MessageCircle
        onClick={handleClick}
        className="mx-1.5 my-0.5 size-5 cursor-pointer"
      />
    </div>
  );
};

export default CommentButton;
