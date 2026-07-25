import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { COLORS, SPACING, TYPOGRAPHY } from "@/shared/theme";
import { Card, Input } from "@/shared/components";
import { useRouter } from "expo-router";

export function MentorSearchScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [selectedRating, setSelectedRating] = useState("All");
  const [sortBy, setSortBy] = useState<"Recommended" | "Top Rated" | "Price: Low">("Recommended");

  const [mentors] = useState([
    {
      id: "1",
      name: "Sarah Chen",
      specialty: "Web Development",
      rating: 4.9,
      reviews: 128,
      rate: 50,
      image: "SC",
      verified: true,
      isTopRated: true,
    },
    {
      id: "2",
      name: "James Rodriguez",
      specialty: "Mobile Development",
      rating: 4.8,
      reviews: 95,
      rate: 45,
      image: "JR",
      verified: true,
      isTopRated: false,
    },
    {
      id: "3",
      name: "Emily Watson",
      specialty: "Data Science",
      rating: 4.7,
      reviews: 156,
      rate: 60,
      image: "EW",
      verified: true,
      isTopRated: true,
    },
  ]);

  const subjects = ["All", "Web Dev", "Mobile", "Data Science", "AI/ML"];
  const ratings = ["All", "4+", "4.5+", "4.8+"];
  const sortOptions: Array<"Recommended" | "Top Rated" | "Price: Low"> = [
    "Recommended",
    "Top Rated",
    "Price: Low",
  ];

  const filteredMentors = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const list = mentors.filter((mentor) => {
      const queryMatch =
        query.length === 0 ||
        mentor.name.toLowerCase().includes(query) ||
        mentor.specialty.toLowerCase().includes(query);

      const subjectMatch =
        selectedSubject === "All" ||
        (selectedSubject === "Web Dev" && mentor.specialty.includes("Web")) ||
        (selectedSubject === "Mobile" && mentor.specialty.includes("Mobile")) ||
        (selectedSubject === "Data Science" && mentor.specialty.includes("Data")) ||
        (selectedSubject === "AI/ML" && mentor.specialty.includes("AI"));

      const minRating =
        selectedRating === "All"
          ? 0
          : selectedRating === "4+"
            ? 4
            : selectedRating === "4.5+"
              ? 4.5
              : 4.8;

      const ratingMatch = mentor.rating >= minRating;

      return queryMatch && subjectMatch && ratingMatch;
    });

    if (sortBy === "Top Rated") {
      return [...list].sort((a, b) => b.rating - a.rating);
    }

    if (sortBy === "Price: Low") {
      return [...list].sort((a, b) => a.rate - b.rate);
    }

    return list;
  }, [mentors, searchQuery, selectedSubject, selectedRating, sortBy]);

  const hasActiveFilters =
    selectedSubject !== "All" || selectedRating !== "All" || sortBy !== "Recommended" || searchQuery.length > 0;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Find Your Mentor</Text>
        <Text style={styles.subtitle}>Explore verified mentors based on your goals.</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.contentContainer}>
        {/* Search */}
        <View style={styles.searchContainer}>
          <Input
            placeholder="Search by name or specialty"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.sortScroll}>
            {sortOptions.map((option) => {
              const active = sortBy === option;

              return (
                <TouchableOpacity
                  key={option}
                  style={[styles.sortChip, active && styles.sortChipActive]}
                  onPress={() => setSortBy(option)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.sortChipText, active && styles.sortChipTextActive]}>{option}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {hasActiveFilters ? (
            <TouchableOpacity
              style={styles.clearFiltersBtn}
              onPress={() => {
                setSearchQuery("");
                setSelectedSubject("All");
                setSelectedRating("All");
                setSortBy("Recommended");
              }}
              activeOpacity={0.8}
            >
              <Text style={styles.clearFiltersText}>Clear filters</Text>
            </TouchableOpacity>
          ) : null}
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
          <Text style={styles.resultCount}>{filteredMentors.length} mentors found</Text>

          {filteredMentors.map((mentor) => (
            <Card key={mentor.id} style={styles.mentorCardContainer}>
              <TouchableOpacity 
                style={styles.mentorCard}
                onPress={() =>
                  router.push({
                    pathname: "/(student)/search/[mentorId]" as any,
                    params: { mentorId: mentor.id },
                  })
                }
                activeOpacity={0.85}
              >
                <View style={styles.mentorMainInfo}>
                  <View style={styles.avatarContainer}>
                    <View style={styles.avatarBadge}>
                      <Text style={styles.avatarText}>{mentor.image}</Text>
                    </View>
                    {mentor.verified && (
                      <View style={styles.verifiedBadge}>
                        <Text style={styles.verifiedText}>✓</Text>
                      </View>
                    )}
                    {mentor.isTopRated && (
                      <View style={styles.topRatedBadge}>
                        <Text style={styles.topRatedText}>TOP</Text>
                      </View>
                    )}
                  </View>
                  <View style={styles.mentorTextWrap}>
                    <View style={styles.nameRow}>
                      <Text style={styles.mentorName}>{mentor.name}</Text>
                    </View>
                    <Text style={styles.specialty}>{mentor.specialty}</Text>
                    <View style={styles.ratingRow}>
                      <Text style={styles.rating}>⭐ {mentor.rating}</Text>
                      <Text style={styles.reviews}>({mentor.reviews})</Text>
                    </View>
                    <Text style={styles.rate}>${mentor.rate}/hour</Text>
                  </View>
                </View>
                <View style={styles.chevronContainer}>
                  <Text style={styles.chevron}>›</Text>
                </View>
              </TouchableOpacity>
            </Card>
          ))}

          {filteredMentors.length === 0 ? (
            <Card style={styles.emptyCard}>
              <Text style={styles.emptyTitle}>No mentors match these filters</Text>
              <Text style={styles.emptyBody}>Try changing subject, rating, or search terms.</Text>
            </Card>
          ) : null}
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
    paddingTop: SPACING["2xl"],
    paddingBottom: SPACING["3xl"],
    backgroundColor: COLORS.primaryDark,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  title: {
    ...TYPOGRAPHY.h2,
    color: COLORS.white,
    letterSpacing: 0.5,
  },
  subtitle: {
    ...TYPOGRAPHY.body,
    color: "rgba(255, 255, 255, 0.9)",
    marginTop: SPACING.sm,
    lineHeight: 22,
  },
  contentContainer: {
    paddingBottom: SPACING["6xl"],
  },
  searchContainer: {
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.base,
    marginTop: -SPACING["2xl"],
    zIndex: 10,
    marginBottom: SPACING.base,
  },
  sortScroll: {
    marginTop: SPACING.md,
  },
  sortChip: {
    marginRight: SPACING.sm,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 999,  
    borderWidth: 1.5,
    borderColor: COLORS.gray300,
    backgroundColor: COLORS.white,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  sortChipActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
    shadowOpacity: 0.12,
  },
  sortChipText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray600,
    fontWeight: "600",
    fontSize: 13,
  },
  sortChipTextActive: {
    color: COLORS.white,
    fontWeight: "700",
  },
  clearFiltersBtn: {
    alignSelf: "flex-start",
    marginTop: SPACING.md,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 6,
    backgroundColor: "rgba(99, 102, 241, 0.08)",
  },
  clearFiltersText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.primary,
    fontWeight: "700",
    fontSize: 12,
  },
  filterSection: {
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.md,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  filterTitle: {
    ...TYPOGRAPHY.label,
    color: COLORS.dark,
    marginBottom: SPACING.md,
    fontWeight: "700",
    fontSize: 14,
  },
  filterScroll: {
    marginHorizontal: -SPACING.base,
    paddingHorizontal: SPACING.base,
  },
  filterChip: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: COLORS.gray300,
    marginRight: SPACING.md,
    backgroundColor: COLORS.white,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  filterChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
    shadowOpacity: 0.15,
  },
  filterChipText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray600,
    fontWeight: "600",
  },
  filterChipTextActive: {
    color: COLORS.white,
    fontWeight: "700",
  },
  mentorList: {
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.lg,
  },
  resultCount: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray700,
    marginBottom: SPACING.lg,
    fontWeight: "600",
    fontSize: 13,
  },
  mentorCardContainer: {
    borderWidth: 1,
    borderColor: COLORS.gray200,
    marginBottom: SPACING.md,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    borderRadius: 16,
    overflow: "hidden",
  },
  mentorCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
    backgroundColor: COLORS.white,
  },
  mentorMainInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatarContainer: {
    position: "relative",
    marginRight: SPACING.base,
  },
  avatarBadge: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e0e7ff",
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  avatarText: {
    ...TYPOGRAPHY.h3,
    color: COLORS.primaryDark,
    fontWeight: "700",
    fontSize: 18,
    letterSpacing: 0.2,
  },
  verifiedBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#10b981",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2.5,
    borderColor: COLORS.white,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  verifiedText: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 13,
  },
  topRatedBadge: {
    position: "absolute",
    top: 0,
    right: 0,
    paddingHorizontal: 7,
    paddingVertical: 3,
    backgroundColor: "#f59e0b",
    borderRadius: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  topRatedText: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 10,
    letterSpacing: 0.5,
  },
  mentorTextWrap: {
    flex: 1,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.xs,
  },
  mentorName: {
    ...TYPOGRAPHY.body,
    color: COLORS.dark,
    fontWeight: "700",
    fontSize: 15,
    letterSpacing: 0.3,
  },
  specialty: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray500,
    marginBottom: SPACING.sm,
    fontSize: 12,
    fontWeight: "500",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.sm,
    gap: SPACING.xs,
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
    fontWeight: "700",
    fontSize: 15,
    marginTop: SPACING.xs,
  },
  chevronContainer: {
    marginLeft: SPACING.base,
    alignItems: "center",
    justifyContent: "center",
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(99, 102, 241, 0.08)",
  },
  chevron: {
    fontSize: 20,
    color: COLORS.primary,
    fontWeight: "600",
  },
  emptyCard: {
    marginTop: SPACING["2xl"],
    borderWidth: 1.5,
    borderColor: COLORS.gray200,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  emptyTitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.dark,
    fontWeight: "700",
    fontSize: 16,
  },
  emptyBody: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray600,
    marginTop: SPACING.xs,
  },
});
