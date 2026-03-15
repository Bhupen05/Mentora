/**
 * Navigation Paths
 * Type-safe route definitions for navigation
 */

export const NavigationPaths = {
  // Auth routes
  AUTH: {
    SPLASH: "auth/splash",
    LOGIN: "auth/login",
    REGISTER: "auth/register",
  },

  // Student routes
  STUDENT: {
    DASHBOARD: "(student)/dashboard",
    SEARCH: "(student)/search",
    LESSONS: "(student)/lessons",
    QUIZZES: "(student)/quizzes",
    PROFILE: "(student)/profile",
  },

  // Mentor routes
  MENTOR: {
    DASHBOARD: "(mentor)/dashboard",
    EARNINGS: "(mentor)/earnings",
    PROFILE: "(mentor)/profile",
  },

  // Parent routes
  PARENT: {
    DASHBOARD: "(parent)/home",
    WALLET: "(parent)/wallet",
    PROFILE: "(parent)/profile",
  },

  // Landing page
  LANDING: "index",
} as const;

/**
 * Get role-based home route
 */
export function getRoleBasedHome(role: "student" | "mentor" | "parent" | null) {
  switch (role) {
    case "student":
      return NavigationPaths.STUDENT.DASHBOARD;
    case "mentor":
      return NavigationPaths.MENTOR.DASHBOARD;
    case "parent":
      return NavigationPaths.PARENT.DASHBOARD;
    default:
      return NavigationPaths.AUTH.LOGIN;
  }
}

/**
 * Get all routes for a specific role
 */
export function getRoleRoutes(role: "student" | "mentor" | "parent") {
  switch (role) {
    case "student":
      return Object.values(NavigationPaths.STUDENT);
    case "mentor":
      return Object.values(NavigationPaths.MENTOR);
    case "parent":
      return Object.values(NavigationPaths.PARENT);
  }
}
