import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client } from '../../lib/sanity';
import { PortableText } from '@portabletext/react';

export default function BlogPost() {
  const [data, setData] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    // This query grabs the Current Post AND 3 other posts for the "Related" section
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

  if (!data || !data.currentPost) return <div className="text-center py-20 text-xl">Loading...</div>;

  const { currentPost, relatedPosts } = data;

  // CUSTOM STYLING: This manually adds space if the plugin misses anything
  const myPortableTextComponents = {
    block: {
      normal: ({children}) => <p className="mb-6 text-lg leading-8 text-gray-700">{children}</p>,
      h1: ({children}) => <h1 className="text-3xl font-bold mt-12 mb-4 text-gray-900">{children}</h1>,
      h2: ({children}) => <h2 className="text-2xl font-bold mt-10 mb-4 text-blue-900">{children}</h2>,
      h3: ({children}) => <h3 className="text-xl font-bold mt-8 mb-3 text-gray-800">{children}</h3>,
      blockquote: ({children}) => <blockquote className="border-l-4 border-blue-500 pl-4 italic my-6 bg-gray-50 p-4 rounded">{children}</blockquote>,
    },
    list: {
      bullet: ({children}) => <ul className="list-disc ml-6 mb-6 space-y-2 text-gray-700">{children}</ul>,
      number: ({children}) => <ol className="list-decimal ml-6 mb-6 space-y-2 text-gray-700">{children}</ol>,
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      
      {/* Grid Layout: Left Content (2/3) | Right Sidebar (1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* --- LEFT COLUMN: MAIN ARTICLE --- */}
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

            {/* THE CONTENT AREA */}
            <div className="prose prose-lg prose-blue max-w-none">
              <PortableText 
                value={currentPost.body} 
                components={myPortableTextComponents} 
              />
            </div>
          </article>

          {/* --- BOTTOM SECTION: RELATED BLOGS --- */}
          <div className="mt-16 pt-10 border-t">
            <h3 className="text-2xl font-bold mb-6">You might also like</h3>
            
            {relatedPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedPosts.map((post) => (
                  <Link to={`/blog/${post.slug.current}`} key={post.slug.current} className="group block">
                    <div className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
                      {post.imageUrl && (
                        <img src={post.imageUrl} className="h-48 w-full object-cover" alt={post.title} />
                      )}
                      <div className="p-4">
                        <h4 className="font-bold text-gray-900 group-hover:text-blue-600 line-clamp-2">
                          {post.title}
                        </h4>
                        <p className="text-sm text-gray-500 mt-2">
                          {new Date(post.publishedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">No related posts found.</p>
            )}
          </div>
        </div>

        {/* --- RIGHT COLUMN: SIDEBAR --- */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-8">
            
            {/* Widget 1: CTA */}
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
              <h3 className="font-bold text-xl mb-3 text-blue-900">Check Your Score</h3>
              <p className="text-gray-600 text-sm mb-4">
                Don't get rejected again. Check your credit eligibility instantly for free.
              </p>
              <Link to="/" className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-lg">
                Check Free CIBIL Score
              </Link>
            </div>

            {/* Widget 2: Recent Posts List */}
            <div className="bg-white p-6 rounded-xl border shadow-sm">
              <h3 className="font-bold text-xl mb-4 border-b pb-2">Recent Posts</h3>
              <div className="space-y-4">
                {relatedPosts.map((post) => (
                  <Link to={`/blog/${post.slug.current}`} key={post.slug.current} className="flex gap-3 group items-start">
                    {post.imageUrl && (
                      <img src={post.imageUrl} className="w-20 h-20 object-cover rounded-lg flex-shrink-0" alt={post.title} />
                    )}
                    <div>
                      <h4 className="font-medium text-sm text-gray-900 group-hover:text-blue-600 leading-snug">
                        {post.title}
                      </h4>
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
