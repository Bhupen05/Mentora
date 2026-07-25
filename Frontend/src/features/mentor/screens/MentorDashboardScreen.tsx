import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { Badge, Card } from "@/shared/components";
import { COLORS, SPACING, TYPOGRAPHY } from "@/shared/theme";
import { Clock, AlertCircle, CheckCircle2, MessageSquare, Star, TrendingUp, ThumbsUp, X, Phone, Video } from "lucide-react-native";

const FONT = {
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
} as const;

type KpiKey = "attendance" | "response" | "rebooking" | "ratingTrend";

export function MentorDashboardScreen() {
  const [selectedKpi, setSelectedKpi] = useState<KpiKey>("attendance");
  const [acceptedRequests, setAcceptedRequests] = useState<string[]>([]);
  const [rejectedRequests, setRejectedRequests] = useState<string[]>([]);

  const nowCard = {
    student: "Emily Wilson",
    studentImage: "https://i.pravatar.cc/150?img=1&u=emily-wilson",
    initials: "EW",
    subject: "React",
    action: "Join session",
    time: "2:00 PM - 3:00 PM",
  };

  const nextCard = {
    student: "James Taylor",
    studentImage: "https://i.pravatar.cc/150?img=2&u=james-taylor",
    initials: "JT",
    subject: "TypeScript",
    startsIn: "1h 20m",
    time: "4:00 PM - 4:45 PM",
  };

  const laterCard = {
    queue: 4,
    highPriority: 2,
    avgMatch: 91,
  };

  const kpis = {
    attendance: { label: "Attendance", value: "98%", detail: "14/14 on-time joins this week." },
    response: { label: "Response", value: "7m", detail: "Median mentor response over the last 30 requests." },
    rebooking: { label: "Rebooking", value: "76%", detail: "Most students book another session within 7 days." },
    ratingTrend: { label: "Rating Trend", value: "+0.2", detail: "Improved from 4.7 to 4.9 in 30 days." },
  };

  const requests = [
    {
      id: "r1",
      student: "Liam Johnson",
      studentImage: "https://i.pravatar.cc/150?img=3&u=liam-johnson",
      initials: "LJ",
      subject: "JavaScript Fundamentals",
      expiresIn: "27m",
      value: "$35",
      matchScore: 94,
    },
    {
      id: "r2",
      student: "Sophia Brown",
      studentImage: "https://i.pravatar.cc/150?img=4&u=sophia-brown",
      initials: "SB",
      subject: "Interview Preparation",
      expiresIn: "1h 05m",
      value: "$50",
      matchScore: 88,
    },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.heroSection}>
        <Text style={styles.heroTitle}>Mentor Overview</Text>
        <Text style={styles.heroSubtitle}>Clear priorities for now, next, and later.</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Now / Next / Later</Text>

        <Card style={[styles.zoneCard, styles.zoneCardActive] as any}>
          <View style={styles.zoneIndicator}>
            <CheckCircle2 size={20} color={COLORS.success} strokeWidth={2.5} />
            <Text style={styles.zoneLabel}>Now</Text>
          </View>
          <View style={styles.studentInfoRow}>
            <View style={styles.studentAvatar}>
              {nowCard.studentImage ? (
                <Image source={{ uri: nowCard.studentImage }} style={styles.studentAvatarImage} />
              ) : (
                <Text style={styles.studentAvatarText}>{nowCard.initials}</Text>
              )}
            </View>
            <View style={styles.studentInfoWrap}>
              <Text style={styles.zoneTitle}>{nowCard.student}</Text>
              <Text style={styles.zoneSubject}>{nowCard.subject}</Text>
            </View>
          </View>
          <Text style={styles.zoneMeta}>{nowCard.time}</Text>
          <TouchableOpacity style={styles.actionButtonPrimary}>
            <Phone size={16} color={COLORS.white} />
            <Text style={styles.actionButtonText}>{nowCard.action}</Text>
          </TouchableOpacity>
        </Card>

        <Card style={[styles.zoneCard, styles.zoneCardPending] as any}>
          <View style={styles.zoneIndicator}>
            <Clock size={20} color={COLORS.primary} strokeWidth={2.5} />
            <Text style={styles.zoneLabel}>Next</Text>
          </View>
          <View style={styles.studentInfoRow}>
            <View style={styles.studentAvatar}>
              {nextCard.studentImage ? (
                <Image source={{ uri: nextCard.studentImage }} style={styles.studentAvatarImage} />
              ) : (
                <Text style={styles.studentAvatarText}>{nextCard.initials}</Text>
              )}
            </View>
            <View style={styles.studentInfoWrap}>
              <Text style={styles.zoneTitle}>{nextCard.student}</Text>
              <Text style={styles.zoneSubject}>{nextCard.subject}</Text>
            </View>
          </View>
          <Text style={styles.zoneMeta}>{nextCard.time}</Text>
          <Text style={styles.zoneSignal}>⏱ Starts in {nextCard.startsIn}</Text>
          <TouchableOpacity style={styles.actionButtonSecondary}>
            <Video size={14} color={COLORS.primary} />
            <Text style={styles.actionButtonTextSecondary}>Prepare</Text>
          </TouchableOpacity>
        </Card>

        <Card style={[styles.zoneCard, styles.zoneCardLater] as any}>
          <View style={styles.zoneIndicator}>
            <AlertCircle size={20} color={COLORS.warning} strokeWidth={2.5} />
            <Text style={styles.zoneLabel}>Later</Text>
          </View>
          <Text style={styles.zoneTitle}>{laterCard.queue} requests in queue</Text>
          <Text style={styles.zoneMeta}>High priority: {laterCard.highPriority}</Text>
          <Text style={styles.zoneSignal}>📊 Average match: {laterCard.avgMatch}%</Text>
          <TouchableOpacity style={styles.actionButtonGhost}>
            <MessageSquare size={14} color={COLORS.warning} />
            <Text style={styles.actionButtonTextGhost}>View all</Text>
          </TouchableOpacity>
        </Card>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Reliability</Text>
        <View style={styles.kpiGrid}>
          {(Object.keys(kpis) as KpiKey[]).map((key) => {
            const active = selectedKpi === key;
            return (
              <TouchableOpacity
                key={key}
                activeOpacity={0.85}
                onPress={() => setSelectedKpi(key)}
                style={[styles.kpiTile, active && styles.kpiTileActive]}
              >
                <Text style={[styles.kpiLabel, active && styles.kpiLabelActive]}>{kpis[key].label}</Text>
                <Text style={[styles.kpiValue, active && styles.kpiValueActive]}>{kpis[key].value}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Card style={styles.kpiDetailCard}>
          <Text style={styles.kpiDetailTitle}>{kpis[selectedKpi].label}</Text>
          <Text style={styles.kpiDetailBody}>{kpis[selectedKpi].detail}</Text>
        </Card>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Priority Requests</Text>
        {requests.map((request) => {
          const urgent = request.expiresIn.includes("m") && !request.expiresIn.includes("h");
          return (
            <Card key={request.id} style={[
              styles.requestCard,
              acceptedRequests.includes(request.id) ? styles.requestCardAccepted : null,
              rejectedRequests.includes(request.id) ? styles.requestCardRejected : null,
            ] as any}>
              <View style={styles.requestHeader}>
                <View style={styles.requestStudentRow}>
                  <View style={styles.requestStudentAvatar}>
                    {request.studentImage ? (
                      <Image source={{ uri: request.studentImage }} style={styles.requestStudentAvatarImage} />
                    ) : (
                      <Text style={styles.requestStudentAvatarText}>{request.initials}</Text>
                    )}
                  </View>
                  <Text style={styles.requestTitle}>{request.student}</Text>
                </View>
                <Badge label={urgent ? "Urgent" : "Normal"} variant={urgent ? "error" : "warning"} />
              </View>
              <Text style={styles.requestSubject}>{request.subject}</Text>
              <View style={styles.requestSignalRow}>
                <Text style={styles.requestSignal}>Expires: {request.expiresIn}</Text>
                <Text style={styles.requestSignal}>Value: {request.value}</Text>
                <Text style={styles.requestSignal}>Match: {request.matchScore}%</Text>
              </View>
              {!acceptedRequests.includes(request.id) && !rejectedRequests.includes(request.id) && (
                <View style={styles.requestActions}>
                  <TouchableOpacity
                    style={styles.actionAccept}
                    onPress={() => setAcceptedRequests([...acceptedRequests, request.id])}
                  >
                    <ThumbsUp size={14} color={COLORS.white} />
                    <Text style={styles.actionAcceptText}>Accept</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.actionReject}
                    onPress={() => setRejectedRequests([...rejectedRequests, request.id])}
                  >
                    <X size={14} color={COLORS.error} />
                    <Text style={styles.actionRejectText}>Decline</Text>
                  </TouchableOpacity>
                </View>
              )}
              {acceptedRequests.includes(request.id) && (
                <View style={styles.requestStatus}>
                  <CheckCircle2 size={16} color={COLORS.success} />
                  <Text style={styles.requestStatusText}>Accepted</Text>
                </View>
              )}
              {rejectedRequests.includes(request.id) && (
                <View style={styles.requestStatus}>
                  <AlertCircle size={16} color={COLORS.error} />
                  <Text style={[styles.requestStatusText, { color: COLORS.error }]}>Declined</Text>
                </View>
              )}
            </Card>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fb",
  },
  contentContainer: {
    paddingBottom: SPACING["5xl"],
  },
  heroSection: {
    paddingHorizontal: SPACING.base,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.lg,
    backgroundColor: COLORS.primaryDark,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  heroTitle: {
    ...TYPOGRAPHY.h2,
    color: COLORS.white,
    fontWeight: FONT.black,
    fontSize: 24,
    letterSpacing: 0.4,
    lineHeight: 32,
  },
  heroSubtitle: {
    ...TYPOGRAPHY.body,
    color: "rgba(255, 255, 255, 0.85)",
    marginTop: SPACING.sm,
    fontWeight: FONT.medium,
    fontSize: 15,
    lineHeight: 22,
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
    fontWeight: FONT.extrabold,
    fontSize: 18,
    marginBottom: SPACING.lg,
    letterSpacing: 0.3,
  },
  zoneCard: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    marginBottom: SPACING.md,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    paddingVertical: SPACING.lg,
  },
  zoneLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.primary,
    marginBottom: SPACING.md,
    fontWeight: FONT.bold,
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  zoneIndicator: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  zoneTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.dark,
    fontWeight: FONT.bold,
    fontSize: 16,
    marginBottom: SPACING.sm,
    letterSpacing: 0.2,
    lineHeight: 24,
  },
  studentInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.md,
  },
  studentAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.secondary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: SPACING.md,
    borderWidth: 2,
    borderColor: COLORS.primary,
    overflow: "hidden",
  },
  studentAvatarImage: {
    width: "100%",
    height: "100%",
    borderRadius: 25,
  },
  studentAvatarText: {
    ...TYPOGRAPHY.label,
    color: COLORS.white,
    fontWeight: FONT.bold,
    fontSize: 14,
  },
  studentInfoWrap: {
    flex: 1,
  },
  zoneSubject: {
    ...TYPOGRAPHY.body,
    color: COLORS.primary,
    fontWeight: FONT.semibold,
    marginBottom: SPACING.xs,
    letterSpacing: 0.2,
    fontSize: 13,
  },
  zoneMeta: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray600,
    marginBottom: SPACING.md,
    fontWeight: FONT.semibold,
    fontSize: 13,
    letterSpacing: 0.2,
    lineHeight: 20,
    marginTop: SPACING.sm,
  },
  zoneSignal: {
    ...TYPOGRAPHY.caption,
    color: COLORS.success,
    marginTop: SPACING.md,
    fontWeight: FONT.bold,
    fontSize: 12,
    letterSpacing: 0.3,
    lineHeight: 18,
  },
  kpiGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.md,
    marginBottom: SPACING.lg,
  },
  kpiTile: {
    width: "48%",
    minHeight: 100,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#e8eef9",
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: SPACING.sm,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  kpiTileActive: {
    borderColor: COLORS.primary,
    backgroundColor: "#eff6ff",
    borderWidth: 2,
  },
  kpiLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray600,
    fontWeight: FONT.semibold,
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: 0.4,
    marginBottom: SPACING.sm,
  },
  kpiLabelActive: {
    color: COLORS.primary,
    fontWeight: FONT.bold,
  },
  kpiValue: {
    ...TYPOGRAPHY.h2,
    color: COLORS.dark,
    fontWeight: FONT.black,
    fontSize: 22,
    letterSpacing: 0.3,
    lineHeight: 28,
  },
  kpiValueActive: {
    color: COLORS.primaryDark,
  },
  kpiDetailCard: {
    marginTop: SPACING.lg,
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
  kpiDetailTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.dark,
    fontWeight: FONT.bold,
    fontSize: 16,
    marginBottom: SPACING.md,
    letterSpacing: 0.2,
    lineHeight: 24,
  },
  kpiDetailBody: {
    ...TYPOGRAPHY.body,
    color: COLORS.gray600,
    lineHeight: 24,
    fontWeight: FONT.regular,
    fontSize: 14,
    letterSpacing: 0.2,
  },
  requestCard: {
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 14,
    backgroundColor: COLORS.white,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  requestHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: SPACING.md,
    marginBottom: SPACING.md,
  },
  requestStudentRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  requestStudentAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORS.secondary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: SPACING.sm,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    overflow: "hidden",
  },
  requestStudentAvatarImage: {
    width: "100%",
    height: "100%",
    borderRadius: 21,
  },
  requestStudentAvatarText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.white,
    fontWeight: FONT.bold,
    fontSize: 13,
  },
  requestTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.dark,
    fontWeight: FONT.bold,
    fontSize: 16,
    letterSpacing: 0.2,
    lineHeight: 24,
  },
  requestSubject: {
    ...TYPOGRAPHY.body,
    color: COLORS.gray600,
    fontWeight: FONT.semibold,
    fontSize: 14,
    marginBottom: SPACING.md,
    letterSpacing: 0.2,
    lineHeight: 22,
  },
  requestSignalRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.md,
  },
  requestSignal: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray600,
    fontWeight: FONT.semibold,
    fontSize: 12,
    backgroundColor: "#f0f0f0",
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 6,
    letterSpacing: 0.2,
    lineHeight: 16,
  },
  // Zone card variants
  zoneCardActive: {
    borderLeftWidth: 4,
    borderLeftColor: COLORS.success,
    backgroundColor: "#f0fdf4",
  },
  zoneCardPending: {
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
    backgroundColor: "#eff6ff",
  },
  zoneCardLater: {
    borderLeftWidth: 4,
    borderLeftColor: COLORS.warning,
    backgroundColor: "#fffbeb",
  },
  // Action buttons
  actionButtonPrimary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.sm,
    backgroundColor: COLORS.success,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: 10,
    marginTop: SPACING.md,
  },
  actionButtonText: {
    ...TYPOGRAPHY.body,
    color: COLORS.white,
    fontWeight: FONT.bold,
    fontSize: 14,
  },
  actionButtonSecondary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.sm,
    backgroundColor: "#eff6ff",
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: 10,
    marginTop: SPACING.md,
  },
  actionButtonTextSecondary: {
    ...TYPOGRAPHY.caption,
    color: COLORS.primary,
    fontWeight: FONT.bold,
    fontSize: 13,
  },
  actionButtonGhost: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.sm,
    backgroundColor: "#fffbeb",
    borderWidth: 1.5,
    borderColor: COLORS.warning,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: 10,
    marginTop: SPACING.md,
  },
  actionButtonTextGhost: {
    ...TYPOGRAPHY.caption,
    color: COLORS.warning,
    fontWeight: FONT.bold,
    fontSize: 13,
  },
  // Request card actions
  requestCardAccepted: {
    borderLeftWidth: 4,
    borderLeftColor: COLORS.success,
    backgroundColor: "#f0fdf4",
  },
  requestCardRejected: {
    borderLeftWidth: 4,
    borderLeftColor: COLORS.error,
    backgroundColor: "#fef2f2",
  },
  requestActions: {
    flexDirection: "row",
    gap: SPACING.md,
    marginTop: SPACING.lg,
  },
  actionAccept: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.sm,
    backgroundColor: COLORS.success,
    paddingVertical: SPACING.md,
    borderRadius: 8,
  },
  actionAcceptText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.white,
    fontWeight: FONT.bold,
    fontSize: 13,
  },
  actionReject: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.sm,
    backgroundColor: "#fee2e2",
    borderWidth: 1,
    borderColor: COLORS.error,
    paddingVertical: SPACING.md,
    borderRadius: 8,
  },
  actionRejectText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.error,
    fontWeight: FONT.bold,
    fontSize: 13,
  },
  requestStatus: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.sm,
    backgroundColor: "#f5f5f5",
    paddingVertical: SPACING.md,
    borderRadius: 8,
    marginTop: SPACING.lg,
  },
  requestStatusText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.success,
    fontWeight: FONT.bold,
    fontSize: 13,
  },
});
