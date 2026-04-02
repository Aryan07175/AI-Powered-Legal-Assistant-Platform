# Deployment Guide for AI-Powered Legal Assistant

This project is structured as a standard MERN stack application with `vite` for the React frontend, and can be deployed easily on modern cloud hosting platforms like **Render** and **Vercel**.

## 1. Backend Deployment (Render)
Render is an excellent platform for hosting Node.js backends that use Socket.io.

1. Create a `render.yaml` or just deploy directly via the Render Dashboard.
2. In the Render Dashboard, create a new **Web Service**.
3. Connect your GitHub repository.
4. Provide the following settings for the backend service:
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
5. Add the necessary Environment Variables:
   - `MONGO_URI`: Your MongoDB Atlas connection string.
   - `JWT_SECRET`: A secure string.
   - `OPENAI_API_KEY`: Your valid OpenAI API key.
   - `PORT`: Note that Render handles ports automatically, but it's good to expose it if needed.

## 2. Frontend Deployment (Vercel)
Vercel is the optimal hosting choice for a Vite (React) Single Page Application.

1. Go to the Vercel Dashboard and click **Add New Project**.
2. Connect your GitHub repository.
3. In the configuration settings, set:
   - **Root Directory**: `frontend`
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Deploy the application.
5. In your Vercel project settings, update the environment variables or `.env` to point to the production backend URL (e.g. `VITE_API_BASE_URL=https://your-render-backend.onrender.com`). *Note: for the current MVP, you will need to update the axios base URLs in the frontend code to reflect the production URL instead of localhost:5000.*

## 3. MongoDB Hosted Database
If you haven't already:
1. Create a free cluster on **MongoDB Atlas**.
2. Whitelist `0.0.0.0/0` in the Network Access IP rules.
3. Obtain your cluster connection string and plug it into the `MONGO_URI` backend variable.
