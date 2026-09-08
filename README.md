# 🌹 Rose App

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?logo=tailwind-css)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?logo=vercel)

A modern, multilingual e-commerce platform for flowers and gifts, built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**.

## 🔗 Live Demo

https://rose-app-blond.vercel.app/

## ✨ Features

### 🛍️ Customer Storefront

* User registration and login
* Forgot password, OTP verification, and password reset
* Arabic & English with full RTL support
* Product browsing, search, filtering, and pagination
* Filters by category, occasion, rating, and price
* Product details with reviews, ratings, and related products
* Shopping cart with quantity management
* Guest cart with automatic merge after login
* Wishlist
* Checkout and order placement
* Location selection using Leaflet maps
* Cash on Delivery and Stripe credit card payments
* Profile, addresses, password, and order history management
* Notifications
* Responsive design with dark mode

### 🛠️ Admin Dashboard

* Protected admin-only routes
* Dashboard overview and statistics
* Revenue, orders, products, and category analytics
* Interactive charts using Recharts
* Product CRUD operations
* Category and occasion management
* Order management and status updates
* Admin profile and password management

## 🧰 Tech Stack

* **Next.js 14** — App Router
* **React 18**
* **TypeScript**
* **Tailwind CSS**
* **shadcn/ui & Radix UI**
* **TanStack React Query**
* **React Hook Form & Zod**
* **NextAuth.js**
* **next-intl**
* **Framer Motion**
* **Recharts**
* **React Leaflet**
* **Embla Carousel**
* **Sonner**
* **Stripe**
* **REST API**
* **Vercel**

## 🏗️ Architecture

The application follows a modular Next.js architecture using the App Router, reusable components, custom hooks, server actions, API utilities, authentication, and middleware-based route protection.

## 📁 Project Structure

```text
src/
├── app/              # Application routes and pages
├── components/       # Reusable UI components
├── hooks/            # Custom React hooks
├── lib/              # API helpers, server actions, schemas & utilities
├── i18n/             # Internationalization configuration
├── auth.ts           # NextAuth configuration
└── middleware.ts     # Authentication & route protection

public/               # Static assets and images
next.config.mjs       # Next.js configuration
```

## 🚀 Getting Started

### Prerequisites

* Node.js 20.x or later
* Yarn

### 1. Clone the repository

```bash
git clone https://github.com/abdalla-mazen/rose-app.git
cd rose-app
```

### 2. Install dependencies

```bash
yarn install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
API="https://flower.elevateegy.com/api/v1"
NEXT_PUBLIC_API="https://flower.elevateegy.com/api/v1"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Available Scripts

```bash
yarn dev
yarn build
yarn start
yarn lint
```

## ☁️ Deployment

The application is deployed on Vercel.

Live application:

https://rose-app-blond.vercel.app/

## 💡 Project Highlights

* Fully responsive e-commerce experience
* Arabic & English internationalization
* RTL support
* Secure authentication and protected routes
* Guest cart and cart synchronization
* Stripe payment integration
* Admin dashboard with analytics
* Modern component-based architecture
* Server and client-side rendering with Next.js
