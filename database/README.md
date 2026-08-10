# Database Module — Studio Dori

This directory contains the database schema, Prisma ORM configuration, seed scripts, and local SQLite data storage.

## Files
- `prisma/schema.prisma`: Data models for User, Category, Product, ProductImage, ProductVariant, Order, OrderItem, Coupon, Review, JournalPost.
- `seedData.ts`: Database seeding script populating initial categories, products, and admin accounts.
- `dev.db`: Development SQLite database file.

## Data Models
1. **User**: Authentication & roles (`CUSTOMER`, `ADMIN`).
2. **Category**: Craft categories with images and descriptions.
3. **Product**: Full catalog items with prices, tags, stock, and descriptions.
4. **ProductImage**: Primary and hover crossfade gallery images.
5. **ProductVariant**: Sizing & color options.
6. **Order**: E-commerce orders, customer info, status, and payment tracking.
7. **Coupon**: Promotional codes and discount values.
8. **Review**: Star ratings and verified purchase comments.
