import { useState } from 'react';
import { X, Send } from 'lucide-react';
import type { DiscoverUser } from '../../types';

interface IntroductionModalProps {
  user: DiscoverUser;
  isOpen: boolean;
  onClose: () => void;
  onSend: (message: string) => void;
}

export default function IntroductionModal({ user, isOpen, onClose, onSend }: IntroductionModalProps) {
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  if (!isOpen) return null;

  const handleSend = async () => {
    if (!message.trim()) return;
    setSending(true);
    onSend(message);
    setMessage('');
    setSending(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Introduce Yourself</h2>
            <p className="text-sm text-slate-500">Send a message to {user.displayName}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-all"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100">
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={user.displayName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-xl font-bold text-slate-300">
                    {user.displayName.charAt(0)}
                  </span>
                </div>
              )}
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">
                {user.displayName}, {user.age}
              </h3>
              <p className="text-sm text-slate-500">{user.country}</p>
            </div>
          </div>

          <div className="space-y-2">
            <label className="label">Your Introduction Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="input min-h-[120px] resize-none"
              placeholder={`Hi ${user.displayName}, I came across your profile and I'd love to connect...`}
              maxLength={500}
            />
            <p className="text-xs text-slate-400 text-right">{message.length}/500</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-6 border-t border-slate-100 bg-slate-50">
          <button onClick={onClose} className="btn-ghost flex-1">
            Cancel
          </button>
          <button
            onClick={handleSend}
            disabled={!message.trim() || sending}
            className="btn-primary flex-1 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            {sending ? 'Sending...' : 'Send Introduction'}
          </button>
        </div>
      </div>
    </div>
  );
}
