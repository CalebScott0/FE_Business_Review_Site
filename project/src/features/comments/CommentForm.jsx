import { X } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { Textarea } from "@/components/ui/textarea";
import { useCreateCommentMutation } from "./commentSlice";
import { useParams } from "react-router-dom";
import { useState } from "react";

const schema = z.object({
  text: z
    .string()
    .min(1, { message: "Please enter text to leave a comment" })
    .max(255, { message: "Maximum characters for comment is 255" }),
});

const CommentForm = ({ setIsCommenting }) => {
  const { reviewId } = useParams();
  const [createComment] = useCreateCommentMutation();
  const [error, setError] = useState();

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      text: "",
    },
  });

  const onSubmit = async (values, e) => {
    e.preventDefault();
    // form.formState.errors.text
    setError(null);
    console.log(values);
  };
  return (
    <section className="flex flex-row-reverse justify-end">
      <X
        onClick={() => setIsCommenting(false)}
        className="align-end cursor-pointer hover:text-destructive"
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-1/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Comment</FormLabel>
                <FormControl>
                  <Textarea
                    className="w-full resize-none"
                    placeholder="Leave a comment on this review..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </section>
  );
};
export default CommentForm;
