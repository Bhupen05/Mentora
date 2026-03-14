import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { COLORS, SPACING, TYPOGRAPHY } from "@/shared/theme";
import { Card, Badge, Button } from "@/shared/components";

export function EarningsScreen() {
  const earningsData = {
    totalEarnings: "$2,450",
    monthlyEarnings: "$450",
    pendingPayment: "$150",
    lessonsTaughtThisMonth: 12,
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Stats */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Earnings Overview</Text>
        
        <Card style={styles.dashCard}>
          <View style={styles.statRow}>
            <Text style={styles.label}>Total Earnings</Text>
            <Text style={styles.amount}>{earningsData.totalEarnings}</Text>
          </View>
        </Card>

        <Card style={styles.dashCard}>
          <View style={styles.statRow}>
            <Text style={styles.label}>This Month</Text>
            <Text style={styles.amount}>{earningsData.monthlyEarnings}</Text>
          </View>
        </Card>

        <Card style={styles.dashCard}>
          <View style={styles.statRow}>
            <Text style={styles.label}>Pending Payment</Text>
            <Text style={styles.pendingAmount}>{earningsData.pendingPayment}</Text>
          </View>
        </Card>
      </View>

      {/* Stats */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Activity</Text>
        <Card style={styles.statCard}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{earningsData.lessonsTaughtThisMonth}</Text>
            <Text style={styles.statLabel}>Lessons This Month</Text>
          </View>
        </Card>
      </View>

      {/* Payment Methods */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Method</Text>
        <Card>
          <Text style={styles.text}>Bank Transfer - Ending in 4242</Text>
          <Button title="Update Payment Method" onPress={() => {}} style={styles.button} />
        </Card>
      </View>

      {/* Withdrawal Section */}
      <View style={styles.section}>
        <Button 
          title="Request Withdrawal" 
          onPress={() => {}} 
          variant="primary"
          style={styles.withdrawButton}
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
  section: {
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.lg,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.dark,
    marginBottom: SPACING.lg,
  },
  dashCard: {
    marginBottom: SPACING.base,
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.base,
  },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    ...TYPOGRAPHY.body,
    color: COLORS.gray500,
  },
  amount: {
    ...TYPOGRAPHY.h3,
    color: COLORS.primary,
    fontWeight: "700",
  },
  pendingAmount: {
    ...TYPOGRAPHY.h3,
    color: "#f59e0b",
    fontWeight: "700",
  },
  statCard: {
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.base,
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
  text: {
    ...TYPOGRAPHY.body,
    color: COLORS.dark,
    marginBottom: SPACING.base,
  },
  button: {
    marginTop: SPACING.base,
  },
  withdrawButton: {
    marginHorizontal: 0,
  },
});
