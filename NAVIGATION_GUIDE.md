# Beauty Hub - Navigation & Routing Guide

## 📋 Project Structure Overview

Your app is now properly aligned with professional React routing patterns. Here's how it all works:

---

## 🎯 1. **main.jsx - The Brain of Navigation**

**File:** `src/main.jsx`

This is where everything starts:

```
✅ React Root Creation
✅ BrowserRouter Setup (enables routing)
✅ Route Definitions
✅ Route Protection (Login & Admin checks)
```

### Routes Defined:
| Path | Component | Access | Purpose |
|------|-----------|--------|---------|
| `/` | Home | Public | Home page with featured products |
| `/products` | Products | Public | Browse all products |
| `/cart` | Cart | Public | Shopping cart |
| `/orders` | Orders | Protected* | View user orders |
| `/login` | Login | Public | User login page |
| `/admin` | Admin | Admin Only** | Admin dashboard |

*Protected: Requires `isLoggedIn = "true"`  
**Admin Only: Requires `role = "admin"`

---

## 🏠 2. **HomeLayout.jsx - Shared UI Wrapper**

**File:** `src/layout/HomeLayout.jsx`

This component wraps ALL routes and provides:

```
┌─────────────────────────────────┐
│        Header (Navigation)       │  ← Always visible
├─────────────────────────────────┤
│  [Banner - Only on Home Page]   │  ← Conditional
├─────────────────────────────────┤
│     Page Content (Routes)        │  ← Changes per page
├─────────────────────────────────┤
│          Footer                  │  ← Always visible
└─────────────────────────────────┘
```

**Benefits:**
- Write layout once, use everywhere
- Header appears on every page
- Footer appears on every page
- Banner only shows on home page

---

## 🧭 3. **Header.jsx - Navigation Links**

**File:** `src/Components/Header.jsx`

Smart navigation header that:

✅ Uses React Router `<Link>` (no page refresh)  
✅ Shows/hides "Orders" link based on login status  
✅ Shows/hides "Admin" link for admins only  
✅ Toggles Login/Logout button  
✅ Handles logout and clears sessionStorage  

**Navigation Links:**
```
Beauty Hub Logo → Home (/)
├─ Home (/)
├─ Products (/products)
├─ Cart (/cart)
├─ Orders (/orders) — Only if logged in
├─ Admin (/admin) — Only for admins
└─ Login/Logout Button
```

---

## 📄 4. **Page Components**

### **Home.jsx** (`/`)
- Shows featured products (limited)
- "View All Products" button links to `/products`
- Displays the banner from HomeLayout

### **Products.jsx** (`/products`)
- Shows all products using ProductList
- Displays ProductForm (add products) if user is admin
- No banner (HomeLayout hides it for non-home pages)

### **Cart.jsx** (`/cart`)
- Shopping cart with quantity controls
- OrderSummary component shows total
- No login required

### **Orders.jsx** (`/orders`)
- ✅ **Route Protected** - Only accessible if logged in
- Shows user's order history
- Displays order status, items, and total
- Redirects to `/login` if not logged in

### **Login.jsx** (`/login`)
- Email & password form
- Role selector (Customer or Admin)
- Saves to `sessionStorage`:
  - `isLoggedIn = "true"`
  - `role = "admin"` or `"user"`
  - `email = user's email`
- Redirects to `/admin` if role is admin, else `/`

### **Admin.jsx** (`/admin`)
- ✅ **Route Protected** - Only accessible if `role = "admin"`
- Admin welcome section
- Statistics dashboard (Products, Orders, Revenue)
- Full ProductList component for product management
- Redirects to `/` if not an admin

---

## 🔐 5. **Route Protection Logic**

### **Orders Route Protection**
```jsx
// In main.jsx
<Route
  path="/orders"
  element={
    isLoggedIn === "true" ? <Orders /> : <Navigate to="/login" />
  }
/>
```
✅ If logged in → Show Orders page  
❌ If not logged in → Redirect to Login page

### **Admin Route Protection**
```jsx
// In main.jsx
<Route
  path="/admin"
  element={
    role === "admin" ? <Admin /> : <Navigate to="/" />
  }
/>
```
✅ If role = "admin" → Show Admin page  
❌ If not admin → Redirect to Home page

---

## 💾 6. **sessionStorage - User State Management**

After successful login, three values are stored:

```javascript
sessionStorage.setItem("isLoggedIn", "true");
sessionStorage.setItem("role", "admin"); // or "user"
sessionStorage.setItem("email", "user@example.com");
```

