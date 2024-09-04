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
import { useState } from "react";

const schema = z.object({
  text: z
    .string()
    .min(1, { message: "Please enter text to leave a comment" })
    .max(255, { message: "Maximum characters for comment is 255" }),
});

const CommentForm = ({ setIsCommenting, reviewId }) => {
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
    try {
      await createComment({ reviewId, body: values });
      setIsCommenting(false);
    } catch (error) {
      setError(error);
      console.log("error", error);
    }
  };
  return (
    <section className="flex flex-row-reverse justify-end">
      {!form.formState.isSubmitting && (
        <X
          onClick={() => setIsCommenting(false)}
          className="align-end cursor-pointer hover:text-destructive"
        />
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/5 space-y-6"
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
          {!form.formState.isSubmitting && (
            <Button type="submit">Submit</Button>
          )}
          {form.formState.isSubmitting && <p>Creating comment...</p>}
        </form>
      </Form>
      {error && <p>{error}</p>}
    </section>
  );
};
export default CommentForm;
