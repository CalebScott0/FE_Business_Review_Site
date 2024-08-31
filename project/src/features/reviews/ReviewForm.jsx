import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import ReactStars from "react-rating-stars-component";
import { useCreateReviewMutation } from "./reviewSlice";

const schema = z.object({
  stars: z
    .number()
    .min(1, { message: "Please leave a rating" })
    .max(5, { message: "Rating must be less than 5" }),
  text: z.string().min(1, { message: "Required" }),
});

const ReviewForm = ({ TOKEN, isEdit }) => {
  const { name, businessId, reviewId } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [createReview] = useCreateReviewMutation();
  const { state } = useLocation();

  // prevent user from accessing page without token
  useEffect(() => {
    !TOKEN && !isEdit && navigate("/");
  }, [TOKEN]);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      stars: 0,
      text: "",
    },
  });

  // set form values if review form is accessed in edit mode
  const stars = state?.stars;
  const text = state?.text;

  stars && form.setValue("stars", stars);
  text && form.setValue("text", text);

  const handleCreateReview = async (values, e) => {
    e.preventDefault();
    setError(null);

    try {
      await createReview({ businessId, body: values }).unwrap();
      navigate(`/business/${name}/${businessId}`);
    } catch (error) {
      setError(error.data.message);
    }
  };

  return (
    <Card className="mx-auto w-full max-w-2xl rounded-none">
      <CardHeader>
        <CardTitle className="tracking-wide">
          {`${!isEdit ? "Write a" : "Edit"} Review for ${name}`}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCreateReview)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="stars"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ReactStars isHalf={false} size={26} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Share your experience..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <p className="mt-2 tracking-wide text-destructive">
              {error && error}
            </p>
            <CardFooter>
              {!form.formState.isSubmitting && (
                <>
                  {isEdit && (
                    <Button onClick={() => navigate(-1)}>Go Back</Button>
                  )}
                  <Button type="submit" className="mx-auto w-full max-w-52">
                    {`${!isEdit ? "Submit" : "Edit"} Review`}
                  </Button>
                </>
              )}
              {form.formState.isSubmitting && (
                <p>{`${!isEdit ? "Creating" : "Editing"} review...`}</p>
              )}
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
export default ReviewForm;
