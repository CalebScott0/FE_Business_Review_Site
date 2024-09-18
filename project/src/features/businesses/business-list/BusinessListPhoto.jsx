import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";

const BusinessListPhoto = ({ businessId, BASE_URL }) => {
  const [photo, setPhoto] = useState();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
      } catch (error) {}
    })();
  });

  return (
    <div className="flex space-x-2">
      <img
        className="box-border size-24 border object-cover"
        src={`s3://cbs062-review-site-photos/photos/${business.photos[0].id}.jpg`}
        alt={business.photos[0].label}
      />
      <Badge
        variant="outline"
        className={`h-fit text-muted ${business.isOpen ? "bg-emerald-500" : "bg-destructive"}`}
      >
        {business.isOpen ? "Open" : "Closed"}
      </Badge>
    </div>
  );
};

export default BusinessListPhoto;
