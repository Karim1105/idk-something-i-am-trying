import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import SellerProfile from '@/models/SellerProfile';
import { requireRole, handleApiError } from '@/lib/auth';
import { UserRole, VerificationStatus } from '@/types';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireRole([UserRole.ADMIN]);
    await dbConnect();

    const body = await request.json();
    const { action, notes } = body;

    const profile = await SellerProfile.findById(params.id);
    if (!profile) {
      return NextResponse.json(
        { error: 'Seller profile not found' },
        { status: 404 }
      );
    }

    let updateData: any = {};

    if (action === 'approve') {
      updateData = {
        verificationStatus: VerificationStatus.VERIFIED,
        verificationNotes: notes,
      };
    } else if (action === 'reject') {
      updateData = {
        verificationStatus: VerificationStatus.REJECTED,
        rejectionReason: notes,
      };
    }

    const updatedProfile = await SellerProfile.findByIdAndUpdate(
      params.id,
      updateData,
      { new: true }
    );

    return NextResponse.json(updatedProfile);
  } catch (error) {
    return handleApiError(error);
  }
}
