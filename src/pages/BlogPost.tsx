import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client } from '../../lib/sanity';
import { PortableText } from '@portabletext/react';

export default function BlogPost() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();

  useEffect(() => {
    setLoading(true);
    // Fetch current post AND related posts
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
      .then((result) => {
        console.log("Sanity Data:", result); // Check Console (F12) to see this!
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, [slug]);

  // 1. Loading State
  if (loading) return <div className="text-center py-20 text-xl font-bold">Loading your awesome post...</div>;

  // 2. Error State
  if (error) return <div className="text-center py-20 text-red-600">Error: {error}</div>;

  // 3. Not Found State
  if (!data || !data.currentPost) return (
    <div className="text-center py-20">
      <h1 className="text-2xl font-bold">Blog Post Not Found</h1>
      <p>Check that the URL slug is correct and the post is Published.</p>
    </div>
  );

  const { currentPost, relatedPosts } = data;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* --- LEFT COLUMN: MAIN CONTENT --- */}
        <div className="lg:col-span-2">
          <article>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900 leading-tight">
              {currentPost.title}
            </h1>
            <p className="text-gray-500 mb-8 font-medium">
              Published: {currentPost.publishedAt ? new Date(currentPost.publishedAt).toDateString() : 'Unknown Date'}
            </p>

            {currentPost.mainImage && (
              <img
                src={currentPost.mainImage}
                alt={currentPost.title}
                className="w-full h-auto object-cover rounded-xl mb-10 shadow-lg"
              />
            )}

            {/* Content with Fallback Styling */}
            <div className="prose prose-lg prose-blue max-w-none text-gray-700">
               {/* If body exists, render it. If not, show message */}
              {currentPost.body ? (
                <PortableText value={currentPost.body} />
              ) : (
                <p className="italic text-gray-400">No text content in this post yet...</p>
              )}
            </div>
          </article>

          {/* --- RELATED BLOGS SECTION --- */}
          <div className="mt-16 pt-10 border-t">
            <h3 className="text-2xl font-bold mb-6">You might also like</h3>
            
            {/* Logic: If no related posts, show a message. If yes, show them. */}
            {relatedPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedPosts.map((post) => (
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
            ) : (
              <p className="text-gray-500">More articles coming soon!</p>
            )}
          </div>
        </div>

        {/* --- RIGHT COLUMN: SIDEBAR --- */}
        <aside className="hidden lg:block">
          <div className="sticky top-10 space-y-8">
            <div className="bg-gray-50 p-6 rounded-xl border">
              <h3 className="font-bold text-xl mb-4">About BanksCart</h3>
              <p className="text-gray-600 text-sm mb-4">
                We help you find the best loans and credit cards with instant approval.
              </p>
              <Link to="/" className="block w-full bg-blue-600 text-white text-center py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
                Check Eligibility
              </Link>
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
}
