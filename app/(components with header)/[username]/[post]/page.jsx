import ReactMarkdown from "react-markdown";
import style from "@/components/markdown-styles.module.css";
import Link from "next/link";
import LinkToEdit from "@/components/LinkToEdit";
import { getPost } from "@/lib/firestore";

export default async function PostPage({ params }) {
  let post = await getPost(params.username, params.post);

  // format date
  const optionsNoYear = { month: "short", day: "numeric" };
  const optionsWithYear = { month: "short", day: "numeric", year: "numeric" };
  post.dateCreated = post.dateCreated.toLocaleDateString(
    "en-US",
    post.dateEdited < new Date().getFullYear() ? optionsWithYear : optionsNoYear
  );
  post.dateEdited = post.dateEdited.toLocaleDateString(
    "en-US",
    post.dateEdited < new Date().getFullYear() ? optionsWithYear : optionsNoYear
  );

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-[900px] rounded-lg px-10 py-10 shadow-2xl">
        <div className="flex justify-between">
          <div className="flex gap-4">
            <div className="h-12 w-12 overflow-hidden rounded-full">
              <img src={post.authorPfp} alt="" />
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
            <div className="flex gap-1">
              <button className="my-auto">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/blog-c2483.appspot.com/o/icons%2Fheart.svg?alt=media&token=e41bf294-f439-41f5-b654-72aaa16422e2"
                  alt=""
                  className="w-6"
                />
              </button>
              <span className="my-auto text-xl font-medium leading-4 text-neutral-500">
                {post.hearts}
              </span>
            </div>
          </div>
        </div>
        <h1 className="mt-8 text-3xl font-bold">{post.postTitle}</h1>
        <p className="mt-3 text-lg text-neutral-600">{post.postDescription}</p>
        <div className="mt-5 mb-5 w-full">
          <img src={post.postCover} alt="" className="w-full" />
        </div>
        <ReactMarkdown className={style.markdown}>
          {post.postContent}
        </ReactMarkdown>
      </div>
    </div>
  );
}
