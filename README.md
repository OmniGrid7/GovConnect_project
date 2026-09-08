# 🇮🇳 GovConnect Maharashtra

### One Digital Gateway for Maharashtra Government Services

GovConnect Maharashtra is a unified digital platform designed for **Smart India Hackathon (SIH) Problem Statement 129**. The platform aims to bring Maharashtra Government departments, schemes, services, helplines, and digital portals together through a single, user-friendly interface.

Instead of navigating through multiple government websites and portals, citizens can use GovConnect to **discover departments, explore government schemes, access digital services, find important helpline numbers, and get assistance through an integrated AI chatbot**.

---

## 🚀 Live Demo

**Website:**
https://gov-connect-project.vercel.app/

---

## 🎯 Problem Statement

Government services are often distributed across multiple departmental websites and digital portals. This can make it difficult for citizens to:

* Find the correct government department
* Discover relevant schemes and services
* Navigate between different government portals
* Find important helpline numbers
* Understand which service is applicable to them
* Access government information in a convenient way

### Our Solution

GovConnect provides a **centralized discovery and navigation platform** for Maharashtra Government services.

The platform organizes government information into categories such as:

* Government Departments
* Schemes
* Digital Services
* Citizen Services
* Helplines
* Important Government Portals

This creates a single starting point for citizens looking for government services.

---

# ✨ Key Features

## 🏛️ Government Department Directory

Browse Maharashtra Government departments from a centralized directory.

Each department can provide access to:

* Department information
* Related government services
* Schemes
* Official portals
* Relevant resources

---

## 📋 Government Scheme Discovery

GovConnect provides a searchable collection of government schemes.

Citizens can:

* Browse available schemes
* View scheme descriptions
* Open scheme details
* Navigate to relevant official resources
* Discover schemes through categorized listings

Featured schemes are displayed directly on the homepage for easier discovery.

---

## 🔎 Smart Directory Search

The platform includes a directory explorer that allows users to search and browse government resources.

Users can discover services based on:

* Category
* Department
* Scheme
* Service type
* Government portal

---

## ☎️ Emergency & Government Helpline Directory

GovConnect provides a centralized interface for important government and emergency helplines.

Users can browse different types of services and view:

* Service name
* Helpline number
* Description
* Relevant instructions
* Call action

This reduces the need to search across different websites for important contact numbers.

---

## 🤖 AI Chatbot

GovConnect includes an integrated AI chatbot to help users navigate the platform and find relevant information.

The chatbot can serve as a conversational entry point for citizens who may not know:

* Which department they need
* Which scheme they should look for
* Where a particular service is available
* Which government resource is relevant to their problem

The chatbot is integrated through **Chatbase**.

---

## 👤 Citizen Profile

The platform includes user profile functionality where users can manage their information.

The profile system supports:

* User information
* Profile details
* Document upload
* Profile management

---

## 🔐 Authentication

GovConnect provides authentication functionality for users.

The application includes:

* Login interface
* User profile access
* Authentication state
* Protected user functionality
* Logout functionality

Authentication and backend services are integrated with **Supabase**.

---

## 🌐 Multilingual Support

GovConnect is designed with internationalization in mind.

The project uses:

* `i18next`
* `react-i18next`
* `i18next-browser-languagedetector`

This allows the application to support multiple languages and makes the platform more accessible to citizens from different linguistic backgrounds.

---

# 🛠️ Technology Stack

### Frontend

* **Next.js 15**
* **React 19**
* JavaScript
* CSS
* Responsive Web Design

### Backend / Database

* **Supabase**
* Supabase JavaScript Client

### Internationalization

* **i18next**
* **react-i18next**
* **i18next-browser-languagedetector**

### AI

* **Chatbase** for the integrated AI chatbot

### Deployment

* **Vercel**

The project's package configuration currently specifies Next.js 15.5.x, React 19, Supabase JS, and the i18next ecosystem.

---

# 🏗️ Project Architecture

```text
GovConnect_project/
│
├── app/
│   ├── pages and routes
│   ├── layout
│   ├── global styles
│   └── application logic
│
├── components/
│   ├── SiteHeader
│   ├── SiteFooter
│   ├── HeroCarousel
│   ├── DirectoryExplorer
│   ├── DepartmentDirectory
│   ├── PortalCard
│   ├── LanguageProvider
│   ├── LocalizedText
│   └── other reusable components
│
├── data/
│   └── government-related data
│
├── lib/
│   └── directory and application utilities
│
├── locales/
│   └── language / translation resources
│
├── public/
│   └── static assets
│
├── assets/
│   └── design and Figma assets
│
├── supabase/
│   └── Supabase-related configuration
│
├── package.json
├── package-lock.json
└── README.md
```

The current repository contains `app`, `components`, `data`, `lib`, `locales`, `public`, `assets/figma`, and `supabase` directories.

---

# 🖥️ Main User Flow

```text
                    ┌──────────────────┐
                    │    GovConnect    │
                    │     Homepage     │
                    └────────┬─────────┘
                             │
          ┌──────────────────┼──────────────────┐
          │                  │                  │
          ▼                  ▼                  ▼
   Government           Government          Helplines
   Departments           Schemes
          │                  │                  │
          ▼                  ▼                  ▼
      Services          Scheme Details      Contact
          │                  │
          └──────────┬───────┘
                     │
                     ▼
              Official Portal
                     │
                     ▼
                 Citizen
```

