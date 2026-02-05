import React, { useState, useEffect } from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import PostCard from '../../components/common/PostCard';
import { apiService } from '../../services/apiData';

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
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchPosts(1);
  }, []);

  const fetchPosts = async (page: number, append: boolean = false) => {
    if (append) {
      setLoadingMore(true);
    } else {
      setLoading(true);
    }

    try {
      const response = await apiService.getAllPosts({
        page,
        per_page: 9,
      });

      const newPosts = response.data || response || [];

      if (append) {
        setPosts((prev) => [...prev, ...newPosts]);
      } else {
        setPosts(newPosts);
      }

      setHasMore(page < (response.last_page || 1));
      setCurrentPage(page);
    } catch (error: any) {
      console.error('Failed to fetch posts:', error);
      if (!append) {
        setError('Failed to load posts. Using sample data for demo.');
        setSamplePosts();
      }
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const loadMore = () => {
    if (hasMore && !loadingMore) {
      fetchPosts(currentPage + 1, true);
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
        {posts.length > 0 && hasMore && (
          <div className="text-center mt-12">
            <button
              onClick={loadMore}
              disabled={loadingMore}
              className="bg-gray-100 text-gray-700 px-8 py-3 rounded-md hover:bg-gray-200 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loadingMore ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Loading...
                </span>
              ) : (
                'Load More'
              )}
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Home;
