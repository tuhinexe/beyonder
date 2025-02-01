"use client";

import { logOut } from "@/firebase/auth";
import { userSelector } from "@/store/store";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
} from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaArrowRight, FaBars, FaTimes } from "react-icons/fa";
import { RiChatSmileAiFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useState } from "react";

const navLinks = [
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
  const { user } = useSelector(userSelector);
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="text-white md:mt-4" suppressHydrationWarning>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-primary flex items-center justify-center gap-2"
        >
          <RiChatSmileAiFill className="inline-block text-2xl" />
          Beyonder
        </Link>

        {/* Hamburger Menu (Mobile Only) */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden text-primary focus:outline-none"
        >
          {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Navigation Links (Desktop) */}
        <div className="hidden md:flex space-x-6 bg-white text-primary p-2 rounded-lg shadow-slate-200 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              className="transition-all duration-300 ease-in-out hover:text-indigo-600"
            >
              {link.title}
            </Link>
          ))}
        </div>

        {/* User Dropdown or Get Started Button */}
        {user ? (
          <div className="hidden md:block">
            <Dropdown>
              <DropdownTrigger>
                <User
                  avatarProps={
                    user?.image
                      ? {
                          src: user?.image,
                          alt: user?.name,
                        }
                      : undefined
                  }
                  name={user?.name}
                  className="text-black cursor-pointer"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem
                  onPress={() => {
                    router.push("/dashboard");
                  }}
                  key="dash"
                >
                  Dashboard
                </DropdownItem>
                <DropdownItem
                  onPress={() => logOut()}
                  key="logout"
                  className="text-danger"
                  color="danger"
                >
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        ) : (
          <Link href="/login" className="hidden md:block">
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
        )}

        {/* Mobile Menu (Overlay) */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50">
            <div className="bg-white w-3/4 h-full p-6">
              {/* Close Button */}
              <button
                onClick={toggleMobileMenu}
                className="text-primary focus:outline-none mb-6"
              >
                <FaTimes size={24} />
              </button>

              {/* Navigation Links (Mobile) */}
              <div className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.id}
                    href={link.href}
                    className="text-primary hover:text-indigo-600"
                    onClick={toggleMobileMenu}
                  >
                    {link.title}
                  </Link>
                ))}
              </div>

              {/* User Dropdown or Get Started Button (Mobile) */}
              {user ? (
                <div className="mt-6">
                  <Dropdown>
                    <DropdownTrigger>
                      <User
                        avatarProps={
                          user?.image
                            ? {
                                src: user?.image,
                                alt: user?.name,
                              }
                            : undefined
                        }
                        name={user?.name}
                        className="text-black cursor-pointer"
                      />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions">
                      <DropdownItem
                        onPress={() => {
                          router.push("/dashboard");
                        }}
                        key="dash"
                      >
                        Dashboard
                      </DropdownItem>
                      <DropdownItem
                        onPress={() => logOut()}
                        key="logout"
                        className="text-danger"
                        color="danger"
                      >
                        Logout
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              ) : (
                <Link href="/login" className="mt-6 block">
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
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