---

# 📱 Responsive Design

GovConnect is designed to work across different screen sizes.

### Supported layouts

* 💻 Desktop
* 📱 Mobile
* 📟 Tablet

The interface includes responsive layouts for:

* Navigation
* Department cards
* Scheme cards
* Directory search
* Government service listings
* Profile pages
* Helpline directory
* Footer

---

# 🎨 UI / UX

The interface follows a government-oriented visual design using:

* Maharashtra-inspired blue and orange color palette
* Clear information hierarchy
* Large hero sections
* Card-based service discovery
* Responsive grids
* Accessible navigation
* Mobile-friendly layouts

The homepage contains a hero carousel, directory explorer, department directory, and featured schemes.

---

# 📂 Core Components

Some of the major reusable components include:

| Component             | Purpose                                 |
| --------------------- | --------------------------------------- |
| `SiteHeader`          | Main government navigation              |
| `SiteFooter`          | Footer and resource links               |
| `HeroCarousel`        | Homepage hero section                   |
| `DirectoryExplorer`   | Search and explore government resources |
| `DepartmentDirectory` | Browse government departments           |
| `PortalCard`          | Display schemes/services/portals        |
| `LanguageProvider`    | Application language management         |
| `LocalizedText`       | Render translated content               |

---

# ⚙️ Getting Started

## Prerequisites

Make sure you have installed:

* Node.js
* npm
* Git

Recommended Node.js version:

```text
Node.js 18+
```

---

## 1. Clone the Repository

```bash
git clone https://github.com/OmniGrid7/GovConnect_project.git
```

Move into the project directory:

```bash
cd GovConnect_project
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Configure Environment Variables

Create a `.env.local` file in the project root.

Example:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Add any additional environment variables required by the services configured in your deployment.

> **Never commit API keys, database credentials, service-role keys, or other secrets to GitHub.**

---

## 4. Run the Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

# 📜 Available Scripts

The project currently provides the following npm scripts:

```bash
npm run dev
```

Starts the Next.js development server.

```bash
npm run build
```

Creates a production build.

```bash
npm start
```

Starts the production server.

```bash
npm run lint
```

Runs the project's linting command.

---

# 🔐 Security Considerations

The project should follow standard security practices when deployed:

* Never expose Supabase service-role keys
* Keep sensitive credentials in environment variables
* Use Row Level Security (RLS) where appropriate
* Validate user input
* Restrict database access based on user roles
* Protect authenticated routes
* Avoid storing sensitive personal information unnecessarily
* Use HTTPS in production

---

# ☁️ Deployment

The application can be deployed using platforms that support Next.js.

### Vercel

Typical deployment process:

```bash
npm install
npm run build
```

Then configure the required environment variables in the deployment platform.

The project currently has a live Vercel deployment:

**https://gov-connect-project.vercel.app/**

---

# 🧩 Future Enhancements

The platform can be extended with additional capabilities such as:

### 🤖 AI-Powered Service Discovery

Use AI to understand natural-language citizen queries.

Example:

> "I am a student looking for a scholarship."

The system could identify relevant:

* Schemes
* Departments
* Eligibility criteria
* Application portals

---

### 🗺️ Location-Based Services

Allow citizens to discover services based on:

* District
* Taluka
* City
* PIN code
* Nearby government offices

---

### 🔔 Notifications

Provide notifications for:

* Scheme updates
* Application deadlines
* Service announcements
* Government notifications

---

### 📊 Government Service Analytics

A future administrative dashboard could provide:

* Most searched services
* Popular schemes
* Citizen engagement
* Department-wise usage
* Service discovery statistics

---

### 🔗 Government Portal Integration

Future versions can integrate directly with government APIs and services where officially available.

Possible capabilities:

```text
GovConnect
     │
     ├── Department APIs
     ├── Scheme APIs
     ├── Citizen Services
     ├── Authentication
     ├── Notifications
     └── Government Portals
```

---

# 🏆 Smart India Hackathon

GovConnect was developed as a solution for **Smart India Hackathon Problem Statement 129**, with the objective of creating a unified platform for Maharashtra Government portals and services.

### Project Objective

> **Create a unified digital gateway that makes Maharashtra Government services easier to discover and access.**

---

# 👥 Team

### OmniGrid7

Developed for Smart India Hackathon.

---

# 📄 License

This project currently does not specify a license in the repository.

If this project is intended to be open source, consider adding an appropriate license such as:

```text
MIT License
```

---

# ⭐ Support the Project

If you find GovConnect useful:

* ⭐ Star the repository
* 🐛 Report bugs
* 💡 Suggest improvements
* 🔧 Submit pull requests
* 📢 Share the project

---

## 🔗 Links

**GitHub Repository:**
https://github.com/OmniGrid7/GovConnect_project

**Live Demo:**
https://gov-connect-project.vercel.app/

---

## 🇮🇳 GovConnect

**One platform. Multiple departments. Easier access to government services.**
