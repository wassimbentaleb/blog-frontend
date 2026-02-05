import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useConfirmDialog } from '../../context/ConfirmDialogContext';
import Sidebar from '../../components/common/Sidebar';
import { apiService } from '../../services/apiData';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface Category {
  id: number;
  name: string;
  slug: string;
}

const AddPost: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { alert } = useConfirmDialog();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await apiService.getAllCategories();
      setCategories(data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB');
      return;
    }

    setUploading(true);
    setError('');

    try {
      // Create local preview immediately for better UX
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Upload to Laravel server
      const imageUrl = await apiService.uploadImage(file);

      // Save the server URL (not blob URL)
      setFeaturedImage(imageUrl);

      await alert({
        title: 'Success',
        message: 'Image uploaded successfully!',
      });
    } catch (error) {
      setError('Failed to upload image. Please try again.');
      // Clear preview if upload failed
      setImagePreview('');
      setFeaturedImage('');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (!title.trim()) {
      setError('Title is required');
      setLoading(false);
      return;
    }

    if (!content.trim()) {
      setError('Content is required');
      setLoading(false);
      return;
    }

    if (!categoryId) {
      setError('Please select a category');
      setLoading(false);
      return;
    }

    try {
      await apiService.createPost({
        title,
        content,
        excerpt,
        category_id: categoryId,
        featured_image: featuredImage,
        status,
      });

      await alert({
        title: 'Success',
        message: 'Post created successfully!',
      });
      navigate('/admin/posts');
    } catch (error: any) {
      setError(error.message || 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  // React Quill modules configuration
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ color: [] }, { background: [] }],
      ['link', 'image', 'video'],
      ['blockquote', 'code-block'],
      [{ align: [] }],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'list',
    'bullet',
    'color',
    'background',
    'link',
    'image',
    'video',
    'blockquote',
    'code-block',
    'align',
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 overflow-auto">
        {/* Top Header */}
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="px-8 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Add New Post</h1>
              <p className="text-sm text-gray-600">Create a new blog post</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/admin/posts')}
                className="text-gray-600 hover:text-gray-800 transition text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-8">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content Area */}
              <div className="lg:col-span-2 space-y-6">
                {/* Title */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Post Title *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full text-3xl font-bold border-0 border-b-2 border-gray-200 focus:border-primary focus:outline-none px-0 py-2"
                    placeholder="Enter your post title here..."
                    required
                  />
                </div>

                {/* Content Editor */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Post Content *
                  </label>
                  <ReactQuill
                    theme="snow"
                    value={content}
                    onChange={setContent}
                    modules={modules}
                    formats={formats}
                    className="bg-white"
                    style={{ height: '400px', marginBottom: '50px' }}
                    placeholder="Write your post content here..."
                  />
                </div>

                {/* Excerpt */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Excerpt (Optional)
                  </label>
                  <textarea
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    rows={3}
                    className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Short description of your post (recommended 150-200 characters)"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    {excerpt.length} characters
                  </p>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Publish Box */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Publish</h3>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value as 'draft' | 'published')}
                      className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </div>

                  <div className="flex flex-col space-y-3">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-primary text-white px-6 py-3 rounded-md hover:bg-blue-600 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading
                        ? 'Saving...'
                        : status === 'published'
                        ? 'Publish Post'
                        : 'Save as Draft'}
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate('/admin/posts')}
                      className="w-full bg-gray-200 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-300 transition font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                </div>

                {/* Category */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Category *</h3>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Featured Image */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Featured Image</h3>

                  {imagePreview ? (
                    <div className="mb-4">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview('');
                          setFeaturedImage('');
                        }}
                        className="mt-2 text-sm text-red-600 hover:text-red-800"
                      >
                        Remove Image
                      </button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                      <svg
                        className="w-12 h-12 mx-auto text-gray-400 mb-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <p className="text-sm text-gray-600 mb-2">Upload Featured Image</p>
                    </div>
                  )}

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-blue-600 file:cursor-pointer"
                    disabled={uploading}
                  />

                  {uploading && (
                    <p className="text-sm text-gray-600 mt-2">Uploading...</p>
                  )}

                  <p className="text-xs text-gray-500 mt-2">
                    Max file size: 5MB. Supported formats: JPG, PNG, GIF, WEBP
                  </p>
                </div>

                {/* Post Info */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Post Info</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>
                      <span className="font-medium">Author:</span> {user?.name}
                    </p>
                    <p>
                      <span className="font-medium">Created:</span> Just now
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default AddPost;
