import { useParams } from "react-router-dom";
import { useGetBusinessByIdQuery } from "./businessSlice";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ReactStars from "react-rating-stars-component";
import { Badge } from "@/components/ui/badge";

const SingleBusiness = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetBusinessByIdQuery(id);
  if (data.business) {
    const reviews = data && data.business && data.business.Reviews.slice(0, 10);
    console.log("reviews", reviews);
    return (
      <div>
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex items-center space-x-2">
                <span className="text-2xl">{data.business.name}</span>
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
          <CardDescription className="ml-2">
            {`
            ${data.business.address} 
            ${data.business.city}, 
            ${data.business.state} 
            ${data.business.zipCode}
            `}
          </CardDescription>
        </Card>
          {reviews.map((rev) => (
            <Card key={rev.id}>
                <CardContent>{rev.text}</CardContent>
            </Card>
          ))}
      </div>
    );
  }
};
export default SingleBusiness;
