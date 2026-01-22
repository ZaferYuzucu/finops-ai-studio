# SECURITY LOCK

**Date:** January 20, 2026  
**Purpose:** Define immutable security boundaries and locked behaviors  
**Classification:** CRITICAL - MUST READ BEFORE ANY CODE CHANGES

---

## 🔒 WHAT IS A SECURITY LOCK?

A **Security Lock** is a contractual agreement that certain code behaviors **MUST NOT CHANGE** without explicit security team approval.

**Locked behaviors** are:
- Security-critical
- Compliance-related
- Production-verified
- User-safety-dependent

**Changing locked behavior without approval = SECURITY INCIDENT**

---

## 🔴 CRITICAL SECURITY LOCKS

### LOCK #1: Firebase Authentication is MANDATORY

**Contract:**
```typescript
// SECURITY-CRITICAL: Firebase Authentication REQUIRED
// DO NOT revert to localStorage auth
// DO NOT add client-side auth bypass
```

**What this means:**
- ✅ Authentication MUST use Firebase Auth
- ❌ NEVER store passwords client-side
- ❌ NEVER use localStorage for sessions
- ❌ NEVER add development bypass flags

**Files protected:**
- `src/context/AuthContext.tsx`
- `src/components/ProtectedRoute.tsx`
- `src/components/AdminProtectedRoute.tsx`

**Why locked:**
- Previous localStorage auth had 17 critical vulnerabilities
- Firebase Auth is industry-standard
- Required for compliance (KVKK/GDPR)

**To change:** Security team approval + full security audit

---

### LOCK #2: All Data MUST Use Firestore

**Contract:**
```typescript
// SECURITY-CRITICAL: Firestore storage ONLY
// DO NOT store sensitive data in localStorage
// DO NOT store sensitive data in IndexedDB
// DO NOT store sensitive data in memory without persistence
```

**What this means:**
- ✅ User data MUST be stored in Firestore
- ❌ NEVER use localStorage for user data
- ❌ NEVER use IndexedDB for sensitive data
- ✅ Temporary caching allowed (non-sensitive data only)

**Files protected:**
- `src/services/firestoreDataService.ts`
- All components using data storage

**Why locked:**
- Browser storage is unencrypted
- KVKK/GDPR require encrypted storage
- Users expect data to persist across devices

**To change:** Security team approval + data migration plan

---

### LOCK #3: Firestore Security Rules MUST Enforce Isolation

**Contract:**
```javascript
// SECURITY-CRITICAL: Per-user data isolation
// Users can ONLY access their own data
// Cross-user reads MUST be blocked
// Admin-only access for admin collections
```

**What this means:**
- ✅ Every collection MUST have owner check
- ❌ NEVER allow list without ownership verification
- ❌ NEVER allow cross-user data access
- ✅ Default rule: `allow read, write: if false;`

**Files protected:**
- `firestore.rules`

**Why locked:**
- Required for multi-tenancy
- Privacy regulation compliance
- User trust

**To change:** Security team approval + rule testing

---

### LOCK #4: All API Routes MUST Require Auth

**Contract:**
```typescript
// SECURITY-CRITICAL: Authentication REQUIRED
export default async function handler(req, res) {
  const user = await requireAuth(req, res);
  if (!user) return; // 401 already sent
  
  // Proceed with authenticated request
}
```

**What this means:**
- ✅ ALL `/api/*` routes MUST call `requireAuth()` or `requireAdmin()`
- ❌ NEVER allow anonymous API access
- ❌ NEVER skip token verification
- ✅ Return 401 for missing/invalid tokens

**Files protected:**
- `api/_lib/firebaseAuth.ts`
- All files in `api/**/*.ts`

**Why locked:**
- Prevents API abuse
- Protects OpenAI budget
- Ensures user accountability

**To change:** Security team approval + rate limit implementation

---

### LOCK #5: Admin Role MUST Be Server-Verified

