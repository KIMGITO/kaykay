import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Milk, Factory, Heart, Truck } from "lucide-react";

export default function Products() {
    return (
      <div>
        <section className="relative z-10 py-20 bg-gradient-to-tr bg-red-300 to-blue-950">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-white mb-12">
              Our Dairy Products & Services
            </h2>

            <Carousel
              plugins={[Autoplay({ delay: 3000 })]}
              opts={{ loop: true }}
              className="w-full"
            >
              <CarouselContent className="-ml-1">
                {/* Product 1 - Fresh Milk */}
                <CarouselItem className="pl-1 basis-full sm:basis-1/2 lg:basis-1/3">
                  <div className="p-2">
                    <Card className="border-blue-50 shadow-sm hover:shadow-md transition-all">
                      <CardContent className="p-6 flex flex-col items-center">
                        <div className="w-24 h-24 rounded-full bg-blue-400 flex items-center justify-center mb-4">
                          <Milk className="text-violet-600" size={48} />
                        </div>
                        <h3 className="text-xl font-semibold text-blue-900 mb-2">
                          Fresh Milk
                        </h3>
                        <p className="text-blue-800 text-center mb-4">
                          Pasteurized whole milk from grass-fed cows, delivered
                          fresh daily.
                        </p>
                        <Button className="bg-blue-700 hover:bg-blue-800 text-white">
                          Brows Products
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>

                {/* Product 2 - Organic Yogurt */}
                <CarouselItem className="pl-1 basis-full sm:basis-1/2 lg:basis-1/3">
                  <div className="p-2">
                    <Card className="border-blue-50 shadow-sm hover:shadow-md transition-all">
                      <CardContent className="p-6 flex flex-col items-center">
                        <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                          {/* <Cow className="text-blue-700" size={48} /> */}
                        </div>
                        <h3 className="text-xl font-semibold text-blue-900 mb-2">
                          Organic Yogurt
                        </h3>
                        <p className="text-blue-800 text-center mb-4">
                          Creamy probiotic yogurt with live cultures, available
                          in multiple flavors.
                        </p>
                        <Button className="bg-blue-700 hover:bg-blue-800 text-white">
                          View Details
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>

                {/* Product 3 - Artisan Cheese */}
                <CarouselItem className="pl-1 basis-full sm:basis-1/2 lg:basis-1/3">
                  <div className="p-2">
                    <Card className="border-blue-50 shadow-sm hover:shadow-md transition-all">
                      <CardContent className="p-6 flex flex-col items-center">
                        <div className="w-24 h-24 rounded-full bg-pink-700 flex items-center justify-center mb-4">
                          <Factory className="text-pink-100" size={48} />
                        </div>
                        <h3 className="text-xl font-semibold text-blue-900 mb-2">
                          Artisan Cheese
                        </h3>
                        <p className="text-blue-800 text-center mb-4">
                          Handcrafted cheeses aged to perfection in our dairy
                          cellars.
                        </p>
                        <Button className="bg-blue-700 hover:bg-blue-800 text-white">
                          View Details
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>

                {/* Product 4 - Butter */}
                <CarouselItem className="pl-1 basis-full sm:basis-1/2 lg:basis-1/3">
                  <div className="p-2">
                    <Card className="border-blue-50 shadow-sm hover:shadow-md transition-all">
                      <CardContent className="p-6 flex flex-col items-center">
                        <div className="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center mb-4">
                          <Heart className="text-red-700" size={48} />
                        </div>
                        <h3 className="text-xl font-semibold text-blue-900 mb-2">
                          Farm Mala
                        </h3>
                        <p className="text-blue-800 text-center mb-4">
                          Rich, creamy mala from.
                        </p>
                        <Button className="bg-blue-700 hover:bg-blue-800 text-white">
                          View Details
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>

                {/* Product 5 - Ice Cream */}
                <CarouselItem className="pl-1 basis-full sm:basis-1/2 lg:basis-1/3">
                  <div className="p-2">
                    <Card className="border-blue-50 shadow-sm hover:shadow-md transition-all">
                      <CardContent className="p-6 flex flex-col items-center">
                        <div className="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center mb-4">
                          <Truck className="text-pink-600" size={48} />
                        </div>
                        <h3 className="text-xl font-semibold text-blue-900 mb-2">
                          Milk Delivery
                        </h3>
                        <p className="text-blue-800 text-center mb-4">
                          Small-batch ice cream made with real milk and natural
                          ingredients.
                        </p>
                        <Button className="bg-blue-700 hover:bg-blue-800 text-white">
                          View Details
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              </CarouselContent>

              {/* Custom navigation positioned at bottom center */}
              <div className="mt-8 flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((_, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="w-2 h-2 p-0 rounded-full border-blue-300"
                    onClick={() => {}}
                  />
                ))}
              </div>
            </Carousel>
          </div>
        </section>
      </div>
    );   
}