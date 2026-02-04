# Blog Website with Authentication & Post Management
## Complete Implementation Plan - React + Laravel

---

## Overview

This plan extends the basic blog website to include:
- **User Authentication** (Login/Logout)
- **Admin Dashboard** for managing posts
- **Post Creation Interface** (Add, Edit, Delete posts)
- **Role-based Access Control** (Admin vs Regular Users)

---

## Architecture Changes

### Before (Static Blog)
```
User → View Blog Posts → Static HTML/CSS
```

### After (Dynamic Blog with CMS)
```
User → Login → Dashboard → Create/Edit/Delete Posts → Database → Display on Blog
```

### Required Components

1. **Backend Server (Laravel)** - Handle authentication, API requests, database operations
2. **Database (MySQL)** - Store users, posts, categories, comments
3. **Frontend (React)** - Login forms, admin dashboard, post editor, public blog
4. **API Communication** - RESTful API between React and Laravel

---

## Tech Stack - React + Laravel

### Frontend
**React (Latest)**
- React Router for navigation
- Axios for API calls
- TailwindCSS or Material-UI for styling
- React Context API or Redux for state management
- React Quill or TinyMCE for rich text editing

**Build Tool:**
- Create React App (simple and straightforward)

**Why React:**
- Component-based architecture
- Virtual DOM for performance
- Large ecosystem
- Great developer experience
- Easy state management

### Backend
**Laravel 11.x (Latest)**
- Laravel Sanctum for API authentication
- Eloquent ORM for database operations
- Laravel Storage for file uploads
- Laravel Validation for input validation
- Laravel Policies for authorization

**Database:**
- MySQL or PostgreSQL

**Why Laravel:**
- Elegant syntax and structure
- Built-in authentication scaffolding
- Powerful ORM (Eloquent)
- Great documentation
- MVC architecture
- Built-in security features

### Development Environment
- **PHP** 8.2+
- **Composer** (PHP package manager)
- **Node.js** 18+ (for React)
- **npm or yarn** (JavaScript package manager)
- **MySQL** 8.0+ or PostgreSQL
- **XAMPP/WAMP/Laravel Valet/Docker** (local server)

---

## Database Schema

### Users Table
```sql
users
├── id (BIGINT, PRIMARY KEY, AUTO_INCREMENT)
├── name (VARCHAR 255)
├── email (VARCHAR 255, UNIQUE)
├── password (VARCHAR 255, HASHED)
├── role (ENUM: 'admin', 'user', DEFAULT 'user')
├── email_verified_at (TIMESTAMP, NULLABLE)
├── remember_token (VARCHAR 100, NULLABLE)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)
```

### Posts Table
```sql
posts
├── id (BIGINT, PRIMARY KEY, AUTO_INCREMENT)
├── title (VARCHAR 255)
├── slug (VARCHAR 255, UNIQUE)
├── content (TEXT or LONGTEXT)
├── excerpt (TEXT, NULLABLE)
├── featured_image (VARCHAR 255, NULLABLE)
├── category_id (BIGINT, FOREIGN KEY → categories.id)
├── user_id (BIGINT, FOREIGN KEY → users.id)
├── status (ENUM: 'draft', 'published', DEFAULT 'draft')
├── published_at (TIMESTAMP, NULLABLE)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)
```

### Categories Table
```sql
categories
├── id (BIGINT, PRIMARY KEY, AUTO_INCREMENT)
├── name (VARCHAR 100)
├── slug (VARCHAR 100, UNIQUE)
├── description (TEXT, NULLABLE)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)
```

### Comments Table (Optional)
```sql
comments
├── id (BIGINT, PRIMARY KEY, AUTO_INCREMENT)
├── post_id (BIGINT, FOREIGN KEY → posts.id)
├── user_id (BIGINT, FOREIGN KEY → users.id)
├── content (TEXT)
├── status (ENUM: 'pending', 'approved', DEFAULT 'pending')
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)
```

---

## Phase-by-Phase Implementation

## PHASE 1: Laravel Backend Setup (Week 1)

### 1.1 Install Laravel

**Prerequisites:**
```bash
# Install PHP 8.2+
# Install Composer
# Install MySQL/PostgreSQL

# Verify installations
php -v
composer -v
mysql --version
```

**Create Laravel Project:**
```bash
composer create-project laravel/laravel blog-backend
cd blog-backend

# Start development server (test)
php artisan serve
# Visit http://localhost:8000
```

