import PostFeed from "@/components/PostFeed";
import LinkToEdit from "@/components/LinkToEdit";
import { getUserProfileData, getUserIdFromUsername } from "@/lib/firestore";

export default async function Profile({ params }) {
  const username = params.username;
  const userId = await getUserIdFromUsername(username);
  if (!userId) throw new Error("User not found");
  const userData = await getUserProfileData(userId);

  return (
    <div>
      <div className="mb-5 flex justify-center gap-12">
        <div className="">
          <img
            src={userData.pfp}
            alt=""
            className="w-[150px] max-w-[150px] rounded-full"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="flex min-w-[300px] max-w-[600px] flex-col gap-3">
          <div>
            <div className="flex justify-between">
              <h1 className="text-3xl">{username}</h1>
              <LinkToEdit params={params} />
            </div>
            <h2 className="text-base text-neutral-500">{userData.name}</h2>
          </div>
          <div className="flex items-center gap-5">
            <span>
              <span className="font-bold">{userData.postCount}</span> posts
            </span>
            <span>
              <span className="font-bold">{userData.heartCount}</span> likes
            </span>
          </div>
          <div>
            {userData.bio ||
              "This user hasn't set a bio yet. We're sure they're great though!"}
          </div>
        </div>
      </div>

      <PostFeed params={params} />
    </div>
  );
}
