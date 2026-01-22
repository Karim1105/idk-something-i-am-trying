# Weggo - Egypt's Trusted Marketplace

A full-stack marketplace application built with Next.js 14+, TypeScript, TailwindCSS, and MongoDB. Features seller verification, AI-powered listing assistance, buyer support chat, and comprehensive admin controls.

## Features

### User Features
- **Browse Listings**: Filter by category, location, price, condition
- **Listing Details**: View detailed product information with seller details
- **Authentication**: Email/OTP-based login (stub implementation)
- **Multi-language**: Arabic/English toggle with RTL support
- **Dark/Light Theme**: Toggle between themes
- **Buyer Assist**: AI-powered chat to help find products
- **Reporting**: Report suspicious listings

### Seller Features
- **Create Listings**: Post items for sale
- **AI Suggestions**: Get AI-powered title, description, and price suggestions
- **Seller Verification**: Upload ID documents for verification
- **Manage Listings**: Edit and delete your listings

### Admin Features
- **Reports Management**: Review and resolve user reports
- **Seller Verification Queue**: Approve/reject seller verification requests
- **Flagged Listings**: Manage flagged content
- **Feature Flags**: Enable/disable platform features
- **Audit Logs**: Track admin actions

## Tech Stack

- **Frontend**: Next.js 14+ (App Router), React, TypeScript, TailwindCSS
- **Backend**: Next.js API Routes, NextAuth.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: NextAuth.js with JWT sessions
- **Testing**: Vitest, React Testing Library
- **Linting**: ESLint, Prettier

## Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables: `cp .env.example .env`
4. Edit `.env` with your MongoDB URI and secrets
5. Seed the database: `npm run seed`
6. Run the development server: `npm run dev`

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Testing

- Run tests: `npm test`
- Run tests in watch mode: `npm run test:watch`

## Deployment

Deploy on Vercel with MongoDB Atlas. See full documentation in the repository for detailed setup instructions.

## License

MIT
