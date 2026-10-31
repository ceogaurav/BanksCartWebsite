import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client } from '../../lib/sanity';
import { PortableText } from '@portabletext/react';
import { Helmet } from 'react-helmet-async';
import { AuthorByline } from '../../components/blog/AuthorByline';
import { ShieldCheck, Info } from 'lucide-react';

interface BlogPostData {
    title: string;
    mainImage: string;
    body: any;
    publishedAt: string;
    seoDescription: string;
}

export default function BlogPost() {
    const { slug } = useParams<{ slug: string }>();
    const [post, setPost] = useState<BlogPostData | null>(null);
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

    if (loading) return <div className="text-center py-20 text-slate-500 font-medium">Loading guide...</div>;
    if (!post) return <div className="text-center py-20 text-slate-500 font-medium">Post not found</div>;

    const formattedPublishedDate = post.publishedAt
        ? new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        : 'October 15, 2026';

    return (
        <>
            <Helmet>
                <title>{`${post.title} | BanksCart Financial Guides`}</title>
                <meta name="description" content={post.seoDescription || `Complete financial guide on ${post.title}. Verified by chartered accountants and ex-banking advisors on BanksCart.`} />
                <link rel="canonical" href={`https://www.bankscart.com/blog/${slug}`} />
                {post.mainImage && <meta property="og:image" content={post.mainImage} />}
            </Helmet>

            <article className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8 pt-20">
                {/* Breadcrumbs */}
                <nav aria-label="Breadcrumb" className="text-xs text-slate-500 mb-6">
                    <ol className="flex items-center space-x-2">
                        <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
                        <li><span>/</span></li>
                        <li><Link to="/blog" className="hover:text-blue-600">Financial Guides</Link></li>
                        <li><span>/</span></li>
                        <li className="text-slate-800 font-medium truncate max-w-[280px]" aria-current="page">{post.title}</li>
                    </ol>
                </nav>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight mb-4 tracking-tight">
                    {post.title}
                </h1>

                {/* Verified Author & Reviewer Byline System */}
                <AuthorByline
                    authorSlug="raghav-singhal"
                    reviewerSlug="amit-khurana"
                    publishedDate={formattedPublishedDate}
                    updatedDate="October 31, 2026"
                    readTime="9 min read"
                    showBioCard={true}
                />

                {post.mainImage && (
                    <div className="my-8">
                        <img
                            src={post.mainImage}
                            alt={post.title}
                            className="w-full h-72 sm:h-96 object-cover rounded-2xl shadow-sm border border-slate-200"
                        />
                    </div>
                )}

                <div className="prose prose-slate lg:prose-lg max-w-none leading-relaxed text-slate-700">
                    <PortableText value={post.body} />
                </div>

                {/* Regulatory Disclosure & Non-Lender Notice */}
                <div className="mt-12 p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 text-xs text-slate-600 leading-relaxed font-sans">
                    <div className="flex items-center gap-2 text-slate-800 font-bold uppercase tracking-wider">
                        <ShieldCheck className="w-4 h-4 text-blue-600" />
                        <span>Regulatory Disclosure & Non-Lender Status</span>
                    </div>
                    <p>
                        BanksCart is an independent digital loan and credit comparison marketplace. BanksCart is not a licensed bank, NBFC, or credit institution, and does not lend money directly. All loan approvals, interest rates, disbursal terms, and credit decisions are made exclusively at the discretion of RBI-regulated banks and NBFC partners. We do not charge borrowers upfront processing fees for loan matching.
                    </p>
                    <div className="pt-2 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
                        <span>BanksCart Financial Technologies Pvt. Ltd. • CIN: U67190DL2024PTC428910</span>
                        <Link to="/editorial-policy" className="text-blue-600 hover:underline font-semibold">
                            Read Our Editorial & Fact-Checking Policy &rarr;
                        </Link>
                    </div>
                </div>
            </article>
        </>
    );
}
