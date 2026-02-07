import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client } from '../../lib/sanity';
import { PortableText } from '@portabletext/react';

export default function BlogPost() {
    const [data, setData] = useState(null);
    const { slug } = useParams();

    useEffect(() => {
        // This query fetches 3 things: The current post, Related posts, and Recent posts
        const query = `{
      "currentPost": *[_type == "post" && slug.current == $slug][0]{
        title,
        body,
        publishedAt,
        "mainImage": mainImage.asset->url
      },
      "relatedPosts": *[_type == "post" && slug.current != $slug] | order(publishedAt desc)[0...3]{
        title,
        slug,
        "imageUrl": mainImage.asset->url,
        publishedAt
      }
    }`;

        client.fetch(query, { slug })
            .then((result) => setData(result))
            .catch(console.error);
    }, [slug]);

    if (!data || !data.currentPost) return <div className="text-center py-20">Loading...</div>;

    const { currentPost, relatedPosts } = data;

    // Custom styling for the blog content
    const ptComponents = {
        block: {
            normal: ({ children }) => <p className="mb-6 leading-relaxed text-gray-700">{children}</p>,
            h1: ({ children }) => <h1 className="text-3xl font-bold mt-10 mb-4">{children}</h1>,
            h2: ({ children }) => <h2 className="text-2xl font-bold mt-8 mb-4 text-blue-900">{children}</h2>,
            h3: ({ children }) => <h3 className="text-xl font-bold mt-6 mb-3">{children}</h3>,
            blockquote: ({ children }) => <blockquote className="border-l-4 border-blue-500 pl-4 italic my-6 bg-gray-50 p-4">{children}</blockquote>,
        },
        list: {
            bullet: ({ children }) => <ul className="list-disc ml-8 mb-6 space-y-2">{children}</ul>,
            number: ({ children }) => <ol className="list-decimal ml-8 mb-6 space-y-2">{children}</ol>,
        },
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                {/* LEFT COLUMN: Main Blog Content */}
                <div className="lg:col-span-2">
                    <article>
                        <h1 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900 leading-tight">
                            {currentPost.title}
                        </h1>
                        <p className="text-gray-500 mb-8 font-medium">
                            Published: {new Date(currentPost.publishedAt).toDateString()}
                        </p>

                        {currentPost.mainImage && (
                            <img
                                src={currentPost.mainImage}
                                alt={currentPost.title}
                                className="w-full h-auto object-cover rounded-xl mb-10 shadow-lg"
                            />
                        )}

                        {/* THE CONTENT FIX: "prose" class handles the spacing automatically */}
                        <div className="prose prose-lg prose-blue max-w-none">
                            <PortableText value={currentPost.body} components={ptComponents} />
                        </div>
                    </article>

                    {/* RELATED BLOGS (Bottom Section) */}
                    <div className="mt-16 pt-10 border-t">
                        <h3 className="text-2xl font-bold mb-6">You might also like</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {relatedPosts.slice(0, 2).map((post) => (
                                <Link to={`/blog/${post.slug.current}`} key={post.slug.current} className="group">
                                    <div className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
                                        {post.imageUrl && (
                                            <img src={post.imageUrl} className="h-48 w-full object-cover" alt={post.title} />
                                        )}
                                        <div className="p-4">
                                            <h4 className="font-bold group-hover:text-blue-600 line-clamp-2">{post.title}</h4>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: Sidebar */}
                <aside className="hidden lg:block">
                    <div className="sticky top-10 space-y-8">

                        {/* Widget 1: About */}
                        <div className="bg-gray-50 p-6 rounded-xl border">
                            <h3 className="font-bold text-xl mb-4">About BanksCart</h3>
                            <p className="text-gray-600 text-sm mb-4">
                                We help you find the best loans and credit cards with instant approval. Check your eligibility for free.
                            </p>
                            <Link to="/" className="block w-full bg-blue-600 text-white text-center py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
                                Check Free Score
                            </Link>
                        </div>

                        {/* Widget 2: Recent Posts List */}
                        <div>
                            <h3 className="font-bold text-xl mb-4">Recent Posts</h3>
                            <div className="space-y-4">
                                {relatedPosts.map((post) => (
                                    <Link to={`/blog/${post.slug.current}`} key={post.slug.current} className="flex gap-4 group">
                                        {post.imageUrl && (
                                            <img src={post.imageUrl} className="w-20 h-20 object-cover rounded-lg flex-shrink-0" alt={post.title} />
                                        )}
                                        <div>
                                            <h4 className="font-medium text-sm text-gray-900 group-hover:text-blue-600 leading-snug">
                                                {post.title}
                                            </h4>
                                            <span className="text-xs text-gray-400 mt-1 block">
                                                {new Date(post.publishedAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                    </div>
                </aside>

            </div>
        </div>
    );
}