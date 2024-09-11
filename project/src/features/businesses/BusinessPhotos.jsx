import { useEffect, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const BusinessPhotos = ({ businessId }) => {
  const [photos, setPhotos] = useState([]);
  const [currentPhoto, setCurrentPhoto] = useState("");
  useEffect(() => {
    (async function () {
      try {
        const response = await fetch(
          `http://localhost:8080/api/businesses/${businessId}/photos`,
        );
        const json = await response.json();
        setPhotos(json.photos);
        // set initial display photos
        setCurrentPhoto(json.photos[0].id);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [businessId]);
  if (photos.length !== 0) {
    // moved handlePhotoClick to top to set currentPhotoIndex after click
    const handlePhotoClick = (id) => {
      setCurrentPhoto(id);
    };
    // find index of current photo
    const currentPhotoIndex = photos.findIndex(
      (photo) => photo.id === currentPhoto,
    );
    // splice out current photo from photo array and copy to a new array
    const photosSubArray = photos.toSpliced(currentPhotoIndex, 1);

    return (
      <div className="ml-10 w-full max-w-lg">
        {/* ADD ALT AND ATTRIBUTES TO IMAGE */}

        {/* show first photo on render and currentPhoto on click */}
        <img
          src={`../../../photos/${currentPhoto}.jpg`}
          className="w-full max-w-lg border object-cover"
        />
        <Carousel className="mt-2 w-full">
          <CarouselContent>
            {photosSubArray.map((photo, idx) => (
              <CarouselItem
                key={idx}
                className="pl-4 md:basis-1/3 lg:basis-1/5"
              >
                <img
                  className="box-border size-20 cursor-pointer border object-cover hover:-translate-y-2 hover:scale-125 hover:shadow-md"
                  onClick={() => handlePhotoClick(photo.id)}
                  src={`../../../photos/${photo.id}.jpg`}
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

export default BusinessPhotos;
