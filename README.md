# FarmFolio - Farm Management Platform

FarmFolio is a comprehensive farm management application designed to help farmers track crops, manage resources, and optimize productivity.

## Features

- User authentication (login, register, password reset)
- Farm management
- Crop tracking
- Analytics dashboard
- Responsive design for mobile and desktop

## Tech Stack

- **Frontend**: React, TypeScript, Chakra UI, Vite
- **Backend**: Node.js, Express, MongoDB
- **Authentication**: JWT-based authentication

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

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or Atlas)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/farmfolio.git
   cd farmfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment files:
   ```
   # .env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   ```
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/farmfolio
   JWT_SECRET=your_jwt_secret_key
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

## Deployment to Vercel

### Frontend Deployment

1. Install Vercel CLI (optional):
   ```bash
   npm install -g vercel
   ```

2. Deploy using Vercel CLI:
   ```bash
   vercel
   ```

   Alternatively, deploy through GitHub integration:

3. Push your code to GitHub
4. Go to [Vercel](https://vercel.com) and create an account
5. Click "New Project" and import your GitHub repository
6. Configure the project:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Environment Variables: Add `REACT_APP_API_URL` pointing to your backend

7. Click "Deploy"

### Backend Deployment

For the backend API, you can also use Vercel:

1. Create a `vercel.json` file in your backend directory:
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "src/server.js",
         "use": "@vercel/node"
       }
     ],
     "routes": [
       {
         "src": "/(.*)",
         "dest": "src/server.js"
       }
     ]
   }
   ```

2. Deploy the backend using Vercel CLI:
   ```bash
   cd backend
   vercel
   ```

## Continuous Deployment

For continuous deployment:

1. Connect your GitHub repository to Vercel
2. Configure automatic deployments for the main branch
3. Vercel will automatically deploy when you push changes to GitHub

## License

[MIT](LICENSE)

## Acknowledgments

- [Chakra UI](https://chakra-ui.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [Recharts](https://recharts.org/)
- [MongoDB](https://www.mongodb.com/)
- [Express](https://expressjs.com/)
- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
