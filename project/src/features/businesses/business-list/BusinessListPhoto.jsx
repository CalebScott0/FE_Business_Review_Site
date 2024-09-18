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
        // const response = await fetch(
        //   `${BASE_URL}/businesses/${business.id}/photos`,
        // );
      } catch (error) {}
      setIsLoading(false);
    })();
  });

  if (isLoading) return <Loader />;

  return (
    <img
      className="box-border size-full border object-cover"
      src={`https://cbs062-review-site-photos.s3.us-east-2.amazonaws.com/photos/${photo.id}.jpg`}
      alt={photo.label}
    />
  );
};

export default BusinessListPhoto;
