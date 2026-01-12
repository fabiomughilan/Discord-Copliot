# 🚢 Deployment Guide - Discord Copilot

This guide will help you deploy the Discord Copilot system to production.

## Overview

- **Admin Console**: Deploy to Vercel (free tier available)
- **Discord Bot**: Deploy to Railway or Render (free tier available)
- **Database**: Use Neon, Supabase, or any PostgreSQL provider
- **Vector DB**: Pinecone (free tier available)

---

## Part 1: Deploy Admin Console to Vercel

### Prerequisites
- GitHub account
- Vercel account (sign up at https://vercel.com)

### Step 1: Push Code to GitHub

```bash
cd admin-console

# Initialize git if not already done
git init
git add .
git commit -m "Initial commit - Discord Copilot Admin Console"

# Create GitHub repo and push
# (Follow GitHub instructions to create repo and push)
```

### Step 2: Deploy to Vercel

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Configure project:
   - Framework Preset: **Next.js**
   - Root Directory: `admin-console`
   - Build Command: `npm run build`
   - Output Directory: `.next`

4. Add Environment Variables:
   ```
   DATABASE_URL=your_postgresql_connection_string
   NEXTAUTH_SECRET=generate_with_openssl_rand_base64_32
   NEXTAUTH_URL=https://your-app.vercel.app
   OPENAI_API_KEY=sk-...
   PINECONE_API_KEY=...
   PINECONE_INDEX_NAME=discord-copilot-knowledge
   ```

5. Click **Deploy**

### Step 3: Set Up Database

After deployment, run migrations:

```bash
# Install Vercel CLI
npm install -g vercel

# Link to your project
vercel link

# Pull environment variables
vercel env pull .env.local

# Run migrations
npx prisma db push

# Seed database
npm run db:seed
```

### Step 4: Test Admin Console

1. Visit your Vercel URL (e.g., `https://your-app.vercel.app`)
2. Login with `admin` / `admin123`
3. Change password immediately!

✅ Admin Console is live!

---

## Part 2: Deploy Discord Bot to Railway

### Prerequisites
- Railway account (sign up at https://railway.app)

### Option A: Deploy from GitHub

1. Push discord-bot to GitHub (separate repo or monorepo)
2. Go to https://railway.app/new
3. Click "Deploy from GitHub repo"
4. Select your repository
5. Configure:
   - Root Directory: `discord-bot` (if monorepo)
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`

### Option B: Deploy with Railway CLI

```bash
cd discord-bot

# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Add environment variables
railway variables set DISCORD_TOKEN=your_token
railway variables set DISCORD_CLIENT_ID=your_client_id
railway variables set API_BASE_URL=https://your-vercel-app.vercel.app
railway variables set GROQ_API_KEY=gsk-...
railway variables set OPENAI_API_KEY=sk-...
railway variables set PINECONE_API_KEY=...
railway variables set PINECONE_INDEX_NAME=discord-copilot-knowledge

# Deploy
railway up
```

### Alternative: Deploy to Render

1. Go to https://render.com/
2. Create new "Web Service"
3. Connect GitHub repository
4. Configure:
   - Environment: **Node**
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Instance Type: **Free**

5. Add environment variables (same as Railway)

6. Deploy!

✅ Discord Bot is live!

---

## Part 3: Production Checklist

### Security

- [ ] Change default admin password
- [ ] Use strong, unique passwords
- [ ] Enable 2FA on all service accounts
- [ ] Rotate API keys regularly
- [ ] Never commit `.env` files

### Database

- [ ] Set up automated backups
- [ ] Monitor database size (free tiers have limits)
- [ ] Set up connection pooling if needed

### Monitoring

- [ ] Check Vercel logs for errors
- [ ] Monitor Railway/Render logs
- [ ] Set up uptime monitoring (e.g., UptimeRobot)
- [ ] Monitor API usage (OpenAI, Pinecone)

### Discord Bot

- [ ] Verify bot is online in Discord
- [ ] Test in production Discord server
- [ ] Set up error logging
- [ ] Monitor memory usage

### Costs

Free tier limits:
- **Vercel**: 100GB bandwidth/month
- **Railway**: $5 credit/month (500 hours)
- **Render**: 750 hours/month
- **Neon**: 3GB storage
- **Pinecone**: 1 index, 100K vectors
- **Groq**: Free tier with generous limits
- **OpenAI**: Pay per use (only for embeddings)

---

## Part 4: Update Production Bot

### Update Admin Console

```bash
cd admin-console

# Make changes
git add .
git commit -m "Update: description"
git push

# Vercel auto-deploys on push
```

### Update Discord Bot

```bash
cd discord-bot

# Make changes
git add .
git commit -m "Update: description"
git push

# Railway/Render auto-deploys on push
```

---

## Part 5: Handoff Information

### For Reviewers

**Live URLs:**
- Admin Console: `https://your-app.vercel.app`
- Discord Server Invite: `https://discord.gg/your-invite-code`

**Admin Credentials:**
- Username: `admin`
- Password: `[your-secure-password]`

**Test Instructions:**
1. Login to Admin Console
2. View System Instructions (should be configured)
3. Check Allowed Channels (should have at least one channel)
4. Upload a test PDF in Knowledge Base
5. Go to Discord server
6. Send message in allowed channel
7. Bot should respond with context-aware answer
8. Test RAG by asking about uploaded PDF content

---

## Troubleshooting

### Vercel Build Fails
- Check build logs in Vercel dashboard
- Verify all environment variables are set
- Ensure `DATABASE_URL` is accessible from Vercel

### Railway/Render Bot Not Starting
- Check logs for errors
- Verify `DISCORD_TOKEN` is correct
- Ensure `API_BASE_URL` points to Vercel app
- Check bot has proper intents enabled

### Database Connection Issues
- Verify connection string format
- Check IP allowlist (some providers require this)
- Ensure SSL is enabled if required

### Bot Not Responding in Discord
- Check bot is online (green dot)
- Verify channel ID in allowed list
- Check bot has permissions in channel
- Review Railway/Render logs

---

## Scaling Considerations

### If you outgrow free tiers:

**Admin Console:**
- Upgrade Vercel to Pro ($20/month)
- Or self-host on VPS

**Discord Bot:**
- Upgrade Railway ($5-20/month)
- Or use AWS/GCP/Azure
- Consider serverless (AWS Lambda + SQS)

**Database:**
- Upgrade Neon to paid plan
- Or use managed PostgreSQL (AWS RDS, etc.)

**Vector DB:**
- Upgrade Pinecone to paid plan
- Or self-host with Qdrant/Weaviate

---

## Support

For deployment issues:
- Vercel: https://vercel.com/docs
- Railway: https://docs.railway.app
- Render: https://render.com/docs
- Neon: https://neon.tech/docs
- Pinecone: https://docs.pinecone.io
