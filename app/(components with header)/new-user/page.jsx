"use client";

import EditUser from "@/components/EditUser";
import { auth } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { checkUserExists } from "@/lib/firestore";

export default function NewUserPage() {
  const [user] = useAuthState(auth);

  const router = useRouter();

  useEffect(() => {
    if (!user) return;
    checkUserExists(user.uid).then((exists) => {
      if (exists) router.push("/");
    });
  }, [user]);

  return (
    <>
      {user && (
        <div className="mx-auto my-auto flex w-11/12 max-w-[676px] flex-col gap-3 pb-16">
          <h1 className="text-center text-4xl font-extrabold">Welcome!</h1>
          <p className="text-center text-lg">
            We need some information about you to get you started
          </p>
          <EditUser user={user} />
        </div>
      )}
    </>
  );
}
