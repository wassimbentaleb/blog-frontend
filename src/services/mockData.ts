// Reaction Types
export const REACTION_TYPES = {
  JADORE: 'jadore',      // I love it ❤️
  JAIME: 'jaime',        // I like it 👍
  INTERESSANT: 'interessant',  // Interesting 💡
  INSPIRANT: 'inspirant',      // Inspiring ✨
  UTILE: 'utile',        // Useful 👏
} as const;

// Mock Users Data
export const mockUsers = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@blog.com',
    password: 'password', // In real app, this would be hashed
    role: 'admin',
  },
  {
    id: 2,
    name: 'John Doe',
    email: 'user@blog.com',
    password: 'password',
    role: 'user',
  },
];

// Mock Categories Data
export const mockCategories = [
  {
    id: 1,
    name: 'Technology',
    slug: 'technology',
    description: 'Tech news and tutorials',
    posts_count: 12,
  },
  {
    id: 2,
    name: 'Travel',
    slug: 'travel',
    description: 'Travel guides and tips',
    posts_count: 8,
  },
  {
    id: 3,
    name: 'Business',
    slug: 'business',
    description: 'Business insights',
    posts_count: 6,
  },
  {
    id: 4,
    name: 'Lifestyle',
    slug: 'lifestyle',
    description: 'Lifestyle articles',
    posts_count: 10,
  },
];

