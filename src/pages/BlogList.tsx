import React, { useEffect, useState } from 'react';
import { client } from '../../lib/sanity'; // Make sure this path points to your sanity.js file
import { Link } from 'react-router-dom';

export default function BlogList() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        client.fetch(`*[_type == "post"] | order(publishedAt desc) {
      title,
      slug,
      publishedAt,
      "imageUrl": mainImage.asset->url,
      "description": seoDescription
    }`)
            .then((data) => setPosts(data))
            .catch(console.error);
    }, []);

    return (
        <div className="max-w-6xl mx-auto py-12 px-4">
            <h1 className="text-4xl font-bold mb-8 text-center">Our Latest Blogs</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                    <Link to={`/blog/${post.slug.current}`} key={post.slug.current}>
                        <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            {post.imageUrl && (
                                <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover" />
                            )}
                            <div className="p-4">
                                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                                <p className="text-gray-600 text-sm">{post.description}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}