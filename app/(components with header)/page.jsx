import PostFeed from "@/components/PostFeed";

export default function Home() {
  return (
    <>
      <h1 className="text-3xl font-bold text-center">Recent Posts:</h1>
      <PostFeed />
    </>
  );
}
