import {
  ShoppingBasketIcon,
  UserCircle2,
  Milk,
  Factory,
  Truck,
  Heart,
  Baby,
} from "lucide-react";
import { Button } from "./components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "./components/ui/hover-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./components/ui/carousel";
import { Card, CardContent } from "./components/ui/card";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

export default function LoginPage() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );

  const dairyProducts = [
    { name: "Fresh Milk", icon: <Milk className="text-blue-50" size={40} /> },
    {
      name: "Organic Yogurt",
      icon: <Baby className="text-blue-50" size={40} />,
    },
    {
      name: "Artisan Cheese",
      icon: <Factory className="text-blue-50" size={40} />,
    },
    {
      name: "Home Delivery",
      icon: <Truck className="text-blue-50" size={40} />,
    },
    {
      name: "Healthy Options",
      icon: <Heart className="text-blue-50" size={40} />,
    },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-pink-200-50 to-amber-800 overflow-hidden">
      {/* Milky Wave Background */}
      <svg
        className="absolute inset-0 w-full h-full z-0 opacity-20"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="milkGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#e0f2fe" stopOpacity="0.8" />
          </linearGradient>
          <pattern
            id="milkPattern"
            patternUnits="userSpaceOnUse"
            width="100"
            height="100"
          >
            <circle cx="20" cy="20" r="3" fill="#fcba03" opacity="0.6" />
            <circle cx="50" cy="50" r="4" fill="#ffffff" opacity="0.6" />
            <circle cx="80" cy="20" r="2" fill="#ffffff" opacity="0.6" />
          </pattern>
        </defs>
        <path
          fill="url(#milkGradient)"
          d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
        <path
          fill="url(#milkPattern)"
          d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          opacity="0.3"
        ></path>
      </svg>

      {/* Header */}
      <header className="relative z-10 container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center justify-between w-full md:w-auto">
          <div className="text-blue-900">
            <div className="flex items-center gap-2">
              {/* Image */}
              {/* <img
                src="/images/kaykay.png"
                alt="KayKay's Dairy Logo"
              /> */}
              <h1 className="text-5xl font-bold">KayKay's Dairy</h1>
            </div>
            <p className="mt-1 hidden md:block text-blue-700">
              Farm Fresh Milk & Products
            </p>
          </div>
          <Button
            size={"sm"}
            className="rounded-full bg-white text-blue-800 md:hidden"
          >
            <ShoppingBasketIcon size={24} />
          </Button>
        </div>

        <nav className="hidden md:flex items-center gap-6 mt-4 md:mt-0">
          {["Home", "Products", "About", "Delivery", "Contact"].map((item) => (
            <HoverCard key={item}>
              <HoverCardTrigger>
                <Button
                  variant="ghost"
                  className="text-blue-900 hover:text-blue-700 hover:bg-blue-50"
                >
                  {item}
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className="bg-white border-blue-100">
                Learn about our {item.toLowerCase()} options
              </HoverCardContent>
            </HoverCard>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Button className="rounded-full bg-white text-blue-800">
            <ShoppingBasketIcon size={24} />
          </Button>
          <Button className="bg-blue-700 hover:bg-blue-800 text-white">
            Sign In
          </Button>
        </div>
      </header>

      {/* Horizontal Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-8 flex flex-col-reverse lg:flex-row items-center justify-between gap-8">
        {/* Left Content */}
        <div className="w-full lg:w-1/2">
          <Card className=" backdrop-blur-sm border-blue-100 shadow-0">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-mono text-end md:text-2xl lg:text-5xl font-bold text-blue-900">
                  Pure Dairy Goodness
                </h2>
              </div>
              <p className="mt-4 text-blue-800 leading-tight">
                From our family farm to your table - experience the freshest
                milk, cheese, and yogurt with 100% natural ingredients and no
                additives.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <Button className="bg-blue-700 hover:bg-blue-800 text-white">
                  Shop Products
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

          {/* Product Highlights */}
          {/* <div className="mt-8 grid grid-cols-2 sm:grid-cols-5 gap-4">
            {dairyProducts.map((product, index) => (
              <Card
                key={index}
                className="bg-blue-600/90 border-blue-500 text-center"
              >
                <CardContent className="p-4 flex flex-col items-center">
                  <div className="p-3 bg-blue-700 rounded-full mb-2">
                    {product.icon}
                  </div>
                  <p className="text-blue-50 font-medium">{product.name}</p>
                </CardContent>
              </Card>
            ))}
          </div> */}
        </div>

        {/* Right Carousel */}
        <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
          <Carousel
            plugins={[plugin.current]}
            className="w-full"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent>
              {[
                "/dairy-farm.jpg",
                "/milk-bottles.jpg",
                "/cheese-selection.jpg",
                "/yogurt-parfait.jpg",
                "/delivery-truck.jpg",
              ].map((img, index) => (
                <CarouselItem key={index}>
                  <div className="p-2">
                    <Card className="border-0 shadow-xl overflow-hidden">
                      <CardContent className="p-0 aspect-video  flex items-center justify-center">
                        {/* Replace with actual images */}
                        <div className="w-full h-full flex items-center justify-center ">
                          <span className="text-2xl font-semibold text-blue-900">
                            {dairyProducts[index].name}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 bg-white/80  hover:bg-white text-blue-900" />
            <CarouselNext className="right-2 bg-white/80  hover:bg-white  text-blue-900" />
          </Carousel>
        </div>
      </main>

      {/* Testimonials Section */}
      <section className="relative z-10  py-16">
        <div className="container mx-auto px-4">
          
          {/* Testimonials Section */}
          <section className="relative z-10 bg-amber-600 py-16">
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
                              <UserCircle2
                                className="text-blue-700"
                                size={28}
                              />
                            </div>
                            <div>
                              <h4 className="font-semibold text-blue-900">
                                Sarah Johnson
                              </h4>
                              <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                  <span key={i}>★</span>
                                ))}
                              </div>
                            </div>
                          </div>
                          <p className="text-blue-800 italic">
                            "KayKay's milk is the freshest I've ever tasted! My
                            family won't drink any other brand now. The home
                            delivery is so convenient too."
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
                              <UserCircle2
                                className="text-blue-700"
                                size={28}
                              />
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
                            KayKay's dairy products have transformed our lattes
                            - customers can taste the difference!"
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
                              <UserCircle2
                                className="text-blue-700"
                                size={28}
                              />
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
                            "We love the variety of dairy products. The kids
                            enjoy the flavored milks while we appreciate the
                            organic options. Truly a family favorite!"
                          </p>
                          <div className="mt-4 flex items-center text-blue-600">
                            <Milk size={18} className="mr-1" />
                            <span className="text-sm">
                              Subscribers for 1 year
                            </span>
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
                              <UserCircle2
                                className="text-blue-700"
                                size={28}
                              />
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
                            "The organic yogurt is incredible! I've tried many
                            brands, but none compare to KayKay's in terms of
                            taste and texture."
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

          {/* Footer */}

          
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-amber-800/90 text-blue-50 py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 KayKay's Dairy. All rights reserved.</p>
          <p className="mt-2 text-blue-200">Farm to Table - Since 1985</p>
        </div>
      </footer>
    </div>
  );
}