### 1.2 Configure Database

**Edit `.env` file:**
```env
APP_NAME=BlogAPI
APP_ENV=local
APP_KEY=base64:xxx (auto-generated)
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=blog_db
DB_USERNAME=root
DB_PASSWORD=your_password

SESSION_DRIVER=cookie
SANCTUM_STATEFUL_DOMAINS=localhost:3000,127.0.0.1:3000
```

**Create Database:**
```sql
CREATE DATABASE blog_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

**Test Connection:**
```bash
php artisan migrate
```

### 1.3 Laravel Project Structure

```
blog-backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── AuthController.php
│   │   │   ├── PostController.php
│   │   │   ├── CategoryController.php
│   │   │   └── CommentController.php
│   │   ├── Middleware/
│   │   │   ├── AdminMiddleware.php
│   │   │   └── Authenticate.php
│   │   └── Requests/
│   │       ├── LoginRequest.php
│   │       ├── RegisterRequest.php
│   │       ├── StorePostRequest.php
│   │       └── UpdatePostRequest.php
│   ├── Models/
│   │   ├── User.php
│   │   ├── Post.php
│   │   ├── Category.php
│   │   └── Comment.php
│   └── Policies/
│       └── PostPolicy.php
├── database/
│   ├── migrations/
│   │   ├── xxxx_create_users_table.php
│   │   ├── xxxx_create_posts_table.php
│   │   ├── xxxx_create_categories_table.php
│   │   └── xxxx_create_comments_table.php
│   ├── seeders/
│   │   ├── UserSeeder.php
│   │   └── CategorySeeder.php
│   └── factories/
│       ├── UserFactory.php
│       └── PostFactory.php
├── routes/
│   ├── api.php (API routes)
│   └── web.php (web routes)
├── storage/
│   └── app/
│       └── public/
│           └── posts/ (uploaded images)
├── .env
├── composer.json
└── artisan
```

### 1.4 Create Database Migrations

**Users migration (comes with Laravel, modify if needed):**
```bash
# Already exists, modify if needed
php artisan make:migration add_role_to_users_table
```

**Posts migration:**
```bash
php artisan make:migration create_posts_table
```

**Categories migration:**
```bash
php artisan make:migration create_categories_table
```

**Run migrations:**
```bash
php artisan migrate
```

### 1.5 Install Laravel Sanctum for API Authentication

```bash
composer require laravel/sanctum

php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"

php artisan migrate
```

**Configure Sanctum in `config/sanctum.php`:**
```php
'stateful' => explode(',', env('SANCTUM_STATEFUL_DOMAINS', 'localhost:3000')),
```

**Add Sanctum middleware to `app/Http/Kernel.php`:**
```php
'api' => [
    \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
    'throttle:api',
    \Illuminate\Routing\Middleware\SubstituteBindings::class,
],
```

---

## PHASE 2: Build Authentication API (Week 1)

### 2.1 Create Models

**User Model (modify existing):**
```bash
# app/Models/User.php already exists
# Add role field to $fillable array
```

**User.php:**
```php
<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function posts()
    {
        return $this->hasMany(Post::class);
    }

    public function isAdmin()
    {
        return $this->role === 'admin';
    }
}
```

### 2.2 Create Auth Controller

```bash
php artisan make:controller AuthController
```

**app/Http/Controllers/AuthController.php:**
```php
<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    // Register new user
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'user', // default role
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
            'message' => 'Registration successful'
        ], 201);
    }

    // Login user
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
            'message' => 'Login successful'
        ]);
    }

    // Logout user
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logged out successfully'
        ]);
    }

    // Get current user
    public function me(Request $request)
    {
        return response()->json([
            'user' => $request->user()
        ]);
    }
}
```

### 2.3 Create API Routes

**routes/api.php:**
```php
<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\CategoryController;

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Public - Get all published posts
Route::get('/posts', [PostController::class, 'index']);
Route::get('/posts/{slug}', [PostController::class, 'show']);

// Public - Get categories
Route::get('/categories', [CategoryController::class, 'index']);

