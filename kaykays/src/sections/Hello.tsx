import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@radix-ui/react-collapsible";
import Autoplay from "embla-carousel-autoplay";

const dairyProducts = [
  {
    name: "🥛 Fresh, creamy, and pure — straight from the farm.",
    icon: "/images/fam.png",
  },
  {
    name: "Organic Yogurt",
    icon: "/images/fam.png",
  },
  {
    name: "Artisan Cheese",
    icon: "/images/worker.png",
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
        <main className="relative z-10 container mx-auto  flex flex-col-reverse lg:flex-row items-start md:justify-between  gap-6 p-0 min-h-screen">
          {/* Left Content */}
          <div className="w-full lg:w-5/12 items-start ">
            <Card className=" backdrop-blur-sm border-blue-100 shadow-0">
              <CardContent className="p-8">
                <div className="flex items-center justify-start">
                  <h2 className="text-2xl font-mono text-end md:text-2xl lg:text-5xl font-bold text-black">
                    About
                  </h2>
                  <img src="/images/milky.png" className="w-20 md:w-35  " />
                </div>
                <blockquote className="mt-4 font-serif">
                  <Collapsible>
                    <CollapsibleTrigger>
                      <span className="font-bold">Our mission:</span>
                      <blockquote className="mt-6 border-l-2 pl-6 italic bg-red-200">
                        &quot;Fresh, Quality with no Shortcuts products.,&quot;
                      </blockquote>
                      ...
                    </CollapsibleTrigger>
                    <CollapsibleContent className="text-muted-foreground text-xl">
                      Since 2023, Kay Kay’s Dairy has proudly delivered fresh,
                      high-quality milk straight from our own farm. Every drop
                      of milk is produced through a fully automated, hygienic
                      milking process that guarantees purity and safety. We
                      serve both individual households and trusted institutions,
                      earning a strong reputation for consistency, quality, and
                      reliability.
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
          <div className="w-full lg:w-7/12 items-start ">
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
                        <img
                          src={dairyProducts[index].icon}
                          alt="KayKay's Dairy Logo"
                          className="w-full  object-cover"
                        />
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