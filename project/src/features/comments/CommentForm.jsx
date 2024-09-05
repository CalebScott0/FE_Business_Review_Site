import { X } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  useCreateCommentMutation,
  useEditCommentMutation,
} from "./commentSlice";
import { useEffect, useState } from "react";

const schema = z.object({
  text: z
    .string()
    .min(1, { message: "Please enter text to leave a comment" })
    .max(255, { message: "Maximum characters for comment is 255" }),
});

const CommentForm = ({
  setIsCommenting,
  setIsEditing,
  reviewId,
  setCommentId,
  commentId,
  text,
  isEditing,
}) => {
  const [createComment] = useCreateCommentMutation();
  const [editComment] = useEditCommentMutation();
  const [error, setError] = useState();

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      text: "",
    },
  });
  useEffect(() => {
    text && form.setValue("text", text);
  }, []);
  const handleXClick = () => {
    setIsCommenting(false);
    setIsEditing(false);
    setCommentId(null);
  };
  const formMode = isEditing ? editComment : createComment;
  const id = isEditing ? { commentId } : { reviewId };

  const onSubmit = async (values, e) => {
    e.preventDefault();
    // form.formState.errors.text
    setError(null);
    try {
      await formMode({ ...id, body: values }).unwrap();
      setIsCommenting(false);
      setIsEditing(false);
      // setCommentId(null);
    } catch (error) {
      setError(error.error || error.data?.message);
      console.log("error", error);
    }
  };
  return (
    <section className="flex flex-row-reverse justify-end">
      {error && <p className="text-destructive">{error}</p>}
      {!form.formState.isSubmitting && (
        <X
          onClick={handleXClick}
          className="align-end cursor-pointer hover:text-destructive"
        />
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
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
            <Button type="submit">
              {isEditing ? "Edit Comment" : "Submit"}
            </Button>
          )}
          {form.formState.isSubmitting && (
            <p>{isEditing ? "Editing" : "Creating"} comment...</p>
          )}
        </form>
      </Form>
    </section>
  );
};
export default CommentForm;
