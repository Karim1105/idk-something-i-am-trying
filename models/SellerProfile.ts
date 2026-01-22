import mongoose, { Schema, Model } from 'mongoose';
import { SellerProfile as ISellerProfile, VerificationStatus } from '@/types';

const SellerProfileSchema = new Schema<ISellerProfile>(
  {
    userId: { type: String, required: true, unique: true },
    verificationStatus: {
      type: String,
      enum: Object.values(VerificationStatus),
      default: VerificationStatus.PENDING,
    },
    idFrontImage: { type: String },
    idBackImage: { type: String },
    verificationNotes: { type: String },
    rejectionReason: { type: String },
    rating: { type: Number, default: 0 },
    totalSales: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const SellerProfile: Model<ISellerProfile> =
  mongoose.models.SellerProfile ||
  mongoose.model<ISellerProfile>('SellerProfile', SellerProfileSchema);

export default SellerProfile;
