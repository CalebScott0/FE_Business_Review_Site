import { useGetMeQuery } from "../auth/authSlice";
import { Skeleton } from "@/components/ui/skeleton";
import ProfileReviewList from "./ProfileReviewList";
import ProfileCommentList from "./ProfileCommentList";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ReactStars from "react-rating-stars-component";

const ProfilePage = ({ TOKEN }) => {
  const { data, error, isLoading } = useGetMeQuery();
  if (isLoading) {
    return (
      <div className="py-5">
        {Array.from({ length: 10 }).map((_, idx) => (
          <div key={idx} className="mt-4">
            <Skeleton className="mx-4 h-16" />
          </div>
        ))}
      </div>
    );
  }
  if (error) {
    return <p>Error loading account Info</p>;
  }
  // convert user date to new Date object returning string of just the date
  const userDate = data && new Date(data.user.createdAt).toDateString();

  // if (error) {
  //   return <p>{error}</p>;
  // }
  if (TOKEN && data) {
    console.table(data.user);
    return (
      <section className="mx-12 mb-52">
        <h1 className="my-6 text-3xl font-bold tracking-wider">Your Profile</h1>
        <Card className="h-fit">
          {/* User card */}
          <CardHeader>
            <CardTitle>{data.user.username}</CardTitle>
          </CardHeader>
          <CardDescription>
            <div className="ml-6 flex space-x-2">
              <div>
                {data.user.firstname && (
                  <p>
                    <span className="italic">First Name: </span>
                    <span className="font-semibold text-card-foreground">
                      {data.user.firstname}
                    </span>
                  </p>
                )}
                {data.user.lastname && (
                  <p>
                    <span className="italic">Last Name: </span>
                    <span className="font-semibold text-card-foreground">
                      {data.user.lastname}
                    </span>
                  </p>
                )}
              </div>
              <Separator className="h-10" orientation="vertical" />
              {data.user.email && (
                <p>
                  <span className="italic">Email: </span>
                  <span className="text-card-foreground">
                    {data.user.email}
                  </span>
                </p>
              )}
            </div>
          </CardDescription>
          <Separator className="mx-auto my-4 w-[95%]" />
          <CardContent>
            User Since: {userDate}
            <ul>
              <li className="mt-2 flex items-center">
                <span className="mr-2">- Average Review Rating:</span>
                <ReactStars
                  edit={false}
                  isHalf={true}
                  value={data.user.stars}
                  size={18}
                />
                <span className="mx-1">{data.user.stars.toFixed(1)} Stars</span>
              </li>
              <li>- Review Count: {data.user.reviewCount}</li>
              <li>- Comment Count: {data.user.commentCount}</li>

              {/* add comment count */}
            </ul>
          </CardContent>
        </Card>
        <div className="font-l mt-2 flex gap-12">
          <div className="mt-20">
            <h4 className="relative bottom-16 text-center text-2xl font-semibold">
              Comments
            </h4>
            <ProfileCommentList TOKEN={TOKEN} />
          </div>
          <div className="mt-4">
            <h4 className="relative ml-6 text-2xl font-semibold">Reviews</h4>
            <div className="mt-6">
              <ProfileReviewList TOKEN={TOKEN} />
            </div>
          </div>
        </div>
      </section>
    );
  }

  // // Make this page inaccessible without a token
  // if (!TOKEN) {
  //   let loginFormMsg = "Log in to your account to see your profile.";
  //   return (
  //     <main>
  //     <LoginPopupForm loginFormMsg={loginFormMsg} />;
  //   </main>
  // );
  // }
};
export default ProfilePage;
