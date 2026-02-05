import api from './api';

// Reaction types constant
export const REACTION_TYPES = {
  JADORE: 'jadore',
  JAIME: 'jaime',
  INTERESSANT: 'interessant',
  INSPIRANT: 'inspirant',
  UTILE: 'utile',
} as const;

export const apiService = {
  // ============================================
  // Posts API
  // ============================================

  getAllPosts: async (params?: {
    page?: number;
    per_page?: number;
  }) => {
    const response = await api.get('/posts', { params });
    return response.data;
  },

  getPostBySlug: async (slug: string) => {
    const response = await api.get(`/posts/${slug}`);
    return response.data;
  },

  getPostById: async (id: number) => {
    const response = await api.get(`/admin/posts/${id}`);
    return response.data;
  },

  getPostsByCategory: async (categorySlug: string) => {
    const response = await api.get(`/categories/${categorySlug}/posts`);
    return response.data.data || response.data;
  },

  searchPosts: async (query: string) => {
    const response = await api.get(`/posts/search?q=${encodeURIComponent(query)}`);
    return response.data.data || response.data;
  },

  getRelatedPosts: async (slug: string) => {
    const response = await api.get(`/posts/${slug}/related`);
    return response.data;
  },

  // ============================================
  // Admin: Posts Management
  // ============================================

  getAllPostsAdmin: async (params?: {
    search?: string;
    status?: string;
    category?: string;
    page?: number;
    per_page?: number;
  }) => {
    const response = await api.get('/admin/posts', { params });
    return response.data;
  },

  createPost: async (postData: any) => {
    const response = await api.post('/admin/posts', postData);
    return response.data;
  },

  updatePost: async (id: number, postData: any) => {
    const response = await api.put(`/admin/posts/${id}`, postData);
    return response.data;
  },

  deletePost: async (id: number) => {
    const response = await api.delete(`/admin/posts/${id}`);
    return response.data;
  },

  // ============================================
  // Categories API
  // ============================================

  getAllCategories: async () => {
    const response = await api.get('/categories');
    return response.data;
  },

  getCategoryBySlug: async (slug: string) => {
    const response = await api.get(`/categories/${slug}`);
    return response.data;
  },

  createCategory: async (categoryData: any) => {
    const response = await api.post('/admin/categories', categoryData);
    return response.data;
  },

  updateCategory: async (id: number, categoryData: any) => {
    const response = await api.put(`/admin/categories/${id}`, categoryData);
    return response.data;
  },

  deleteCategory: async (id: number) => {
    const response = await api.delete(`/admin/categories/${id}`);
    return response.data;
  },

  // ============================================
  // Comments API
  // ============================================

  getPostComments: async (postId: number) => {
    const response = await api.get(`/posts/${postId}/comments`);
    return response.data;
  },

  addComment: async (
    postId: number,
    userId: number | null,
    content: string,
    parentId: number | null = null,
    authorName?: string,
    authorEmail?: string
  ) => {
    const response = await api.post(`/posts/${postId}/comments`, {
      content,
      parent_id: parentId,
      author_name: authorName,
      author_email: authorEmail,
    });
    return response.data;
  },

  updateComment: async (commentId: number, content: string) => {
    const response = await api.put(`/comments/${commentId}`, { content });
    return response.data;
  },

  deleteComment: async (commentId: number) => {
    const response = await api.delete(`/comments/${commentId}`);
    return response.data;
  },

  // ============================================
  // Reactions API
  // ============================================

  getPostReactions: async (postId: number) => {
    const response = await api.get(`/posts/${postId}/reactions`);
    return response.data;
  },

  getReactionStats: async (postId: number) => {
    const response = await api.get(`/posts/${postId}/reactions/stats`);
    return response.data;
  },

  addReaction: async (postId: number, userId: number | null, reactionType: string) => {
    const response = await api.post(`/posts/${postId}/reactions`, {
      reaction_type: reactionType,
    });
    return response.data;
  },

  removeReaction: async (postId: number, userId: number | null) => {
    const response = await api.delete(`/posts/${postId}/reactions`);
    return response.data;
  },

  // ============================================
  // Newsletter API
  // ============================================

  subscribeNewsletter: async (email: string) => {
    const response = await api.post('/newsletter/subscribe', { email });
    return response.data;
  },

  unsubscribeNewsletter: async (email: string) => {
    const response = await api.post('/newsletter/unsubscribe', { email });
    return response.data;
  },

  // ============================================
  // Admin: Dashboard Statistics
  // ============================================

  getDashboardStats: async () => {
    const response = await api.get('/admin/stats');
    return response.data;
  },

  // ============================================
  // Admin: Newsletter Management
  // ============================================

  getNewsletterSubscribers: async () => {
    const response = await api.get('/admin/newsletter/subscribers');
    return response.data.data || response.data;
  },

  deleteNewsletterSubscriber: async (id: number) => {
    const response = await api.delete(`/admin/newsletter/subscribers/${id}`);
    return response.data;
  },

  // ============================================
  // Admin: Comments Moderation
  // ============================================

  getCommentsForModeration: async (params?: {
    search?: string;
    status?: string;
    page?: number;
    per_page?: number;
  }) => {
    const response = await api.get('/admin/comments', { params });
    return response.data;
  },

  approveComment: async (commentId: number) => {
    const response = await api.put(`/admin/comments/${commentId}/approve`);
    return response.data;
  },

  // ============================================
  // File Upload
  // ============================================

  uploadImage: async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', file);

    const response = await api.post('/admin/upload-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return `http://localhost:8000${response.data.url}`;
  },
};

export default apiService;