// Protected routes (require authentication)
Route::middleware('auth:sanctum')->group(function () {
    // Auth
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    // Posts (admin only)
    Route::post('/posts', [PostController::class, 'store']);
    Route::put('/posts/{id}', [PostController::class, 'update']);
    Route::delete('/posts/{id}', [PostController::class, 'destroy']);

    // Image upload
    Route::post('/upload', [PostController::class, 'uploadImage']);

    // Categories (admin only)
    Route::post('/categories', [CategoryController::class, 'store']);
    Route::put('/categories/{id}', [CategoryController::class, 'update']);
    Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);
});
```

### 2.4 Enable CORS

**Install Laravel CORS (already included in Laravel 11):**

**config/cors.php:**
```php
return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['http://localhost:3000', 'http://127.0.0.1:3000'],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true,
];
```

---

## PHASE 3: Build Post Management API (Week 1-2)

### 3.1 Create Post Model & Migration

```bash
php artisan make:model Post -m
```

**database/migrations/xxxx_create_posts_table.php:**
```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('content');
            $table->text('excerpt')->nullable();
            $table->string('featured_image')->nullable();
            $table->foreignId('category_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->enum('status', ['draft', 'published'])->default('draft');
            $table->timestamp('published_at')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('posts');
    }
};
```

**app/Models/Post.php:**
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Post extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'content',
        'excerpt',
        'featured_image',
        'category_id',
        'user_id',
        'status',
        'published_at',
    ];

    protected $casts = [
        'published_at' => 'datetime',
    ];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    // Auto-generate slug from title
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($post) {
            if (empty($post->slug)) {
                $post->slug = Str::slug($post->title);
            }
        });
    }
}
```

### 3.2 Create Category Model & Migration

```bash
php artisan make:model Category -m
```

**database/migrations/xxxx_create_categories_table.php:**
```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('categories');
    }
};
```

