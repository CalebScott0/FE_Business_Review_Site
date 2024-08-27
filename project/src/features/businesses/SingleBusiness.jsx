import { useParams } from "react-router-dom";
import { useGetBusinessByIdQuery } from "./businessSlice";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ReactStars from "react-rating-stars-component";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CircleUser } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import CommentList from "./CommentList";

const SingleBusiness = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetBusinessByIdQuery(id);
  const bus = [
    {
      name: "yuh",
    },
  ];
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

  if (data) {
    const reviews = data.business?.Reviews?.slice(0, 10);

    return (
      <main>
        <Card className="border-none">
          <CardHeader>
            <CardTitle>
              <div className="flex items-center space-x-2">
                <span className="text-2xl leading-10 tracking-wide">
                  {data.business.name}
                </span>
                <Badge
                  variant="outline"
                  className={`h-fit text-muted ${data.business.isOpen ? "bg-emerald-500" : "bg-destructive"}`}
                >
                  {data.business.isOpen === true ? "Open" : "Closed"}
                </Badge>
              </div>
            </CardTitle>
            <div className="flex items-center space-x-1.5">
              <ReactStars
                value={data.business.stars}
                size={24}
                edit={false}
                isHalf={true}
              />
              <span>{data.business.stars}</span>
            </div>
          </CardHeader>
          <CardDescription className="ml-4">
            {`
            ${data.business.address} 
            ${data.business.city}, 
            ${data.business.state} 
            ${data.business.zipCode}
            `}
          </CardDescription>
        </Card>
        <Separator className="my-2" />
        <span className="ml-5">{data.business.Reviews.length} reviews</span>
        {reviews?.map((rev) => (
          <Card key={rev.id}>
            <CardHeader>
              <CardTitle>
                <div className="flex">
                  <ReactStars
                    value={rev.stars}
                    size={18}
                    edit={false}
                    isHalf={false}
                  />
                  <span className="-mt-0.5 ml-1 text-sm">{rev.stars}</span>
                </div>
                <div className="mt-5 flex space-x-1">
                  <CircleUser className="-mt-0.5 size-5" />
                  <span className="-mt-1 text-base tracking-wide">
                    {
                      // slice out '#' from username
                      rev.author.username.slice(
                        0,
                        rev.author.username.indexOf("#"),
                      )
                    }
                    :
                  </span>
                </div>
              </CardTitle>
              <CardDescription>
                {rev.createdAt
                  .toLocaleString()
                  .slice(0, rev.createdAt.toLocaleString().indexOf("T"))}
              </CardDescription>
            </CardHeader>
            <CardContent>{rev.text}</CardContent>
            <CardContent>
              <span className="text-sm font-semibold">
                comments ({rev.Comments.length})
              </span>
            </CardContent>
            <CardFooter>
              <CommentList data={rev.Comments} />
            </CardFooter>
          </Card>
        ))}
      </main>
    );
  }
};
export default SingleBusiness;
