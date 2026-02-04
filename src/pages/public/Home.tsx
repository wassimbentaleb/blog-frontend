import React, { useState, useEffect } from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import PostCard from '../../components/common/PostCard';
import { mockAPI } from '../../services/mockData';

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

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await mockAPI.getAllPosts();
      // Laravel pagination wraps data in 'data' property
      setPosts(response.data || response);
    } catch (error: any) {
      console.error('Failed to fetch posts:', error);
      setError('Failed to load posts. Using sample data for demo.');
      // Set sample data for demonstration
      setSamplePosts();
    } finally {
      setLoading(false);
    }
  };

  const setSamplePosts = () => {
    const samplePosts: Post[] = [
      {
        id: 1,
        title: 'The Impact of Technology on the Workplace: How Technology is Changing',
        slug: 'impact-of-technology-on-workplace',
        excerpt: 'Traveling is an enriching experience that opens up new horizons, exposes us to different cultures, and creates memories that last a lifetime.',
        featured_image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
        published_at: '2023-08-20',
        category: { id: 1, name: 'Technology', slug: 'technology' },
        user: { id: 1, name: 'Tracey Wilson' },
      },
      {
        id: 2,
        title: 'Top 10 Travel Destinations for 2024',
        slug: 'top-10-travel-destinations-2024',
        excerpt: 'Discover the most beautiful and exciting places to visit this year.',
        featured_image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800',
        published_at: '2023-08-18',
        category: { id: 2, name: 'Travel', slug: 'travel' },
        user: { id: 2, name: 'Jason Francisco' },
      },
      {
        id: 3,
        title: 'How to Build a Successful Startup in 2024',
        slug: 'how-to-build-successful-startup',
        excerpt: 'Learn the essential steps to launching and growing a successful business.',
        featured_image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800',
        published_at: '2023-08-15',
        category: { id: 3, name: 'Business', slug: 'business' },
        user: { id: 3, name: 'Elizabeth Slavin' },
      },
      {
        id: 4,
        title: 'Healthy Living: Tips for a Balanced Lifestyle',
        slug: 'healthy-living-tips',
        excerpt: 'Simple habits that can transform your health and wellbeing.',
        featured_image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800',
        published_at: '2023-08-12',
        category: { id: 4, name: 'Lifestyle', slug: 'lifestyle' },
        user: { id: 4, name: 'Ernie Smith' },
      },
      {
        id: 5,
        title: 'The Future of AI and Machine Learning',
        slug: 'future-of-ai-machine-learning',
        excerpt: 'Exploring the latest trends and innovations in artificial intelligence.',
        featured_image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
        published_at: '2023-08-10',
        category: { id: 1, name: 'Technology', slug: 'technology' },
        user: { id: 1, name: 'Tracey Wilson' },
      },
      {
        id: 6,
        title: 'Digital Marketing Strategies That Work',
        slug: 'digital-marketing-strategies',
        excerpt: 'Proven tactics to grow your business online in 2024.',
        featured_image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
        published_at: '2023-08-08',
        category: { id: 3, name: 'Business', slug: 'business' },
        user: { id: 2, name: 'Jason Francisco' },
      },
    ];
    setPosts(samplePosts);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Loading posts...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Latest Posts
          </h1>
          <p className="text-lg text-gray-600">
            Discover stories, thinking, and expertise from writers on any topic.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-8">
            {error}
          </div>
        )}

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg">No posts found.</p>
            <p className="text-gray-500 mt-2">Check back later for new content!</p>
          </div>
        )}

        {/* Load More Button */}
        {posts.length > 0 && (
          <div className="text-center mt-12">
            <button className="bg-gray-100 text-gray-700 px-8 py-3 rounded-md hover:bg-gray-200 transition font-medium">
              Load More
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Home;
