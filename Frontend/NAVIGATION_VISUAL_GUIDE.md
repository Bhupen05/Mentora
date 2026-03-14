# Navigation System - Visual Architecture

## Navigation Stack Hierarchy

```
┌─────────────────────────────────────────────────────────────────┐
│              RootLayout with AuthProvider                       │
│  (src/app/_layout.tsx)                                          │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
                      ┌──────────────────┐
                      │  AuthContext     │
                      │ (Global State)   │
                      │                  │
                      │ isAuthenticated  │
                      │ userRole         │
                      │ login()          │
                      │ logout()         │
                      │ register()       │
                      └────────┬─────────┘
                               │
                ┌──────────────┴──────────────┐
                │                            │
                ▼                            ▼
         FALSE (Not Auth)             TRUE (Authenticated)
                │                            │
                ▼                            ▼
    ┌─────────────────────┐      ┌──────────────────────────────┐
    │    Auth Stack       │      │   Role-Based Stacks          │
    │ (src/app/auth/)     │      │                              │
    └─────────────────────┘      │  ├─ (Student Tab Nav)        │
    ├─ splash/            │      │  │  ├─ Dashboard             │
    │  └─ SplashScreen    │      │  │  ├─ Search                │
    │     [2.5s wait]     │      │  │  ├─ Lessons               │
    │                     │      │  │  ├─ Quizzes               │
    ├─ login/             │      │  │  └─ Profile               │
    │  └─ LoginScreen     │      │  │                           │
    │     [Role Select]   │      │  ├─ (Mentor Tab Nav)         │
    │                     │      │  │  ├─ Dashboard             │
    ├─ register/          │      │  │  ├─ Earnings              │
    │  └─ RegisterScreen  │      │  │  └─ Profile               │
    │                     │      │  │                           │
    └─────────────────────┘      │  └─ (Parent Tab Nav)         │
                                 │     ├─ Dashboard             │
                                 │     ├─ Wallet                │
                                 │     └─ Profile               │
                                 └──────────────────────────────┘
```

## Data Flow Architecture

```
┌────────────────────────────────────────────────────────────────┐
│                     Component Tree                             │
│                                                                │
│  ┌──────────────────────────────────────────────────────┐     │
│  │ RootLayout (src/app/_layout.tsx)                     │     │
│  │ ├─ AuthProvider wrapper                             │     │
│  │ │  └─ RootLayoutContent                             │     │
│  │ │     └─ Conditional Stack rendering                │     │
│  └──────────────────────────────────────────────────────┘     │
│                                                                │
│                  imports AuthContext                          │
│                         ↓                                      │
│  ┌──────────────────────────────────────────────────────┐     │
│  │ AuthContext (src/shared/context/AuthContext.tsx)    │     │
│  │                                                      │     │
│  │ State:                                              │     │
│  │  • isAuthenticated: boolean                         │     │
│  │  • userRole: 'student' | 'mentor' | 'parent'       │     │
│  │  • isLoading: boolean                               │     │
│  │                                                      │     │
│  │ Methods:                                            │     │
│  │  • login(email, password, role)                     │     │
│  │  • register(email, password, role)                  │     │
│  │  • logout()                                         │     │
│  │  • checkAuth()                                      │     │
│  │                                                      │     │
│  │ Provider Context for app-wide access                │     │
│  └──────────────────────────────────────────────────────┘     │
│                                                                │
│                  uses NavigationPaths                         │
│                         ↓                                      │
│  ┌──────────────────────────────────────────────────────┐     │
│  │ navigationPaths (src/shared/utils/navigationPaths) │     │
│  │                                                      │     │
│  │ Constants:                                          │     │
│  │  • NavigationPaths.AUTH.LOGIN                       │     │
│  │  • NavigationPaths.STUDENT.DASHBOARD               │     │
│  │  • NavigationPaths.MENTOR.EARNINGS                 │     │
│  │  • NavigationPaths.PARENT.WALLET                   │     │
│  │                                                      │     │
│  │ Helpers:                                            │     │
│  │  • getRoleBasedHome(role)                           │     │
│  │  • getRoleRoutes(role)                              │     │
│  └──────────────────────────────────────────────────────┘     │
│                                                                │
│                   renders with Tab Icons                      │
│                         ↓                                      │
│  ┌──────────────────────────────────────────────────────┐     │
│  │ TabIcons (src/shared/components/TabIcons.tsx)       │     │
│  │                                                      │     │
│  │ Components:                                         │     │
│  │  • HomeIcon                                         │     │
│  │  • SearchIcon                                       │     │
│  │  • LessonsIcon                                      │     │
│  │  • QuizzesIcon                                      │     │
│  │  • ProfileIcon                                      │     │
│  │  • EarningsIcon                                     │     │
│  │  • WalletIcon                                       │     │
│  │                                                      │     │
│  │ Each reacts to focused state (emoji change)         │     │
│  └──────────────────────────────────────────────────────┘     │
└────────────────────────────────────────────────────────────────┘
```

