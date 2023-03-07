"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LinkToEdit() {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <Link href={`${pathname}/edit`}>
      <button className="border-[1px] border-blue-600 p-2 rounded-lg hover:bg-blue-200">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/blog-app-5c7f4.appspot.com/o/icons%2Fedit.svg?alt=media&token=30d49885-0b50-4cd9-987d-87e5c97e74bf"
          alt=""
          className="w-6"
        />
      </button>
    </Link>
  );
}
