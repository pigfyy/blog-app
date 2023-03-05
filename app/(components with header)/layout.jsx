import Header from "./Header";

export default function HeaderLayout({
  children, // will be a page or nested layout
}) {
  return (
    <div className="mx-[112px] h-screen flex flex-col">
      <Header />
      {children}
    </div>
  );
}
