"use client";

import DashboardSidebar from "@/components/DashboardSidebar";
import ScrapingProgress from "@/components/ScrapingProgress";
import { userSelector } from "@/store/store";
import { Button, User } from "@heroui/react";
import React from "react";
import { FaBars, FaPlus, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { MdOutlineIntegrationInstructions } from "react-icons/md";

type Props = {};

const Integration = (props: Props) => {
  const { user, currentOrg } = useSelector(userSelector);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="min-h-screen flex bg-gray-100">
      <DashboardSidebar
        isSidebarOpen={isSidebarOpen}
        onClose={(value) => setIsSidebarOpen(value)}
      />
      <div className="flex-1 flex flex-col">
        <div className="bg-white shadow-md p-4 flex items-center justify-between">
          <button
            onClick={toggleSidebar}
            className="md:hidden text-primary focus:outline-none"
          >
            {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
          <div className="flex items-center space-x-4 ml-auto">
            <User
              avatarProps={
                user?.image
                  ? {
                      src: user?.image,
                      alt: user?.name,
                    }
                  : { name: user?.name }
              }
              name={user?.name}
              className="text-black cursor-pointer"
            />
          </div>
        </div>

        <div className="flex-1 p-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-lg p-1 bg-gray-100 text-primary border-2 border-primary w-fit rounded-lg font-bold"
            >
              <MdOutlineIntegrationInstructions
                size={20}
                className="inline-block"
              />{" "}
              Integration
            </motion.div>
            {currentOrg ? (
              <div>Hello</div>
            ) : (
              <div className="flex flex-col gap-4 items-center justify-center h-96">
                <p className="text-gray-600">
                  No Company data found. Click on the button below to add your
                  company details
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Integration;
