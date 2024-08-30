import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import LoginPopupForm from "../auth/LoginPopupForm";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

const ReviewButton = ({ businessName, businessId, TOKEN }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/business/${businessName}/createreview/${businessId}`);
  };
  if (!TOKEN) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Leave a Review</Button>
        </DialogTrigger>
        <LoginPopupForm />
      </Dialog>
    );
  }
  return <Button onClick={handleClick}>Leave a Review</Button>;
};
export default ReviewButton;
