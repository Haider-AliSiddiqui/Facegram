// app/providers.tsx
"use client";

import { Provider } from "react-redux";
import { MantineProvider } from "@mantine/core";
import store from "@/redux/store";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      // auth logic
    });
  }, []);

  return (
    <Provider store={store}>
      <MantineProvider>
        {children}
      </MantineProvider>
    </Provider>
  );
}
