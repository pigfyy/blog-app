"use client";

import { useAppStore } from "@/lib/store";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { useEffect } from "react";

export default function UserState({ children }) {
  const [user] = useAuthState(auth);

  const { userId, setUserId } = useAppStore((state) => ({
    userId: state.userId,
    setUserId: state.setUserId,
  }));

  useEffect(() => {
    setUserId(user?.uid);
  }, [user]);

  return <>{children}</>;
}