**app/Models/Category.php:**
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Category extends Model
{
    protected $fillable = ['name', 'slug', 'description'];

    public function posts()
    {
        return $this->hasMany(Post::class);
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($category) {
            if (empty($category->slug)) {
                $category->slug = Str::slug($category->name);
            }
        });
    }
}
```

### 3.3 Create Post Controller

```bash
php artisan make:controller PostController
```

**app/Http/Controllers/PostController.php:**
```php
<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class PostController extends Controller
{
    // Get all published posts (public)
    public function index()
    {
        $posts = Post::with(['user', 'category'])
            ->where('status', 'published')
            ->latest('published_at')
            ->paginate(12);

        return response()->json($posts);
    }

    // Get single post by slug (public)
    public function show($slug)
    {
        $post = Post::with(['user', 'category', 'comments'])
            ->where('slug', $slug)
            ->where('status', 'published')
            ->firstOrFail();

        return response()->json($post);
    }

    // Create new post (admin only)
    public function store(Request $request)
    {
        if (!$request->user()->isAdmin()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'excerpt' => 'nullable|string',
            'featured_image' => 'nullable|string',
            'category_id' => 'required|exists:categories,id',
            'status' => 'required|in:draft,published',
        ]);

        $post = Post::create([
            'title' => $validated['title'],
            'slug' => Str::slug($validated['title']),
            'content' => $validated['content'],
            'excerpt' => $validated['excerpt'] ?? null,
            'featured_image' => $validated['featured_image'] ?? null,
            'category_id' => $validated['category_id'],
            'user_id' => $request->user()->id,
            'status' => $validated['status'],
            'published_at' => $validated['status'] === 'published' ? now() : null,
        ]);

        return response()->json([
            'post' => $post->load(['user', 'category']),
            'message' => 'Post created successfully'
        ], 201);
    }

    // Update post (admin only)
    public function update(Request $request, $id)
    {
        if (!$request->user()->isAdmin()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $post = Post::findOrFail($id);

        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'content' => 'sometimes|string',
            'excerpt' => 'nullable|string',
            'featured_image' => 'nullable|string',
            'category_id' => 'sometimes|exists:categories,id',
            'status' => 'sometimes|in:draft,published',
        ]);

        if (isset($validated['title'])) {
            $validated['slug'] = Str::slug($validated['title']);
        }

        if (isset($validated['status']) && $validated['status'] === 'published' && !$post->published_at) {
            $validated['published_at'] = now();
        }

        $post->update($validated);

        return response()->json([
            'post' => $post->load(['user', 'category']),
            'message' => 'Post updated successfully'
        ]);
    }

    // Delete post (admin only)
    public function destroy(Request $request, $id)
    {
        if (!$request->user()->isAdmin()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $post = Post::findOrFail($id);

        // Delete featured image if exists
        if ($post->featured_image) {
            Storage::disk('public')->delete($post->featured_image);
        }

        $post->delete();

        return response()->json([
            'message' => 'Post deleted successfully'
        ]);
    }

    // Upload image
    public function uploadImage(Request $request)
    {
        if (!$request->user()->isAdmin()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:5120', // 5MB max
        ]);

        $image = $request->file('image');
        $filename = time() . '_' . Str::random(10) . '.' . $image->getClientOriginalExtension();
        $path = $image->storeAs('posts', $filename, 'public');

        return response()->json([
            'url' => Storage::url($path),
            'path' => $path,
            'message' => 'Image uploaded successfully'
        ]);
    }
}
```

### 3.4 Create Category Controller

```bash
php artisan make:controller CategoryController
```

**app/Http/Controllers/CategoryController.php:**
```php
<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    // Get all categories (public)
    public function index()
    {
        $categories = Category::withCount('posts')->get();
        return response()->json($categories);
    }

    // Create category (admin only)
    public function store(Request $request)
    {
        if (!$request->user()->isAdmin()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:100|unique:categories',
            'description' => 'nullable|string',
        ]);

        $category = Category::create($validated);

        return response()->json([
            'category' => $category,
            'message' => 'Category created successfully'
        ], 201);
    }

    // Update category (admin only)
    public function update(Request $request, $id)
    {
        if (!$request->user()->isAdmin()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $category = Category::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|string|max:100|unique:categories,name,' . $id,
            'description' => 'nullable|string',
        ]);

        $category->update($validated);

        return response()->json([
            'category' => $category,
            'message' => 'Category updated successfully'
        ]);
    }

    // Delete category (admin only)
    public function destroy(Request $request, $id)
    {
        if (!$request->user()->isAdmin()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $category = Category::findOrFail($id);
        $category->delete();

        return response()->json([
            'message' => 'Category deleted successfully'
        ]);
    }
}
```

### 3.5 Create Storage Link for Public Access

```bash
php artisan storage:link
```

This creates a symbolic link from `public/storage` to `storage/app/public` so uploaded images are accessible.

### 3.6 Run Migrations

```bash
php artisan migrate
```

### 3.7 Seed Database with Sample Data

**Create seeders:**
```bash
php artisan make:seeder CategorySeeder
php artisan make:seeder UserSeeder
```

**database/seeders/UserSeeder.php:**
```php
<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run()
    {
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@blog.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);

        User::create([
            'name' => 'Regular User',
            'email' => 'user@blog.com',
            'password' => Hash::make('password'),
            'role' => 'user',
        ]);
    }
}
```

**database/seeders/CategorySeeder.php:**
```php
<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run()
    {
        $categories = [
            ['name' => 'Technology', 'description' => 'Tech news and tutorials'],
            ['name' => 'Travel', 'description' => 'Travel guides and tips'],
            ['name' => 'Business', 'description' => 'Business insights'],
            ['name' => 'Lifestyle', 'description' => 'Lifestyle articles'],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
```

**database/seeders/DatabaseSeeder.php:**
```php
<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call([
            UserSeeder::class,
            CategorySeeder::class,
        ]);
    }
}
```

**Run seeders:**
```bash
php artisan db:seed
```

---

## PHASE 4: React Frontend Setup (Week 2)

### 4.1 Create React App

**Using Create React App:**
```bash
npx create-react-app blog-frontend
cd blog-frontend
npm start
```

**Install dependencies:**
```bash
npm install react-router-dom axios
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**Optional UI libraries:**
```bash
# Option 1: Material-UI
npm install @mui/material @mui/icons-material @emotion/react @emotion/styled

# Option 2: Ant Design
npm install antd

# Option 3: Just use TailwindCSS (recommended for this project)
```

**Install Rich Text Editor:**
```bash
npm install react-quill
# or
npm install @tinymce/tinymce-react
```

### 4.2 Configure TailwindCSS

