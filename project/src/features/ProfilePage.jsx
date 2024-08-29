import { useGetMeQuery } from "./auth/authSlice";
import { Skeleton } from "@/components/ui/skeleton";

const ProfilePage = () => {
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
  if (data) {
    console.log(data);
    return <p>{data.user.username}</p>;
  }
};
export default ProfilePage;
