import Loader from "@/components/Loader";
import { useEffect, useState } from "react";

const BusinessListPhoto = ({ businessId, BASE_URL }) => {
  const [photo, setPhoto] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setError(null);
      setIsLoading(true);
      try {
        // grab photos for a business, set state to first photo object
        const response = await fetch(
          `${BASE_URL}/businesses/${businessId}/photos`,
        );
        const json = await response.json();
        // order of photo label priority to display
        setPhoto(
          json.photos.find(
            ({ label }) =>
              label.includes("outside") ||
              label.includes("food") ||
              label.includes("inside") ||
              label.includes("menu") ||
              label.includes("drink"),
          ),
        );
      } catch (error) {
        setError("Unable to load photo");
      }
      setIsLoading(false);
    })();
  }, []);

  if (isLoading) return <Loader />;

  if (error) return <p className="text-enter mt-2 text-destructive">{error}</p>;

  return (
    <div className="flex">
      <img
        className="box-border size-72 border object-cover"
        src={`https://cbs062-review-site-photos.s3.us-east-2.amazonaws.com/photos/${photo.id}.jpg`}
        alt={photo.label}
      />
      <p className="mx-3 text-center">{photo.caption}</p>
    </div>
  );
};

export default BusinessListPhoto;
