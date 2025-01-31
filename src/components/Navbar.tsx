import { Button } from "@heroui/react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { RiChatSmileAiFill } from "react-icons/ri";

const navLinks = [
  //   {
  //     id: 1,
  //     title: "Home",
  //     href: "/",
  //   },
  {
    id: 2,
    title: "Features",
    href: "/features",
  },
  {
    id: 3,
    title: "Pricing",
    href: "/pricing",
  },
  {
    id: 4,
    title: "Contact",
    href: "/contact",
  },
];

export default function Navbar() {
  return (
    <nav className=" text-white mt-4">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold text-primary flex items-center justify-center gap-2"
        >
          <RiChatSmileAiFill className="inline-block text-2xl" />
          Beyonder
        </Link>

        <div className="space-x-6 bg-white text-primary p-2 rounded-lg shadow-slate-200 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              className="transition-all duration-300 ease-in-out hover:text-indigo-600 "
            >
              {link.title}
            </Link>
          ))}
        </div>
        <Link href={"/login"}>
          <Button
            variant="bordered"
            endContent={
              <FaArrowRight className="group-hover:translate-x-1 transition-all duration-150 ease-in-out" />
            }
            className="bg-white shadow-lg text-primary group border-primary hover:bg-primary hover:text-white transition-all duration-300 ease-in-out"
          >
            Get Started
          </Button>
        </Link>
      </div>
    </nav>
  );
}
