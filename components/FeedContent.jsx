import { getHeartCount } from "@/lib/firestore";
import Link from "next/link";
import { useState, useEffect } from "react";
import { deletePost, getPostId } from "@/lib/firestore";

export default function FeedContent({
  img,
  author,
  authorUsername,
  title,
  slug,
  preview,
  isAdmin,
  removePostFromFeed,
}) {
  const [heartCount, setHeartCount] = useState(0);

  useEffect(() => {
    getHeartCount(authorUsername, slug).then((count) => {
      setHeartCount(count);
    });
  }, []);

  const handleDeletePost = async () => {
    const postId = await getPostId(authorUsername, slug);
    deletePost(authorUsername, slug, postId);
    removePostFromFeed(postId);
  };

  return (
    <div className="flex w-[374px] flex-col overflow-hidden rounded-lg border-[1px] border-neutral-200">
      <img
        src={img}
        alt="Post cover"
        referrerPolicy="no-referrer"
        className="h-[160px] object-cover"
      />
      <div className="flex flex-col px-6 py-10">
        <Link href={`/${authorUsername}`}>
          <span className="text-xs font-bold leading-8 text-neutral-600 hover:cursor-pointer hover:underline">
            {author}
          </span>
        </Link>
        <Link href={`/${authorUsername}/${slug}`}>
          <p className="mb-2 text-xl font-bold leading-6 text-neutral-900 hover:text-blue-700">
            {title}
          </p>
        </Link>
        <p className="text-base font-normal leading-6  text-neutral-600">
          {preview}
        </p>
        <div className="mt-8 flex justify-between">
          {!isAdmin && (
            <Link href={`/${authorUsername}/${slug}`}>
              <button className="rounded-lg border-[1px] border-blue-600 px-6 py-[14px] text-base font-medium leading-4 text-blue-600">
                Learn More {"->"}
              </button>
            </Link>
          )}
          {isAdmin && (
            <div className="flex gap-3">
              <Link href={`/${authorUsername}/${slug}/edit`}>
                <button className="rounded-lg border-[1px] border-blue-600 p-3 text-base font-medium leading-4 text-blue-600">
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/blog-c2483.appspot.com/o/icons%2Fedit.svg?alt=media&token=6d372210-3e2a-43ad-8b7e-76f9a10547f8"
                    alt="Pen icon"
                  />
                </button>
              </Link>
              <button
                className="rounded-lg border-[1px] border-red-600 p-3 text-base font-medium leading-4 text-red-600"
                onClick={handleDeletePost}
              >
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/blog-c2483.appspot.com/o/icons%2Fdelete.svg?alt=media&token=c902693d-5254-4fda-9718-278837036145"
                  alt="Trash icon"
                />
              </button>
            </div>
          )}
          <div className="flex gap-1">
            <div className="my-auto w-4">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/blog-c2483.appspot.com/o/icons%2Fheart.svg?alt=media&token=e41bf294-f439-41f5-b654-72aaa16422e2"
                alt="Heart icon"
              />
            </div>
            <span className="my-auto text-base font-medium leading-4 text-neutral-500">
              {heartCount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
