"use client";

import ReactMarkdown from "react-markdown";
import style from "./markdown-styles.module.css";
import { usePathname } from "next/navigation";

const { isEdit, coverImg, newImgLink } = {
  isEdit: true,
  coverImg:
    "https://miro.medium.com/v2/resize:fit:720/format:webp/1*-Y9ozbNWSViiCmal1TT32w.jpeg",
  newImgLink:
    "https://miro.medium.com/v2/resize:fit:720/format:webp/1*-Y9ozbNWSViiCmal1TT32w.jpeg",
};

const postContent = `# requirements

## pages:

  - homepage: display recent posts
  - user profile page: displays their recent posts
  - post page: displays name, time created, last edited hearts, post content in markdown
  - login page: login with google
  - admin page: create posts, and add functionality to other pages if admin (edit post, etc.)
`;

function Edit() {
  return (
    <>
      <input
        type="text"
        placeholder="New post title here..."
        className="text-5xl font-extrabold outline-none"
      />
      <textarea
        name="description"
        cols="30"
        rows="1"
        placeholder="New post description here..."
        className="mt-5 resize-none text-xl font-medium outline-none"
      ></textarea>
      <div>
        <button className="flex gap-2 rounded-lg border-[1px] border-blue-600 px-3 py-2 hover:shadow-md">
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
        {coverImg && (
          <div className="mt-5">
            <img src={coverImg} alt="" className="w-full" />
          </div>
        )}
      </div>
      <div className="mt-5 mb-[2px] flex w-full rounded-lg border-[1px] border-solid border-neutral-400">
        <button className="flex gap-2 rounded-lg border-r-[1px] border-neutral-400 px-3 py-2 hover:bg-gray-200">
          <img src="https://firebasestorage.googleapis.com/v0/b/blog-c2483.appspot.com/o/icons%2Fimage.svg?alt=media&token=9c73154c-ed90-4380-a14f-275ad2e399c5" />
          Upload Image
        </button>
        <button className="rounded-lg border-x-[1px] border-neutral-400 px-3 py-2 hover:bg-gray-200">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/blog-c2483.appspot.com/o/icons%2Fcopy.svg?alt=media&token=c5904ef5-d83e-45e4-8495-1eb1e2355a76"
            alt=""
          />
        </button>
        <p
          className={`overflow-x-auto rounded-lg border-l-[1px] border-neutral-400 px-3 py-2 ${
            newImgLink ? "text-black" : "text-neutral-500"
          }`}
        >
          {newImgLink
            ? `![alt text](${newImgLink})`
            : "Uploaded image link will show up here..."}
        </p>
      </div>
      <textarea
        name="post"
        rows="15"
        cols="30"
        placeholder="Write your post content here..."
        className="resize-none rounded-lg border-[1px] border-solid border-neutral-400 p-3 outline-none"
      ></textarea>
    </>
  );
}

function Preview() {
  return (
    <ReactMarkdown className={style.markdown}>{postContent}</ReactMarkdown>
  );
}

export default function EditPost() {
  const pathname = usePathname();

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-[900px]">
        <div className="flex w-full justify-between">
          <span className="font-bold underline">
            {pathname === "/new" ? "Create Post" : "Edit Post"}
          </span>
          <div className="flex gap-4">
            <button className={isEdit ? "text-black" : "text-neutral-500"}>
              Edit
            </button>
            <button className={!isEdit ? "text-black" : "text-neutral-500"}>
              Preview
            </button>
          </div>
        </div>
        <div className="mt-3 flex flex-col rounded-lg px-10 py-10 shadow-2xl">
          {isEdit ? <Edit /> : <Preview />}
        </div>
        <div className="mt-5 flex gap-2">
          <button className="rounded-lg bg-blue-600 px-6 py-3 text-base font-medium text-white hover:brightness-90">
            Publish
          </button>
          <button className="rounded-lg px-6 py-3 text-base font-medium text-blue-600 hover:bg-blue-200 hover:text-blue-900">
            Save draft
          </button>
        </div>
      </div>
    </div>
  );
}
