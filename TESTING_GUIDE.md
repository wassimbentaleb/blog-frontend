# 🧪 Testing Guide - Blog Website Frontend

## ✅ Mock Data Setup Complete!

Your React blog frontend is now configured to work with **mock data** - no backend needed for testing!

---

## 📋 Test Credentials

### Admin Account (Full Access)
```
Email: admin@blog.com
Password: password
```

### Regular User Account (Limited Access)
```
Email: user@blog.com
Password: password
```

---

## 🚀 How to Start Testing

### 1. Start the Development Server

```bash
npm start
```

The app will open at: **http://localhost:3000**

### 2. Test Public Pages (No Login Required)

#### Home Page
- **URL:** http://localhost:3000
- **What to Test:**
  - View 6 sample blog posts in a grid
  - Click on any post card to view details
  - Check header navigation
  - Check footer links
  - Test responsive design (resize browser)

#### Single Post Page
- **URL:** http://localhost:3000/post/impact-of-technology-on-workplace
- **What to Test:**
  - View full post content
  - See formatted text (headings, paragraphs, blockquotes)
  - View featured image
  - Check author info
  - Navigate back to home

---

## 🔐 Test Authentication Flow

### 3. Test Login

1. Go to: http://localhost:3000/login
2. Enter credentials:
   - Email: `admin@blog.com`
   - Password: `password`
3. Click **Login**
4. You should be redirected to Admin Dashboard

**What to Test:**
- ✅ Email validation
- ✅ Password show/hide toggle
- ✅ "Remember me" checkbox
- ✅ Error message with wrong password
- ✅ Redirect to dashboard on success
- ✅ Header shows "Welcome, Admin User"
- ✅ "Dashboard" button appears in header
- ✅ "Logout" button appears

### 4. Test Register

1. Go to: http://localhost:3000/register
2. Fill in the form:
   - Name: `Test User`
   - Email: `test@test.com`
   - Password: `password123`
   - Confirm Password: `password123`
3. Check "I agree to Terms"
4. Click **Create Account**

**What to Test:**
- ✅ All fields validation
- ✅ Password strength indicator
- ✅ Password match validation
- ✅ Email format validation
- ✅ Show/hide password toggles
- ✅ Success registration (creates new user)

### 5. Test Logout

1. While logged in, click **Logout** button
2. You should be redirected to home page
3. Header should show "Login" button again

---

## 👨‍💼 Test Admin Dashboard

**Login as admin first!**

### 6. Dashboard Home
- **URL:** http://localhost:3000/admin/dashboard
- **What to Test:**
  - View statistics cards (Total Posts, Published, Drafts, Views)
  - See "Recent Posts" table
  - Click "Create New Post" button
  - Click "View All Posts" button
  - Click "Manage Categories" button
  - Test sidebar navigation
  - Click "View Site" link

### 7. All Posts Page
- **URL:** http://localhost:3000/admin/posts
- **What to Test:**
  - View all 6 sample posts in table
  - **Search:** Type "technology" in search box
  - **Filter by Status:** Select "Published" or "Draft"
  - **Filter by Category:** Select "Technology", "Travel", etc.
  - Click **View** icon (opens post in new tab)
  - Click **Edit** button (goes to edit page)
  - Click **Delete** button (shows confirmation dialog)
  - Test pagination controls (Previous/Next)

### 8. Add New Post
- **URL:** http://localhost:3000/admin/posts/new
- **What to Test:**

**Title:**
- Type a post title

**Rich Text Editor:**
- Type some content
- Test **Bold, Italic, Underline**
- Add headings (H1, H2, H3)
- Create ordered/bullet lists
- Add a blockquote
- Change text color
- Test all toolbar buttons

**Excerpt:**
- Type a short description
- Watch character counter

**Category:**
- Select "Technology"

**Featured Image:**
- Click "Choose File"
- Upload an image (JPG, PNG)
- See preview appear
- Click "Remove Image"

**Status:**
- Select "Draft" or "Published"

**Actions:**
- Click **"Save as Draft"** or **"Publish Post"**
- See success message
- Redirect to All Posts page
- See your new post in the list

### 9. Edit Post
- **URL:** http://localhost:3000/admin/posts/edit/1
- **What to Test:**
  - See pre-filled data (title, content, excerpt)
  - See existing featured image
  - See selected category
  - Modify the title
  - Edit content in rich text editor
  - Change category
  - Upload new image
  - Change status
  - Click **"Update Post"**
  - See success message
  - Click **"Delete Post"**
  - Confirm deletion
  - See post removed from list

### 10. Categories Management
- **URL:** http://localhost:3000/admin/categories
- **What to Test:**

**View Categories:**
- See 4 sample categories in cards
- Check category name, slug, description
- See post count badge

**Add Category:**
- Click **"Add Category"** button
- Fill in name: "Sports"
- Fill in description: "Sports news"
- Click **"Create"**
- See new category card

**Edit Category:**
- Click **"Edit"** on any category
- Change name to "Tech News"
- Change description
- Click **"Update"**
- See updated category

**Delete Category:**
- Click **"Delete"** on any category
- Confirm deletion
- See category removed

