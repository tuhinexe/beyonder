"use client";
import React from "react";
import { motion } from "framer-motion";
import { RiChatSmileAiFill } from "react-icons/ri";
import { twMerge } from "tailwind-merge";

type Props = {
  withIcon?: boolean;
  className?: string;
};

const Logo = (props: Props) => {
  return (
    <div>
      <motion.span
        animate={{
          background: [
            "linear-gradient(90deg, #3B82F6, #8B5CF6, #F97316)",
            "linear-gradient(90deg, #8B5CF6, #F97316, #3B82F6)",
            "linear-gradient(90deg, #F97316, #3B82F6, #8B5CF6)",
            "linear-gradient(90deg, #3B82F6, #8B5CF6, #F97316)",
          ],
          backgroundSize: "200% 200%",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        }}
        className={twMerge("text-primary", props.className)}
      >
        {props.withIcon && <RiChatSmileAiFill className=" text-primary" />}
        Beyonder
      </motion.span>
    </div>
  );
};

export default Logo;
