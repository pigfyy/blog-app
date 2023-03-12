import Header from "./Header";

export default function HeaderLayout({ children }) {
  return (
    <>
      <Header />
      <div className="mx-28 flex min-h-screen flex-col pt-32 pb-10">
        {children}
      </div>
    </>
  );
}
