import ReactMarkdown from "react-markdown";
import style from "@/components/markdown-styles.module.css";

export default function ViewPost({ post }) {
  return (
    <>
      <h1 className="mt-8 text-5xl font-extrabold">{post.postTitle}</h1>
      <p className="mt-3 text-lg text-neutral-600">{post.postDescription}</p>
      <div className="mt-5 mb-5 w-full">
        <img src={post.postCover} alt="" className="w-full" />
      </div>
      <ReactMarkdown className={style.markdown}>
        {post.postContent}
      </ReactMarkdown>
    </>
  );
}
