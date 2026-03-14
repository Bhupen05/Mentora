# Navigation Architecture - Improved

## Overview

The navigation system has been completely restructured for better organization, type-safety, and maintainability. It follows best practices for mobile app navigation with Expo Router.

## Key Improvements

### 1. **Authentication Context (AuthContext)**
- **File**: `src/shared/context/AuthContext.tsx`
- **Purpose**: Global authentication state management
- **Features**:
  - Tracks user authentication status
  - Stores user role (student, mentor, parent)
  - Provides login/register/logout methods
  - Handles async auth operations
  - Can be extended with real token management

**Usage**:
```typescript
import { useAuth } from "@/shared/context/AuthContext";

function MyComponent() {
  const { isAuthenticated, userRole, login, logout } = useAuth();
  
  if (isAuthenticated && userRole === "student") {
    // Render student-specific content
  }
}
```

### 2. **Type-Safe Navigation Paths (navigationPaths.ts)**
- **File**: `src/shared/utils/navigationPaths.ts`
- **Purpose**: Centralized route definitions
- **Benefits**:
  - Prevents hardcoded route strings
  - Autocomplete in IDE
  - Single source of truth for routes
  - Easy to refactor routes

**Usage**:
```typescript
import { NavigationPaths, getRoleBasedHome } from "@/shared/utils/navigationPaths";

// Navigate using constants
router.push(NavigationPaths.STUDENT.DASHBOARD);

// Get home route for any role
const home = getRoleBasedHome(userRole);
```

### 3. **Tab Icons (TabIcons.tsx)**
- **File**: `src/shared/components/TabIcons.tsx`
- **Purpose**: Reusable emoji-based tab icons
- **Icons**:
  - HomeIcon - Home/Dashboard tabs
  - SearchIcon - Search/Browse tabs
  - LessonsIcon - Learning/Lessons tabs
  - QuizzesIcon - Quiz/Test tabs
  - ProfileIcon - Profile/Account tabs
  - EarningsIcon - Money/Earnings tabs
  - WalletIcon - Wallet/Payment tabs

**Future upgrade**: Replace with vector icons (Ionicons, Feather, etc.)

### 4. **Conditional Navigation (Root Layout)**
- **File**: `src/app/_layout.tsx`
- **Improvement**: Now properly uses AuthContext to conditionally render:
  - **Unauthenticated users** → Auth Stack (Splash → Login → Register)
  - **Authenticated users** → Role-based stack (Student/Mentor/Parent tabs)
- **Benefit**: Users are never shown screens they don't have access to

## Navigation Flow

```
┌─────────────────────────────────────────┐
│         App Starts                      │
│  (Root Layout with AuthProvider)        │
└──────────────┬──────────────────────────┘
               │
               ▼
         ┌─────────────┐
         │ AuthContext │ (Check auth status)
         └──────┬──────┘
                │
    ┌───────────┴───────────┐
    │                       │
    ▼ (isAuthenticated)     ▼ (not authenticated)
┌─────────────┐          ┌──────────────────┐
│ Splash      │          │ Auth Stack       │
│ (2.5s wait) │          ├──────────────────┤
└─────┬───────┘          │ splash → login   │
      │                  │ login → register │
      ▼                  │ register → login │
   ┌────────────────┐    └────────┬─────────┘
   │ Check Role     │             │
   ├────────────────┤             │
   │ student  →     │ (on login success)
   │ /student/dash  │             │
   │                │             ▼
   │ mentor   →     │    ┌─────────────────┐
   │ /mentor/dash   │    │ Set Auth State  │
   │                │    │ (role, token)   │
   │ parent   →     │    └────────┬────────┘
   │ /parent/dash   │             │
   └────────────────┘             ▼
               ▶─ Student Tab Navigation ◀──
                 (5 tabs with screens)
               ▶─ Mentor Tab Navigation ◀──
                 (3 tabs with screens)
               ▶─ Parent Tab Navigation ◀──
                 (3 tabs with screens)
                
    ┌─┐ (user taps logout in profile)
    │▼│ Returns to Auth Stack
    └─┘
```

## Stack Structure

### Root Stack
- **Entry**: Conditional based on auth state
- **Screens**:
  - `auth` (when not authenticated)
  - `(student)` (when authenticated as student)
  - `(mentor)` (when authenticated as mentor)
  - `(parent)` (when authenticated as parent)
  - `index` (landing page, optional deep link)

### Auth Stack
- **Entry**: Splash screen (2.5 second delay)
- **Screens**:
  1. `auth/splash` - Loading screen with auth check
  2. `auth/login` - Login screen with role selector
  3. `auth/register` - Registration screen

