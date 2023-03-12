const { userPfp } = {
  userPfp:
    "https://cdn.discordapp.com/avatars/368167875740958721/36a8b24e792f03e2c0d037c9e1016600.png?size=4096",
};

export default function EditUser() {
  return (
    <div className="my-auto flex justify-center">
      <div className="mb-10 flex flex-col gap-5">
        <h1 className="text-4xl font-bold">Edit Profile</h1>
        <div className="flex gap-10 rounded-xl p-5 shadow-2xl">
          <div className="group relative overflow-hidden rounded-full">
            <button className="overflow-hidden rounded-full hover:brightness-75">
              <img
                src={userPfp}
                alt=""
                className="h-64 w-64 overflow-hidden rounded-full"
              />
            </button>
            <div className="absolute top-1/2 left-1/2 hidden translate-x-[-50%] translate-y-[-50%] select-none text-center font-extrabold text-white group-hover:block group-hover:brightness-[150%]">
              Change
              <br />
              Avatar
            </div>
          </div>
          <form className="flex flex-col justify-center">
            <p className="mb-1 text-xl font-medium">Username</p>
            <input
              type="text"
              className="rounded-lg border-[1px] border-neutral-400 p-2 outline-none"
            />
            <p className="mt-6 mb-1 text-xl font-medium">Bio</p>
            <textarea
              cols="30"
              rows="4"
              className="resize-none rounded-lg border-[1px] border-neutral-400 p-2 outline-none"
            ></textarea>
          </form>
        </div>
        <div className="flex gap-3">
          <button className="rounded-lg bg-blue-600 px-6 py-3 text-base font-medium text-white hover:brightness-90">
            Save
          </button>
          <button className="rounded-lg border-[1px] border-blue-600 px-6 py-3 text-base font-medium text-black hover:shadow-md">
            Revert
          </button>
        </div>
      </div>
    </div>
  );
}
