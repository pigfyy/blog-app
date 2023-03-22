"use client";

import { editHeartCount, getHeartCount } from "@/lib/firestore";
import { useEffect, useState } from "react";
import { getHeartDocument } from "@/lib/firestore";
import { useAppStore } from "@/lib/store";

const heartLinks = {
  unfilled:
    "https://firebasestorage.googleapis.com/v0/b/blog-c2483.appspot.com/o/icons%2Fheart.svg?alt=media&token=e41bf294-f439-41f5-b654-72aaa16422e2",
  filled:
    "https://firebasestorage.googleapis.com/v0/b/blog-c2483.appspot.com/o/icons%2FfilledHeart.svg?alt=media&token=0cd4effb-4fa1-45e3-ba57-67c430668e8a",
};

export default function HeartButton({ params }) {
  const [isHearted, setIsHearted] = useState(false);
  const [heartCount, setHeartCount] = useState(0);
  const { userId } = useAppStore();

  useEffect(() => {
    if (!userId) return;

    const a = async () => {
      const docId = await getHeartDocument(
        params.username,
        params.post,
        userId
      );

      docId ? setIsHearted(true) : setIsHearted(false);

      const heartCount = await getHeartCount(params.username, params.post);
      setHeartCount(heartCount);
    };
    a();
  }, [userId]);

  const handleClick = async () => {
    const isIncreasingHeartCount = !isHearted;

    // handle firestore
    editHeartCount(params.username, params.post);

    // handle state
    setIsHearted((state) => !state);
    setHeartCount((state) => (isIncreasingHeartCount ? state + 1 : state - 1));
  };

  return (
    <div className="flex gap-1">
      <button className="my-auto" onClick={handleClick}>
        <img
          src={isHearted ? heartLinks.filled : heartLinks.unfilled}
          alt=""
          className="w-6"
        />
      </button>
      <span className="my-auto text-xl font-medium leading-4 text-neutral-500">
        {heartCount}
      </span>
    </div>
  );
}
