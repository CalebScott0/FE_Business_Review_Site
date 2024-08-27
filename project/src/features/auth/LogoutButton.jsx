import { Button } from "@/components/ui/button";
import { useLogoutMutation } from "./authSlice";

const LogoutButton = () => {
  const [logout] = useLogoutMutation();
  const handleLogout = () => {
    logout();
    location.reload();
  };
  return <Button onClick={handleLogout}>Logout</Button>;
};
export default LogoutButton();
