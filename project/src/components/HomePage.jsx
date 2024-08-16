import { ModeToggle } from "@/components/ModeToggle";
import { CarouselTemplate } from "@/components/Carousel";

const HomePage = () => {
  const imageArr = [
    {
      src: "../../assets/home-page-pic-1.png",
      alt: "A shopping center.",
    },
    {
      src: "../../assets/home-page-pic-2.png",
      alt: "A table at a nice restaurant.",
    },
    {
      src: "../../assets/home-page-pic-3.png",
      alt: "A group of people doing yoga in a park",
    },
    {
      src: "../../assets/home-page-pic-4.png",
      alt: "A plumber working in a home",
    },
    {
      src: "../../assets/home-page-pic-5.png",
      alt: "An auto repair shop",
    },
  ];
  return (
    <div className="mt-10">
        <ModeToggle />
      <CarouselTemplate imageArr={imageArr} />
    </div>
  );
};
export default HomePage;
