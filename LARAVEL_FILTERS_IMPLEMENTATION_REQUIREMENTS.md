# Laravel Backend Filters & Search Implementation Requirements

This document contains all filters and search functionality currently implemented in the React frontend that need to be moved to Laravel backend for better performance and scalability.

---

## 📋 Complete List of Filters & Searches

### 1. **Admin All Posts Page** (`/admin/posts`)

**Current Endpoint:** `GET /api/admin/posts`
**New Endpoint:** `GET /api/admin/posts?search=...&status=...&category=...&page=...`

#### Filters Required:

| Filter Type | Parameter Name | Values | Database Column | Description |
|-------------|---------------|--------|-----------------|-------------|
| **Search** | `search` | Any text | `posts.title` | Search posts by title |
| **Status** | `status` | `all`, `published`, `draft` | `posts.status` | Filter by post status |
| **Category** | `category` | `all`, `Technology`, `Travel`, `Business`, `Lifestyle` | `categories.name` (via join) | Filter by category name |
| **Pagination** | `page` | Integer (1, 2, 3...) | N/A | Page number |
| **Per Page** | `per_page` | Integer (default: 10) | N/A | Results per page |

#### Implementation Details:

**Search Logic:**
```
WHERE posts.title LIKE '%{search}%'
```

**Status Filter Logic:**
```
WHERE posts.status = '{status}'
(Only if status != 'all')
```

**Category Filter Logic:**
```
JOIN categories ON posts.category_id = categories.id
WHERE categories.name = '{category}'
(Only if category != 'all')
```

**Response Structure:**
```json
{
  "data": [
    {
      "id": 1,
      "title": "Post Title",
      "slug": "post-title",
      "status": "published",
      "category": {
        "id": 1,
        "name": "Technology"
      },
      "created_at": "2024-01-15 10:30:00"
    }
  ],
  "current_page": 1,
  "last_page": 5,
  "per_page": 10,
  "total": 50,
  "from": 1,
  "to": 10
}
```

---

### 2. **Admin Comments Moderation Page** (`/admin/comments`)

**Current Endpoint:** `GET /api/admin/comments`
**New Endpoint:** `GET /api/admin/comments?search=...&status=...&page=...`

#### Filters Required:

| Filter Type | Parameter Name | Values | Database Columns | Description |
|-------------|---------------|--------|------------------|-------------|
| **Search** | `search` | Any text | Multiple (see below) | Multi-field search |
| **Status** | `status` | `all`, `pending`, `approved` | `comments.is_approved` | Filter by approval status |
| **Pagination** | `page` | Integer | N/A | Page number |
| **Per Page** | `per_page` | Integer (default: 20) | N/A | Results per page |

#### Multi-Field Search Logic:

The search must look across **4 different fields**:

```
WHERE comments.content LIKE '%{search}%'
   OR users.name LIKE '%{search}%'                    -- Registered user name
   OR comments.author_name LIKE '%{search}%'          -- Guest author name
   OR posts.title LIKE '%{search}%'                   -- Post title
```

**Requires Joins:**
```
LEFT JOIN users ON comments.user_id = users.id
JOIN posts ON comments.post_id = posts.id
```

#### Status Filter Logic:

```
- "all": No filter
- "pending": WHERE comments.is_approved = 0
- "approved": WHERE comments.is_approved = 1
```

#### Response Structure:
```json
{
  "data": [
    {
      "id": 1,
      "post_id": 5,
      "user_id": 2,
      "parent_id": null,
      "author_name": null,
      "author_email": null,
      "content": "Great article!",
      "is_approved": true,
      "created_at": "2024-01-15 10:30:00",
      "user": {
        "id": 2,
        "name": "John Doe",
        "email": "john@example.com"
      },
      "post": {
        "id": 5,
        "title": "Laravel Tutorial",
        "slug": "laravel-tutorial"
      }
    },
    {
      "id": 2,
      "post_id": 3,
      "user_id": null,
      "parent_id": null,
      "author_name": "Anonymous User",
      "author_email": "anon@example.com",
      "content": "Thanks for sharing",
      "is_approved": false,
      "created_at": "2024-01-14 15:20:00",
      "user": null,
      "post": {
        "id": 3,
        "title": "React Hooks Guide",
        "slug": "react-hooks-guide"
      }
    }
  ],
  "current_page": 1,
  "last_page": 3,
  "per_page": 20,
  "total": 45,
  "from": 1,
  "to": 20
}
```

