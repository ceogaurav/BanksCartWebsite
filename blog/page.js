import { client } from "@/lib/sanity"; // Make sure this path matches where you put sanity.js
import Link from "next/link";

// 1. Fetch all blog posts
async function getPosts() {
    const query = `*[_type == "post"] | order(publishedAt desc) {
    title,
    slug,
    publishedAt,
    "imageUrl": mainImage.asset->url,
    "description": seoDescription
  }`;
    return await client.fetch(query);
}

// 2. The Page Component
export default async function BlogPage() {
    const posts = await getPosts();

    return (
        <div className="max-w-6xl mx-auto py-12 px-4">
            <h1 className="text-4xl font-bold mb-8 text-center">Our Latest Blogs</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                    <Link href={`/blog/${post.slug.current}`} key={post.slug.current} className="group">
                        <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            {/* Blog Image */}
                            {post.imageUrl && (
                                <img
                                    src={post.imageUrl}
                                    alt={post.title}
                                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            )}

                            {/* Blog Content */}
                            <div className="p-4">
                                <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-600">{post.title}</h2>
                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.description}</p>
                                <span className="text-xs text-gray-400">
                                    {new Date(post.publishedAt).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}