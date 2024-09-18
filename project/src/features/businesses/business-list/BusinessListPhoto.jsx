import Loader from "@/components/Loader";
import { Separator } from "@/components/ui/separator";
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

  if (isLoading)
    return (
      <div className="size-72 flex items-end text-center">
      <Loader />
    </div>
    );

  if (error)
    return <p className="mt-2 text-center text-destructive">{error}</p>;

  return (
    // <figure className="flex flex-col">
    <img
      className="mt-12 box-border size-72 rounded-sm border object-cover"
      src={`https://cbs062-review-site-photos.s3.us-east-2.amazonaws.com/photos/${photo.id}.jpg`}
      alt={photo.label}
    />
    // {photo.caption && (
    // <figcaption className="mt-3 flex">

    //   <Separator orientation="" className="mx-2 h-3/5 px-0.5" />
    //   <q className="mb-3 line-clamp-3 cursor-text leading-7 tracking-wider">
    //     {photo.caption}
    //   </q>
    // </figcaption>
    // )}
    // </figure>
  );
};

export default BusinessListPhoto;
