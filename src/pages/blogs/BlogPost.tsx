import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { client } from '../../lib/sanity'; // Ensure this path is correct
import { PortableText } from '@portabletext/react';
import { Helmet } from 'react-helmet-async';

interface BlogPost {
    title: string;
    mainImage: string;
    body: any;
    publishedAt: string;
    seoDescription: string;
}

export default function BlogPost() {
    const { slug } = useParams<{ slug: string }>();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!slug) return;

        const query = `*[_type == "post" && slug.current == $slug][0] {
      title,
      "mainImage": mainImage.asset->url,
      body,
      publishedAt,
      "seoDescription": string(body[0].children[0].text)
    }`;

        client.fetch(query, { slug })
            .then((data) => {
                setPost(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Sanity fetch error:", err);
                setLoading(false);
            });
    }, [slug]);

    if (loading) return <div className="text-center py-10">Loading...</div>;
    if (!post) return <div className="text-center py-10">Post not found</div>;

    return (
        <>
            <Helmet>
                <title>{`${post.title} | BanksCart`}</title>
                <meta name="description" content={post.seoDescription} />
                <meta property="og:image" content={post.mainImage} />
            </Helmet>

            <article className="max-w-3xl mx-auto py-10 px-4">
                <h1 className="text-4xl font-bold mb-4 text-gray-900">{post.title}</h1>
                <p className="text-gray-500 mb-8">
                    Published: {new Date(post.publishedAt).toDateString()}
                </p>

                {post.mainImage && (
                    <img
                        src={post.mainImage}
                        alt={post.title}
                        className="w-full h-64 object-cover rounded-lg mb-8"
                    />
                )}

                <div className="prose lg:prose-xl">
                    <PortableText value={post.body} />
                </div>
            </article>
        </>
    );
}
