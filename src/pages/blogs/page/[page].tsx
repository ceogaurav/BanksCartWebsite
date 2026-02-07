import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import BlogList from "../../../components/blogs/BlogList";
import Pagination from "../../../components/blogs/Pagination";
import BlogMeta from "../../../components/blogs/BlogMeta";
import { getAllPostsPaginated } from "../../../lib/posts";

export default function BlogsPage({ posts, currentPage, totalPages }) {
  return (
    <>
      <BlogMeta title={`Bankscart Blog — Page ${currentPage}`} description="Bankscart — guides, product comparisons and tips." url={`https://bankscart.com/blogs/page/${currentPage}`} />
      <main className="max-w-6xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-6">Blog — Page {currentPage}</h1>
        <BlogList posts={posts} />
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const perPage = 9;
  const { totalPages } = getAllPostsPaginated(1, perPage); // helper returns totalPages as well
  const paths = Array.from({ length: totalPages - 1 }).map((_, i) => ({
    params: { page: String(i + 2) } // page 2..N
  }));
  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const page = parseInt(params.page as string, 10);
  const perPage = 9;
  const { posts, totalPages } = getAllPostsPaginated(page, perPage);
  if (!posts) return { notFound: true };
  return { props: { posts, currentPage: page, totalPages }, revalidate: 60 * 10 };
};
