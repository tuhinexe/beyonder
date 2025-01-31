"use client";

import Logo from "@/components/UI/Logo";
import { Button, Image, Input } from "@heroui/react";
import { motion } from "framer-motion";
import { useState } from "react";

import { FcGoogle } from "react-icons/fc";
import { RiChatAiFill, RiChatSmileAiFill } from "react-icons/ri";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <motion.div className="h-screen flex items-center justify-center ">
      <div className="hidden md:flex w-1/2 h-full bg-gray-100 items-center justify-center">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center"
        >
          <Logo withIcon className="text-6xl flex gap-2" />
          <Image
            src="https://i.imgur.com/mIOQ5Fk.png"
            alt="Chatbot Illustration"
            className="w-1/2 mx-auto"
          />
          <div className="text-center">
            <h2 className="text-4xl font-bold text-primary">10,000+</h2>
            <p className="text-xl text-gray-700 mt-2">Happy Users</p>
            <p className="text-lg text-gray-600 mt-4">
              "Beyonder transformed our customer support!"
            </p>
          </div>
        </motion.div>
      </div>
      <div className="flex md:w-1/2 h-full items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
        >
          {/* Toggle Title */}
          <h1 className="text-3xl font-bold text-center text-primary mb-6">
            {isLogin ? "Welcome Back" : "Create an Account"}
          </h1>

          {/* Email Input */}
          <Input type="email" placeholder="Email" className="mb-4" />

          {/* Password Input */}
          <Input type="password" placeholder="Password" className="mb-6" />

          {/* Confirm Password Input (Only for Signup) */}
          {!isLogin && (
            <Input
              type="password"
              placeholder="Confirm Password"
              className="mb-6"
            />
          )}

          {/* Login/Signup Button */}
          <Button className="w-full bg-primary hover:bg-secondary text-white mb-4">
            {isLogin ? "Log In" : "Sign Up"}
          </Button>

          {/* Divider */}
          <div className="flex items-center justify-center mb-4">
            <div className="border-t border-gray-300 flex-grow mr-2"></div>
            <span className="text-gray-500 text-sm">OR</span>
            <div className="border-t border-gray-300 flex-grow ml-2"></div>
          </div>

          {/* Continue with Google */}
          <Button className="w-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 flex items-center justify-center">
            <FcGoogle className="mr-2" />
            Continue with Google
          </Button>

          {/* Toggle Link */}
          <p className="text-center text-gray-600 mt-6">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary hover:underline focus:outline-none"
            >
              {isLogin ? "Sign Up" : "Log In"}
            </button>
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
