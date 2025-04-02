# FarmFolio - Farm Management System

FarmFolio is a comprehensive farm management application built with the MERN stack (MongoDB, Express, React, Node.js). It helps farmers track crops, manage inventory, analyze data, and maximize productivity.

## Features

- User authentication (email/password and Google)
- Dashboard with farm statistics and visualizations
- Crop management and tracking
- Farm management
- Weather forecasts
- Task management
- Responsive design

## Tech Stack

### Frontend
- React with TypeScript
- Chakra UI for component library
- React Router for navigation
- Recharts for data visualization
- Axios for API requests
- React Google Login for OAuth

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing

## Project Structure

```
farmfolio/
├── src/               # Frontend source code
│   ├── components/    # React components
│   ├── contexts/      # Context providers (Auth, etc.)
│   ├── pages/         # Page components
│   └── ...
├── backend/           # Backend code
│   ├── src/
│   │   ├── controllers/ # API controllers
│   │   ├── models/      # Mongoose models
│   │   ├── routes/      # API routes
│   │   ├── middlewares/ # Custom middlewares
│   │   ├── config/      # Configuration files
│   │   └── server.js    # Express app
│   └── ...
└── ...
```

## Getting Started

### Prerequisites

- Node.js (v14 or above)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/farmfolio.git
   cd farmfolio
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

4. Set up environment variables:
   - Copy `.env.example` to `.env` in the project root
   - Copy `backend/.env.example` to `backend/.env`
   - Update the variables with your configuration

5. Start MongoDB:
   ```bash
   # Using your preferred method (local installation, Docker, etc.)
   ```

### Running the Application

1. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```

2. In a new terminal, start the frontend:
   ```bash
   cd ..  # Go back to project root
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

## Setting up Google OAuth

1. Go to [Google Developer Console](https://console.developers.google.com/)
2. Create a new project
3. Enable Google+ API
4. Configure the OAuth consent screen
5. Create OAuth 2.0 credentials
6. Add the client ID to your `.env` file: `REACT_APP_GOOGLE_CLIENT_ID=your_client_id`

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Chakra UI](https://chakra-ui.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [Recharts](https://recharts.org/)
- [MongoDB](https://www.mongodb.com/)
- [Express](https://expressjs.com/)
- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
