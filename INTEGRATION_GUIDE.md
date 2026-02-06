# 🔗 Frontend-Backend Integration Guide

Complete guide to integrate your React frontend with Laravel backend.

## Prerequisites

### Backend Requirements
- ✅ Laravel backend installed at `teckblog-backend`
- ✅ MySQL database `teckblog` created
- ✅ Migrations run
- ✅ Database seeded with sample data
- ✅ Laravel server running on `http://localhost:8000`

### Frontend Requirements
- ✅ React app at `untitled`
- ✅ All dependencies installed (`npm install`)
- ✅ API service configured
- ✅ All components updated to use apiService

---

## Step 1: Start Backend Server

### Open Terminal 1 (Backend)

```bash
# Navigate to Laravel backend
cd C:\Users\Hero\WebstormProjects\teckblog-backend

# Start Laravel server
php artisan serve
```

**Expected Output:**
```
Laravel development server started: http://127.0.0.1:8000
```

**⚠️ Keep this terminal running!**

### Verify Backend is Running

Open browser and test:
```
http://localhost:8000/api/categories
```

**Expected Response:** JSON with 5 categories

---

## Step 2: Start Frontend Server

### Open Terminal 2 (Frontend)

```bash
# Navigate to React frontend
cd C:\Users\Hero\WebstormProjects\untitled

# Start React development server
npm start
```

**Expected Output:**
```
Compiled successfully!

You can now view untitled in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000
```

**⚠️ Keep this terminal running!**

---

## Step 3: Test Authentication

### Login as Admin

1. **Open browser:** http://localhost:3000/login

2. **Enter credentials:**
   ```
   Email: admin@teckblog.com
   Password: admin123
   ```

3. **Click "Se connecter"**

### ✅ Expected Results:
- Redirected to `/admin/dashboard`
- Dashboard shows statistics
- Sidebar shows admin menu
- No console errors

### ❌ If Login Fails:

**Problem:** "The provided credentials are incorrect"
**Solution:**
- Make sure you're using `admin@teckblog.com` (not `admin@blog.com`)
- Verify backend seeded: `php artisan db:seed`

**Problem:** "Network Error"
**Solution:**
- Check Laravel is running: http://localhost:8000/api/posts
- Check CORS config in Laravel `config/cors.php`
- Clear browser cache and try again

**Problem:** "401 Unauthorized" after login
**Solution:**
- Clear localStorage: `localStorage.clear()` in browser console
- Login again

---

## Step 4: Test Public Features

### Test 1: View Homepage
1. Go to http://localhost:3000
2. Should see list of blog posts
3. Posts loaded from Laravel database

**✅ Expected:** 4-5 posts displayed with images

### Test 2: View Single Post
1. Click any post card
2. Should navigate to `/post/{slug}`
3. Post content loads from database

**✅ Expected:** Full post with title, content, category

### Test 3: Add Reaction (Must be logged in)
1. On single post page
2. Click any reaction button (❤️ J'adore, 👍 J'aime, etc.)
3. Counter should increment
4. Button should highlight

**✅ Expected:**
- Reaction saved to database
- Count updates immediately
- Button shows active state

### Test 4: Add Comment (Logged in users)
1. Scroll to comments section
2. Write a comment
3. Click "Publier le commentaire"

**✅ Expected:**
- Comment appears immediately (auto-approved)
- Shows your username
- Can reply to comment

### Test 5: Add Comment (Guest user)
1. Logout
2. Go to any post
3. Add comment with name/email (optional)
4. Click "Publier le commentaire"

**✅ Expected:**
- Comment submitted
- Message about moderation
- Comment not visible until approved

---

## Step 5: Test Admin Features

### Login as Admin
```
Email: admin@teckblog.com
Password: admin123
```

### Test 1: Dashboard Statistics
1. Go to `/admin/dashboard`
2. Should see stat cards

**✅ Expected:**
- Total posts count
- Published posts count
- Pending comments count
- All data from database

### Test 2: Create New Post
1. Click "Add New Post" in sidebar
2. Fill form:
   - Title: "Test Post Integration"
   - Content: "This is a test post"
   - Category: Select any
   - Status: Published
3. Click "Create Post"

