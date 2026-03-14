# Mentora Quick Start Guide

## How to Use the Components & Screens

### 1. Using Shared Components

#### Button
```typescript
import { Button } from "@/src/shared/components";

// Basic button
<Button 
  title="Click Me" 
  onPress={() => console.log("pressed")} 
/>

// With variants and sizes
<Button
  title="Submit"
  onPress={handleSubmit}
  variant="primary"          // "primary" | "secondary" | "outline" | "danger"
  size="large"               // "small" | "medium" | "large"
  loading={isLoading}
  disabled={!isValid}
/>
```

#### Input
```typescript
import { Input } from "@/src/shared/components";
import { useState } from "react";

const [email, setEmail] = useState("");
const [error, setError] = useState("");

<Input
  label="Email Address"
  placeholder="Enter your email"
  value={email}
  onChangeText={setEmail}
  error={error}
  keyboardType="email-address"
/>
```

#### Card
```typescript
import { Card, CardHeader } from "@/src/shared/components";

<Card padding={16} shadow={true}>
  <CardHeader 
    title="Mentor Name" 
    subtitle="Subject Specialty"
  />
  <Text>Card content here</Text>
</Card>
```

#### Badge
```typescript
import { Badge } from "@/src/shared/components";

<Badge label="Premium" variant="primary" />  // primary, secondary, success, error, warning
```

#### Avatar
```typescript
import { Avatar } from "@/src/shared/components";

<Avatar name="John Doe" size={40} backgroundColor="#6366f1" />
```

#### Loader
```typescript
import { Loader } from "@/src/shared/components";

<Loader size={40} color="#6366f1" message="Loading mentors..." />
```

---

### 2. Using Theme System

```typescript
import { COLORS, SPACING, TYPOGRAPHY } from "@/src/shared/theme";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: SPACING.base,           // 16px
    backgroundColor: COLORS.light,
  },
  title: {
    ...TYPOGRAPHY.h2,
    color: COLORS.primary,
  },
  body: {
    ...TYPOGRAPHY.body,
    color: COLORS.gray700,
  },
});
```

---

### 3. Using Utilities & Formatters

```typescript
import { 
  validateEmail, 
  formatCurrency, 
  formatDate, 
  getTimeAgo,
  handleError,
  showSuccess
} from "@/src/shared/utils";

// Validation
if (!validateEmail(email)) {
  showError("Invalid email");
}

// Formatting
formatCurrency(50);        // "$50.00"
formatDate("2024-03-14");  // "Mar 14, 2024"
getTimeAgo("2024-03-14");  // "2 days ago"

// Error Handling
try {
  await fetchData();
} catch (error) {
  handleError(error);  // Shows alert automatically
}
```

---

### 4. Using Global Types

```typescript
import type { 
  User, 
  Mentor, 
  Lesson, 
  Quiz,
  BookingRequest 
} from "@/src/shared/types";

const mentor: Mentor = {
  id: "m1",
  name: "Sarah Chen",
  specialty: "Web Development",
  experience: 8,
  rating: 4.9,
  reviewCount: 128,
  hourlyRate: 50,
  bio: "...",
  availability: [],
};

const booking: BookingRequest = {
  mentorId: "m1",
  timeSlot: {
    day: "Monday",
    startTime: "14:00",
    endTime: "15:00",
    available: true,
  },
  duration: 60,
  subject: "React",
  topic: "Hooks",
};
```

---

### 5. Navigating Between Screens

```typescript
import { useNavigation } from "@react-navigation/native";

export function MyScreen() {
  const navigation = useNavigation();

  return (
    <Button
      title="Go to Booking"
      onPress={() => navigation.navigate("Booking", {
        mentorId: "m1",
        mentorName: "Sarah Chen"
      })}
    />
  );
}
```

---

### 6. Building New Screens (Template)

```typescript
import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { COLORS, SPACING, TYPOGRAPHY } from "../../shared/theme";
import { Card, Button, Input } from "../../shared/components";
import { validateEmail, handleError } from "../../shared/utils";
import type { User } from "../../shared/types";

export function MyNewScreen() {
  const [data, setData] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAction = async () => {
    try {
      setLoading(true);
      // Call your service here
      // const result = await myService.getData();
      // setData(result);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My New Screen</Text>
      </View>

      <Card style={styles.content}>
        <Text style={styles.bodyText}>Content here</Text>
      </Card>

      <Button
        title="Perform Action"
        onPress={handleAction}
        loading={loading}
        style={styles.button}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light,
  },
  header: {
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.xl,
    backgroundColor: COLORS.primary,
  },
  title: {
    ...TYPOGRAPHY.h2,
    color: COLORS.white,
  },
  content: {
    margin: SPACING.base,
  },
  bodyText: {
    ...TYPOGRAPHY.body,
    color: COLORS.dark,
  },
  button: {
    margin: SPACING.base,
  },
});
```

