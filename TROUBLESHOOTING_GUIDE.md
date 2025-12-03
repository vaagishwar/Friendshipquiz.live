# Troubleshooting Guide

## 🔴 Error: `net::ERR_BLOCKED_BY_CLIENT`

If you see this error in your browser console when trying to create a quiz on the hosted site, it means the network request to Firebase was blocked.

### Common Causes & Solutions

#### 1. Missing Environment Variables (Most Likely)
The most common reason this happens on a hosted site (like Cloudflare Pages) while working locally is that the **Environment Variables** are not set on the hosting platform.

**Why?**
- Locally, you have a `.env.local` file with your Firebase keys.
- This file is **ignored by git** (for security), so it doesn't get uploaded to Cloudflare.
- Cloudflare doesn't know your API keys, so the app tries to connect to an invalid URL, which can trigger this error or a 404.

**Solution:**
1. Go to the **Cloudflare Dashboard**.
2. Navigate to **Workers & Pages** -> **Overview**.
3. Click on your project (`friendship-quiz`).
4. Go to **Settings** -> **Environment Variables**.
5. Click **Add variables**.
6. Add all the variables from your local `.env.local` file:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`
   - `VITE_FIREBASE_MEASUREMENT_ID`
7. **Save** and then **Redeploy** your latest deployment (or push a small change to trigger a new build).

#### 2. Ad Blockers / Privacy Extensions
Sometimes, browser extensions like **uBlock Origin**, **AdBlock Plus**, or **Privacy Badger** block requests to Firebase (`firestore.googleapis.com`) because they can be used for tracking.

**Solution:**
- Disable your ad blocker for your website.
- Try opening the site in **Incognito Mode** (where extensions are usually disabled).
- If it works in Incognito, it's definitely an extension issue.

#### 3. Browser Privacy Settings
Strict privacy settings in browsers like Firefox (Enhanced Tracking Protection) or Brave (Shields) might block these requests.

**Solution:**
- Click the shield icon in the address bar and turn off protections for your site to test.

---

## 🔍 How to Verify

1. Open your hosted website.
2. Open Developer Tools (**F12** or **Right Click -> Inspect**).
3. Go to the **Console** tab.
4. Refresh the page.
5. If you see "Firebase API Key is missing!", follow Solution #1.