**✅ Expected:**
- Success message
- Redirected to all posts
- New post appears in list
- Post visible on public homepage

### Test 3: Edit Post
1. Go to "All Posts"
2. Click edit icon on any post
3. Change title
4. Click "Update Post"

**✅ Expected:**
- Success message
- Post updated in database
- Changes visible on public page

### Test 4: Delete Post
1. Go to "All Posts"
2. Click delete icon on a post
3. Confirm deletion

**✅ Expected:**
- Post removed from list
- Post deleted from database
- Not visible on public homepage

### Test 5: Manage Categories
1. Go to "Categories" in sidebar
2. Add new category:
   - Name: "DevOps"
   - Click "Add Category"

**✅ Expected:**
- Category appears in list
- Available in post creation dropdown

### Test 6: Moderate Comments
1. Go to "Comments" in sidebar
2. See list of all comments
3. Find pending comment (orange badge)
4. Click green check icon to approve

**✅ Expected:**
- Comment status changes to approved
- Comment visible on public post
- Success message appears

---

## Step 6: Verify Data Persistence

### Test Database Storage

1. **Create a post** in admin panel
2. **Close browser** completely
3. **Reopen browser** and go to homepage
4. **Post should still be there** (loaded from MySQL)

### Test Authentication Persistence

1. **Login** as admin
2. **Refresh page** (F5)
3. **Should remain logged in** (token in localStorage)

### Test Comments Persistence

1. **Add a comment** on a post
2. **Navigate away** to another post
3. **Come back** to first post
4. **Comment should still be there**

---

## Integration Checklist

### Backend ✅
- [x] Laravel running on port 8000
- [x] Database connected and seeded
- [x] CORS configured for localhost:3000
- [x] Sanctum installed and configured
- [x] All migrations run
- [x] Sample data exists

### Frontend ✅
- [x] React running on port 3000
- [x] API base URL: http://localhost:8000/api
- [x] Token key: auth_token
- [x] All components use apiService
- [x] AuthContext uses real API
- [x] Error handling configured

### API Endpoints ✅
- [x] GET /api/posts - Working
- [x] GET /api/posts/{slug} - Working
- [x] POST /api/login - Working
- [x] POST /api/register - Working
- [x] GET /api/me - Working
- [x] POST /api/admin/posts - Working
- [x] GET /api/admin/stats - Working
- [x] GET /api/admin/comments - Working
- [x] POST /api/posts/{id}/comments - Working
- [x] POST /api/posts/{id}/reactions - Working

---

## Troubleshooting Common Issues

### Issue 1: CORS Error in Console

**Error Message:**
```
Access to XMLHttpRequest at 'http://localhost:8000/api/posts'
from origin 'http://localhost:3000' has been blocked by CORS policy
```

**Solution:**

1. Check `config/cors.php` in Laravel:
```php
'allowed_origins' => [env('FRONTEND_URL', 'http://localhost:3000')],
'supports_credentials' => true,
```

2. Check `.env` in Laravel:
```
FRONTEND_URL=http://localhost:3000
```

3. Restart Laravel server:
```bash
php artisan serve
```

### Issue 2: 500 Internal Server Error

**Solution:**

1. Check Laravel logs:
```bash
tail -f storage/logs/laravel.log
```

2. Common causes:
   - Database not connected
   - Missing migrations
   - Syntax error in controller

3. Run diagnostics:
```bash
php artisan config:clear
php artisan cache:clear
php artisan route:clear
```

### Issue 3: Token Not Sending

**Error:** "Unauthenticated" when accessing protected routes

**Solution:**

1. Check browser console → Application → Local Storage
2. Verify `auth_token` exists
3. Check `api.ts` interceptor:
```typescript
const token = localStorage.getItem('auth_token'); // Must match!
```

4. Clear and re-login:
```javascript
localStorage.clear()
// Then login again
```

### Issue 4: Empty Response from API

**Problem:** API returns `[]` or `null`

**Solution:**

1. Check database has data:
```bash
php artisan tinker
Post::count()  // Should return > 0
```

2. If empty, seed again:
```bash
php artisan db:seed
```

3. Verify in browser:
```
http://localhost:8000/api/posts
```

### Issue 5: Image Upload Not Working

**Solution:**

1. Create storage link:
```bash
php artisan storage:link
```

