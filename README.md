# 💼 Mutual Fund Tracker

A full-stack web application that allows users to **search**, **analyze**, **save**, and **manage mutual funds** in India. Authenticated users can save their favorite funds and view historical NAV data with interactive charts.

---

## 🌐 Live Demo

Frontend: [https://mutual-fund-tracker-3.onrender.com](https://mutual-fund-tracker-3.onrender.com)  
Backend: [https://mutual-fund-tracker-00mp.onrender.com](https://mutual-fund-tracker-00mp.onrender.com)

---

## 🚀 Features

- 🔍 Search mutual funds by name with real-time filtering
- 📊 View detailed NAV history with interactive charts (30-day trend)
- ❤️ Save favorite funds to user profile
- 🗑️ Remove funds from saved list
- 🧑‍💻 Register/Login with email + password
- 🔐 Google OAuth login via `@react-oauth/google`
- 🔄 Responsive UI using Bootstrap
- 🛡️ Protected routes with JWT-based authentication
- ☁️ Persistent storage via MongoDB Atlas

---

## 🛠️ Tech Stack

### Frontend:
- React
- React Router
- Bootstrap 5
- `@react-oauth/google`
- `jwt-decode`
- Charting via Recharts

### Backend:
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Axios (for external mutual fund API)
- CORS, dotenv

---

## 📦 API Used

- [`https://api.mfapi.in`](https://www.mfapi.in)  
  For retrieving mutual fund list, metadata, and NAV history

---

## 🔐 Authentication

- Email/password login with secure password hashing (bcryptjs)
- Google OAuth via [@react-oauth/google](https://www.npmjs.com/package/@react-oauth/google)
- JWT stored in `localStorage`, included in Authorization headers

---

