import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Report from '@/models/Report';
import Listing from '@/models/Listing';
import { requireRole, handleApiError } from '@/lib/auth';
import { UserRole, ReportStatus, ListingStatus } from '@/types';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireRole([UserRole.ADMIN]);
    await dbConnect();

    const body = await request.json();
    const { action, notes } = body;

    const report = await Report.findById(params.id);
    if (!report) {
      return NextResponse.json({ error: 'Report not found' }, { status: 404 });
    }

    let updateData: any = {};

    if (action === 'resolve') {
      updateData = {
        status: ReportStatus.RESOLVED,
        adminNotes: notes,
        resolvedAt: new Date(),
      };
    } else if (action === 'triage') {
      updateData = {
        status: ReportStatus.TRIAGED,
        adminNotes: notes,
      };
    } else if (action === 'hide_listing') {
      // Hide the reported listing
      await Listing.findByIdAndUpdate(report.listingId, {
        status: ListingStatus.HIDDEN,
      });
      updateData = {
        status: ReportStatus.RESOLVED,
        adminNotes: notes || 'Listing hidden',
        resolvedAt: new Date(),
      };
    } else if (action === 'flag_listing') {
      // Flag the reported listing
      await Listing.findByIdAndUpdate(report.listingId, {
        status: ListingStatus.FLAGGED,
      });
      updateData = {
        status: ReportStatus.TRIAGED,
        adminNotes: notes || 'Listing flagged for review',
      };
    }

    const updatedReport = await Report.findByIdAndUpdate(params.id, updateData, {
      new: true,
    });

    return NextResponse.json(updatedReport);
  } catch (error) {
    return handleApiError(error);
  }
}
