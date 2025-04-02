# Deploying FarmFolio to Vercel

This guide will walk you through deploying both the frontend and backend of FarmFolio to Vercel.

## Prerequisites

1. A [Vercel](https://vercel.com) account
2. [Git](https://git-scm.com/) installed
3. [Node.js](https://nodejs.org/) installed (v14 or higher)
4. [Vercel CLI](https://vercel.com/docs/cli) (optional for command-line deployment)

## Step 1: Deploy the Backend API

### Option 1: Deploy using the Vercel Dashboard

1. Push your repository to GitHub, GitLab, or Bitbucket
2. Log in to your Vercel account
3. Click "Add New" → "Project"
4. Import your repository
5. Configure the project:
   - Root Directory: `backend`
   - Framework Preset: `Other`
   - Build Command: `npm install`
   - Output Directory: Leave blank
   - Install Command: `npm install`
6. Add environment variables from your `backend/.env.production` file:
   - `PORT`: 5000
   - `NODE_ENV`: production
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Your JWT secret key
7. Click "Deploy"

### Option 2: Deploy using the Vercel CLI

1. Install the Vercel CLI if you haven't already:
   ```bash
   npm install -g vercel
   ```

2. Navigate to your backend directory:
   ```bash
   cd backend
   ```

3. Run the deployment command:
   ```bash
   vercel
   ```

4. Follow the prompts:
   - Set up and deploy: Yes
   - Which scope: Select your account
   - Link to existing project: No
   - Project name: farmfolio-api (or your preferred name)
   - Root directory: ./ (current directory)
   - Override settings: Yes
   - Build Command: npm install
   - Output Directory: ./
   - Development Command: npm run dev

5. Vercel will deploy your backend and provide you with a URL (e.g., `https://farmfolio-api.vercel.app`)

6. Set up environment variables:
   ```bash
   vercel env add PORT 5000
   vercel env add NODE_ENV production
   vercel env add MONGODB_URI "your_mongodb_connection_string"
   vercel env add JWT_SECRET "your_jwt_secret"
   ```

7. Redeploy to apply the environment variables:
   ```bash
   vercel --prod
   ```

## Step 2: Update Frontend API URL

1. Update your `.env.production` file with the URL of your deployed backend API:
   ```
   REACT_APP_API_URL=https://your-backend-url.vercel.app/api
   ```

## Step 3: Deploy the Frontend

### Option 1: Deploy using the Vercel Dashboard

1. Log in to your Vercel account
2. Click "Add New" → "Project"
3. Import your repository
4. Configure the project:
   - Root Directory: Leave as default (project root)
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Add environment variables from your `.env.production` file:
   - `REACT_APP_API_URL`: Your backend API URL
6. Click "Deploy"

### Option 2: Deploy using the Vercel CLI

1. Navigate to your project root directory:
   ```bash
   cd /path/to/farmfolio
   ```

2. Run the deployment command:
   ```bash
   vercel
   ```

3. Follow the prompts:
   - Set up and deploy: Yes
   - Which scope: Select your account
   - Link to existing project: No
   - Project name: farmfolio (or your preferred name)
   - Root directory: ./ (current directory)
   - Override settings: Yes
   - Build Command: npm run build
   - Output Directory: dist
   - Development Command: npm run dev

4. Vercel will deploy your frontend and provide you with a URL (e.g., `https://farmfolio.vercel.app`)

5. Set up environment variables:
   ```bash
   vercel env add REACT_APP_API_URL "https://your-backend-url.vercel.app/api"
   ```

6. Redeploy to apply the environment variables:
   ```bash
   vercel --prod
   ```

## Step 4: Set Up Continuous Deployment (Optional)

1. In your Vercel dashboard, select your project
2. Go to "Settings" → "Git"
3. Make sure "Production Branch" is set to your main branch (e.g., `main` or `master`)
4. Any push to this branch will automatically trigger a new deployment

## Step 5: Configure Custom Domain (Optional)

1. In your Vercel dashboard, select your project
2. Go to "Settings" → "Domains"
3. Add your domain and follow the instructions to set up DNS records

## Troubleshooting

### CORS Issues
If you encounter CORS issues:

1. In your backend code, update the CORS configuration to allow your frontend domain:
   ```javascript
   app.use(cors({
     origin: ['https://your-frontend-url.vercel.app', 'http://localhost:5173'],
     credentials: true
   }));
   ```

2. Redeploy your backend

### Environment Variables Not Working
If environment variables aren't being recognized:

1. Ensure they are added correctly in the Vercel dashboard
2. For the frontend, make sure they start with `REACT_APP_` or use Vite's `VITE_` prefix
3. Redeploy after making changes

### Build Failures
If your build fails:

1. Check the build logs in the Vercel dashboard
2. Ensure all dependencies are properly installed
3. Check for TypeScript errors and fix them or adjust the build configuration
4. For the backend, make sure your entry point is correctly specified in `vercel.json`

## Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vite.dev/guide/static-deploy.html#vercel)
- [Vercel CLI Commands](https://vercel.com/docs/cli/overview) 