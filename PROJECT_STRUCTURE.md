# KeyCommerce Project Structure

## Overview

This document outlines the restructured KeyCommerce e-commerce platform, organized for scalability, maintainability, and developer experience.

## 📁 Directory Structure

```
src/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication routes (grouped)
│   │   ├── login/
│   │   ├── register/
│   │   └── forgot-password/
│   ├── (dashboard)/              # Admin & Seller dashboards (grouped)
│   │   ├── admin/
│   │   └── seller/
│   ├── (shop)/                   # Public shop routes (grouped)
│   │   ├── page.tsx             # Shop homepage
│   │   ├── products/
│   │   ├── categories/
│   │   ├── cart/
│   │   └── profile/
│   ├── api/                      # API routes
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Root page (redirects to shop)
├── components/                   # Reusable UI components
│   ├── ui/                      # Base UI components (shadcn/ui)
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   └── ...                  # All shadcn/ui components
│   ├── forms/                   # Form-specific components
│   │   ├── login-form.tsx
│   │   ├── register-form.tsx
│   │   ├── forgot-password-form.tsx
│   │   └── address-form.tsx
│   ├── layout/                  # Layout components
│   │   ├── navbar.tsx
│   │   ├── footer.tsx
│   │   └── sidebar.tsx
│   └── features/                # Feature-specific components
│       ├── product-card.tsx
│       ├── product-gallery.tsx
│       ├── product-info.tsx
│       ├── cart-item-card.tsx
│       ├── cart-content.tsx
│       ├── profile-addresses.tsx
│       └── ...                  # Other feature components
├── lib/                         # Utility libraries
│   ├── utils.ts                 # General utility functions
│   ├── constants.ts             # App constants and enums
│   └── validators.ts            # Zod validation schemas
├── hooks/                       # Custom React hooks
│   ├── useAuth.ts              # Auth hook (legacy)
│   ├── useCart.ts              # Cart hook (legacy)
│   ├── useDebounce.ts          # Debounce utility
│   └── useMobile.ts            # Mobile detection
├── services/                    # API service layer
│   ├── api-client.ts           # Base API client
│   ├── auth.service.ts         # Authentication API
│   ├── product.service.ts      # Product API
│   └── cart.service.ts         # Cart API
├── stores/                      # State management (Zustand)
│   ├── auth.store.ts           # Authentication state
│   ├── cart.store.ts           # Shopping cart state
│   └── ui.store.ts             # UI state (theme, modals, etc.)
├── types/                       # TypeScript type definitions
│   ├── auth.ts                 # Authentication types
│   ├── user.ts                 # User profile types
│   ├── product.ts              # Product-related types
│   ├── cart.ts                 # Cart and order types
│   └── order.ts                # Order management types
├── config/                      # Configuration files
│   ├── index.ts                # Main config exports
│   ├── env.development.ts      # Development environment
│   └── env.production.ts       # Production environment
└── providers/                   # React providers
    └── theme-provider.tsx      # Theme provider (next-themes)
```

## 🔄 Migration Summary

### What Changed

1. **State Management**: Migrated from React Context to Zustand stores

   - `src/context/` → `src/stores/`
   - Better performance, simpler API, built-in persistence

2. **Type Organization**: Consolidated types

   - `src/interfaces/` → `src/types/`
   - Better organization and naming

3. **Configuration**: Centralized config

   - `src/env/` → `src/config/`
   - Single source of truth for app configuration

4. **Component Organization**: Better feature grouping

   - Auth components → `src/components/forms/`
   - Feature components → `src/components/features/`
   - Layout components → `src/components/layout/`

5. **API Layer**: Improved API client
   - Better error handling
   - Type-safe responses
   - Centralized configuration

### Benefits of New Structure

#### 🚀 Performance

- **Zustand stores**: More efficient than Context API
- **Selectors**: Granular re-renders
- **Persistence**: Built-in localStorage sync

#### 🛠️ Developer Experience

- **Type safety**: Full TypeScript coverage
- **Better organization**: Logical grouping
- **Consistent patterns**: Standardized file structure
- **Easy testing**: Isolated stores and components

#### 📈 Scalability

