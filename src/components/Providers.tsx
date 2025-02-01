"use client";

import store from "@/store/store";
import { HeroUIProvider } from "@heroui/react";
import React from "react";
import { Provider } from "react-redux";
import AuthProvider from "./AuthProvider";

type Props = {
  children: React.ReactNode;
};

const Providers = (props: Props) => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <HeroUIProvider>{props.children}</HeroUIProvider>
      </AuthProvider>
    </Provider>
  );
};

export default Providers;
