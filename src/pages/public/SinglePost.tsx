import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import { mockAPI } from '../../services/mockData';
import { formatDate } from '../../utils/helpers';

interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
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
    email: string;
  };
}

const SinglePost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (slug) {
      fetchPost(slug);
    }
  }, [slug]);

  const fetchPost = async (postSlug: string) => {
    try {
      const data = await mockAPI.getPostBySlug(postSlug);
      setPost(data);
    } catch (error: any) {
      console.error('Failed to fetch post:', error);
      setError('Post not found');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Loading post...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-8">The post you're looking for doesn't exist.</p>
          <Link
            to="/"
            className="bg-primary text-white px-6 py-3 rounded-md hover:bg-blue-600 transition inline-block"
          >
            Back to Home
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <article className="max-w-4xl mx-auto px-4 py-12">
        {/* Error Message */}
        {error && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-8">
            {error}
          </div>
        )}

        {/* Category Badge */}
        <div className="mb-6">
          <Link
            to={`/category/${post.category.slug}`}
            className="inline-block bg-primary text-white text-sm font-semibold px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            {post.category.name}
          </Link>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          {post.title}
        </h1>

        {/* Meta Info */}
        <div className="flex items-center mb-8 pb-8 border-b border-gray-200">
          <p className="text-sm text-gray-500">{formatDate(post.published_at)}</p>
        </div>

        {/* Featured Image */}
        {post.featured_image && (
          <div className="mb-8 rounded-lg overflow-hidden">
            <img
              src={post.featured_image}
              alt={post.title}
              className="w-full h-auto"
            />
          </div>
        )}

        {/* Post Content */}
        <div
          className="prose prose-lg max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: post.content }}
          style={{
            lineHeight: '1.8',
            color: '#374151',
          }}
        />

        {/* Related Posts */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* You can add related posts here */}
            <p className="text-gray-500 col-span-3">No related posts yet.</p>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default SinglePost;
