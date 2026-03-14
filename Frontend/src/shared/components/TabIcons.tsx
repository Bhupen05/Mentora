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