## User Flow Diagram

```
                        ┌─────────────┐
                        │ App Launch  │
                        └──────┬──────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │ AuthContext checks   │
                    │ stored auth token    │
                    └──────────┬───────────┘
                        ┌──────┴──────┐
                        │             │
        ┌───────────────▼┐     ┌─────▼──────────────┐
        │ Token exists?  │     │ isLoading = false  │
        └───────┬────────┘     └─────┬──────────────┘
            YES │                     │
                │                     │ NO
                │                     │
        ┌───────▼──────────┐   ┌─────▼──────────────┐
        │ Verify token     │   │ Show Auth Stack    │
        │ (checkAuth)      │   │ (Splash first)     │
        └────────┬─────────┘   │                    │
                 │             │ "Sign Up?" click   │
        ┌────────▼─────────┐   ├──────────────┐     │
        │ Valid?           │   │              │     │
        └────┬────────┬────┘   ▼              │     │
             │ YES    │ NO  ┌────────────┐    │     │
             │        │     │ Go to      │    │     │
             │        │     │ Register   │    │     │
             │        │     └────────────┘    │     │
             │        │                       │     │
             │        └──────┬────────────────┘     │
             │               │                      │
             ▼               │                      │
        ┌─────────────┐      │                      │
        │ Get user    │      │                      │
        │ role & data │      │  "Create Account"    │
        └────┬────────┘      │  or "Sign Up"        │
             │               │                      │
             │         ┌─────▼──────┐   ┌─────────┐│
             │         │ Go to       │───│Register││
             │         │ Register    │   │Screen  ││
             │         └─────┬──────┘   └────┬───┘│
             │               │               │    │
             │               └───────────┬───┘    │
             │                           │        │
             │        ┌──────────────────▼─────┐  │
             │        │ Email & Password OK?   │  │
             │        └──────────┬──────┬──────┘  │
             │                   │ NO   │ YES     │
             │                   │  ┌───▼──────┐  │
             │                   │  │ Register │  │
             │                   │  │ with API │  │
             │                   │  └───┬──────┘  │
             │                   │      │         │
             └───────────────────┼──────┼─────────┘
                                 │      │
                        ┌────────▼──────▼–─────┐
                        │ Login/Register       │
                        │ with email, pwd, role│
                        └────────┬─────────────┘
                                 │
                    ┌────────────▼────────────┐
                    │ Call AuthContext       │
                    │ .login() or            │
                    │ .register()            │
                    └────────┬─────────────┘
                             │
                    ┌────────▼────────────┐
                    │ Verify credentials  │
                    │ (with authService)  │
                    └────────┬────────┬────────┐
                             │ FAIL   │ SUCCESS│
                             │        │        │
                    ┌────────▼─────┐  │        │
                    │ Show error   │  │        │
                    │ Try again    │  │        │
                    └──────────────┘  │        │
                                      │        │
                            ┌─────────▼────────▼────────────┐
                            │ Set Auth State:               │
                            │  • isAuthenticated = true     │
                            │  • userRole = role            │
                            │  • store token (async)        │
                            └──────────┬────────────────────┘
                                       │
                            ┌──────────▼──────────┐
                            │ RootLayout sees     │
                            │ isAuthenticated=true│
                            │ Renders role stack  │
                            └──────────┬──────────┘
                                       │
              ┌────────────────────────┼────────────────────┐
              │                        │                    │
              ▼                        ▼                    ▼
        ┌──────────────┐     ┌──────────────┐      ┌──────────────┐
        │ Student Tabs │     │ Mentor Tabs  │      │ Parent Tabs  │
        │              │     │              │      │              │
        ├─ Dashboard   │     ├─ Dashboard   │      ├─ Dashboard   │
        ├─ Search      │     ├─ Earnings    │      ├─ Wallet      │
        ├─ Lessons     │     └─ Profile     │      └─ Profile     │
        ├─ Quizzes     │                    │
        └─ Profile     │                    │
             │             │                 │
             │    Profile  │    Profile      │
             │    tab      │    tab          │
             │    click    │    click        │    Profile tap
             │    │        │    │            │    │
             └────┼────────┼────┼────────────┼────┤
                  │        │    │            │    │
                  └────┬───┴────┴────────────┴────┘
                       │ "Logout" button
                       │ tapped
                       ▼
            ┌──────────────────────┐
            │ Call logout()        │
            │ from AuthContext     │
            └──────┬───────────────┘
                   │
          ┌────────▼────────────┐
          │ Clear auth state:   │
          │ • isAuthenticated = false
          │ • userRole = null   │
          │ • clear token       │
          └──────┬──────────────┘
                 │
      ┌──────────▼──────────────┐
      │ RootLayout sees         │
      │ isAuthenticated=false   │
      │ Renders Auth Stack      │
      └──────┬──────────────────┘
             │
             ▼
        ┌──────────────┐
        │ Splash       │
        │ Screen Again │
        └──────────────┘
```

