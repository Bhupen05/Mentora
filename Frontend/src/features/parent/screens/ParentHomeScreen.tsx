import React, { useMemo } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
	Activity,
	ArrowUpRight,
	ArrowRight,
	BookOpen,
	CalendarClock,
	CalendarDays,
	CircleCheck,
	CircleAlert,
	FileText,
	GraduationCap,
	PlusCircle,
	TrendingUp,
	UserRound,
	Wallet,
	Clock3,
	BarChart3,
} from "lucide-react-native";
import { COLORS, SPACING, TYPOGRAPHY } from "@/shared/theme";
import { Badge, Button, Card } from "@/shared/components";

type StudentProgress = {
	id: string;
	name: string;
	grade: string;
	completion: number;
	weeklyHours: number;
	avgScore: number;
	attendance: number;
};

type ActivityItem = {
	id: string;
	text: string;
	time: string;
	type: "success" | "info";
};

export function ParentHomeScreen() {
	const insets = useSafeAreaInsets();
	const students: StudentProgress[] = useMemo(
		() => [
			{
				id: "s1",
				name: "Emma",
				grade: "10th Grade",
				completion: 78,
				weeklyHours: 6.5,
				avgScore: 88,
				attendance: 96,
			},
			{
				id: "s2",
				name: "Oliver",
				grade: "8th Grade",
				completion: 63,
				weeklyHours: 4.2,
				avgScore: 81,
				attendance: 91,
			},
		],
		[]
	);

	const walletBalance = 450;
	const upcomingSessions = 4;
	const weeklyHours = 10.7;

	const totalAvgScore = useMemo(() => {
		const sum = students.reduce((acc, item) => acc + item.avgScore, 0);
		return Math.round(sum / students.length);
	}, [students]);

	const overallCompletion = useMemo(() => {
		const sum = students.reduce((acc, item) => acc + item.completion, 0);
		return Math.round(sum / students.length);
	}, [students]);

	const atRiskStudents = useMemo(
		() => students.filter((item) => item.completion < 70 || item.avgScore < 75),
		[students]
	);

	const currentSession = {
		student: "Emma",
		mentor: "Sarah Thompson",
		subject: "Advanced React",
		time: "Now • Ends in 32 mins",
	};

	const recentActivity: ActivityItem[] = useMemo(
		() => [
			{
				id: "a1",
				text: "Emma completed JavaScript Quiz 4",
				time: "15 mins ago",
				type: "success",
			},
			{
				id: "a2",
				text: "Oliver started Algebra Practice Set",
				time: "1 hour ago",
				type: "info",
			},
			{
				id: "a3",
				text: "Session with Sarah was scheduled",
				time: "Today, 9:10 AM",
				type: "info",
			},
		],
		[]
	);

	const quickActions = useMemo(
		() => [
			{ id: "q1", title: "Book Lesson", subtitle: "Schedule a new session", icon: BookOpen },
			{ id: "q2", title: "Manage Schedule", subtitle: "Edit learning calendar", icon: CalendarDays },
			{ id: "q3", title: "Progress Reports", subtitle: "Download weekly reports", icon: FileText },
			{ id: "q4", title: "Add Funds", subtitle: "Top up wallet quickly", icon: PlusCircle },
		],
		[]
	);

	return (
		<ScrollView
			style={styles.container}
			contentContainerStyle={[
				styles.contentContainer,
				{ paddingBottom: SPACING["4xl"] + insets.bottom + 10 },
			]}
			showsVerticalScrollIndicator={false}
		>
			<View style={styles.heroSection}>
				<Text style={styles.greeting}>Parent Home</Text>
				<Text style={styles.subGreeting}>Track learning progress and active sessions</Text>

				<View style={styles.topStatsRow}>
					<View style={styles.topStatCard}>
						<Wallet size={15} color={COLORS.primaryDark} strokeWidth={2.2} />
						<Text style={styles.topStatValue}>${walletBalance}</Text>
						<Text style={styles.topStatLabel}>Wallet</Text>
					</View>
					<View style={styles.topStatCard}>
						<Clock3 size={15} color={COLORS.primaryDark} strokeWidth={2.2} />
						<Text style={styles.topStatValue}>{upcomingSessions}</Text>
						<Text style={styles.topStatLabel}>Upcoming</Text>
					</View>
					<View style={styles.topStatCard}>
						<BarChart3 size={15} color={COLORS.primaryDark} strokeWidth={2.2} />
						<Text style={styles.topStatValue}>{totalAvgScore}%</Text>
						<Text style={styles.topStatLabel}>Avg Score</Text>
					</View>
				</View>
			</View>

			<View style={styles.sectionTight}>
				<Card style={styles.overviewBannerCard}>
					<View style={styles.overviewBannerHeader}>
						<Text style={styles.overviewBannerTitle}>Weekly Learning Overview</Text>
						<View style={styles.trendPill}>
							<ArrowUpRight size={13} color={COLORS.success} strokeWidth={2.4} />
							<Text style={styles.trendPillText}>+8%</Text>
						</View>
					</View>
					<View style={styles.overviewStatsRow}>
						<View style={styles.overviewMetricBlock}>
							<Text style={styles.overviewMetricValue}>{weeklyHours}h</Text>
							<Text style={styles.overviewMetricLabel}>Total Study Time</Text>
						</View>
						<View style={styles.overviewDivider} />
						<View style={styles.overviewMetricBlock}>
							<Text style={styles.overviewMetricValue}>{overallCompletion}%</Text>
							<Text style={styles.overviewMetricLabel}>Completion Rate</Text>
						</View>
					</View>
				</Card>
			</View>

			{atRiskStudents.length > 0 && (
				<View style={styles.section}>
					<Card style={styles.alertCard}>
						<View style={styles.alertRow}>
							<CircleAlert size={17} color={COLORS.warning} strokeWidth={2.2} />
							<View style={styles.alertTextWrap}>
								<Text style={styles.alertTitle}>Attention Needed</Text>
								<Text style={styles.alertText}>
									{atRiskStudents.map((item) => item.name).join(", ")} need extra support this week.
								</Text>
							</View>
						</View>
					</Card>
				</View>
			)}

			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Current Session</Text>
				<Text style={styles.sectionHint}>Live classes requiring your attention now</Text>
				<Card style={styles.currentSessionCard}>
					<View style={styles.sessionHeaderRow}>
						<View style={styles.sessionTitleWrap}>
							<CalendarClock size={16} color={COLORS.primaryDark} strokeWidth={2.2} />
							<Text style={styles.sessionTitle}>{currentSession.subject}</Text>
						</View>
						<Badge label="Live" variant="success" />
					</View>
					<Text style={styles.sessionText}>Student: {currentSession.student}</Text>
					<Text style={styles.sessionText}>Mentor: {currentSession.mentor}</Text>
					<View style={styles.liveMetaRow}>
						<View style={styles.liveMetaPill}>
							<Text style={styles.liveMetaText}>Session in progress</Text>
						</View>
						<View style={styles.liveMetaPill}>
							<Text style={styles.liveMetaText}>1:1 Mentoring</Text>
						</View>
					</View>
					<Text style={styles.sessionTime}>{currentSession.time}</Text>
					<Button title="Join Session" onPress={() => {}} style={styles.sessionButton} />
					<Button
						title="View Lesson Details"
						variant="secondary"
						onPress={() => {}}
						style={styles.sessionSecondaryButton}
					/>
				</Card>
			</View>

			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Student Progress</Text>
				<Text style={styles.sectionHint}>Monitor completion, scores, and attendance at a glance</Text>
				{students.map((student) => (
					<Card key={student.id}>
						<View style={styles.studentHeader}>
							<View>
								<Text style={styles.studentName}>{student.name}</Text>
								<Text style={styles.studentGrade}>{student.grade}</Text>
							</View>
							<View style={styles.completionPill}>
								<TrendingUp size={13} color={COLORS.success} strokeWidth={2.2} />
								<Text style={styles.completionText}>{student.completion}%</Text>
							</View>
						</View>

						<View style={styles.progressTrack}>
							<View style={[styles.progressFill, { width: `${student.completion}%` }]} />
						</View>

						<View style={styles.metricsRow}>
							<View style={styles.metricItem}>
								<Activity size={14} color={COLORS.primary} strokeWidth={2.2} />
								<Text style={styles.metricText}>{student.weeklyHours}h this week</Text>
							</View>
							<View style={styles.metricItem}>
								<GraduationCap size={14} color={COLORS.warning} strokeWidth={2.2} />
								<Text style={styles.metricText}>Avg {student.avgScore}%</Text>
							</View>
							<View style={styles.metricItem}>
								<CircleCheck size={14} color={COLORS.success} strokeWidth={2.2} />
								<Text style={styles.metricText}>{student.attendance}% attendance</Text>
							</View>
						</View>
					</Card>
				))}
			</View>

			<View style={styles.section}>
				<View style={styles.sectionTitleRow}>
					<Text style={styles.sectionTitle}>Recent Activity</Text>
					<TouchableOpacity style={styles.inlineActionBtn} activeOpacity={0.8} onPress={() => {}}>
						<Text style={styles.inlineActionText}>View all</Text>
						<ArrowRight size={14} color={COLORS.primaryDark} strokeWidth={2.2} />
					</TouchableOpacity>
				</View>
				<Card>
					{recentActivity.map((item, idx) => (
						<View key={item.id} style={[styles.activityRow, idx > 0 && styles.activityDivider]}>
							<View style={styles.activityIconWrap}>
								{item.type === "success" ? (
									<CircleCheck size={15} color={COLORS.success} strokeWidth={2.2} />
								) : (
									<UserRound size={15} color={COLORS.info} strokeWidth={2.2} />
								)}
							</View>
							<View style={styles.activityTextWrap}>
								<Text style={styles.activityText}>{item.text}</Text>
								<Text style={styles.activityTime}>{item.time}</Text>
							</View>
						</View>
					))}
				</Card>
			</View>

			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Quick Actions</Text>
				<Text style={styles.sectionHint}>Most-used actions for parents</Text>
				<View style={styles.quickActionGrid}>
					{quickActions.map((action) => {
						const ActionIcon = action.icon;
						return (
							<TouchableOpacity
								key={action.id}
								style={styles.quickActionTile}
								activeOpacity={0.85}
								onPress={() => {}}
							>
								<View style={styles.quickActionIconWrap}>
									<ActionIcon size={17} color={COLORS.primaryDark} strokeWidth={2.2} />
								</View>
								<Text style={styles.quickActionTitle}>{action.title}</Text>
								<Text style={styles.quickActionSubtitle}>{action.subtitle}</Text>
							</TouchableOpacity>
						);
					})}
				</View>

				<Button title="Book New Lesson" onPress={() => {}} style={styles.primaryActionBtn} />
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
		paddingBottom: SPACING["3xl"],
	},
	heroSection: {
		paddingHorizontal: SPACING.base,
		paddingTop: SPACING.xl,
		paddingBottom: SPACING.lg,
		backgroundColor: COLORS.primaryDark,
		borderBottomLeftRadius: 24,
		borderBottomRightRadius: 24,
	},
	greeting: {
		...TYPOGRAPHY.h2,
		color: COLORS.white,
	},
	subGreeting: {
		...TYPOGRAPHY.body,
		color: "rgba(255, 255, 255, 0.85)",
		marginTop: SPACING.xs,
		marginBottom: SPACING.base,
	},
	sectionTight: {
		paddingHorizontal: SPACING.base,
		marginTop: -SPACING.base,
	},
	overviewBannerCard: {
		backgroundColor: COLORS.white,
		borderWidth: 1,
		borderColor: COLORS.gray100,
		paddingVertical: SPACING.md,
	},
	overviewBannerHeader: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	overviewBannerTitle: {
		...TYPOGRAPHY.bodySmall,
		fontWeight: "700",
		color: COLORS.dark,
	},
	trendPill: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: SPACING.sm,
		paddingVertical: 2,
		borderRadius: 999,
		backgroundColor: "#dcfce7",
	},
	trendPillText: {
		...TYPOGRAPHY.caption,
		fontWeight: "700",
		color: COLORS.success,
		marginLeft: 2,
	},
	overviewStatsRow: {
		marginTop: SPACING.base,
		flexDirection: "row",
		alignItems: "center",
	},
	overviewMetricBlock: {
		flex: 1,
	},
	overviewMetricValue: {
		...TYPOGRAPHY.h3,
		color: COLORS.primaryDark,
		fontWeight: "700",
	},
	overviewMetricLabel: {
		...TYPOGRAPHY.caption,
		color: COLORS.gray600,
		marginTop: SPACING.xs,
	},
	overviewDivider: {
		width: 1,
		height: 36,
		backgroundColor: COLORS.gray200,
		marginHorizontal: SPACING.base,
	},
	topStatsRow: {
		flexDirection: "row",
		gap: SPACING.sm,
	},
	topStatCard: {
		flex: 1,
		backgroundColor: "rgba(255, 255, 255, 0.98)",
		borderRadius: 12,
		paddingHorizontal: SPACING.sm,
		paddingVertical: SPACING.sm,
		alignItems: "center",
	},
	topStatValue: {
		...TYPOGRAPHY.body,
		fontWeight: "700",
		color: COLORS.dark,
		marginTop: SPACING.xs,
	},
	topStatLabel: {
		...TYPOGRAPHY.caption,
		color: COLORS.gray600,
		marginTop: 2,
	},
	alertCard: {
		backgroundColor: "#fffbeb",
		borderWidth: 1,
		borderColor: "#fde68a",
	},
	alertRow: {
		flexDirection: "row",
		alignItems: "flex-start",
	},
	alertTextWrap: {
		flex: 1,
		marginLeft: SPACING.sm,
	},
	alertTitle: {
		...TYPOGRAPHY.bodySmall,
		fontWeight: "700",
		color: COLORS.dark,
	},
	alertText: {
		...TYPOGRAPHY.caption,
		color: COLORS.gray700,
		marginTop: 2,
	},
	section: {
		paddingHorizontal: SPACING.base,
		paddingTop: SPACING.xl,
		paddingBottom: SPACING.sm,
	},
	sectionTitle: {
		...TYPOGRAPHY.bodyLarge,
		fontWeight: "600",
		color: COLORS.dark,
		marginBottom: SPACING.sm,
	},
	sectionHint: {
		...TYPOGRAPHY.caption,
		color: COLORS.gray600,
		marginBottom: SPACING.sm,
	},
	sectionTitleRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: SPACING.sm,
	},
	inlineActionBtn: {
		flexDirection: "row",
		alignItems: "center",
		gap: SPACING.xs,
	},
	inlineActionText: {
		...TYPOGRAPHY.caption,
		color: COLORS.primaryDark,
		fontWeight: "700",
	},
	currentSessionCard: {
		backgroundColor: "#eef2ff",
		borderWidth: 1,
		borderColor: "#c7d2fe",
		shadowColor: COLORS.primary,
		shadowOffset: { width: 0, height: 5 },
		shadowOpacity: 0.12,
		shadowRadius: 10,
		elevation: 4,
	},
	sessionHeaderRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: SPACING.sm,
	},
	sessionTitleWrap: {
		flexDirection: "row",
		alignItems: "center",
	},
	sessionTitle: {
		...TYPOGRAPHY.body,
		color: COLORS.dark,
		fontWeight: "700",
		marginLeft: SPACING.xs,
	},
	sessionText: {
		...TYPOGRAPHY.bodySmall,
		color: COLORS.gray700,
		marginTop: SPACING.xs,
	},
	liveMetaRow: {
		marginTop: SPACING.sm,
		flexDirection: "row",
		gap: SPACING.xs,
	},
	liveMetaPill: {
		paddingHorizontal: SPACING.sm,
		paddingVertical: SPACING.xs,
		borderRadius: 999,
		backgroundColor: "rgba(99, 102, 241, 0.12)",
	},
	liveMetaText: {
		...TYPOGRAPHY.caption,
		color: COLORS.primaryDark,
		fontWeight: "600",
	},
	sessionTime: {
		...TYPOGRAPHY.caption,
		color: COLORS.primaryDark,
		marginTop: SPACING.sm,
	},
	sessionButton: {
		marginTop: SPACING.base,
	},
	sessionSecondaryButton: {
		marginTop: SPACING.sm,
	},
	studentHeader: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		gap: SPACING.sm,
	},
	studentName: {
		...TYPOGRAPHY.body,
		fontWeight: "700",
		color: COLORS.dark,
	},
	studentGrade: {
		...TYPOGRAPHY.caption,
		color: COLORS.gray500,
		marginTop: SPACING.xs,
	},
	completionPill: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#dcfce7",
		borderRadius: 999,
		paddingHorizontal: SPACING.sm,
		paddingVertical: SPACING.xs,
	},
	completionText: {
		...TYPOGRAPHY.caption,
		color: COLORS.success,
		fontWeight: "700",
		marginLeft: SPACING.xs,
	},
	progressTrack: {
		marginTop: SPACING.base,
		height: 8,
		borderRadius: 999,
		backgroundColor: COLORS.gray200,
		overflow: "hidden",
	},
	progressFill: {
		height: "100%",
		borderRadius: 999,
		backgroundColor: COLORS.success,
	},
	metricsRow: {
		marginTop: SPACING.base,
		flexDirection: "row",
		flexWrap: "wrap",
		gap: SPACING.sm,
	},
	metricItem: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: COLORS.gray100,
		borderRadius: 999,
		paddingHorizontal: SPACING.sm,
		paddingVertical: SPACING.xs,
		borderWidth: 1,
		borderColor: COLORS.gray200,
	},
	metricText: {
		...TYPOGRAPHY.caption,
		color: COLORS.gray700,
		marginLeft: SPACING.xs,
	},
	activityRow: {
		flexDirection: "row",
		alignItems: "flex-start",
		paddingVertical: SPACING.sm,
	},
	activityDivider: {
		borderTopWidth: 1,
		borderTopColor: COLORS.gray100,
	},
	activityIconWrap: {
		marginTop: 1,
	},
	activityTextWrap: {
		flex: 1,
		marginLeft: SPACING.sm,
	},
	activityText: {
		...TYPOGRAPHY.bodySmall,
		color: COLORS.dark,
	},
	activityTime: {
		...TYPOGRAPHY.caption,
		color: COLORS.gray500,
		marginTop: 2,
	},
	secondButton: {
		marginTop: SPACING.base,
	},
	quickActionGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: SPACING.sm,
	},
	quickActionTile: {
		width: "48.5%",
		backgroundColor: COLORS.white,
		borderRadius: 12,
		paddingHorizontal: SPACING.sm,
		paddingVertical: SPACING.sm,
		borderWidth: 1,
		borderColor: COLORS.gray100,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.06,
		shadowRadius: 6,
		elevation: 2,
	},
	quickActionIconWrap: {
		width: 30,
		height: 30,
		borderRadius: 8,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "rgba(99, 102, 241, 0.12)",
	},
	quickActionTitle: {
		...TYPOGRAPHY.bodySmall,
		fontWeight: "700",
		color: COLORS.dark,
		marginTop: SPACING.sm,
	},
	quickActionSubtitle: {
		...TYPOGRAPHY.caption,
		color: COLORS.gray500,
		marginTop: 2,
	},
	primaryActionBtn: {
		marginTop: SPACING.base,
	},
});
