# 👥 Admin API: List Firebase Authentication Users

**Endpoint:** `/api/admin/list-users`  
**Method:** `GET`  
**Auth:** Admin session required (HMAC cookie)

---

## 📋 DESCRIPTION

Lists all users from Firebase Authentication using Firebase Admin SDK.

**Security:**
- ✅ Server-side only (Vercel function)
- ✅ Requires admin authentication
- ✅ NO passwords returned (Firebase doesn't provide them)
- ✅ Read-only operation

---

## 🔐 AUTHENTICATION

Requires admin session cookie from `/api/admin/login`.

**Example:**
```bash
# 1. Login as admin
curl -X POST https://domain/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"password":"ADMIN_PASSWORD"}' \
  --cookie-jar cookies.txt

# 2. Use cookie to access endpoint
curl https://domain/api/admin/list-users \
  --cookie cookies.txt
```

---

## 📊 QUERY PARAMETERS

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `maxResults` | number | 1000 | Maximum number of users to return (1-1000) |
| `pageToken` | string | - | Token for next page (from previous response) |

**Example:**
```bash
# Get first 100 users
/api/admin/list-users?maxResults=100

# Get next page
/api/admin/list-users?maxResults=100&pageToken=abc123
```

---

## 📤 RESPONSE FORMAT

### Success Response (200 OK)

```json
{
  "success": true,
  "users": [
    {
      "uid": "firebase_user_id_123",
      "email": "user@example.com",
      "emailVerified": true,
      "displayName": "John Doe",
      "photoURL": "https://example.com/photo.jpg",
      "disabled": false,
      "providerData": [
        {
          "providerId": "password",
          "uid": "user@example.com",
          "email": "user@example.com"
        }
      ],
      "metadata": {
        "creationTime": "2026-01-15T10:30:00.000Z",
        "lastSignInTime": "2026-01-22T14:20:00.000Z",
        "lastRefreshTime": "2026-01-22T15:00:00.000Z"
      }
    },
    {
      "uid": "firebase_user_id_456",
      "email": "admin@finops.ist",
      "emailVerified": true,
      "displayName": "Admin User",
      "photoURL": null,
      "disabled": false,
      "providerData": [
        {
          "providerId": "google.com",
          "uid": "google_user_id",
          "displayName": "Admin User",
          "email": "admin@finops.ist",
          "photoURL": "https://lh3.googleusercontent.com/..."
        }
      ],
      "metadata": {
        "creationTime": "2026-01-10T08:00:00.000Z",
        "lastSignInTime": "2026-01-22T12:00:00.000Z",
        "lastRefreshTime": "2026-01-22T13:30:00.000Z"
      }
    }
  ],
  "pageToken": "next_page_token_here",
  "totalCount": 2,
  "hasMore": true
}
```

### Error Response (401 Unauthorized)

```json
{
  "error": "Unauthorized",
  "message": "Admin authentication required"
}
```

### Error Response (500 Internal Server Error)

```json
{
  "error": "Failed to list users",
  "message": "Firebase Admin SDK error details"
}
```

---

## 📝 USER OBJECT FIELDS

| Field | Type | Description |
|-------|------|-------------|
| `uid` | string | Firebase user ID (unique) |
| `email` | string? | User email address |
| `emailVerified` | boolean | Email verification status |
| `displayName` | string? | User display name |
| `photoURL` | string? | Profile photo URL |
| `disabled` | boolean | Account disabled status |
| `providerData` | array | Authentication providers used |
| `metadata.creationTime` | string | Account creation timestamp |
| `metadata.lastSignInTime` | string | Last sign-in timestamp |
| `metadata.lastRefreshTime` | string | Last token refresh timestamp |

---

## 🔍 PROVIDER DATA

Common `providerId` values:

- `password` - Email/password authentication
- `google.com` - Google Sign-In
- `facebook.com` - Facebook Login
- `twitter.com` - Twitter Login
- `github.com` - GitHub Login

**Example:**
```json
{
  "providerId": "password",
  "uid": "user@example.com",
  "email": "user@example.com"
}
```

---

## 🧪 TESTING

### 1. Test Locally (Development)

```bash
# Start dev server
npm run dev

# Login as admin (in another terminal)
curl -X POST http://localhost:5173/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"password":"ATA1923"}' \
  --cookie-jar cookies.txt

# List users
curl http://localhost:5173/api/admin/list-users \
  --cookie cookies.txt | jq .
```

### 2. Test on Production

```bash
# Login
curl -X POST https://finops.vercel.app/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"password":"YOUR_ADMIN_PASSWORD"}' \
  --cookie-jar cookies.txt

# List users
curl https://finops.vercel.app/api/admin/list-users \
  --cookie cookies.txt | jq .
```

### 3. Test Pagination

```bash
# Get first 10 users
curl "https://finops.vercel.app/api/admin/list-users?maxResults=10" \
  --cookie cookies.txt | jq .

# Get next page (use pageToken from response)
curl "https://finops.vercel.app/api/admin/list-users?maxResults=10&pageToken=abc123" \
  --cookie cookies.txt | jq .
```

---

## 🚨 SECURITY NOTES

### ✅ SAFE
- ✅ NO passwords returned (Firebase doesn't store them)
- ✅ NO password hashes returned
- ✅ Admin authentication required
- ✅ Server-side only (cannot be called from client)
- ✅ Read-only operation (no user modification)

### ⚠️ SENSITIVE DATA
- ⚠️ Emails are visible (PII)
- ⚠️ Display names are visible (PII)
- ⚠️ UIDs are visible (can be used to query Firestore)
- ⚠️ Login timestamps are visible (privacy concern)

**Recommendation:**
- Only expose to authorized admins
- Log all access to this endpoint
- Consider implementing IP whitelist
- Consider implementing rate limiting

---

## 📊 USE CASES

### 1. User Management Dashboard

```typescript
// Fetch all users for admin panel
const response = await fetch('/api/admin/list-users', {
  credentials: 'include' // Include admin session cookie
});

const { users } = await response.json();

// Display in table
users.forEach(user => {
  console.log(`${user.email} - Last sign in: ${user.metadata.lastSignInTime}`);
});
```

### 2. Find Inactive Users

```typescript
const { users } = await fetch('/api/admin/list-users').then(r => r.json());

const thirtyDaysAgo = new Date();
thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

const inactiveUsers = users.filter(user => {
  const lastSignIn = new Date(user.metadata.lastSignInTime || 0);
  return lastSignIn < thirtyDaysAgo;
});

console.log(`Found ${inactiveUsers.length} inactive users`);
```

### 3. Export User List

```bash
# Export to JSON file
curl https://finops.vercel.app/api/admin/list-users \
  --cookie cookies.txt | jq . > users.json

# Export to CSV
curl https://finops.vercel.app/api/admin/list-users \
  --cookie cookies.txt | \
  jq -r '.users[] | [.uid, .email, .metadata.creationTime] | @csv' \
  > users.csv
```

---

## 🔄 PAGINATION

For large user bases (>1000 users), use pagination:

```typescript
async function getAllUsers() {
  let allUsers = [];
  let pageToken = undefined;

  do {
    const url = pageToken 
      ? `/api/admin/list-users?pageToken=${pageToken}`
      : '/api/admin/list-users';
    
    const response = await fetch(url, { credentials: 'include' });
    const data = await response.json();
    
    allUsers = allUsers.concat(data.users);
    pageToken = data.pageToken;
    
    console.log(`Fetched ${allUsers.length} users so far...`);
  } while (pageToken);

  return allUsers;
}
```

---

## 🚀 DEPLOYMENT

Already deployed with your Vercel project.

**URL:** `https://your-domain.vercel.app/api/admin/list-users`

**Environment Variables Required:**
- `FIREBASE_SERVICE_ACCOUNT_KEY` - Firebase Admin SDK credentials
- `ADMIN_PASSWORD` - Admin panel password
- `ADMIN_SESSION_SECRET` - HMAC signing secret

---

## 📞 TROUBLESHOOTING

### Error: "Unauthorized"
- **Cause:** No admin session cookie or expired
- **Fix:** Login again via `/api/admin/login`

### Error: "Failed to list users"
- **Cause:** Firebase Admin SDK not initialized
- **Fix:** Verify `FIREBASE_SERVICE_ACCOUNT_KEY` is set in Vercel

### Error: "Method not allowed"
- **Cause:** Using POST instead of GET
- **Fix:** Use GET method

### Empty users array
- **Cause:** No users in Firebase Authentication
- **Fix:** Create test users via Firebase Console or `/signup`

---

**Endpoint Ready** ✅  
**File:** `api/admin/list-users.ts`  
**Documentation:** This file  
**Status:** Production ready
