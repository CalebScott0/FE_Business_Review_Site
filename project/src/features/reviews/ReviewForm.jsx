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
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import ReactStars from "react-rating-stars-component";
import { useCreateReviewMutation, useEditReviewMutation } from "./reviewSlice";

const schema = z.object({
  stars: z
    .number()
    .min(1, { message: "Please leave a rating" })
    .max(5, { message: "Rating must be less than 5" }),
  text: z.string().min(1, { message: "Please enter text to write a review" }),
});

const ReviewForm = ({ TOKEN, isEdit }) => {
  const { name, businessId, reviewId } = useParams();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [createReview] = useCreateReviewMutation();
  const [editReview] = useEditReviewMutation();
  const { state } = useLocation();
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      stars: 0,
      text: "",
    },
  });

  // prevent user from accessing page without token
  // Look into router history here?
  useEffect(() => {
    !TOKEN && navigate(-1);
  }, [TOKEN]);

  // set form values from useLocation state on mount if review form is accessed in edit mode
  useEffect(() => {
    state?.stars && form.setValue("stars", state.stars);
    state?.text && form.setValue("text", state.text);
  }, []);

  const onSubmit = async (values, e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    // create or edit review
    try {
      const reviewFunction = isEdit ? editReview : createReview;

      const id = isEdit ? { reviewId } : { businessId };

      await reviewFunction({ ...id, body: values }).unwrap();
      navigate(-1);
    } catch (error) {
      console.log(error);
      setError(error.error || error.data?.message);
    }
    setLoading(false);
  };

  const handleRatingChange = (value) => {
    form.setValue("stars", value);
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="stars"
              render={() => (
                <FormItem>
                  <FormControl>
                    {/* <StarRating defaultValue={stars} />  */}
                    <ReactStars
                      isHalf={false}
                      size={26}
                      value={state?.stars}
                      onChange={handleRatingChange}
                      activeColor="#ff001a"
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
              {!loading && (
                <Button type="submit" className="w-full max-w-52">
                  {`${!isEdit ? "Submit" : "Edit"} Review`}
                </Button>
              )}
              {loading && (
                <p>{`${!isEdit ? "Creating" : "Editing"} review...`}</p>
              )}
            </CardFooter>
          </form>
          <Button className="w-full max-w-52 ml-6" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </Form>
      </CardContent>
    </Card>
  );
};
export default ReviewForm;
