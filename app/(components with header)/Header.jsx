import Link from "next/link";

const { isSignedIn, userPfp } = {
  isSignedIn: false,
  userPfp:
    "https://cdn.discordapp.com/avatars/368167875740958721/36a8b24e792f03e2c0d037c9e1016600.png?size=4096",
};

export default function Header() {
  return (
    <div className="flex w-full py-7 justify-between items-center">
      <Link href="/">
        <div className="flex gap-2 select-none">
          <div className="w-10 h-10">
            <img src="/favicon.ico" alt="" />
          </div>
          <span className="text-[#374151] text-[20px] font-bold leading-[21px]">
            Modern
            <br />
            Blog App
          </span>
        </div>
      </Link>
      <div className="flex gap-3 items-center">
        {isSignedIn && (
          <>
            <button className="font-medium text-base text-black border-blue-600 border-[1px] rounded-lg px-6 py-3 hover:shadow-md">
              Write Post
            </button>
            <button className="w-10 h-10 rounded-full overflow-hidden">
              <img src={userPfp} alt="" />
            </button>
          </>
        )}
        {!isSignedIn && (
          <Link href="/login">
            <button className="font-medium text-base text-white bg-blue-600 rounded-lg px-6 py-3 hover:brightness-90">
              Sign In
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
