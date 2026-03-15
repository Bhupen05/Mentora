import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { COLORS, SPACING, TYPOGRAPHY } from "@/shared/theme";
import { Card, Badge, Button } from "@/shared/components";

const parseCurrency = (value: string) => Number(value.replace(/[^\d.-]/g, "")) || 0;
const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);

export function WalletScreen() {
  const wallet = {
    balance: "$1,250.00",
    monthlyBudget: "$500.00",
    spent: "$320.00",
    recentTransactions: [
      { id: "1", description: "Lesson - Sarah Chen", amount: "-$45.00", date: "Today" },
      { id: "2", description: "Lesson - James Rodriguez", amount: "-$60.00", date: "Yesterday" },
      { id: "3", description: "Monthly Allowance", amount: "+$500.00", date: "2 days ago" },
    ],
  };

  const budgetLimit = parseCurrency(wallet.monthlyBudget);
  const spentAmount = parseCurrency(wallet.spent);
  const remainingAmount = Math.max(budgetLimit - spentAmount, 0);
  const spentRatio = budgetLimit > 0 ? Math.min(spentAmount / budgetLimit, 1) : 0;
  const spentPercent = Math.round(spentRatio * 100);
  const budgetBadgeVariant = spentRatio >= 0.85 ? "error" : spentRatio >= 0.65 ? "warning" : "success";

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.heroSection}>
        <Text style={styles.screenTitle}>Wallet</Text>
        <Text style={styles.screenSubtitle}>Track budget, spending, and recent payments.</Text>
      </View>

      <View style={styles.balanceSection}>
        <Card style={styles.balanceCard} shadow={false}>
          <View style={styles.balanceHeader}>
            <Text style={styles.balanceLabel}>Family Wallet</Text>
            <Badge
              label={remainingAmount > 0 ? "Healthy" : "Limit Reached"}
              variant={remainingAmount > 0 ? "success" : "error"}
            />
          </View>

          <Text style={styles.balanceAmount}>{wallet.balance}</Text>

          <View style={styles.balanceMetaRow}>
            <View style={styles.balanceMetaCard}>
              <Text style={styles.balanceMetaLabel}>Monthly Budget</Text>
              <Text style={styles.balanceMetaValue}>{wallet.monthlyBudget}</Text>
            </View>
            <View style={styles.balanceMetaCard}>
              <Text style={styles.balanceMetaLabel}>Used</Text>
              <Text style={styles.balanceMetaValue}>{spentPercent}%</Text>
            </View>
          </View>
        </Card>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Monthly Budget</Text>
          <Badge label={`${spentPercent}% used`} variant={budgetBadgeVariant} />
        </View>

        <Card style={styles.budgetCard}>
          <View style={styles.budgetTopRow}>
            <Text style={styles.label}>Spending Progress</Text>
            <Text style={styles.amount}>{spentAmount <= budgetLimit ? "On Track" : "Over Budget"}</Text>
          </View>

          <View style={styles.progressBar}>
            <View style={[styles.progress, { width: `${spentPercent}%` }]} />
          </View>

          <View style={styles.budgetStatsRow}>
            <View style={styles.budgetStatBlock}>
              <Text style={styles.statLabel}>Spent</Text>
              <Text style={styles.spentAmount}>{wallet.spent}</Text>
            </View>
            <View style={styles.budgetStatBlock}>
              <Text style={styles.statLabel}>Remaining</Text>
              <Text style={styles.remainingAmount}>{formatCurrency(remainingAmount)}</Text>
            </View>
            <View style={styles.budgetStatBlock}>
              <Text style={styles.statLabel}>Limit</Text>
              <Text style={styles.amount}>{wallet.monthlyBudget}</Text>
            </View>
          </View>
        </Card>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          <Text style={styles.sectionAction}>See all</Text>
        </View>

        {wallet.recentTransactions.map((transaction) => (
          <Card key={transaction.id} style={styles.transactionCard}>
            <View style={styles.transactionRow}>
              <View style={styles.transactionLeft}>
                <View
                  style={[
                    styles.transactionDot,
                    transaction.amount.startsWith("+") ? styles.dotPositive : styles.dotNegative,
                  ]}
                />
                <View>
                  <Text style={styles.transactionDesc}>{transaction.description}</Text>
                  <Text style={styles.transactionDate}>{transaction.date}</Text>
                </View>
              </View>
              <Text
                style={[
                  styles.transactionAmount,
                  transaction.amount.startsWith("+")
                    ? styles.amountPositive
                    : styles.amountNegative,
                ]}
              >
                {transaction.amount}
              </Text>
            </View>
          </Card>
        ))}
      </View>

      <View style={styles.actionsSection}>
        <Button title="Add Funds" onPress={() => {}} style={styles.actionButton} />
        <Button
          title="View History"
          onPress={() => {}}
          variant="outline"
          style={styles.actionButton}
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
    marginBottom: SPACING.base,
  },
  balanceSection: {
    paddingHorizontal: SPACING.base,
    marginTop: -SPACING["3xl"],
  },
  balanceCard: {
    borderRadius: 20,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.xl,
    backgroundColor: "rgba(255, 255, 255, 0.98)",
    shadowColor: "rgba(255, 255, 255, 0.98)",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.32,
    shadowRadius: 14,
    elevation: 12,
  },
  balanceHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: SPACING.base,
  },
  balanceLabel: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.gray500,
    letterSpacing: 0.3,
    textTransform: "uppercase",
  },
  balanceAmount: {
    fontSize: 38,
    fontWeight: "400",
    color: COLORS.dark,
    marginBottom: SPACING.lg,
  },
  balanceMetaRow: {
    flexDirection: "row",
    gap: SPACING.sm,
  },
  balanceMetaCard: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.14)",
    borderRadius: 12,
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.md,
  },
  balanceMetaLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray500,
    marginBottom: SPACING.xs,
  },
  balanceMetaValue: {
    ...TYPOGRAPHY.body,
    color: COLORS.dark,
    fontWeight: "700",
  },
  section: {
    paddingHorizontal: SPACING.base,
    marginTop: SPACING.lg,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.base,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.dark,
  },
  sectionAction: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.primary,
    fontWeight: "600",
  },
  budgetCard: {
    borderRadius: 16,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
  },
  budgetTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.sm,
  },
  label: {
    ...TYPOGRAPHY.body,
    color: COLORS.gray500,
  },
  amount: {
    ...TYPOGRAPHY.body,
    color: COLORS.dark,
    fontWeight: "700",
  },
  spentAmount: {
    ...TYPOGRAPHY.body,
    color: COLORS.error,
    fontWeight: "700",
  },
  remainingAmount: {
    ...TYPOGRAPHY.body,
    color: COLORS.success,
    fontWeight: "700",
  },
  progressBar: {
    height: 10,
    backgroundColor: COLORS.gray200,
    borderRadius: 6,
    overflow: "hidden",
    marginVertical: SPACING.base,
  },
  progress: {
    height: "100%",
    backgroundColor: COLORS.secondary,
    borderRadius: 6,
  },
  budgetStatsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: SPACING.sm,
  },
  budgetStatBlock: {
    flex: 1,
    backgroundColor: COLORS.gray100,
    borderRadius: 10,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.sm,
  },
  statLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray500,
    marginBottom: SPACING.xs,
  },
  transactionCard: {
    marginBottom: SPACING.sm,
    borderRadius: 14,
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.base,
  },
  transactionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: SPACING.sm,
  },
  transactionLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  transactionDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: SPACING.sm,
  },
  dotNegative: {
    backgroundColor: COLORS.error,
  },
  dotPositive: {
    backgroundColor: COLORS.success,
  },
  transactionDesc: {
    ...TYPOGRAPHY.body,
    color: COLORS.dark,
    fontWeight: "600",
  },
  transactionDate: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray500,
    marginTop: 2,
  },
  transactionAmount: {
    ...TYPOGRAPHY.body,
    fontWeight: "700",
  },
  amountNegative: {
    color: COLORS.error,
  },
  amountPositive: {
    color: COLORS.success,
  },
  actionsSection: {
    paddingHorizontal: SPACING.base,
    marginTop: SPACING.lg,
    gap: SPACING.base,
  },
  actionButton: {
    borderRadius: 12,
  },
});
