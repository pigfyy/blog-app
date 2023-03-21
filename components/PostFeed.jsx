"use client";

import FeedContent from "./FeedContent";
import { v4 as uuid } from "uuid";
import { getPosts, getMorePosts, getLastPost } from "@/lib/firestore";
import { useState, useEffect } from "react";
import { useAppStore } from "@/lib/store";

export default function PostFeed({ params }) {
  const [posts, setPosts] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [lastPost, setLastPost] = useState([]);

  let { userUsername, userId } = useAppStore();

  // utility function to set posts and lastVisible state
  const setStates = (ret, lastPost) => {
    if (!ret.posts.length) return;
    setPosts(posts.concat(ret.posts));
    if (ret.lastVisible.data().slug === lastPost.data().slug) {
      setLastVisible(null);
    } else {
      setLastVisible(ret.lastVisible);
    }
  };

  // get posts on mount
  useEffect(() => {
    if (!userId) return;
    getLastPost(params.username).then((lastPost) => {
      setLastPost(lastPost);
      getPosts(params.username).then((ret) => {
        setStates(ret, lastPost);
      });
    });
  }, [userId]);

  // load more posts on click
  const loadPosts = () => {
    getMorePosts(lastVisible, params.username).then((ret) => {
      setStates(ret, lastPost);
    });
  };

  // create post feed using posts state
  const createFeed = () => {
    let feed = [];
    for (let i = 0; i < posts.length; i++) {
      feed.push(
        <FeedContent
          img={posts[i].postCover}
          author={posts[i].authorName}
          authorUsername={posts[i].authorUsername}
          title={posts[i].postTitle}
          slug={posts[i].slug}
          preview={posts[i].postDescription}
          hearts={posts[i].hearts}
          isAdmin={posts[i].authorUsername === userUsername ? true : false}
          key={uuid()}
        />
      );
    }
    return feed;
  };

  return (
    <div className="flex flex-col">
      <div className="mb-7 mt-2 h-[1px] bg-neutral-400"></div>
      <div className="mx-auto grid grid-cols-4 gap-12 max-[1874px]:grid-cols-3 max-[1444px]:grid-cols-2 max-[1024px]:grid-cols-1">
        {createFeed()}
      </div>
      {lastVisible ? (
        <button
          className="mx-auto mt-5 mb-3 rounded-lg border-[1px] border-blue-600 px-6 py-3 text-base font-medium text-black hover:shadow-md"
          onClick={loadPosts}
        >
          Load More
        </button>
      ) : (
        <p className="mt-5 mb-3 text-center">{`You've reached the end!`}</p>
      )}
    </div>
  );
}
