"use client";

import Link from "next/link";
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
    <div className="fixed top-0 z-50 flex w-full justify-center bg-white py-4 shadow-md">
      <div className="flex w-5/6 items-center justify-between max-[585px]:w-11/12">
        <Link href="/">
          <div className="flex select-none gap-2">
            <div className="h-10 w-10">
              <img src="/favicon.ico" alt="Logo" />
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
                className="h-full rounded-lg border-[1px] border-red-600 px-3 py-3 hover:shadow-md min-[585px]:px-6"
                onClick={() => logout()}
              >
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/blog-c2483.appspot.com/o/icons%2Flogout.svg?alt=media&token=a9dd94b4-dd5e-4959-a559-45dbc6a08999"
                  alt="Logout"
                  className="h-[21px] min-[585px]:hidden"
                />
                <p className="hidden text-base font-medium text-black min-[585px]:block">
                  Logout
                </p>
              </button>
              <Link
                href="/new"
                className="rounded-lg border-[1px] border-blue-600 px-3 py-3 hover:shadow-md min-[585px]:px-6"
              >
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/blog-c2483.appspot.com/o/icons%2Fedit.svg?alt=media&token=6d372210-3e2a-43ad-8b7e-76f9a10547f8"
                  alt="Write post"
                  className="h-[21px] min-[585px]:hidden"
                />
                <p className="hidden text-base font-medium text-black min-[585px]:block">
                  Write Post
                </p>
              </Link>
              <Link href={`/${username}`}>
                <img
                  src={userPfp}
                  alt={`${username}'s profile picture`}
                  referrerPolicy="no-referrer"
                  className="h-10 w-10 overflow-hidden rounded-full object-cover"
                />
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
    </div>
  );
}
