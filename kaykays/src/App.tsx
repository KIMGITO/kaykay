import {
  ShoppingBasketIcon,
  UserCircle2,
  Milk,
  Factory,
  Truck,
  Heart,
  Baby,
  MapPinned,
  MoreVerticalIcon,
  SearchIcon,
  Phone,
  X,
  Twitter,
  Facebook,
  PhoneCall,
  Instagram,
  MapPin,
  SendHorizonal,
  Mail,
  TimerIcon,
  MessageCircleMore,
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
import { MainNavigation } from "./sections/MainNav";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./components/ui/collapsible";
import { Link } from "@radix-ui/react-navigation-menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTelegram,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./components/ui/popover";
import { LeaveMessageForm } from "./components/leave-message-form";

export default function LoginPage() {
  const plugin = React.useRef(
    Autoplay({ delay: 9000, stopOnInteraction: true })
  );

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

  const menuItems = [
    {
      title: "Home",
      href: "/",
      description: "Welcome to KayKay's Dairy",
      subItems: [
        {
          title: "Welcome",
          href: "/",
          description: "Discover our farm fresh products",
        },
        {
          title: "Special Offers",
          href: "/offers",
          description: "Current promotions and discounts",
        },
        {
          title: "Our Story",
          href: "/story",
          description: "Learn about our dairy farm history",
        },
      ],
    },
    {
      title: "Products",
      href: "/products",
      description: "Our farm fresh offerings",
      subItems: [
        {
          title: "Milk Products",
          href: "/products/milk",
          description: "Fresh milk varieties",
        },
        {
          title: "Cheese",
          href: "/products/cheese",
          description: "Artisanal cheese selection",
        },
        {
          title: "Yogurt",
          href: "/products/yogurt",
          description: "Creamy yogurt options",
        },
        {
          title: "Specialty Items",
          href: "/products/specialty",
          description: "Seasonal and specialty products",
        },
      ],
    },
    {
      title: "About",
      href: "/about",
      description: "Learn about our farm",
      subItems: [
        {
          title: "Our Farm",
          href: "/about/farm",
          description: "See where our products come from",
        },
        {
          title: "Sustainability",
          href: "/about/sustainability",
          description: "Our eco-friendly practices",
        },
        {
          title: "Team",
          href: "/about/team",
          description: "Meet the people behind our dairy",
        },
      ],
    },
    {
      title: "Delivery",
      href: "/delivery",
      description: "How we get products to you",
      subItems: [
        {
          title: "Areas Covered",
          href: "/delivery/areas",
          description: "Check if we deliver to your location",
        },
        {
          title: "Schedule",
          href: "/delivery/schedule",
          description: "Delivery days and times",
        },
        {
          title: "Subscription",
          href: "/delivery/subscription",
          description: "Regular delivery options",
        },
      ],
    },
    {
      title: "Contact",
      href: "/contact",
      description: "Get in touch with us",
      subItems: [
        {
          title: "Visit Us",
          href: "/contact/visit",
          description: "Farm location and visiting hours",
        },
        {
          title: "Customer Service",
          href: "/contact/service",
          description: "Questions and support",
        },
        {
          title: "Wholesale",
          href: "/contact/wholesale",
          description: "Inquiries for businesses",
        },
      ],
    },
  ];

  const [showMobileSearch, setShowMobileSearch] = React.useState(false);
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
            <stop offset="0%" stopColor="#fd78ff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#db0f79" stopOpacity="0.8" />
          </linearGradient>
          <pattern
            id="milkPattern"
            patternUnits="userSpaceOnUse"
            width="100"
            height="100"
          >
            <circle cx="20" cy="20" r="3" fill="#fcba03" opacity="0.6" />
            <circle cx="50" cy="50" r="4" fill="#ff99e4" opacity="0.6" />
            <circle cx="80" cy="20" r="2" fill="#d61e5b" opacity="0.6" />
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
      <header className="container mx-auto flex flex-col md:flex-row justify-between items-center   relative ">
        {/* Logo and Mobile Menu */}
        <div className="flex items-center justify-between md:justify-center w-full md:w-1/6 ">
          <div className="flex items-center gap-2 text-blue-900">
            {/* Mobile Menu Button */}
            <Button variant={"ghost"} className="rounded-full md:hidden">
              <MoreVerticalIcon />
            </Button>

            {/* Logo - Responsive sizing */}
            <div>
              <img
                src="/images/milky.png"
                alt="KayKay's Dairy Logo"
                className="w-28 md:w-35"
              />
            </div>
          </div>

          {/* Mobile Icons */}
          <div className="flex items-center gap-2 md:hidden">
            <Button
              variant={"ghost"}
              className="px-2"
              onClick={() => setShowMobileSearch(!showMobileSearch)}
            >
              <SearchIcon size={20} />
            </Button>
            <Button variant={"ghost"} className="px-2">
              <MapPinned color="blue" size={24} className="animate-bounce" />
            </Button>
            <Button size={"sm"} className="rounded-full bg-white text-blue-800">
              <ShoppingBasketIcon size={20} />
            </Button>
          </div>
        </div>

        <div className="hidden md:w-5/6 md:block">
          <MainNavigation />
        </div>

        {/* Desktop Search and Icons */}

        {/* Mobile Search - Conditionally shown */}
        {showMobileSearch && (
          <div className="w-full mt-2 px-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-4 py-2 rounded-full border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <SearchIcon className="absolute right-3 top-2.5 text-blue-400" />
            </div>
          </div>
        )}
      </header>

      {/* Horizontal Main Content */}
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
                    high-quality milk straight from our own farm. Every drop of
                    milk is produced through a fully automated, hygienic milking
                    process that guarantees purity and safety. We serve both
                    individual households and trusted institutions, earning a
                    strong reputation for consistency, quality, and reliability.
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

      {/* Our Products Section */}
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
                        Creamy probiotic yogurt with live cultures, available in
                        multiple flavors.
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

      {/* Testimonials Section */}
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
                          <img
                            src="/images/image.png"
                            className="rounded-full"
                          />
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
                        "We love the variety of dairy products. The kids enjoy
                        the flavored milks while we appreciate the organic
                        options. Truly a family favorite!"
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
                        "The organic yogurt is incredible! I've tried many
                        brands, but none compare to KayKay's in terms of taste
                        and texture."
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

      {/* Footer */}
      <footer className=" hidden  md:flex  relative z-10  shadow-2xl shadow-gray-900 text-blue-50">
        <div className="flex py-5 flex-col items-center justify-center w-4/12 bg-gradient-to-r bg-amber-800/60 to-red-200/90 ">
          <img src="/images/milky.png" className="w-30" />
          <p className=" font-serif font-light muted ">
            Pure Quality. No Shortcuts.
          </p>
          <Popover>
            <PopoverTrigger>
              <Button variant={"outline"} className="hover:bg-blue-600">
                Leave A Message <SendHorizonal />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="border-0">
              <LeaveMessageForm />
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex flex-col items-center justify-center w-4/12 border-s-2 bg-red-200/90 border-black border-e-2">
          {/* <p className="font-bold text-2xl text-black">KayKay's Contacts</p> */}

          <div className="flex flex-col justify-between gap-3">
            <div className="flex items-start gap-4">
              <div className="mt-1 rounded-full bg-blue-100 p-2">
                <Mail className="h-5 w-5 text-blue-600" />
              </div>
              <div className="text-blue-400">
                <h4 className="font-medium">Email us</h4>
                <p className="text-sm text-muted-foreground">
                  <a className="hover:underline" href="mailto:kaykay@gmail.com">
                    kaykay@gmail.com
                  </a>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="mt-1 rounded-full bg-amber-100 p-2">
                <Phone className=" hover:underline h-5 w-5 text-amber-600 " />
              </div>
              <div className=" text-amber-600">
                <h4 className="font-medium">Call us</h4>
                <p className="text-sm text-muted-foreground">
                  <a className="hover:underline" href="tel:+254712345678">
                    {" "}
                    +254 (712) 123-456
                  </a>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className=" rounded-full bg-green-900 p-2">
                {/* <MapPin className="h-5 w-5 text-green-600" /> */}
                <FontAwesomeIcon icon={faWhatsapp} className="w-5 h-1" />
              </div>
              <div className=" text-green-600">
                <h4 className="font-medium">WhatsApp us</h4>
                <p className="text-sm text-muted-foreground">
                  <a
                    href="https://wa.me/15551234567"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    Order Via WhatsApp
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center text-black justify-center w-4/12 py-6 bg-gradient-to-r bg-red-200/90 to-amber-800/60 ">
          <a
            href="https://maps.app.goo.gl/81FDZLzHsfRTs8eH9"
            target="_blank"
            rel="noopener noreferrer"
            className="flex text-blue-700"
          >
            <Button className="bg-amber-50 rounded-full  cursor-pointer ">
              <MapPin className="bg-green-300  rounded-full " size={50} /> Visit
            </Button>{" "}
          </a>
          <p className="text-center ">
            Located at Four Ways Village Off Kiambu Road
          </p>
          <p className="text-sm mt-2 underline flex items-center font-bold text-blue-600">
            {" "}
            Business Hours:
          </p>
          <ul className="text-sm mt-1 list-disk">
            <li>
              {" "}
              <span className="font-bold">Mon to Sat:</span>{" "}
              <span className="underline">7:15 AM - 7:30 PM</span>
            </li>
            <li>
              <span className="font-bold">Sunday:</span>{" "}
              <span className="underline">2:00 PM - 5:00 PM </span>
            </li>
          </ul>

          {/* <p className="text-sm mt-2">
            &copy; {new Date().getFullYear()} KayKay's Dairy. All rights reserved.
          </p> */}
        </div>
      </footer>

      <footer className="md:hidden ">
        <div className="flex flex-col items-center justify-center rounded-t-2xl shadow-2xl shadow-neutral-950 bg-gradient-to-r from-amber-800 to-red-200 py-3 ">
          <img src="/images/milky.png" className="w-30 mb-2" />
          <p className="text-sm text-blue-900 font-light  text-center">
            KayKay's Pure Quality No short cuts.
            <a
              href="http://"
              target="_blank"
              rel="noopener noreferrer "
              className="underline"
            >
              <div className="my-5"></div>

              <p className="">Located at four ways</p>
              <p>Off Kiambu Road</p>
            </a>
          </p>
          <p>
            <div className="my-10"></div>

            <a
              href="mailto:kaykay@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex text-blue-700"
            >
              {" "}
              <Mail className="text-blue-400" />{" "}
              <span className="mx-4">kaykay@gmail.com</span>
            </a>
          </p>
          <div className="flex gap-4 my-5 ">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <PhoneCall
                size={24}
                className="text-blue-500 hover:text-blue-700"
              />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook
                size={24}
                className="text-blue-700 hover:text-blue-900"
              />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* <Instagram size={24} className="text-pink-600 hover:text-pink-800" /> */}
              <MessageCircleMore className="text-green-600 hover:text-green-300" />
              {/* <FontAwesomeIcon icon={faWhatsapp} className="" size="2x" /> */}
            </a>
          </div>

          <Popover>
            <PopoverTrigger>
              <Button
                className="px-4 hover:bg-blue-400 w-auto"
                size={"sm"}
                variant={"outline"}
              >
                Leave A Message <SendHorizonal />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="border-0">
              <LeaveMessageForm />
            </PopoverContent>
          </Popover>

          <div className="flex items-center">
            <div className="grid space-y-1 py-5 font-serif">
              <div className="text-blue-900 font-bold flex justify-between">
                <span>Business Hours:</span>{" "}
              </div>
              <div>
                <span className="font-bold">Mon - Sat:</span>7:15 PM to 7:30 PM
              </div>
              <div>
                <span className="font-bold">Sunday:</span>2:00 PM to 5:30 PM
              </div>
            </div>
          </div>

          <div className="">
            <p className="text-sm mt-2">
              &copy; {new Date().getFullYear()} KayKay's Dairy. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
