# Deploying Savanna Studio to Vercel

This guide will walk you through deploying the Savanna Photo Studio application to Vercel.

## Prerequisites

- A [Vercel account](https://vercel.com/signup)
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) database (or any MongoDB instance accessible from the internet)
- A [Cloudinary account](https://cloudinary.com) for image hosting
- The Vercel CLI installed: `npm i -g vercel`

## Step 1: Prepare Environment Variables

You'll need to set these environment variables in Vercel:

### Backend Variables
- `MONGO_URI` - Your MongoDB connection string
- `JWT_SECRET` - A secure secret for JWT tokens (generate with: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)
- `CLOUDINARY_CLOUD_NAME` - Your Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Your Cloudinary API key
- `CLOUDINARY_API_SECRET` - Your Cloudinary API secret
- `NODE_ENV` - Set to `production`

### Frontend Variables (Optional)
- If your frontend needs to know the API URL, it will automatically use the same domain in production

## Step 2: Install Vercel CLI & Login

```bash
npm i -g vercel
vercel login
```

## Step 3: Deploy to Vercel

### Option A: Deploy via Vercel CLI (Recommended for first deployment)

1. Navigate to your project directory:
```bash
cd c:\Users\Malik\OneDrive\Desktop\savanna-studio-showcase
```

2. Run the deployment command:
```bash
vercel
```

3. Follow the prompts:
   - **Set up and deploy?** `Y`
   - **Which scope?** Choose your account
   - **Link to existing project?** `N`
   - **What's your project's name?** `savanna-studio` (or your preferred name)
   - **In which directory is your code located?** `./`
   - **Want to override the settings?** `N`

4. Add environment variables:
```bash
vercel env add MONGO_URI
vercel env add JWT_SECRET
vercel env add CLOUDINARY_CLOUD_NAME
vercel env add CLOUDINARY_API_KEY
vercel env add CLOUDINARY_API_SECRET
vercel env add NODE_ENV
```

For each variable, select **Production**, **Preview**, and **Development** when prompted.

5. Deploy to production:
```bash
vercel --prod
```

### Option B: Deploy via Vercel Dashboard

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)

2. Go to [Vercel Dashboard](https://vercel.com/dashboard)

3. Click **"Add New Project"**

4. Import your Git repository

5. Configure the project:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

6. Add all environment variables in the **Environment Variables** section

7. Click **Deploy**

## Step 4: Set Up Your Admin Account

After deployment, you need to create an admin account. You have two options:

### Option A: Use Vercel CLI to run the seed script

```bash
vercel env pull .env.local
cd server
node scripts/seedAdmin.js
```

### Option B: Create admin directly in MongoDB Atlas

1. Go to your MongoDB Atlas dashboard
2. Navigate to **Collections** → **admins**
3. Insert a document with:
```json
{
  "username": "admin",
  "email": "admin@savannasstudio.com",
  "password": "$2a$10$YOUR_BCRYPT_HASHED_PASSWORD"
}
```

To generate a bcrypt hash:
```bash
node -e "console.log(require('bcryptjs').hashSync('your-password', 10))"
```

## Step 5: Test Your Deployment

1. Visit your deployed site URL (e.g., `https://savanna-studio.vercel.app`)
2. Navigate to `/admin/login`
3. Log in with your admin credentials
4. Test uploading images to verify Cloudinary integration
5. Test all features: slideshow, portfolio, categories, contact form

## Troubleshooting

### Build Fails

**Issue**: Build fails with dependency errors
**Solution**: Make sure all dependencies are in `package.json`, not just `devDependencies`

### API Routes Don't Work

**Issue**: 404 errors on `/api/*` routes
**Solution**: Check that `vercel.json` is properly configured and deployed

### Database Connection Issues

**Issue**: "Database connection failed" errors
**Solution**: 
- Verify `MONGO_URI` is set correctly in Vercel environment variables
- Make sure your MongoDB Atlas cluster allows connections from all IPs (0.0.0.0/0) or add Vercel's IPs
- Check MongoDB Atlas → Network Access → IP Access List

### Image Upload Fails

**Issue**: Images not uploading
**Solution**:
- Verify all Cloudinary environment variables are set
- Check Cloudinary dashboard for API usage
- Ensure file size limits are appropriate (Vercel has a 4.5MB limit for serverless functions)

### Cold Start Timeouts

**Issue**: First request after inactivity takes too long
**Solution**: This is normal for serverless functions. Consider:
- Using Vercel Pro for lower cold start times
- Implementing a health check endpoint
- Using MongoDB connection pooling (already configured)

## Custom Domain (Optional)

1. Go to your project in Vercel Dashboard
2. Navigate to **Settings** → **Domains**
3. Add your custom domain
4. Follow DNS configuration instructions

## Updating Your Deployment

### Automatic Deployments (if using Git)
Every push to your main branch will automatically deploy to production

### Manual Deployments
```bash
vercel --prod
```

## Environment Variables Management

To update environment variables:

```bash
# Add or update a variable
vercel env add VARIABLE_NAME

# Remove a variable
vercel env rm VARIABLE_NAME

# List all variables
vercel env ls
```

## Support & Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Serverless Functions](https://vercel.com/docs/functions/serverless-functions)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Cloudinary Documentation](https://cloudinary.com/documentation)

---

**Your Savanna Photo Studio is now live! 🎉**