// Mock Posts Data
export const mockPosts = [
  {
    id: 1,
    title: 'The Impact of Technology on the Workplace: How Technology is Changing',
    slug: 'impact-of-technology-on-workplace',
    content: `
      <p>Traveling is an enriching experience that opens up new horizons, exposes us to different cultures, and creates memories that last a lifetime. However, traveling can also be stressful and overwhelming, especially if you don't plan and prepare adequately. In this blog article, we'll explore tips and tricks for a memorable journey and how to make the most of your travels.</p>

      <p>One of the most rewarding aspects of traveling is immersing yourself in the local culture and customs. This includes trying local cuisine, attending cultural events and festivals, and interacting with locals. Learning a few phrases in the local language can also go a long way in making connections and showing respect.</p>

      <h2>Research Your Destination</h2>

      <p>Before embarking on your journey, take the time to research your destination. This includes understanding the local culture, customs, and laws, as well as identifying top attractions, restaurants, and accommodations. Doing so will help you navigate your destination with confidence and avoid any cultural faux pas.</p>

      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In hendrerit gravida rutrum quisque non tellus orci ac auctor. Mi ipsum faucibus vitae aliquet nec ullamcorper sit amet. Aenean euismod elementum nisi quis eleifend quam adipiscing vitae.</p>

      <h2>Plan Your Itinerary</h2>

      <p>While it's essential to leave room for spontaneity and unexpected adventures, having a rough itinerary can help you make the most of your time and budget. Identify the must-see sights and experiences and prioritize them according to your interests and preferences. This will help you avoid overscheduling and ensure that you have time to relax and enjoy your journey.</p>

      <blockquote>"Traveling can expose you to new environments and potential health risks, so it's crucial to take precautions to stay safe and healthy."</blockquote>

      <h2>Pack Lightly and Smartly</h2>

      <p>Packing can be a daunting task, but with some careful planning and smart choices, you can pack light and efficiently. Start by making a packing list and sticking to it, focusing on versatile and comfortable clothing that can be mixed and matched. Invest in quality luggage and packing organizers to maximize space and minimize wrinkles.</p>

      <h2>Stay Safe and Healthy</h2>

      <p>Traveling can expose you to new environments and potential health risks, so it's crucial to take precautions to stay safe and healthy. This includes researching any required vaccinations or medications, staying hydrated, washing your hands frequently, and using sunscreen and insect repellent. It's also essential to keep your valuables safe and secure and to be aware of your surroundings at all times.</p>

      <p>Traveling is an art form that requires a blend of planning, preparation, and spontaneity. By following these tips and tricks, you can make the most of your journey and create memories that last a lifetime. So pack your bags, embrace the adventure, and enjoy the ride.</p>
    `,
    excerpt: 'Traveling is an enriching experience that opens up new horizons, exposes us to different cultures, and creates memories that last a lifetime.',
    featured_image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
    category_id: 1,
    user_id: 1,
    status: 'published',
    published_at: '2024-01-20T10:00:00Z',
    created_at: '2024-01-20T09:00:00Z',
    updated_at: '2024-01-20T10:00:00Z',
    category: {
      id: 1,
      name: 'Technology',
      slug: 'technology',
    },
    user: {
      id: 1,
      name: 'Tracey Wilson',
      email: 'tracey@example.com',
    },
  },
  {
    id: 2,
    title: 'Top 10 Travel Destinations for 2024',
    slug: 'top-10-travel-destinations-2024',
    content: `
      <p>Discover the most beautiful and exciting places to visit this year. From pristine beaches to historic cities, we've compiled a list of must-visit destinations.</p>

      <h2>1. Bali, Indonesia</h2>
      <p>Known for its stunning beaches, rice terraces, and vibrant culture.</p>

      <h2>2. Paris, France</h2>
      <p>The city of love offers world-class museums, cuisine, and architecture.</p>

      <blockquote>"Travel is the only thing you buy that makes you richer."</blockquote>

      <p>Each destination offers unique experiences and unforgettable memories. Plan your next adventure today!</p>
    `,
    excerpt: 'Discover the most beautiful and exciting places to visit this year.',
    featured_image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800',
    category_id: 2,
    user_id: 2,
    status: 'published',
    published_at: '2024-01-18T10:00:00Z',
    created_at: '2024-01-18T09:00:00Z',
    updated_at: '2024-01-18T10:00:00Z',
    category: {
      id: 2,
      name: 'Travel',
      slug: 'travel',
    },
    user: {
      id: 2,
      name: 'Jason Francisco',
      email: 'jason@example.com',
    },
  },
  {
    id: 3,
    title: 'How to Build a Successful Startup in 2024',
    slug: 'how-to-build-successful-startup',
    content: `
      <p>Learn the essential steps to launching and growing a successful business in today's competitive market.</p>

      <h2>1. Validate Your Idea</h2>
      <p>Before investing time and money, ensure there's a market for your product or service.</p>

      <h2>2. Build a Strong Team</h2>
      <p>Surround yourself with talented individuals who share your vision.</p>

      <h2>3. Focus on Customer Feedback</h2>
      <p>Listen to your customers and iterate based on their needs.</p>

      <blockquote>"The way to get started is to quit talking and begin doing." - Walt Disney</blockquote>
    `,
    excerpt: 'Learn the essential steps to launching and growing a successful business.',
    featured_image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800',
    category_id: 3,
    user_id: 1,
    status: 'draft',
    published_at: null,
    created_at: '2024-01-15T09:00:00Z',
    updated_at: '2024-01-15T09:00:00Z',
    category: {
      id: 3,
      name: 'Business',
      slug: 'business',
    },
    user: {
      id: 1,
      name: 'Elizabeth Slavin',
      email: 'elizabeth@example.com',
    },
  },
  {
    id: 4,
    title: 'Healthy Living: Tips for a Balanced Lifestyle',
    slug: 'healthy-living-tips',
    content: `
      <p>Simple habits that can transform your health and wellbeing.</p>

      <h2>Nutrition</h2>
      <p>Eat a balanced diet rich in fruits, vegetables, and whole grains.</p>

      <h2>Exercise</h2>
      <p>Aim for at least 30 minutes of physical activity daily.</p>

      <h2>Sleep</h2>
      <p>Get 7-9 hours of quality sleep each night.</p>

      <h2>Mental Health</h2>
      <p>Practice mindfulness and stress management techniques.</p>
    `,
    excerpt: 'Simple habits that can transform your health and wellbeing.',
    featured_image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800',
    category_id: 4,
    user_id: 1,
    status: 'published',
    published_at: '2024-01-12T10:00:00Z',
    created_at: '2024-01-12T09:00:00Z',
    updated_at: '2024-01-12T10:00:00Z',
    category: {
      id: 4,
      name: 'Lifestyle',
      slug: 'lifestyle',
    },
    user: {
      id: 1,
      name: 'Ernie Smith',
      email: 'ernie@example.com',
    },
  },
  {
    id: 5,
    title: 'The Future of AI and Machine Learning',
    slug: 'future-of-ai-machine-learning',
    content: `
      <p>Exploring the latest trends and innovations in artificial intelligence.</p>

      <h2>Current Trends</h2>
      <p>AI is transforming industries from healthcare to finance.</p>

      <h2>Ethical Considerations</h2>
      <p>As AI becomes more powerful, we must consider its ethical implications.</p>

      <blockquote>"AI is probably the most important thing humanity has ever worked on." - Sundar Pichai</blockquote>
    `,
    excerpt: 'Exploring the latest trends and innovations in artificial intelligence.',
    featured_image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
    category_id: 1,
    user_id: 1,
    status: 'draft',
    published_at: null,
    created_at: '2024-01-10T09:00:00Z',
    updated_at: '2024-01-10T09:00:00Z',
    category: {
      id: 1,
      name: 'Technology',
      slug: 'technology',
    },
    user: {
      id: 1,
      name: 'Tracey Wilson',
      email: 'tracey@example.com',
    },
  },
  {
    id: 6,
    title: 'Digital Marketing Strategies That Work',
    slug: 'digital-marketing-strategies',
    content: `
      <p>Proven tactics to grow your business online in 2024.</p>

      <h2>Content Marketing</h2>
      <p>Create valuable content that attracts and engages your audience.</p>

      <h2>Social Media</h2>
      <p>Build a strong presence on platforms where your customers are.</p>

      <h2>SEO</h2>
      <p>Optimize your website to rank higher in search results.</p>
    `,
    excerpt: 'Proven tactics to grow your business online in 2024.',
    featured_image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    category_id: 3,
    user_id: 2,
    status: 'published',
    published_at: '2024-01-08T10:00:00Z',
    created_at: '2024-01-08T09:00:00Z',
    updated_at: '2024-01-08T10:00:00Z',
    category: {
      id: 3,
      name: 'Business',
      slug: 'business',
    },
    user: {
      id: 2,
      name: 'Jason Francisco',
      email: 'jason@example.com',
    },
  },
];

