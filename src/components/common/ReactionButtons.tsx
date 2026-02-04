import React, { useState, useEffect } from 'react';
import { mockAPI, REACTION_TYPES } from '../../services/mockData';
import { useAuth } from '../../context/AuthContext';

interface ReactionButtonsProps {
  postId: number;
}

interface ReactionStats {
  jadore: number;
  jaime: number;
  interessant: number;
  inspirant: number;
  utile: number;
  total: number;
}

const ReactionButtons: React.FC<ReactionButtonsProps> = ({ postId }) => {
  const { user } = useAuth();
  const [stats, setStats] = useState<ReactionStats>({
    jadore: 0,
    jaime: 0,
    interessant: 0,
    inspirant: 0,
    utile: 0,
    total: 0,
  });
  const [userReaction, setUserReaction] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Reaction definitions with emojis and labels
  const reactions = [
    { type: REACTION_TYPES.JADORE, emoji: '❤️', label: "J'adore" },
    { type: REACTION_TYPES.JAIME, emoji: '👍', label: "J'aime" },
    { type: REACTION_TYPES.INTERESSANT, emoji: '💡', label: 'Intéressant' },
    { type: REACTION_TYPES.INSPIRANT, emoji: '✨', label: 'Inspirant' },
    { type: REACTION_TYPES.UTILE, emoji: '👏', label: 'Utile' },
  ];

  useEffect(() => {
    fetchReactions();
  }, [postId]);

  const fetchReactions = async () => {
    try {
      const [reactionStats, currentUserReaction] = await Promise.all([
        mockAPI.getReactionStats(postId),
        mockAPI.getUserReaction(postId, user?.id || null),
      ]);

      setStats(reactionStats);
      setUserReaction(currentUserReaction?.reaction_type || null);
    } catch (error) {
      console.error('Failed to fetch reactions:', error);
    }
  };

  const handleReactionClick = async (reactionType: string) => {
    if (loading) return;

    setLoading(true);
    try {
      if (userReaction === reactionType) {
        // Remove reaction if clicking the same one
        await mockAPI.removeReaction(postId, user?.id || null);
        setUserReaction(null);
      } else {
        // Add or update reaction
        await mockAPI.addReaction(postId, user?.id || null, reactionType);
        setUserReaction(reactionType);
      }

      // Refresh stats
      await fetchReactions();
    } catch (error) {
      console.error('Failed to update reaction:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Réactions</h3>

      {/* Reaction Buttons */}
      <div className="flex flex-wrap gap-3 mb-4">
        {reactions.map((reaction) => {
          const count = stats[reaction.type as keyof typeof stats] as number;
          const isActive = userReaction === reaction.type;

          return (
            <button
              key={reaction.type}
              onClick={() => handleReactionClick(reaction.type)}
              disabled={loading}
              className={`
                flex items-center space-x-2 px-4 py-2 rounded-full border-2 transition-all
                ${
                  isActive
                    ? 'bg-primary border-primary text-white scale-105'
                    : 'bg-white border-gray-300 text-gray-700 hover:border-primary hover:bg-blue-50'
                }
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
              title={reaction.label}
            >
              <span className="text-xl">{reaction.emoji}</span>
              <span className="font-medium text-sm">{reaction.label}</span>
              {count > 0 && (
                <span
                  className={`
                    text-xs font-bold px-2 py-0.5 rounded-full
                    ${isActive ? 'bg-white text-primary' : 'bg-gray-100 text-gray-600'}
                  `}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Total Count */}
      {stats.total > 0 && (
        <p className="text-sm text-gray-600">
          {stats.total} personne{stats.total > 1 ? 's ont' : ' a'} réagi
        </p>
      )}
    </div>
  );
};

export default ReactionButtons;