---

### 3. **Public Homepage** (`/`)

**Current Endpoint:** `GET /api/posts`
**New Endpoint:** `GET /api/posts?page=...&per_page=...`

#### Filters Required:

| Filter Type | Parameter Name | Values | Database Column | Description |
|-------------|---------------|--------|-----------------|-------------|
| **Status** | N/A (hardcoded) | `published` only | `posts.status` | Only show published posts |
| **Pagination** | `page` | Integer (default: 1) | N/A | Page number |
| **Per Page** | `per_page` | Integer (default: 9) | N/A | Posts per page (3 rows × 3 columns) |

#### Implementation Details:

**Filters (Auto-Applied):**
```
WHERE posts.status = 'published'
ORDER BY posts.created_at DESC
```

**No search or manual filters needed** - just pagination

**Response Structure:**
```json
{
  "data": [
    {
      "id": 1,
      "title": "Post Title",
      "slug": "post-title",
      "excerpt": "Short description...",
      "featured_image": "http://localhost:8000/storage/images/post-1.jpg",
      "published_at": "2024-01-15",
      "category": {
        "id": 1,
        "name": "Technology",
        "slug": "technology"
      },
      "user": {
        "id": 1,
        "name": "John Doe"
      }
    }
  ],
  "current_page": 1,
  "last_page": 4,
  "per_page": 9,
  "total": 35,
  "from": 1,
  "to": 9
}
```

---

## 🎯 Implementation Priorities

### Priority 1 (High Impact):
1. ✅ **Admin All Posts** - Most used, biggest performance gain
2. ✅ **Admin Comments** - Complex search, many records

### Priority 2 (Medium Impact):
3. ✅ **Public Homepage** - Better UX with pagination

### Priority 3 (Optional):
4. ❓ Categories page doesn't need backend filtering (usually <20 categories)

---

## 📝 Laravel Implementation Checklist

### For Each Endpoint:

#### 1. **Update Controller Method**

```php
// Example: PostController@index

public function index(Request $request)
{
    // 1. Start query
    $query = Post::query()->with(['category', 'user']);

    // 2. Apply search filter
    if ($request->has('search')) {
        $search = $request->input('search');
        $query->where('title', 'LIKE', "%{$search}%");
    }

    // 3. Apply status filter
    if ($request->has('status') && $request->input('status') !== 'all') {
        $query->where('status', $request->input('status'));
    }

    // 4. Apply category filter
    if ($request->has('category') && $request->input('category') !== 'all') {
        $query->whereHas('category', function($q) use ($request) {
            $q->where('name', $request->input('category'));
        });
    }

    // 5. Apply sorting
    $query->orderBy('created_at', 'desc');

    // 6. Paginate
    $perPage = $request->input('per_page', 10);
    $posts = $query->paginate($perPage);

    // 7. Return JSON
    return response()->json($posts);
}
```

#### 2. **Add Route (if not exists)**

```php
// routes/api.php
Route::get('/admin/posts', [PostController::class, 'index'])
    ->middleware(['auth:sanctum', 'admin']);
```

#### 3. **Test Endpoints**

```bash
# Test 1: Basic fetch
GET http://localhost:8000/api/admin/posts

# Test 2: Search
GET http://localhost:8000/api/admin/posts?search=laravel

# Test 3: Status filter
GET http://localhost:8000/api/admin/posts?status=published

# Test 4: Category filter
GET http://localhost:8000/api/admin/posts?category=Technology

# Test 5: Combined filters
GET http://localhost:8000/api/admin/posts?search=react&status=published&category=Technology

# Test 6: Pagination
GET http://localhost:8000/api/admin/posts?page=2&per_page=20
```

---

## 🔍 Specific Implementation Requirements

### **Admin Posts Filtering**

