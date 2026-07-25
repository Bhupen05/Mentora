import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Modal, Image } from "react-native";
import { Badge, Button, Card } from "@/shared/components";
import { COLORS, SPACING, TYPOGRAPHY } from "@/shared/theme";

const FONT = {
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
} as const;
import { TrendingUp, Users, Clock, Star, Award, Zap, BarChart3, X, Briefcase, Shield, Gem, Calendar, CheckCircle2, MessageSquare, Target, TrendingDown, ArrowUp } from "lucide-react-native";

type ResourceLevel = "Beginner" | "Intermediate" | "Advanced";

interface ChartDataPoint {
  label: string;
  value: number;
}

export function MentorProfileScreen() {
  const mentor = {
    name: "Dr. Sarah Chen",
    profileImage: "https://i.pinimg.com/1200x/5b/48/61/5b48616281eaddca7c7c056037794929.jpg",
    initials: "SC",
    email: "sarah@example.com",
    role: "mentor",
    expertise: "Web Development, React, TypeScript",
    rating: 4.9,
    studentsHelped: 42,
    completedSessions: 128,
    joinedDate: "June 2023",
  };

  const [resourceTitle, setResourceTitle] = useState("");
  const [resourceLevel, setResourceLevel] = useState<ResourceLevel>("Beginner");
  const [resourceType, setResourceType] = useState("Worksheet");
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);

  const [resources, setResources] = useState([
    { id: "v1", title: "React Hooks Warmup", type: "Worksheet", level: "Beginner" },
    { id: "v2", title: "Type Narrowing Drill", type: "Template", level: "Intermediate" },
    { id: "v3", title: "Async Patterns Playbook", type: "Playbook", level: "Advanced" },
  ]);

  const reliability = {
    attendanceRate: 98,
    responseTime: "7m avg",
    completionRate: 96,
    rebookingRate: 76,
    ratingTrend: "+0.2 last 30 days",
  };

  const overallMetrics = {
    totalSessions: 47,
    totalStudents: 12,
    avgRating: 4.78,
    totalHours: 23,
    completionRate: 94,
    responseTime: "5.2m",
  };

  const performanceTrend: ChartDataPoint[] = [
    { label: "Week 1", value: 65 },
    { label: "Week 2", value: 78 },
    { label: "Week 3", value: 85 },
    { label: "Week 4", value: 92 },
  ];

  const studentProgress = {
    excellent: 7,
    good: 4,
    improving: 1,
  };

  const sessionQuality = [
    { metric: "Session Prep", score: 87 },
    { metric: "Student Engagement", score: 92 },
    { metric: "Knowledge Transfer", score: 85 },
    { metric: "Homework Completion", score: 78 },
  ];

  const revenueMetrics = [
    { week: "Week 1", revenue: 320 },
    { week: "Week 2", revenue: 385 },
    { week: "Week 3", revenue: 450 },
    { week: "Week 4", revenue: 520 },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 90) return COLORS.success;
    if (score >= 80) return COLORS.warning;
    return COLORS.error;
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.headerSection}>
        <View style={styles.avatarContainer}>
          {mentor.profileImage ? (
            <Image source={{ uri: mentor.profileImage }} style={styles.avatarImage} />
          ) : (
            <Text style={styles.avatar}>{mentor.initials}</Text>
          )}
        </View>
        <Text style={styles.name}>{mentor.name}</Text>
        <Text style={styles.email}>{mentor.email}</Text>
        <Badge label={mentor.role} variant="primary" />
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Briefcase size={24} color={COLORS.primary} />
          <Text style={styles.sectionTitle}>Expertise</Text>
        </View>
        <Card style={styles.infoCard}>
          <Text style={styles.text}>{mentor.expertise}</Text>
        </Card>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Shield size={24} color={COLORS.primary} />
          <Text style={styles.sectionTitle}>Reliability Scorecard</Text>
        </View>
        <Card style={styles.scoreCard}>
          {/* Attendance */}
          <View style={styles.scoreItemContainer}>
            <View style={styles.scoreItemHeader}>
              <View style={styles.scoreItemIconBox}>
                <CheckCircle2 size={20} color={COLORS.success} />
              </View>
              <View style={styles.scoreItemInfo}>
                <Text style={styles.scoreLabel}>Attendance</Text>
                <Text style={styles.scoreSubtitle}>On-time session rate</Text>
              </View>
              <Text style={[styles.scoreValueLarge, { color: COLORS.success }]}>{reliability.attendanceRate}%</Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progress, { width: `${reliability.attendanceRate}%`, backgroundColor: COLORS.success }]} />
            </View>
          </View>

          {/* Response Time */}
          <View style={styles.scoreItemContainer}>
            <View style={styles.scoreItemHeader}>
              <View style={styles.scoreItemIconBox}>
                <MessageSquare size={20} color={COLORS.info} />
              </View>
              <View style={styles.scoreItemInfo}>
                <Text style={styles.scoreLabel}>Response Time</Text>
                <Text style={styles.scoreSubtitle}>Average reply time</Text>
              </View>
              <Text style={[styles.scoreValueLarge, { color: COLORS.info }]}>{reliability.responseTime}</Text>
            </View>
          </View>

          {/* Completion Rate */}
          <View style={styles.scoreItemContainer}>
            <View style={styles.scoreItemHeader}>
              <View style={styles.scoreItemIconBox}>
                <Target size={20} color={COLORS.primary} />
              </View>
              <View style={styles.scoreItemInfo}>
                <Text style={styles.scoreLabel}>Completion Rate</Text>
                <Text style={styles.scoreSubtitle}>Session completion</Text>
              </View>
              <Text style={[styles.scoreValueLarge, { color: COLORS.primary }]}>{reliability.completionRate}%</Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progress, { width: `${reliability.completionRate}%`, backgroundColor: COLORS.primary }]} />
            </View>
          </View>

          {/* Rebooking Rate */}
          <View style={styles.scoreItemContainer}>
            <View style={styles.scoreItemHeader}>
              <View style={styles.scoreItemIconBox}>
                <Star size={20} color={COLORS.warning} />
              </View>
              <View style={styles.scoreItemInfo}>
                <Text style={styles.scoreLabel}>Rebooking Rate</Text>
                <Text style={styles.scoreSubtitle}>Student satisfaction</Text>
              </View>
              <Text style={[styles.scoreValueLarge, { color: COLORS.warning }]}>{reliability.rebookingRate}%</Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progress, { width: `${reliability.rebookingRate}%`, backgroundColor: COLORS.warning }]} />
            </View>
          </View>

          {/* Rating Trend */}
          <View style={[styles.scoreItemContainer, { borderBottomWidth: 0 }]}>
            <View style={styles.scoreItemHeader}>
              <View style={styles.scoreItemIconBox}>
                <TrendingUp size={20} color={COLORS.success} />
              </View>
              <View style={styles.scoreItemInfo}>
                <Text style={styles.scoreLabel}>Rating Trend</Text>
                <Text style={styles.scoreSubtitle}>30-day comparison</Text>
              </View>
              <Text style={[styles.scoreValueLarge, { color: COLORS.success }]}>{reliability.ratingTrend}</Text>
            </View>
          </View>
        </Card>
      </View>

      <View style={styles.statsSection}>
        <Card style={styles.statCardRating}>
          <View style={styles.statHeader}>
            <View style={[styles.statIconBox, { backgroundColor: "#fff3cd" }]}>
              <Star size={24} color={COLORS.warning} fill={COLORS.warning} />
            </View>
            <View style={styles.statContent}>
              <Text style={styles.statLabel}>Rating</Text>
              <View style={styles.ratingRow}>
                <Text style={styles.statNumber}>{mentor.rating}</Text>
                <Text style={styles.ratingOut}>/5.0</Text>
              </View>
              <Text style={styles.statMeta}>Excellent performance</Text>
            </View>
          </View>
        </Card>
        <Card style={styles.statCardSuccess}>
          <View style={styles.statHeader}>
            <View style={[styles.statIconBox, { backgroundColor: "#d4edda" }]}>
              <Users size={24} color={COLORS.success} />
            </View>
            <View style={styles.statContent}>
              <Text style={styles.statLabel}>Students Helped</Text>
              <View style={styles.ratingRow}>
                <Text style={styles.statNumber}>{mentor.studentsHelped}</Text>
                <Text style={styles.ratingOut}>active</Text>
              </View>
              <Text style={styles.statMeta}>Growing community</Text>
            </View>
          </View>
        </Card>
        <Card style={styles.statCardPrimary}>
          <View style={styles.statHeader}>
            <View style={[styles.statIconBox, { backgroundColor: "#cfe2ff" }]}>
              <Clock size={24} color={COLORS.primary} />
            </View>
            <View style={styles.statContent}>
              <Text style={styles.statLabel}>Sessions</Text>
              <View style={styles.ratingRow}>
                <Text style={styles.statNumber}>{mentor.completedSessions}</Text>
                <Text style={styles.ratingOut}>completed</Text>
              </View>
              <Text style={styles.statMeta}>Highly experienced</Text>
            </View>
          </View>
        </Card>
      </View>

      {/* Analytics Button */}
      <View style={styles.section}>
        <Button
          title="View Analytics"
          onPress={() => setShowAnalyticsModal(true)}
          style={styles.button}
        />
      </View>

      {/* Analytics Modal */}
      <Modal
        visible={showAnalyticsModal}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setShowAnalyticsModal(false)}
      >
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          {/* Modal Header */}
          <View style={styles.modalHeader}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setShowAnalyticsModal(false)}
              style={styles.closeButton}
            >
              <X size={24} color={COLORS.dark} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Performance Analytics</Text>
            <View style={{ width: 24 }} />
          </View>

          {/* Analytics Content */}
          <View style={styles.section}>
            {/* Key Metrics Grid */}
            <View style={styles.metricsGrid}>
              <MetricCard
                icon={Clock}
                label="Total Sessions"
                value={overallMetrics.totalSessions.toString()}
                unit="sessions"
                color={COLORS.info}
              />
              <MetricCard
                icon={Users}
                label="Students"
                value={overallMetrics.totalStudents.toString()}
                unit="active"
                color={COLORS.success}
              />
              <MetricCard
                icon={Star}
                label="Avg Rating"
                value={overallMetrics.avgRating.toString()}
                unit="/5.0"
                color={COLORS.warning}
              />
              <MetricCard
                icon={TrendingUp}
                label="Completion"
                value={overallMetrics.completionRate.toString()}
                unit="%"
                color={COLORS.primary}
              />
            </View>

            {/* Performance Trend */}
            <Card style={styles.chartCard}>
              <Text style={styles.cardTitle}>Performance Trend</Text>
              <View style={styles.trendChart}>
                {performanceTrend.map((point) => {
                  const maxValue = 100;
                  const height = (point.value / maxValue) * 120;
                  return (
                    <View key={point.label} style={styles.chartBar}>
                      <View
                        style={[
                          styles.bar,
                          {
                            height: height,
                            backgroundColor:
                              point.value >= 85 ? COLORS.success : COLORS.primary,
                          },
                        ]}
                      />
                      <Text style={styles.chartLabel}>{point.label}</Text>
                      <Text style={styles.chartValue}>{point.value}%</Text>
                    </View>
                  );
                })}
              </View>
            </Card>

            {/* Session Quality Metrics */}
            <Card style={styles.qualityCard}>
              <Text style={styles.cardTitle}>Session Quality</Text>
              {sessionQuality.map((item, index) => (
                <View key={index} style={styles.qualityItem}>
                  <View style={styles.qualityHeader}>
                    <Text style={styles.qualityLabel}>{item.metric}</Text>
                    <Text style={[styles.qualityScore, { color: getScoreColor(item.score) }]}>
                      {item.score}%
                    </Text>
                  </View>
                  <View style={styles.progressBar}>
                    <View
                      style={[
                        styles.progress,
                        {
                          width: `${item.score}%`,
                          backgroundColor: getScoreColor(item.score),
                        },
                      ]}
                    />
                  </View>
                </View>
              ))}
            </Card>

            {/* Student Progress Distribution */}
            <Card style={styles.distributionCard}>
              <Text style={styles.cardTitle}>Student Progress</Text>
              <View style={styles.distributionGrid}>
                <View style={styles.distributionItem}>
                  <Award size={28} color={COLORS.success} />
                  <Text style={styles.distributionValue}>{studentProgress.excellent}</Text>
                  <Text style={styles.distributionLabel}>Excellent</Text>
                </View>
                <View style={styles.distributionItem}>
                  <Zap size={28} color={COLORS.warning} />
                  <Text style={styles.distributionValue}>{studentProgress.good}</Text>
                  <Text style={styles.distributionLabel}>Good</Text>
                </View>
                <View style={styles.distributionItem}>
                  <TrendingUp size={28} color={COLORS.primary} />
                  <Text style={styles.distributionValue}>{studentProgress.improving}</Text>
                  <Text style={styles.distributionLabel}>Improving</Text>
                </View>
              </View>
            </Card>

            {/* Revenue Trend */}
            <Card style={styles.revenueCard}>
              <Text style={styles.cardTitle}>Revenue Trend</Text>
              {revenueMetrics.map((item, index) => (
                <View key={index} style={styles.revenueRow}>
                  <Text style={styles.revenueWeek}>{item.week}</Text>
                  <View style={styles.revenueBars}>
                    <View
                      style={[
                        styles.revenueBar,
                        { width: `${(item.revenue / 600) * 100}%` },
                      ]}
                    />
                  </View>
                  <Text style={styles.revenueAmount}>${item.revenue}</Text>
                </View>
              ))}
            </Card>

            {/* Summary Stats */}
            <Card style={styles.summaryCard}>
              <Text style={styles.cardTitle}>Summary</Text>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Total Hours Taught</Text>
                <Text style={styles.summaryValue}>{overallMetrics.totalHours}h</Text>
              </View>
              <View style={styles.summaryDivider} />
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Avg Response Time</Text>
                <Text style={styles.summaryValue}>{overallMetrics.responseTime}</Text>
              </View>
              <View style={styles.summaryDivider} />
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Session Completion Rate</Text>
                <Text style={styles.summaryValue}>{overallMetrics.completionRate}%</Text>
              </View>
            </Card>

            <View style={styles.bottomSpacing} />
          </View>
        </ScrollView>
      </Modal>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Gem size={24} color={COLORS.primary} />
          <Text style={styles.sectionTitle}>Resource Vault</Text>
        </View>
        <Card style={styles.resourceVaultCard}>
          <TextInput
            style={styles.input}
            placeholder="Resource title"
            placeholderTextColor={COLORS.gray500}
            value={resourceTitle}
            onChangeText={setResourceTitle}
          />

          <Text style={styles.fieldLabel}>Resource Type</Text>
          <View style={styles.chipRow}>
            {["Worksheet", "Template", "Playbook"].map((type) => {
              const active = resourceType === type;
              return (
                <TouchableOpacity
                  key={type}
                  activeOpacity={0.8}
                  style={[styles.chip, active && styles.chipActive]}
                  onPress={() => setResourceType(type)}
                >
                  <Text style={[styles.chipText, active && styles.chipTextActive]}>{type}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={styles.fieldLabel}>Level</Text>
          <View style={styles.chipRow}>
            {(["Beginner", "Intermediate", "Advanced"] as ResourceLevel[]).map((level) => {
              const active = resourceLevel === level;
              return (
                <TouchableOpacity
                  key={level}
                  activeOpacity={0.8}
                  style={[styles.chip, active && styles.chipActive]}
                  onPress={() => setResourceLevel(level)}
                >
                  <Text style={[styles.chipText, active && styles.chipTextActive]}>{level}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Button
            title="Add Resource"
            style={styles.topGap}
            onPress={() => {
              if (!resourceTitle.trim()) {
                return;
              }
              setResources((prev) => [
                {
                  id: `${Date.now()}`,
                  title: resourceTitle.trim(),
                  type: resourceType,
                  level: resourceLevel,
                },
                ...prev,
              ]);
              setResourceTitle("");
            }}
          />
        </Card>

        {resources.map((resource) => (
          <Card key={resource.id} style={styles.resourceCard}>
            <Text style={styles.resourceTitle}>{resource.title}</Text>
            <Text style={styles.resourceMeta}>{resource.type} • {resource.level}</Text>
          </Card>
        ))}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Calendar size={24} color={COLORS.primary} />
          <Text style={styles.sectionTitle}>Member Since</Text>
        </View>
        <Card style={styles.infoCard}>
          <Text style={styles.text}>{mentor.joinedDate}</Text>
        </Card>
      </View>

      <View style={styles.section}>
        <Button title="Edit Profile" onPress={() => {}} style={styles.button} />
        <Button title="View Availability" onPress={() => {}} variant="secondary" style={styles.button} />
      </View>

      <View style={styles.bottomSpacing} />
    </ScrollView>
  );
}

interface MetricCardProps {
  icon: any;
  label: string;
  value: string;
  unit: string;
  color: string;
}

function MetricCard({ icon: Icon, label, value, unit, color }: MetricCardProps) {
  return (
    <Card style={styles.metricCard}>
      <View style={[styles.metricIconBox, { backgroundColor: color }]}>
        <Icon size={20} color={COLORS.white} />
      </View>
      <Text style={styles.metricLabel}>{label}</Text>
      <View style={styles.metricValueRow}>
        <Text style={styles.metricValue}>{value}</Text>
        <Text style={styles.metricUnit}>{unit}</Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fb",
  },
  headerSection: {
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.xl,
    alignItems: "center",
    backgroundColor: COLORS.primaryDark,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.lg,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  avatar: {
    fontSize: 40,
    fontWeight: FONT.bold,
    color: COLORS.white,
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    ...TYPOGRAPHY.h1,
    color: COLORS.white,
    marginBottom: SPACING.xs,
    fontWeight: FONT.black,
    letterSpacing: 0.5,
    lineHeight: 40,
  },
  email: {
    ...TYPOGRAPHY.bodySmall,
    color: "rgba(255, 255, 255, 0.85)",
    marginBottom: SPACING.md,
    fontWeight: FONT.medium,
    letterSpacing: 0.2,
  },
  section: {
    paddingHorizontal: SPACING.base,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.md,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h2,
    color: COLORS.dark,
    marginBottom: SPACING.lg,
    fontWeight: FONT.extrabold,
    letterSpacing: 0.4,
    lineHeight: 32,
  },
  text: {
    ...TYPOGRAPHY.body,
    color: COLORS.dark,
    lineHeight: 24,
    fontWeight: FONT.medium,
    letterSpacing: 0.2,
  },
  scoreRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  scoreLabel: {
    ...TYPOGRAPHY.body,
    color: COLORS.dark,
    fontWeight: FONT.bold,
    marginBottom: SPACING.xs,
    letterSpacing: 0.3,
  },
  scoreSubtitle: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray500,
    fontWeight: FONT.semibold,
    letterSpacing: 0.2,
    fontSize: 11,
  },
  scoreValue: {
    ...TYPOGRAPHY.h3,
    color: COLORS.primaryDark,
    fontWeight: FONT.black,
    letterSpacing: 0.3,
  },
  scoreValueLarge: {
    ...TYPOGRAPHY.h2,
    fontWeight: FONT.black,
    letterSpacing: 0.3,
  },
  scoreItemContainer: {
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  scoreItemHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
    marginBottom: SPACING.sm,
  },
  scoreItemIconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#f8f9fb",
    justifyContent: "center",
    alignItems: "center",
  },
  scoreItemInfo: {
    flex: 1,
  },
  statsSection: {
    paddingHorizontal: SPACING.base,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.md,
  },
  statCard: {
    marginBottom: SPACING.md,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderColor: "#e8eef9",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  statItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  statHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.lg,
  },
  statIconBox: {
    width: 56,
    height: 56,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  statContent: {
    flex: 1,
  },
  statNumber: {
    ...TYPOGRAPHY.h1,
    color: COLORS.dark,
    fontWeight: FONT.black,
    lineHeight: 36,
    letterSpacing: 0.4,
  },
  statLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray600,
    fontWeight: FONT.bold,
    marginBottom: SPACING.xs,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    fontSize: 9,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: SPACING.xs,
    marginBottom: SPACING.xs,
  },
  ratingOut: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray500,
    fontWeight: FONT.semibold,
    letterSpacing: 0.2,
    fontSize: 10,
  },
  statMeta: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray500,
    fontWeight: FONT.semibold,
    fontStyle: "italic",
    letterSpacing: 0.2,
    fontSize: 10,
  },
  statCardRating: {
    marginBottom: SPACING.md,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.warning,
    borderWidth: 1.5,
    borderColor: "#e8eef9",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  statCardSuccess: {
    marginBottom: SPACING.md,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.success,
    borderWidth: 1.5,
    borderColor: "#e8eef9",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  statCardPrimary: {
    marginBottom: SPACING.md,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
    borderWidth: 1.5,
    borderColor: "#e8eef9",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  metricsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.md,
    marginBottom: SPACING.xl,
  },
  metricCard: {
    width: "48%",
    padding: SPACING.lg,
    alignItems: "center",
    borderRadius: 16,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  metricIconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.md,
  },
  metricLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray600,
    marginBottom: SPACING.sm,
    fontWeight: FONT.bold,
    letterSpacing: 0.3,
    fontSize: 10,
  },
  metricValueRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: SPACING.xs,
    justifyContent: "center",
  },
  metricValue: {
    ...TYPOGRAPHY.h2,
    color: COLORS.dark,
    fontWeight: FONT.black,
    letterSpacing: 0.3,
  },
  metricUnit: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray500,
    fontWeight: FONT.semibold,
    letterSpacing: 0.2,
    fontSize: 10,
  },
  cardTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.dark,
    marginBottom: SPACING.lg,
    fontWeight: FONT.bold,
    letterSpacing: 0.3,
  },
  chartCard: {
    marginBottom: SPACING.xl,
    padding: SPACING.xl,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  trendChart: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-around",
    height: 180,
    marginTop: SPACING.lg,
    gap: SPACING.md,
  },
  chartBar: {
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end",
  },
  bar: {
    width: "70%",
    borderRadius: 8,
    marginBottom: SPACING.md,
    minHeight: 20,
  },
  chartLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray600,
    marginBottom: SPACING.sm,
    fontWeight: "600",
  },
  chartValue: {
    ...TYPOGRAPHY.body,
    color: COLORS.dark,
    fontWeight: "700",
  },
  qualityCard: {
    marginBottom: SPACING.xl,
    padding: SPACING.xl,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  qualityItem: {
    marginBottom: SPACING.lg,
    paddingBottom: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  qualityHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.md,
  },
  qualityLabel: {
    ...TYPOGRAPHY.body,
    color: COLORS.dark,
    fontWeight: FONT.black,
    letterSpacing: 0.3,
  },
  qualityScore: {
    ...TYPOGRAPHY.h3,
    fontWeight: FONT.black,
    letterSpacing: 0.3,
  },
  progressBar: {
    height: 8,
    backgroundColor: COLORS.gray200,
    borderRadius: 4,
    overflow: "hidden",
  },
  progress: {
    height: "100%",
    borderRadius: 4,
  },
  distributionCard: {
    marginBottom: SPACING.xl,
    padding: SPACING.xl,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  distributionGrid: {
    flexDirection: "row",
    gap: SPACING.lg,
    justifyContent: "space-around",
    marginTop: SPACING.lg,
  },
  distributionItem: {
    alignItems: "center",
    flex: 1,
    paddingVertical: SPACING.md,
  },
  distributionValue: {
    ...TYPOGRAPHY.h2,
    color: COLORS.dark,
    marginVertical: SPACING.md,
    fontWeight: FONT.black,
    letterSpacing: 0.3,
  },
  distributionLabel: {
    ...TYPOGRAPHY.body,
    color: COLORS.gray600,
    fontWeight: FONT.black,
    letterSpacing: 0.2,
    fontSize: 12,
  },
  revenueCard: {
    marginBottom: SPACING.xl,
    padding: SPACING.xl,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  revenueRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.lg,
    gap: SPACING.md,
    paddingBottom: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  revenueWeek: {
    ...TYPOGRAPHY.body,
    color: COLORS.gray600,
    width: 70,
    fontWeight: FONT.semibold,
  },
  revenueBars: {
    flex: 1,
    height: 24,
    backgroundColor: COLORS.gray100,
    borderRadius: 6,
    overflow: "hidden",
  },
  revenueBar: {
    height: "100%",
    backgroundColor: COLORS.success,
    borderRadius: 6,
  },
  revenueAmount: {
    ...TYPOGRAPHY.h3,
    color: COLORS.dark,
    fontWeight: FONT.bold,
    width: 60,
    textAlign: "right",
  },
  summaryCard: {
    marginBottom: SPACING.xl,
    padding: SPACING.xl,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: SPACING.md,
  },
  summaryLabel: {
    ...TYPOGRAPHY.body,
    color: COLORS.gray600,
    fontWeight: FONT.semibold,
  },
  summaryValue: {
    ...TYPOGRAPHY.h3,
    color: COLORS.dark,
    fontWeight: FONT.bold,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: "#f0f0f0",
    marginVertical: SPACING.sm,
  },
  input: {
    borderWidth: 1.5,
    borderColor: COLORS.gray300,
    borderRadius: 12,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    color: COLORS.dark,
    backgroundColor: COLORS.white,
    ...TYPOGRAPHY.body,
  },
  fieldLabel: {
    ...TYPOGRAPHY.body,
    color: COLORS.dark,
    marginTop: SPACING.lg,
    marginBottom: SPACING.md,
    fontWeight: FONT.bold,
    letterSpacing: 0.2,
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.md,
    marginBottom: SPACING.md,
  },
  chip: {
    borderWidth: 1.5,
    borderColor: COLORS.gray300,
    borderRadius: 12,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    backgroundColor: COLORS.white,
  },
  chipActive: {
    borderColor: COLORS.primary,
    backgroundColor: "#e8eef9",
  },
  chipText: {
    ...TYPOGRAPHY.body,
    color: COLORS.gray700,
    fontWeight: FONT.semibold,
  },
  chipTextActive: {
    color: COLORS.primaryDark,
  },
  topGap: {
    marginTop: SPACING.lg,
  },
  resourceCard: {
    marginTop: SPACING.md,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  resourceTitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.dark,
    fontWeight: FONT.bold,
  },
  resourceMeta: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray600,
    marginTop: SPACING.sm,
    fontWeight: FONT.medium,
  },
  button: {
    marginBottom: SPACING.lg,
    borderRadius: 12,
  },
  bottomSpacing: {
    height: SPACING["5xl"],
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
    paddingTop: SPACING.xl,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },
  closeButton: {
    padding: SPACING.sm,
    borderRadius: 8,
    backgroundColor: COLORS.gray100,
  },
  modalTitle: {
    ...TYPOGRAPHY.h2,
    color: COLORS.dark,
    fontWeight: FONT.bold,
    letterSpacing: 0.3,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.lg,
    gap: SPACING.md,
  },
  infoCard: {
    borderRadius: 14,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  scoreCard: {
    borderRadius: 14,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  resourceVaultCard: {
    borderRadius: 12,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
});