## Module Dependencies

```
┌───────────────────────────┐
│   App Components          │
│   (Screens, Features)     │
└────────────┬──────────────┘
             │ imports
             ▼
┌───────────────────────────────────────────┐
│   Shared Layer                            │
│                                           │
│  ┌─────────────────────────────────────┐  │
│  │ Context                             │  │
│  │ ├─ AuthContext (auth state)         │  │
│  └─────────────────────────────────────┘  │
│                                           │
│  ┌─────────────────────────────────────┐  │
│  │ Utils                               │  │
│  │ ├─ navigationPaths (route const)   │  │
│  │ ├─ errorHandler                     │  │
│  │ ├─ formatters                       │  │
│  └─────────────────────────────────────┘  │
│                                           │
│  ┌─────────────────────────────────────┐  │
│  │ Components                          │  │
│  │ ├─ Button, Input, Card             │  │
│  │ ├─ Avatar, Badge, Loader           │  │
│  │ ├─ TabIcons (emoji icons)          │  │
│  ├─ Theme                              │  │
│  ├─ Types                              │  │
│  ├─ Hooks                              │  │
│  ├─ Constants                          │  │
│  └─────────────────────────────────────┘  │
└───────────────────────────────────────────┘
             │ imports
             ▼
┌───────────────────────────────────────┐
│  Services Layer                       │
│  ├─ apiClient.ts (API requests)      │
│  ├─ authService.ts (auth operations) │
│  ├─ mentorService.ts                 │
│  ├─ lessonService.ts                 │
│  ├─ quizService.ts                   │
│  └─ [other services...]              │
└───────────────────────────────────────┘
             │ imports
             ▼
┌───────────────────────────────────────┐
│  External Libraries                   │
│  ├─ expo-router (navigation)          │
│  ├─ react-native (UI)                 │
│  ├─ axios or fetch (HTTP)             │
│  └─ [other packages...]               │
└───────────────────────────────────────┘
```

## Error Handling Flow

```
User Action (e.g., Login Click)
       │
       ▼
Try {
  ├─ Validate input (email, password)
  │  └─ Show local errors if invalid
  │
  ├─ Call AuthContext.login()
  │  │
  │  ├─ Make API request
  │  │
  │  ├─ Validate response
  │  │
  │  ├─ Store token in secure storage
  │  │
  │  └─ Update auth state
  │
  └─ Navigate to role-based home
} Catch (error) {
  ├─ Log error
  ├─ Show user-friendly error message
  └─ Allow retry
}
```

This architecture ensures:
- ✅ Clean separation of concerns
- ✅ Type-safe navigation
- ✅ Predictable auth flow
- ✅ Easy testing and debugging
- ✅ Scalable for new features
