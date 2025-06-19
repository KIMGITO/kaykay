import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@radix-ui/react-collapsible";
import Autoplay from "embla-carousel-autoplay";

import milkyImage from "/public/images/milky.png";
import familyImage from "/public/images/fam.png";
import workerImage from "/public/images/worker.png";
import mala from "/public/ads/family-mala.mp4";

const dairyProducts = [
  {
    name: "🥛 Fresh, creamy, and pure — straight from the farm.",
    icon: milkyImage,
  },
  {
    name: "Organic Yogurt",
    icon: familyImage,
  },
  {
    name: "Artisan Cheese",
    icon: workerImage,
  },
  {
    name: "Home Delivery",
    icon: "/images/fam.png",
  },
  {
    name: "Healthy Options",
    icon: "/images/worker.png",
  },
];


export default function Hello() {
    return (
      <div>
        <main className="relative z-10 container mx-auto bg-transparent flex flex-col-reverse lg:flex-row items-start md:justify-between  gap-6 p-0 min-h-screen">
          {/* Left Content */}
          <div className="w-full lg:w-5/12 items-start ">
            <Card className="  bg-transparent border-0 ring-0 shadow-0 ">
              <CardContent className="p-8">
                <div className="flex items-center justify-start">
                  <h2 className="text-2xl font-mono text-end md:text-2xl lg:text-5xl font-bold text-black">
                    About
                  </h2>
                  <img src="/images/milky.png" className="w-20 md:w-35  " />
                </div>
                <blockquote className="mt-4 ">
                  <Collapsible>
                    <CollapsibleTrigger>
                      <span className="font-bold">Our mission:</span>
                      <blockquote className="mt-6 border-l-2 pl-6 italic bg-card ">
                        &quot;Fresh, Quality with no Shortcuts products.,&quot;
                      </blockquote>
                      ...
                    </CollapsibleTrigger>
                    <CollapsibleContent className=" text-blue-200 leading-14 foreground text-4xl font-serif font-extralight ">
                      Since 2023, Kay Kay’s Dairy has proudly delivered fresh,
                      high-quality milk straight from our own farm.
                      
                    </CollapsibleContent>
                  </Collapsible>
                </blockquote>
                <div className="mt-6 flex flex-col sm:flex-row gap-4">
                  <Button className="bg-blue-700 hover:bg-blue-800 text-white">
                    Products Catalogue
                  </Button>
                  <Button
                    variant="outline"
                    className="border-blue-700 text-blue-700 hover:bg-blue-50"
                  >
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Carousel */}
          <div className="w-full lg:w-7/12 px-3 items-start ">
            <Carousel
              plugins={[Autoplay({ delay: 5000 })]}
              opts={{ loop: true }}
              className="w-full"
            >
              <CarouselContent>
                {[
                  "/images/milk.png",
                  "/milk-bottles.jpg",
                  "/cheese-selection.jpg",
                  "/yogurt-parfait.jpg",
                  "/delivery-truck.jpg",
                ].map((img, index) => (
                  <CarouselItem key={index}>
                    <div className="">
                      <CardContent className="">
                        {/* <img
                          src={dairyProducts[index].icon}
                          alt="KayKay's Dairy Logo"
                          className="w-full  object-cover"
                        /> */}

                        <video muted autoPlay loop src={mala} className="h-full"></video>
                        {/* <img src={mala}></img> */}
                      </CardContent>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2 bg-white/80  hover:bg-white text-blue-900" />
              <CarouselNext className="right-2 bg-white/80  hover:bg-white  text-blue-900" />
            </Carousel>
          </div>
        </main>
      </div>
    );
}