import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import LoginPopupForm from "../auth/LoginPopupForm";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

const ReviewButton = ({ name, businessId, TOKEN, setIsEditReview }) => {
  const navigate = useNavigate();
  // make sure review form is in create mode
  const handleClick = () => {
    setIsEditReview(false);
    navigate(`/business/${name}/createreview/${businessId}`);
  };

  let loginFormMsg = "Please log in to your account before writing a review.";

  if (!TOKEN) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="my-4 bg-gray-500 text-muted hover:bg-gray-400 hover:text-muted"
          >
            Leave a Review
          </Button>
        </DialogTrigger>
        <LoginPopupForm loginFormMsg={loginFormMsg} />
      </Dialog>
    );
  }
  return (
    <Button onClick={handleClick} className="my-4">
      Write a Review
    </Button>
  );
};
export default ReviewButton;
