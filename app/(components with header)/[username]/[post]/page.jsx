import ReactMarkdown from "react-markdown";
import style from "@/components/markdown-styles.module.css";
import Link from "next/link";
import LinkToEdit from "@/components/LinkToEdit";

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
  isAdmin: true,
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
    isAdmin,
  } = data;

  return (
    <div className="flex justify-center">
      <div className="mt-4 max-w-[900px]">
        <div className="flex justify-between">
          <div className="flex gap-4">
            <div className="h-12 w-12 overflow-hidden rounded-full">
              <img src={userPfp} alt="" />
            </div>
            <div>
              <Link href={`/${username.toLowerCase()}`}>
                <p className="text-base font-normal hover:underline">
                  {username}
                </p>
              </Link>
              <span className="text-sm text-neutral-500">
                {dateCreated} (Edit: {dateEdited})
              </span>
              <span className="px-2 text-sm text-neutral-500">·</span>
              <span className="text-sm text-neutral-500">
                {readTime} min read
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {isAdmin && <LinkToEdit />}
            <div className="flex gap-1">
              <button className="my-auto">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/blog-c2483.appspot.com/o/icons%2Fheart.svg?alt=media&token=e41bf294-f439-41f5-b654-72aaa16422e2"
                  alt=""
                  className="w-6"
                />
              </button>
              <span className="my-auto text-xl font-medium leading-4 text-neutral-500">
                {hearts}
              </span>
            </div>
          </div>
        </div>
        <h1 className="mt-8 text-3xl font-bold">{postTitle}</h1>
        <p className="mt-3 text-lg text-neutral-600">{postPreview}</p>
        <div className="mt-5 mb-5 w-full">
          <img src={postImg} alt="" className="w-full" />
        </div>
        <ReactMarkdown className={style.markdown}>{postContent}</ReactMarkdown>
      </div>
    </div>
  );
}
