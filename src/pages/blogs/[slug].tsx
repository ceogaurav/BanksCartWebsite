import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import BlogMeta from "../../components/blogs/BlogMeta";
import { getAllPosts, getPostBySlug } from "../../lib/posts";
import ReactMarkdown from "react-markdown";

export default function PostPage({ post }) {
  return (
    <>
      <BlogMeta title={post.title} description={post.excerpt} url={`https://bankscart.com/blogs/${post.slug}`} image={post.ogImage} datePublished={post.date} author={post.author} />
      <main className="max-w-3xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-extrabold mb-2">{post.title}</h1>
        <p className="text-sm text-gray-500 mb-6">{post.date} • {post.readingTime}</p>
        <article className="prose prose-lg">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </article>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts();
  const paths = posts.map((p) => ({ params: { slug: p.slug } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params.slug as string;
  const post = getPostBySlug(slug);
  if (!post) return { notFound: true };
  return { props: { post }, revalidate: 60 * 60 * 24 };
};
