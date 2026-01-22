import mongoose, { Schema, Model } from 'mongoose';
import { FeatureFlag as IFeatureFlag } from '@/types';

const FeatureFlagSchema = new Schema<IFeatureFlag>(
  {
    key: { type: String, required: true, unique: true },
    enabled: { type: Boolean, default: false },
    description: { type: String },
  },
  { timestamps: true }
);

const FeatureFlag: Model<IFeatureFlag> =
  mongoose.models.FeatureFlag ||
  mongoose.model<IFeatureFlag>('FeatureFlag', FeatureFlagSchema);

export default FeatureFlag;
