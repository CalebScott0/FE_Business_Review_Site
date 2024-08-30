import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";

const AuthLinks = () => {
  return (
    <div className="flex items-center space-x-2">
      <Button>
        <NavLink to="/login">Log in</NavLink>
      </Button>
      <div>
        Need to create an account?
        <NavLink
          to="/register"
          className="text-zinc-600 hover:text-zinc-500 dark:text-zinc-400 hover:dark:text-zinc-300"
        >
          {" "}
          Sign up.
        </NavLink>
      </div>
    </div>
  );
};
export default AuthLinks;
