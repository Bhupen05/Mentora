# Quick Navigation Reference Guide

## Common Navigation Tasks

### 1. Navigate to a Different Screen

```typescript
import { useRouter } from "expo-router";
import { NavigationPaths } from "@/shared/utils/navigationPaths";

function MyComponent() {
  const router = useRouter();

  return (
    <Button
      onPress={() => router.push(NavigationPaths.STUDENT.SEARCH)}
      title="Find Mentors"
    />
  );
}
```

### 2. Login and Navigate to Role Dashboard

```typescript
import { useAuth } from "@/shared/context/AuthContext";
import { getRoleBasedHome } from "@/shared/utils/navigationPaths";

async function handleLogin(email, password, role) {
  const { login } = useAuth();
  
  try {
    await login(email, password, role);
    // Navigation happens automatically via AuthContext
  } catch (error) {
    console.error("Login failed:", error);
  }
}
```

### 3. Logout and Return to Login

```typescript
import { useAuth } from "@/shared/context/AuthContext";
import { useRouter } from "expo-router";
import { NavigationPaths } from "@/shared/utils/navigationPaths";

function ProfileScreen() {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    // Automatically redirected to login by AuthContext
    // Or manually: router.replace(NavigationPaths.AUTH.LOGIN);
  };

  return <Button onPress={handleLogout} title="Logout" />;
}
```

### 4. Check Authentication Status

```typescript
import { useAuth } from "@/shared/context/AuthContext";

function ProtectedComponent() {
  const { isAuthenticated, userRole } = useAuth();

  if (!isAuthenticated) {
    return <Text>Please log in</Text>;
  }

  if (userRole === "student") {
    return <Text>Welcome Student</Text>;
  }

  return null;
}
```

### 5. Navigate and Replace History (Skip Back Button)

```typescript
import { useRouter } from "expo-router";

const router = useRouter();

// push = keeps history (can swipe back)
router.push("(student)/dashboard");

// replace = replaces current screen (no history)
router.replace("(student)/dashboard");
```

## Route Constants Reference

### Auth Routes
```typescript
NavigationPaths.AUTH.SPLASH    // "auth/splash"
NavigationPaths.AUTH.LOGIN     // "auth/login"
NavigationPaths.AUTH.REGISTER  // "auth/register"
```

### Student Routes
```typescript
NavigationPaths.STUDENT.DASHBOARD // "(student)/dashboard"
NavigationPaths.STUDENT.SEARCH    // "(student)/search"
NavigationPaths.STUDENT.LESSONS   // "(student)/lessons"
NavigationPaths.STUDENT.QUIZZES   // "(student)/quizzes"
NavigationPaths.STUDENT.PROFILE   // "(student)/profile"
```

### Mentor Routes
```typescript
NavigationPaths.MENTOR.DASHBOARD // "(mentor)/dashboard"
NavigationPaths.MENTOR.EARNINGS  // "(mentor)/earnings"
NavigationPaths.MENTOR.PROFILE   // "(mentor)/profile"
```

### Parent Routes
```typescript
NavigationPaths.PARENT.DASHBOARD // "(parent)/dashboard"
NavigationPaths.PARENT.WALLET    // "(parent)/wallet"
NavigationPaths.PARENT.PROFILE   // "(parent)/profile"
```

## Files to Know

| File | Purpose |
|------|---------|
| `src/app/_layout.tsx` | Root navigation layout with auth checking |
| `src/app/auth/_layout.tsx` | Auth stack (splash, login, register) |
| `src/app/(student)/_layout.tsx` | Student tab navigation |
| `src/app/(mentor)/_layout.tsx` | Mentor tab navigation |
| `src/app/(parent)/_layout.tsx` | Parent tab navigation |
| `src/shared/context/AuthContext.tsx` | Global auth state management |
| `src/shared/utils/navigationPaths.ts` | Type-safe route constants |
| `src/shared/components/TabIcons.tsx` | Emoji-based tab icons |

## Architecture Overview

```
┌─ Root Layout (_layout.tsx)
│  └─ AuthProvider wrapper
│     ├─ IF NOT AUTHENTICATED
│     │  └─ Auth Stack
│     │     ├─ Splash (default)
│     │     ├─ Login
│     │     └─ Register
│     │
│     └─ IF AUTHENTICATED
│        ├─ Student Stack (TabNav)
│        │  ├─ Dashboard
│        │  ├─ Search
│        │  ├─ Lessons
│        │  ├─ Quizzes
│        │  └─ Profile
│        │
│        ├─ Mentor Stack (TabNav)
│        │  ├─ Dashboard
│        │  ├─ Earnings
│        │  └─ Profile
│        │
│        └─ Parent Stack (TabNav)
│           ├─ Dashboard
│           ├─ Wallet
│           └─ Profile
```

## Debugging Tips

### 1. Check Auth State
```typescript
import { useAuth } from "@/shared/context/AuthContext";

function DebugComponent() {
  const { isAuthenticated, userRole, isLoading } = useAuth();
  
  console.log("Auth State:", { isAuthenticated, userRole, isLoading });
  
  return null;
}
```

### 2. Log Navigation Events
```typescript
import { useEffect } from "react";
import { useRoute } from "@react-navigation/native";

function MyScreen() {
  const route = useRoute();
  
  useEffect(() => {
    console.log("Screen focused:", route.name);
  }, [route.name]);
  
  return null;
}
```

### 3. Deep Link Testing
```typescript
// In terminal:
// adb shell am start -W -a android.intent.action.VIEW -d "mentora://student/dashboard" <package>

// Or in Expo:
// Use Expo Go app's "Open with Expo URL"
```

## Common Gotchas

1. **Always use `replace()` after login** - Use `router.replace()` not `router.push()` to prevent going back to login
2. **Import from correct path** - Use `"@/shared/context/AuthContext"` not relative paths
3. **Role must match route** - Don't navigate to "(student)" path if userRole is "mentor"
4. **Wrap screens with providers** - Ensure AuthProvider is in root layout
5. **Use type constants** - Avoid hardcoding route strings

## Quick Start

### Add a new screen to Student dashboard:

1. Create screen component: `src/features/student/screens/NewScreen.tsx`
2. Export from index: `src/features/student/screens/index.ts`
3. Create route: `src/app/(student)/newscreen/index.tsx`
4. Export route component in index.tsx: `export { NewScreen } from "@/features/student/screens";`
5. Add tab in layout: `src/app/(student)/_layout.tsx`

That's it! The navigation will automatically include the new screen.
