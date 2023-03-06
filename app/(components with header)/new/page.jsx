const { isEdit } = { isEdit: true };

export default function NewPostPage() {
  return (
    <div className="flex justify-center">
      <div className="max-w-[900px] w-full">
        <div className="flex justify-between w-full">
          <span className="font-bold">Create Post</span>
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
            <img src="https://firebasestorage.googleapis.com/v0/b/blog-app-5c7f4.appspot.com/o/icons%2Fimage.svg?alt=media&token=522c4ef4-d702-4e18-bb7f-28d0d6a42a7e" />Add Cover Image
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
