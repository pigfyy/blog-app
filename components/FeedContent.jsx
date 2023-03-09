import Link from "next/link";
import kebabCase from "lodash.kebabcase";

export default function FeedContent({ img, author, title, preview, hearts }) {
  return (
    <div className="flex w-[374px] flex-col overflow-hidden rounded-lg border-[1px] border-neutral-200">
      <img src={img} alt="" />
      <div className="flex flex-col px-6 py-10">
        <Link href={`/${kebabCase(author)}`}>
          <span className="text-xs font-bold leading-8 text-neutral-600 hover:cursor-pointer hover:underline">
            {author}
          </span>
        </Link>
        <Link href={`/${kebabCase(author)}/${kebabCase(title)}`}>
          <span className="mb-2 text-xl font-bold leading-8 text-neutral-900 hover:text-blue-700">
            {title}
          </span>
        </Link>
        <p className="text-base font-normal leading-6  text-neutral-600">
          {preview}
        </p>
        <div className="mt-8 flex justify-between">
          <Link href={`/${kebabCase(author)}/${kebabCase(title)}`}>
            <button className="rounded-lg border-[1px] border-blue-600 px-6 py-[14px] text-base font-medium leading-4 text-blue-600">
              Learn More {"->"}
            </button>
          </Link>
          <div className="flex gap-1">
            <div className="my-auto w-4">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/blog-c2483.appspot.com/o/icons%2Fheart.svg?alt=media&token=e41bf294-f439-41f5-b654-72aaa16422e2"
                alt=""
              />
            </div>
            <span className="my-auto text-base font-medium leading-4 text-neutral-500">
              {hearts}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
