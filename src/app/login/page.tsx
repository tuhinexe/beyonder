"use client";

import Logo from "@/components/UI/Logo";
import { loginWithPassword, signInWithGoogle } from "@/firebase/auth";
import { auth } from "@/firebase/config";
import useAppDispatch from "@/hooks/useAppDispatch";
import { setUser } from "@/store/slices/userSlice";
import { userSelector } from "@/store/store";
import { Button, Image, Input, Spinner } from "@heroui/react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEye } from "react-icons/fa";

import { FcGoogle } from "react-icons/fc";
import { IoMdEyeOff } from "react-icons/io";
import { RiChatAiFill, RiChatSmileAiFill } from "react-icons/ri";
import { useSelector } from "react-redux";

export default function LoginPage() {
  const router = useRouter();
  const { user } = useSelector(userSelector);
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user]);

  const handleGoogleSignup = async () => {
    setLoading(true);
    try {
      const { user } = await signInWithGoogle();
      console.log(user);
      if (user) {
        const data = {
          name: user.displayName,
          email: user.email,

          image: user.photoURL,
        };
        console.log(data);
        toast.success("Logged in successfully");
        if (typeof window !== "undefined") {
          localStorage.setItem("user", JSON.stringify(data));
        }
        dispatch(setUser(data));
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: any) => {
    setLoading(true);
    try {
      const { name, email, password, confirmPassword } = credentials;

      console.log(email, password);

      if (!email || !password || !name || !confirmPassword) {
        toast.error("Please fill in all fields");
        return;
      }

      if (name === "" || name.length < 3) {
        return toast.error("Name must be at least 3 characters long");
      }

      if (password.length < 6) {
        return toast.error("Password must be at least 6 characters long");
      }
      if (password !== confirmPassword) {
        return toast.error("Passwords do not match");
      }

      const { user } = await createUserWithEmailAndPassword(
        auth,
        email as string,
        password as string
      );
      if (user) {
        await sendEmailVerification(user);
        toast.success("Email verification sent. Verify and login");

        setCredentials({
          email: "",
          password: "",
          confirmPassword: "",
          name: "",
        });
      }

      console.log(user);
      setIsLogin(true);
    } catch (error: any) {
      console.log(error?.code);
      if (error?.code === "auth/email-already-in-use") {
        return toast.error("Account already exists with this email");
      } else {
        toast.error("An error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: any) => {
    setLoading(true);
    try {
      const { email, password } = credentials;

      if (!email || !password) {
        return toast.error("Please fill in all fields");
      }

      if (!email.toString().includes("@")) {
        return toast.error("Invalid email");
      }
      const { user } = await loginWithPassword(
        email as string,
        password as string
      );
      // console.log(user);

      if (user.emailVerified) {
        const data = {
          name: user.displayName,
          email: user.email,
          image: user.photoURL,
        };
        console.log(data);
        toast.success("Logged in successfully");
        if (typeof window !== "undefined") {
          localStorage.setItem("user", JSON.stringify(data));
        }
        dispatch(setUser(data));
        router.push("/");
      } else {
        return toast.error("Email not verified. Please verify your email");
      }
    } catch (error: any) {
      console.log(error);
      if (error?.code === "auth/user-not-found") {
        return toast.error("Account not found");
      }

      if (error?.code === "auth/invalid-credential") {
        return toast.error("Invalid credentials");
      }
    } finally {
      setLoading(false);
    }
  };
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
          <h1 className="text-3xl font-bold text-center text-primary mb-6">
            {isLogin ? "Welcome Back" : "Create an Account"}
          </h1>

          {!isLogin && (
            <Input
              value={credentials.name}
              onChange={(e) =>
                setCredentials((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              type="text"
              placeholder="Name"
              className="mb-4 outline-none border-none"
            />
          )}

          <Input
            value={credentials.email}
            onChange={(e) =>
              setCredentials((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
            type="email"
            placeholder="Email"
            className="mb-4 outline-none border-none"
          />

          <Input
            value={credentials.password}
            onChange={(e) =>
              setCredentials((prev) => ({
                ...prev,
                password: e.target.value,
              }))
            }
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="mb-6 outline-none border-none"
            endContent={
              <span>
                {showPassword ? (
                  <FaEye
                    onClick={() => setShowPassword((prev) => !prev)}
                    className=" cursor-pointer"
                  />
                ) : (
                  <IoMdEyeOff
                    onClick={() => setShowPassword((prev) => !prev)}
                    className=" cursor-pointer"
                  />
                )}
              </span>
            }
          />

          {!isLogin && (
            <Input
              value={credentials.confirmPassword}
              onChange={(e) =>
                setCredentials((prev) => ({
                  ...prev,
                  confirmPassword: e.target.value,
                }))
              }
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="mb-6 outline-none border-none"
              endContent={
                <span>
                  {showPassword ? (
                    <FaEye
                      onClick={() => setShowPassword((prev) => !prev)}
                      className=" cursor-pointer"
                    />
                  ) : (
                    <IoMdEyeOff
                      onClick={() => setShowPassword((prev) => !prev)}
                      className=" cursor-pointer"
                    />
                  )}
                </span>
              }
            />
          )}

          {isLogin ? (
            <Button
              onPress={(e) => handleLogin(e)}
              className="w-full bg-primary text-white hover:bg-indigo-600 my-2"
            >
              {loading ? <Spinner /> : "Log In"}
            </Button>
          ) : (
            <Button
              onPress={(e) => handleSignup(e)}
              className="w-full bg-primary text-white hover:bg-indigo-600 my-2"
            >
              {loading ? <Spinner /> : "Sign Up"}
            </Button>
          )}

          <div className="flex items-center justify-center mb-4">
            <div className="border-t border-gray-300 flex-grow mr-2"></div>
            <span className="text-gray-500 text-sm">OR</span>
            <div className="border-t border-gray-300 flex-grow ml-2"></div>
          </div>

          <Button
            onPress={handleGoogleSignup}
            className="w-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 flex items-center justify-center"
          >
            <FcGoogle className="mr-2" />
            Continue with Google
          </Button>

          <p className="text-center text-gray-600 mt-6">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setCredentials({
                  email: "",
                  password: "",
                  confirmPassword: "",
                  name: "",
                });
              }}
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
