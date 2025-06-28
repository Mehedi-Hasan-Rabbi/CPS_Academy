# CPS Academy - Learning Platform

This repository contains the complete codebase for **CPS Academy**, a learning platform consisting of a **Next.js frontend** and a **Strapi v5 backend**. It provides functionalities for user authentication, course browsing (with role-based access), and password management.

---

## 📚 Table of Contents

- [Project Overview](#1-project-overview)
- [Features Implemented](#2-features-implemented)
- [Installation and Setup](#3-installation-and-setup)
  - [Prerequisites](#prerequisites)
  - [Repository Structure](#repository-structure)
  - [Frontend (cps-academy-frontend) Setup](#frontend-cps-academy-frontend-setup)
  - [Backend (cps-academy-backend) Setup](#backend-cps-academy-backend-setup)
- [Brief Feature Documentation](#4-brief-feature-documentation)
  - [Authentication](#authentication-login-registration-logout)
  - [Password Management](#password-management-forgot-password-reset-password)
  - [Role-Based Content Access](#role-based-content-access)
- [Dependencies and Versions](#5-dependencies-and-versions)
- [Environment Configuration Example](#6-environment-configuration-example-envexample)

---

## 1. Project Overview

The **CPS Academy** project aims to provide an online learning platform where users can register, log in, and access course content.

### Structure:

- **`cps-academy-frontend/`** – Next.js application (user interface).
- **`cps-academy-backend/`** – Strapi v5 CMS (backend + APIs).

---

## 2. Features Implemented

### ✅ User Authentication:
- **Register**: New users can create accounts.
- **Login**: Existing users authenticate.
- **Logout**: Users can securely log out.

### 🔐 Password Management:
- **Forgot Password**: Sends reset link via email.
- **Reset Password**: Users can set a new password using the link.

### 🔓 Role-Based Content Access:
- Course modules are rendered based on user roles like:
  - `Student`
  - `Social Media Manager / Developer`
  - Public users see a prompt to log in or contact admin.

---

## 3. Installation and Setup

### Prerequisites

Ensure the following are installed:

- **Node.js**: v18.x or higher
- **npm** or **yarn**

---

### Repository Structure
# cps-academy
├── cps-academy-backend/ # Strapi v5 backend

└── cps-academy-frontend/ # Next.js frontend


Each part must be set up and run **independently**.

---

### Frontend (`cps-academy-frontend`) Setup

```bash
cd cps-academy-frontend
npm install # or yarn install
```

Create a `.env.local` file based on the example in the Environment Configuration.

Then, start the frontend:
```bash
npm run dev # or yarn dev
```

`The app will be accessible at http://localhost:3000.`

### Frontend (`cps-academy-backend`) Setup
```bash
cd cps-academy-backend
npm install # or yarn install
```
Configure Email Provider:
```bash
npm install @strapi/provider-email-nodemailer
# or
yarn add @strapi/provider-email-nodemailer

```
Ensure `./config/plugins.js` is configured for Nodemailer.

Create a `.env` file using the example from Environment Configuration.

Important (Gmail SMTP): Use Google App Password for SMTP_PASSWORD.

Start Strapi:

```bash
npm run develop # or yarn develop
Strapi Admin: http://localhost:1337/admin
```

## Configure Strapi for Password Reset:
- Log in to Strapi Admin.
- Go to Settings > Users & Permissions Plugin > Roles > Public:
- Enable forgot-password and reset-password under Auth.
- Go to Settings > Users & Permissions Plugin > Advanced Settings:
- Set Reset password page to: http://localhost:3000/reset-password
- (Optional) Send a test email from Settings > Email.

## 4. Brief Feature Documentation

### Authentication (Login, Registration, Logout)

#### Registration (`/register`)
- Stores JWT & user data in cookies
- Redirects after successful signup
- **Key Files**:
  - `src/app/register/page.js`
  - `src/lib/auth.js`

#### Login (`/login`)
- Authenticates user credentials
- Redirects to homepage after successful login
- **Key Files**:
  - `src/app/login/page.js`
  - `src/lib/auth.js`

#### Logout
- Clears session cookies
- Redirects to login page
- **Key Files**:
  - `src/app/auth-context.js`
  - `src/lib/auth.js`

## Password Management (Forgot Password, Reset Password)

### Forgot Password (`/forgot-password`)
- Sends email with reset token
- **Key Files**:
  - `src/app/forgot-password/page.js`
  - `src/lib/auth.js`

### Reset Password (`/reset-password?code=...`)
- Accepts token from URL query parameters
- Allows setting new password
- **Key Files**:
  - `src/app/reset-password/page.js`
  - `src/lib/auth.js`

## Role-Based Content Access
- Uses `useAuth()` hook from context
- Conditionally renders content based on `user.role.name`
- **Key File**:
  - `src/app/course/[slug]/CourseDetailContent.jsx`

## 5. Dependencies and Versions

### Frontend (`cps-academy-frontend/package.json`)

| Package                     | Version  |
|-----------------------------|----------|
| next                        | ^14.x    |
| react                       | ^18.x    |
| react-dom                   | ^18.x    |
| js-cookie                   | ^3.x     |
| tailwindcss                 | ^3.x     |
| postcss                     | ^8.x     |
| autoprefixer                | ^10.x    |
| @strapi/blocks-react-renderer | ^1.x     |

## Backend (`cps-academy-backend/package.json`)

| Plugin / Package                     | Version  |
|--------------------------------------|----------|
| @strapi/strapi                       | ^5.x     |
| @strapi/plugin-users-permissions     | ^5.x     |
| @strapi/plugin-i18n                  | ^5.x     |
| @strapi/provider-email-nodemailer    | ^5.x     |
| sqlite3                              | ^5.x     |

---

## 6. Environment Configuration Example (.env.example)

**Important Security Note**:  
⚠️ Never commit actual `.env` files to version control. Always use `.env.example` as a template.

### Frontend (`cps-academy-frontend/.env.local`)
```bash
# NEXT.js Frontend Environment Variables
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337/api
```

### Backend (`cps-academy-backend/.env`)
```bash
# STRAPI Backend Environment Variables

# Database Configuration
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db

# Strapi Application Keys
APP_KEYS="YOUR_APP_KEY_1,YOUR_APP_KEY_2,YOUR_APP_KEY_3"
ADMIN_JWT_SECRET="YOUR_ADMIN_JWT_SECRET"
TRANSFER_TOKEN_SALT="YOUR_TRANSFER_TOKEN_SALT"
API_TOKEN_SALT="YOUR_API_TOKEN_SALT"

# Server Configuration
HOST=0.0.0.0
PORT=1337

# Email Provider Configuration (Nodemailer with Gmail)
EMAIL_PROVIDER=nodemailer
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USERNAME="your_gmail_address@gmail.com"
SMTP_PASSWORD="your_generated_app_password"
SMTP_FROM_EMAIL="noreply@yourdomain.com"
SMTP_REPLY_TO_EMAIL="support@yourdomain.com"

# Frontend Reset Password URL
FRONTEND_URL=http://localhost:3000
```