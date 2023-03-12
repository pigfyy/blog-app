"use client";

import { auth } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState } from "react";

export default function NewUserPage() {
  const [user] = useAuthState(auth);

  const [pfp, setPfp] = useState(null);

  return <>hi</>;
}
