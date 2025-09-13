# Authentication System (MERN Fullstack)

This is a full-stack authentication application built using the MERN stack (MongoDB, Express, React, Node.js). It allows users to register, log in securely, and manage sessions with token-based authentication.  

---

## 🚀 Features

- User registration (signup)  
- User login with secure password hashing  
- JWT (JSON Web Token) based authentication & authorization  
- Protected routes (accessible only after login)  
- Frontend UI for login/signup & basic feedback (errors, loading states, etc.)  
- Basic validation (on both frontend and backend)  

---

## 📁 Project Structure

Authentication-System/
│
├── backend/ # Node.js + Express server
│ ├── models/ # Mongoose schemas / user models
│ ├── routes/ # API endpoints (auth, user etc.)
│ ├── middleware/ # Middleware (authentication, error handling)
│ ├── controllers/ # Business logic for routes
│ ├── config/ # Configuration (DB connection, environment variables)
│ └── server.js # Entry point of backend
│
├── frontend/ # React app
│ ├── src/
│ │ ├── components/ # Reusable UI components
│ │ ├── pages/ # Login, Signup, Dashboard etc.
│ │ ├── utils/ # Helper functions (api calls, validation etc.)
│ │ └── App.js # Main component + routing
│ └── public/ # Static files
│
├── .gitignore
├── package.json # (for root if needed) or in each frontend/backend
└── README.md # You’re here

## 🛠 Tech Stack

| Component        | Technology                                                                 |
|------------------|----------------------------------------------------------------------------|
| Frontend         | React, React Router, Axios (or Fetch), CSS or styled-components etc.       |
| Backend          | Node.js, Express                                                            |
| Database         | MongoDB (with Mongoose ORM)                                                |
| Auth / Security  | JWT tokens, bcrypt (or other hashing), environment variables for secrets    |

---

## 🔧 Setup & Installation

### Prerequisites

- Node.js installed (v14 or newer recommended)  
- MongoDB running (local or in cloud, e.g., MongoDB Atlas)  
- npm or yarn  
