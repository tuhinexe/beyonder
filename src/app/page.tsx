"use client";

import Navbar from "@/components/Navbar";
import TitleTexts from "@/components/UI/TitleTexts";
import { Image } from "@heroui/react";

import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="h-screen ">
      <Navbar />
      <div className="container mx-auto px-4 py-16 h-full">
        <div className="flex flex-col md:flex-row items-center justify-between md:h-[85%]">
          <div className="md:w-1/2 space-y-6 flex flex-col">
            <TitleTexts />
            <p className="text-lg text-gray-600">
              Effortlessly create, train, and integrate AI chatbots for your
              business.
            </p>
            <button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-indigo-600 transition duration-300 w-fit">
              Get Started
            </button>
          </div>

          <div className="md:w-1/2 mt-10 md:mt-0">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center"
            >
              <Image
                src="https://i.imgur.com/mIOQ5Fk.png"
                alt="Chatbot Illustration"
                className="w-full h-full"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
