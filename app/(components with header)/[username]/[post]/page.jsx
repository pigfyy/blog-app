import Link from "next/link";
import LinkToEdit from "@/components/LinkToEdit";
import HeartButton from "./HeartButton";
import { getPost } from "@/lib/firestore";
import ViewPost from "@/components/ViewPost";

export default async function PostPage({ params }) {
  let post = await getPost(params.username, params.post);

  // format date
  const optionsNoYear = { month: "short", day: "numeric" };
  const optionsWithYear = { month: "short", day: "numeric", year: "numeric" };
  let dateCreated = new Date(post.dateCreated);
  let dateEdited = new Date(post.dateEdited);
  post.dateCreated = dateCreated.toLocaleDateString(
    "en-US",
    dateCreated.getFullYear() < new Date().getFullYear()
      ? optionsWithYear
      : optionsNoYear
  );
  post.dateEdited = dateEdited.toLocaleDateString(
    "en-US",
    dateEdited.getFullYear() < new Date().getFullYear()
      ? optionsWithYear
      : optionsNoYear
  );

  return (
    <div className="flex w-full justify-center">
      <div className="w-full max-w-[900px] rounded-lg px-3 py-10 shadow-2xl min-[585px]:px-10">
        <div className="flex justify-between">
          <div className="flex gap-4">
            <div>
              <img
                src={post.authorPfp}
                alt={`${post.authorUsername}'s profile picture`}
                className="h-12 w-12 overflow-hidden rounded-full object-cover"
              />
            </div>
            <div>
              <Link href={`/${post.authorUsername}`}>
                <p className="text-base font-normal hover:underline">
                  {post.authorName}
                </p>
              </Link>
              <span className="text-sm text-neutral-500">
                {post.dateCreated}
                {post.dateCreated !== post.dateEdited &&
                  ` (Edit: ${post.dateEdited})`}
              </span>
              <span className="px-2 text-sm text-neutral-500">·</span>
              <span className="text-sm text-neutral-500">
                {post.readTime} min read
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <LinkToEdit params={params} />
            <HeartButton params={params} />
          </div>
        </div>
        <ViewPost params={params} post={post} />
      </div>
    </div>
  );
}
