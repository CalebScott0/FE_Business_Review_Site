import { useEffect, useState } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const SingleBusinessPhotos = ({ businessId }) => {
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState(null);

  const [currentPhoto, setCurrentPhoto] = useState("");
  useEffect(() => {
    (async () => {
      setError(null);
      try {
        const response = await fetch(
          `https://api-business-review-site.onrender.com/api/businesses/${businessId}/photos`,
        );
        const json = await response.json();
        setPhotos(json.photos);
        // set initial display photos
        setCurrentPhoto(json.photos[0]);
      } catch (error) {
        console.log(error);
        setError("Failed to load photos, please try again.");
      }
    })();
  }, [businessId]);

  if (error) return <p>{error}</p>;

  if (photos.length > 0) {
    // moved handlePhotoClick to top to set currentPhotoIndex after click
    const handlePhotoClick = (photo) => {
      setCurrentPhoto(photo);
    };
    // find index of current photo
    const currentPhotoIndex = photos.findIndex(
      (photo) => photo.id === currentPhoto.id,
    );
    // splice out current photo from photo array and copy to a new array
    const photosSubArray = photos.toSpliced(currentPhotoIndex, 1);

    return (
      <div className="ml-10 w-full">
        {/* ADD ALT AND ATTRIBUTES TO IMAGE */}

        {/* show first photo on render and currentPhoto on click */}
        <figure class="flex space-x-6">
          <img
            src={`https://cbs062-review-site-photos.s3.us-east-2.amazonaws.com/photos/${currentPhoto.id}.jpg`}
            alt={currentPhoto.label}
            className="size-[500px] max-w-lg border object-cover shadow-lg shadow-secondary"
          />
          {currentPhoto.caption && (
            <figcaption className="box-border max-w-[400px] self-end rounded-lg border bg-secondary px-6 py-3 border-dotted shadow-lg shadow-secondary">
              {currentPhoto.caption}
            </figcaption>
          )}
        </figure>
        <Carousel className="mt-2 w-full max-w-lg">
          <CarouselContent>
            {photosSubArray.map((photo, idx) => (
              <CarouselItem
                key={idx}
                className="pl-4 md:basis-1/3 lg:basis-1/5"
              >
                <img
                  className="box-border size-20 cursor-pointer border object-cover hover:scale-125 shadow-md shadow-secondary"
                  onClick={() => handlePhotoClick(photo)}
                  src={`https://cbs062-review-site-photos.s3.us-east-2.amazonaws.com/photos/${photo.id}.jpg`}
                  alt={photo.label}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    );
  }
};

export default SingleBusinessPhotos;
