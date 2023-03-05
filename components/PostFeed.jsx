import FeedContent from "./FeedContent";
import crypto from "crypto";

export default function PostFeed(props) {
  const posts = [
    {
      img: "https://firebasestorage.googleapis.com/v0/b/blog-app-5c7f4.appspot.com/o/example%20article%20img.png?alt=media&token=13e9a4f6-6b86-4d23-9225-79d9f2e4abef",
      author: "Franklin Zhang",
      title: "Very attractive title",
      preview:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      hearts: "10",
    },
    {
      img: "https://firebasestorage.googleapis.com/v0/b/blog-app-5c7f4.appspot.com/o/example%20article%20img.png?alt=media&token=13e9a4f6-6b86-4d23-9225-79d9f2e4abef",
      author: "Franklin Zhang",
      title: "Very attractive title",
      preview:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      hearts: "10",
    },
  ];

  function createFeed() {
    let feed = [];
    for (let i = 0; i < posts.length; i++) {
      feed.push(
        <FeedContent
          img={posts[i].img}
          author={posts[i].author}
          title={posts[i].title}
          preview={posts[i].preview}
          hearts={posts[i].hearts}
          key={crypto.randomUUID()}
        />
      );
    }
    return feed;
  }

  return (
    <div className="flex flex-col">
      <div className="mb-7 mt-2 h-[1px] bg-neutral-400"></div>
      <div className="grid gap-12 grid-cols-4 mx-auto max-[1874px]:grid-cols-3 max-[1444px]:grid-cols-2 max-[1024px]:grid-cols-1">
        {createFeed()}
      </div>
      <button className="mt-5 mb-3 mx-auto font-medium text-base text-black border-blue-600 border-[1px] rounded-lg px-6 py-3 hover:shadow-md">
        Load More
      </button>
    </div>
  );
}
