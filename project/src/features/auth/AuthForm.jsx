import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLoginMutation, useRegisterMutation } from "./authSlice";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const schema = z.object({
  username: z.string().min(1, { message: "Required" }),
  password: z.string().min(1, { message: "Required" }),
  // firstname: z.string(),
  // lastname: z.string(),
  // email: z.string().email(),
});
// // const partialSchema = schema.partial({
// //   firstname: true,
// //   lastname: true,
// //   email: true,
// });

const AuthForm = ({ location }) => {
  const navigate = useNavigate();
  const [register] = useRegisterMutation();
  const [login] = useLoginMutation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const PATH = location.pathname;

  const authType = PATH === "/login" ? "Log in" : "Register";
  const oppAuthType = PATH !== "/login" ? "Log in" : "Create an account";
  const changeAuthText =
    PATH === "/login" ? "Not signed up yet?" : "Already have an account?";

  const form = useForm({
    resolver: zodResolver(schema || partialSchema),
    defaultValues: {
      username: "",
      password: "",
      firstname: "",
      lastname: "",
      email: "",
    },
  });

  const tryAuth = async (values, e) => {
    e.preventDefault();
    setError(null);

    const authMethod = PATH === "/login" ? login : register;
    try {
      setLoading(true);
      await authMethod(values).unwrap();
    } catch (error) {
      setLoading(false);
      setError(error.data.message);
    }
  };
  const handleClick = () => {
    form.reset();
    setError(null);
    navigate(PATH === "/login" ? "/register" : "/login");
  };

  return (
    <div>
      <Button onClick={() => navigate("/")}>Home</Button>
      <Card className="mx-auto mt-10 max-w-md">
        <CardHeader>
          <CardTitle className="tracking-wide">
            {PATH === "/login" ? "Log in to your Account" : "Create an Account"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(tryAuth)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Username" {...field} />
                    </FormControl>
                    <FormDescription>
                      {PATH === "/register" &&
                        `This will be your display name.`}
                    </FormDescription>
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
                    <FormDescription>
                      {PATH === "/register" &&
                        `ENTER SOMETHING ABOUT PASSWORD REQUIREMENTS HERE`}
                    </FormDescription>
                  </FormItem>
                )}
              />
              {/* {PATH === "/register" && (
                <div>
                  <div className="flex justify-between space-x-2">
                    <FormField
                      control={form.control}
                      name="firstname"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Firstname</FormLabel>
                          <FormControl>
                            <Input placeholder="Firstname" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Separator orientation="vertical" className="mt-8 h-10" />
                    <FormField
                      control={form.control}
                      name="lastname"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Lastname</FormLabel>
                          <FormControl>
                            <Input placeholder="Lastname" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="mt-4">
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )} */}
              <Button type="submit">{authType}</Button>
            </form>
          </Form>
          <p className="mt-2 tracking-wide text-destructive">
            {error && error}
          </p>
        </CardContent>
        <CardFooter>
          <p>
            {changeAuthText}{" "}
            <span
              className="cursor-pointer text-blue-600 hover:text-blue-700 hover:underline dark:text-blue-400 hover:dark:text-blue-500"
              onClick={handleClick}
            >
              {oppAuthType}.
            </span>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};
export default AuthForm;
