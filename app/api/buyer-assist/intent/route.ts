import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Listing from '@/models/Listing';
import { requireAuth, handleApiError } from '@/lib/auth';
import { ListingCategory } from '@/types';

// Simple rule-based intent to search filter mapping
function mapIntentToFilters(message: string) {
  const lowerMessage = message.toLowerCase();
  const filters: any = {};

  // Category detection
  if (lowerMessage.includes('phone') || lowerMessage.includes('mobile')) {
    filters.category = ListingCategory.ELECTRONICS;
    filters.searchTerm = 'phone';
  } else if (lowerMessage.includes('laptop') || lowerMessage.includes('computer')) {
    filters.category = ListingCategory.ELECTRONICS;
    filters.searchTerm = 'laptop';
  } else if (lowerMessage.includes('car') || lowerMessage.includes('vehicle')) {
    filters.category = ListingCategory.VEHICLES;
  } else if (lowerMessage.includes('apartment') || lowerMessage.includes('house')) {
    filters.category = ListingCategory.REAL_ESTATE;
  } else if (lowerMessage.includes('fashion') || lowerMessage.includes('clothes')) {
    filters.category = ListingCategory.FASHION;
  }

  // Price range detection
  const priceMatch = lowerMessage.match(/(\d+)\s*(egp|pounds?)/i);
  if (priceMatch) {
    const price = parseInt(priceMatch[1]);
    if (lowerMessage.includes('under') || lowerMessage.includes('less than')) {
      filters.maxPrice = price;
    } else if (lowerMessage.includes('over') || lowerMessage.includes('more than')) {
      filters.minPrice = price;
    } else {
      filters.maxPrice = price * 1.2;
      filters.minPrice = price * 0.8;
    }
  }

  // Location detection
  const egyptLocations = ['cairo', 'giza', 'alexandria', 'maadi', 'zamalek', 'nasr city'];
  for (const location of egyptLocations) {
    if (lowerMessage.includes(location)) {
      filters.location = location;
      break;
    }
  }

  return filters;
}

export async function POST(request: NextRequest) {
  try {
    await requireAuth();
    await dbConnect();

    const body = await request.json();
    const { message } = body;

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Map intent to filters
    const filters = mapIntentToFilters(message);

    // Build query
    const query: any = { status: 'published' };
    if (filters.category) query.category = filters.category;
    if (filters.location) query.location = { $regex: filters.location, $options: 'i' };
    if (filters.minPrice || filters.maxPrice) {
      query.price = {};
      if (filters.minPrice) query.price.$gte = filters.minPrice;
      if (filters.maxPrice) query.price.$lte = filters.maxPrice;
    }
    if (filters.searchTerm) {
      query.$or = [
        { title: { $regex: filters.searchTerm, $options: 'i' } },
        { description: { $regex: filters.searchTerm, $options: 'i' } },
      ];
    }

    // Get matching listings
    const listings = await Listing.find(query).limit(10).sort({ createdAt: -1 });

    // Generate response message
    let responseMessage = '';
    if (listings.length > 0) {
      responseMessage = `I found ${listings.length} listings that match your search. Here are the results:`;
    } else {
      responseMessage = "I couldn't find any listings matching your request. Try adjusting your search criteria.";
    }

    return NextResponse.json({
      message: responseMessage,
      filters,
      listings,
      suggestedResponses: [
        'Show me cheaper options',
        'Any in a different location?',
        'Show me newer listings',
      ],
    });
  } catch (error) {
    return handleApiError(error);
  }
}
