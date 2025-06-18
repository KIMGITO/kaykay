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
import AppHeader from "./sections/Header";
import WavyBg from "./sections/AppWaveBg";
import Hello from "./sections/Hello";
import Products from "./sections/Product";
import Testimonials from "./sections/Testimonials";
import Footer from "./sections/Footer";

export default function LoginPage() {
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

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-pink-200-50 to-amber-800 overflow-hidden">
      {/* Milky Wave Background */}
      <WavyBg />
      <AppHeader />

      {/* Horizontal Main Content */}
      <Hello />

      {/* Our Products Section */}
      <Products />
      {/* Testimonials Section */}
      <Testimonials />

      {/* Footer large screen */}

      {/* Footer small screen */}
      <Footer />
    </div>
  );
}
