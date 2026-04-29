# 📊 RepoVitals

<div align="center">

**GitHub Repository Health Intelligence Platform**

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16.0-000000?logo=next.js)](https://nextjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.0-47A248?logo=mongodb)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Jest](https://img.shields.io/badge/Jest-30.0-C21325?logo=jest)](https://jestjs.io/)
[![Cypress](https://img.shields.io/badge/Cypress-15.0-17202C?logo=cypress)](https://www.cypress.io/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Testing](#testing)

---

## 🎯 Overview

**RepoVitals** is a comprehensive GitHub repository health analysis platform that provides deep insights into open-source project quality, community engagement, and maintainability. Unlike basic metrics tools, RepoVitals aggregates multiple data points into actionable health scores.

### Why RepoVitals?

| Traditional Metrics     | RepoVitals                   |
| ----------------------- | ---------------------------- |
| ❌ Just stars and forks | ✅ Multi-dimensional scoring |
| ❌ No trend analysis    | ✅ Week-over-week trends     |
| ❌ Manual evaluation    | ✅ Automated health scores   |
| ❌ Scattered data       | ✅ Unified dashboard         |

---

## ✨ Features

### Core Metrics

| Category                 | Metrics                                                                       |
| ------------------------ | ----------------------------------------------------------------------------- |
| **Project Vitality**     | Commit frequency, Issue resolution velocity, PR merge time, Recent activity   |
| **Community Engagement** | Star growth trends, Fork distribution, Contributor activity, Social proof     |
| **Code Health**          | License compliance, Documentation quality, Topic coverage, Language diversity |

### Technical Capabilities

- 🔐 **Complete Authentication** — Better Auth integration with session management
- 📊 **Interactive Visualizations** — Real-time charts and donut metrics
- 🎯 **Smart Validation** — Zod-powered form validation
- 📱 **Responsive Design** — Tailwind CSS with dark mode support
- 🧪 **Comprehensive Testing** — 84% coverage with Jest + Cypress

---

## 🛠️ Tech Stack

### Frontend

| Technology   | Purpose                         |
| ------------ | ------------------------------- |
| Next.js 16   | React framework with App Router |
| TypeScript 5 | Type safety                     |
| Tailwind CSS | Utility-first styling           |
| shadcn/ui    | Component library               |
| Recharts     | Data visualization              |

### Backend

| Technology         | Purpose              |
| ------------------ | -------------------- |
| Next.js API Routes | Serverless endpoints |
| MongoDB Atlas      | Database             |
| Better Auth        | Authentication       |
| Zod                | Schema validation    |

### Testing & Quality

| Technology        | Purpose                |
| ----------------- | ---------------------- |
| Jest + RTL        | Unit/integration tests |
| Cypress           | E2E testing            |
| ESLint + Prettier | Code quality           |

---

### Environment Variables

```env

MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your_secret_key
NEXT_PUBLIC_APP_URL=http://localhost:3000

```

---

### Installation

```bash
# Clone repository
git clone https://github.com/arash-jj/repovitals.git
cd repovitals

# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

---

### Testing

```bash
# Run unit/integration tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage

# E2E tests
npm run test:e2e

# Open Cypress UI
npm run test:e2e:open
```

---

### Deployment and Live demo

Due to the nationwide Iranian internet outage and lack of free access to the international internet due to whistling, Deployment and Live deme have been postponed.
