# vabook — Business Portal

<div align="center">

![vabook](https://img.shields.io/badge/Lunchbox%20Legends-Business%20Portal-orange?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTAgMThjLTQuNDEgMC04LTMuNTktOC04czMuNTktOCA4LTggOCAzLjU5IDggOC0zLjU5IDgtOCA4eiIvPjwvc3ZnPg==)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-vabook.netlify.app-FF6B35?style=flat-square)](https://vabook.netlify.app/)
[![Landing Page](https://img.shields.io/badge/Landing%20Page-lunchboxlegends.netlify.app-orange?style=flat-square)](https://lunchboxlegends.netlify.app/)

**A powerful multi-tenant SaaS platform for food delivery & meal subscription management.**

[🌐 Live Portal](https://vabook.netlify.app/) · [📱 Landing Page](https://lunchboxlegends.netlify.app/) · [📖 Docs](#installation) · [🐛 Report Bug](https://github.com/ajardeen/lbl_business_portal/issues)

</div>

---
<div align="center">

### Preview Showcase [WEBLINK👈](https://ajardeen.netlify.app/project/lunchbox-legends)

⭐ **Make Sure Check it out!** ⭐

</div>

---

## 📋 Table of Contents

- [About the Project](#-about-the-project)
- [Platform Architecture](#-platform-architecture)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Repositories](#-repositories)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Usage](#-usage)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🍱 About the Project

**Lunchbox Legends** is a complete B2B2C food delivery & meal subscription SaaS platform. Businesses register and create their own branded organization (like *Lunchbox Legends*), then manage their entire meal subscription operation — from building menu items to tracking live deliveries.

Customers subscribe to Monthly or weekly meal plans (Monday–Friday, 5 meals/week, 10 meals/2-week cycle) and receive freshly prepared meals at their doorstep — all orchestrated through this portal.

> Built for cloud kitchens, meal-prep brands, corporate caterers, and food subscription businesses.

---

## 🏗 Platform Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    LUNCHBOX LEGENDS                     │
│                   SaaS Ecosystem                        │
├──────────────────┬──────────────────┬───────────────────┤
│  Business Portal │  Customer App    │   Kitchen Screen  │
│  (vabook.netlify)│  (Mobile)        │   (WebSocket)     │
│  React + Vite    │  React Native    │   Live Orders     │
├──────────────────┴──────────────────┴───────────────────┤
│                    VABook Backend                       │
│              Node.js REST API + WebSocket               │
├─────────────────────────────────────────────────────────┤
│                    Database Layer                       │
│                 MongoDB / Firebase                      │
└─────────────────────────────────────────────────────────┘
```

---

## ✨ Features

### 🏢 Organization Management
- Register your brand as an independent organization
- Custom branding, logo, and business profile
- Multi- role-based access control

### 🍽 Menu Master System
```
Items → Menus → Bundles → Publish
```
- **Items**: Create individual food items with pricing, sku & nutrition info
- **Menus**: Group items into daily/weekly menus or monday or tuesday lunch menus
- **Bundles**: Package menus into subscription plans (5-day / 10-meal cycles)
- **Publish**: Make bundles live for customers to purchase

### 📅 Meal Subscription Engine
- Weekly subscription cycles (Mon–Fri, 5 meals/week)
- 10-meal fortnightly bundles
- Customer self-service portal via mobile app
- Auto-renewal & pause/cancel support coming soon..

### 👨‍🍳 Staff & Kitchen Management
- Create and manage chef accounts
- **Kitchen Screen** (WebSocket-powered): Live order queue for kitchen staff
- Real-time order status updates (Received → Preparing → Ready → Dispatched)

### 🛵 Delivery & Rider System
- Create rider accounts with delivery zones
- **Delivery Assistant App**: GPS-guided delivery workflow
- Live tracking from kitchen to customer door
- Proof of delivery & signature capture

### 📊 Analytics Dashboard (under development)
- Daily/weekly order volumes
- Revenue tracking per bundle/menu
- Delivery performance metrics
- Customer retention & churn analytics

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend Framework | React 18 + Vite 5 |
| UI Components | Tailwind CSS + shadcn/ui |
| State Management | Zustand / React Context |
| Real-time | WebSocket (Socket.io) |
| HTTP Client | Axios |
| Mobile App | React Native (Expo) |
| Backend | Node.js + Express |
| Database | MongoDB + Mongoose |
| Authentication | JWT + Refresh Tokens |
| File Storage | server |
| Hosting | Netlify (Frontend) | 
| Hosting | Render (Backend) |


---

## 📦 Repositories

| Repository | Description | Link |
|---|---|---|
| `lbl_business_portal` | Business portal frontend (Vite + React) | [GitHub](https://github.com/ajardeen/lbl_business_portal) |
| `LunchBox` | Marketing landing page | [GitHub](https://github.com/ajardeen/LunchBox) |
| `LunchboxLegendsMobile` | Customer mobile app (React Native) | [GitHub](https://github.com/ajardeen/LunchboxLegendsMobile) |
| `vabook_backend` | REST API + WebSocket backend | [GitHub](https://github.com/ajardeen/vabook_backend) |

---

## 🚀 Installation

### Prerequisites

Make sure you have the following installed:

- **Node.js** `>= 18.0.0`
- **npm** `>= 9.0.0` or **yarn** `>= 1.22`
- **Git**

---

### 1. Clone the Business Portal

```bash
git clone https://github.com/ajardeen/lbl_business_portal.git
cd lbl_business_portal
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Set Up Environment Variables


```bash
cp .env
```

Edit `.env` with your configuration (see [Environment Variables](#-environment-variables) below).

### 4. Start Development Server

```bash
npm run dev
```

The portal will be running at `http://localhost:5173`

### 5. Build for Production

```bash
npm run build
npm run preview   # Preview the production build locally
```

---

### Setting Up the Backend

```bash
# Clone the backend
git clone https://github.com/ajardeen/vabook_backend.git
cd vabook_backend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Start the backend server
npm run dev       # Development (with nodemon)
npm start         # Production
```

---

### Setting Up the Mobile App

```bash
# Clone the mobile app
git clone https://github.com/ajardeen/LunchboxLegendsMobile.git
cd LunchboxLegendsMobile

# Install dependencies
npm install

# Install Expo CLI globally
npm install -g expo-cli

# Start the Expo development server
npx expo start
```

Scan the QR code with the **Expo Go** app on your phone, or press `i` for iOS simulator / `a` for Android emulator.

---

### Setting Up the Landing Page

```bash
git clone https://github.com/ajardeen/LunchBox.git
cd LunchBox

npm install
npm run dev
```

---

## 🔧 Environment Variables

### Business Portal (`lbl_business_portal`)

Create a `.env` file in the root of the project:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_APP_ID=

VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_MEASUREMENT_ID=

# backend url
VITE_API_URL=http://localhost:3000/api
VITE_SOCKET_URL=http://localhost:3000
```

### Backend (`vabook_backend`)

```env
PORT=3000
MONGO_URI=
JWT_SECRET=
JWT_EXPIRE="1d"

#  node mailer 
MAIL_HOST=
MAIL_PORT= 
MAIL_USER=
MAIL_PASS=
MAIL_FROM=

```

---

## 📖 Usage

### First-Time Setup Flow

```
1. Register your business account
        ↓
2. Create your Organization (brand name, logo, details)
        ↓
3. Add Items (food items with pricing )
        ↓
4. Create Menus (group items into daily menus)
        ↓
5. Build Bundles (weekly/fortnightly subscription packages)
        ↓
6. Publish Bundles → Customers can now subscribe!
        ↓
7. Create Staff → Assign Chef & Rider roles
        ↓
8. Kitchen Screen goes live with WebSocket order tracking
```

### Subscription Cycle

| Week | Mon | Tue | Wed | Thu | Fri |
|------|-----|-----|-----|-----|-----|
| Week 1 | Meal 1 | Meal 2 | Meal 3 | Meal 4 | Meal 5 |
| Week 2 | Meal 6 | Meal 7 | Meal 8 | Meal 9 | Meal 10 |

Customers subscribe to a **10-meal bundle** delivered over 2 weeks, Monday through Friday.

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. **Fork** the repository
2. **Create** your feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add some amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

Please follow our [Code of Conduct](CODE_OF_CONDUCT.md) and make sure your PR includes:
- A clear description of the changes
- Screenshots (for UI changes)
- Updated tests if applicable

### Reporting Bugs

Found a bug? [Open an issue](https://github.com/ajardeen/lbl_business_portal/issues/new) with:
- Steps to reproduce
- Expected vs actual behavior
- Screenshots/console errors

---



## 🙌 Acknowledgements

- [React](https://reactjs.org/) — UI library
- [Shadcn/ui](https://ui.shadcn.com/) — UI library
- [Vite](https://vitejs.dev/) — Lightning-fast build tool
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS
- [Socket.io](https://socket.io/) — Real-time WebSocket communication
- [Cloudinary](https://cloudinary.com/) — Image & media management
- [Netlify](https://netlify.com/) — Hosting & deployment
- [Render](https://dashboard.render.com/) — Backend Hosting & deployment

---

<div align="center">

Made with ❤️ by [Ajardeen](https://github.com/ajardeen)

⭐ **Star this repo if you found it helpful!** ⭐

</div>