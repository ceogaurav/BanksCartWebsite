import React from "react";
import { Link } from "react-router-dom";

interface BlogCardProps {
  title: string;
  description: string;
  category: string;
  image: string;
  slug: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  title,
  description,
  category,
  image,
  slug
}) => {
  return (
    <Link to={`/blog/${slug}`}>
      <div className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-all cursor-pointer">
        <img src={image} alt={title} className="w-full h-48 object-cover" />

        <div className="p-4">
          <span className="text-sm font-medium text-green-600">
            {category}
          </span>

          <h3 className="text-lg font-bold text-gray-900 mt-2">{title}</h3>
          <p className="text-gray-600 mt-2 line-clamp-3">{description}</p>

          <p className="text-green-700 font-semibold mt-3">Read More →</p>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
