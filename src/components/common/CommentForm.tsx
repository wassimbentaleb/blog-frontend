import React, { useState } from 'react';
import { mockAPI } from '../../services/mockData';
import { useAuth } from '../../context/AuthContext';

interface CommentFormProps {
  postId: number;
  parentId?: number | null;
  onSubmit: () => void;
  onCancel?: () => void;
  placeholder?: string;
}

const CommentForm: React.FC<CommentFormProps> = ({
  postId,
  parentId = null,
  onSubmit,
  onCancel,
  placeholder = 'Écrivez votre commentaire...',
}) => {
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const isGuest = !user;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) return;

    setSubmitting(true);
    try {
      await mockAPI.addComment(
        postId,
        user?.id || null,
        content,
        parentId,
        isGuest ? authorName : undefined,
        isGuest ? authorEmail : undefined
      );

      // Reset form
      setContent('');
      setAuthorName('');
      setAuthorEmail('');

      onSubmit();
    } catch (error) {
      alert('Échec de l\'ajout du commentaire');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-4">
      {/* Guest name and email fields */}
      {isGuest && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          <input
            type="text"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            placeholder="Nom (optionnel)"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          />
          <input
            type="email"
            value={authorEmail}
            onChange={(e) => setAuthorEmail(e.target.value)}
            placeholder="Email (optionnel)"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          />
        </div>
      )}

      {/* Comment textarea */}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={placeholder}
        rows={4}
        className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
        required
      />

      {/* Character count */}
      <div className="flex items-center justify-between mt-2">
        <p className="text-xs text-gray-500">
          {content.length} caractères
          {!user && !isGuest && (
            <span className="ml-2 text-yellow-600">
              • Votre commentaire sera modéré avant publication
            </span>
          )}
        </p>
      </div>

      {/* Submit buttons */}
      <div className="flex space-x-2 mt-3">
        <button
          type="submit"
          disabled={submitting || !content.trim()}
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-600 transition text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? 'Publication...' : parentId ? 'Répondre' : 'Publier le commentaire'}
        </button>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition text-sm font-medium"
          >
            Annuler
          </button>
        )}
      </div>
    </form>
  );
};

export default CommentForm;
