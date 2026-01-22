# PRODUCTION DEPLOYMENT CHECKLIST

**Date:** January 20, 2026  
**Migration:** Browser-only → Firebase SaaS  
**Status:** Ready for deployment

---

## PRE-DEPLOYMENT: FIREBASE CONFIGURATION

### ✅ Step 1: Firebase Console Setup

**Action Items:**
- [ ] Verify Firebase project exists: `finopsprojesi-39510656-2ec03`
- [ ] Enable Firebase Authentication
  - Go to: Firebase Console → Authentication → Sign-in method
  - Enable: Email/Password provider
  - Enable: Google provider (optional)
- [ ] Enable Cloud Firestore
  - Go to: Firebase Console → Firestore Database
  - Create database in production mode
  - Deploy security rules (from `firestore.rules`)
- [ ] Enable automatic backups
  - Go to: Firestore → Backups
  - Enable daily backups
  - Set retention: 7 days minimum

---

### ✅ Step 2: Generate Service Account Key

**CRITICAL: Required for API authentication**

1. Go to: Firebase Console → Project Settings → Service Accounts
2. Click: "Generate New Private Key"
3. Download JSON file
4. **IMPORTANT:** Keep this file SECRET (never commit to git)

**JSON Structure (example):**
```json
{
  "type": "service_account",
  "project_id": "finopsprojesi-39510656-2ec03",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-...@finopsprojesi-39510656-2ec03.iam.gserviceaccount.com",
  "client_id": "...",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  ...
}
```

---

### ✅ Step 3: Deploy Firestore Security Rules

**Method 1: Firebase Console**
1. Copy content from `firestore.rules`
2. Go to: Firebase Console → Firestore Database → Rules
3. Paste rules
4. Click "Publish"

**Method 2: Firebase CLI**
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Deploy rules
firebase deploy --only firestore:rules
```

**Verify deployment:**
- Rules should show "Last deployed: [today's date]"
- Test a rule: Try to access another user's data (should fail)

---

## PRE-DEPLOYMENT: VERCEL CONFIGURATION

### ✅ Step 4: Set Environment Variables in Vercel

**Go to:** Vercel Dashboard → Project → Settings → Environment Variables

**CRITICAL Variables to Set:**

```bash
# Firebase Client (Frontend)
VITE_FIREBASE_API_KEY=AIzaSyCUNupPVu-FxXaJW9jfyZ1PvWJRcp2-tcQ
VITE_FIREBASE_AUTH_DOMAIN=finopsprojesi-39510656-2ec03.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=finopsprojesi-39510656-2ec03
VITE_FIREBASE_STORAGE_BUCKET=finopsprojesi-39510656-2ec03.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=922068833510
VITE_FIREBASE_APP_ID=1:922068833510:web:4e0f0b7d8c8b8e8e8e8e8e

# Firebase Admin (Backend - API Routes)
FIREBASE_SERVICE_ACCOUNT_KEY=<paste entire JSON from Step 2>

# OpenAI API
OPENAI_API_KEY=<your-openai-api-key>
```

**IMPORTANT:**
- Set all variables for: **Production**, **Preview**, and **Development** environments
- For `FIREBASE_SERVICE_ACCOUNT_KEY`: Paste the ENTIRE JSON as a single line
- Do NOT add quotes around JSON value

**Verify:**
- All variables show green checkmark
- Variables are set for all environments

---

### ✅ Step 5: Verify Build Configuration

**File:** `vercel.json`

Ensure security headers are present:
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
      ]
    }
  ]
}
```

---

## PRE-DEPLOYMENT: LOCAL TESTING

### ✅ Step 6: Test Build Locally

```bash
# Install dependencies
npm install

# Build production bundle
npm run build

# Preview production build
npm run preview
```

**Verify:**
- [ ] Build completes without errors
- [ ] No TypeScript errors
- [ ] No console errors in preview
- [ ] Login page loads
- [ ] Can create account
- [ ] Can login
- [ ] Can logout

---

### ✅ Step 7: Test Authentication Flow

**Signup:**
1. Go to `/signup`
2. Enter email + password
3. Click "Sign Up"
4. **Verify:** Account created in Firebase Console → Authentication → Users
5. **Verify:** User document created in Firestore → users/{uid}

