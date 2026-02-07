import { client } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import Image from "next/image";

// 1. Fetch the specific blog post
async function getPost(slug) {
    const query = `*[_type == "post" && slug.current == $slug][0] {
    title,
    body,
    publishedAt,
    "mainImage": mainImage.asset->url,
    "seoDescription": seoDescription
  }`;
    return await client.fetch(query, { slug });
}

// 2. GENERATE SEO (Google Search Console Logic)
export async function generateMetadata({ params }) {
    const { slug } = await params;
    const post = await getPost(slug);

    if (!post) return;

    return {
        title: `${post.title} | BanksCart`,
        description: post.seoDescription,
        openGraph: {
            images: [post.mainImage],
        },
    };
}

// 3. The Page Component
export default async function BlogPost({ params }) {
    const { slug } = await params;
    const post = await getPost(slug);

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-2xl font-bold text-gray-400">Blog Post Not Found</h1>
            </div>
        );
    }

    return (
        <article className="max-w-4xl mx-auto py-12 px-4">
            {/* Header */}
            <div className="mb-8 text-center">
                <h1 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">{post.title}</h1>
                <p className="text-gray-500">
                    Published: {new Date(post.publishedAt).toDateString()}
                </p>
            </div>

            {/* Main Image */}
            {post.mainImage && (
                <div className="relative w-full h-[400px] mb-10 rounded-xl overflow-hidden shadow-lg">
                    <img
                        src={post.mainImage}
                        alt={post.title}
                        className="object-cover w-full h-full"
                    />
                </div>
            )}

            {/* Blog Content */}
            <div className="prose prose-lg prose-blue max-w-none">
                <PortableText value={post.body} />
            </div>
        </article>
    );
}