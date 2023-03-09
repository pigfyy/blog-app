import Button from "./Button";

export default function Login() {
  return (
    <div
      style={{
        backgroundImage:
          "url(https://firebasestorage.googleapis.com/v0/b/blog-c2483.appspot.com/o/login-bg.jpg?alt=media&token=e56e4824-a75e-4589-9baf-ac67a704b0d7)",
      }}
      className="flex h-screen items-center justify-center bg-cover bg-center"
    >
      <div className="flex flex-col gap-2 rounded-lg bg-neutral-700 p-10">
        <h1 className="text-center text-2xl font-bold text-white">
          Welcome Back!
        </h1>
        <p className="text-md text-center font-light text-neutral-300">
          {"It's good to see you again!"}
        </p>
        <Button />
      </div>
    </div>
  );
}
