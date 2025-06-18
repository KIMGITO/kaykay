import { LeaveMessageForm } from "@/components/leave-message-form";
import { Button } from "@/components/ui/button";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { SendHorizonal, Mail, Phone, MapPin, PhoneCall, Facebook, MessageCircleMore } from "lucide-react";

export default function Footer() {
  return (
    <div>
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
        <div className="flex flex-col items-center justify-center w-4/12 bg-red-200/90 ">
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
