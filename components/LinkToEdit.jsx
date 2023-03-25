"use client";

import Link from "next/link";
import { useAppStore } from "@/lib/store";

export default function LinkToEdit({ params }) {
  const { userUsername } = useAppStore();

  const href = params.post
    ? `/${params.username}/${params.post}/edit`
    : `/${params.username}/edit`;

  return (
    <>
      {userUsername === params.username ? (
        <Link href={href}>
          <button className="rounded-lg border-[1px] border-blue-600 p-2 text-base font-medium text-black hover:shadow-md">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/blog-c2483.appspot.com/o/icons%2Fedit.svg?alt=media&token=6d372210-3e2a-43ad-8b7e-76f9a10547f8"
              alt="Pen icon"
            />
          </button>
        </Link>
      ) : (
        <></>
      )}
    </>
  );
}
