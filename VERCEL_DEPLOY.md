# Vercel deployment

The static application is served from `app/`. The Python files in `api/` are
deployed as Vercel Functions.

1. In Vercel **Project Settings > Build and Deployment**, keep **Root Directory**
   at the repository root (blank or `.`). Do not set it to `app`.
2. The committed `vercel.json` sets **Output Directory** to `app`.
3. In **Project Settings > Environment Variables**, add these variables for
   Production and Preview:
   - `OPENAI_API_KEY`
   - `GEMINI_API_KEY`
4. Redeploy the latest commit.
5. Open `/api/status` on the deployed domain. It should return JSON instead of
   a 404 response.

API keys stay server-side. Never commit the local `.env` file.
