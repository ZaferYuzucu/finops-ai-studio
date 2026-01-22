# 🔐 PRODUCTION ENVIRONMENT VARIABLES

**SECURITY-CRITICAL:** Set these in Vercel Dashboard → Settings → Environment Variables

---

## 1️⃣ FIREBASE AUTHENTICATION (REQUIRED)

### Client-side Firebase Config

```bash
VITE_FIREBASE_API_KEY=your_firebase_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

**Get from:** Firebase Console → Project Settings → General → Your apps → Web app config

---

## 2️⃣ FIREBASE ADMIN SDK (CRITICAL - REQUIRED)

### Server-side Service Account

```bash
FIREBASE_SERVICE_ACCOUNT_KEY={"type":"service_account","project_id":"...","private_key_id":"...","private_key":"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n","client_email":"...","client_id":"...","auth_uri":"...","token_uri":"...","auth_provider_x509_cert_url":"...","client_x509_cert_url":"..."}
```

**⚠️ CRITICAL:** System will NOT start without this variable.

**Get from:**
1. Firebase Console → Project Settings → Service Accounts
2. Click "Generate New Private Key"
3. Download JSON file
4. Convert to single-line string: `cat service-account.json | jq -c .`
5. Paste the entire JSON string as the value

**Security Notes:**
- This is the MOST CRITICAL environment variable
- Contains private key for Firebase Admin SDK
- NEVER commit to git
- Production deployment will FAIL FAST without it

---

## 3️⃣ ADMIN AUTHENTICATION (REQUIRED)

### Admin Panel Password

```bash
ADMIN_PASSWORD=your_secure_admin_password_here
```

**Requirements:**
- Minimum 16 characters
- Mixed case (upper + lower)
- Include numbers
- Include symbols

**Example:** `MySecureP@ssw0rd2026!`

### Admin Session Secret

```bash
ADMIN_SESSION_SECRET=your_secure_session_secret_here
```

**Generate using:**
```bash
openssl rand -base64 32
```

**Purpose:** Signs HMAC session tokens for admin panel

---

## 4️⃣ OPENAI API (REQUIRED for Chat)

### OpenAI API Key

```bash
OPENAI_API_KEY=sk-proj-...
```

**Get from:** https://platform.openai.com/api-keys

**Purpose:** Powers Fino AI Chat Assistant

---

## 5️⃣ EMAIL SERVICE (OPTIONAL)

### GoDaddy SMTP

```bash
SMTP_USER=info@finops.ist
SMTP_PASS=your_smtp_password
```

**Purpose:** Send transactional emails (beta applications, notifications)

**Note:** System works without email, but email features will be disabled

---

## ✅ VERIFICATION CHECKLIST

Before deploying to production, verify:

- [ ] All VITE_FIREBASE_* variables are set
- [ ] FIREBASE_SERVICE_ACCOUNT_KEY is set (JSON string)
- [ ] ADMIN_PASSWORD is strong (16+ chars)
- [ ] ADMIN_SESSION_SECRET is random (32 bytes)
- [ ] OPENAI_API_KEY is set
- [ ] SMTP credentials are set (optional)

---

## 🚀 DEPLOYMENT STEPS

### 1. Set Environment Variables in Vercel

```bash
# Login to Vercel
vercel login

# Navigate to project
cd /path/to/finops-ai-studio

# Set environment variables
vercel env add FIREBASE_SERVICE_ACCOUNT_KEY production
vercel env add ADMIN_PASSWORD production
vercel env add ADMIN_SESSION_SECRET production
# ... (repeat for all vars)
```

**Or:** Use Vercel Dashboard → Project → Settings → Environment Variables

### 2. Deploy to Production

```bash
vercel --prod
```

### 3. Verify Deployment

**Test 1: Unauthenticated API Call (should fail)**
```bash
curl -X POST https://your-domain.vercel.app/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"test","context":"","history":[]}'

# Expected: 401 Unauthorized
```

**Test 2: New User Signup**
- Visit: https://your-domain.vercel.app/signup
- Create account with email/password
- Expected: Success, redirected to dashboard

**Test 3: User Login**
- Visit: https://your-domain.vercel.app/login
- Login with test account
- Expected: Success, authenticated

**Test 4: Admin Login**
- Visit: https://your-domain.vercel.app/admin-login
- Enter ADMIN_PASSWORD
- Expected: Redirected to /office

### 4. Monitor Logs

```bash
vercel logs --follow
```

**Look for:**
- ✅ `Firebase Admin SDK initialized with service account`
- ❌ Any errors about missing env vars

---

## 🔒 SECURITY NOTES

### What's Protected:
- ✅ Firebase service account (server-side only)
- ✅ Admin session cookies (httpOnly)
- ✅ API authentication (Bearer tokens)
- ✅ Firestore security rules (deployed)

### What's NOT in Client:
- ❌ Service account credentials
- ❌ Admin passwords
- ❌ Session secrets
- ❌ Private keys

### What IS in Client:
- ✅ Firebase public config (VITE_FIREBASE_*)
- ✅ Firebase API key (public, not sensitive)

**Note:** Firebase API key is safe to expose publicly. It's restricted by:
- Firebase security rules (Firestore)
- Authentication requirements (Firebase Auth)
- Domain restrictions (Firebase Console settings)

---

## 🆘 TROUBLESHOOTING

### Error: "Firebase Admin SDK not initialized"

**Cause:** FIREBASE_SERVICE_ACCOUNT_KEY not set or invalid JSON

**Fix:**
1. Verify env var is set in Vercel
2. Check JSON format (must be single-line)
3. Redeploy after setting

### Error: "Unauthorized" on all API calls

**Cause:** Client not sending Authorization header

**Fix:**
1. Ensure user is logged in
2. Check `apiClient.ts` is being used
3. Verify Firebase Auth is initialized

### Error: "Invalid admin session"

**Cause:** Cookie expired or secret changed

**Fix:**
1. Re-login to admin panel
2. Verify ADMIN_SESSION_SECRET is set
3. Check cookie is being sent

---

## 📞 SUPPORT

For deployment issues, contact platform team or check:
- Vercel Dashboard logs
- Firebase Console error reports
- Browser developer console

---

**End of Environment Variables Guide**
