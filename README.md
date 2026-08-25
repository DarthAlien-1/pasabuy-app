# Korea Pasabuy Tracker — deploy guide

This folder is a ready-to-deploy Vercel project:
- `index.html` — the app
- `api/data.js` — a serverless function that saves/loads your data
- `package.json` — declares the one dependency (`@upstash/redis`)

Data is stored in **Upstash Redis** (free tier is plenty for this). Both you and
your girlfriend will read/write the same data through the API, so the tracker
stays in sync no matter who's using it.

## 1. Create a free Upstash Redis database
1. Go to https://upstash.com and sign up (you can use your GitHub account).
2. Create a new **Redis** database (any region close to you is fine).
3. On the database's page, find **REST API** — copy the `UPSTASH_REDIS_REST_URL`
   and `UPSTASH_REDIS_REST_TOKEN` values. You'll paste these into Vercel in step 3.

## 2. Push this folder to GitHub
From this folder:
```bash
git init
git add .
git commit -m "Korea Pasabuy tracker"
```
Create a new empty repo on GitHub (no README/gitignore), then:
```bash
git remote add origin https://github.com/<your-username>/<repo-name>.git
git branch -M main
git push -u origin main
```

## 3. Import into Vercel
1. Go to https://vercel.com, sign in with GitHub, click **Add New → Project**.
2. Select the repo you just pushed. Framework preset: **Other** (it's plain
   static + serverless, no build step needed).
3. Before deploying, open **Environment Variables** and add:
   - `UPSTASH_REDIS_REST_URL` = (from step 1)
   - `UPSTASH_REDIS_REST_TOKEN` = (from step 1)
4. Click **Deploy**.

Vercel gives you a live URL like `https://korea-pasabuy-tracker.vercel.app` —
that's what you send your girlfriend. Any device, anywhere, no login needed.

## Updating later
Whenever you want changes (new features, tweaks), just replace `index.html`
(and `api/data.js` if needed) and push again:
```bash
git add .
git commit -m "update"
git push
```
Vercel redeploys automatically on every push — your saved data in Upstash is
untouched by redeploys.

## Notes
- Anyone with the live link can view and edit the tracker — there's no
  password. That's fine for sharing between the two of you, but don't post
  the link publicly.
- The free Upstash tier easily covers this app's usage (it's a tiny amount of
  data, saved a few times a minute at most).
