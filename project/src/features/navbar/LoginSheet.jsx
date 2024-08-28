import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import LoginForm from "../auth/LoginForm";

const LoginButton = () => {
  const [error, setError] = useState(null);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Login</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Log In to your Account</SheetTitle>
          <SheetDescription>{error && <p>{error}</p>}</SheetDescription>
        </SheetHeader>
        <LoginForm setError={setError} />
      </SheetContent>
    </Sheet>
  );
};
export default LoginButton;
