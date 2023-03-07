import ReactMarkdown from "react-markdown";
import style from "../markdown-styles.module.css";

const { isEdit, coverImg, newImgLink } = {
  isEdit: false,
  coverImg:
    "https://miro.medium.com/v2/resize:fit:720/format:webp/1*-Y9ozbNWSViiCmal1TT32w.jpeg",
  newImgLink:
    "https://miro.medium.com/v2/resize:fit:720/format:webp/1*-Y9ozbNWSViiCmal1TT32w.jpeg",
};

const postContent = `# requirements

## pages:

  - homepage: display recent posts
  - user profile page: displays their recent posts
  - post page: displays name, time created, last edited hearts, post content in markdown
  - login page: login with google
  - admin page: create posts, and add functionality to other pages if admin (edit post, etc.)
`;

function Edit() {
  return (
    <>
      <input
        type="text"
        placeholder="New post title here..."
        className="font-extrabold text-5xl outline-none"
      />
      <textarea
        name="description"
        cols="30"
        rows="1"
        placeholder="New post description here..."
        className="resize-none mt-5 outline-none text-xl font-medium"
      ></textarea>
      <div>
        <button className="border-blue-600 border-[1px] rounded-lg px-3 py-2 hover:shadow-md flex gap-2">
          {!coverImg ? (
            <>
              <img src="https://firebasestorage.googleapis.com/v0/b/blog-app-5c7f4.appspot.com/o/icons%2Fimage.svg?alt=media&token=522c4ef4-d702-4e18-bb7f-28d0d6a42a7e" />
              Add Cover Image
            </>
          ) : (
            <>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/blog-app-5c7f4.appspot.com/o/icons%2Fedit.svg?alt=media&token=30d49885-0b50-4cd9-987d-87e5c97e74bf"
                alt=""
              />
              Edit Cover Image
            </>
          )}
        </button>
        {coverImg && (
          <div className="mt-5">
            <img src={coverImg} alt="" className="w-full" />
          </div>
        )}
      </div>
      <div className="border-neutral-400 w-full border-solid border-[1px] mt-5 mb-[2px] rounded-lg flex">
        <button className="flex gap-2 rounded-lg border-r-[1px] px-3 py-2 border-neutral-400 hover:bg-gray-200">
          <img src="https://firebasestorage.googleapis.com/v0/b/blog-app-5c7f4.appspot.com/o/icons%2Fimage.svg?alt=media&token=522c4ef4-d702-4e18-bb7f-28d0d6a42a7e" />
          Upload Image
        </button>
        <button className="px-3 py-2 rounded-lg border-neutral-400 border-x-[1px] hover:bg-gray-200">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/blog-app-5c7f4.appspot.com/o/icons%2Fcopy.svg?alt=media&token=45cac71e-8eb8-4e48-bc54-480ca8da6477"
            alt=""
          />
        </button>
        <p
          className={`px-3 py-2 rounded-lg border-neutral-400 border-l-[1px] overflow-x-auto ${
            newImgLink ? "text-black" : "text-neutral-500"
          }`}
        >
          {newImgLink
            ? `![alt text](${newImgLink})`
            : "Uploaded image link will show up here..."}
        </p>
      </div>
      <textarea
        name="post"
        rows="15"
        cols="30"
        placeholder="Write your post content here..."
        className="resize-none outline-none border-neutral-400 border-solid border-[1px] rounded-lg p-3"
      ></textarea>
    </>
  );
}

function Preview() {
  return (
    <ReactMarkdown className={style.markdown}>{postContent}</ReactMarkdown>
  );
}

export default function NewPostPage() {
  return (
    <div className="flex justify-center">
      <div className="max-w-[900px] w-full">
        <div className="flex justify-between w-full">
          <span className="font-bold underline">Create Post</span>
          <div className="flex gap-4">
            <button className={isEdit ? "text-black" : "text-neutral-500"}>
              Edit
            </button>
            <button className={!isEdit ? "text-black" : "text-neutral-500"}>
              Preview
            </button>
          </div>
        </div>
        <div className="shadow-2xl px-10 py-10 rounded-lg mt-3 flex flex-col">
          {isEdit ? <Edit /> : <Preview />}
        </div>
        <div className="flex gap-2 mt-5">
          <button className="font-medium text-base text-white bg-blue-600 rounded-lg px-6 py-3 hover:brightness-90">
            Publish
          </button>
          <button className="text-blue-600 font-medium text-base rounded-lg px-6 py-3 hover:bg-blue-200 hover:text-blue-900">
            Save draft
          </button>
        </div>
      </div>
    </div>
  );
}
