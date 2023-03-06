import Link from "next/link";
import kebabCase from "lodash.kebabcase";

export default function FeedContent({ img, author, title, preview, hearts }) {
  return (
    <div className="w-[374px] flex flex-col rounded-lg overflow-hidden border-[1px] border-neutral-200">
      <img src={img} alt="" />
      <div className="flex flex-col px-6 py-10">
        <Link href={`/${kebabCase(author)}`}>
          <span className="font-bold text-xs leading-8 text-neutral-600 hover:underline hover:cursor-pointer">
            {author}
          </span>
        </Link>
        <Link href={`/${kebabCase(author)}/${kebabCase(title)}`}>
          <span className="font-bold text-xl leading-8 text-neutral-900 mb-2 hover:text-blue-700">
            {title}
          </span>
        </Link>
        <p className="font-normal text-base leading-6  text-neutral-600">
          {preview}
        </p>
        <div className="flex mt-8 justify-between">
          <Link href={`/${kebabCase(author)}/${kebabCase(title)}`}>
            <button className="px-6 py-[14px] rounded-lg text-blue-600 border-[1px] border-blue-600 text-base font-medium leading-4">
              Learn More {"->"}
            </button>
          </Link>
          <div className="flex gap-1">
            <div className="w-4 my-auto">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/blog-app-5c7f4.appspot.com/o/icons%2Fheart.svg?alt=media&token=be5997e0-241e-4a64-8a33-f40cf90e89bc"
                alt=""
              />
            </div>
            <span className="text-neutral-500 my-auto leading-4 text-base font-medium">
              {hearts}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
