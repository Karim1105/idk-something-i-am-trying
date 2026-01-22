import mongoose, { Schema, Model } from 'mongoose';
import {
  Listing as IListing,
  ListingStatus,
  ListingCondition,
  ListingCategory,
} from '@/types';

const ListingSchema = new Schema<IListing>(
  {
    sellerId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    currency: { type: String, default: 'EGP' },
    category: {
      type: String,
      enum: Object.values(ListingCategory),
      required: true,
    },
    condition: {
      type: String,
      enum: Object.values(ListingCondition),
      required: true,
    },
    location: { type: String, required: true },
    images: [{ type: String }],
    status: {
      type: String,
      enum: Object.values(ListingStatus),
      default: ListingStatus.DRAFT,
    },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Listing: Model<IListing> =
  mongoose.models.Listing || mongoose.model<IListing>('Listing', ListingSchema);

export default Listing;
