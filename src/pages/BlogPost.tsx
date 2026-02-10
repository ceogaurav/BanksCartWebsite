import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client } from '../../lib/sanity';
import { PortableText } from '@portabletext/react';

export default function BlogPost() {
    const [data, setData] = useState(null);
    const { slug } = useParams();

    useEffect(() => {
        // Fetch current post and broad list of recent posts
        // Switched order to _createdAt to ensure results even if publishedAt is missing
        const query = `{
      "currentPost": *[_type == "post" && slug.current == $slug][0]{
        title,
        body,
        publishedAt,
        "mainImage": mainImage.asset->url,
        "authorName": author->name,
        "authorImage": author->image.asset->url
      },
      "latestPosts": *[_type == "post"] | order(_createdAt desc)[0...10]{
        title,
        slug,
        "imageUrl": mainImage.asset->url,
        publishedAt,
        _createdAt
      }
    }`;

        client.fetch(query, { slug })
            .then((result) => {
                setData(result);
            })
            .catch((err) => {
                console.error("Sanity Fetch Error:", err);
            });
    }, [slug]);

    if (!data || !data.currentPost) return <div className="text-center py-20">Loading...</div>;

    const { currentPost, latestPosts } = data;

    // Filter out the current post from the latest list to create "Related" and "Recent" lists
    const relatedPosts = latestPosts ? latestPosts.filter((p: any) => p.slug.current !== slug) : [];

    // Custom styling for the blog content
    const ptComponents = {
        block: {
            normal: ({ children }: any) => <p className="mb-6 leading-relaxed text-gray-700">{children}</p>,
            h1: ({ children }: any) => <h1 className="text-3xl font-bold mt-10 mb-4">{children}</h1>,
            h2: ({ children }: any) => <h2 className="text-2xl font-bold mt-8 mb-4 text-blue-900">{children}</h2>,
            h3: ({ children }: any) => <h3 className="text-xl font-bold mt-6 mb-3">{children}</h3>,
            blockquote: ({ children }: any) => <blockquote className="border-l-4 border-blue-500 pl-4 italic my-6 bg-gray-50 p-4">{children}</blockquote>,
        },
        list: {
            bullet: ({ children }: any) => <ul className="list-disc ml-8 mb-6 space-y-2">{children}</ul>,
            number: ({ children }: any) => <ol className="list-decimal ml-8 mb-6 space-y-2">{children}</ol>,
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

                        <div className="prose prose-lg prose-blue max-w-none">
                            <PortableText value={currentPost.body} components={ptComponents} />
                        </div>
                    </article>

                    {/* RELATED BLOGS (Bottom Section) */}
                    {relatedPosts.length > 0 && (
                        <div className="mt-16 pt-10 border-t border-gray-200">
                            <h3 className="text-2xl font-bold mb-6 text-gray-900">You might also like</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {relatedPosts.slice(0, 4).map((post: any) => (
                                    <Link to={`/blog/${post.slug.current}`} key={post.slug.current} className="group block h-full">
                                        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col">
                                            {post.imageUrl ? (
                                                <div className="relative overflow-hidden h-48">
                                                    <img
                                                        src={post.imageUrl}
                                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                                        alt={post.title}
                                                    />
                                                </div>
                                            ) : (
                                                <div className="h-48 bg-slate-100 flex items-center justify-center text-slate-400">
                                                    No Image
                                                </div>
                                            )}
                                            <div className="p-5 flex flex-col flex-grow">
                                                <h4 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 line-clamp-2 mb-2 transition-colors">
                                                    {post.title}
                                                </h4>
                                                <p className="text-sm text-gray-500 mt-auto">
                                                    {new Date(post.publishedAt || post._createdAt || Date.now()).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* RIGHT COLUMN: Sidebar */}
                <aside className="hidden lg:block">
                    <div className="sticky top-24 space-y-8">

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
                        {relatedPosts.length > 0 && (
                            <div>
                                <h3 className="font-bold text-xl mb-4">Recent Posts</h3>
                                <div className="space-y-4">
                                    {relatedPosts.map((post: any) => (
                                        <Link to={`/blog/${post.slug.current}`} key={post.slug.current} className="flex gap-4 group">
                                            {post.imageUrl ? (
                                                <img src={post.imageUrl} className="w-20 h-20 object-cover rounded-lg flex-shrink-0" alt={post.title} />
                                            ) : (
                                                <div className="w-20 h-20 bg-slate-100 rounded-lg flex-shrink-0 flex items-center justify-center text-xs text-slate-400">No Img</div>
                                            )}
                                            <div>
                                                <h4 className="font-medium text-sm text-gray-900 group-hover:text-blue-600 leading-snug line-clamp-2">
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
                        )}

                    </div>
                </aside>

            </div>
        </div>
    );
}