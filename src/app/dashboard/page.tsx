"use client";

import Logo from "@/components/UI/Logo";
import { userSelector } from "@/store/store";
import {
  Button,
  Checkbox,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  useDisclosure,
  User,
} from "@heroui/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaBars, FaChartBar, FaHome, FaPlus, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { MdOutlineIntegrationInstructions } from "react-icons/md";
import toast from "react-hot-toast";
import useAppDispatch from "@/hooks/useAppDispatch";
import { setCurrentOrg } from "@/store/slices/userSlice";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
import ScrapingProgress from "@/components/ScrapingProgress";
import DashboardSidebar from "@/components/DashboardSidebar";
import Chatbot from "@/components/Chatbot";

const Dashboard = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const { width, height } = useWindowSize();
  const [success, setSuccess] = useState(false);
  const { user, currentOrg } = useSelector(userSelector);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [orgData, setOrgData] = useState({
    name: "",
    url: "",
    description: "",
  });

  const dispatch = useAppDispatch();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const currentOrg = localStorage.getItem("currentOrg");
    if (!currentOrg) {
      console.log("No current org");
      onOpen();
    }
  }, [currentOrg]);

  const handleSaveOrgData = async () => {
    setLoading(true);
    try {
      // console.log(orgData);
      if (!orgData.name || !orgData.url || !orgData.description) {
        return toast.error("Please fill all the fields");
      }
      let urlRegex = new RegExp(
        "^(https?:\\/\\/)?" +
          "([a-z0-9\\-\\.]+)?" +
          "\\." +
          "([a-z]{2,3})" +
          "(\\:[0-9]{1,5})?" +
          "(\\/.*)?$"
      );
      if (!urlRegex.test(orgData.url)) {
        return toast.error("Please enter a valid URL");
      }

      const result = await fetch("/api/scrape", {
        method: "POST",
        body: JSON.stringify({ url: orgData.url }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await result.json();
      console.log(data);
      if (data?.success) {
        localStorage.setItem(
          "currentOrg",
          JSON.stringify({
            ...orgData,
            links: data.links,
            metaTags: data.metaTags,
          })
        );
      }

      dispatch(
        setCurrentOrg({
          ...orgData,
          links: data.links,
          metaTags: data.metaTags,
        })
      );

      onOpenChange();
      setSuccess(true);
      toast.success("Company added successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to add company");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen w-full overflow-hidden flex bg-gray-100">
      {/* <Chatbot /> */}
      <DashboardSidebar
        isSidebarOpen={isSidebarOpen}
        onClose={(value) => setIsSidebarOpen(value)}
      />
      <div className=" flex flex-col w-full">
        <div className="bg-white shadow-md p-4 flex items-center justify-around max-w-full">
          <button
            onClick={toggleSidebar}
            className="md:hidden text-primary focus:outline-none"
          >
            {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
          <div className="flex items-center  ml-auto">
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

        <div className="flex-1 p-4 ">
          <div className="bg-white p-4 rounded-lg shadow-md w-full overflow-x-hidden">
            <div className="flex w-full justify-between">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-lg p-1 bg-gray-100 text-primary border-2 border-primary w-fit rounded-lg font-bold"
              >
                <div>
                  <FaChartBar size={20} className="inline-block" /> Insight
                </div>
              </motion.div>
              <div>
                <Button
                  color="primary"
                  onPress={() => {
                    onOpen();
                    toast(
                      "Adding another company removes the current company data"
                    );
                  }}
                  startContent={<FaPlus />}
                >
                  Add Another
                </Button>
              </div>
            </div>
            {currentOrg ? (
              <ScrapingProgress />
            ) : (
              <div className="flex flex-col gap-4 items-center justify-center h-96">
                <p className="text-gray-600">
                  No Company data found. Click on the button below to add your
                  company details
                </p>
                <Button
                  color="primary"
                  onPress={onOpen}
                  className="ml-4"
                  startContent={<FaPlus />}
                >
                  Add Company
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          placement="top-center"
          onOpenChange={onOpenChange}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  <p className="text-gray-600">
                    Add your company details to get started
                  </p>
                </ModalHeader>
                <ModalBody>
                  <Input
                    isRequired
                    value={orgData.name}
                    onChange={(e) =>
                      setOrgData({ ...orgData, name: e.target.value })
                    }
                    label="Company Name"
                    placeholder="Enter your company name"
                    variant="bordered"
                  />
                  <Input
                    isRequired
                    value={orgData.url}
                    onChange={(e) =>
                      setOrgData({ ...orgData, url: e.target.value })
                    }
                    type="url"
                    label="Company URL"
                    placeholder="Enter your website URL"
                    variant="bordered"
                  />
                  <Input
                    isRequired
                    value={orgData.description}
                    onChange={(e) =>
                      setOrgData({ ...orgData, description: e.target.value })
                    }
                    label="Description"
                    placeholder="Enter your company description"
                    type="text"
                    variant="bordered"
                  />
                </ModalBody>
                <ModalFooter>
                  {/* <Button color="danger" variant="flat" onPress={onClose}>
                    Close
                  </Button> */}
                  <Button
                    startContent={loading && <Spinner color="white" />}
                    disabled={loading}
                    color="primary"
                    onPress={handleSaveOrgData}
                  >
                    Add Company
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
      {success && (
        <Confetti
          width={1920}
          height={1080}
          recycle={false}
          onConfettiComplete={() => console.log("Confetti Completed")}
        />
      )}
    </div>
  );
};

export default Dashboard;