// Helper function to simulate API delay
export const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API responses
export const mockAPI = {
  // Auth
  login: async (email: string, password: string) => {
    await delay();
    const user = mockUsers.find(u => u.email === email && u.password === password);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    const { password: _, ...userWithoutPassword } = user;
    return {
      user: userWithoutPassword,
      token: `mock_token_${user.id}_${Date.now()}`,
    };
  },

  register: async (name: string, email: string, password: string) => {
    await delay();
    // Check if user exists
    if (mockUsers.find(u => u.email === email)) {
      throw new Error('Email already exists');
    }
    const newUser = {
      id: mockUsers.length + 1,
      name,
      email,
      password,
      role: 'user' as const,
    };
    mockUsers.push(newUser);
    const { password: _, ...userWithoutPassword } = newUser;
    return {
      user: userWithoutPassword,
      token: `mock_token_${newUser.id}_${Date.now()}`,
    };
  },

  getCurrentUser: async () => {
    await delay(200);
    // Get user from token (for demo, return first admin)
    const user = mockUsers.find(u => u.role === 'admin');
    if (!user) throw new Error('User not found');
    const { password: _, ...userWithoutPassword } = user;
    return { user: userWithoutPassword };
  },

  // Posts
  getAllPosts: async (page: number = 1) => {
    await delay();
    // Return only published posts for public
    const publishedPosts = mockPosts.filter(p => p.status === 'published');
    return {
      data: publishedPosts,
      current_page: page,
      last_page: 1,
      total: publishedPosts.length,
    };
  },

  getAllPostsAdmin: async () => {
    await delay();
    // Return all posts for admin
    return mockPosts;
  },

  getPostBySlug: async (slug: string) => {
    await delay();
    const post = mockPosts.find(p => p.slug === slug);
    if (!post) throw new Error('Post not found');
    return post;
  },

  getPostById: async (id: number) => {
    await delay();
    const post = mockPosts.find(p => p.id === id);
    if (!post) throw new Error('Post not found');
    return post;
  },

  createPost: async (data: any) => {
    await delay();
    const category = mockCategories.find(c => c.id === Number(data.category_id));
    const newPost = {
      id: mockPosts.length + 1,
      title: data.title,
      slug: data.title.toLowerCase().replace(/\s+/g, '-'),
      content: data.content,
      excerpt: data.excerpt || '',
      featured_image: data.featured_image || '',
      category_id: Number(data.category_id),
      user_id: 1,
      status: data.status,
      published_at: data.status === 'published' ? new Date().toISOString() : null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      category: category || mockCategories[0],
      user: {
        id: 1,
        name: 'Admin User',
        email: 'admin@blog.com',
      },
    };
    mockPosts.push(newPost);
    return newPost;
  },

  updatePost: async (id: number, data: any) => {
    await delay();
    const index = mockPosts.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Post not found');

    const category = mockCategories.find(c => c.id === Number(data.category_id));
    mockPosts[index] = {
      ...mockPosts[index],
      ...data,
      category_id: Number(data.category_id),
      updated_at: new Date().toISOString(),
      category: category || mockPosts[index].category,
    };
    return mockPosts[index];
  },

  deletePost: async (id: number) => {
    await delay();
    const index = mockPosts.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Post not found');
    mockPosts.splice(index, 1);
    return { message: 'Post deleted successfully' };
  },

  // Categories
  getAllCategories: async () => {
    await delay(200);
    return mockCategories;
  },

  createCategory: async (data: any) => {
    await delay();
    const newCategory = {
      id: mockCategories.length + 1,
      name: data.name,
      slug: data.name.toLowerCase().replace(/\s+/g, '-'),
      description: data.description || '',
      posts_count: 0,
    };
    mockCategories.push(newCategory);
    return newCategory;
  },

  updateCategory: async (id: number, data: any) => {
    await delay();
    const index = mockCategories.findIndex(c => c.id === id);
    if (index === -1) throw new Error('Category not found');
    mockCategories[index] = {
      ...mockCategories[index],
      ...data,
      slug: data.name.toLowerCase().replace(/\s+/g, '-'),
    };
    return mockCategories[index];
  },

  deleteCategory: async (id: number) => {
    await delay();
    const index = mockCategories.findIndex(c => c.id === id);
    if (index === -1) throw new Error('Category not found');
    mockCategories.splice(index, 1);
    return { message: 'Category deleted successfully' };
  },

  // Comments
  getPostComments: async (postId: number) => {
    await delay(200);
    const comments = JSON.parse(localStorage.getItem('mockComments') || '[]');
    const postComments = comments.filter((c: any) => c.post_id === postId && c.is_approved);

    // Build nested structure
    const buildTree = (parentId: number | null = null): any[] => {
      return postComments
        .filter((c: any) => c.parent_id === parentId)
        .map((c: any) => ({
          ...c,
          replies: buildTree(c.id),
        }));
    };

    return buildTree();
  },

  addComment: async (postId: number, userId: number | null, content: string, parentId: number | null = null, authorName?: string, authorEmail?: string) => {
    await delay(200);
    const comments = JSON.parse(localStorage.getItem('mockComments') || '[]');

    const newComment = {
      id: Date.now(),
      post_id: postId,
      user_id: userId,
      parent_id: parentId,
      author_name: authorName || null,
      author_email: authorEmail || null,
      content,
      is_approved: userId ? true : false, // Auto-approve if logged in
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      user: userId ? mockUsers.find(u => u.id === userId) : null,
    };

    comments.push(newComment);
    localStorage.setItem('mockComments', JSON.stringify(comments));

    return newComment;
  },

  updateComment: async (commentId: number, content: string) => {
    await delay(200);
    const comments = JSON.parse(localStorage.getItem('mockComments') || '[]');
    const index = comments.findIndex((c: any) => c.id === commentId);

    if (index === -1) throw new Error('Comment not found');

    comments[index].content = content;
    comments[index].updated_at = new Date().toISOString();

    localStorage.setItem('mockComments', JSON.stringify(comments));
    return comments[index];
  },

  deleteComment: async (commentId: number) => {
    await delay(200);
    const comments = JSON.parse(localStorage.getItem('mockComments') || '[]');

    // Delete comment and all its replies
    const deleteWithReplies = (id: number) => {
      const toDelete = comments.filter((c: any) => c.parent_id === id);
      toDelete.forEach((c: any) => deleteWithReplies(c.id));
      const index = comments.findIndex((c: any) => c.id === id);
      if (index !== -1) comments.splice(index, 1);
    };

    deleteWithReplies(commentId);
    localStorage.setItem('mockComments', JSON.stringify(comments));

    return { message: 'Comment deleted' };
  },

  approveComment: async (commentId: number) => {
    await delay(200);
    const comments = JSON.parse(localStorage.getItem('mockComments') || '[]');
    const index = comments.findIndex((c: any) => c.id === commentId);

    if (index === -1) throw new Error('Comment not found');

    comments[index].is_approved = true;
    localStorage.setItem('mockComments', JSON.stringify(comments));

    return comments[index];
  },

  getPendingComments: async () => {
    await delay(200);
    const comments = JSON.parse(localStorage.getItem('mockComments') || '[]');
    return comments.filter((c: any) => !c.is_approved);
  },

  // Reactions
  getPostReactions: async (postId: number) => {
    await delay(200);
    const reactions = JSON.parse(localStorage.getItem('mockReactions') || '[]');
    return reactions.filter((r: any) => r.post_id === postId);
  },

  getReactionStats: async (postId: number) => {
    await delay(200);
    const reactions = JSON.parse(localStorage.getItem('mockReactions') || '[]');
    const postReactions = reactions.filter((r: any) => r.post_id === postId);

    const stats = {
      jadore: 0,
      jaime: 0,
      interessant: 0,
      inspirant: 0,
      utile: 0,
      total: 0,
    };

    postReactions.forEach((r: any) => {
      stats[r.reaction_type as keyof typeof stats]++;
      stats.total++;
    });

    return stats;
  },

  getUserReaction: async (postId: number, userId: number | null) => {
    await delay(200);
    const reactions = JSON.parse(localStorage.getItem('mockReactions') || '[]');
    return reactions.find((r: any) => r.post_id === postId && r.user_id === userId) || null;
  },

  addReaction: async (postId: number, userId: number | null, reactionType: string) => {
    await delay(200);
    const reactions = JSON.parse(localStorage.getItem('mockReactions') || '[]');

    // Remove existing reaction from this user on this post
    const filtered = reactions.filter((r: any) => !(r.post_id === postId && r.user_id === userId));

    // Add new reaction
    const newReaction = {
      id: Date.now(),
      post_id: postId,
      user_id: userId,
      reaction_type: reactionType,
      created_at: new Date().toISOString(),
    };

    filtered.push(newReaction);
    localStorage.setItem('mockReactions', JSON.stringify(filtered));

    return newReaction;
  },

  removeReaction: async (postId: number, userId: number | null) => {
    await delay(200);
    const reactions = JSON.parse(localStorage.getItem('mockReactions') || '[]');
    const filtered = reactions.filter((r: any) => !(r.post_id === postId && r.user_id === userId));
    localStorage.setItem('mockReactions', JSON.stringify(filtered));
    return { message: 'Reaction removed' };
  },
};

