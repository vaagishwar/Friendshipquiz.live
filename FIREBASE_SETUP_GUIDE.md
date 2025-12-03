# Firebase Setup Guide for Friendship Quiz

## Phase 1: Create Firebase Project

### Step 1.1: Go to Firebase Console
1. Open https://console.firebase.google.com/
2. Sign in with your Google account (create one if needed)

### Step 1.2: Create a New Project
1. Click **"Create a project"** button
2. Enter project name: `friendship-quiz`
3. Click **"Continue"**
4. Disable Google Analytics (optional, click "Create project")
5. Wait for project to be created (1-2 minutes)

### Step 1.3: Get Your Firebase Config
1. Click the **"Web"** icon (looks like `</>`)
2. Register app name: `friendship-quiz-web`
3. Copy the config code (you'll see something like):
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyD...",
  authDomain: "friendship-quiz-xxx.firebaseapp.com",
  projectId: "friendship-quiz-xxx",
  storageBucket: "friendship-quiz-xxx.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};
```
4. **Save this config somewhere safe** (you'll need it later)

---

## Phase 2: Enable Firestore Database

### Step 2.1: Create Firestore Database
1. In Firebase Console, go to **"Firestore Database"** (left sidebar)
2. Click **"Create database"**
3. Choose **"Start in test mode"** (for development)
4. Click **"Next"**
5. Select region closest to you (e.g., `us-central1`)
6. Click **"Enable"**
7. Wait for database to be created

### Step 2.2: Set Security Rules (Important!)
1. Go to **"Firestore Database"** → **"Rules"** tab
2. Replace the rules with:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /quizzes/{quizId} {
      allow read, write: if true;
    }
  }
}
```
3. Click **"Publish"**

---

## Phase 3: Install Firebase in Your Project

### Step 3.1: Install Firebase Package
Open terminal in your project folder and run:
```bash
npm install firebase
```

### Step 3.2: Create Firebase Config File
Create a new file: `src/config/firebase.js`

Copy this code:
```javascript
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
```

**Replace the values with your Firebase config from Step 1.3**

---

## Phase 4: Update Your Code

### Step 4.1: Update QuizContext.jsx
Replace your `src/context/QuizContext.jsx` with the new Firebase version.

The new version will:
- Save quizzes to Firestore (cloud)
- Load quizzes from Firestore
- Update leaderboard in real-time
- Work across all browsers/devices

### Step 4.2: Update TakeQuiz.jsx
Minor changes to work with async Firebase calls.

---

## Phase 5: Test Locally

### Step 5.1: Start Development Server
```bash
npm run dev
```

### Step 5.2: Test Quiz Creation
1. Create a new quiz
2. Check Firebase Console → Firestore Database
3. You should see a new `quizzes` collection with your quiz

### Step 5.3: Test Quiz Taking
1. Open quiz in another browser tab (or incognito window)
2. Take the quiz
3. Check leaderboard updates in real-time

---

## Phase 6: Deploy to Cloudflare Pages

### Step 6.1: Push to GitHub
```bash
git add .
git commit -m "Add Firebase integration"
git push origin main
```

### Step 6.2: Cloudflare Auto-Deploy
- Cloudflare will automatically rebuild and deploy
- Check Deployments tab in Cloudflare Pages

### Step 6.3: Test Live Site
1. Go to your Cloudflare Pages URL
2. Create a quiz
3. Share link with a friend
4. Friend takes quiz
5. Leaderboard updates in real-time ✓

---

## 🔧 Troubleshooting

### Firebase Config Not Working
- Check that all values are copied correctly
- No extra spaces or quotes

### Firestore Rules Error
- Go to Firestore → Rules
- Make sure rules are published
- Check browser console for errors (F12)

### Quiz Not Saving
- Open browser DevTools (F12)
- Go to Console tab
- Look for red error messages
- Check Firebase Console for quota limits

### Leaderboard Not Updating
- Refresh the page
- Check if quiz data exists in Firestore
- Verify Firestore rules allow read/write

---

## 📊 Firebase Free Tier Limits

✓ **Firestore**: 1GB storage, 50k reads/day  
✓ **Realtime Database**: 1GB storage, 100 concurrent connections  
✓ **Hosting**: 1GB storage, 10GB/month bandwidth  

Perfect for your use case!

---

## 🚀 Next Steps

1. Create Firebase project (Phase 1-2)
2. Install Firebase package (Phase 3.1)
3. Create firebase.js config file (Phase 3.2)
4. I'll provide updated code files (Phase 4)
5. Test locally (Phase 5)
6. Deploy (Phase 6)

**Ready to start? Let me know when you've completed Phase 1-3!**

