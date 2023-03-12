"use client";

import { auth } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState } from "react";

export default function NewUserPage() {
  const [user] = useAuthState(auth);

  const [pfp, setPfp] = useState(user.photoURL);

  return (
    <>
      {user && (
        <div className="mx-auto my-auto flex flex-col gap-3 pb-16">
          <h1 className="text-center text-4xl font-extrabold">Welcome!</h1>
          <p className="text-center text-lg">
            We need some information about you to get you started
          </p>
          <form className="flex flex-col gap-3">
            <div className="flex gap-10 rounded-xl p-5 shadow-2xl">
              {/* Profile Picture */}
              <div className="group relative my-auto flex overflow-hidden rounded-full">
                <button className="overflow-hidden rounded-full group-hover:brightness-75">
                  <img
                    src={user.photoURL}
                    alt=""
                    className="h-64 w-64 overflow-hidden rounded-full"
                  />
                </button>
                <div className="absolute top-1/2 left-1/2 hidden translate-x-[-50%] translate-y-[-50%] select-none text-center font-extrabold text-white group-hover:block group-hover:brightness-[150%]">
                  Change
                  <br />
                  Avatar
                </div>
                <input
                  type="file"
                  className="absolute top-0 left-0 z-50 h-full w-full cursor-pointer rounded-full bg-blue-900 pl-32 opacity-0"
                ></input>
              </div>
              {/* Profile Information */}
              <div className="flex flex-col justify-center">
                {/* Name */}
                <div className="mb-1 flex justify-between">
                  <span className="text-xl font-medium">Full Name</span>
                  <span className="my-auto text-neutral-600">12</span>
                </div>
                <input
                  type="text"
                  className="rounded-lg border-[1px] border-neutral-400 p-2 outline-none"
                  placeholder="Enter your full name..."
                  maxLength={30}
                />
                {/* Username */}
                <div className="mb-1 mt-6 flex justify-between">
                  <span className="text-xl font-medium">Username</span>
                  <span className="my-auto text-neutral-600">15</span>
                </div>
                <input
                  type="text"
                  className="rounded-lg border-[1px] border-neutral-400 p-2 outline-none"
                  placeholder="Create a username..."
                  maxLength={20}
                />
                {/* Bio */}
                <div className="mb-1 mt-6 flex justify-between">
                  <span className="text-xl font-medium">Bio</span>
                  <span className="my-auto text-neutral-600">126</span>
                </div>
                <textarea
                  cols="30"
                  rows="4"
                  className="resize-none rounded-lg border-[1px] border-neutral-400 p-2 outline-none"
                  placeholder="(Tell us about yourself...)"
                  maxLength={150}
                ></textarea>
              </div>
            </div>
            <button className="w-full rounded-lg bg-blue-600 py-3 text-base font-medium text-white hover:brightness-90">
              Save Changes
            </button>
          </form>
        </div>
      )}
    </>
  );
}