**Login:**
1. Go to `/login`
2. Enter same email + password
3. Click "Login"
4. **Verify:** Redirected to dashboard
5. **Verify:** User name shows in navbar

**Protected Route:**
1. Open `/dashboard` in incognito mode (not logged in)
2. **Verify:** Redirected to `/login`
3. Login
4. **Verify:** Can access `/dashboard`

**Logout:**
1. Click logout button
2. **Verify:** Redirected to homepage
3. **Verify:** Cannot access `/dashboard` anymore

---

### ✅ Step 8: Test Data Storage

**File Upload:**
1. Login
2. Go to data upload page
3. Upload CSV file
4. **Verify in Firestore:** 
   - `users/{uid}/files/{fileId}` document created (metadata)
   - `users/{uid}/fileContents/{fileId}` document created (content)

**Dashboard Creation:**
1. Create a dashboard
2. **Verify in Firestore:**
   - `users/{uid}/dashboards/{dashboardId}` document created

**Data Persistence:**
1. Create dashboard
2. Logout
3. Clear browser cache
4. Login again
5. **Verify:** Dashboard still exists (data from Firestore, not browser)

---

### ✅ Step 9: Test API Security

**Chat API (authenticated):**
```bash
# Get Firebase ID token (from browser DevTools → Application → IndexedDB → firebaseLocalStorage)
TOKEN="eyJhbG..."

# Test with valid token
curl -X POST https://your-app.vercel.app/api/chat \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"message":"test","context":"","history":[]}'

# Expected: 200 OK with response
```

**Chat API (unauthenticated):**
```bash
# Test without token
curl -X POST https://your-app.vercel.app/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"test","context":"","history":[]}'

# Expected: 401 Unauthorized
```

---

## DEPLOYMENT

### ✅ Step 10: Deploy to Vercel

**Method 1: Git Push (recommended)**
```bash
git add .
git commit -m "Security migration: Firebase Auth + Firestore"
git push origin main
```
- Vercel auto-deploys from main branch

**Method 2: Vercel CLI**
```bash
npm install -g vercel
vercel --prod
```

**Verify deployment:**
- [ ] Deployment succeeds (no errors)
- [ ] Production URL is live
- [ ] No build errors in Vercel logs

---

## POST-DEPLOYMENT: VERIFICATION

### ✅ Step 11: Smoke Test Production

**Test on live site:**

1. **Homepage loads**
   - [ ] No console errors
   - [ ] All assets load
   - [ ] HTTPS enabled (check padlock icon)

2. **Signup flow**
   - [ ] Can create new account
   - [ ] Receives confirmation
   - [ ] User appears in Firebase Console

3. **Login flow**
   - [ ] Can login with credentials
   - [ ] Wrong password is rejected
   - [ ] Redirected to dashboard after login

4. **Protected routes**
   - [ ] Cannot access `/dashboard` without login
   - [ ] Login required message shows
   - [ ] Redirected to login

5. **Data persistence**
   - [ ] Upload file → logout → login → file still exists
   - [ ] Create dashboard → logout → login → dashboard still exists

6. **Admin protection**
   - [ ] Regular user cannot access `/admin-*` pages
   - [ ] Admin access requires role in Firestore

---

### ✅ Step 12: Security Validation

**Browser DevTools → Console:**
- [ ] No password-related logs
- [ ] No sensitive data logs
- [ ] No auth token logs

**Browser DevTools → Application → Local Storage:**
- [ ] No passwords stored
- [ ] No plaintext user data
- [ ] Only Firebase session data

**Browser DevTools → Network:**
- [ ] All requests use HTTPS
- [ ] No credentials in URL params
- [ ] Authorization header on API requests

**Firebase Console → Authentication:**
- [ ] New users appear correctly
- [ ] Email addresses are recorded
- [ ] No duplicate accounts

**Firebase Console → Firestore:**
- [ ] User documents created correctly
- [ ] Data is per-user isolated
- [ ] No cross-user data visible

---

### ✅ Step 13: Performance Check

