"use client";

import { auth } from "@/lib/firebase";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { uploadProfileImg } from "@/lib/storage";
import { checkUsernameExists, createUser } from "@/lib/firestore";

export default function EditUser({ user }) {
  const [pfp, setPfp] = useState(user.photoURL || user.pfp);

  // react hook forms for form validation
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // handle file input change
  const uploadFile = async (e) => {
    const file = e.target.files[0];
    const url = await uploadProfileImg(
      file,
      `users/${auth.currentUser.uid}/coverImgs`
    );
    setPfp(url);
  };

  // handle form submit
  const onSubmit = (data) => {
    const userData = {
      ...data,
      pfp,
      uid: user.uid,
    };
    createUser(userData);
  };

  return (
    <>
      {user && (
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-10 rounded-xl p-5 shadow-2xl">
            {/* Profile Picture */}
            <div className="group relative my-auto flex overflow-hidden rounded-full">
              <button className="overflow-hidden rounded-full group-hover:brightness-75">
                <img
                  src={pfp || user.photoURL}
                  alt="Profile Picture"
                  className="h-64 w-64 overflow-hidden rounded-full"
                  referrerPolicy="no-referrer"
                />
              </button>
              <div className="absolute top-1/2 left-1/2 hidden translate-x-[-50%] translate-y-[-50%] select-none text-center font-extrabold text-white group-hover:block group-hover:brightness-[150%]">
                Change
                <br />
                Avatar
              </div>
              <input
                type="file"
                className="absolute top-0 left-0 z-50 h-full w-full cursor-pointer rounded-full pl-32 opacity-0"
                onChange={uploadFile}
                accept="image/x-png,image/gif,image/jpeg"
              />
            </div>
            {/* Profile Information */}
            <div className="flex flex-col justify-center">
              {/* Name */}
              <div className="mb-1 flex justify-between">
                <span className="text-xl font-medium">Full Name</span>
                <span className="my-auto text-neutral-600">
                  {watch("name") &&
                    30 - watch("name").length !== 30 &&
                    30 - watch("name").length}
                </span>
              </div>
              <input
                type="text"
                className="rounded-lg border-[1px] border-neutral-400 p-2 outline-none"
                placeholder="Enter your full name..."
                maxLength={30}
                defaultValue={user.name || ""}
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters",
                  },
                  maxLength: {
                    value: 30,
                    message: "Name must be less than 30 characters",
                  },
                  pattern: {
                    value: /^[a-zA-Z\s]*$/,
                    message: "Only letters and spaces are allowed",
                  },
                  validate: (value) =>
                    (value.match(/ /g) || []).length <= 2 ||
                    "Up to 2 spaces are allowed",
                })}
              />
              {errors.name && (
                <span className="text-sm text-red-500">
                  {errors.name.message}
                </span>
              )}
              {/* Username */}
              <div className="mb-1 mt-6 flex justify-between">
                <span className="text-xl font-medium">Username</span>
                <span className="my-auto text-neutral-600">
                  {watch("username") &&
                    20 - watch("username").length !== 20 &&
                    20 - watch("username").length}
                </span>
              </div>
              <input
                type="text"
                className="rounded-lg border-[1px] border-neutral-400 p-2 outline-none"
                placeholder="Create a username..."
                maxLength={20}
                defaultValue={user.username || ""}
                {...register("username", {
                  required: "Username is required",
                  minLength: {
                    value: 3,
                    message: "Username must be at least 3 characters",
                  },
                  maxLength: {
                    value: 20,
                    message: "Username must be less than 20 characters",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9_]*$/,
                    message:
                      "Only letters, numbers and underscores are allowed",
                  },
                  validate: async (value) =>
                    !(await checkUsernameExists(value)) ||
                    "Username already exists",
                })}
              />
              {errors.username && (
                <span className="text-sm text-red-500">
                  {errors.username.message}
                </span>
              )}
              {/* Bio */}
              <div className="mb-1 mt-6 flex justify-between">
                <span className="text-xl font-medium">Bio</span>
                <span className="my-auto text-neutral-600">
                  {watch("bio") && 150 - watch("bio").length !== 150
                    ? 150 - watch("bio").length
                    : "(Optional)"}
                </span>
              </div>
              <textarea
                cols="30"
                rows="4"
                className="resize-none rounded-lg border-[1px] border-neutral-400 p-2 outline-none"
                placeholder="(Tell us about yourself...)"
                maxLength={150}
                defaultValue={user.bio || ""}
                {...register("bio", { maxLength: 150 })}
              ></textarea>
            </div>
          </div>
          <button className="w-full rounded-lg bg-blue-600 py-3 text-base font-medium text-white hover:brightness-90">
            Save Changes
          </button>
        </form>
      )}
    </>
  );
}
