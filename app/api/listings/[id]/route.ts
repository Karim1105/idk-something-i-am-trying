import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Listing from '@/models/Listing';
import { requireAuth, handleApiError } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;
    const listing = await Listing.findById(id);

    if (!listing) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
    }

    // Increment view count
    await Listing.findByIdAndUpdate(id, { $inc: { views: 1 } });

    return NextResponse.json(listing);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireAuth();
    await dbConnect();

    const body = await request.json();
    const userId = (session.user as any).id;
    const { id } = await params;

    const listing = await Listing.findById(id);

    if (!listing) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
    }

    if (listing.sellerId !== userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const updatedListing = await Listing.findByIdAndUpdate(
      id,
      body,
      { new: true }
    );

    return NextResponse.json(updatedListing);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireAuth();
    await dbConnect();

    const userId = (session.user as any).id;
    const { id } = await params;
    const listing = await Listing.findById(id);

    if (!listing) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
    }

    if (listing.sellerId !== userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await Listing.findByIdAndDelete(id);

    return NextResponse.json({ message: 'Listing deleted' });
  } catch (error) {
    return handleApiError(error);
  }
}