// Initialize sample reactions if none exist
export const initializeSampleReactions = () => {
  const existingReactions = localStorage.getItem('mockReactions');
  if (!existingReactions) {
    const sampleReactions = [
      // Post 1 reactions
      { id: 1, post_id: 1, user_id: null, reaction_type: 'jadore', created_at: '2024-01-20T08:00:00Z' },
      { id: 2, post_id: 1, user_id: null, reaction_type: 'jadore', created_at: '2024-01-20T08:05:00Z' },
      { id: 3, post_id: 1, user_id: null, reaction_type: 'jaime', created_at: '2024-01-20T08:10:00Z' },
      { id: 4, post_id: 1, user_id: null, reaction_type: 'jaime', created_at: '2024-01-20T08:15:00Z' },
      { id: 5, post_id: 1, user_id: null, reaction_type: 'interessant', created_at: '2024-01-20T08:20:00Z' },
      { id: 6, post_id: 1, user_id: null, reaction_type: 'utile', created_at: '2024-01-20T08:25:00Z' },

      // Post 2 reactions
      { id: 7, post_id: 2, user_id: null, reaction_type: 'jadore', created_at: '2024-01-18T09:00:00Z' },
      { id: 8, post_id: 2, user_id: null, reaction_type: 'jaime', created_at: '2024-01-18T09:05:00Z' },
      { id: 9, post_id: 2, user_id: null, reaction_type: 'inspirant', created_at: '2024-01-18T09:10:00Z' },
    ];
    localStorage.setItem('mockReactions', JSON.stringify(sampleReactions));
  }
};

