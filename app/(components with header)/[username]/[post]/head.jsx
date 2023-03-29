import { getPost } from "@/lib/firestore";

export default async function Head({ params }) {
  const post = await getPost(params.username, params.post);

  console.log(post);

  return (
    <>
      <title>{`${post.postTitle} | Blog`}</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta
        name="description"
        content={post.postDescription || "No description provided."}
      />
      <link rel="icon" href="/favicon.ico" />
    </>
  );
}
