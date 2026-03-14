# Mentora Platform - Project Reference Guide

## Project Overview

**Mentora** is a mobile mentorship platform that connects professionals with experienced industry mentors. The app enables users to:
- Find qualified mentors in their field
- Schedule real-time guidance sessions
- Track career growth and milestones
- Access personalized learning paths
- Build professional networks

---

## Tech Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Navigation**: Expo Router
- **Styling**: React Native StyleSheet
- **State Management**: (To be decided - Zustand or Redux recommended)
- **Version**: React 19.2.0, React Native 0.83.2

---

## Project Structure

Follow **Feature-Based Architecture** (NOT component-based):

```
Frontend/
├── src/
│   ├── app/
│   │   ├── _layout.tsx          (Navigation setup)
│   │   └── index.tsx            (Landing page)
│   │
│   ├── features/                (Feature modules - each independent)
│   │   ├── auth/
│   │   │   ├── screens/
│   │   │   ├── components/
│   │   │   ├── services/
│   │   │   ├── hooks/
│   │   │   └── types/
│   │   │
│   │   ├── mentors/
│   │   │   ├── screens/
│   │   │   ├── components/
│   │   │   ├── services/
│   │   │   └── hooks/
│   │   │
│   │   ├── lessons/
│   │   ├── profile/
│   │   ├── search/
│   │   └── wallet/
│   │
│   ├── shared/                  (Reusable across features)
│   │   ├── components/          (Base UI components)
│   │   ├── hooks/               (Custom reusable hooks)
│   │   ├── utils/               (Helper functions)
│   │   ├── constants/           (App constants)
│   │   ├── types/               (Global TypeScript types)
│   │   └── theme/
│   │       ├── colors.ts
│   │       ├── spacing.ts
│   │       └── typography.ts
│   │
│   ├── services/                (API & external services)
│   │   ├── api.ts              (API client setup)
│   │   ├── mentorService.ts
│   │   ├── authService.ts
│   │   └── lessonService.ts
│   │
│   └── types/                   (Global types)
│       └── index.ts
│
├── assets/
│   ├── images/
│   └── icons/
│
├── app.json
├── package.json
├── tsconfig.json
└── PROJECT_REFERENCE.md (this file)
```

---

## Design System

### Colors
```typescript
const COLORS = {
  primary: "#6366f1",           // Indigo
  secondary: "#ec4899",         // Pink
  dark: "#1f2937",              // Dark Gray
  light: "#f9fafb",             // Light Gray
  gray: "#6b7280",              // Medium Gray
  white: "#ffffff",
  success: "#10b981",           // Green
  error: "#ef4444",             // Red
  warning: "#f59e0b",           // Amber
};
```

### Typography
```typescript
- Headings (H1): 36px, Bold (700)
- Headings (H2): 28px, Bold (700)
- Body Large: 16px, Regular (400)
- Body Regular: 14px, Regular (400)
- Caption: 12px, Regular (400)
- Labels: 13px, Medium (500)
```

### Spacing Scale
```typescript
4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64
(Use multiples of 4 for consistency)
```

---

## Naming Conventions

### Files & Folders
- **Components**: PascalCase (`MentorCard.tsx`, `LessonCard.tsx`)
- **Screens**: PascalCase (`HomeScreen.tsx`, `MentorDetailsScreen.tsx`)
- **Hooks**: camelCase with `use` prefix (`useMentors.ts`, `useLessons.ts`)
- **Services**: camelCase with `Service` suffix (`mentorService.ts`, `authService.ts`)
- **Types**: PascalCase (`User.ts`, `Mentor.ts`)
- **Utilities**: camelCase (`errorHandler.ts`, `logger.ts`)

### TypeScript
```typescript
// Interfaces for component props
interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
}

// Types for data models
type User = {
  id: string;
  name: string;
  email: string;
};
```

---

## Component Rules

### Single Responsibility
Each component has ONE job only:
- ❌ Don't: Handle UI + API calls + Navigation in one component
- ✅ Do: Screen calls service → Component handles UI only

### Component Template
```typescript
import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface MyComponentProps {
  title: string;
  onPress: () => void;
}

export function MyComponent({ title, onPress }: MyComponentProps) {
  return (
    <View style={styles.container}>
      <Text>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
```

---

## Services Layer (API Integration)

Never call APIs directly in screens. Always use services.

### Structure
```
services/
├── api.ts           (Axios/Fetch setup)
├── mentorService.ts
├── authService.ts
└── lessonService.ts
```

### Example Service
```typescript
// mentorService.ts
export async function getMentors() {
  try {
    const response = await api.get("/mentors");
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
}
```

### In Screen
```typescript
// MentorsScreen.tsx
const [mentors, setMentors] = useState([]);

useEffect(() => {
  getMentors().then(setMentors).catch(handleError);
}, []);
```

---

## Reusable Components Library

Create these base components in `shared/components/`:

