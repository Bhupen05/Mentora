/**
 * Tab Icons
 * Reusable tab icon components
 */

import React from "react";
import {
  Home,
  Search,
  BookOpen,
  CircleHelp,
  User,
  Wallet,
  HandCoins,
  Users,
  Calendar,
  MessageSquare,
  BarChart3,
  Target,
  TrendingUp,
  FileText,
  Award,
} from "lucide-react-native";

interface TabIconProps {
  focused: boolean;
  color?: string;
  size?: number;
}

export const HomeIcon = ({ color = "#64748b", size = 24 }: TabIconProps) => (
  <Home size={size} color={color} strokeWidth={2.2} />
);

export const SearchIcon = ({ color = "#64748b", size = 24 }: TabIconProps) => (
  <Search size={size} color={color} strokeWidth={2.2} />
);

export const LessonsIcon = ({ color = "#64748b", size = 24 }: TabIconProps) => (
  <BookOpen size={size} color={color} strokeWidth={2.2} />
);

export const QuizzesIcon = ({ color = "#64748b", size = 24 }: TabIconProps) => (
  <CircleHelp size={size} color={color} strokeWidth={2.2} />
);

export const ProfileIcon = ({ color = "#64748b", size = 24 }: TabIconProps) => (
  <User size={size} color={color} strokeWidth={2.2} />
);

export const EarningsIcon = ({ color = "#64748b", size = 24 }: TabIconProps) => (
  <HandCoins size={size} color={color} strokeWidth={2.2} />
);

export const WalletIcon = ({ color = "#64748b", size = 24 }: TabIconProps) => (
  <Wallet size={size} color={color} strokeWidth={2.2} />
);

export const StudentsIcon = ({ color = "#64748b", size = 24 }: TabIconProps) => (
  <Users size={size} color={color} strokeWidth={2.2} />
);

export const ScheduleIcon = ({ color = "#64748b", size = 24 }: TabIconProps) => (
  <Calendar size={size} color={color} strokeWidth={2.2} />
);

export const MessagesIcon = ({ color = "#64748b", size = 24 }: TabIconProps) => (
  <MessageSquare size={size} color={color} strokeWidth={2.2} />
);

export const AnalyticsIcon = ({ color = "#64748b", size = 24 }: TabIconProps) => (
  <BarChart3 size={size} color={color} strokeWidth={2.2} />
);

export const GoalsIcon = ({ color = "#64748b", size = 24 }: TabIconProps) => (
  <Target size={size} color={color} strokeWidth={2.2} />
);

export const ProgressIcon = ({ color = "#64748b", size = 24 }: TabIconProps) => (
  <TrendingUp size={size} color={color} strokeWidth={2.2} />
);

export const ResourcesIcon = ({ color = "#64748b", size = 24 }: TabIconProps) => (
  <FileText size={size} color={color} strokeWidth={2.2} />
);

export const AchievementsIcon = ({ color = "#64748b", size = 24 }: TabIconProps) => (
  <Award size={size} color={color} strokeWidth={2.2} />
);
