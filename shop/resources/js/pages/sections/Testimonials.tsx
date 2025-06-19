import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Milk, UserCircle2 } from "lucide-react";
import * as React from "react";

export default function Testimonials() {
     const plugin = React.useRef(
       Autoplay({ delay: 9000, stopOnInteraction: true })
     );

    return (
        <section className="relative z-10 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">
          What Our Customers Say
        </h2>

        <Carousel
          plugins={[plugin.current]}
          className="w-full max-w-4xl mx-auto"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent className="-ml-1">
            {/* Testimonial 1 */}
            <CarouselItem className="pl-1 basis-full sm:basis-1/2 lg:basis-1/3">
              <div className="p-2">
                <Card className="border-blue-100 shadow-sm carousel-item">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                        {/* <UserCircle2 className="text-blue-700" size={28} /> */}
                        <img src="/images/image.png" className="rounded-full" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-900">
                          Sarah Johnson
                        </h4>
                        <span className=" text-yellow-400">
                          {[...Array(4)].map((_, i) => (
                            <span key={i}>★</span>
                          ))}
                        </span>
                        <span className="text-gray-400">★</span>
                      </div>
                    </div>
                    <p className="text-blue-800 italic">
                      "KayKay's milk is the freshest I've ever tasted! My family
                      won't drink any other brand now. The home delivery is so
                      convenient too."
                    </p>
                    <div className="mt-4 flex items-center text-blue-600">
                      <Milk size={18} className="mr-1" />
                      <span className="text-sm">
                        Regular Customer for 2 years
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>

            {/* Testimonial 2 */}
            <CarouselItem className="pl-1 basis-full sm:basis-1/2 lg:basis-1/3">
              <div className="p-2">
                <Card className="border-blue-100 shadow-sm carousel-item">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                        <UserCircle2 className="text-blue-700" size={28} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-900">
                          Michael Chen
                        </h4>
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <span key={i}>★</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-blue-800 italic">
                      "As a coffee shop owner, quality milk is essential.
                      KayKay's dairy products have transformed our lattes -
                      customers can taste the difference!"
                    </p>
                    <div className="mt-4 flex items-center text-blue-600">
                      <Milk size={18} className="mr-1" />
                      <span className="text-sm">Business Customer</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>

            {/* Testimonial 3 */}
            <CarouselItem className="pl-1 basis-full sm:basis-1/2 lg:basis-1/3">
              <div className="p-2">
                <Card className="border-blue-100 shadow-sm carousel-item">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                        <UserCircle2 className="text-blue-700" size={28} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-900">
                          The Ramirez Family
                        </h4>
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <span key={i}>★</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-blue-800 italic">
                      "We love the variety of dairy products. The kids enjoy the
                      flavored milks while we appreciate the organic options.
                      Truly a family favorite!"
                    </p>
                    <div className="mt-4 flex items-center text-blue-600">
                      <Milk size={18} className="mr-1" />
                      <span className="text-sm">Subscribers for 1 year</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>

            {/* Testimonial 4 */}
            <CarouselItem className="pl-1 basis-full sm:basis-1/2 lg:basis-1/3">
              <div className="p-2">
                <Card className="border-blue-100 shadow-sm carousel-item">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                        <UserCircle2 className="text-blue-700" size={28} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-900">
                          Emma Wilson
                        </h4>
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <span key={i}>★</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-blue-800 italic">
                      "The organic yogurt is incredible! I've tried many brands,
                      but none compare to KayKay's in terms of taste and
                      texture."
                    </p>
                    <div className="mt-4 flex items-center text-blue-600">
                      <Milk size={18} className="mr-1" />
                      <span className="text-sm">Yogurt Lover</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          </CarouselContent>

          <div className="mt-8 flex justify-center gap-4">
            <CarouselPrevious className="relative left-0 top-0 translate-y-0 bg-white/80 hover:bg-white text-blue-900 border-blue-200" />
            <CarouselNext className="relative right-0 top-0 translate-y-0 bg-white/80 hover:bg-white text-blue-900 border-blue-200" />
          </div>
        </Carousel>
      </div>
    </section>
    )
}