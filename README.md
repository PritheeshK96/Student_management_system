Name : pritheesh kumar v
Intern ID :(CITS2282)

# 🎓 Student Management System — Internship Project 

A full-stack **Student Management System** built as an internship project. The application allows administrators to manage student records with a modern, responsive dashboard interface. It features secure JWT-based authentication, RESTful APIs, and a serverless deployment architecture on Vercel.

---

## ✨ Features

- **Admin Authentication** — Secure login with JWT tokens and bcrypt password hashing
- **Dashboard** — Overview of student statistics at a glance
- **Student CRUD Operations** — Add, view, edit, and delete student records
- **Search & Filter** — Search students by name or register number, filter by department
- **Responsive Design** — Fully responsive UI with sidebar navigation
- **Protected Routes** — Route-level authentication to prevent unauthorized access
- **Auto Admin Seeding** — Default admin account is automatically created on first launch

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **React 19** | UI library |
| **React Router v7** | Client-side routing |
| **Vite 8** | Build tool & dev server |
| **Axios** | HTTP client for API calls |
| **Vanilla CSS** | Custom styling |

### Backend
| Technology | Purpose |
|---|---|
| **Node.js** | Runtime environment |
| **Vercel Serverless Functions** | API endpoints |
| **MongoDB Atlas** | Cloud database |
| **Mongoose** | MongoDB ODM |
| **JWT (jsonwebtoken)** | Authentication tokens |
| **bcryptjs** | Password hashing |

---

## 📁 Project Structure

```
Student_management_system/
├── api/                        # Serverless API functions
│   ├── auth/
│   │   └── login.js            # Admin login endpoint
│   ├── dashboard/
│   │   └── stats.js            # Dashboard statistics endpoint
│   ├── middleware/
│   │   └── authMiddleware.js   # JWT authentication middleware
│   └── students/
│       ├── index.js            # GET all / POST student
│       └── [id].js             # GET / PUT / DELETE student by ID
├── client/                     # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── DashboardCard.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── StudentTable.jsx
│   │   ├── css/                # Component stylesheets
│   │   │   ├── dashboard.css
│   │   │   ├── login.css
│   │   │   ├── navbar.css
│   │   │   └── student.css
│   │   ├── pages/              # Page components
│   │   │   ├── AddStudent.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── EditStudent.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Students.jsx
│   │   ├── App.jsx             # Root component with routing
│   │   ├── index.css           # Global styles
│   │   └── main.jsx            # Entry point
│   └── package.json
├── config/
│   └── db.js                   # MongoDB connection with caching
├── models/
│   ├── Admin.js                # Admin schema
│   └── Student.js              # Student schema
├── vercel.json                 # Vercel deployment config
├── package.json                # Root dependencies
└── .gitignore
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **MongoDB Atlas** account (or a local MongoDB instance)
- **Vercel CLI** (for local API development)

### 1. Clone the Repository

```bash
git clone https://github.com/PritheeshK96/Student_management_system.git
cd Student_management_system
```

### 2. Install Dependencies

```bash
# Install root (backend) dependencies
npm install

# Install client (frontend) dependencies
cd client && npm install && cd ..
```

Or use the shortcut:

```bash
npm run install:all
```

### 3. Environment Variables

Create a `.env` file in the project root:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
PORT=5000
```

### 4. Run the Application

```bash
# Start the backend API (using Vercel CLI)
npm run dev:api

# In a separate terminal, start the frontend
cd client
npm run dev
```

---

## 📡 API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/auth/login` | Admin login | ❌ |
| `GET` | `/api/dashboard/stats` | Get dashboard statistics | ✅ |
| `GET` | `/api/students` | Get all students | ✅ |
| `POST` | `/api/students` | Add a new student | ✅ |
| `GET` | `/api/students/:id` | Get student by ID | ✅ |
| `PUT` | `/api/students/:id` | Update student by ID | ✅ |
| `DELETE` | `/api/students/:id` | Delete student by ID | ✅ |

### Query Parameters (GET `/api/students`)

| Parameter | Description |
|-----------|-------------|
| `search` | Search by student name or register number |
| `department` | Filter by department (`CSE`, `ECE`, `EEE`, `CIVIL`, `MECH`) |

---

## 🗄️ Database Schema

### Student

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `name` | String | ✅ | Student full name |
| `registerNumber` | String | ✅ | Unique register number |
| `department` | String | ✅ | One of: CSE, ECE, EEE, CIVIL, MECH |
| `year` | String | ✅ | Academic year |
| `email` | String | ✅ | Student email (stored lowercase) |
| `phone` | String | ✅ | Contact number |
| `createdAt` | Date | Auto | Timestamp |
| `updatedAt` | Date | Auto | Timestamp |

---

## 🌐 Deployment

This project is configured for deployment on **Vercel**:

1. Push your code to GitHub
2. Import the repository on [vercel.com](https://vercel.com)
3. Add the environment variables in the Vercel dashboard
4. Deploy!

---

## 📝 License

This project was built as part of an internship program.