**Controller:** `app/Http/Controllers/PostController.php`

**Method:** `adminIndex()` or update existing `index()`

**Query Parameters:**
- `search` - Search by title
- `status` - Filter by status (published, draft, or all)
- `category` - Filter by category name (Technology, Travel, Business, Lifestyle, or all)
- `page` - Page number
- `per_page` - Results per page (default: 10)

**Database Query:**
```php
$query = Post::with(['category', 'user']);

// Search
if ($search = $request->input('search')) {
    $query->where('title', 'LIKE', "%{$search}%");
}

// Status
if ($status = $request->input('status')) {
    if ($status !== 'all') {
        $query->where('status', $status);
    }
}

// Category
if ($category = $request->input('category')) {
    if ($category !== 'all') {
        $query->whereHas('category', function($q) use ($category) {
            $q->where('name', $category);
        });
    }
}

return $query->orderBy('created_at', 'desc')->paginate(10);
```

---

### **Admin Comments Filtering**

**Controller:** `app/Http/Controllers/CommentController.php`

**Method:** `adminIndex()`

**Query Parameters:**
- `search` - Multi-field search (content, author_name, author_email, post.title)
- `status` - Filter by approval (all, pending, approved)
- `page` - Page number
- `per_page` - Results per page (default: 20)

**Database Query (Complex):**
```php
$query = Comment::with(['user', 'post']);

// Multi-field search
if ($search = $request->input('search')) {
    $query->where(function($q) use ($search) {
        $q->where('content', 'LIKE', "%{$search}%")
          ->orWhere('author_name', 'LIKE', "%{$search}%")
          ->orWhere('author_email', 'LIKE', "%{$search}%")
          ->orWhereHas('user', function($subQ) use ($search) {
              $subQ->where('name', 'LIKE', "%{$search}%");
          })
          ->orWhereHas('post', function($subQ) use ($search) {
              $subQ->where('title', 'LIKE', "%{$search}%");
          });
    });
}

// Status filter
if ($status = $request->input('status')) {
    if ($status === 'pending') {
        $query->where('is_approved', false);
    } elseif ($status === 'approved') {
        $query->where('is_approved', true);
    }
    // 'all' means no filter
}

return $query->orderBy('created_at', 'desc')->paginate(20);
```

---

### **Public Homepage Pagination**

**Controller:** `app/Http/Controllers/PostController.php`

**Method:** `publicIndex()` or existing public method

**Query Parameters:**
- `page` - Page number
- `per_page` - Results per page (default: 9)

**Database Query:**
```php
$posts = Post::with(['category', 'user'])
    ->where('status', 'published')
    ->orderBy('created_at', 'desc')
    ->paginate($request->input('per_page', 9));

return response()->json($posts);
```

---

## 🧪 Testing Examples

### Test Admin Posts Filtering

```bash
# 1. Fetch all posts
curl http://localhost:8000/api/admin/posts \
  -H "Authorization: Bearer YOUR_TOKEN"

# 2. Search for "laravel"
curl "http://localhost:8000/api/admin/posts?search=laravel" \
  -H "Authorization: Bearer YOUR_TOKEN"

# 3. Get only published posts
curl "http://localhost:8000/api/admin/posts?status=published" \
  -H "Authorization: Bearer YOUR_TOKEN"

# 4. Get Technology category posts
curl "http://localhost:8000/api/admin/posts?category=Technology" \
  -H "Authorization: Bearer YOUR_TOKEN"

# 5. Combined filters
curl "http://localhost:8000/api/admin/posts?search=api&status=published&category=Technology" \
  -H "Authorization: Bearer YOUR_TOKEN"

# 6. Pagination
curl "http://localhost:8000/api/admin/posts?page=2&per_page=5" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Test Admin Comments Filtering

```bash
# 1. Fetch all comments
curl http://localhost:8000/api/admin/comments \
  -H "Authorization: Bearer YOUR_TOKEN"

# 2. Search comments (multi-field)
curl "http://localhost:8000/api/admin/comments?search=great" \
  -H "Authorization: Bearer YOUR_TOKEN"

