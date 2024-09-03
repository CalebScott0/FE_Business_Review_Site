import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useLoginMutation } from "./authSlice";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { NavLink } from "react-router-dom";

const schema = z.object({
  username: z.string().min(1, { message: "Required" }),
  password: z.string().min(1, { message: "Required" }),
});

const LoginPopupForm = ({ loginFormMsg }) => {
  const [login] = useLoginMutation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const handleLogin = async (values, e) => {
    e.preventDefault();
    setError(null);

    try {
      setLoading(true);
      await login(values).unwrap();
    } catch (error) {
      setLoading(false);
      setError(error.data.message);
    }
  };
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle className="tracking-wide">
          Login to your Account
        </DialogTitle>
        <DialogDescription>{loginFormMsg}</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <p className="mt-2 tracking-wide text-destructive">
            {error && error}
          </p>
          <DialogFooter>
            <Button type="submit" className="w-full">
              Log in
            </Button>
            {/* <p>
              Need to create an account?{" "}
              <NavLink to="/register" className="cursor-pointer">
                Sign up.
              </NavLink>
            </p> */}
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};
export default LoginPopupForm;
