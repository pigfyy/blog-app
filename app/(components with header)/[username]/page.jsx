import PostFeed from "@/components/PostFeed";
import LinkToEdit from "@/components/LinkToEdit";

const data = {
  username: "Pigfy",
  userPfp:
    "https://cdn.discordapp.com/avatars/368167875740958721/36a8b24e792f03e2c0d037c9e1016600.png?size=4096",
  userBio: "(This user has not set a custom bio yet.)",
  postCount: 36,
  likeCount: 51,
};

export default function Profile(props) {
  const { username, userPfp, userBio, postCount, likeCount } = data;

  return (
    <div>
      <div className="mb-5 flex justify-center gap-12">
        <div className="">
          <img src={userPfp} alt="" className="max-w-[150px] rounded-full" />
        </div>
        <div className="flex max-w-[900px] flex-col gap-3">
          <div className="flex justify-between">
            <h1 className="text-3xl">{username}</h1>
            <LinkToEdit />
          </div>
          <div className="flex items-center gap-5">
            <span>
              <span className="font-bold">{postCount}</span> posts
            </span>
            <span>
              <span className="font-bold">{likeCount}</span> likes
            </span>
          </div>
          <div className="">{userBio}</div>
        </div>
      </div>

      <PostFeed />
    </div>
  );
}
