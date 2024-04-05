import BlogItem from "@/components/Blog/BlogItem";
import { Metadata } from "next";
import { sanityFetch, getPosts } from "@/sanity/sanity-utils";
import { postQuery } from "@/sanity/sanity-query";
import { Blog } from "@/types/blog";

export const metadata: Metadata = {
  title: "Blog Page - Solid SaaS Boilerplate",
  description: "This is Blog page for Solid Pro",
  // other metadata
};

const BlogPage = async () => {
  const posts: Blog[] = await sanityFetch({
    query: postQuery,
    tags: ["post"],
  });

  return (
    <>
      {/* <!-- ===== Blog Grid Start ===== --> */}

      <section className="py-20 lg:py-25 xl:py-30">
        <div className="mx-auto mt-15 max-w-c-1280 px-4 md:px-8 xl:mt-20 xl:px-0">
          <div className="grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            {posts.length > 0 &&
              posts.map((post, key) => <BlogItem key={key} blog={post} />)}
          </div>
        </div>
      </section>
      {/* <!-- ===== Blog Grid End ===== --> */}
    </>
  );
};

export default BlogPage;
