import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const postsDir = path.join(process.cwd(), "content", "blogs");

type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  tags?: string[];
  ogImage?: string;
  readingTime?: string;
  author?: string;
};

export function getAllPosts(): Post[] {
  const filenames = fs.readdirSync(postsDir).filter(f => f.endsWith(".md"));
  const posts = filenames.map((filename) => {
    const full = path.join(postsDir, filename);
    const file = fs.readFileSync(full, "utf-8");
    const { data, content } = matter(file);
    const slug = filename.replace(/\.md$/, "");
    return {
      slug,
      title: data.title || slug,
      date: data.date || null,
      excerpt: data.excerpt || (content.slice(0, 160) + "..."),
      content,
      tags: data.tags || [],
      ogImage: data.ogImage || null,
      readingTime: readingTime(content).text,
      author: data.author || "Bankscart"
    };
  });

  // sort by date desc
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | null {
  const full = path.join(postsDir, `${slug}.md`);
  if (!fs.existsSync(full)) return null;
  const file = fs.readFileSync(full, "utf-8");
  const { data, content } = matter(file);
  return {
    slug,
    title: data.title,
    date: data.date,
    excerpt: data.excerpt,
    content,
    tags: data.tags || [],
    ogImage: data.ogImage || null,
    readingTime: readingTime(content).text,
    author: data.author || "Bankscart"
  };
}

export function getAllPostsPaginated(page = 1, perPage = 9) {
  const all = getAllPosts();
  const total = all.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  if (page < 1 || page > totalPages) return { posts: null, totalPages };
  const start = (page - 1) * perPage;
  const posts = all.slice(start, start + perPage);
  return { posts, totalPages, total };
}
