import Header from "./Header";

export default function HeaderLayout({
  children, // will be a page or nested layout
}) {
  return (
    <>
      <Header />
      <div className="mx-28 min-h-screen flex flex-col pt-32 mb-10">
        {children}
      </div>
    </>
  );
}