**Contract:**
```typescript
// SECURITY-CRITICAL: Admin verification from Firestore
// DO NOT check localStorage for admin status
// DO NOT allow client-side admin promotion
```

**What this means:**
- ✅ Admin status MUST come from Firestore `users/{uid}` document
- ❌ NEVER use localStorage/sessionStorage admin flags
- ❌ NEVER allow users to set their own role
- ✅ Admin role set only via Firebase Console or Admin SDK

**Files protected:**
- `src/components/AdminProtectedRoute.tsx`
- `firestore.rules` (role update prevention)

**Why locked:**
- Previous localStorage admin check was trivially bypassable
- Privilege escalation prevention
- Audit trail requirement

**To change:** Security team approval + audit log implementation

---

### LOCK #6: GDPR/KVKK Compliance Functions MUST Exist

**Contract:**
```typescript
// SECURITY-CRITICAL: Data subject rights implementation
// deleteAllUserData() - GDPR Article 17, KVKK Article 7
// exportAllUserData() - GDPR Article 20
```

**What this means:**
- ✅ `deleteAllUserData()` MUST completely erase all user data
- ✅ `exportAllUserData()` MUST export all user data in standard format
- ❌ NEVER disable these functions
- ❌ NEVER make deletion/export incomplete

**Files protected:**
- `src/services/firestoreDataService.ts` lines 350-420

**Why locked:**
- Legal requirement (GDPR/KVKK)
- User rights
- Regulatory compliance

**To change:** Cannot be removed (legal requirement)

---

### LOCK #7: No Hardcoded Secrets

**Contract:**
```typescript
// SECURITY-CRITICAL: NO hardcoded secrets
// NO default passwords
// NO fallback credentials
```

**What this means:**
- ❌ NEVER hardcode passwords
- ❌ NEVER add default admin credentials
- ❌ NEVER use weak fallback secrets
- ✅ ALL secrets MUST come from environment variables
- ✅ Application MUST fail if secrets missing

**Files protected:**
- All files

**Why locked:**
- Previous code had `'ATA1923'` hardcoded admin password
- Secrets in code = public knowledge
- Security 101

**To change:** Never (this is permanent)

---

## 🟡 OPERATIONAL LOCKS

### LOCK #8: Environment Variables Must Be Validated

**Contract:**
```typescript
// SECURITY-CRITICAL: Validate secrets on startup
if (!process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
  throw new Error('CRITICAL: Missing Firebase service account');
}
```

**What this means:**
- ✅ API routes MUST check for required env vars
- ✅ Missing env vars MUST cause startup failure
- ❌ NEVER use silent fallbacks for security configs

**Why locked:**
- Prevents production deployment with missing secrets
- Makes configuration errors explicit

**To change:** Security team approval

---

### LOCK #9: Firestore Backups MUST Be Enabled

**Contract:**
```
Firebase Console → Firestore → Backups → ENABLED
Retention: Minimum 7 days
```

**What this means:**
- ✅ Automatic backups MUST be enabled
- ✅ Minimum 7-day retention
- ❌ NEVER disable backups in production

**Why locked:**
- Data loss prevention
- Disaster recovery
- User data protection

**To change:** Can increase retention, cannot disable

---

### LOCK #10: Security Headers MUST Be Present

**Contract:**
```json
// vercel.json - SECURITY-CRITICAL headers
{
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-XSS-Protection": "1; mode=block",
  "Referrer-Policy": "strict-origin-when-cross-origin"
}
```

**What this means:**
- ✅ Security headers MUST be configured
- ❌ NEVER remove security headers
- ✅ Can add more headers (e.g., CSP)

**Files protected:**
- `vercel.json`

**Why locked:**
- OWASP best practices
- XSS protection
- Clickjacking prevention

**To change:** Can add headers, cannot remove

---

## 📋 CHANGE REQUEST PROCESS

### If you need to modify locked behavior:

**Step 1: Document the request**
- What behavior needs to change?
- Why is it necessary?
- What is the alternative approach?
- What are the security implications?

