"use client";

import store from "@/store/store";
import { HeroUIProvider } from "@heroui/react";
import React from "react";
import { Provider } from "react-redux";

type Props = {
  children: React.ReactNode;
};

const Providers = (props: Props) => {
  return (
    <Provider store={store}>
      <HeroUIProvider>{props.children}</HeroUIProvider>
    </Provider>
  );
};

export default Providers;
