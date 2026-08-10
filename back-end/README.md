# Back-End Module — Studio Dori

This directory contains the server-side API routes, database access clients, and checkout integration logic.

## Core Services
- `db.ts`: Centralized Prisma client instance with connection pooling.
- `api/auth/register`: User registration endpoint.
- `api/auth/login`: Authentication & session credential verification endpoint.
- `api/products`: GET product catalog filtering & POST admin product creation.
- `api/products/[slug]`: GET single product detail & DELETE product endpoint.
- `api/categories`: GET category listing with product counts.
- `api/orders`: POST place new order & PATCH status update endpoint.
- `api/coupons/validate`: Coupon validation & discount calculation endpoint.
- `api/checkout/razorpay`: Razorpay payment initiation endpoint.
- `api/reviews`: POST product review submission endpoint.
