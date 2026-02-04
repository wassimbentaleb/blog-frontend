import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/helpers';

interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  featured_image?: string;
  published_at: string | null;
  category: {
    id: number;
    name: string;
    slug: string;
  };
  user: {
    id: number;
    name: string;
  };
}

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <Link to={`/post/${post.slug}`} className="block group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
        {/* Featured Image */}
        {post.featured_image ? (
          <div className="relative h-48 overflow-hidden">
            <img
              src={post.featured_image}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        ) : (
          <div className="relative h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
            <span className="text-white text-4xl font-bold opacity-50">MB</span>
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {/* Category Badge */}
          <span className="inline-block bg-primary bg-opacity-10 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-3">
            {post.category.name}
          </span>

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h3>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {post.excerpt}
            </p>
          )}

          {/* Meta Info */}
          <div className="flex items-center text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-xs font-semibold text-gray-600">
                  {post.user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="font-medium">{post.user.name}</span>
            </div>
            <span className="mx-2">•</span>
            <span>{formatDate(post.published_at)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
