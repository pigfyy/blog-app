const { userPfp } = {
  userPfp:
    "https://cdn.discordapp.com/avatars/368167875740958721/36a8b24e792f03e2c0d037c9e1016600.png?size=4096",
};

export default function EditUser() {
  return (
    <div className="flex justify-center my-auto">
      <div className="flex flex-col gap-5 mb-10">
        <h1 className="font-bold text-4xl">Edit Profile</h1>
        <div className="flex gap-10 shadow-2xl rounded-xl p-5">
          <div className="relative rounded-full overflow-hidden group">
            <button className="rounded-full overflow-hidden hover:brightness-75">
              <img
                src={userPfp}
                alt=""
                className="rounded-full overflow-hidden"
              />
            </button>
            <div className="absolute text-center top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-white font-extrabold select-none group-hover:block hidden group-hover:brightness-[150%]">
              Change
              <br />
              Avatar
            </div>
          </div>
          <form className="flex flex-col justify-center">
            <p className="text-xl font-medium mb-1">Username</p>
            <input
              type="text"
              className="border-[1px] border-neutral-400 rounded-lg p-2 outline-none"
            />
            <p className="text-xl font-medium mt-6 mb-1">Bio</p>
            <textarea
              cols="30"
              rows="4"
              className="resize-none border-[1px] border-neutral-400 rounded-lg p-2 outline-none"
            ></textarea>
          </form>
        </div>
        <div className="flex gap-3">
          <button className="font-medium text-base text-white bg-blue-600 rounded-lg px-6 py-3 hover:brightness-90">
            Save
          </button>
          <button className="font-medium text-base text-black border-blue-600 border-[1px] rounded-lg px-6 py-3 hover:shadow-md">
            Revert
          </button>
        </div>
      </div>
    </div>
  );
}
