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
import { FaArrowRight } from "react-icons/fa";
import { RiChatSmileAiFill } from "react-icons/ri";
import { useSelector } from "react-redux";

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
  const { user } = useSelector(userSelector);
  const router = useRouter();
  return (
    <nav className=" text-white mt-4" suppressHydrationWarning>
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
        {user ? (
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
                className=" text-black cursor-pointer"
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
        ) : (
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
        )}
      </div>
    </nav>
  );
}
