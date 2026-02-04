import React, { useState, useEffect } from 'react';
import { mockAPI } from '../../services/mockData';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';

interface Comment {
  id: number;
  post_id: number;
  user_id: number | null;
  parent_id: number | null;
  author_name: string | null;
  author_email: string | null;
  content: string;
  is_approved: boolean;
  created_at: string;
  updated_at: string;
  user: { id: number; name: string; email: string } | null;
  replies?: Comment[];
}

interface CommentListProps {
  postId: number;
}

const CommentList: React.FC<CommentListProps> = ({ postId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      const data = await mockAPI.getPostComments(postId);
      setComments(data);
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCommentUpdate = () => {
    fetchComments();
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-800 flex items-center space-x-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          <span>Commentaires ({comments.length})</span>
        </h3>
      </div>

      {/* Comment Form */}
      <div className="mb-6">
        <h4 className="text-md font-semibold text-gray-700 mb-3">Laisser un commentaire</h4>
        <CommentForm postId={postId} onSubmit={handleCommentUpdate} />
      </div>

      {/* Comments List */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : comments.length > 0 ? (
        <div>
          <h4 className="text-md font-semibold text-gray-700 mb-3">
            {comments.length} commentaire{comments.length > 1 ? 's' : ''}
          </h4>
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onUpdate={handleCommentUpdate}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <svg
            className="w-12 h-12 mx-auto text-gray-400 mb-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          <p className="text-gray-600">Aucun commentaire pour le moment</p>
          <p className="text-gray-500 text-sm mt-1">Soyez le premier à commenter!</p>
        </div>
      )}
    </div>
  );
};

export default CommentList;
