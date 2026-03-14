// User Types
export type UserRole = "student" | "parent" | "mentor";

export type User = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: UserRole;
  bio?: string;
  createdAt: string;
  updatedAt: string;
};

// Mentor Type
export type Mentor = {
  id: string;
  userId: string;
  name: string;
  specialty: string;
  specialties: string[];
  experience: number; // years
  rating: number; // 1-5
  reviewCount: number;
  hourlyRate: number;
  bio: string;
  availability: TimeSlot[];
  image?: string;
  credentials?: string[];
  createdAt: string;
};

// Lesson/Session Types
export type Lesson = {
  id: string;
  mentorId: string;
  userId: string;
  mentorName: string;
  studentName: string;
  subject: string;
  topic: string;
  duration: number; // minutes
  status: "scheduled" | "in-progress" | "completed" | "cancelled";
  scheduledAt: string;
  startedAt?: string;
  endedAt?: string;
  meetingLink?: string;
};

export type SessionDetails = {
  id: string;
  lessonId: string;
  summary?: string;
  notes?: string;
  resources?: string[];
  quizId?: string;
  rating?: number;
  feedback?: string;
};

// Booking & Availability
export type TimeSlot = {
  day: string; // "Monday", "Tuesday", etc.
  startTime: string; // "09:00"
  endTime: string; // "10:00"
  available: boolean;
};

export type BookingRequest = {
  mentorId: string;
  timeSlot: TimeSlot;
  duration: number; // minutes
  subject: string;
  topic: string;
};

// Quiz Types
export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // index of correct option
  explanation?: string;
};

export type Quiz = {
  id: string;
  lessonId: string;
  title: string;
  questions: QuizQuestion[];
  duration: number; // minutes
  passingScore: number; // percentage
};

export type QuizAttempt = {
  id: string;
  quizId: string;
  userId: string;
  answers: number[]; // indices of selected answers
  score: number; // percentage
  startedAt: string;
  completedAt?: string;
};

// Parent Types
export type Parent = User & {
  children: string[]; // array of child user IDs
};

// Wallet/Payment Types
export type WalletTransaction = {
  id: string;
  userId: string;
  type: "credit" | "debit";
  amount: number;
  reason: string; // "lesson_payment", "wallet_topup", etc.
  lessonId?: string;
  timestamp: string;
};

export type Wallet = {
  userId: string;
  balance: number;
  transactions: WalletTransaction[];
  lastUpdated: string;
};

// Notification Types
export type Notification = {
  id: string;
  userId: string;
  type: "lesson_reminder" | "booking_confirmation" | "quiz_available" | "message" | "payment";
  title: string;
  message: string;
  read: boolean;
  timestamp: string;
  actionUrl?: string;
};

// API Response Types
export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
};

export type PaginatedResponse<T> = {
  success: boolean;
  data: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

// Auth Types
export type LoginCredentials = {
  email: string;
  password: string;
};

export type RegisterData = {
  name: string;
  email: string;
  password: string;
  role: UserRole;
};

export type AuthToken = {
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
};

export type AuthResponse = {
  user: User;
  token: AuthToken;
};
