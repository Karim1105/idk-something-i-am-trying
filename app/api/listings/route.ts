import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Listing from '@/models/Listing';
import { requireAuth, handleApiError } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const location = searchParams.get('location');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const condition = searchParams.get('condition');
    const status = searchParams.get('status') || 'published';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    const query: any = { status };

    if (category) query.category = category;
    if (location) query.location = { $regex: location, $options: 'i' };
    if (condition) query.condition = condition;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseInt(minPrice);
      if (maxPrice) query.price.$lte = parseInt(maxPrice);
    }

    const skip = (page - 1) * limit;

    const [listings, total] = await Promise.all([
      Listing.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Listing.countDocuments(query),
    ]);

    return NextResponse.json({
      listings,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await requireAuth();
    await dbConnect();

    const body = await request.json();
    const userId = (session.user as any).id;

    const listing = await Listing.create({
      ...body,
      sellerId: userId,
    });

    return NextResponse.json(listing, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
