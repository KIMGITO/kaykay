import {
  GalleryVerticalEnd,
  ShoppingBasketIcon,
  UserCircle2,
} from "lucide-react";
import { Button } from "./components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./components/ui/hover-card";

export default function LoginPage() {
  return (
    <div className="relative bg-gray-300 flex min-h-svh flex-col ">
      <div className="flex z-10 justify-between">
        <div className=" p-4 text-white ">
          <h1 className="text-5xl font-bold">KayKay's </h1>
          <p className="mt-2">Where to go fro flesh MILK!</p>
        </div>
        <div className="flex items-baseline pt-5">
          <HoverCard>
            <HoverCardTrigger>Hover</HoverCardTrigger>
            <HoverCardContent>
              The React Framework – created and maintained by @vercel.
            </HoverCardContent>
          </HoverCard>
        </div>
        <div className=" p-4 text-white ">
          <Button
            size={"sm"}
            className="rounded-4xl px-5 py-0 bg-gray-100 items-center"
          >
            <ShoppingBasketIcon color="#a12759" size={25} />
          </Button>
        </div>
      </div>

      <div className="relative w-full p-2 bg-gray-400">
        <div className="flex items-center justify-center">
          <GalleryVerticalEnd className="w-10 h-10 text-white" />
          <h1 className="text-2xl font-bold text-white ml-2">Welcome</h1>
        </div>
      </div>
      <svg
        className="absolute  bg-pink-900 inset-0 w-full h-full z-0"
        viewBox="130 0 700 290"
      >
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="20%" stopColor="#a86007" />
            <stop offset="70%" stopColor="#a12759" />
          </linearGradient>
        </defs>
        <path
          fill="url(#waveGradient)"
          d="M0,224L60,192C120,160,240,96,360,106.7C480,117,600,203,720,213.3C840,224,960,160,1080,133.3C1200,107,1320,117,1380,122.7L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
        ></path>
      </svg>

      <div className="relative z-5 flex w-full bg-amber-50 max-w-sm flex-col gap-6"></div>
    </div>
  );
}