**tailwind.config.js:**
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4B6BFB',
      },
    },
  },
  plugins: [],
}
```

**src/index.css:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 4.3 React Project Structure

```
blog-frontend/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── PostCard.jsx
│   │   ├── Sidebar.jsx
│   │   ├── RichTextEditor.jsx
│   │   └── ProtectedRoute.jsx
│   ├── pages/
│   │   ├── public/
│   │   │   ├── Home.jsx (blog listing)
│   │   │   ├── SinglePost.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   └── admin/
│   │       ├── Dashboard.jsx
│   │       ├── AllPosts.jsx
│   │       ├── AddPost.jsx
│   │       ├── EditPost.jsx
│   │       └── Categories.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── services/
│   │   └── api.js (Axios configuration)
│   ├── utils/
│   │   └── helpers.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env
├── package.json
└── vite.config.js
```

### 4.4 Configure Axios API Service

**Create `.env` file:**
```env
REACT_APP_API_URL=http://localhost:8000/api
```

**src/services/api.js:**
```javascript
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true, // Important for Sanctum
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth endpoints
export const authAPI = {
  register: (data) => api.post('/register', data),
  login: (data) => api.post('/login', data),
  logout: () => api.post('/logout'),
  getCurrentUser: () => api.get('/me'),
};

// Post endpoints
export const postAPI = {
  getAllPosts: (page = 1) => api.get(`/posts?page=${page}`),
  getPostBySlug: (slug) => api.get(`/posts/${slug}`),
  createPost: (data) => api.post('/posts', data),
  updatePost: (id, data) => api.put(`/posts/${id}`, data),
  deletePost: (id) => api.delete(`/posts/${id}`),
  uploadImage: (formData) => api.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
};

// Category endpoints
export const categoryAPI = {
  getAllCategories: () => api.get('/categories'),
  createCategory: (data) => api.post('/categories', data),
  updateCategory: (id, data) => api.put(`/categories/${id}`, data),
  deleteCategory: (id) => api.delete(`/categories/${id}`),
};

export default api;
```

### 4.5 Create Auth Context

**src/context/AuthContext.jsx:**
```javascript
import { createContext, useState, useEffect, useContext } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await authAPI.getCurrentUser();
        setUser(response.data.user);
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('token');
        setUser(null);
      }
    }
    setLoading(false);
  };

  const login = async (email, password) => {
    try {
      const response = await authAPI.login({ email, password });
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Login failed',
      };
    }
  };

  const register = async (name, email, password, password_confirmation) => {
    try {
      const response = await authAPI.register({
        name,
        email,
        password,
        password_confirmation,
      });
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Registration failed',
      };
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      setUser(null);
    }
  };

  const isAuthenticated = () => !!user;
  const isAdmin = () => user?.role === 'admin';

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
```

### 4.6 Create Protected Route Component

**src/components/ProtectedRoute.jsx:**
```javascript
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { user, loading, isAuthenticated, isAdmin } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center h-screen">
      <div className="text-xl">Loading...</div>
    </div>;
  }

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && !isAdmin()) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
```

### 4.7 Set Up React Router

**src/App.jsx:**
```javascript
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Public pages
import Home from './pages/public/Home';
import SinglePost from './pages/public/SinglePost';
import Login from './pages/public/Login';
import Register from './pages/public/Register';

