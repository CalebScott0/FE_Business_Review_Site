import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export const CarouselTemplate = ({ imageArr }) => {
  return (
    <Carousel
      className="w-full max-w-xs"
      opts={{
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]}
    >
      <CarouselContent className="">
        {imageArr.map((image, index) => (
          <CarouselItem key={index}>
            <CarouselContent className="flex aspect-square">
              <img src={image.src} alt={image.alt} />
            </CarouselContent>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
