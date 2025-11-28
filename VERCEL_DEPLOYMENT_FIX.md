# Vercel Deployment Guide

If you are facing a "Mongoose URL Error" or "MONGODB_URI is missing" error when deploying to Vercel, follow these steps:

## 1. Get your MongoDB Connection String
Ensure you have your MongoDB connection string ready. It usually looks like this:
`mongodb+srv://<username>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority`

## 2. Add Environment Variables in Vercel
Since your local `.env` file is not uploaded to Vercel for security reasons, you must manually add the variables.

1.  Go to your **Vercel Dashboard**.
2.  Select your project (**e_store**).
3.  Go to **Settings** > **Environment Variables**.
4.  Add a new variable:
    *   **Key**: `MONGODB_URI`
    *   **Value**: Your actual MongoDB connection string (e.g., `mongodb+srv://...`)
5.  (Optional) If you have other variables in your `.env` file (like `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`, `NEXTAUTH_SECRET`, etc.), add them here as well.

## 3. Redeploy
After adding the environment variables:
1.  Go to the **Deployments** tab in Vercel.
2.  Click on the latest failed deployment or the three dots (...) next to it.
3.  Select **Redeploy**.
4.  Check the "Redeploy with existing build cache" option (usually fine) or just click **Redeploy**.

The build should now pass successfully!
