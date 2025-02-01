import React from "react";
import { motion } from "framer-motion";
import Logo from "./Logo";

type Props = {};

const TitleTexts = (props: Props) => {
  return (
    <div className=" text-2xl md:text-5xl flex flex-col font-bold text-gray-900">
      <div className="flex  gap-2">
        Make a successful
        <div className="relative flex gap-2">
          <p className="absolute bottom-5 md:bottom-12 left-4 font-cursive font-medium text-primary">
            brand
          </p>
          <span className="text-gray-700 opacity-40  ">product</span>
          <div className="absolute h-1 md:w-[200px] w-24 rotate-12 bg-primary/80 rounded-full top-3 md:top-6"></div>
          <div className="absolute h-1 top-3  md:w-[200px] w-24 -rotate-12 bg-primary/80 rounded-full md:top-6"></div>
        </div>
      </div>{" "}
      <div className="flex flex-col gap-2">
        for your customers with <Logo />
      </div>
    </div>
  );
};

export default TitleTexts;
