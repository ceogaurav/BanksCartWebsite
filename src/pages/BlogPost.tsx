import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { client } from '../../lib/sanity';
import { PortableText } from '@portabletext/react';

export default function BlogPost() {
    const [post, setPost] = useState(null);
    const { slug } = useParams(); // Gets the slug from the URL

    useEffect(() => {
        client.fetch(
            `*[_type == "post" && slug.current == $slug][0]{
        title,
        body,
        publishedAt,
        "mainImage": mainImage.asset->url
      }`,
            { slug }
        )
            .then((data) => setPost(data))
            .catch(console.error);
    }, [slug]);

    if (!post) return <div className="text-center py-10">Loading...</div>;

    return (
        <article className="max-w-3xl mx-auto py-12 px-4">
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <p className="text-gray-500 mb-8">{new Date(post.publishedAt).toDateString()}</p>
            {post.mainImage && (
                <img src={post.mainImage} alt={post.title} className="w-full h-[400px] object-cover rounded-xl mb-8" />
            )}
            <div className="prose prose-lg">
                <PortableText value={post.body} />
            </div>
        </article>
    );
}