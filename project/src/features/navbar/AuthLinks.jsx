import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";

const AuthLinks = () => {
  return (
    <div>
      <Button>
        <NavLink to="/login">Login</NavLink>
      </Button>
      <NavLink to="/register">Create an account.</NavLink>
    </div>
  );
};
export default AuthLinks;
