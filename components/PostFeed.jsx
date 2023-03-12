import FeedContent from "./FeedContent";
import { v4 as uuid } from "uuid";

const posts = [
  {
    img: "https://firebasestorage.googleapis.com/v0/b/blog-c2483.appspot.com/o/example%20article%20img.png?alt=media&token=5785cfb5-0b97-40f8-9d18-d9c20af86282",
    author: "Franklin Zhang",
    title: "Very attractive title",
    preview:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    hearts: "10",
  },
  {
    img: "https://firebasestorage.googleapis.com/v0/b/blog-c2483.appspot.com/o/example%20article%20img.png?alt=media&token=5785cfb5-0b97-40f8-9d18-d9c20af86282",
    author: "Franklin Zhang",
    title: "Very attractive title",
    preview:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    hearts: "10",
  },
];

export default function PostFeed(props) {
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
          key={uuid()}
        />
      );
    }
    return feed;
  }

  return (
    <div className="flex flex-col">
      <div className="mb-7 mt-2 h-[1px] bg-neutral-400"></div>
      <div className="mx-auto grid grid-cols-4 gap-12 max-[1874px]:grid-cols-3 max-[1444px]:grid-cols-2 max-[1024px]:grid-cols-1">
        {createFeed()}
      </div>
      <button className="mx-auto mt-5 mb-3 rounded-lg border-[1px] border-blue-600 px-6 py-3 text-base font-medium text-black hover:shadow-md">
        Load More
      </button>
    </div>
  );
}
