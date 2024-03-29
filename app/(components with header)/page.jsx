import PostFeed from "@/components/PostFeed";

export default function Home({ params }) {
  return (
    <>
      <h1 className="text-center text-3xl font-bold">Recent Posts:</h1>
      <PostFeed params={params} />
    </>
  );
}
