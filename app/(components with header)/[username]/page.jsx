import PostFeed from "@/components/PostFeed";
import LinkToEdit from "@/components/LinkToEdit";
import {
  getUserProfileData,
  getUserIdFromUsername,
  getUserHeartCount,
} from "@/lib/firestore";

export default async function Profile({ params }) {
  const username = params.username;
  const userId = await getUserIdFromUsername(username);
  const userData = await getUserProfileData(userId);
  const heartCount = await getUserHeartCount(params.username);

  return (
    <div>
      <div className="max-[585px]:mx-3">
        <div className="mb-5 flex justify-center gap-12 max-[585px]:gap-8">
          <div>
            <img
              src={userData.pfp}
              alt={`${username}'s profile picture`}
              className="h-[150px] max-h-[150px] w-[150px] max-w-[150px] rounded-full object-cover max-[585px]:h-[100px] max-[585px]:w-[100px]"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex min-w-[300px] max-w-[600px] flex-col gap-3 max-[585px]:w-full max-[585px]:min-w-0">
            <div>
              <div className="flex justify-between">
                <h1 className="text-3xl">{username}</h1>
                <LinkToEdit params={params} />
              </div>
              <h2 className="text-base text-neutral-500">{userData.name}</h2>
            </div>
            <div className="flex items-center gap-5">
              <span>
                <span className="font-bold">{userData.postCount}</span>{" "}
                {userData.postCount === 1 ? "post" : "posts"}
              </span>
              <span>
                <span className="font-bold">{heartCount}</span>{" "}
                {heartCount === 1 ? "heart" : "hearts"}
              </span>
            </div>
            <div className="max-[585px]:hidden">
              {userData.bio ||
                "This user hasn't set a bio yet. We're sure they're great though!"}
            </div>
          </div>
        </div>
        <div className="min-[585px]:hidden">
          {userData.bio ||
            "This user hasn't set a bio yet. We're sure they're great though!"}
        </div>
      </div>

      <PostFeed params={params} />
    </div>
  );
}
