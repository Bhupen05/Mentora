import React, { useMemo, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { CalendarDays, Clock3, UserRound } from "lucide-react-native";
import { COLORS, SPACING, TYPOGRAPHY } from "@/shared/theme";
import { Badge, Card } from "@/shared/components";

type ScheduleView = "Daily" | "Weekly" | "Monthly";

type ScheduleItem = {
	id: string;
	title: string;
	mentor: string;
	mentorImage: string | null;
	initials: string;
	time: string;
	dateLabel: string;
	status: "Upcoming" | "Completed";
};

const VIEWS: ScheduleView[] = ["Daily", "Weekly", "Monthly"];

export function StudentScheduleScreen() {
	const [selectedView, setSelectedView] = useState<ScheduleView>("Daily");

	const scheduleByView: Record<ScheduleView, ScheduleItem[]> = useMemo(
		() => ({
			Daily: [
				{
					id: "s-d-1",
					title: "JavaScript Basics",
					mentor: "Sarah Chen",
					mentorImage: null,
					initials: "SC",
					time: "3:00 PM - 4:00 PM",
					dateLabel: "Today",
					status: "Upcoming",
				},
				{
					id: "s-d-2",
					title: "English Grammar",
					mentor: "Daniel Kim",
					mentorImage: null,
					initials: "DK",
					time: "6:00 PM - 6:45 PM",
					dateLabel: "Today",
					status: "Upcoming",
				},
			],
			Weekly: [
				{
					id: "s-w-1",
					title: "React Practice",
					mentor: "Amelia Wright",
					mentorImage: null,
					initials: "AW",
					time: "Mon • 5:30 PM",
					dateLabel: "This Week",
					status: "Upcoming",
				},
				{
					id: "s-w-2",
					title: "Math Drills",
					mentor: "Victor Flores",
					mentorImage: null,
					initials: "VF",
					time: "Wed • 4:00 PM",
					dateLabel: "This Week",
					status: "Upcoming",
				},
				{
					id: "s-w-3",
					title: "Science Quiz Prep",
					mentor: "Noah Patel",
					mentorImage: null,
					initials: "NP",
					time: "Fri • 6:15 PM",
					dateLabel: "This Week",
					status: "Completed",
				},
			],
			Monthly: [
				{
					id: "s-m-1",
					title: "Full Stack Track",
					mentor: "Sarah Chen",
					mentorImage: null,
					initials: "SC",
					time: "10 sessions",
					dateLabel: "March",
					status: "Upcoming",
				},
				{
					id: "s-m-2",
					title: "Exam Booster",
					mentor: "Victor Flores",
					mentorImage: null,
					initials: "VF",
					time: "7 sessions",
					dateLabel: "March",
					status: "Completed",
				},
			],
		}),
		[]
	);

	const currentItems = scheduleByView[selectedView];

	return (
		<ScrollView style={styles.container} contentContainerStyle={styles.content}>
			<View style={styles.heroSection}>
				<Text style={styles.title}>Student Schedule</Text>
				<Text style={styles.subtitle}>Plan your lessons by day, week, and month.</Text>
			</View>

			<View style={styles.mainSection}>

			<View style={styles.segmentedWrap}>
				{VIEWS.map((view) => {
					const active = selectedView === view;
					return (
						<TouchableOpacity
							key={view}
							style={[styles.segmentBtn, active && styles.segmentBtnActive]}
							onPress={() => setSelectedView(view)}
							activeOpacity={0.85}
						>
							<Text style={[styles.segmentText, active && styles.segmentTextActive]}>{view}</Text>
						</TouchableOpacity>
					);
				})}
			</View>

			<View style={styles.summaryCard}>
				<View style={styles.summaryItem}>
					<CalendarDays size={16} color={COLORS.primaryDark} strokeWidth={2.2} />
					<Text style={styles.summaryText}>{selectedView} Plan</Text>
				</View>
				<Text style={styles.summaryCount}>{currentItems.length} lessons</Text>
			</View>

			{currentItems.map((item) => (
				<Card key={item.id}>
					<View style={styles.itemHeader}>
						<Text style={styles.itemTitle}>{item.title}</Text>
						<Badge label={item.status} variant={item.status === "Upcoming" ? "primary" : "success"} />
					</View>

					<View style={styles.metaRow}>
					<View style={styles.mentorAvatarWrap}>
						{item.mentorImage ? (
							<Image source={{ uri: item.mentorImage }} style={styles.mentorAvatar} />
						) : (
							<Text style={styles.mentorAvatarText}>{item.initials}</Text>
						)}
					</View>
						<Text style={styles.metaText}>{item.mentor}</Text>
					</View>

					<View style={styles.metaRow}>
						<Clock3 size={14} color={COLORS.gray500} strokeWidth={2.2} />
						<Text style={styles.metaText}>{item.time}</Text>
					</View>

					<Text style={styles.dateText}>{item.dateLabel}</Text>
				</Card>
			))}
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
	segmentedWrap: {
		flexDirection: "row",
		backgroundColor: COLORS.white,
		borderRadius: 12,
		padding: SPACING.xs,
		borderWidth: 1,
		borderColor: COLORS.gray200,
		gap: SPACING.xs,
	},
	segmentBtn: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: SPACING.sm,
		borderRadius: 10,
	},
	segmentBtnActive: {
		backgroundColor: COLORS.primary,
	},
	segmentText: {
		...TYPOGRAPHY.caption,
		fontWeight: "700",
		color: COLORS.gray600,
	},
	segmentTextActive: {
		color: COLORS.white,
	},
	summaryCard: {
		marginTop: SPACING.base,
		marginBottom: SPACING.sm,
		padding: SPACING.base,
		borderRadius: 12,
		backgroundColor: COLORS.white,
		borderWidth: 1,
		borderColor: COLORS.gray200,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	summaryItem: {
		flexDirection: "row",
		alignItems: "center",
		gap: SPACING.xs,
	},
	summaryText: {
		...TYPOGRAPHY.bodySmall,
		color: COLORS.gray700,
		fontWeight: "600",
	},
	summaryCount: {
		...TYPOGRAPHY.body,
		fontWeight: "700",
		color: COLORS.primaryDark,
	},
	itemHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		gap: SPACING.sm,
	},
	itemTitle: {
		...TYPOGRAPHY.body,
		fontWeight: "700",
		color: COLORS.dark,
		flex: 1,
	},
	metaRow: {
		marginTop: SPACING.sm,
		flexDirection: "row",
		alignItems: "center",
		gap: SPACING.xs,
	},
	mentorAvatarWrap: {
		width: 32,
		height: 32,
		borderRadius: 16,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#e0e7ff",
	},
	mentorAvatar: {
		width: 32,
		height: 32,
		borderRadius: 16,
	},
	mentorAvatarText: {
		...TYPOGRAPHY.bodySmall,
		color: COLORS.primaryDark,
		fontWeight: "700",
		fontSize: 11,
	},
	metaText: {
		...TYPOGRAPHY.caption,
		color: COLORS.gray600,
	},
	dateText: {
		...TYPOGRAPHY.caption,
		color: COLORS.gray500,
		marginTop: SPACING.sm,
	},
});