2. Check permissions:
```bash
chmod -R 775 storage
chmod -R 775 bootstrap/cache
```

3. Verify route exists:
```bash
php artisan route:list | grep upload
```

---

## API Testing with Postman (Optional)

### Test Login
```
POST http://localhost:8000/api/login
Body (JSON):
{
  "email": "admin@teckblog.com",
  "password": "admin123"
}
```

**Expected Response:**
```json
{
  "user": {
    "id": 1,
    "name": "Admin User",
    "email": "admin@teckblog.com",
    "role": "admin"
  },
  "token": "1|xxxxxxxxxxxxx"
}
```

### Test Get Posts (No Auth Required)
```
GET http://localhost:8000/api/posts
```

**Expected Response:**
```json
{
  "data": [
    {
      "id": 1,
      "title": "Post Title",
      "slug": "post-title",
      ...
    }
  ]
}
```

### Test Admin Endpoint (Auth Required)
```
GET http://localhost:8000/api/admin/stats
Headers:
  Authorization: Bearer {token_from_login}
```

---

## Environment Variables Reference

### Laravel `.env`
```env
APP_URL=http://localhost:8000
FRONTEND_URL=http://localhost:3000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=teckblog
DB_USERNAME=root
DB_PASSWORD=your_password

SANCTUM_STATEFUL_DOMAINS=localhost:3000
SESSION_DOMAIN=localhost
```

### React (Optional - Create `.env` if needed)
```env
REACT_APP_API_URL=http://localhost:8000/api
```

---

## Success Indicators

### ✅ Integration is Working When:

1. **Authentication:**
   - Can login with admin@teckblog.com
   - Token stored in localStorage
   - Stays logged in after refresh
   - Can logout successfully

2. **Public Features:**
   - Homepage loads posts from database
   - Can view single post
   - Can add reactions (when logged in)
   - Can add comments

3. **Admin Features:**
   - Dashboard shows real statistics
   - Can create/edit/delete posts
   - Can manage categories
   - Can moderate comments

4. **Data Persistence:**
   - All changes saved to MySQL
   - Data persists after browser refresh
   - Multiple users can interact simultaneously

5. **No Console Errors:**
   - No CORS errors
   - No 401/403 errors on protected routes
   - No network errors
   - API responses are fast

---

## Final Verification Test

Run this complete test to verify everything works:

### 1. Public User Journey
1. Open incognito window
2. Go to http://localhost:3000
3. Browse posts ✅
4. Click a post ✅
5. Try to add reaction (should prompt login) ✅
6. Add a guest comment ✅

### 2. Admin User Journey
1. Login as admin
2. Go to dashboard - see stats ✅
3. Create a new post ✅
4. Edit the post ✅
5. Go to comments page ✅
6. Approve the guest comment ✅
7. Go back to public post - comment is visible ✅

### 3. Data Verification
1. Open phpMyAdmin or MySQL Workbench
2. Check `posts` table - should see your new post ✅
3. Check `comments` table - should see the comment ✅
4. Check `reactions` table - should see reactions ✅

---

## Next Steps After Integration

### For Development:
1. ✅ Add more sample posts
2. ✅ Test with multiple users
3. ✅ Test on different browsers
4. ✅ Add your own content

### For Production:
1. Deploy Laravel to server
2. Deploy React to hosting (Vercel, Netlify)
3. Update API URL in React
4. Configure production database
5. Set up SSL certificates
6. Configure production CORS

---

## Support

If you encounter issues:

1. **Check Laravel logs:** `storage/logs/laravel.log`
2. **Check browser console:** F12 → Console tab
3. **Check network requests:** F12 → Network tab
4. **Verify servers are running:** Both terminals should be active

---

## Demo Credentials

### Admin Access
```
Email: admin@teckblog.com
Password: admin123
Access: Full admin panel + all features
```

### Regular User
```
Email: user@teckblog.com
Password: user123
Access: Public features + authenticated actions
```

### Guest Access
```
No login required
Access: View posts, add comments (pending approval)
```

---

**🎉 Your Teckblog is now fully integrated!**

Frontend (React) ↔️ Backend (Laravel) ↔️ Database (MySQL)

All features are connected and working end-to-end!
