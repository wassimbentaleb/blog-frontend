import React, { useState } from 'react';
import { apiService } from '../../services/apiData';
import { useAuth } from '../../context/AuthContext';
import CommentForm from './CommentForm';
import ConfirmDeleteModal from './ConfirmDeleteModal';

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

interface CommentItemProps {
  comment: Comment;
  onUpdate: () => void;
  level?: number;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, onUpdate, level = 0 }) => {
  const { user, isAdmin } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [saving, setSaving] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const isOwner = user && comment.user_id === user.id;
  const canEdit = isOwner;
  const canDelete = isOwner || isAdmin();
  const maxNestingLevel = 3;

  // Count all nested replies recursively
  const countReplies = (comment: Comment): number => {
    if (!comment.replies || comment.replies.length === 0) return 0;
    let count = comment.replies.length;
    comment.replies.forEach((reply) => {
      count += countReplies(reply);
    });
    return count;
  };

  const repliesCount = countReplies(comment);

  // Format relative time
  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return 'À l\'instant';
    if (seconds < 3600) return `Il y a ${Math.floor(seconds / 60)} min`;
    if (seconds < 86400) return `Il y a ${Math.floor(seconds / 3600)}h`;
    if (seconds < 604800) return `Il y a ${Math.floor(seconds / 86400)}j`;

    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const handleEdit = async () => {
    if (!editContent.trim() || saving) return;

    setSaving(true);
    try {
      await apiService.updateComment(comment.id, editContent);
      setIsEditing(false);
      onUpdate();
    } catch (error) {
      alert('Échec de la modification du commentaire');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    setShowDeleteModal(false);
    try {
      await apiService.deleteComment(comment.id);
      onUpdate();
    } catch (error) {
      alert('Échec de la suppression du commentaire');
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  const handleReplySubmit = () => {
    setIsReplying(false);
    onUpdate();
  };

  const authorName = comment.user ? comment.user.name : comment.author_name || 'Anonyme';
  const isGuest = !comment.user_id;

  return (
    <div className={`${level > 0 ? 'ml-8 mt-4' : 'mt-4'}`}>
      <div className="bg-white rounded-lg p-4 border border-gray-200">
        {/* Author Info */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-semibold text-sm">
                {authorName.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <p className="font-semibold text-gray-800">{authorName}</p>
                {isGuest && (
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                    Invité
                  </span>
                )}
                {isAdmin() && comment.user_id === 1 && (
                  <span className="text-xs bg-primary text-white px-2 py-0.5 rounded-full">
                    Admin
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500">{getTimeAgo(comment.created_at)}</p>
            </div>
          </div>
        </div>

        {/* Comment Content */}
        {isEditing ? (
          <div className="mb-3">
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              rows={3}
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <div className="flex space-x-2 mt-2">
              <button
                onClick={handleEdit}
                disabled={saving || !editContent.trim()}
                className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-600 transition text-sm disabled:opacity-50"
              >
                {saving ? 'Enregistrement...' : 'Enregistrer'}
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditContent(comment.content);
                }}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition text-sm"
              >
                Annuler
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-700 mb-3 whitespace-pre-wrap">{comment.content}</p>
        )}

        {/* Action Buttons */}
        {!isEditing && (
          <div className="flex items-center space-x-4 text-sm">
            {level < maxNestingLevel && (
              <button
                onClick={() => setIsReplying(!isReplying)}
                className="text-primary hover:text-blue-600 font-medium flex items-center space-x-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                  />
                </svg>
                <span>Répondre</span>
              </button>
            )}

            {canEdit && (
              <button
                onClick={() => setIsEditing(true)}
                className="text-gray-600 hover:text-gray-800 font-medium flex items-center space-x-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                <span>Modifier</span>
              </button>
            )}

            {canDelete && (
              <button
                onClick={handleDeleteClick}
                className="text-red-600 hover:text-red-800 font-medium flex items-center space-x-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                <span>Supprimer</span>
              </button>
            )}
          </div>
        )}

        {/* Reply Form */}
        {isReplying && (
          <div className="mt-4 pl-4 border-l-2 border-primary">
            <CommentForm
              postId={comment.post_id}
              parentId={comment.id}
              onSubmit={handleReplySubmit}
              onCancel={() => setIsReplying(false)}
              placeholder={`Répondre à ${authorName}...`}
            />
          </div>
        )}
      </div>

      {/* Nested Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div>
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              onUpdate={onUpdate}
              level={level + 1}
            />
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={showDeleteModal}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        title="Supprimer le commentaire?"
        message="Cette action est irréversible."
        repliesCount={repliesCount}
      />
    </div>
  );
};

export default CommentItem;