// Initialize sample comments if none exist
export const initializeSampleComments = () => {
  const existingComments = localStorage.getItem('mockComments');
  if (!existingComments) {
    const sampleComments = [
      // Post 1 comments
      {
        id: 1,
        post_id: 1,
        user_id: 2,
        parent_id: null,
        author_name: null,
        author_email: null,
        content: 'Excellent article! Très utile et bien écrit. Merci pour le partage!',
        is_approved: true,
        created_at: '2024-01-20T10:30:00Z',
        updated_at: '2024-01-20T10:30:00Z',
        user: { id: 2, name: 'John Doe', email: 'user@blog.com' },
      },
      {
        id: 2,
        post_id: 1,
        user_id: null,
        parent_id: 1,
        author_name: 'Marie Dubois',
        author_email: 'marie@example.com',
        content: 'Je suis d\'accord! Cet article m\'a beaucoup aidé.',
        is_approved: true,
        created_at: '2024-01-20T11:00:00Z',
        updated_at: '2024-01-20T11:00:00Z',
        user: null,
      },
      {
        id: 3,
        post_id: 1,
        user_id: null,
        parent_id: null,
        author_name: 'Pierre Martin',
        author_email: 'pierre@example.com',
        content: 'Merci pour ces conseils pratiques! J\'attends la suite avec impatience.',
        is_approved: true,
        created_at: '2024-01-20T12:00:00Z',
        updated_at: '2024-01-20T12:00:00Z',
        user: null,
      },
      {
        id: 4,
        post_id: 1,
        user_id: 1,
        parent_id: 3,
        author_name: null,
        author_email: null,
        content: 'Merci Pierre! La suite arrive bientôt 😊',
        is_approved: true,
        created_at: '2024-01-20T13:00:00Z',
        updated_at: '2024-01-20T13:00:00Z',
        user: { id: 1, name: 'Admin User', email: 'admin@blog.com' },
      },

      // Post 2 comments
      {
        id: 5,
        post_id: 2,
        user_id: 2,
        parent_id: null,
        author_name: null,
        author_email: null,
        content: 'Magnifiques destinations! J\'ai particulièrement aimé Bali.',
        is_approved: true,
        created_at: '2024-01-18T14:00:00Z',
        updated_at: '2024-01-18T14:00:00Z',
        user: { id: 2, name: 'John Doe', email: 'user@blog.com' },
      },
    ];
    localStorage.setItem('mockComments', JSON.stringify(sampleComments));
  }
};

// Auto-initialize on module load
initializeSampleReactions();
initializeSampleComments();
