export enum UserRole {
  USER = 'user',
  SELLER = 'seller',
  ADMIN = 'admin',
}

export enum ListingStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  HIDDEN = 'hidden',
  FLAGGED = 'flagged',
}

export enum VerificationStatus {
  PENDING = 'pending',
  VERIFIED = 'verified',
  REJECTED = 'rejected',
}

export enum ReportStatus {
  OPEN = 'open',
  TRIAGED = 'triaged',
  RESOLVED = 'resolved',
}

export enum ListingCondition {
  NEW = 'new',
  LIKE_NEW = 'like_new',
  GOOD = 'good',
  FAIR = 'fair',
  POOR = 'poor',
}

export enum ListingCategory {
  ELECTRONICS = 'electronics',
  FASHION = 'fashion',
  HOME = 'home',
  VEHICLES = 'vehicles',
  REAL_ESTATE = 'real_estate',
  SERVICES = 'services',
  OTHER = 'other',
}

export enum ReportReason {
  SPAM = 'spam',
  FRAUD = 'fraud',
  INAPPROPRIATE = 'inappropriate',
  MISLEADING = 'misleading',
  OTHER = 'other',
}

export interface User {
  _id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SellerProfile {
  _id: string;
  userId: string;
  verificationStatus: VerificationStatus;
  idFrontImage?: string;
  idBackImage?: string;
  verificationNotes?: string;
  rejectionReason?: string;
  rating?: number;
  totalSales?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Listing {
  _id: string;
  sellerId: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  category: ListingCategory;
  condition: ListingCondition;
  location: string;
  images: string[];
  status: ListingStatus;
  views?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Report {
  _id: string;
  reporterId: string;
  listingId: string;
  reason: ReportReason;
  description: string;
  status: ReportStatus;
  aiSummary?: string;
  adminNotes?: string;
  resolvedBy?: string;
  resolvedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Conversation {
  _id: string;
  listingId: string;
  buyerId: string;
  sellerId: string;
  lastMessageAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  _id: string;
  conversationId: string;
  senderId: string;
  content: string;
  read: boolean;
  createdAt: Date;
}

export interface FeatureFlag {
  _id: string;
  key: string;
  enabled: boolean;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuditLog {
  _id: string;
  userId: string;
  action: string;
  resource: string;
  resourceId: string;
  metadata?: Record<string, any>;
  createdAt: Date;
}
