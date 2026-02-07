import React from "react";
import BlogCard from "./BlogCard";
import { motion } from "framer-motion";

const listVars = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } }
};

export default function BlogList({ posts }: { posts: any[] }) {
  return (
    <motion.div variants={listVars} initial="hidden" animate="visible" className="grid gap-8">
      {posts.map((p) => (
        <BlogCard
          key={p.slug}
          title={p.title}
          excerpt={p.excerpt}
          date={p.date}
          tags={p.tags}
          slug={p.slug}
          readingTime={p.readingTime}
        />
      ))}
    </motion.div>
  );
}
