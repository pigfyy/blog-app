function Button() {
  return (
    <button className="mt-3 outline-[#00000032] rounded-md outline outline-[1px]">
      <div className="flex items-center gap-2 rounded-sm bg-white p-3 py-2">
        <div className="h-[22px] w-[22px]">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt=""
          />
        </div>
        <span className="text-[14px] font-medium text-neutral-450">
          Sign in with Google
        </span>
      </div>
    </button>
  );
}

export default function Login() {
  return (
    <div
      style={{
        backgroundImage:
          "url(https://firebasestorage.googleapis.com/v0/b/blog-app-5c7f4.appspot.com/o/login-bg.jpg?alt=media&token=ae45c795-c0a8-4f2f-b39c-0b79b66a52ac)",
      }}
      className="flex justify-center items-center bg-cover bg-center h-screen"
    >
      <div className="flex flex-col gap-2 bg-neutral-700 p-10 rounded-lg">
        <h1 className="text-2xl font-bold text-white text-center">
          Welcome Back!
        </h1>
        <p className="text-md text-neutral-300 font-light text-center">
          {"It's good to see you again!"}
        </p>
        <Button />
      </div>
    </div>
  );
}
