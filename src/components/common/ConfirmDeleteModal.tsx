import React from 'react';

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
  message?: string;
  repliesCount?: number;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  isOpen,
  onConfirm,
  onCancel,
  title = 'Supprimer le commentaire?',
  message = 'Cette action est irréversible.',
  repliesCount = 0,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onCancel}
      ></div>

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6 transform transition-all animate-fadeIn">
          {/* Warning Icon */}
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <svg
              className="h-6 w-6 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 text-center mb-2">
            {title}
          </h3>

          {/* Message */}
          <div className="text-center mb-6">
            <p className="text-sm text-gray-600 mb-2">{message}</p>

            {/* Replies Warning */}
            {repliesCount > 0 && (
              <div className="mt-3 bg-yellow-50 border border-yellow-200 rounded-md p-3">
                <p className="text-sm text-yellow-800 font-medium">
                  ⚠️ Ce commentaire a {repliesCount} réponse{repliesCount > 1 ? 's' : ''}.
                </p>
                <p className="text-xs text-yellow-700 mt-1">
                  Toutes les réponses seront également supprimées.
                </p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={onCancel}
              className="flex-1 bg-gray-100 text-gray-700 px-4 py-2.5 rounded-md hover:bg-gray-200 transition font-medium text-sm"
            >
              Annuler
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 bg-red-600 text-white px-4 py-2.5 rounded-md hover:bg-red-700 transition font-medium text-sm flex items-center justify-center space-x-2"
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
