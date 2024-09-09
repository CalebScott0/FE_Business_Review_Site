import { useEffect, useState } from "react";

const BusinessPhotos = ({ businessId }) => {
  const [photos, setPhotos] = useState();

  useEffect(() => {
    (async function () {
      try {
        const response = await fetch(
          `http://localhost:8080/api/businesses/${businessId}/photos`,
        );
        const json = await response.json();
        setPhotos(json.photos);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [businessId]);

  return <p>photos</p>;
};

export default BusinessPhotos;
