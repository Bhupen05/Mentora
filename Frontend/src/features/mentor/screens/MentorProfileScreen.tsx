import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { COLORS, SPACING, TYPOGRAPHY } from "@/shared/theme";
import { Card, Badge, Button } from "@/shared/components";

export function MentorProfileScreen() {
  const mentor = {
    name: "Dr. Sarah Chen",
    email: "sarah@example.com",
    role: "mentor",
    expertise: "Web Development, React, TypeScript",
    rating: 4.9,
    studentsHelped: 42,
    completedSessions: 128,
    joinedDate: "June 2023",
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.headerSection}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatar}>SC</Text>
        </View>
        <Text style={styles.name}>{mentor.name}</Text>
        <Text style={styles.email}>{mentor.email}</Text>
        <Badge label={mentor.role} variant="primary" />
      </View>

      {/* Expertise */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Expertise</Text>
        <Card>
          <Text style={styles.text}>{mentor.expertise}</Text>
        </Card>
      </View>

      {/* Stats */}
      <View style={styles.statsSection}>
        <Card style={styles.statCard}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>⭐{mentor.rating}</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
        </Card>
        <Card style={styles.statCard}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{mentor.studentsHelped}</Text>
            <Text style={styles.statLabel}>Students Helped</Text>
          </View>
        </Card>
        <Card style={styles.statCard}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{mentor.completedSessions}</Text>
            <Text style={styles.statLabel}>Sessions</Text>
          </View>
        </Card>
      </View>

      {/* Joined Date */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Member Since</Text>
        <Card>
          <Text style={styles.text}>{mentor.joinedDate}</Text>
        </Card>
      </View>

      {/* Action Buttons */}
      <View style={styles.section}>
        <Button title="Edit Profile" onPress={() => {}} style={styles.button} />
        <Button 
          title="View Availability" 
          onPress={() => {}} 
          variant="secondary"
          style={styles.button}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  headerSection: {
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.xl,
    alignItems: "center",
    backgroundColor: COLORS.light,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.base,
  },
  avatar: {
    fontSize: 32,
    fontWeight: "700",
    color: COLORS.white,
  },
  name: {
    ...TYPOGRAPHY.h2,
    color: COLORS.dark,
    marginBottom: SPACING.xs,
  },
  email: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.gray500,
    marginBottom: SPACING.base,
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
  text: {
    ...TYPOGRAPHY.body,
    color: COLORS.dark,
  },
  statsSection: {
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.lg,
  },
  statCard: {
    marginBottom: SPACING.base,
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.lg,
  },
  statItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  statNumber: {
    ...TYPOGRAPHY.h2,
    color: COLORS.primary,
    fontWeight: "700",
  },
  statLabel: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.gray500,
    marginTop: SPACING.xs,
  },
  button: {
    marginBottom: SPACING.base,
  },
});
