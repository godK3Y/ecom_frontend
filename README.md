# KeyCommerce - Premium Fashion & Lifestyle E-commerce

A modern, scalable e-commerce platform built with Next.js 15, TypeScript, and Tailwind CSS.

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication routes
│   ├── (dashboard)/       # Admin & Seller dashboards
│   ├── (shop)/           # Public shop routes
│   ├── api/              # API routes
│   └── globals.css       # Global styles
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components (shadcn/ui)
│   ├── forms/            # Form components
│   ├── layout/           # Layout components
│   └── features/         # Feature-specific components
├── lib/                  # Utility libraries
│   ├── utils.ts          # General utilities
│   ├── validators.ts     # Form validation schemas
│   └── constants.ts      # App constants
├── hooks/                # Custom React hooks
├── services/             # API service layer
├── types/                # TypeScript type definitions
├── stores/               # State management (Zustand)
└── config/               # Configuration files
```

## 🚀 Features

- **Modern Stack**: Next.js 15, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui component library
- **Authentication**: JWT-based auth with role-based access
- **Shopping Cart**: Persistent cart with local storage
- **Theme Support**: Dark/Light mode with system preference
- **Responsive Design**: Mobile-first approach
- **Type Safety**: Full TypeScript coverage

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📁 Directory Organization

### `/src/app/` - Next.js App Router

- **Route Groups**: Organized by feature (auth, shop, dashboard)
- **Layouts**: Shared layouts for different sections
- **API Routes**: Backend API endpoints

### `/src/components/` - UI Components

- **`/ui/`**: Base components (Button, Input, Card, etc.)
- **`/forms/`**: Form-specific components
- **`/layout/`**: Navigation, Footer, Sidebar
- **`/features/`**: Feature-specific components (Product, Cart, etc.)

### `/src/lib/` - Utilities & Config

- **`utils.ts`**: Helper functions
- **`validators.ts`**: Zod validation schemas
- **`constants.ts`**: App constants and enums

### `/src/services/` - API Layer

- **`api-client.ts`**: Base API client configuration
- **`auth.service.ts`**: Authentication API calls
- **`product.service.ts`**: Product-related API calls
- **`cart.service.ts`**: Cart management API calls

### `/src/types/` - TypeScript Definitions

- **`auth.ts`**: Authentication types
- **`product.ts`**: Product-related types
- **`cart.ts`**: Cart and order types
- **`user.ts`**: User profile types

### `/src/stores/` - State Management

- **`auth.store.ts`**: Authentication state
- **`cart.store.ts`**: Shopping cart state
- **`ui.store.ts`**: UI state (theme, sidebar, etc.)

## 🎨 Design System

Built with shadcn/ui components and Tailwind CSS:

- **Colors**: Semantic color tokens
- **Typography**: Inter font family
- **Spacing**: Consistent spacing scale
- **Components**: Accessible, customizable components

## 🔐 Authentication

Role-based authentication system:

- **Customer**: Browse products, manage cart, place orders
- **Seller**: Manage products, view orders, analytics
- **Admin**: Full system access, user management

## 🛒 Shopping Features

- **Product Catalog**: Categories, filters, search
- **Shopping Cart**: Add/remove items, quantity management
- **Checkout**: Address management, order processing
- **Order History**: Track order status and history

## 📱 Responsive Design

- **Mobile-first**: Optimized for mobile devices
- **Tablet**: Responsive layouts for tablets
- **Desktop**: Enhanced desktop experience
- **Accessibility**: WCAG 2.1 compliant

## 🚀 Performance

- **Next.js 15**: Latest features and optimizations
- **Turbopack**: Fast development builds
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic route-based splitting
- **SEO**: Meta tags, structured data, sitemap

## 🔧 Configuration

- **Environment Variables**: `.env.local` for local development
- **TypeScript**: Strict type checking
- **ESLint**: Code quality and consistency
- **Prettier**: Code formatting
- **Tailwind**: Custom configuration

## 📦 Dependencies

### Core

- **Next.js 15**: React framework
- **React 19**: UI library
- **TypeScript**: Type safety

### UI & Styling

- **Tailwind CSS**: Utility-first CSS
- **shadcn/ui**: Component library
- **Lucide React**: Icons
- **next-themes**: Theme switching

### State & Data

- **Zustand**: State management
- **React Query**: Server state management
- **Zod**: Schema validation

### Forms

- **React Hook Form**: Form handling
- **@hookform/resolvers**: Zod integration

## 🧪 Testing

- **Jest**: Unit testing
- **React Testing Library**: Component testing
- **Playwright**: E2E testing

## 📈 Analytics

- **Google Analytics**: User behavior tracking
- **Vercel Analytics**: Performance monitoring

## 🔒 Security

- **JWT**: Secure authentication
- **CORS**: Cross-origin resource sharing
- **Input Validation**: Zod schemas
- **XSS Protection**: Content Security Policy

## 📄 License

MIT License - see LICENSE file for details.
