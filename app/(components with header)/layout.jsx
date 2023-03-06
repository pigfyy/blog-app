import Header from "./Header";

export default function HeaderLayout({
  children, // will be a page or nested layout
}) {
  return (
    <>
      <Header />
      <div className="mx-28 h-screen flex flex-col mt-32">{children}</div>
    </>
  );
}