---

## 📊 Mock Data Available

### Users (2)
1. Admin User (admin@blog.com) - Full access
2. John Doe (user@blog.com) - Regular user

### Posts (6)
1. The Impact of Technology on the Workplace - Published
2. Top 10 Travel Destinations for 2024 - Published
3. How to Build a Successful Startup - Draft
4. Healthy Living Tips - Published
5. The Future of AI and Machine Learning - Draft
6. Digital Marketing Strategies - Published

### Categories (4)
1. Technology (12 posts)
2. Travel (8 posts)
3. Business (6 posts)
4. Lifestyle (10 posts)

---

## 🎯 Testing Checklist

### Public Pages
- [ ] Home page loads with posts
- [ ] Post cards display correctly
- [ ] Click on post opens single post page
- [ ] Single post shows full content
- [ ] Header navigation works
- [ ] Footer links display

### Authentication
- [ ] Login with correct credentials works
- [ ] Login with wrong credentials shows error
- [ ] Register creates new user
- [ ] Password strength indicator works
- [ ] Logout redirects to home
- [ ] Protected routes redirect to login

### Admin Dashboard
- [ ] Dashboard shows statistics
- [ ] Recent posts table displays
- [ ] Quick actions work
- [ ] Sidebar navigation works

### Posts Management
- [ ] All posts page shows posts table
- [ ] Search filters posts
- [ ] Status filter works
- [ ] Category filter works
- [ ] Add new post creates post
- [ ] Rich text editor works
- [ ] Image upload works
- [ ] Edit post loads existing data
- [ ] Update post saves changes
- [ ] Delete post removes post

### Categories Management
- [ ] Categories display in grid
- [ ] Add category modal opens
- [ ] Create category works
- [ ] Edit category updates data
- [ ] Delete category removes it

### Responsive Design
- [ ] Mobile view works (< 768px)
- [ ] Tablet view works (768px - 1024px)
- [ ] Desktop view works (> 1024px)
- [ ] Sidebar collapses on mobile

---

## 🐛 Known Behaviors (Expected)

1. **Data Persistence:**
   - Mock data is stored in memory
   - Refreshing the page resets data
   - New posts/categories disappear on refresh
   - This is normal - real backend will persist data

2. **Image Upload:**
   - Images are converted to local URLs
   - They won't persist after refresh
   - This is demo behavior

3. **Authentication:**
   - Token is stored in localStorage
   - Stays logged in after refresh
   - Use mock credentials listed above

---

## 🔧 Switching to Real Backend

When Laravel backend is ready, change this line in `src/context/AuthContext.tsx`:

```typescript
// Change from:
const USE_MOCK_API = true;

// To:
const USE_MOCK_API = false;
```

Then update `src/services/api.ts` with your Laravel API URL.

---

## 📝 Sample Content for Testing

### Sample Post Title
```
10 Tips for Productive Remote Work in 2024
```

### Sample Post Content (paste in editor)
```html
<h2>Introduction</h2>
<p>Remote work has become the new normal for millions of professionals worldwide. Here are our top tips to stay productive.</p>

<h2>1. Create a Dedicated Workspace</h2>
<p>Having a specific area for work helps maintain work-life balance and increases focus.</p>

<blockquote>"The key to successful remote work is creating boundaries between work and personal life."</blockquote>

<h2>2. Stick to a Schedule</h2>
<p>Maintain regular working hours to establish routine and discipline.</p>

<p>Remember, productivity is about working smarter, not harder!</p>
```

### Sample Excerpt
```
Remote work has become the new normal. Discover 10 essential tips to boost your productivity and maintain work-life balance while working from home.
```

---

## 💡 Tips for Best Testing Experience

1. **Use Chrome DevTools:**
   - F12 to open developer tools
   - Check Console for errors
   - Test responsive views

2. **Test Different Scenarios:**
   - Try leaving fields empty
   - Test with very long text
   - Upload large images (should show error > 5MB)
   - Try duplicate emails on register

3. **Check Network Tab:**
   - See mock API delays (500ms)
   - Verify data being sent

4. **Test User Flows:**
   - Complete journey: Home → Read Post → Login → Create Post → View on Public
   - Test edge cases

---

## ✅ What's Working

- ✅ Complete authentication system
- ✅ Public blog with 6 sample posts
- ✅ Admin dashboard with statistics
- ✅ Full CRUD for posts
- ✅ Full CRUD for categories
- ✅ Rich text editor with formatting
- ✅ Image upload and preview
- ✅ Search and filter functionality
- ✅ Responsive design
- ✅ Protected routes
- ✅ Role-based access control

---

## 🎉 Ready to Test!

Everything is set up and ready. Start with the public pages, then login as admin to test the dashboard.

**Have fun testing!** 🚀

If you find any issues or want to add features, let me know!

---

## 📧 Need Help?

If something doesn't work:
1. Check browser console for errors (F12)
2. Verify you're using correct test credentials
3. Make sure `npm start` is running
4. Clear browser cache and localStorage
5. Restart the development server

**Enjoy exploring your blog website!** ✨
