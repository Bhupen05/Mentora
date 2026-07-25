import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { COLORS, SPACING, TYPOGRAPHY } from "@/shared/theme";
import { Card, Badge, Button } from "@/shared/components";

type Mentor = {
  id: string;
  name: string;
  image: string | null;
  initials: string;
  specialty: string;
  experience: number;
  rating: number;
  reviews: number;
  rate: number;
  bio: string;
  availableSlots: string[];
};

export function ParentMentorProfileScreen() {
  const router = useRouter();
  const { mentorId } = useLocalSearchParams<{ mentorId?: string }>();

  const mentors: Record<string, Mentor> = {
    l1: {
      id: "l1",
      name: "Michael Lee",
      image: "https://i.pravatar.cc/150?img=9&u=michael-lee",
      initials: "ML",
      specialty: "Math",
      experience: 7,
      rating: 4.8,
      reviews: 112,
      rate: 35,
      bio: "I help students build confidence in algebra and problem solving with practical step-by-step methods.",
      availableSlots: ["Today • 6:30 PM", "Tomorrow • 5:30 PM", "Fri • 4:00 PM"],
    },
    l2: {
      id: "l2",
      name: "Hannah Carter",
      image: "https://i.pravatar.cc/150?img=10&u=hannah-carter",
      initials: "HC",
      specialty: "Science",
      experience: 9,
      rating: 4.9,
      reviews: 143,
      rate: 40,
      bio: "Physics and science fundamentals mentor focused on conceptual understanding and exam readiness.",
      availableSlots: ["Tomorrow • 5:00 PM", "Thu • 6:00 PM", "Sat • 2:30 PM"],
    },
    l3: {
      id: "l3",
      name: "Sarah Thompson",
      image: "https://i.pravatar.cc/150?img=11&u=sarah-thompson",
      initials: "ST",
      specialty: "Programming",
      experience: 8,
      rating: 4.7,
      reviews: 128,
      rate: 50,
      bio: "I mentor students in React and modern JavaScript through project-based lessons.",
      availableSlots: ["Tomorrow • 8:00 PM", "Fri • 7:00 PM", "Sun • 11:00 AM"],
    },
    l4: {
      id: "l4",
      name: "Emily Dawson",
      image: "https://i.pravatar.cc/150?img=12&u=emily-dawson",
      initials: "ED",
      specialty: "Language",
      experience: 6,
      rating: 4.6,
      reviews: 90,
      rate: 30,
      bio: "Writing and communication mentor helping students improve clarity and structure.",
      availableSlots: ["Fri • 4:30 PM", "Sat • 10:30 AM", "Mon • 6:00 PM"],
    },
  };

  const mentor = mentors[mentorId as keyof typeof mentors] ?? mentors.l1;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.heroSection}>
        <Text style={styles.screenTitle}>Mentor Profile</Text>
        <Text style={styles.screenSubtitle}>Review details before booking.</Text>
      </View>

      <View style={styles.profileCardWrap}>
        <Card style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarWrap}>
              {mentor.image ? (
                <Image source={{ uri: mentor.image }} style={styles.avatarImage} />
              ) : (
                <Text style={styles.avatarText}>{mentor.initials}</Text>
              )}
            </View>
            <View style={styles.profileMeta}>
              <Text style={styles.name}>{mentor.name}</Text>
              <Text style={styles.specialty}>{mentor.specialty}</Text>
            </View>
            <Badge label={`${mentor.rating} ★`} variant="warning" />
          </View>

          <Text style={styles.bio}>{mentor.bio}</Text>

          <View style={styles.metricsRow}>
            <View style={styles.metricItem}>
              <Text style={styles.metricValue}>{mentor.experience}+</Text>
              <Text style={styles.metricLabel}>Years</Text>
            </View>
            <View style={styles.metricItem}>
              <Text style={styles.metricValue}>{mentor.reviews}</Text>
              <Text style={styles.metricLabel}>Reviews</Text>
            </View>
            <View style={styles.metricItem}>
              <Text style={styles.metricValue}>${mentor.rate}</Text>
              <Text style={styles.metricLabel}>Per Hour</Text>
            </View>
          </View>
        </Card>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Available Slots</Text>
        {mentor.availableSlots.map((slot) => (
          <Card key={slot} style={styles.slotCard}>
            <Text style={styles.slotText}>{slot}</Text>
          </Card>
        ))}
      </View>

      <View style={styles.section}>
        <Button
          title="Book This Mentor"
          onPress={() =>
            router.push({
              pathname: "/(parent)/browse/booking/[mentorId]" as any,
              params: {
                mentorId: mentor.id,
                mentorName: mentor.name,
                rate: String(mentor.rate),
              },
            })
          }
        />
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
  heroSection: {
    paddingHorizontal: SPACING.base,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.lg,
    backgroundColor: COLORS.primaryDark,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  screenTitle: {
    ...TYPOGRAPHY.h2,
    color: COLORS.white,
  },
  screenSubtitle: {
    ...TYPOGRAPHY.body,
    color: "rgba(255, 255, 255, 0.85)",
    marginTop: SPACING.xs,
  },
  profileCardWrap: {
    marginTop: -SPACING["2xl"],
    paddingHorizontal: SPACING.base,
  },
  profileCard: {
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
  },
  avatarWrap: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e0e7ff",
  },
  avatarText: {
    ...TYPOGRAPHY.label,
    color: COLORS.primaryDark,
    fontWeight: "700",
  },
  avatarImage: {
    width: 46,
    height: 46,
    borderRadius: 23,
  },
  profileMeta: {
    flex: 1,
  },
  name: {
    ...TYPOGRAPHY.body,
    color: COLORS.dark,
    fontWeight: "700",
  },
  specialty: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray600,
    marginTop: 2,
  },
  bio: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.gray700,
    marginTop: SPACING.base,
    lineHeight: 20,
  },
  metricsRow: {
    marginTop: SPACING.base,
    flexDirection: "row",
    gap: SPACING.sm,
  },
  metricItem: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: COLORS.gray100,
    paddingVertical: SPACING.sm,
    alignItems: "center",
  },
  metricValue: {
    ...TYPOGRAPHY.body,
    color: COLORS.dark,
    fontWeight: "700",
  },
  metricLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray600,
    marginTop: 2,
  },
  section: {
    paddingHorizontal: SPACING.base,
    marginTop: SPACING.lg,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.dark,
    marginBottom: SPACING.base,
  },
  slotCard: {
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
  slotText: {
    ...TYPOGRAPHY.body,
    color: COLORS.dark,
    fontWeight: "600",
  },
});
