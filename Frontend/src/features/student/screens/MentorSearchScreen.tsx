import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { COLORS, SPACING, TYPOGRAPHY } from "@/shared/theme";
import { Card, CardHeader, Badge, Input } from "@/shared/components";

export function MentorSearchScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [selectedRating, setSelectedRating] = useState("All");

  const [mentors] = useState([
    {
      id: "1",
      name: "Sarah Chen",
      specialty: "Web Development",
      rating: 4.9,
      reviews: 128,
      rate: 50,
      image: "SC",
    },
    {
      id: "2",
      name: "James Rodriguez",
      specialty: "Mobile Development",
      rating: 4.8,
      reviews: 95,
      rate: 45,
      image: "JR",
    },
    {
      id: "3",
      name: "Emily Watson",
      specialty: "Data Science",
      rating: 4.7,
      reviews: 156,
      rate: 60,
      image: "EW",
    },
  ]);

  const subjects = ["All", "Web Dev", "Mobile", "Data Science", "AI/ML"];
  const ratings = ["All", "4+", "4.5+", "4.8+"];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Find Your Mentor</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Search */}
        <View style={styles.searchContainer}>
          <Input
            placeholder="Search mentors..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Filters */}
        <View style={styles.filterSection}>
          <Text style={styles.filterTitle}>Subject</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.filterScroll}
          >
            {subjects.map((subject) => (
              <TouchableOpacity
                key={subject}
                style={[
                  styles.filterChip,
                  selectedSubject === subject && styles.filterChipActive,
                ]}
                onPress={() => setSelectedSubject(subject)}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    selectedSubject === subject &&
                      styles.filterChipTextActive,
                  ]}
                >
                  {subject}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.filterSection}>
          <Text style={styles.filterTitle}>Rating</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.filterScroll}
          >
            {ratings.map((rating) => (
              <TouchableOpacity
                key={rating}
                style={[
                  styles.filterChip,
                  selectedRating === rating && styles.filterChipActive,
                ]}
                onPress={() => setSelectedRating(rating)}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    selectedRating === rating && styles.filterChipTextActive,
                  ]}
                >
                  {rating}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Mentor List */}
        <View style={styles.mentorList}>
          {mentors.map((mentor) => (
            <Card key={mentor.id}>
              <View style={styles.mentorCard}>
                <View>
                  <CardHeader title={mentor.name} subtitle={mentor.specialty} />
                  <View style={styles.ratingRow}>
                    <Text style={styles.rating}>⭐ {mentor.rating}</Text>
                    <Text style={styles.reviews}>{mentor.reviews} reviews</Text>
                  </View>
                  <Text style={styles.rate}>${mentor.rate}/hour</Text>
                </View>
                <TouchableOpacity style={styles.bookButton}>
                  <Text style={styles.bookButtonText}>Book</Text>
                </TouchableOpacity>
              </View>
            </Card>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light,
  },
  header: {
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.xl,
    backgroundColor: COLORS.primary,
  },
  title: {
    ...TYPOGRAPHY.h2,
    color: COLORS.white,
  },
  searchContainer: {
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.base,
  },
  filterSection: {
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.base,
  },
  filterTitle: {
    ...TYPOGRAPHY.label,
    color: COLORS.dark,
    marginBottom: SPACING.sm,
  },
  filterScroll: {
    marginHorizontal: -SPACING.base,
    paddingHorizontal: SPACING.base,
  },
  filterChip: {
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.sm,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.gray300,
    marginRight: SPACING.sm,
    backgroundColor: COLORS.white,
  },
  filterChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterChipText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray600,
    fontWeight: "500",
  },
  filterChipTextActive: {
    color: COLORS.white,
  },
  mentorList: {
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.base,
  },
  mentorCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: SPACING.sm,
    gap: SPACING.sm,
  },
  rating: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.dark,
    fontWeight: "600",
  },
  reviews: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray500,
  },
  rate: {
    ...TYPOGRAPHY.body,
    color: COLORS.secondary,
    fontWeight: "600",
    marginTop: SPACING.sm,
  },
  bookButton: {
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.sm,
    backgroundColor: COLORS.primary,
    borderRadius: 6,
  },
  bookButtonText: {
    ...TYPOGRAPHY.label,
    color: COLORS.white,
    fontWeight: "600",
  },
});
