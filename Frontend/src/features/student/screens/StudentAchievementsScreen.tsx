import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Badge, Card } from "@/shared/components";
import { useRouter } from "expo-router";
import { COLORS, SPACING, TYPOGRAPHY } from "@/shared/theme";
import { Award, Trophy, Medal, Star, Share2, Download, ArrowLeft } from "lucide-react-native";

interface Achievement {
  id: string;
  title: string;
  description: string;
  type: "badge" | "certificate" | "milestone";
  category: string;
  earnedDate: string;
  icon: string;
  rarity: "common" | "rare" | "epic";
  progress?: number;
}

export function StudentAchievementsScreen() {
  const router = useRouter();
  const [achievements, setAchievements] = useState<Achievement[]>([
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
      progress: undefined,
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
  ]);

  const [selectedType, setSelectedType] = useState<"all" | "badge" | "certificate" | "milestone">("all");

  const filteredAchievements = selectedType === "all"
    ? achievements
    : achievements.filter((a) => a.type === selectedType);

  const stats = {
    totalEarned: achievements.length,
    badges: achievements.filter((a) => a.type === "badge").length,
    certificates: achievements.filter((a) => a.type === "certificate").length,
    milestones: achievements.filter((a) => a.type === "milestone").length,
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "epic":
        return COLORS.warning;
      case "rare":
        return COLORS.info;
      case "common":
        return COLORS.gray400;
      default:
        return COLORS.gray500;
    }
  };

  const getRarityLabel = (rarity: string) => {
    return rarity.charAt(0).toUpperCase() + rarity.slice(1);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.heroSection}>
         <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push("/(student)/profile")}
        >
          <ArrowLeft size={24} color={COLORS.white} />
        </TouchableOpacity>
        <View style={{ flex: 1, paddingLeft: SPACING.md }}>
        <Text style={styles.heroTitle}>Achievements</Text>
        <Text style={styles.heroSubtitle}>Celebrate your learning milestones</Text>
        </View>
      </View>

      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        <Card style={styles.statCard}>
          <Trophy size={24} color={COLORS.warning} />
          <Text style={styles.statLabel}>Total</Text>
          <Text style={styles.statValue}>{stats.totalEarned}</Text>
        </Card>
        <Card style={styles.statCard}>
          <Medal size={24} color={COLORS.info} />
          <Text style={styles.statLabel}>Badges</Text>
          <Text style={styles.statValue}>{stats.badges}</Text>
        </Card>
        <Card style={styles.statCard}>
          <Award size={24} color={COLORS.success} />
          <Text style={styles.statLabel}>Certificates</Text>
          <Text style={styles.statValue}>{stats.certificates}</Text>
        </Card>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterTabs}>
        {["all", "badge", "certificate", "milestone"].map((type) => (
          <TouchableOpacity
            key={type}
            style={[
              styles.filterTab,
              selectedType === type && styles.filterTabActive,
            ]}
            onPress={() => setSelectedType(type as any)}
          >
            <Text
              style={[
                styles.filterTabText,
                selectedType === type && styles.filterTabTextActive,
              ]}
            >
              {type === "all"
                ? "All"
                : type === "badge"
                ? "Badges"
                : type === "certificate"
                ? "Certificates"
                : "Milestones"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Achievements Grid */}
      <View style={styles.section}>
        <View style={styles.achievementsGrid}>
          {filteredAchievements.map((achievement) => (
            <Card key={achievement.id} style={styles.achievementCard}>
              <View
                style={[
                  styles.iconContainer,
                  {
                    backgroundColor: getRarityColor(achievement.rarity),
                    opacity: 0.15,
                  },
                ]}
              >
                <Text style={styles.icon}>{achievement.icon}</Text>
              </View>

              <Text style={styles.achievementTitle} numberOfLines={2}>
                {achievement.title}
              </Text>

              <Text style={styles.achievementDesc} numberOfLines={2}>
                {achievement.description}
              </Text>

              <View style={styles.cardFooter}>
                <Badge
                  label={getRarityLabel(achievement.rarity)}
                  variant="secondary"
                  backgroundColor={getRarityColor(achievement.rarity)}
                  textColor={COLORS.white}
                />
              </View>

              <View style={styles.cardActions}>
                <TouchableOpacity style={styles.cardActionButton}>
                  <Share2 size={14} color={COLORS.primary} />
                </TouchableOpacity>
                {achievement.type === "certificate" && (
                  <TouchableOpacity style={styles.cardActionButton}>
                    <Download size={14} color={COLORS.primary} />
                  </TouchableOpacity>
                )}
              </View>

              <Text style={styles.earnedDate}>{achievement.earnedDate}</Text>
            </Card>
          ))}
        </View>
      </View>

      {/* Featured Achievement */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured</Text>
        <Card style={styles.featuredCard}>
          <View style={styles.featuredHeader}>
            <Text style={styles.featuredIcon}>🏆</Text>
            <View style={styles.featuredContent}>
              <Text style={styles.featuredTitle}>React Master</Text>
              <Text style={styles.featuredDesc}>
                You've mastered React fundamentals, hooks, and advanced patterns
              </Text>
            </View>
          </View>

          <View style={styles.certificatePreview}>
            <View style={styles.certificatePlaceholder}>
              <Award size={48} color={COLORS.primary} />
              <Text style={styles.certificateText}>Certificate</Text>
            </View>
          </View>

          <View style={styles.getButtonRow}>
            <TouchableOpacity style={styles.getButton}>
              <Text style={styles.getButtonText}>Share on LinkedIn</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.getButton}>
              <Download size={16} color={COLORS.primary} />
              <Text style={styles.getButtonText}>Download PDF</Text>
            </TouchableOpacity>
          </View>
        </Card>
      </View>

      {/* Upcoming Achievements */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Paths to More Achievements</Text>
        <Card style={styles.pathCard}>
          <View style={styles.pathItem}>
            <View
              style={[
                styles.pathIconBox,
                { backgroundColor: COLORS.warning },
              ]}
            >
              <Star size={20} color={COLORS.white} />
            </View>
            <View style={styles.pathInfo}>
              <Text style={styles.pathTitle}>Expert Developer</Text>
              <Text style={styles.pathDesc}>Master 5 different technologies</Text>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progress,
                    { width: "60%", backgroundColor: COLORS.warning },
                  ]}
                />
              </View>
              <Text style={styles.progressText}>3 of 5 completed</Text>
            </View>
          </View>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    paddingBottom: 120,
  },
  heroSection: {
    paddingHorizontal: SPACING.lg,
    flex:1,
    flexDirection: "row",
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.warning,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  backButton: {
    padding: SPACING.sm,
  },
  heroTitle: {
    ...TYPOGRAPHY.h1,
    color: COLORS.white,
    marginBottom: SPACING.xs,
  },
  heroSubtitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.white,
    opacity: 0.9,
    paddingBottom: SPACING["3xl"],
  },
  statsGrid: {
    flexDirection: "row",
    paddingHorizontal: SPACING.md,
    marginTop: -SPACING["3xl"],
    marginBottom: SPACING.md,
    gap: SPACING.sm,
  },
  statCard: {
    flex: 1,
    padding: SPACING.md,
    alignItems: "center",
    justifyContent: "center",
  },
  statLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray600,
    marginVertical: SPACING.xs,
  },
  statValue: {
    ...TYPOGRAPHY.h2,
    color: COLORS.dark,
  },
  filterTabs: {
    flexDirection: "row",
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.md,
    gap: SPACING.sm,
  },
  filterTab: {
    flex: 1,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.gray300,
    alignItems: "center",
  },
  filterTabActive: {
    backgroundColor: COLORS.warning,
    borderColor: COLORS.warning,
  },
  filterTabText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray600,
  },
  filterTabTextActive: {
    color: COLORS.white,
  },
  section: {
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h2,
    color: COLORS.dark,
    marginBottom: SPACING.md,
  },
  achievementsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.md,
  },
  achievementCard: {
    width: "31%",
    padding: SPACING.md,
    alignItems: "center",
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.sm,
  },
  icon: {
    fontSize: 32,
  },
  achievementTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.dark,
    marginBottom: SPACING.xs,
    textAlign: "center",
  },
  achievementDesc: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray600,
    textAlign: "center",
    marginBottom: SPACING.md,
  },
  cardFooter: {
    marginBottom: SPACING.sm,
  },
  cardActions: {
    flexDirection: "row",
    gap: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  cardActionButton: {
    flex: 1,
    paddingVertical: SPACING.xs,
    alignItems: "center",
    backgroundColor: COLORS.gray100,
    borderRadius: 6,
  },
  earnedDate: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray500,
    fontSize: 10,
  },
  featuredCard: {
    padding: SPACING.lg,
    marginBottom: SPACING.md,
  },
  featuredHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
    marginBottom: SPACING.lg,
  },
  featuredIcon: {
    fontSize: 48,
  },
  featuredContent: {
    flex: 1,
  },
  featuredTitle: {
    ...TYPOGRAPHY.h2,
    color: COLORS.dark,
    marginBottom: SPACING.xs,
  },
  featuredDesc: {
    ...TYPOGRAPHY.body,
    color: COLORS.gray600,
  },
  certificatePreview: {
    alignItems: "center",
    marginVertical: SPACING.lg,
  },
  certificatePlaceholder: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    backgroundColor: COLORS.gray100,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: COLORS.gray300,
  },
  certificateText: {
    ...TYPOGRAPHY.body,
    color: COLORS.gray600,
    marginTop: SPACING.sm,
  },
  getButtonRow: {
    flexDirection: "row",
    gap: SPACING.md,
  },
  getButton: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
    backgroundColor: COLORS.gray100,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    gap: SPACING.sm,
  },
  getButtonText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.primary,
    fontWeight: "600",
  },
  pathCard: {
    padding: SPACING.md,
  },
  pathItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
  },
  pathIconBox: {
    width: 48,
    height: 48,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  pathInfo: {
    flex: 1,
  },
  pathTitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.dark,
    fontWeight: "600",
    marginBottom: SPACING.xs,
  },
  pathDesc: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray600,
    marginBottom: SPACING.sm,
  },
  progressBar: {
    height: 6,
    backgroundColor: COLORS.gray200,
    borderRadius: 3,
    overflow: "hidden",
    marginBottom: SPACING.xs,
  },
  progress: {
    height: "100%",
    borderRadius: 3,
  },
  progressText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray600,
    fontSize: 10,
  },
});
