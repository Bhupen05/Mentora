export const APP_CONSTANTS = {
  MIN_PASSWORD_LENGTH: 8,
  MAX_BIO_LENGTH: 500,
  LESSON_DURATION_OPTIONS: [30, 45, 60, 90, 120],
  DEFAULT_LESSON_DURATION: 60,
  RATING_SCALE: 5,
  PROFILE_IMAGE_SIZE: 200,
};

export const LESSON_STATUS = {
  SCHEDULED: "scheduled",
  IN_PROGRESS: "in-progress",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
} as const;

export const USER_ROLES = {
  STUDENT: "student",
  PARENT: "parent",
  MENTOR: "mentor",
} as const;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
    VERIFY_EMAIL: "/auth/verify-email",
  },
  MENTORS: {
    LIST: "/mentors",
    DETAIL: "/mentors/:id",
    CREATE: "/mentors",
    UPDATE: "/mentors/:id",
    DELETE: "/mentors/:id",
    SEARCH: "/mentors/search",
    AVAILABILITY: "/mentors/:id/availability",
  },
  LESSONS: {
    LIST: "/lessons",
    CREATE: "/lessons",
    DETAIL: "/lessons/:id",
    UPDATE: "/lessons/:id",
    CANCEL: "/lessons/:id/cancel",
    JOIN: "/lessons/:id/join",
  },
  USERS: {
    PROFILE: "/users/profile",
    UPDATE_PROFILE: "/users/profile",
    CHANGE_PASSWORD: "/users/change-password",
    CHILDREN: "/users/children",
  },
  QUIZZES: {
    LIST: "/quizzes",
    DETAIL: "/quizzes/:id",
    SUBMIT: "/quizzes/:id/submit",
    RESULTS: "/quizzes/:id/results/:attemptId",
  },
  WALLET: {
    BALANCE: "/wallet/balance",
    TRANSACTIONS: "/wallet/transactions",
    TOPUP: "/wallet/topup",
  },
  NOTIFICATIONS: {
    LIST: "/notifications",
    MARK_READ: "/notifications/:id/read",
    DELETE: "/notifications/:id",
  },
};

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
} as const;
