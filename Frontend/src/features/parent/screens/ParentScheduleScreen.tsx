import React, { useMemo, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { CalendarDays, Clock3, UserRound } from "lucide-react-native";
import { COLORS, SPACING, TYPOGRAPHY } from "@/shared/theme";
import { Badge, Card } from "@/shared/components";

type ScheduleView = "Daily" | "Weekly" | "Monthly";

type ScheduleItem = {
	id: string;
	title: string;
	student: string;
	studentImage: string | null;
	initials: string;
	time: string;
	dateLabel: string;
	status: "Confirmed" | "Pending";
};

const VIEWS: ScheduleView[] = ["Daily", "Weekly", "Monthly"];

export function ParentScheduleScreen() {
	const [selectedView, setSelectedView] = useState<ScheduleView>("Daily");

	const scheduleByView: Record<ScheduleView, ScheduleItem[]> = useMemo(
		() => ({
			Daily: [
				{
					id: "p-d-1",
					title: "Math Revision",
					student: "Ethan",
					studentImage: null,
					initials: "ET",
					time: "4:00 PM - 5:00 PM",
					dateLabel: "Today",
					status: "Confirmed",
				},
				{
					id: "p-d-2",
					title: "Science Practice",
					student: "Ava",
					studentImage: null,
					initials: "AV",
					time: "6:30 PM - 7:15 PM",
					dateLabel: "Today",
					status: "Pending",
				},
			],
			Weekly: [
				{
					id: "p-w-1",
					title: "English Writing",
					student: "Ethan",
					studentImage: null,
					initials: "ET",
					time: "Mon • 5:00 PM",
					dateLabel: "This Week",
					status: "Confirmed",
				},
				{
					id: "p-w-2",
					title: "Coding Basics",
					student: "Ava",
					studentImage: null,
					initials: "AV",
					time: "Wed • 7:00 PM",
					dateLabel: "This Week",
					status: "Confirmed",
				},
				{
					id: "p-w-3",
					title: "Physics Concepts",
					student: "Ethan",
					studentImage: null,
					initials: "ET",
					time: "Fri • 4:30 PM",
					dateLabel: "This Week",
					status: "Pending",
				},
			],
			Monthly: [
				{
					id: "p-m-1",
					title: "Exam Prep Block",
					student: "Ethan",
					studentImage: null,
					initials: "ET",
					time: "8 sessions",
					dateLabel: "March",
					status: "Confirmed",
				},
				{
					id: "p-m-2",
					title: "Language Improvement",
					student: "Ava",
					studentImage: null,
					initials: "AV",
					time: "6 sessions",
					dateLabel: "March",
					status: "Confirmed",
				},
			],
		}),
		[]
	);

	const currentItems = scheduleByView[selectedView];

	return (
		<ScrollView style={styles.container} contentContainerStyle={styles.content}>
			<View style={styles.heroSection}>
				<Text style={styles.title}>Parent Schedule</Text>
				<Text style={styles.subtitle}>Track sessions by day, week, or month.</Text>
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
				<Text style={styles.summaryCount}>{currentItems.length} sessions</Text>
			</View>

			{currentItems.map((item) => (
				<Card key={item.id}>
					<View style={styles.itemHeader}>
						<Text style={styles.itemTitle}>{item.title}</Text>
						<Badge label={item.status} variant={item.status === "Confirmed" ? "success" : "warning"} />
					</View>

					<View style={styles.metaRow}>
					<View style={styles.studentAvatarWrap}>
						{item.studentImage ? (
							<Image source={{ uri: item.studentImage }} style={styles.studentAvatar} />
						) : (
							<Text style={styles.studentAvatarText}>{item.initials}</Text>
						)}
					</View>
						<Text style={styles.metaText}>{item.student}</Text>
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
	studentAvatarWrap: {
		width: 32,
		height: 32,
		borderRadius: 16,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#e0e7ff",
	},
	studentAvatar: {
		width: 32,
		height: 32,
		borderRadius: 16,
	},
	studentAvatarText: {
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