// Admin pages
import Dashboard from './pages/admin/Dashboard';
import AllPosts from './pages/admin/AllPosts';
import AddPost from './pages/admin/AddPost';
import EditPost from './pages/admin/EditPost';
import Categories from './pages/admin/Categories';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/post/:slug" element={<SinglePost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Admin routes (protected) */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute requireAdmin>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/posts"
            element={
              <ProtectedRoute requireAdmin>
                <AllPosts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/posts/new"
            element={
              <ProtectedRoute requireAdmin>
                <AddPost />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/posts/edit/:id"
            element={
              <ProtectedRoute requireAdmin>
                <EditPost />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/categories"
            element={
              <ProtectedRoute requireAdmin>
                <Categories />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
```

---

## PHASE 5: Build React Components (Week 2-3)

### 5.1 Login Page

**src/pages/public/Login.jsx:**
```javascript
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);

    if (result.success) {
      navigate('/admin/dashboard');
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
```

### 5.2 Blog Home Page (Post Listing)

**src/pages/public/Home.jsx:**
```javascript
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { postAPI } from '../../services/api';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import PostCard from '../../components/PostCard';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await postAPI.getAllPosts();
      setPosts(response.data.data); // Laravel pagination wraps data
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Latest Posts</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
```

**src/components/PostCard.jsx:**
```javascript
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Link to={`/post/${post.slug}`} className="block group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
        {post.featured_image && (
          <img
            src={`http://localhost:8000${post.featured_image}`}
            alt={post.title}
            className="w-full h-48 object-cover"
          />
        )}

        <div className="p-6">
          <span className="inline-block bg-primary text-white text-xs px-3 py-1 rounded-full mb-3">
            {post.category.name}
          </span>

          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition">
            {post.title}
          </h3>

          {post.excerpt && (
            <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
          )}

          <div className="flex items-center text-sm text-gray-500">
            <span>{post.user.name}</span>
            <span className="mx-2">•</span>
            <span>{formatDate(post.published_at)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
```

### 5.3 Admin Dashboard Layout

**src/pages/admin/Dashboard.jsx:**
```javascript
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Sidebar from '../../components/Sidebar';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-4">
            <span>Welcome, {user?.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </header>

        <main className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-gray-500 text-sm">Total Posts</h3>
              <p className="text-3xl font-bold mt-2">0</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-gray-500 text-sm">Published</h3>
              <p className="text-3xl font-bold mt-2">0</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-gray-500 text-sm">Drafts</h3>
              <p className="text-3xl font-bold mt-2">0</p>
            </div>
          </div>

          <div className="flex gap-4">
            <Link
              to="/admin/posts/new"
              className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-600"
            >
              Create New Post
            </Link>
            <Link
              to="/"
              className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300"
            >
              View Site
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
```

**src/components/Sidebar.jsx:**
```javascript
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/admin/posts', label: 'All Posts', icon: '📝' },
    { path: '/admin/posts/new', label: 'Add New Post', icon: '➕' },
    { path: '/admin/categories', label: 'Categories', icon: '🏷️' },
  ];

  return (
    <aside className="w-64 bg-gray-800 text-white">
      <div className="p-6">
        <h2 className="text-2xl font-bold">Meta Blog</h2>
        <p className="text-sm text-gray-400">Admin Panel</p>
      </div>

      <nav className="mt-6">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-6 py-3 hover:bg-gray-700 transition ${
              isActive(item.path) ? 'bg-gray-700 border-l-4 border-primary' : ''
            }`}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
```

### 5.4 Add/Edit Post Page

**src/pages/admin/AddPost.jsx:**
```javascript
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { postAPI, categoryAPI } from '../../services/api';
import Sidebar from '../../components/Sidebar';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AddPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [status, setStatus] = useState('draft');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await categoryAPI.getAllCategories();
      setCategories(response.data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await postAPI.uploadImage(formData);
      setFeaturedImage(response.data.url);
      alert('Image uploaded successfully!');
    } catch (error) {
      alert('Failed to upload image');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await postAPI.createPost({
        title,
        content,
        excerpt,
        category_id: categoryId,
        featured_image: featuredImage,
        status,
      });

      alert('Post created successfully!');
      navigate('/admin/posts');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm p-4">
          <h1 className="text-2xl font-bold">Add New Post</h1>
        </header>

        <main className="p-8">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="max-w-4xl">
            <div className="mb-6">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter post title"
                className="w-full text-3xl font-bold border-0 focus:ring-0 focus:outline-none"
                required
              />
            </div>

            <div className="mb-6">
              <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                className="bg-white"
                style={{ height: '400px', marginBottom: '50px' }}
              />
            </div>

            <div className="grid grid-cols-2 gap-6 mt-6">
              <div>
                <label className="block text-sm font-bold mb-2">Excerpt</label>
                <textarea
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  rows="3"
                  className="w-full border rounded-md p-2"
                  placeholder="Short description..."
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Category</label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full border rounded-md p-2"
                  required
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">
                  Featured Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full border rounded-md p-2"
                />
                {featuredImage && (
                  <img
                    src={`http://localhost:8000${featuredImage}`}
                    alt="Preview"
                    className="mt-2 h-32 object-cover rounded"
                  />
                )}
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full border rounded-md p-2"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                type="submit"
                disabled={loading}
                className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-600 disabled:opacity-50"
              >
                {loading ? 'Saving...' : status === 'published' ? 'Publish' : 'Save Draft'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/admin/posts')}
                className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default AddPost;
```

---

## PHASE 6: Testing (Week 3-4)

### 6.1 Test Backend API with Postman

**Create a Postman collection:**

1. **Register:**
   - POST `http://localhost:8000/api/register`
   - Body: `{ "name": "Test", "email": "test@test.com", "password": "password", "password_confirmation": "password" }`

2. **Login:**
   - POST `http://localhost:8000/api/login`
   - Body: `{ "email": "admin@blog.com", "password": "password" }`
   - Copy the token from response

3. **Create Post:**
   - POST `http://localhost:8000/api/posts`
   - Headers: `Authorization: Bearer {token}`
   - Body: Post data

4. **Get Posts:**
   - GET `http://localhost:8000/api/posts`

### 6.2 Test Frontend

```bash
# Start Laravel backend
cd blog-backend
php artisan serve

# Start React frontend (new terminal)
cd blog-frontend
npm run dev
```

**Test checklist:**
- [ ] User can register
- [ ] User can login
- [ ] User can logout
- [ ] Admin can create post
- [ ] Admin can upload image
- [ ] Posts appear on home page
- [ ] Single post page works
- [ ] Protected routes redirect non-authenticated users

---

## PHASE 7: Deployment (Week 4-5)

### 7.1 Deploy Laravel Backend

**Options:**

**Option 1: Traditional Hosting (cPanel/Shared)**
1. Build and upload files
2. Configure database
3. Set up .env file
4. Run migrations via SSH/cPanel Terminal

**Option 2: Cloud Hosting (Recommended)**

**Deploy to Railway:**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Add MySQL database
railway add

# Deploy
railway up
```

**Deploy to DigitalOcean:**
1. Create a Droplet (Ubuntu)
2. Install LAMP stack
3. Upload code via Git
4. Configure nginx/Apache
5. Set up SSL with Let's Encrypt

### 7.2 Deploy React Frontend

**Build for production:**
```bash
cd blog-frontend
npm run build
```

**Deploy to Vercel:**
```bash
npm install -g vercel
vercel login
vercel
```

**Deploy to Netlify:**
1. Connect GitHub repo
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables

**Update API URL:**
```env
REACT_APP_API_URL=https://your-backend-domain.com/api
```

---

## Implementation Timeline

### Week 1: Laravel Backend
- Days 1-2: Install Laravel, configure database, create migrations
- Days 3-4: Build authentication API with Sanctum
- Days 5-7: Build post and category CRUD APIs

### Week 2: React Frontend Setup
- Days 1-2: Create React app, configure routing and Axios
- Days 3-4: Build authentication pages (login, register)
- Days 5-7: Build public blog pages (home, single post)

### Week 3: Admin Dashboard
- Days 1-3: Build dashboard layout with sidebar
- Days 4-5: Build "All Posts" management page
- Days 6-7: Build post editor with rich text and image upload

### Week 4: Testing & Polish
- Days 1-2: Test all features end-to-end
- Days 3-4: Fix bugs and improve UI/UX
- Days 5-7: Prepare for deployment

### Week 5: Deployment
- Days 1-3: Deploy backend to hosting platform
- Days 4-5: Deploy frontend to Vercel/Netlify
- Days 6-7: Final testing and optimization

---

## Complete File Structure

```
blog-project/
│
├── blog-backend/                 # Laravel Backend
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/
│   │   │   │   ├── AuthController.php
│   │   │   │   ├── PostController.php
│   │   │   │   └── CategoryController.php
│   │   │   └── Middleware/
│   │   │       └── AdminMiddleware.php
│   │   ├── Models/
│   │   │   ├── User.php
│   │   │   ├── Post.php
│   │   │   └── Category.php
│   │   └── Policies/
│   │       └── PostPolicy.php
│   ├── database/
│   │   ├── migrations/
│   │   ├── seeders/
│   │   └── factories/
│   ├── routes/
│   │   └── api.php
│   ├── storage/
│   │   └── app/public/posts/
│   ├── .env
│   └── composer.json
│
└── blog-frontend/                # React Frontend
    ├── src/
    │   ├── components/
    │   │   ├── Header.jsx
    │   │   ├── Footer.jsx
    │   │   ├── Sidebar.jsx
    │   │   ├── PostCard.jsx
    │   │   └── ProtectedRoute.jsx
    │   ├── pages/
    │   │   ├── public/
    │   │   │   ├── Home.jsx
    │   │   │   ├── SinglePost.jsx
    │   │   │   ├── Login.jsx
    │   │   │   └── Register.jsx
    │   │   └── admin/
    │   │       ├── Dashboard.jsx
    │   │       ├── AllPosts.jsx
    │   │       ├── AddPost.jsx
    │   │       └── Categories.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── App.jsx
    │   └── main.jsx
    ├── .env
    └── package.json
```

---

## Resources & Documentation

### Laravel
- **Official Docs**: https://laravel.com/docs
- **Sanctum (Auth)**: https://laravel.com/docs/sanctum
- **Eloquent ORM**: https://laravel.com/docs/eloquent

### React
- **Official Docs**: https://react.dev
- **React Router**: https://reactrouter.com
- **Axios**: https://axios-http.com

### Tools
- **Composer**: https://getcomposer.org
- **Create React App**: https://create-react-app.dev
- **TailwindCSS**: https://tailwindcss.com
- **React Quill**: https://github.com/zenoamaro/react-quill

### Deployment
- **Railway**: https://railway.app
- **Vercel**: https://vercel.com
- **DigitalOcean**: https://www.digitalocean.com
- **Netlify**: https://netlify.com

---

## Next Steps

1. **Install prerequisites** (PHP, Composer, Node.js, MySQL)
2. **Start with Laravel backend** (Phase 1)
3. **Create React frontend** (Phase 4)
4. **Test integration** (Phase 6)
5. **Deploy** (Phase 7)

**Ready to start building? Let's begin!**

---

## Frontend Development Task Breakdown

### Task 1: Create React Project with Create React App ✅
**Steps:**
1. Open terminal in WebStorm
2. Run: `npx create-react-app blog-frontend`
3. Navigate to project: `cd blog-frontend`
4. Start development server: `npm start`
5. Verify React app is running on http://localhost:3000

### Task 2: Set Up Project Structure and Configuration
**Steps:**
1. Install dependencies:
   ```bash
   npm install react-router-dom axios
   npm install -D tailwindcss postcss autoprefixer
   npm install react-quill
   ```
2. Initialize TailwindCSS: `npx tailwindcss init -p`
3. Create folder structure:
   ```
   src/
   ├── components/
   ├── pages/
   │   ├── public/
   │   └── admin/
   ├── context/
   ├── services/
   └── utils/
   ```
4. Configure TailwindCSS in `tailwind.config.js`
5. Create `.env` file with API URL
6. Create `src/services/api.js` for Axios configuration

### Task 3: Build Authentication Context and Protected Routes
**Steps:**
1. Create `src/context/AuthContext.jsx`
2. Implement login/logout functions
3. Add user state management
4. Create `src/components/ProtectedRoute.jsx`
5. Add admin role checking

### Task 4: Create Login and Register Pages
**Steps:**
1. Create `src/pages/public/Login.jsx`
2. Add email/password input fields
3. Implement form validation
4. Create `src/pages/public/Register.jsx`
5. Add name, email, password, confirm password fields
6. Connect to AuthContext

### Task 5: Build Public Blog Pages (Home and SinglePost)
**Steps:**
1. Create `src/components/Header.jsx`
2. Create `src/components/Footer.jsx`
3. Create `src/components/PostCard.jsx`
4. Create `src/pages/public/Home.jsx` (blog listing)
5. Create `src/pages/public/SinglePost.jsx`
6. Implement post fetching from API
7. Add loading states and error handling

### Task 6: Create Admin Dashboard Layout
**Steps:**
1. Create `src/components/Sidebar.jsx`
2. Create `src/pages/admin/Dashboard.jsx`
3. Add statistics cards (Total Posts, Published, Drafts)
4. Add logout button
5. Implement responsive layout
6. Add navigation links

### Task 7: Build Post Management Pages
**Steps:**
1. Create `src/pages/admin/AllPosts.jsx`
2. Add posts table with search/filter
3. Create `src/pages/admin/AddPost.jsx`
4. Integrate React Quill rich text editor
5. Add image upload functionality
6. Create `src/pages/admin/EditPost.jsx`
7. Create `src/pages/admin/Categories.jsx`
8. Implement CRUD operations

### Task 8: Connect Frontend to Backend API
**Steps:**
1. Configure API base URL
2. Test authentication endpoints
3. Implement post CRUD operations
4. Add image upload to backend
5. Handle API errors
6. Add loading states
7. Test all features end-to-end

---

## Current Status: Ready to Start Frontend Development

**Tools Needed:**
- ✅ WebStorm (for React frontend)
- ⏳ PhpStorm (for Laravel backend - later)
- ⏳ Node.js installed
- ⏳ PHP + Composer installed (for backend later)

**Next Action:** Start Task 1 - Create React project in WebStorm!
