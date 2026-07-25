import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { COLORS, SPACING, TYPOGRAPHY } from "@/shared/theme";
import { Card, Badge } from "@/shared/components";
import { AchievementCard } from "../components/AchievementCard";
import { Trophy, ArrowRight } from "lucide-react-native";

interface Achievement {
  id: string;
  title: string;
  description: string;
  type: "badge" | "certificate" | "milestone";
  category: string;
  earnedDate: string;
  icon: string;
  rarity: "common" | "rare" | "epic";
}

export function ProfileScreen() {
  const router = useRouter();

  const user = {
    name: "Alex Johnson",
    email: "alex@example.com",
    role: "student",
    joinedDate: "January 2024",
    completedLessons: 15,
    currentStreak: 7,
    totalHours: 22,
    profileImage: "@/assets/pfp/1.jpg", // Set to null for default initials, or provide image URI
    initials: "AJ",
  };

  const achievements: Achievement[] = [
    {
      id: "a1",
      title: "React Master",
      description: "Complete all React fundamentals and advanced courses",
      type: "certificate",
      category: "React",
      earnedDate: "Mar 10, 2026",
      icon: "🏆",
      rarity: "epic",
    },
    {
      id: "a2",
      title: "5-Session Streak",
      description: "Complete 5 sessions in a row",
      type: "badge",
      category: "Consistency",
      earnedDate: "Mar 15, 2026",
      icon: "🔥",
      rarity: "rare",
    },
    {
      id: "a3",
      title: "Quiz Master",
      description: "Score 100% on 10 quizzes",
      type: "badge",
      category: "Performance",
      earnedDate: "Mar 12, 2026",
      icon: "⭐",
      rarity: "rare",
    },
    {
      id: "a4",
      title: "Fast Learner",
      description: "Complete a course in record time",
      type: "milestone",
      category: "Speed",
      earnedDate: "Feb 28, 2026",
      icon: "⚡",
      rarity: "common",
    },
    {
      id: "a5",
      title: "Perfect Score",
      description: "Score 95% or higher on all assessments",
      type: "badge",
      category: "Excellence",
      earnedDate: "Mar 08, 2026",
      icon: "💯",
      rarity: "epic",
    },
    {
      id: "a6",
      title: "Dedication",
      description: "Study for 50+ hours total",
      type: "milestone",
      category: "Dedication",
      earnedDate: "Mar 14, 2026",
      icon: "📚",
      rarity: "common",
    },
  ];

  // Show only completed (earned) achievements
  const completedAchievements = achievements.filter((a) => a.earnedDate);
  const displayedAchievements = completedAchievements.slice(0, 3); // Show 3 on profile

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.headerSection}>
        <Text style={styles.screenTitle}>My Profile</Text>
        <Text style={styles.screenSubtitle}>Track your growth and manage your account.</Text>
      </View>

      <View style={styles.profileCardWrap}>
        <Card style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            {user.profileImage ? (
              <>
                <Image
                  source={require("@/assets/pfp/1.jpg")}
                  style={styles.profileImage}
                />
                <View style={styles.avatarOverlay} />
              </>
            ) : (
              <View style={styles.avatarFallback}>
                <Text style={styles.avatar}>{user.initials}</Text>
              </View>
            )}
          </View>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
          <Badge label={user.role} variant="primary" />
        </Card>
      </View>

      {/* Stats */}
      <View style={styles.statsSection}>
        <Card style={styles.statCard}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{user.completedLessons}</Text>
            <Text style={styles.statLabel}>Lessons Completed</Text>
          </View>
        </Card>
        <Card style={styles.statCard}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{user.totalHours}</Text>
            <Text style={styles.statLabel}>Total Hours</Text>
          </View>
        </Card>
        <Card style={styles.statCard}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{user.currentStreak}🔥</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
        </Card>
      </View>

      {/* Achievements Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Achievements</Text>
          <Text style={styles.achievementCount}>{completedAchievements.length}</Text>
        </View>
        {displayedAchievements.map((achievement) => (
          <AchievementCard
            key={achievement.id}
            {...achievement}
            isPreview
          />
        ))}
        <TouchableOpacity
          style={styles.viewAllAchievementsButton}
          onPress={() => router.push("/(student)/profile/achievements")}
        >
          <Trophy size={20} color={COLORS.white} />
          <View style={{ flex: 1 }}>
            <Text style={styles.viewAllAchievementsButtonText}>
              View All Achievements
            </Text>
            <Text style={styles.viewAllAchievementsButtonSubtext}>
              {completedAchievements.length} badges earned
            </Text>
          </View>
          <ArrowRight size={20} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      {/* Profile Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Profile Information</Text>
        <Card>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Name</Text>
            <Text style={styles.infoValue}>{user.name}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>{user.email}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Role</Text>
            <Text style={styles.infoValue}>{user.role}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Joined</Text>
            <Text style={styles.infoValue}>{user.joinedDate}</Text>
          </View>
        </Card>
      </View>

      {/* Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>
        <Card>
          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingText}>Edit Profile</Text>
            <Text style={styles.arrow}>→</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingText}>Change Password</Text>
            <Text style={styles.arrow}>→</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingText}>Notifications</Text>
            <Text style={styles.arrow}>→</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingText}>Privacy Settings</Text>
            <Text style={styles.arrow}>→</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.settingItem, styles.logoutItem]}>
            <Text style={styles.logoutText}>Logout</Text>
            <Text style={styles.arrow}>→</Text>
          </TouchableOpacity>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light,
  },
  contentContainer: {
    paddingBottom: SPACING["6xl"],
  },
  headerSection: {
    paddingHorizontal: SPACING.base,
    paddingTop: SPACING["2xl"],
    paddingBottom: SPACING["3xl"],
    backgroundColor: COLORS.primaryDark,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  screenTitle: {
    ...TYPOGRAPHY.h2,
    color: COLORS.white,
    letterSpacing: 0.5,
  },
  screenSubtitle: {
    ...TYPOGRAPHY.body,
    color: "rgba(255, 255, 255, 0.9)",
    marginTop: SPACING.sm,
    lineHeight: 22,
  },
  profileCardWrap: {
    marginTop: -SPACING["3xl"],
    paddingHorizontal: SPACING.base,
  },
  profileCard: {
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.gray200,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.base,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.secondary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACING.base,
    borderWidth: 3,
    borderColor: COLORS.primary,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    overflow: "hidden",
  },
  profileImage: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
  avatarOverlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 50,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  avatarFallback: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
    backgroundColor: COLORS.secondary,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    fontSize: 36,
    fontWeight: "700",
    color: COLORS.white,
  },
  name: {
    ...TYPOGRAPHY.h2,
    color: COLORS.dark,
    marginBottom: SPACING.sm,
    fontSize: 20,
    fontWeight: "700",
  },
  email: {
    ...TYPOGRAPHY.body,
    color: COLORS.gray600,
    marginBottom: SPACING.base,
    fontSize: 14,
  },
  statsSection: {
    flexDirection: "row",
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.lg,
    gap: SPACING.md,
  },
  statCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.sm,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    ...TYPOGRAPHY.h3,
    color: COLORS.primary,
    fontSize: 24,
    fontWeight: "700",
  },
  statLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray600,
    marginTop: SPACING.sm,
    textAlign: "center",
    fontSize: 12,
    fontWeight: "500",
  },
  section: {
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING["2xl"],
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    ...TYPOGRAPHY.bodyLarge,
    color: COLORS.dark,
    fontWeight: "700",
    fontSize: 16,
  },
  achievementCount: {
    ...TYPOGRAPHY.bodySmall,
    fontWeight: "600",
    backgroundColor: COLORS.info,
    color: COLORS.white,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 16,
    fontSize: 12,
    overflow: "hidden",
  },
  viewAllAchievementsButton: {
    marginTop: SPACING.lg,
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.lg,
    backgroundColor: COLORS.warning,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
  viewAllAchievementsButtonText: {
    ...TYPOGRAPHY.bodyLarge,
    color: COLORS.white,
    fontWeight: "700",
    fontSize: 15,
  },
  viewAllAchievementsButtonSubtext: {
    ...TYPOGRAPHY.bodySmall,
    color: "rgba(255, 255, 255, 0.85)",
    marginTop: SPACING.xs,
    fontSize: 12,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },
  infoLabel: {
    ...TYPOGRAPHY.body,
    color: COLORS.gray600,
    fontWeight: "500",
    fontSize: 14,
  },
  infoValue: {
    ...TYPOGRAPHY.body,
    color: COLORS.dark,
    fontWeight: "600",
    fontSize: 14,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },
  settingText: {
    ...TYPOGRAPHY.body,
    color: COLORS.dark,
    fontWeight: "500",
    fontSize: 15,
  },
  arrow: {
    fontSize: 20,
    color: COLORS.gray400,
    fontWeight: "300",
  },
  logoutItem: {
    borderBottomWidth: 0,
  },
  logoutText: {
    ...TYPOGRAPHY.body,
    color: COLORS.error,
    fontWeight: "600",
    fontSize: 15,
  },
});
