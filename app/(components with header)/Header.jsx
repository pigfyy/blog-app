"use client";

import Link from "next/link";
import kebabCase from "lodash.kebabcase";
import { useState, useEffect } from "react";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { logout } from "@/lib/auth";
import { getUserData } from "@/lib/firestore";

export default function Header() {
  const [user] = useAuthState(auth);
  const [[userPfp, username], setUser] = useState(["", ""]);

  useEffect(() => {
    if (user) {
      getUserData(user.uid).then((data) => {
        setUser([data.pfp, data.username]);
      });
    }
  }, [user]);

  return (
    <div className="fixed top-0 z-50 flex w-full items-center justify-between bg-white py-4 px-28 shadow-md">
      <Link href="/">
        <div className="flex select-none gap-2">
          <div className="h-10 w-10">
            <img src="/favicon.ico" alt="" />
          </div>
          <span className="text-[20px] font-bold leading-[21px] text-[#374151]">
            Modern
            <br />
            Blog App
          </span>
        </div>
      </Link>
      <div className="flex items-center gap-3">
        {user && (
          <>
            <button
              className="rounded-lg border-[1px] border-red-600 px-6 py-3 text-base font-medium text-black hover:shadow-md"
              onClick={() => logout()}
            >
              Log Out
            </button>
            <Link href="/new">
              <button className="rounded-lg border-[1px] border-blue-600 px-6 py-3 text-base font-medium text-black hover:shadow-md">
                Write Post
              </button>
            </Link>
            <Link href={`/${kebabCase(username)}`}>
              <button className="h-10 w-10 overflow-hidden rounded-full">
                <img src={userPfp} alt="" referrerPolicy="no-referrer" />
              </button>
            </Link>
          </>
        )}
        {!user && (
          <Link href="/login">
            <button className="rounded-lg bg-blue-600 px-6 py-3 text-base font-medium text-white hover:brightness-90">
              Sign In
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
