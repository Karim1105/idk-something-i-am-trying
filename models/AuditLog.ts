import mongoose, { Schema, Model } from 'mongoose';
import { AuditLog as IAuditLog } from '@/types';

const AuditLogSchema = new Schema<IAuditLog>(
  {
    userId: { type: String, required: true },
    action: { type: String, required: true },
    resource: { type: String, required: true },
    resourceId: { type: String, required: true },
    metadata: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

const AuditLog: Model<IAuditLog> =
  mongoose.models.AuditLog ||
  mongoose.model<IAuditLog>('AuditLog', AuditLogSchema);

export default AuditLog;
