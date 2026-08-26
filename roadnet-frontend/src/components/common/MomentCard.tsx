import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { useState } from 'react';
import type { Moment } from '../../types';
import { momentsApi } from '../../api/moments';
import toast from 'react-hot-toast';

interface MomentCardProps {
  moment: Moment;
  onDelete?: (id: string) => void;
}

export default function MomentCard({ moment, onDelete }: MomentCardProps) {
  const [liked, setLiked] = useState(moment.isLiked);
  const [likesCount, setLikesCount] = useState(moment.likesCount);
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);

  const handleLike = async () => {
    try {
      if (liked) {
        await momentsApi.unlikeMoment(moment.id);
        setLikesCount((prev) => prev - 1);
      } else {
        await momentsApi.likeMoment(moment.id);
        setLikesCount((prev) => prev + 1);
      }
      setLiked(!liked);
    } catch {
      toast.error('Failed to update like');
    }
  };

  const handleComment = async () => {
    if (!commentText.trim()) return;
    try {
      await momentsApi.addComment(moment.id, commentText);
      setCommentText('');
      toast.success('Comment added');
    } catch {
      toast.error('Failed to add comment');
    }
  };

  return (
    <div className="card">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center overflow-hidden">
          {moment.author?.avatarUrl ? (
            <img
              src={moment.author.avatarUrl}
              alt=""
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-sm font-bold text-indigo-600">
              {moment.author?.displayName?.charAt(0) || '?'}
            </span>
          )}
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">
            {moment.author?.displayName || 'Unknown'}
          </p>
          <p className="text-xs text-slate-500">
            {new Date(moment.createdAt).toLocaleDateString()} · {moment.category}
          </p>
        </div>
      </div>

      <p className="text-sm text-slate-700 mb-3">{moment.caption}</p>

      {moment.imageUrl && (
        <div className="rounded-xl overflow-hidden mb-3">
          <img
            src={moment.imageUrl}
            alt=""
            className="w-full h-auto object-cover max-h-96"
          />
        </div>
      )}

      <div className="flex items-center gap-6 pt-3 border-t border-slate-100">
        <button
          onClick={handleLike}
          className={`flex items-center gap-1.5 text-sm transition-all ${
            liked ? 'text-red-500' : 'text-slate-500 hover:text-red-500'
          }`}
        >
          <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
          {likesCount}
        </button>
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-all"
        >
          <MessageCircle className="w-4 h-4" />
          {moment.commentsCount}
        </button>
        <button className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-all">
          <Share2 className="w-4 h-4" />
          Share
        </button>
      </div>

      {showComments && (
        <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
          {moment.comments?.map((comment) => (
            <div key={comment.id} className="flex items-start gap-2">
              <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                <span className="text-[10px] font-bold text-slate-600">
                  {comment.author?.displayName?.charAt(0) || '?'}
                </span>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-900">
                  {comment.author?.displayName}
                </p>
                <p className="text-xs text-slate-600">{comment.content}</p>
              </div>
            </div>
          ))}
          <div className="flex items-center gap-2 mt-2">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment..."
              className="input text-sm !py-2 !px-3"
              onKeyDown={(e) => e.key === 'Enter' && handleComment()}
            />
            <button
              onClick={handleComment}
              disabled={!commentText.trim()}
              className="btn-primary text-sm !py-2 !px-4 disabled:opacity-50"
            >
              Post
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