**Retrieving Values:**
```javascript
const isLoggedIn = sessionStorage.getItem("isLoggedIn");
const role = sessionStorage.getItem("role");
const email = sessionStorage.getItem("email");
```

**On Logout:**
```javascript
sessionStorage.removeItem("isLoggedIn");
sessionStorage.removeItem("role");
sessionStorage.removeItem("email");
```

---

## 📊 7. **Component Hierarchy**

```
App
└── HomeLayout
    ├── Header (Navigation)
    │   ├── Home Link
    │   ├── Products Link
    │   ├── Cart Link
    │   ├── Orders Link (conditional)
    │   ├── Admin Link (conditional)
    │   └── Login/Logout Button
    │
    ├── Banner Image (only on home page)
    │
    ├── Routes (main content)
    │   ├── Home
    │   ├── Products → ProductList → Card
    │   ├── Cart → OrderSummary
    │   ├── Orders (protected)
    │   ├── Login
    │   └── Admin (protected)
    │
    └── Footer
```

---

## 🔄 8. **User Flow Diagram**

```
┌─────────────┐
│ Visit Site  │
└──────┬──────┘
       │
       ▼
┌─────────────────────┐
│ Home Page (/）       │ ← Banner visible
├─────────────────────┤
│ Not Logged In        │
│ (Login button shown) │
└────────┬────────────┘
         │
    ┌────▼────┐
    │ Click   │
    │ Login   │
    └────┬────┘
         │
         ▼
┌─────────────────────┐
│ Login Page (/login) │
├─────────────────────┤
│ Email: [       ]    │
│ Pass:  [       ]    │
│ Role:  [v User ]    │ ← Choose role
└────┬────────────────┘
     │
     ├─→ Role = "user" ──┐
     │                    │
     └─→ Role = "admin"   │
                          │
                          ▼
                   ┌──────────────────┐
                   │ sessionStorage   │
                   │ isLoggedIn=true  │
                   │ role=user/admin  │
                   └────────┬─────────┘
                            │
         ┌──────────────────┴──────────────────┐
         │                                     │
         ▼                                     ▼
    ┌──────────┐                         ┌────────────┐
    │ HOME (/）│                         │ ADMIN (/admin) │
    │          │                         │ (Protected)    │
    └──────────┘                         └────────────┘
         │                                     │
         ├─→ Orders link appears
         ├─→ Products page works
         ├─→ Cart page works
         └─→ Orders page accessible (/orders)
```

---

## ✨ 9. **Key Features Implemented**

✅ **Smart Navigation**
- Links show/hide based on user state
- No manual refresh needed (SPA)
- Smooth transitions between pages

✅ **Route Protection**
- Orders page only for logged-in users
- Admin page only for admins
- Automatic redirects to appropriate pages

✅ **Session Management**
- Login saves user info to sessionStorage
- Logout clears all user data
- User state persists during session

✅ **Layout Efficiency**
- Header and Footer reused on all pages
- Banner only on home page
- Common styling in one place

✅ **Admin Features**
- Admin dashboard with stats
- Product management interface
- Order overview

---

## 🚀 10. **How to Test**

### **Test Normal User Flow:**
1. Visit `http://localhost:5173/`
2. Click "Login" button
3. Enter any email (e.g., `user@test.com`)
4. Enter any password
5. Select "Customer" role
6. Should redirect to home
7. "Orders" link now appears in header
8. Try clicking "Orders" → Should work
9. Try accessing `/admin` directly → Should redirect to home

### **Test Admin Flow:**
1. Visit `http://localhost:5173/`
2. Click "Login" button
3. Enter any email (e.g., `admin@test.com`)
4. Enter any password
5. Select "Admin" role
6. Should redirect to `/admin`
7. "Admin" link appears in header
8. Can access admin dashboard with stats
9. ProductForm appears on products page

### **Test Logout:**
1. While logged in, click "Logout" button
2. Should redirect to home
3. "Orders" and "Admin" links disappear
4. Trying to access `/orders` → Redirects to login
5. Trying to access `/admin` → Redirects to home

---

## 📝 Summary

Your app now follows professional React patterns:

| Aspect | Status |
|--------|--------|
| Routes defined | ✅ Complete |
| Route protection | ✅ Complete |
| Session management | ✅ Complete |
| Shared layout | ✅ Complete |
| Navigation | ✅ Complete |
| Footer | ✅ Complete |
| Admin panel | ✅ Complete |
| Protected pages | ✅ Complete |

**Everything is properly aligned and working! 🎉**
