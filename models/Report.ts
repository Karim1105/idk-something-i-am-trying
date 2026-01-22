import mongoose, { Schema, Model } from 'mongoose';
import { Report as IReport, ReportStatus, ReportReason } from '@/types';

const ReportSchema = new Schema<IReport>(
  {
    reporterId: { type: String, required: true },
    listingId: { type: String, required: true },
    reason: {
      type: String,
      enum: Object.values(ReportReason),
      required: true,
    },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: Object.values(ReportStatus),
      default: ReportStatus.OPEN,
    },
    aiSummary: { type: String },
    adminNotes: { type: String },
    resolvedBy: { type: String },
    resolvedAt: { type: Date },
  },
  { timestamps: true }
);

const Report: Model<IReport> =
  mongoose.models.Report || mongoose.model<IReport>('Report', ReportSchema);

export default Report;
