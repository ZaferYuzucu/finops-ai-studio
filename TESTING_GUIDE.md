# 🧪 Role Separation Testing Guide

## Quick Start

```bash
npm run dev
```

Then open http://localhost:5173 in your browser.

---

## Test Scenarios

### 🔐 Scenario 1: Admin Login & Navigation

**Steps:**
1. Go to `/admin-login`
2. Enter admin password (for zaferyuzucu@gmail.com)
3. Click "Giriş Yap"

**Expected Results:**
- ✅ Redirected to `/office` (Admin Office homepage)
- ✅ See **dark admin navigation bar** (gray-900 gradient)
- ✅ Admin badge visible in header (yellow badge with "ADMIN")
- ✅ Admin navigation items: Office, Admin Panel, User Management, etc.
- ✅ **NO regular user navbar** (blue navbar should NOT appear)
- ✅ **NO footer** visible
- ✅ **NO chat widget** visible
- ✅ Email shown in header: zaferyuzucu@gmail.com

**Admin Navigation Test:**
- Click "Admin Panel" → Should load `/admin` with dark layout
- Click "User Management" → Should load `/admin/user-management` with dark layout
- Click "Office" → Should load `/office` with dark layout
- All admin pages should have the same dark admin navigation

**Admin Route Protection Test:**
1. While logged in as admin, manually navigate to `/dashboard` in URL bar
   - **Expected**: Immediately redirected to `/office`
2. Try to access `/settings`
   - **Expected**: Immediately redirected to `/office`
3. Try to access `/kutuphane`
   - **Expected**: Immediately redirected to `/office`

**Admin Logout Test:**
- Click "Çıkış" button in admin header
- **Expected**: Redirected to `/admin-login`

---

### 👤 Scenario 2: Regular User Login & Navigation

**Steps:**
1. Open a new incognito/private window
2. Go to `/login`
3. Enter user credentials (any non-admin user)
4. Click "Giriş Yap"

**Expected Results:**
- ✅ Redirected to `/dashboard` (User Dashboard)
- ✅ See **regular blue navbar** at top
- ✅ User email shown in navbar dropdown
- ✅ Footer visible at bottom
- ✅ Chat widget visible in bottom-right corner
- ✅ **NO admin navigation** (no dark admin bar)
- ✅ **NO admin badge**

**User Navigation Test:**
- Click user avatar in navbar → Dropdown should show:
  - Dashboard
  - Veri Kütüphanem
  - Ayarlar
  - Çıkış Yap
- Click "Dashboard" → Should load `/dashboard`
- Click "Ayarlar" → Should load `/settings`
- All should have regular blue navbar

**User Route Protection Test:**
1. While logged in as regular user, manually navigate to `/admin` in URL bar
   - **Expected**: Redirected to `/login` or shown access denied
2. Try to access `/office`
   - **Expected**: Redirected to `/login` or shown access denied
3. Try to access `/admin/user-management`
   - **Expected**: Redirected to `/login` or shown access denied

**User Logout Test:**
- Click user avatar dropdown
- Click "Çıkış Yap"
- **Expected**: Redirected to `/` (homepage)

---

### 🌐 Scenario 3: Public Pages (No Login Required)

**Test Pages:**
- `/` - Homepage ✅ Should work
- `/pricing` - Pricing page ✅ Should work
- `/blog` - Blog page ✅ Should work
- `/solutions/financial-data-analysis` ✅ Should work
- `/veri-hazirlama` ✅ Should work
- `/veri-kaynaklari` ✅ Should work

**Expected Results:**
- All public pages accessible without login
- Regular blue navbar shown
- Footer shown
- Login/Signup buttons visible in navbar

---

### 🔄 Scenario 4: Login/Logout Cycles

**Admin Cycle:**
1. Login as admin → `/office` (dark UI)
2. Logout → `/admin-login`
3. Login again → `/office` (dark UI)
✅ Should consistently show dark admin interface

**User Cycle:**
1. Login as user → `/dashboard` (blue UI)
2. Logout → `/` (homepage)
3. Login again → `/dashboard` (blue UI)
✅ Should consistently show regular user interface

