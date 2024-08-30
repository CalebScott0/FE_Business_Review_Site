import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

const ReviewForm = ({ TOKEN }) => {
  const { businessName, businessId } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [createReview] = useCreateReviewMutation();
  // prevent user from accessing page without token
  useEffect(() => {
    !TOKEN && navigate("/");
  }, [TOKEN]);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      stars: 0,
      text: "",
    },
  });
  const handleReview = async (values, e) => {
    e.preventDefault();
    setError(null);

    try {
      await createReview({ businessId, body: values }).unwrap();
      navigate(`/business/${businessName}/${businessId}`);
    } catch (error) {
      setError(error.data.message);
    }
  };

  return (
    <Card className="mx-auto w-full max-w-2xl rounded-none">
      <CardHeader>
        <CardTitle className="tracking-wide">
          Write a Review for {businessName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleReview)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="stars"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ReactStars
                      value={form.formState.defaultValues.stars}
                      isHalf={false}
                      size={26}
                      {...field}
                    />
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
                <Button type="submit" className="mx-auto w-full max-w-52">
                  Submit Review
                </Button>
              )}
              {form.formState.isSubmitting && <p>Creating review...</p>}
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
export default ReviewForm;
