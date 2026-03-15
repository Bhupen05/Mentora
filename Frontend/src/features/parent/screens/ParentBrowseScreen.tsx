import React, { useMemo, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	TextInput,
	TouchableOpacity,
} from "react-native";
import { Search, SlidersHorizontal, Clock3, Star, BookOpen } from "lucide-react-native";
import { COLORS, SPACING, TYPOGRAPHY } from "@/shared/theme";
import { Badge, Button, Card } from "@/shared/components";

type LessonLevel = "Beginner" | "Intermediate" | "Advanced";
type LessonType = "1 on 1" | "Lesson";
type PriceFilter = "All" | "Under40" | "40Plus";
type SortBy = "Recommended" | "PriceLowToHigh" | "TopRated";

type Lesson = {
	id: string;
	title: string;
	mentor: string;
	subject: string;
	duration: string;
	level: LessonLevel;
	type: LessonType;
	rating: number;
	price: number;
	nextSlot: string;
};

const FILTERS = ["All", "Math", "Science", "Programming", "Language"] as const;
const LESSON_TYPE_FILTERS = ["All", "1 on 1", "Lesson"] as const;
const LEVEL_FILTERS = ["All", "Beginner", "Intermediate", "Advanced"] as const;
const PRICE_FILTERS: { label: string; value: PriceFilter }[] = [
	{ label: "All Prices", value: "All" },
	{ label: "Under $40", value: "Under40" },
	{ label: "$40+", value: "40Plus" },
];
const SORT_OPTIONS: { label: string; value: SortBy }[] = [
	{ label: "Recommended", value: "Recommended" },
	{ label: "Price: Low to High", value: "PriceLowToHigh" },
	{ label: "Top Rated", value: "TopRated" },
];

