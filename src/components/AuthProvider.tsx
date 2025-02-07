"use client";

import { auth } from "@/firebase/config";
import useAppDispatch from "@/hooks/useAppDispatch";
import { setCurrentOrg, setUser } from "@/store/slices/userSlice";

import { getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  useEffect(() => {
    if (typeof window === "undefined") return;
    const user = localStorage.getItem("user");
    const currentOrg = localStorage.getItem("currentOrg");
    // console.log(user);

    if (user) {
      // console.log("User is signed in");
      // console.log(user);
      dispatch(setUser(JSON.parse(user)));
      if (currentOrg) {
        dispatch(setCurrentOrg(JSON.parse(currentOrg)));
      }
    } else {
      // console.log("User is not signed in");s

      auth.onAuthStateChanged((user) => {
        if (user) {
          // console.log("User is signed in");
          const data = {
            name: user.displayName,
            email: user.email,
            image: user.photoURL,
          };
          // console.log(data);
          if (typeof window !== "undefined") {
            localStorage.setItem("user", JSON.stringify(data));
          }
          dispatch(setUser(data));
        } else {
          console.log("User is not signed in");

          router.push("/login");
        }
      });
    }
  }, []);

  return <>{children}</>;
};

export default AuthProvider;