---

### 🚫 Scenario 5: UI Element Visibility

**When Logged in as ADMIN:**
- ❌ Blue navbar should NOT appear
- ❌ Footer should NOT appear
- ❌ Chat widget should NOT appear
- ❌ User dropdown should NOT appear
- ❌ "Giriş" or "Kayıt Ol" buttons should NOT appear
- ✅ Dark admin navbar SHOULD appear
- ✅ Admin badge SHOULD appear
- ✅ Admin navigation links SHOULD appear

**When Logged in as USER:**
- ❌ Dark admin navbar should NOT appear
- ❌ Admin badge should NOT appear
- ❌ Admin navigation links should NOT appear
- ✅ Blue navbar SHOULD appear
- ✅ Footer SHOULD appear
- ✅ Chat widget SHOULD appear
- ✅ User dropdown SHOULD appear

**When NOT Logged in:**
- ✅ Blue navbar SHOULD appear
- ✅ Footer SHOULD appear
- ✅ "Giriş" and "Kayıt Ol" buttons SHOULD appear
- ❌ User dropdown should NOT appear
- ❌ Admin navigation should NOT appear

---

## Console Checks

### Open Browser DevTools Console

**Admin Login Success:**
```
✅ Yönetici email tespit edildi, panel erişimi açık
✅ Admin access granted
```

**Admin Blocked from User Route:**
```
🚫 Admin cannot access user routes - redirecting to office
```

**User Blocked from Admin Route:**
```
❌ Admin access denied - redirecting to admin login
```

---

## Mobile Responsiveness Test

### Admin Mobile Menu (< 768px width):
1. Reduce browser width to mobile size
2. Login as admin
3. Click hamburger menu (☰) in admin header
4. **Expected**: Dark mobile menu slides down with admin navigation items

### User Mobile Menu (< 768px width):
1. Open in mobile size
2. Login as regular user
3. Click hamburger menu in blue navbar
4. **Expected**: User mobile menu with Solutions, Resources, Pricing, etc.

---

## Edge Cases

### Edge Case 1: Direct URL Access (Not Logged In)
- Access `/admin` directly → Should redirect to `/admin-login`
- Access `/office` directly → Should redirect to `/admin-login`
- Access `/dashboard` directly → Should redirect to `/login`

### Edge Case 2: Invalid Session
- Clear localStorage
- Refresh page
- Should show login page (either `/login` or `/admin-login` depending on route)

### Edge Case 3: Multiple Tabs
1. Tab 1: Login as admin
2. Tab 2: Should also see admin interface
3. Logout in Tab 1
4. Refresh Tab 2 → Should be logged out

---

## Checklist Summary

### Admin Flow:
- [ ] Login via `/admin-login` works
- [ ] Redirected to `/office` after login
- [ ] Dark admin navigation visible
- [ ] Can access all `/admin/*` routes
- [ ] Regular navbar NOT visible
- [ ] Footer NOT visible
- [ ] Chat widget NOT visible
- [ ] Blocked from `/dashboard`, `/settings`
- [ ] Logout returns to `/admin-login`

### User Flow:
- [ ] Login via `/login` works
- [ ] Redirected to `/dashboard` after login
- [ ] Blue navbar visible
- [ ] Can access `/dashboard`, `/settings`, `/kutuphane`
- [ ] Footer visible
- [ ] Chat widget visible
- [ ] Admin navbar NOT visible
- [ ] Blocked from `/admin`, `/office`
- [ ] Logout returns to `/`

### Public Pages:
- [ ] Homepage accessible
- [ ] Pricing page accessible
- [ ] Blog pages accessible
- [ ] Solution pages accessible

---

## Issue Reporting

If any test fails, report:
1. Which scenario failed
2. What you expected to see
3. What you actually saw
4. Browser console errors (if any)
5. Screenshots (if helpful)

---

**Testing Status**: Ready for QA
**Build**: ✅ Passing
**Linter**: ✅ No errors
