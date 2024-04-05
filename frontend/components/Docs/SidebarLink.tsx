"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SidebarLink = ({ post }) => {
  const pathUrl = usePathname();

  return (
    <>
      <li className="block">
        <Link
          href={`/docs/${post?.slug}`}
          className={`flex w-full rounded-sm bg-stroke px-3 py-2 text-base ${
            pathUrl === `/docs/${post?.slug}`
              ? "text-black dark:bg-blackho dark:text-white"
              : "bg-white dark:bg-black  dark:text-white "
          }`}
        >
          {post?.title}
        </Link>
      </li>
    </>
  );
};

export default SidebarLink;
