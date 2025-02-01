import Link from "next/link";
import React, { useState } from "react";
import { FaBars, FaHome, FaTimes } from "react-icons/fa";
import Logo from "./UI/Logo";
import { MdOutlineIntegrationInstructions } from "react-icons/md";
import { motion } from "framer-motion";

type Props = {
  isSidebarOpen: boolean;
  onClose: (value: boolean) => void;
};

const sidebarLinks = [
  {
    id: 1,
    title: "Home",
    href: "/dashboard",
    icon: <FaHome size={20} />,
  },
  {
    id: 2,
    title: "Integration",
    href: "/dashboard/integration",
    icon: <MdOutlineIntegrationInstructions size={20} />,
  },
  // {
  //   id: 3,
  //   title: "Settings",
  //   href: "/settings",
  // },
  // {
  //   id: 4,
  //   title: "Profile",
  //   href: "/profile",
  // },
];

const DashboardSidebar = ({ isSidebarOpen, onClose }: Props) => {
  const toggleSidebar = () => {
    onClose(!isSidebarOpen);
  };

  return (
    <div
      className={`fixed md:relative inset-y-0 left-0 w-72 bg-white shadow-lg  transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 transition-transform duration-300 ease-in-out z-50`}
    >
      <div className="p-4">
        <h1 className="text-2xl font-bold flex justify-between">
          <Link href={"/"}>
            <Logo withIcon className="flex gap-2 items-center" />
          </Link>
          {isSidebarOpen && (
            <button
              onClick={toggleSidebar}
              className="md:hidden text-primary focus:outline-none"
            >
              {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          )}
        </h1>
        <nav className="mt-8">
          <ul className="flex flex-col gap-2">
            {sidebarLinks.map((link) => (
              <motion.li
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                key={link.id}
              >
                <Link
                  className="flex gap-2 items-center p-2 bg-white shadow-lg text-black rounded-md hover:text-white hover:bg-primary group"
                  href={link.href}
                >
                  <span className="p-2 bg-primary rounded-lg text-white group-hover:bg-white group-hover:text-primary transition-all ease-in-out duration-200">
                    {link.icon}
                  </span>
                  {link.title}
                </Link>
              </motion.li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default DashboardSidebar;
