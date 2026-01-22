import dbConnect from '../lib/dbConnect';
import User from '../models/User';
import SellerProfile from '../models/SellerProfile';
import Listing from '../models/Listing';
import Report from '../models/Report';
import Conversation from '../models/Conversation';
import Message from '../models/Message';
import FeatureFlag from '../models/FeatureFlag';
import {
  UserRole,
  ListingCategory,
  ListingCondition,
  ListingStatus,
  VerificationStatus,
  ReportReason,
  ReportStatus,
} from '../types';

async function seed() {
  try {
    await dbConnect();

    // Clear existing data
    await User.deleteMany({});
    await SellerProfile.deleteMany({});
    await Listing.deleteMany({});
    await Report.deleteMany({});
    await Conversation.deleteMany({});
    await Message.deleteMany({});
    await FeatureFlag.deleteMany({});

    // Create users
    const adminUser = await User.create({
      email: 'admin@weggo.eg',
      name: 'Admin User',
      role: UserRole.ADMIN,
    });

    const seller1 = await User.create({
      email: 'seller1@weggo.eg',
      name: 'Ahmed Hassan',
      role: UserRole.SELLER,
    });

    const seller2 = await User.create({
      email: 'seller2@weggo.eg',
      name: 'Fatma Mohamed',
      role: UserRole.SELLER,
    });

    const buyer1 = await User.create({
      email: 'buyer1@weggo.eg',
      name: 'Omar Ibrahim',
      role: UserRole.USER,
    });

    const buyer2 = await User.create({
      email: 'buyer2@weggo.eg',
      name: 'Nour Ali',
      role: UserRole.USER,
    });

    console.log('✅ Users created');

    // Create seller profiles
    const sellerProfile1 = await SellerProfile.create({
      userId: seller1._id.toString(),
      verificationStatus: VerificationStatus.VERIFIED,
      rating: 4.5,
      totalSales: 23,
    });

    const sellerProfile2 = await SellerProfile.create({
      userId: seller2._id.toString(),
      verificationStatus: VerificationStatus.PENDING,
      rating: 0,
      totalSales: 0,
    });

    console.log('✅ Seller profiles created');

    // Create listings
    const listings = [
      {
        sellerId: seller1._id.toString(),
        title: 'iPhone 14 Pro 256GB - Like New',
        description:
          'Excellent condition iPhone 14 Pro, barely used. Comes with original box and accessories. No scratches.',
        price: 35000,
        currency: 'EGP',
        category: ListingCategory.ELECTRONICS,
        condition: ListingCondition.LIKE_NEW,
        location: 'Cairo, Nasr City',
        images: ['/placeholder-phone.jpg'],
        status: ListingStatus.PUBLISHED,
      },
      {
        sellerId: seller1._id.toString(),
        title: 'Samsung Galaxy S23 Ultra',
        description:
          'Brand new Samsung Galaxy S23 Ultra with 512GB storage. Factory sealed.',
        price: 42000,
        currency: 'EGP',
        category: ListingCategory.ELECTRONICS,
        condition: ListingCondition.NEW,
        location: 'Cairo, Maadi',
        images: ['/placeholder-phone.jpg'],
        status: ListingStatus.PUBLISHED,
      },
      {
        sellerId: seller1._id.toString(),
        title: 'MacBook Pro M2 14-inch',
        description:
          'MacBook Pro with M2 chip, 16GB RAM, 512GB SSD. Perfect for professionals.',
        price: 65000,
        currency: 'EGP',
        category: ListingCategory.ELECTRONICS,
        condition: ListingCondition.LIKE_NEW,
        location: 'Cairo, Zamalek',
        images: ['/placeholder-laptop.jpg'],
        status: ListingStatus.PUBLISHED,
      },
      {
        sellerId: seller2._id.toString(),
        title: 'Designer Handbag - Authentic',
        description:
          'Authentic designer handbag in excellent condition. Comes with authentication certificate.',
        price: 8500,
        currency: 'EGP',
        category: ListingCategory.FASHION,
        condition: ListingCondition.GOOD,
        location: 'Alexandria, Smoha',
        images: ['/placeholder-bag.jpg'],
        status: ListingStatus.PUBLISHED,
      },
      {
        sellerId: seller2._id.toString(),
        title: 'Modern Sofa Set - 3 Seater',
        description:
          'Contemporary 3-seater sofa in excellent condition. Gray fabric, very comfortable.',
        price: 12000,
        currency: 'EGP',
        category: ListingCategory.HOME,
        condition: ListingCondition.GOOD,
        location: 'Giza, 6th of October',
        images: ['/placeholder-sofa.jpg'],
        status: ListingStatus.PUBLISHED,
      },
      {
        sellerId: seller1._id.toString(),
        title: 'Honda Civic 2022',
        description:
          'Well-maintained Honda Civic 2022, low mileage, single owner.',
        price: 450000,
        currency: 'EGP',
        category: ListingCategory.VEHICLES,
        condition: ListingCondition.LIKE_NEW,
        location: 'Cairo, Heliopolis',
        images: ['/placeholder-car.jpg'],
        status: ListingStatus.PUBLISHED,
      },
      {
        sellerId: seller1._id.toString(),
        title: 'Gaming Setup - Complete',
        description:
          'Complete gaming setup with RTX 4070, 32GB RAM, mechanical keyboard, gaming mouse.',
        price: 55000,
        currency: 'EGP',
        category: ListingCategory.ELECTRONICS,
        condition: ListingCondition.GOOD,
        location: 'Cairo, New Cairo',
        images: ['/placeholder-gaming.jpg'],
        status: ListingStatus.PUBLISHED,
      },
      {
        sellerId: seller2._id.toString(),
        title: 'Apartment for Rent - 2BR',
        description:
          '2 bedroom apartment in quiet neighborhood, fully furnished, great view.',
        price: 8000,
        currency: 'EGP',
        category: ListingCategory.REAL_ESTATE,
        condition: ListingCondition.GOOD,
        location: 'Cairo, Maadi',
        images: ['/placeholder-apartment.jpg'],
        status: ListingStatus.PUBLISHED,
      },
      {
        sellerId: seller1._id.toString(),
        title: 'Professional Photography Service',
        description:
          'Professional photographer available for events, portraits, and commercial work.',
        price: 2000,
        currency: 'EGP',
        category: ListingCategory.SERVICES,
        condition: ListingCondition.NEW,
        location: 'Cairo, All Areas',
        images: ['/placeholder-photo.jpg'],
        status: ListingStatus.PUBLISHED,
      },
      {
        sellerId: seller2._id.toString(),
        title: 'Vintage Watch Collection',
        description:
          'Collection of vintage watches, well-maintained, rare finds.',
        price: 15000,
        currency: 'EGP',
        category: ListingCategory.OTHER,
        condition: ListingCondition.GOOD,
        location: 'Alexandria, Downtown',
        images: ['/placeholder-watch.jpg'],
        status: ListingStatus.PUBLISHED,
      },
      {
        sellerId: seller1._id.toString(),
        title: 'DRAFT: Testing Draft Listing',
        description: 'This is a draft listing for testing purposes.',
        price: 1000,
        currency: 'EGP',
        category: ListingCategory.OTHER,
        condition: ListingCondition.NEW,
        location: 'Cairo, Test Area',
        images: [],
        status: ListingStatus.DRAFT,
      },
    ];

    const createdListings = await Listing.insertMany(listings);
    console.log('✅ Listings created');

    // Create sample reports
    const reports = [
      {
        reporterId: buyer1._id.toString(),
        listingId: createdListings[0]._id.toString(),
        reason: ReportReason.MISLEADING,
        description: 'The phone condition does not match the description.',
        status: ReportStatus.OPEN,
      },
      {
        reporterId: buyer2._id.toString(),
        listingId: createdListings[3]._id.toString(),
        reason: ReportReason.FRAUD,
        description: 'I suspect this is a counterfeit item.',
        status: ReportStatus.TRIAGED,
        aiSummary: 'User suspects item authenticity. Requires verification.',
      },
    ];

    await Report.insertMany(reports);
    console.log('✅ Reports created');

    // Create sample conversations and messages
    const conversation1 = await Conversation.create({
      listingId: createdListings[0]._id.toString(),
      buyerId: buyer1._id.toString(),
      sellerId: seller1._id.toString(),
      lastMessageAt: new Date(),
    });

    await Message.insertMany([
      {
        conversationId: conversation1._id.toString(),
        senderId: buyer1._id.toString(),
        content: 'Hi, is this item still available?',
        read: true,
      },
      {
        conversationId: conversation1._id.toString(),
        senderId: seller1._id.toString(),
        content: 'Yes, it is! Would you like to see more photos?',
        read: false,
      },
    ]);

    console.log('✅ Conversations and messages created');

    // Create feature flags
    await FeatureFlag.insertMany([
      {
        key: 'ai_assistance',
        enabled: true,
        description: 'Enable AI-powered listing suggestions',
      },
      {
        key: 'buyer_assist_chat',
        enabled: true,
        description: 'Enable buyer assistance chatbot',
      },
      {
        key: 'seller_verification',
        enabled: true,
        description: 'Enable seller ID verification',
      },
    ]);

    console.log('✅ Feature flags created');

    console.log('\n🎉 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();
