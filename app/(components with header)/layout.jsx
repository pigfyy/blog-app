import Header from "./Header";
import UserState from "./UserState";

export default function HeaderLayout({ children }) {
  return (
    <>
      <Header />
      <div className="mx-auto flex min-h-screen w-5/6 flex-col pt-32 pb-10 max-[585px]:w-full">
        <UserState>{children}</UserState>
      </div>
    </>
  );
}
