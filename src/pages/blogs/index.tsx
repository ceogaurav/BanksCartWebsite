import React from "react";
import { GetStaticProps } from "next";
import BlogList from "../../components/blogs/BlogList";
import Pagination from "../../components/blogs/Pagination";
import BlogMeta from "../../components/blogs/BlogMeta";
import { getAllPostsPaginated } from "../../lib/posts";

export default function BlogsIndex({ posts, currentPage, totalPages }) {
  return (
    <>
      <BlogMeta title="Banking & Finance Blogs" description="Bankscart — guides, comparisons and tips for banking, credit cards, and investments." url="https://bankscart.com/blogs" />
      <main className="max-w-6xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-extrabold mb-6">Bankscart Blog</h1>
        <p className="text-gray-600 mb-8">Latest guides, product comparisons and finance tips.</p>
        <BlogList posts={posts} />
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const perPage = 9;
  const { posts, totalPages } = getAllPostsPaginated(1, perPage);
  return {
    props: { posts, currentPage: 1, totalPages },
    revalidate: 60 * 10 // 10 minutes
  };
};
