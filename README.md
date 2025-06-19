# Innsight: Property Management System

## Overview

Innsight is a comprehensive property management system designed specifically for small to medium-sized hospitality businesses like boutique hotels, lodges, and cabin rental properties. It provides a complete solution for managing accommodations, bookings, guests, and business analytics all in one intuitive platform.

> 🚧 **Note:** Innsight is currently under active development. Some of the features listed below are in progress or planned for future releases.

## Features

### Property Management

- **Cabin/Room Management**: Create, view, update, and delete accommodation units with detailed information including photos, capacity, pricing, and features
- **Flexible Pricing**: Set standard rates and special discount percentages for promotions
- **Property Categorization**: Organize accommodations by type, features, and availability

### Booking Management

- **Comprehensive Booking System**: Create and manage reservations with an intuitive interface
- **Status Tracking**: Follow bookings through their lifecycle (confirmed, checked-in, checked-out, cancelled, no-show)
- **Calendar View**: Visualize occupancy and availability across all properties
- **Check-in/Check-out Workflows**: Streamlined processes for guest arrivals and departures

### Guest Management

- **Guest Profiles**: Maintain comprehensive guest information and booking history
- **Communication Tools**: Send booking confirmations, reminders, and customized messages
- **Feedback Collection**: Gather and analyze guest experiences

### Business Intelligence

- **Dashboard Analytics**: Visual reports of key metrics like occupancy rates, revenue, and booking trends
- **Financial Reporting**: Track revenue, payments, and outstanding balances
- **Performance Insights**: Identify peak seasons and opportunities for optimization

### Administration

- **User Management**: Role-based access control for staff members
- **Application Settings**: Customize the system to match your business needs
- **Account Management**: Secure profile and preference management

## Technology Stack

Innsight is built with modern technologies for performance, security, and scalability:

- **Frontend**: React 19 with TypeScript
- **UI Framework**: TailwindCSS for responsive design
- **Build Tool**: Vite for fast development and optimized production builds
- **State Management**: TanStack React Query for efficient data fetching and caching
- **Backend**: Supabase for authentication, database, and storage
  > InnSight uses a PostgreSQL database managed via Supabase. The schema includes tables like `cabins`, `bookings`, `guests`, and `users`, with Row Level Security (RLS) enabled for secure data access.
- **Notifications**: React Hot Toast for elegant user notifications
- **Routing**: React Router for navigation

## Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn
- Supabase account

### Installation

1. Clone the repository

   ```
   git clone https://github.com/yourusername/innsight.git
   cd innsight
   ```

2. Install dependencies

   ```
   npm install
   ```

3. Set up environment variables

   ```
   cp .env.example .env.local
   ```

   Edit `.env.local` with your Supabase credentials and other configuration values

4. Start the development server
   ```
   npm run dev
   ```

## Deployment

Innsight can be deployed to various hosting platforms:

1. Build the production version

   ```
   npm run build
   ```

2. Deploy using your preferred hosting service (Vercel, Netlify, etc.)

## Contributing

We welcome contributions to Innsight! Please see our [Contributing Guide](CONTRIBUTING.md) for details on how to get started.

## License

This project is licensed under the [MIT License](LICENSE).
