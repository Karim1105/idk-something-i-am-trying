import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import dbConnect from '@/lib/dbConnect';
import Listing from '@/models/Listing';
import User from '@/models/User';
import { UserRole, ListingCategory, ListingCondition, ListingStatus } from '@/types';

describe('Listings API', () => {
  beforeAll(async () => {
    await dbConnect();
  });

  afterAll(async () => {
    // Cleanup test data
    await Listing.deleteMany({ title: /^TEST:/ });
    await User.deleteMany({ email: /^test-/ });
  });

  it('should create a listing model', async () => {
    const listing = new Listing({
      sellerId: 'test-seller-id',
      title: 'TEST: Sample Listing',
      description: 'This is a test listing',
      price: 1000,
      currency: 'EGP',
      category: ListingCategory.ELECTRONICS,
      condition: ListingCondition.NEW,
      location: 'Cairo, Egypt',
      images: [],
      status: ListingStatus.DRAFT,
    });

    expect(listing.title).toBe('TEST: Sample Listing');
    expect(listing.price).toBe(1000);
    expect(listing.category).toBe(ListingCategory.ELECTRONICS);
  });

  it('should save and retrieve a listing', async () => {
    const listing = await Listing.create({
      sellerId: 'test-seller-id',
      title: 'TEST: Another Listing',
      description: 'This is another test listing',
      price: 2000,
      currency: 'EGP',
      category: ListingCategory.FASHION,
      condition: ListingCondition.GOOD,
      location: 'Alexandria, Egypt',
      images: [],
      status: ListingStatus.PUBLISHED,
    });

    const found = await Listing.findById(listing._id);
    expect(found).toBeDefined();
    expect(found?.title).toBe('TEST: Another Listing');
    expect(found?.price).toBe(2000);
  });

  it('should filter listings by category', async () => {
    const listings = await Listing.find({
      category: ListingCategory.ELECTRONICS,
      status: ListingStatus.PUBLISHED,
    });

    expect(Array.isArray(listings)).toBe(true);
  });
});
