import { useGetMeQuery } from "../auth/authSlice";
import { Skeleton } from "@/components/ui/skeleton";
import UserReviews from "./UserReviews";
import UserComments from "./UserComments";
import LoginPopupForm from "../auth/LoginPopupForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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

  // convert user date to new Date object returning string of just the date
  const userDate = data && new Date(data.user.createdAt).toDateString();

  // if (error) {
  //   return <p>{error}</p>;
  // }
  if (TOKEN && data) {
    console.table(data.user);
    return (
      <section>
        <Card className="mx-6 h-fit">
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
              <li className="mt-2">- Review Count: {data.user.reviewCount}</li>
              <li className="flex items-center">
                <span className="mr-2">- Average Review Stars:</span>
                <ReactStars
                  edit={false}
                  isHalf={true}
                  value={data.user.stars}
                  size={18}
                />
                <span className="mx-1">{data.user.stars.toFixed(1)}</span>
              </li>

              {/* add comment count */}
            </ul>
          </CardContent>
        </Card>
        <div className="mt-2 flex">
          <div className="flex-1">
            <UserComments TOKEN={TOKEN} />
          </div>
          <UserReviews TOKEN={TOKEN} />
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
