# Hospital Queue Management System

A modern web application for managing hospital queues with AI-powered symptom triage.

## Features

- Role-based authentication (Patient, Help Desk Staff, Doctor)
- Real-time queue management
- AI-powered symptom assessment
- Live queue status updates
- Patient triage summaries
- Room assignment and doctor allocation

## Tech Stack

- Frontend:
  - React with TypeScript
  - TailwindCSS for styling
  - React Router for navigation
  - Axios for API calls

- Backend:
  - Node.js + Express.js
  - MongoDB for database
  - JWT for authentication
  - RESTful API architecture

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local instance or MongoDB Atlas)
- npm or yarn package manager

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd hospital-queue
   ```

2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Update the MongoDB URI and JWT secret
   ```bash
   cp .env.example .env
   ```

4. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

5. Set up frontend environment:
   - Create `.env` file in the frontend directory
   ```bash
   REACT_APP_API_URL=http://localhost:5000
   ```

## Running the Application

1. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```

2. Start the frontend development server:
   ```bash
   cd frontend
   npm start
   ```

3. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## API Documentation

### Authentication Endpoints

- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - User login

### Queue Management

- GET `/api/queue/status` - Get current queue status (Patient)
- POST `/api/queue/request` - Request queue entry (Patient)
- GET `/api/queue/pending` - Get pending requests (Help Desk)
- PUT `/api/queue/:queueId/process` - Approve/reject request (Help Desk)
- GET `/api/queue/doctor-queue` - Get doctor's queue (Doctor)

### Triage System

- POST `/api/triage/start/:queueId` - Start triage session
- POST `/api/triage/respond/:queueId` - Submit symptom response
- GET `/api/triage/summary/:queueId` - Get triage summary

## User Roles and Permissions

### Patient
- Can register/login
- Request queue entry
- Complete symptom triage
- View queue status and position

### Help Desk Staff
- Can login
- View pending queue requests
- Approve/reject requests
- Assign rooms and doctors

### Doctor
- Can login
- View assigned patients
- Access patient triage summaries
- Update patient status

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 