**Step 2: Security review**
- Submit to security team
- Wait for security analysis
- Address security concerns

**Step 3: Approval**
- Security team approves OR rejects
- If approved, security team updates this document
- THEN proceed with changes

**Step 4: Verification**
- Implement changes
- Security team re-tests
- Update VERIFIED_SECURITY_CLAIMS.md

**Timeline:** Minimum 3 business days for security review

---

## ⚠️ EMERGENCY OVERRIDE

### In case of critical security vulnerability:

1. **Immediately** disable affected feature
2. **Notify** security team + CTO
3. **Document** incident
4. **Fix** vulnerability
5. **Re-test** before re-enabling
6. **Update** this document

**Emergency contact:** security@finops.ai (to be established)

---

## 🔍 LOCK VERIFICATION

### How to verify locks are intact:

**Automated checks:**
```bash
# Check for localStorage auth (should be zero)
grep -r "localStorage.getItem.*user" src/
grep -r "localStorage.getItem.*admin" src/

# Check for hardcoded passwords (should be zero)
grep -ri "password.*=.*['\"]" src/ api/

# Check for auth bypass flags (should be zero)
grep -r "DISABLE_AUTH" src/ api/
```

**Manual checks:**
1. Login without credentials → Should fail (401)
2. Access `/api/chat` without token → Should fail (401)
3. Set localStorage admin flag → Should NOT grant admin access
4. Clear browser cache → Data should persist (Firestore)

---

## 📊 LOCK STATUS DASHBOARD

| Lock # | Name | Status | Last Verified | Next Review |
|--------|------|--------|---------------|-------------|
| 1 | Firebase Auth Mandatory | ✅ ACTIVE | 2026-01-20 | 2026-02-20 |
| 2 | Firestore Only Storage | ✅ ACTIVE | 2026-01-20 | 2026-02-20 |
| 3 | Security Rules Isolation | ✅ ACTIVE | 2026-01-20 | 2026-02-20 |
| 4 | API Auth Required | ✅ ACTIVE | 2026-01-20 | 2026-02-20 |
| 5 | Server-Verified Admin | ✅ ACTIVE | 2026-01-20 | 2026-02-20 |
| 6 | GDPR/KVKK Functions | ✅ ACTIVE | 2026-01-20 | 2026-02-20 |
| 7 | No Hardcoded Secrets | ✅ ACTIVE | 2026-01-20 | 2026-02-20 |
| 8 | Env Var Validation | ⚠️ PARTIAL | 2026-01-20 | 2026-02-20 |
| 9 | Firestore Backups | ✅ ACTIVE | 2026-01-20 | 2026-02-20 |
| 10 | Security Headers | ✅ ACTIVE | 2026-01-20 | 2026-02-20 |

**Overall Security Lock Status:** ✅ **9/10 ACTIVE** (1 partial)

---

## 🎯 CONSEQUENCES OF VIOLATION

### What happens if a lock is violated:

**Development:**
- Code review rejection
- Deployment blocked
- Re-work required

**Production:**
- **Security Incident** declared
- Immediate rollback
- Root cause analysis
- Incident report

**Compliance:**
- Potential KVKK/GDPR violation
- Legal liability
- User data at risk

---

## 📝 LOCK CHANGE HISTORY

| Date | Lock # | Change | Approved By | Reason |
|------|--------|--------|-------------|--------|
| 2026-01-20 | ALL | Initial locks established | Security Lead | Security restoration |

---

**REMEMBER:**

🔒 **IF IT'S LOCKED, DON'T TOUCH IT WITHOUT APPROVAL.**

These locks exist because:
1. Previous versions had critical vulnerabilities
2. User trust depends on these guarantees
3. Legal compliance requires them
4. Production stability needs them

**When in doubt, ask security team first.**

---

**Document Version:** 1.0  
**Last Updated:** 2026-01-20  
**Next Review:** 2026-02-20 (monthly)  
**Owner:** Principal Backend Architect + Security Lead  
**Classification:** INTERNAL - REQUIRED READING