---

### 7. Creating Feature Services

Create file: `src/features/student/services/mentorService.ts`

```typescript
import type { Mentor, PaginatedResponse } from "@/src/shared/types";
import { API_ENDPOINTS } from "@/src/shared/constants";

export async function getMentors(page: number = 1): Promise<PaginatedResponse<Mentor>> {
  try {
    const response = await fetch(`${API_ENDPOINTS.MENTORS.LIST}?page=${page}`);
    
    if (!response.ok) {
      throw new Error("Failed to fetch mentors");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function getMentorById(id: string): Promise<Mentor> {
  const url = API_ENDPOINTS.MENTORS.DETAIL.replace(":id", id);
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error("Failed to fetch mentor");
  }

  return await response.json();
}

export async function searchMentors(query: string): Promise<Mentor[]> {
  const response = await fetch(
    `${API_ENDPOINTS.MENTORS.SEARCH}?q=${query}`
  );
  
  if (!response.ok) {
    throw new Error("Search failed");
  }

  return await response.json();
}
```

---

### 8. Using Constants

```typescript
import { APP_CONSTANTS, LESSON_STATUS, USER_ROLES, API_ENDPOINTS } from "@/src/shared/constants";

// App settings
APP_CONSTANTS.MIN_PASSWORD_LENGTH;        // 8
APP_CONSTANTS.LESSON_DURATION_OPTIONS;   // [30, 45, 60, 90, 120]

// Status enums
LESSON_STATUS.SCHEDULED;    // "scheduled"
LESSON_STATUS.COMPLETED;    // "completed"

// User roles
USER_ROLES.STUDENT;         // "student"
USER_ROLES.MENTOR;          // "mentor"

// API endpoints
API_ENDPOINTS.AUTH.LOGIN;            // "/auth/login"
API_ENDPOINTS.MENTORS.LIST;          // "/mentors"
API_ENDPOINTS.LESSONS.DETAIL;        // "/lessons/:id"
```

---

### 9. Best Practices Checklist

- ✅ Always use `COLORS` from theme - Never hardcode colors
- ✅ Always use `SPACING` from theme - Never hardcode padding/margin
- ✅ Use `TYPOGRAPHY` for text styles - Consistent sizing
- ✅ Import types from `@/src/shared/types` - Type safety
- ✅ Call services for APIs - Never fetch in components
- ✅ Use `handleError` for errors - Consistent error UI
- ✅ Use shared components - Don't recreate Button, Card, etc.
- ✅ One responsibility per component - Keep components focused

---

### 10. Folder Structure for New Features

When adding a new feature, follow this structure:

```
src/features/myfeature/
├── screens/
│   ├── MyFeatureScreen.tsx
│   └── index.ts
├── components/
│   ├── MyCustomComponent.tsx
│   └── index.ts
├── services/
│   ├── myfeatureService.ts
│   └── index.ts
├── hooks/
│   ├── useMyFeature.ts
│   └── index.ts
└── types/
    └── index.ts
```

---

### Quick Reference

| Component | Import | Example |
|-----------|--------|---------|
| Button | `import { Button } from "@/src/shared/components"` | `<Button title="Click" onPress={...} />` |
| Card | `import { Card } from "@/src/shared/components"` | `<Card><Text>Content</Text></Card>` |
| Input | `import { Input } from "@/src/shared/components"` | `<Input label="Email" value={...} onChangeText={...} />` |
| Badge | `import { Badge } from "@/src/shared/components"` | `<Badge label="Active" />` |
| Avatar | `import { Avatar } from "@/src/shared/components"` | `<Avatar name="John" />` |
| Colors | `import { COLORS } from "@/src/shared/theme"` | `backgroundColor: COLORS.primary` |
| Spacing | `import { SPACING } from "@/src/shared/theme"` | `padding: SPACING.base` |
| Utils | `import { validateEmail } from "@/src/shared/utils"` | `if (validateEmail(email)) {}` |

---

Good luck building! 🚀