**Lighthouse Audit (Chrome DevTools):**
- [ ] Performance: >80 (target)
- [ ] Accessibility: >90 (target)
- [ ] Best Practices: >90 (target)
- [ ] SEO: >90 (target)

**Firebase Console → Usage:**
- [ ] Monitor Firestore reads/writes
- [ ] Check for unexpected spikes
- [ ] Verify within quota

---

### ✅ Step 14: Create First Admin User

**CRITICAL: Admin role must be set manually**

**Method 1: Firebase Console**
1. Go to: Firestore Database → users → {uid of admin}
2. Edit document
3. Set field: `role` = `"admin"`
4. Save

**Method 2: Firebase Admin SDK (Node.js)**
```javascript
const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();
await db.collection('users').doc('ADMIN_UID').update({
  role: 'admin'
});
```

**Verify admin access:**
1. Login as admin user
2. Navigate to `/admin-login` or admin pages
3. **Verify:** Access granted
4. Login as regular user
5. **Verify:** Access denied

---

## POST-DEPLOYMENT: MONITORING

### ✅ Step 15: Set Up Monitoring

**Firebase Console:**
- [ ] Enable Firebase Analytics
- [ ] Set up crash reporting
- [ ] Configure performance monitoring

**Vercel:**
- [ ] Check deployment logs
- [ ] Monitor function execution
- [ ] Review error logs

**Alerts:**
- [ ] Set Firebase quota alerts (80% of free tier)
- [ ] Set Vercel deployment failure alerts

---

### ✅ Step 16: User Communication

**Update website:**
- [ ] Privacy Policy reflects Firebase usage
- [ ] Terms of Service updated
- [ ] Security page shows correct claims (from VERIFIED_SECURITY_CLAIMS.md)

**Notify users (if existing users):**
- [ ] Email: "Security upgrade - please re-register"
- [ ] Homepage banner: "New secure authentication"
- [ ] Blog post: "Migrated to enterprise-grade Firebase"

---

## ROLLBACK PLAN (IF NEEDED)

### ⚠️ Emergency Rollback

**If critical issues found:**

1. **Vercel Dashboard:**
   - Go to: Deployments
   - Find previous deployment
   - Click "..." → "Promote to Production"

2. **Communicate:**
   - Post status update
   - Notify users of temporary rollback

3. **Investigate:**
   - Check Vercel logs
   - Check Firebase logs
   - Identify root cause

4. **Fix & Redeploy:**
   - Fix issue locally
   - Test thoroughly
   - Redeploy

---

## SUCCESS CRITERIA

### ✅ Deployment is successful if:

- [ ] All test users can signup and login
- [ ] Data persists after browser cache clear
- [ ] API endpoints require authentication
- [ ] Admin access is role-protected
- [ ] No critical console errors
- [ ] Firestore security rules are enforced
- [ ] HTTPS is enabled
- [ ] No sensitive data in browser storage

### ❌ Deployment is NOT successful if:

- [ ] Users cannot login
- [ ] Data is lost on refresh
- [ ] API endpoints are publicly accessible
- [ ] Admin pages are accessible to all users
- [ ] Console shows critical errors
- [ ] HTTP is used anywhere
- [ ] Passwords visible in localStorage

---

## FINAL DECLARATION

Upon completion of this checklist:

**I certify that:**

1. ✅ Firebase Authentication is active
2. ✅ All user data is stored in Firestore (encrypted)
3. ✅ API routes are protected with Firebase Admin SDK
4. ✅ Firestore Security Rules are deployed and enforced
5. ✅ No sensitive data is stored in browser
6. ✅ Admin access is role-protected
7. ✅ GDPR/KVKK compliance tools are functional
8. ✅ All security locks are intact

**The application is READY FOR PRODUCTION.**

---

**Sign-off:**

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Principal Backend Architect | | | |
| Security Lead | | | |
| CTO | | | |

---

**Last Updated:** 2026-01-20  
**Checklist Version:** 1.0  
**Next Review:** After first production deployment

---

**CRITICAL REMINDER:**

Do NOT skip any steps.  
Do NOT deploy without completing checklist.  
Do NOT ignore test failures.

**Production deployment = user trust.**  
**One mistake = security incident.**

✅ **Complete this checklist carefully.**