- **Modular architecture**: Easy to add new features
- **Feature-based organization**: Related code together
- **Clear separation**: UI, business logic, data layer

#### 🔧 Maintainability

- **Single responsibility**: Each file has one purpose
- **Consistent naming**: Predictable file locations
- **Documentation**: Clear structure documentation

## 🎯 Key Features

### State Management (Zustand)

```typescript
// Auth store
const { user, login, logout } = useAuthStore();

// Cart store
const { items, addItem, removeItem } = useCartStore();

// UI store
const { theme, setTheme, sidebarOpen } = useUIStore();
```

### API Layer

```typescript
// Type-safe API calls
const response = await api.products.list({ category: "clothing" });
const product = await api.products.detail("product-id");
```

### Component Organization

```typescript
// Base UI components
import { Button } from "@/components/ui/button";

// Form components
import { LoginForm } from "@/components/forms/login-form";

// Feature components
import { ProductCard } from "@/components/features/product-card";
```

## 🧪 Testing Strategy

### Unit Tests

- **Stores**: Test state changes and actions
- **Utils**: Test utility functions
- **Components**: Test component logic

### Integration Tests

- **API**: Test API client and services
- **Forms**: Test form validation and submission
- **Navigation**: Test routing and navigation

### E2E Tests

- **User flows**: Complete user journeys
- **Critical paths**: Checkout, authentication
- **Cross-browser**: Multiple browser testing

## 🚀 Development Workflow

### Adding New Features

1. **Define types** in `src/types/`
2. **Create API service** in `src/services/`
3. **Add store actions** in `src/stores/`
4. **Build components** in `src/components/features/`
5. **Add routes** in `src/app/`

### Code Organization Rules

- **One file, one purpose**: Each file has a single responsibility
- **Feature-based**: Group related functionality together
- **Consistent naming**: Use kebab-case for files, camelCase for exports
- **Type safety**: Always define proper TypeScript types

### Best Practices

- **Use stores**: Prefer Zustand over Context for state
- **Type everything**: No `any` types, always define interfaces
- **Error handling**: Proper error boundaries and error states
- **Performance**: Use selectors and memoization
- **Accessibility**: Follow WCAG guidelines

## 📊 Performance Optimizations

### State Management

- **Selective subscriptions**: Only subscribe to needed state
- **Memoization**: Use `useMemo` and `useCallback`
- **Persistence**: Automatic localStorage sync

### Component Optimization

- **Code splitting**: Route-based splitting
- **Lazy loading**: Load components on demand
- **Image optimization**: Next.js Image component

### API Optimization

- **Caching**: Implement proper caching strategies
- **Debouncing**: Debounce search and filter requests
- **Pagination**: Efficient data loading

## 🔒 Security Considerations

### Authentication

- **JWT tokens**: Secure token management
- **Refresh tokens**: Automatic token refresh
- **Role-based access**: Proper authorization

### Data Protection

- **Input validation**: Zod schemas for all inputs
- **XSS prevention**: Proper content sanitization
- **CSRF protection**: Token-based protection

## 📱 Responsive Design

### Mobile-First Approach

- **Breakpoints**: Consistent responsive breakpoints
- **Touch targets**: Proper touch target sizes
- **Performance**: Optimized for mobile devices

### Accessibility

- **WCAG 2.1**: Full accessibility compliance
- **Screen readers**: Proper ARIA labels
- **Keyboard navigation**: Full keyboard support

## 🎨 Design System

### Components

- **shadcn/ui**: Consistent component library
- **Custom components**: Brand-specific components
- **Theme support**: Dark/light mode

### Styling

- **Tailwind CSS**: Utility-first styling
- **CSS variables**: Dynamic theming
- **Consistent spacing**: Design token system

## 📈 Monitoring & Analytics

### Performance Monitoring

- **Core Web Vitals**: Monitor LCP, FID, CLS
- **Error tracking**: Capture and report errors
- **User analytics**: Track user behavior

### Business Metrics

- **Conversion tracking**: Monitor sales funnel
- **User engagement**: Track user interactions
- **A/B testing**: Test different approaches

This restructured project provides a solid foundation for building a scalable, maintainable, and performant e-commerce platform.
