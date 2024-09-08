import { useGetMeQuery } from "./auth/authSlice";
import { Skeleton } from "@/components/ui/skeleton";
import LoginPopupForm from "./auth/LoginPopupForm";

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
  // if (error) {
  //   return <p>{error}</p>;
  // }
  if (TOKEN && data) {
    console.table(data.user);
    return <p>{data.user.username}</p>;
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
