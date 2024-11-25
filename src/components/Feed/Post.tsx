import { Heart, MessageCircle, Share, Bookmark } from 'lucide-react';
import { FeedItem } from './interfaces/Feed-interface.interface';

export default function Post(feedItem: FeedItem) {
  return (
    <div className="bg-white rounded-lg shadow mb-4">
      <div className="p-4">
        <div className="flex items-center gap-3 mb-4">
          <img
            src={feedItem.user.profilePicture || undefined}
            alt={feedItem.user.fullName}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h3 className="font-semibold">{feedItem.user.fullName}</h3>
            <p className="text-sm text-gray-500">
              {feedItem.user.bio} • {new Date(feedItem.createdAt).toLocaleDateString('es-PE', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })} • {new Date(feedItem.createdAt).toLocaleTimeString('es-PE', {
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
              })}
            </p>

          </div>
        </div>
        <p className="mb-4">{feedItem.content}</p>
        {feedItem.imageUrls[0] && (
          <img src={feedItem.imageUrls[0]} alt="Post content" className="w-full rounded-lg mb-4" />
        )}
        <div className="flex justify-between items-center">
          <div className="flex gap-6">
            <button className="flex items-center gap-2 text-gray-600 hover:text-pink-500">
              <Heart className="w-5 h-5" />
              <span>{feedItem.likeCount}</span>
            </button>
            <button className="flex items-center gap-2 text-gray-600 hover:text-pink-500">
              <MessageCircle className="w-5 h-5" />
              <span>{feedItem.commentCount}</span>
            </button>
            <button className="flex items-center gap-2 text-gray-600 hover:text-pink-500">
              <Share className="w-5 h-5" />
            </button>
          </div>
          <button className="text-gray-600 hover:text-pink-500">
            <Bookmark className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}