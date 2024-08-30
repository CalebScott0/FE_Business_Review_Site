import { Button } from "@/components/ui/button";
import { useLogoutMutation } from "./authSlice";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  const handleLogout = () => {
    if (location.pathname === "/profile") {
      navigate("/");
    }
    logout();
    // location.reload();
  };
  return <Button onClick={handleLogout}>Logout</Button>;
};
export default LogoutButton;
