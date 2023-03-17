"use client";

import Link from "next/link";

export default function GlobalError() {
  return (
    <html>
      <head>
        <title>Error</title>
      </head>
      <body>
        <div className="flex h-screen items-center">
          <div className="container mx-auto my-8 flex flex-col items-center justify-center px-5">
            <div className="max-w-md text-center">
              <h2 className="mb-8 text-9xl font-extrabold dark:text-gray-600">
                <span className="sr-only">Error</span>404
              </h2>
              <p className="text-2xl font-semibold md:text-3xl">
                {`Sorry, we couldn't find this page.`}
              </p>
              <p className="mt-4 mb-8 dark:text-gray-400">
                {`But don't worry, you can find plenty of other things on our
                homepage.`}
              </p>
              <Link
                href={"/"}
                className="rounded px-8 py-3 font-semibold dark:bg-violet-400 dark:text-gray-900"
              >
                Back to homepage
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
