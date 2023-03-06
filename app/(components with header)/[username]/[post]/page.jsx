import ReactMarkdown from "react-markdown";
import style from "./markdown-styles.module.css";

const postContent = `# requirements

## pages:

  - homepage: display recent posts
  - user profile page: displays their recent posts
  - post page: displays name, time created, last edited hearts, post content in markdown
  - login page: login with google
  - admin page: create posts, and add functionality to other pages if admin (edit post, etc.)
`;

const data = {
  userPfp:
    "https://cdn.discordapp.com/avatars/368167875740958721/36a8b24e792f03e2c0d037c9e1016600.png?size=4096",
  username: "Pigfy",
  postTitle: "Creative Eye-Catching Title",
  dateCreated: "Feb 10",
  dateEdited: "Feb 13",
  readTime: "5",
  hearts: "10",
  postContent: postContent,
  postImg:
    "https://miro.medium.com/v2/resize:fit:720/format:webp/1*-Y9ozbNWSViiCmal1TT32w.jpeg",
  postPreview:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
};

export default function PostPage() {
  const {
    userPfp,
    username,
    dateCreated,
    dateEdited,
    readTime,
    hearts,
    postTitle,
    postPreview,
    postImg,
    postContent,
  } = data;

  return (
    <div className="flex justify-center">
      <div className="max-w-[900px] mt-4 mb-10">
        <div className="flex justify-between">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img src={userPfp} alt="" />
            </div>
            <div>
              <p className="text-base font-normal">{username}</p>
              <span className="text-sm text-neutral-500">
                {dateCreated} (Edit: {dateEdited})
              </span>
              <span className="px-2 text-sm text-neutral-500">·</span>
              <span className="text-sm text-neutral-500">
                {readTime} min read
              </span>
            </div>
          </div>
          <div className="flex gap-1">
            <button className="my-auto">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/blog-app-5c7f4.appspot.com/o/icons%2Fheart.svg?alt=media&token=be5997e0-241e-4a64-8a33-f40cf90e89bc"
                alt=""
                className="w-6"
              />
            </button>
            <span className="text-neutral-500 my-auto leading-4 text-xl font-medium">
              {hearts}
            </span>
          </div>
        </div>
        <h1 className="text-3xl font-bold mt-8">{postTitle}</h1>
        <p className="text-neutral-600 text-lg mt-3">{postPreview}</p>
        <div className="mt-5 w-full mb-5">
          <img src={postImg} alt="" className="w-full" />
        </div>
        <ReactMarkdown className={style.markdown}>{postContent}</ReactMarkdown>
      </div>
    </div>
  );
}
