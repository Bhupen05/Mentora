import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { COLORS, SPACING, TYPOGRAPHY } from "@/shared/theme";
import { Card, CardHeader, Badge, Button } from "@/shared/components";
import { useLocalSearchParams, useRouter } from "expo-router";

export function MentorProfileScreen() {
  const router = useRouter();
  const { mentorId } = useLocalSearchParams<{ mentorId?: string }>();

  const mentors = {
    "1": {
      id: "1",
      name: "Sarah Chen",
      profileImage: null,
      initials: "SC",
      specialty: "Web Development",
      experience: 8,
      rating: 4.9,
      reviews: 128,
      rate: 50,
      bio: "I'm a passionate web developer with 8+ years of experience in React, Node.js, and full-stack development. I love helping students understand complex concepts through practical examples.",
      credentials: ["BS Computer Science", "AWS Certified Developer", "Google Cloud Professional"],
      availableTimes: ["Monday 2-4 PM", "Wednesday 10 AM-12 PM", "Friday 3-5 PM"],
    },
    "2": {
      id: "2",
      name: "James Rodriguez",
      profileImage: null,
      initials: "JR",
      specialty: "Mobile Development",
      experience: 6,
      rating: 4.8,
      reviews: 95,
      rate: 45,
      bio: "I specialize in React Native and mobile architecture with a practical, project-based teaching approach.",
      credentials: ["MS Software Engineering", "React Native Specialist"],
      availableTimes: ["Tuesday 3-5 PM", "Thursday 11 AM-1 PM", "Saturday 2-4 PM"],
    },
    "3": {
      id: "3",
      name: "Emily Watson",
      profileImage: null,
      initials: "EW",
      specialty: "Data Science",
      experience: 9,
      rating: 4.7,
      reviews: 156,
      rate: 60,
      bio: "I help students build confidence in Python, statistics, and real-world data projects.",
      credentials: ["PhD Data Science", "TensorFlow Developer Certificate"],
      availableTimes: ["Monday 10-12 PM", "Wednesday 4-6 PM", "Sunday 1-3 PM"],
    },
  } as const;

  const mentor = mentors[mentorId as keyof typeof mentors] ?? mentors["1"];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.headerSection}>
        <View style={styles.avatarContainer}>
          {mentor.profileImage ? (
            <Image source={{ uri: mentor.profileImage }} style={styles.avatarImage} />
          ) : (
            <Text style={styles.avatar}>{mentor.initials}</Text>
          )}
        </View>
        <Text style={styles.name}>{mentor.name}</Text>
        <Badge label={mentor.specialty} />
      </View>

      {/* Rating & Stats */}
      <Card style={styles.statsCard}>
        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>⭐ {mentor.rating}</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{mentor.reviews}</Text>
            <Text style={styles.statLabel}>Reviews</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{mentor.experience}+</Text>
            <Text style={styles.statLabel}>Years Exp</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>${mentor.rate}</Text>
            <Text style={styles.statLabel}>Per Hour</Text>
          </View>
        </View>
      </Card>

      {/* Bio */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.bioText}>{mentor.bio}</Text>
      </View>

      {/* Credentials */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Credentials</Text>
        {mentor.credentials.map((cred, index) => (
          <View key={index} style={styles.credentialItem}>
            <Text style={styles.credentialText}>✓ {cred}</Text>
          </View>
        ))}
      </View>

      {/* Availability */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Availability</Text>
        {mentor.availableTimes.map((time, index) => (
          <View key={index} style={styles.availabilityItem}>
            <Text style={styles.availabilityText}>🕐 {time}</Text>
          </View>
        ))}
      </View>

      {/* CTA Buttons */}
      <View style={styles.buttonSection}>
        <Button
          title="Book a Lesson"
          onPress={() =>
            router.push({
              pathname: "/(student)/search/booking/[mentorId]" as any,
              params: {
                mentorId: mentor.id,
                mentorName: mentor.name,
                rate: String(mentor.rate),
                specialty: mentor.specialty,
              },
            })
          }
        />
        <Button
          title="Send Message"
          variant="outline"
          style={styles.messageButton}
          onPress={() => {}}
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
  headerSection: {
    paddingHorizontal: SPACING.base,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.lg,
    backgroundColor: COLORS.primaryDark,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    alignItems: "center",
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.secondary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACING.base,
  },
  avatar: {
    fontSize: 36,
    fontWeight: "700",
    color: COLORS.white,
  },
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  name: {
    ...TYPOGRAPHY.h2,
    color: COLORS.white,
    marginBottom: SPACING.base,
  },
  statsCard: {
    margin: SPACING.base,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  stat: {
    alignItems: "center",
  },
  statValue: {
    ...TYPOGRAPHY.bodyLarge,
    color: COLORS.primary,
    fontWeight: "700",
  },
  statLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray600,
    marginTop: SPACING.xs,
  },
  section: {
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.lg,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.dark,
    marginBottom: SPACING.base,
  },
  bioText: {
    ...TYPOGRAPHY.body,
    color: COLORS.gray700,
    lineHeight: 24,
  },
  credentialItem: {
    paddingVertical: SPACING.sm,
  },
  credentialText: {
    ...TYPOGRAPHY.body,
    color: COLORS.gray700,
  },
  availabilityItem: {
    paddingVertical: SPACING.sm,
  },
  availabilityText: {
    ...TYPOGRAPHY.body,
    color: COLORS.dark,
  },
  buttonSection: {
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.xl,
  },
  messageButton: {
    marginTop: SPACING.base,
  },
});
