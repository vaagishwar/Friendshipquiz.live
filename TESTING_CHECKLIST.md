# Firebase Integration Testing Checklist

## ✅ Phase 5: Test Locally

Your dev server is running at: **http://localhost:3000**

### Test 1: Create a Quiz
1. Open http://localhost:3000 in your browser
2. Click "Create a Quiz"
3. Enter your name (e.g., "John")
4. Add 3-5 questions with answers
5. Click "Create Quiz"
6. **Expected**: You get a quiz link and see "Quiz created!"

### Test 2: Verify Quiz in Firebase
1. Go to Firebase Console: https://console.firebase.google.com/
2. Select your project `friendshipquizlive`
3. Go to **Firestore Database**
4. Click on **quizzes** collection
5. **Expected**: You should see your quiz document with:
   - `creatorName`: "John"
   - `questions`: array of questions
   - `participants`: empty array []
   - `createdAt`: timestamp

### Test 3: Take Quiz (Same Browser)
1. Copy the quiz link from the results page
2. Open it in the **same browser**
3. Enter your name (e.g., "Alice")
4. Answer all questions
5. Click "Submit"
6. **Expected**: You see results page with leaderboard showing 1 participant

### Test 4: Take Quiz (Different Browser/Incognito)
1. Copy the quiz link
2. Open in **Incognito/Private window** (or different browser)
3. Enter name (e.g., "Bob")
4. Answer all questions
5. Click "Submit"
6. **Expected**: Leaderboard shows 2 participants (Alice + Bob)

### Test 5: Real-Time Update
1. Keep the results page open from Test 3 (Alice's results)
2. In another window, take the quiz as "Charlie"
3. Submit the quiz
4. **Expected**: Alice's results page automatically updates to show 3 participants including Charlie

### Test 6: Verify in Firebase
1. Go back to Firebase Console
2. Open your quiz document
3. Click on **participants** array
4. **Expected**: You should see all 3 participants (Alice, Bob, Charlie) with their scores

---

## 🔧 If Tests Fail

### Quiz Not Saving
- Check browser console (F12 → Console tab)
- Look for red error messages
- Common error: "Permission denied" → Check Firestore rules

### Leaderboard Not Updating
- Refresh the page (F5)
- Check if participants exist in Firebase
- Wait 2-3 seconds for real-time update

### Firebase Connection Error
- Verify firebase.js config is correct
- Check Firebase project is active
- Ensure Firestore database is created

---

## 📝 Next Steps After Testing

Once all tests pass:
1. Push code to GitHub
2. Cloudflare will auto-deploy
3. Test on live site

**Let me know when you've completed the tests!**
