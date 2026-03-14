import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { COLORS, SPACING, TYPOGRAPHY } from "@/shared/theme";
import { Card, Badge, Button } from "@/shared/components";

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

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Balance Card */}
      <View style={styles.balanceSection}>
        <Card style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Available Balance</Text>
          <Text style={styles.balanceAmount}>{wallet.balance}</Text>
        </Card>
      </View>

      {/* Budget */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Monthly Budget</Text>
        <Card style={styles.budgetCard}>
          <View style={styles.budgetRow}>
            <Text style={styles.label}>Budget Limit</Text>
            <Text style={styles.amount}>{wallet.monthlyBudget}</Text>
          </View>
          <View style={styles.budgetRow}>
            <Text style={styles.label}>Spent</Text>
            <Text style={styles.spentAmount}>{wallet.spent}</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progress, { width: "64%" }]} />
          </View>
          <Text style={styles.remaining}>
            Remaining: ${(parseFloat(wallet.monthlyBudget) - parseFloat(wallet.spent)).toFixed(2)}
          </Text>
        </Card>
      </View>

      {/* Recent Transactions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        {wallet.recentTransactions.map((transaction) => (
          <Card key={transaction.id} style={styles.transactionCard}>
            <View style={styles.transactionRow}>
              <View>
                <Text style={styles.transactionDesc}>{transaction.description}</Text>
                <Text style={styles.transactionDate}>{transaction.date}</Text>
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

      {/* Action Buttons */}
      <View style={styles.section}>
        <Button title="Add Funds" onPress={() => {}} style={styles.button} />
        <Button 
          title="View History" 
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
  balanceSection: {
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.xl,
  },
  balanceCard: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xl,
    backgroundColor: COLORS.primary,
  },
  balanceLabel: {
    ...TYPOGRAPHY.bodySmall,
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: SPACING.base,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: "700",
    color: COLORS.white,
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
  budgetCard: {
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.base,
  },
  budgetRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: SPACING.base,
  },
  label: {
    ...TYPOGRAPHY.body,
    color: COLORS.gray500,
  },
  amount: {
    ...TYPOGRAPHY.body,
    color: COLORS.dark,
    fontWeight: "600",
  },
  spentAmount: {
    ...TYPOGRAPHY.body,
    color: COLORS.error,
    fontWeight: "600",
  },
  progressBar: {
    height: 8,
    backgroundColor: COLORS.gray200,
    borderRadius: 4,
    marginBottom: SPACING.base,
    overflow: "hidden",
  },
  progress: {
    height: "100%",
    backgroundColor: COLORS.secondary,
    borderRadius: 4,
  },
  remaining: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.gray500,
    textAlign: "center",
  },
  transactionCard: {
    marginBottom: SPACING.base,
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.base,
  },
  transactionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  transactionDesc: {
    ...TYPOGRAPHY.body,
    color: COLORS.dark,
    fontWeight: "500",
  },
  transactionDate: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.gray500,
    marginTop: SPACING.xs,
  },
  transactionAmount: {
    ...TYPOGRAPHY.body,
    fontWeight: "600",
  },
  amountNegative: {
    color: COLORS.error,
  },
  amountPositive: {
    color: COLORS.success,
  },
  button: {
    marginBottom: SPACING.base,
  },
});