```
Button.tsx          - Primary, secondary, outlined variants
Input.tsx           - Text input with validation
Card.tsx            - Container with shadow
Avatar.tsx          - User profile pictures
Badge.tsx           - Status badges
Modal.tsx           - Dialog/Modal component
Loader.tsx          - Loading spinner
Header.tsx          - Screen headers
TabBar.tsx          - Navigation tabs
```

---

## State Management Strategy

### Local UI State
Use `useState` for component-level UI state:
```typescript
const [isVisible, setIsVisible] = useState(false);
```

### Global State
Use Zustand for app-wide state:
```typescript
// shared/store/userStore.ts
import { create } from "zustand";

export const useUserStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
```

---

## Navigation Structure

Bottom Tab Navigation (after auth):
```
├── Home (Dashboard)
├── Search Mentors
├── My Lessons
├── Chat
└── Profile
```

Stack Navigation (within tabs):
```
Home Stack:
  ├── Home
  └── MentorDetails
  └── BookSession

Mentors Stack:
  ├── Search
  └── MentorProfile
```

---

## Hooks

### Custom Hooks Location
```
shared/hooks/
├── useMentors.ts      (Fetch mentors)
├── useLessons.ts      (Fetch lessons)
├── useAuth.ts         (Auth logic)
└── useFetch.ts        (Generic fetch hook)
```

### Example Hook
```typescript
export function useMentors() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getMentors()
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}
```

---

## Error Handling

### Centralized Error Handler
```typescript
// shared/utils/errorHandler.ts
export function handleError(error: any) {
  if (error.response) {
    // API error
    Alert.alert("Error", error.response.data.message);
  } else if (error.request) {
    // Network error
    Alert.alert("Error", "Network connection failed");
  } else {
    // Other error
    Alert.alert("Error", "Something went wrong");
  }
}
```

---

## Performance Optimization

### Prevent Unnecessary Re-renders
```typescript
// Use React.memo for expensive components
export const MentorCard = React.memo(({ mentor }: Props) => {
  return <View>{/* UI */}</View>;
});

// Use useCallback for event handlers
const handlePress = useCallback(() => {
  // action
}, []);

// Use useMemo for expensive computations
const filteredMentors = useMemo(() => {
  return mentors.filter(m => m.specialty === selected);
}, [mentors, selected]);
```

---

## Type Definitions

### Create Global Types
```typescript
// shared/types/index.ts

export type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
};

export type Mentor = {
  id: string;
  name: string;
  specialty: string;
  experience: number;
  rating: number;
  hourlyRate: number;
};

export type Lesson = {
  id: string;
  mentorId: string;
  userId: string;
  topic: string;
  duration: number;
  scheduledAt: string;
};
```

---

## Testing & Quality

### Code Quality Tools
- **ESLint**: Automatic code quality checks
- **Prettier**: Code formatting
- **TypeScript**: Type safety

### Run Commands
```bash
npm run lint       # Check code quality
npm start          # Start development
npm run web        # Test on web
npm run android    # Test on Android
npm run ios        # Test on iOS
```

---

## Environment Setup

### Required Files
```
.env               (Environment variables)
.env.example       (Template for .env)
```

### Example .env
```
API_URL=https://api.mentora.com
API_KEY=your_api_key_here
ENVIRONMENT=development
```

---

## Best Practices

### ✅ DO
- Keep components small and focused
- Centralize API calls in services
- Use TypeScript for type safety
- Create reusable components
- Follow naming conventions
- Use feature-based folder structure
- Keep business logic in services/hooks
- Write clear variable names

### ❌ DON'T
- API calls directly in components
- Create global state for everything
- Deep component nesting
- Copy-paste code
- Use `any` type in TypeScript
- Mix concerns in one component
- Hardcode values (use constants)
- Ignore console errors

---

## Common Issues & Solutions

### Issue: Components re-rendering too much
**Solution**: Use `React.memo()`, `useCallback()`, `useMemo()`

### Issue: API calls not working
**Solution**: Check services layer, verify error handling, check network logs

### Issue: State not updating
**Solution**: Ensure immutability, check useState dependencies

### Issue: Navigation not working
**Solution**: Verify routing setup in `_layout.tsx`, check navigation props

---

## Quick Start Commands

```bash
# Install dependencies
npm install

# Start development server
npm start

# Format code
npx prettier --write .

# Check linting
npx eslint .

# Build for production
npm run build
```

---

## Feature Checklist

- [ ] Authentication (Login/Register)
- [ ] Mentor Browsing & Search
- [ ] Mentor Profile Page
- [ ] Booking System
- [ ] Video Call Integration
- [ ] Chat/Messaging
- [ ] Lessons Management
- [ ] User Profile
- [ ] Payments/Wallet
- [ ] Reviews & Ratings
- [ ] Notifications

---

## Additional Resources

- React Native Docs: https://reactnative.dev
- Expo Docs: https://docs.expo.dev
- TypeScript Docs: https://www.typescriptlang.org
- Scalable Architecture Guide: Check `react_native_scalable_system_guide.md`

---

## Last Updated
March 14, 2026

**Note**: Update this file whenever architecture decisions or project structure changes.
