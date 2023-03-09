"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function LinkToEdit() {
  const pathname = usePathname();

  return (
    <Link href={`${pathname}/edit`}>
      <button className="rounded-lg border-[1px] border-blue-600 p-2 text-base font-medium text-black hover:shadow-md">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/blog-c2483.appspot.com/o/icons%2Fedit.svg?alt=media&token=6d372210-3e2a-43ad-8b7e-76f9a10547f8"
          alt=""
        />
      </button>
    </Link>
  );
}
