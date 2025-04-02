# Setting Up Environment Variables in Vercel

To keep your secrets secure, you should store all environment variables directly in Vercel rather than including them in your repository.

## Backend Environment Variables

1. Go to your Vercel dashboard and select your backend project
2. Navigate to Settings > Environment Variables
3. Add the following environment variables:
   - `PORT`: 5000
   - `NODE_ENV`: production
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: Generate a strong random string (you can use a tool like [RandomKeygen](https://randomkeygen.com/))

## Frontend Environment Variables

1. Go to your Vercel dashboard and select your frontend project
2. Navigate to Settings > Environment Variables
3. Add the following environment variables:
   - `REACT_APP_API_URL`: The URL of your backend API (e.g., https://farmfolio-api.vercel.app/api)

## Redeploying with Environment Variables

After setting up the environment variables:

1. For the backend:
   ```bash
   cd backend
   vercel --prod
   ```

2. For the frontend:
   ```bash
   vercel --prod
   ```

Alternatively, you can trigger a new deployment from the Vercel dashboard by clicking "Redeploy" on your project page.

## Security Best Practices

1. Never commit actual secrets to your repository
2. Regularly rotate your JWT secret and database credentials
3. Use different environment variables for development and production
4. Consider using Vercel's integration with environment variable management tools like Doppler or Vault for more advanced setups 