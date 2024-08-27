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
import { useLoginMutation } from "./authSlice";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  username: z.string({ message: "Required" }),
  password: z.string({ message: "Required" }),
});

const LoginForm = ({ setError }) => {
  const [login] = useLoginMutation();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(schema),
  });

  const tryLogin = async (event, values) => {
    event.preventDefault();
    setError(null);

    try {
      setLoading(true);
      //   await login(values).unwrap();
      console.log(values);
    } catch (error) {
      setLoading(false);
      setError(error.data);
    }

    return (
      <main>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(tryLogin)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Username..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </main>
    );
  };
};
export default LoginForm;