export function ParentBrowseScreen() {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedFilter, setSelectedFilter] = useState<(typeof FILTERS)[number]>("All");
	const [selectedLessonType, setSelectedLessonType] = useState<(typeof LESSON_TYPE_FILTERS)[number]>(
		"All"
	);
	const [showFilters, setShowFilters] = useState(false);
	const [selectedLevel, setSelectedLevel] = useState<(typeof LEVEL_FILTERS)[number]>("All");
	const [selectedPriceFilter, setSelectedPriceFilter] = useState<PriceFilter>("All");
	const [sortBy, setSortBy] = useState<SortBy>("Recommended");

	const lessons: Lesson[] = useMemo(
		() => [
			{
				id: "l1",
				title: "Algebra Problem Solving",
				mentor: "Michael Lee",
				subject: "Math",
				duration: "45 mins",
				level: "Intermediate",
				type: "1 on 1",
				rating: 4.8,
				price: 35,
				nextSlot: "Today • 6:30 PM",
			},
			{
				id: "l2",
				title: "Physics Fundamentals",
				mentor: "Hannah Carter",
				subject: "Science",
				duration: "60 mins",
				level: "Beginner",
				type: "Lesson",
				rating: 4.9,
				price: 40,
				nextSlot: "Tomorrow • 5:00 PM",
			},
			{
				id: "l3",
				title: "React for Students",
				mentor: "Sarah Thompson",
				subject: "Programming",
				duration: "60 mins",
				level: "Advanced",
				type: "1 on 1",
				rating: 4.7,
				price: 50,
				nextSlot: "Tomorrow • 8:00 PM",
			},
			{
				id: "l4",
				title: "English Writing Practice",
				mentor: "Emily Dawson",
				subject: "Language",
				duration: "40 mins",
				level: "Beginner",
				type: "Lesson",
				rating: 4.6,
				price: 30,
				nextSlot: "Fri • 4:30 PM",
			},
		],
		[]
	);

	const filteredLessons = useMemo(() => {
		const lessonList = lessons.filter((lesson) => {
			const filterMatch = selectedFilter === "All" || lesson.subject === selectedFilter;
			const typeMatch = selectedLessonType === "All" || lesson.type === selectedLessonType;
			const levelMatch = selectedLevel === "All" || lesson.level === selectedLevel;
			const priceMatch =
				selectedPriceFilter === "All" ||
				(selectedPriceFilter === "Under40" && lesson.price < 40) ||
				(selectedPriceFilter === "40Plus" && lesson.price >= 40);
			const query = searchQuery.trim().toLowerCase();
			const queryMatch =
				query.length === 0 ||
				lesson.title.toLowerCase().includes(query) ||
				lesson.mentor.toLowerCase().includes(query) ||
				lesson.subject.toLowerCase().includes(query);

			return filterMatch && typeMatch && levelMatch && priceMatch && queryMatch;
		});

		if (sortBy === "PriceLowToHigh") {
			return [...lessonList].sort((a, b) => a.price - b.price);
		}

		if (sortBy === "TopRated") {
			return [...lessonList].sort((a, b) => b.rating - a.rating);
		}

		return lessonList;
	}, [
		lessons,
		searchQuery,
		selectedFilter,
		selectedLessonType,
		selectedLevel,
		selectedPriceFilter,
		sortBy,
	]);

	const hasAdvancedFilter =
		selectedLessonType !== "All" ||
		selectedLevel !== "All" ||
		selectedPriceFilter !== "All" ||
		sortBy !== "Recommended";

	return (
		<ScrollView style={styles.container} contentContainerStyle={styles.content}>
			<View style={styles.heroSection}>
				<Text style={styles.title}>Browse Lessons</Text>
				<Text style={styles.subtitle}>Find the best lesson for your child and book instantly.</Text>
			</View>

			<View style={styles.mainSection}>

			<View style={styles.searchRow}>
				<View style={styles.searchBox}>
					<Search size={16} color={COLORS.gray500} strokeWidth={2.2} />
					<TextInput
						placeholder="Search by topic, mentor, or subject"
						value={searchQuery}
						onChangeText={setSearchQuery}
						style={styles.searchInput}
						placeholderTextColor={COLORS.gray500}
					/>
				</View>
				<TouchableOpacity
					style={[styles.filterBtn, hasAdvancedFilter && styles.filterBtnActive]}
					onPress={() => setShowFilters((prev) => !prev)}
					activeOpacity={0.8}
				>
					<SlidersHorizontal size={16} color={COLORS.white} strokeWidth={2.2} />
				</TouchableOpacity>
			</View>

			{showFilters ? (
				<View style={styles.advancedFiltersCard}>
					<Text style={styles.advancedTitle}>Filters</Text>

					<Text style={styles.advancedSectionLabel}>Level</Text>
					<View style={styles.advancedChipWrap}>
						{LEVEL_FILTERS.map((level) => {
							const active = selectedLevel === level;
							return (
								<TouchableOpacity
									key={level}
									style={[styles.advancedChip, active && styles.advancedChipActive]}
									onPress={() => setSelectedLevel(level)}
									activeOpacity={0.8}
								>
									<Text style={[styles.advancedChipText, active && styles.advancedChipTextActive]}>
										{level}
									</Text>
								</TouchableOpacity>
							);
						})}
					</View>

					<Text style={styles.advancedSectionLabel}>Price</Text>
					<View style={styles.advancedChipWrap}>
						{PRICE_FILTERS.map((item) => {
							const active = selectedPriceFilter === item.value;
							return (
								<TouchableOpacity
									key={item.value}
									style={[styles.advancedChip, active && styles.advancedChipActive]}
									onPress={() => setSelectedPriceFilter(item.value)}
									activeOpacity={0.8}
								>
									<Text style={[styles.advancedChipText, active && styles.advancedChipTextActive]}>
										{item.label}
									</Text>
								</TouchableOpacity>
							);
						})}
					</View>

					<Text style={styles.advancedSectionLabel}>Sort</Text>
					<View style={styles.advancedChipWrap}>
						{SORT_OPTIONS.map((item) => {
							const active = sortBy === item.value;
							return (
								<TouchableOpacity
									key={item.value}
									style={[styles.advancedChip, active && styles.advancedChipActive]}
									onPress={() => setSortBy(item.value)}
									activeOpacity={0.8}
								>
									<Text style={[styles.advancedChipText, active && styles.advancedChipTextActive]}>
										{item.label}
									</Text>
								</TouchableOpacity>
							);
						})}
					</View>

					<View style={styles.advancedActionsRow}>
						<Button
							title="Reset"
							variant="outline"
							onPress={() => {
								setSelectedLessonType("All");
								setSelectedLevel("All");
								setSelectedPriceFilter("All");
								setSortBy("Recommended");
							}}
							style={styles.advancedActionBtn}
						/>
						<Button
							title="Apply"
							onPress={() => setShowFilters(false)}
							style={styles.advancedActionBtn}
						/>
					</View>
				</View>
			) : null}

			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={styles.filterRow}
			>
				{FILTERS.map((filter) => {
					const active = selectedFilter === filter;
					return (
						<TouchableOpacity
							key={filter}
							style={[styles.filterChip, active && styles.filterChipActive]}
							onPress={() => setSelectedFilter(filter)}
							activeOpacity={0.8}
						>
							<Text style={[styles.filterChipText, active && styles.filterChipTextActive]}>
								{filter}
							</Text>
						</TouchableOpacity>
					);
				})}
			</ScrollView>

			<View style={styles.resultHeader}>
				<Text style={styles.resultCount}>{filteredLessons.length} lessons found</Text>
			</View>

			{filteredLessons.map((lesson) => (
				<Card key={lesson.id}>
					<View style={styles.lessonHeaderRow}>
						<View style={styles.lessonTitleWrap}>
							<BookOpen size={16} color={COLORS.primary} strokeWidth={2.2} />
							<Text style={styles.lessonTitle}>{lesson.title}</Text>
						</View>
						<Badge
							label={lesson.level}
							variant={
								lesson.level === "Beginner"
									? "success"
									: lesson.level === "Intermediate"
										? "warning"
										: "primary"
							}
						/>
					</View>

					<Text style={styles.mentorText}>Mentor: {lesson.mentor}</Text>

					<View style={styles.lessonMetaRow}>
						<View style={styles.lessonMetaItem}>
							<Clock3 size={13} color={COLORS.gray500} strokeWidth={2.2} />
							<Text style={styles.lessonMetaText}>{lesson.duration}</Text>
						</View>
						<View style={styles.lessonMetaItem}>
							<Star size={13} color={COLORS.warning} strokeWidth={2.2} />
							<Text style={styles.lessonMetaText}>{lesson.rating}</Text>
						</View>
						<Text style={styles.priceText}>${lesson.price}</Text>
					</View>

					<Text style={styles.slotText}>Next slot: {lesson.nextSlot}</Text>

					<View style={styles.actionsRow}>
						<Button title="View Details" variant="outline" onPress={() => {}} style={styles.actionBtn} />
						<Button title="Book Now" onPress={() => {}} style={styles.actionBtn} />
					</View>
				</Card>
			))}

			{filteredLessons.length === 0 ? (
				<Card>
					<Text style={styles.emptyStateTitle}>No lessons match your filters</Text>
					<Text style={styles.emptyStateBody}>
						Try changing category, level, price, or search terms.
					</Text>
				</Card>
			) : null}
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.light,
	},
	content: {
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
	mainSection: {
		paddingHorizontal: SPACING.base,
		marginTop: -SPACING.sm,
	},
	title: {
		...TYPOGRAPHY.h2,
		color: COLORS.white,
	},
	subtitle: {
		...TYPOGRAPHY.body,
		color: "rgba(255, 255, 255, 0.85)",
		marginTop: SPACING.xs,
		marginBottom: SPACING.base,
	},
	searchRow: {
		flexDirection: "row",
		gap: SPACING.sm,
		alignItems: "center",
	},
	searchBox: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		borderWidth: 1,
		borderColor: COLORS.gray300,
		backgroundColor: COLORS.white,
		borderRadius: 12,
		paddingHorizontal: SPACING.sm,
	},
	searchInput: {
		flex: 1,
		height: 44,
		marginLeft: SPACING.xs,
		color: COLORS.dark,
		fontSize: 14,
	},
	filterBtn: {
		width: 44,
		height: 44,
		borderRadius: 12,
		backgroundColor: COLORS.primary,
		alignItems: "center",
		justifyContent: "center",
	},
	filterBtnActive: {
		backgroundColor: COLORS.success,
	},
	advancedFiltersCard: {
		backgroundColor: COLORS.white,
		borderWidth: 1,
		borderColor: COLORS.gray200,
		borderRadius: 14,
		padding: SPACING.base,
		marginTop: SPACING.base,
	},
	advancedTitle: {
		...TYPOGRAPHY.body,
		color: COLORS.dark,
		fontWeight: "700",
		marginBottom: SPACING.sm,
	},
	advancedSectionLabel: {
		...TYPOGRAPHY.caption,
		color: COLORS.gray600,
		marginTop: SPACING.xs,
		marginBottom: SPACING.xs,
	},
	advancedChipWrap: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: SPACING.xs,
	},
	advancedChip: {
		paddingHorizontal: SPACING.sm,
		paddingVertical: SPACING.xs,
		borderRadius: 999,
		borderWidth: 1,
		borderColor: COLORS.gray300,
		backgroundColor: COLORS.white,
	},
	advancedChipActive: {
		backgroundColor: "#e0e7ff",
		borderColor: COLORS.primary,
	},
	advancedChipText: {
		...TYPOGRAPHY.caption,
		color: COLORS.gray700,
		fontWeight: "600",
	},
	advancedChipTextActive: {
		color: COLORS.primaryDark,
	},
	advancedActionsRow: {
		flexDirection: "row",
		gap: SPACING.sm,
		marginTop: SPACING.base,
	},
	advancedActionBtn: {
		flex: 1,
	},
	filterRow: {
		gap: SPACING.sm,
		paddingVertical: SPACING.base,
	},
	filterChip: {
		paddingHorizontal: SPACING.base,
		paddingVertical: SPACING.xs,
		borderRadius: 999,
		borderWidth: 1,
		borderColor: COLORS.gray300,
		backgroundColor: COLORS.white,
	},
	filterChipActive: {
		borderColor: COLORS.primary,
		backgroundColor: "#e0e7ff",
	},
	filterChipText: {
		...TYPOGRAPHY.caption,
		color: COLORS.gray700,
		fontWeight: "600",
	},
	filterChipTextActive: {
		color: COLORS.primaryDark,
	},
	resultHeader: {
		marginBottom: SPACING.xs,
	},
	resultCount: {
		...TYPOGRAPHY.caption,
		color: COLORS.gray600,
	},
	lessonHeaderRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-start",
		gap: SPACING.sm,
	},
	lessonTitleWrap: {
		flexDirection: "row",
		alignItems: "center",
		flex: 1,
	},
	lessonTitle: {
		...TYPOGRAPHY.body,
		fontWeight: "700",
		color: COLORS.dark,
		marginLeft: SPACING.xs,
		flex: 1,
	},
	mentorText: {
		...TYPOGRAPHY.caption,
		color: COLORS.gray600,
		marginTop: SPACING.sm,
	},
	lessonMetaRow: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: SPACING.sm,
		gap: SPACING.base,
	},
	lessonMetaItem: {
		flexDirection: "row",
		alignItems: "center",
	},
	lessonMetaText: {
		...TYPOGRAPHY.caption,
		color: COLORS.gray600,
		marginLeft: SPACING.xs,
	},
	priceText: {
		...TYPOGRAPHY.body,
		color: COLORS.primaryDark,
		fontWeight: "700",
		marginLeft: "auto",
	},
	slotText: {
		...TYPOGRAPHY.caption,
		color: COLORS.gray500,
		marginTop: SPACING.sm,
	},
	actionsRow: {
		flexDirection: "row",
		gap: SPACING.sm,
		marginTop: SPACING.base,
	},
	actionBtn: {
		flex: 1,
	},
	emptyStateTitle: {
		...TYPOGRAPHY.body,
		color: COLORS.dark,
		fontWeight: "700",
	},
	emptyStateBody: {
		...TYPOGRAPHY.caption,
		color: COLORS.gray600,
		marginTop: SPACING.xs,
	},
});
