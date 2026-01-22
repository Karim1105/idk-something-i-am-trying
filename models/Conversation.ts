import mongoose, { Schema, Model } from 'mongoose';
import { Conversation as IConversation } from '@/types';

const ConversationSchema = new Schema<IConversation>(
  {
    listingId: { type: String, required: true },
    buyerId: { type: String, required: true },
    sellerId: { type: String, required: true },
    lastMessageAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Conversation: Model<IConversation> =
  mongoose.models.Conversation ||
  mongoose.model<IConversation>('Conversation', ConversationSchema);

export default Conversation;