### Student Stack (Tab Navigation)
- **Tabs** (bottom tab bar):
  1. `(student)/dashboard` - Student home
  2. `(student)/search` - Find mentors
  3. `(student)/lessons` - My lessons
  4. `(student)/quizzes` - Quizzes
  5. `(student)/profile` - User profile

### Mentor Stack (Tab Navigation)
- **Tabs** (bottom tab bar):
  1. `(mentor)/dashboard` - Mentor home
  2. `(mentor)/earnings` - Revenue tracking
  3. `(mentor)/profile` - Mentor profile

### Parent Stack (Tab Navigation)
- **Tabs** (bottom tab bar):
  1. `(parent)/dashboard` - Parent home
  2. `(parent)/wallet` - Payment wallet
  3. `(parent)/profile` - Parent profile

## Routing Examples

### Navigate to Tab Screens
```typescript
import { useRouter } from "expo-router";
import { NavigationPaths } from "@/shared/utils/navigationPaths";

const router = useRouter();

// Navigate to student search
router.push(NavigationPaths.STUDENT.SEARCH);

// Navigate to mentor earnings
router.push(NavigationPaths.MENTOR.EARNINGS);
```

### Role-Based Navigation
```typescript
import { getRoleBasedHome } from "@/shared/utils/navigationPaths";
import { useAuth } from "@/shared/context/AuthContext";

const { userRole } = useAuth();
const home = getRoleBasedHome(userRole); // Returns correct home for role
```

### Login with Role Selection
```typescript
import { useAuth } from "@/shared/context/AuthContext";

const { login } = useAuth();

// Login as student
await login("student@example.com", "password", "student");

// Login as mentor
await login("mentor@example.com", "password", "mentor");

// Login as parent
await login("parent@example.com", "password", "parent");
```

### Logout
```typescript
import { useAuth } from "@/shared/context/AuthContext";
import { useRouter } from "expo-router";
import { NavigationPaths } from "@/shared/utils/navigationPaths";

const { logout } = useAuth();
const router = useRouter();

const handleLogout = async () => {
  await logout();
  router.replace(NavigationPaths.AUTH.LOGIN);
};
```

## Setup Requirements

### 1. Wrap App with AuthProvider
The root layout should use AuthProvider:
```typescript
import { AuthProvider } from "@/shared/context/AuthContext";

export default function RootLayout() {
  // AuthProvider wrapping happens at app entry point (app.tsx)
  // Or in a parent component of _layout.tsx
}
```

### 2. Export Context and Utils
Make sure these files are exported from shared folder:
- `src/shared/context/AuthContext.tsx`
- `src/shared/utils/navigationPaths.ts`
- `src/shared/components/TabIcons.tsx`

### 3. Update exports in index files
Add to `src/shared/context/index.ts`:
```typescript
export { AuthProvider, useAuth } from "./AuthContext";
```

Add to `src/shared/utils/index.ts`:
```typescript
export { NavigationPaths, getRoleBasedHome, getRoleRoutes } from "./navigationPaths";
```

Add to `src/shared/components/index.ts`:
```typescript
export * from "./TabIcons";
```

## Common Issues & Solutions

### Issue: Pages show white screen
**Solution**: Ensure AuthProvider wraps entire app

### Issue: Navigation state resets on refresh
**Solution**: Implement persistent storage in AuthContext (AsyncStorage)

### Issue: Icons not showing on tabs
**Solution**: Check TabIcons.tsx is properly imported and tabBarIcon option is set

### Issue: Cannot navigate between roles
**Solution**: Use `router.replace()` instead of `router.push()` to replace history

## Migration Guide for Integration

If migrating from old navigation:

1. **Replace auth checking logic** with `useAuth()`
2. **Replace hardcoded routes** with `NavigationPaths` constants
3. **Update root layout** to use conditional rendering based on `isAuthenticated`
4. **Add AuthProvider** wrapper in entry point
5. **Update tab icons** in all layout files
6. **Integrate with authService** (when API ready)

## Future Enhancements

- [ ] Add deep linking support
- [ ] Implement persistent auth (AsyncStorage)
- [ ] Add animated transitions between stacks
- [ ] Replace emoji icons with vector icons
- [ ] Add navigation analytics
- [ ] Implement role-based screen permissions
- [ ] Add bottom sheet modals for actions
- [ ] Implement notifications with navigation
- [ ] Add route guards for protected screens
- [ ] Implement background task navigation
