"use client";

import { useAppStore } from "@/lib/store";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { useEffect } from "react";
import { getUserData } from "@/lib/firestore";

export default function UserState({ children }) {
  const [user] = useAuthState(auth);

  const { setUserId, setUserUsername } = useAppStore((state) => ({
    setUserId: state.setUserId,
    setUserUsername: state.setUserUsername,
  }));

  useEffect(() => {
    if (user) {
      setUserId(user.uid);
      getUserData(user.uid).then((userData) => {
        setUserUsername(userData?.username);
      });
    }
  }, [user]);

  return <>{children}</>;
}
