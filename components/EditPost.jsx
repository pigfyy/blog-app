"use client";

import ReactMarkdown from "react-markdown";
import style from "./markdown-styles.module.css";
import { usePathname } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import { uploadCoverImg, uploadPostImg } from "@/lib/storage";
import { useAppStore } from "@/lib/store";
import { createPost, checkSlugExists } from "@/lib/firestore";
import kebabCase from "lodash.kebabcase";
import { v4 as uuid } from "uuid";
import { useState } from "react";

function Form({ pathname, isEdit }) {
  const [postId] = useState(uuid());
  const [coverImg, setCoverImg] = useState("");
  const [postImg, setPostImg] = useState("");

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();

  // handles form submit
  const onSubmit = (data) => {
    const postData = {
      postTitle: data.title,
      postDescription: data.description,
      postContent: data.postContent,
      postCover: coverImg,
      dateCreated: null,
      dateEdited: null,
      authorUsername: null,
      authorPfp: null,
      readTime: null,
      hearts: 0,
    };
    if (pathname === "/new") {
      createPost(postData, postId);
    }
  };

  // handles cover image upload
  const uploadImg = async (e, imgType) => {
    const file = e.target.files[0];
    if (!file) return;
    if (imgType === "coverImg") {
      const url = await uploadCoverImg(file, postId);
      setCoverImg(url);
    } else if (imgType === "postImg") {
      const url = await uploadPostImg(file, postId);
      setPostImg(url);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {isEdit && (
        <div className="mt-3 flex flex-col rounded-lg px-10 py-10 shadow-2xl">
          {/* Title */}
          <input
            type="text"
            placeholder="New post title here..."
            className="text-5xl font-extrabold outline-none"
            maxLength={60}
            {...register("title", {
              required: "Title is required",
              minLength: {
                value: 1,
                message: "Title must contain at least 1 character",
              },
              maxLength: {
                value: 60,
                message: "Title must contain at most 60 characters",
              },
              validate: async (value) =>
                !(await checkSlugExists(kebabCase(value))) ||
                "You already have a post with this title",
            })}
          />
          {errors.title && (
            <span className="text-sm text-red-500">{errors.title.message}</span>
          )}
          {/* Description */}
          <Controller
            name="description"
            control={control}
            rules={{
              required: "Post description is required",
              minLength: {
                value: 1,
                message: "Post description must contain at least 1 character",
              },
              maxLength: {
                value: 125,
                message: "Post description must contain at most 125 characters",
              },
            }}
            render={({ field }) => (
              <TextareaAutosize
                {...field}
                placeholder="New post description here..."
                className="mt-5 h-7 resize-none text-xl font-medium outline-none"
                maxLength={125}
              />
            )}
          />
          {errors.description && (
            <span className="text-sm text-red-500">
              {errors.description.message}
            </span>
          )}
          {/* Cover Image */}
          <div className="mt-4 flex">
            <div className="relative">
              <button
                type="button"
                className="flex gap-2 rounded-lg border-[1px] border-blue-600 px-3 py-2 hover:shadow-md"
              >
                {!coverImg ? (
                  <>
                    <img src="https://firebasestorage.googleapis.com/v0/b/blog-c2483.appspot.com/o/icons%2Fimage.svg?alt=media&token=9c73154c-ed90-4380-a14f-275ad2e399c5" />
                    Add Cover Image
                  </>
                ) : (
                  <>
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/blog-c2483.appspot.com/o/icons%2Fedit.svg?alt=media&token=6d372210-3e2a-43ad-8b7e-76f9a10547f8"
                      alt=""
                    />
                    Edit Cover Image
                  </>
                )}
              </button>
              <Controller
                name="coverImg"
                control={control}
                rules={{ required: "A cover image is required" }}
                render={({ field }) => (
                  <input
                    type="file"
                    className="absolute top-0 left-0 h-full w-full max-w-full cursor-pointer overflow-hidden pl-32 text-blue-100 opacity-0"
                    onChange={(e) => {
                      uploadImg(e, "coverImg");
                      field.onChange(e.target.files[0]);
                    }}
                    accept="image/x-png,image/gif,image/jpeg"
                  />
                )}
              />
            </div>
          </div>
          {errors.coverImg && (
            <span className="text-sm text-red-500">
              {errors.coverImg.message}
            </span>
          )}
          {coverImg && (
            <div className="mt-5">
              <img src={coverImg} alt="" className="w-full" />
            </div>
          )}
          {/* Image Upload*/}
          <div className="mt-5 flex w-full divide-x-[1px] divide-dashed divide-slate-400 rounded-t-lg border-[1px] border-b-0 border-solid border-neutral-400">
            <div className="relative">
              <button
                className="flex h-full min-w-[155px] items-center gap-2 whitespace-nowrap px-3 py-2 hover:bg-gray-200"
                type="button"
              >
                <img src="https://firebasestorage.googleapis.com/v0/b/blog-c2483.appspot.com/o/icons%2Fimage.svg?alt=media&token=9c73154c-ed90-4380-a14f-275ad2e399c5" />
                Upload Image
              </button>
              <input
                type="file"
                className="cursor-pointerpl-20 absolute top-0 left-0 h-full w-full opacity-0"
                onChange={(e) => uploadImg(e, "postImg")}
                accept="image/x-png,image/gif,image/jpeg"
              />
            </div>
            <button
              className="min-w-[44px] px-3 py-2 hover:bg-gray-200"
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(`![alt text](${postImg})`);
              }}
            >
              <img
                src="https://firebasestorage.googleapis.com/v0/b/blog-c2483.appspot.com/o/icons%2Fcopy.svg?alt=media&token=c5904ef5-d83e-45e4-8495-1eb1e2355a76"
                alt=""
              />
            </button>
            <span
              className={`overflow-x-auto whitespace-nowrap px-3 py-2 ${
                postImg ? "text-black" : "text-neutral-500"
              }`}
            >
              {postImg
                ? `![alt text](${postImg})`
                : "Uploaded image link will show up here..."}
            </span>
          </div>
          {/* Post Content */}
          <Controller
            name="postContent"
            control={control}
            defaultValue=""
            rules={{
              required: "Post content is required",
              minLength: {
                value: 1,
                message: "Post content must contain at least 1 character",
              },
            }}
            render={({ field }) => (
              <TextareaAutosize
                {...field}
                placeholder="Write your post content here..."
                className="resize-none overflow-hidden rounded-b-lg border-[1px] border-solid border-neutral-400 p-3 outline-none"
                minRows={10}
              />
            )}
          />
          {errors.postContent && (
            <span className="text-sm text-red-500">
              {errors.postContent.message}
            </span>
          )}
        </div>
      )}
      {!isEdit && (
        <div className="mt-3 flex flex-col rounded-lg px-10 py-10 shadow-2xl">
          <ReactMarkdown className={style.markdown}>
            {watch("postContent") || "Post content will show up here..."}
          </ReactMarkdown>
        </div>
      )}
      <div className="mt-5 flex gap-2">
        <button
          className="rounded-lg bg-blue-600 px-6 py-3 text-base font-medium text-white hover:brightness-90"
          type="submit"
        >
          Publish
        </button>
        <button className="rounded-lg px-6 py-3 text-base font-medium text-blue-600 hover:bg-blue-200 hover:text-blue-900">
          Save draft
        </button>
      </div>
    </form>
  );
}

export default function EditPost() {
  const pathname = usePathname();

  const [isEdit, setIsEdit] = useState(true);

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-[900px]">
        <div className="flex w-full justify-between">
          <span className="font-bold underline">
            {pathname === "/new" ? "Create Post" : "Edit Post"}
          </span>
          <div className="flex gap-4">
            <button
              className={isEdit ? "text-black" : "text-neutral-500"}
              onClick={() => setIsEdit(true)}
            >
              Edit
            </button>
            <button
              className={!isEdit ? "text-black" : "text-neutral-500"}
              onClick={() => setIsEdit(false)}
            >
              Preview
            </button>
          </div>
        </div>
        <Form pathname={pathname} isEdit={isEdit} />
      </div>
    </div>
  );
}