# 3. Get pending comments only
curl "http://localhost:8000/api/admin/comments?status=pending" \
  -H "Authorization: Bearer YOUR_TOKEN"

# 4. Get approved comments only
curl "http://localhost:8000/api/admin/comments?status=approved" \
  -H "Authorization: Bearer YOUR_TOKEN"

# 5. Search pending comments
curl "http://localhost:8000/api/admin/comments?search=john&status=pending" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Test Public Homepage

```bash
# 1. Get first page (9 posts)
curl http://localhost:8000/api/posts

# 2. Get page 2
curl "http://localhost:8000/api/posts?page=2"

# 3. Get 6 posts per page (2 rows × 3 columns)
curl "http://localhost:8000/api/posts?per_page=6"
```

---

## 📊 Expected Response Format

All endpoints should return Laravel's standard pagination format:

```json
{
  "data": [...],              // Array of results
  "current_page": 1,          // Current page number
  "first_page_url": "...",    // URL for first page
  "from": 1,                  // Starting result number
  "last_page": 5,             // Total pages
  "last_page_url": "...",     // URL for last page
  "links": [...],             // Array of pagination links
  "next_page_url": "...",     // URL for next page
  "path": "...",              // Base path
  "per_page": 10,             // Results per page
  "prev_page_url": null,      // URL for previous page
  "to": 10,                   // Ending result number
  "total": 50                 // Total results
}
```

---

## ⚙️ Database Optimization

### Add Indexes for Better Performance

```sql
-- Posts table
ALTER TABLE posts ADD INDEX idx_status (status);
ALTER TABLE posts ADD INDEX idx_created_at (created_at);
ALTER TABLE posts ADD INDEX idx_category_id (category_id);
ALTER TABLE posts ADD FULLTEXT INDEX idx_title (title);

-- Comments table
ALTER TABLE comments ADD INDEX idx_is_approved (is_approved);
ALTER TABLE comments ADD INDEX idx_created_at (created_at);
ALTER TABLE comments ADD INDEX idx_post_id (post_id);
ALTER TABLE comments ADD FULLTEXT INDEX idx_content (content);
ALTER TABLE comments ADD INDEX idx_author_name (author_name);

-- Categories table
ALTER TABLE categories ADD INDEX idx_name (name);
```

These indexes will make filtering and searching much faster.

---

## 🎯 Success Criteria

After implementation, you should be able to:

1. ✅ Search posts by title in admin panel
2. ✅ Filter posts by status (published/draft)
3. ✅ Filter posts by category
4. ✅ Combine multiple filters
5. ✅ Navigate through pages of results
6. ✅ Search comments across multiple fields
7. ✅ Filter comments by approval status
8. ✅ See pagination on public homepage
9. ✅ Load more posts on homepage
10. ✅ Get fast results even with 1000+ posts

---

## 📌 Important Notes

1. **Always validate input** - Use Laravel validation for all query parameters
2. **Sanitize search terms** - Prevent SQL injection (Laravel Query Builder does this automatically)
3. **Set reasonable limits** - Max `per_page` should be 100 to prevent abuse
4. **Return proper status codes** - 200 for success, 400 for validation errors
5. **Include proper CORS headers** - Ensure frontend can access the API
6. **Add authentication** - Admin endpoints require auth:sanctum middleware
7. **Test with large datasets** - Create 1000+ posts to test performance
8. **Monitor performance** - Use Laravel Telescope or Debugbar

---

## 🚀 Next Steps for Laravel Implementation

1. **Update PostController** - Add filtering to `adminIndex()` method
2. **Update CommentController** - Add filtering to `adminIndex()` method
3. **Update public posts endpoint** - Add pagination
4. **Add database indexes** - Run the SQL commands above
5. **Test all endpoints** - Use the curl commands provided
6. **Update API documentation** - Document all new parameters
7. **Deploy and monitor** - Check logs for any issues

---

**Summary:** This document contains everything needed to implement backend filtering and pagination for the Teckblog application. All filter types, parameters, database queries, and expected responses are documented.

Copy this entire document to Claude when asking for Laravel implementation.
