# GillaX Backend Setup

## Prerequisites
- Node.js (v16+)
- MongoDB (local or MongoDB Atlas)

## Installation
```bash
cd backend
npm install
```

## Environment Setup
Create `.env` file:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/gillax
JWT_SECRET=gillax-jwt-secret-key-2024
```

## Run Locally
```bash
npm run dev
```

## Deploy to Render
1. Create new Web Service on Render
2. Connect GitHub repo
3. Set build command: `cd backend && npm install`
4. Set start command: `cd backend && npm start`
5. Add environment variables in Render dashboard

## API Endpoints
- GET `/api/reviews` - Get approved reviews
- POST `/api/reviews` - Create new review
- DELETE `/api/reviews/:id` - Delete review (admin)
- GET `/api/projects` - Get all projects
- POST `/api/projects` - Create project (admin)
- DELETE `/api/projects/:id` - Delete project (admin)