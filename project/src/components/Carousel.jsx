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
    className = "w-full"
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
            <div className="p-1">
              <CarouselContent className="flex aspect-square">
                <img className="max-h-[600px] w-full object-fill" src={image.src} alt={image.alt} />
              </CarouselContent>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
