"use client";

import { login } from "@/lib/auth";

export default function Button() {
  return (
    <button
      className="mt-3 rounded-md outline outline-[1px] outline-[#00000032]"
      onClick={login}
    >
      <div className="flex items-center gap-2 rounded-sm bg-white p-3 py-2">
        <div className="h-[22px] w-[22px]">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt=""
          />
        </div>
        <span className="text-neutral-450 text-[14px] font-medium">
          Sign in with Google
        </span>
      </div>
    </button>
  );
}
