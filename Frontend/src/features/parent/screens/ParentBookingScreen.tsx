import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { COLORS, SPACING, TYPOGRAPHY } from "@/shared/theme";
import { Button, Card, CardHeader } from "@/shared/components";

type SlotType = "individual" | "group";
type BookingStatus = "idle" | "insufficient" | "failed" | "success" | "cancelled";

export function ParentBookingScreen() {
  const router = useRouter();
  const { mentorName, rate } = useLocalSearchParams<{ mentorName?: string; rate?: string }>();
  const parsedRate = Number(rate ?? "50") || 50;

  const [selectedDate, setSelectedDate] = useState("2024-03-20");
  const [selectedTime, setSelectedTime] = useState("14:00");
  const [slotType, setSlotType] = useState<SlotType>("individual");
  const [duration, setDuration] = useState(60);
  const [walletBalance, setWalletBalance] = useState(25);
  const [bookingStatus, setBookingStatus] = useState<BookingStatus>("idle");
  const [retryCount, setRetryCount] = useState(0);

  const upcomingDates = ["2024-03-20", "2024-03-21", "2024-03-22", "2024-03-23"];
  const timeSlots = ["10:00", "11:00", "14:00", "15:00", "16:00"];
  const durations = [30, 45, 60, 90, 120];

  const slotAvailable = !(selectedDate === "2024-03-23" && selectedTime === "16:00");
  const totalCost = Number(((duration / 60) * parsedRate).toFixed(2));

  const handleConfirmBooking = () => {
    if (!slotAvailable) {
      Alert.alert("Slot Unavailable", "Please choose another slot.");
      return;
    }

    if (walletBalance < totalCost) {
      setBookingStatus("insufficient");
      return;
    }

    if (retryCount === 0) {
      setBookingStatus("failed");
      setRetryCount((count) => count + 1);
      return;
    }

    setWalletBalance((balance) => Number((balance - totalCost).toFixed(2)));
    setBookingStatus("success");
  };

  const handleAddFunds = () => {
    setWalletBalance((balance) => balance + 120);
    setBookingStatus("idle");
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.heroSection}>
        <Text style={styles.screenTitle}>Parent Booking</Text>
        <Text style={styles.screenSubtitle}>Discovery → Booking → Wallet/Payment retry flow</Text>
        <Text style={styles.walletText}>Wallet: ${walletBalance.toFixed(2)}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Slot Type</Text>
        <View style={styles.row}>
          <TouchableOpacity
            style={[styles.choiceBtn, slotType === "individual" && styles.choiceBtnActive]}
            onPress={() => setSlotType("individual")}
            activeOpacity={0.8}
          >
            <Text style={[styles.choiceText, slotType === "individual" && styles.choiceTextActive]}>Individual</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.choiceBtn, slotType === "group" && styles.choiceBtnActive]}
            onPress={() => setSlotType("group")}
            activeOpacity={0.8}
          >
            <Text style={[styles.choiceText, slotType === "group" && styles.choiceTextActive]}>Group</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Date</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {upcomingDates.map((date) => (
            <TouchableOpacity
              key={date}
              style={[styles.pill, selectedDate === date && styles.pillActive]}
              onPress={() => setSelectedDate(date)}
              activeOpacity={0.8}
            >
              <Text style={[styles.pillText, selectedDate === date && styles.pillTextActive]}>{date}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Time</Text>
        <View style={styles.grid}>
          {timeSlots.map((time) => (
            <TouchableOpacity
              key={time}
              style={[styles.gridBtn, selectedTime === time && styles.gridBtnActive]}
              onPress={() => setSelectedTime(time)}
              activeOpacity={0.8}
            >
              <Text style={[styles.gridText, selectedTime === time && styles.gridTextActive]}>{time}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Duration</Text>
        <View style={styles.grid}>
          {durations.map((dur) => (
            <TouchableOpacity
              key={dur}
              style={[styles.gridBtn, duration === dur && styles.gridBtnActive]}
              onPress={() => setDuration(dur)}
              activeOpacity={0.8}
            >
              <Text style={[styles.gridText, duration === dur && styles.gridTextActive]}>{dur}m</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <Card style={styles.summaryCard}>
        <CardHeader title="Booking Summary" subtitle={mentorName ? `Mentor: ${mentorName}` : "Mentor selected"} />
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Slot Type</Text>
          <Text style={styles.summaryValue}>{slotType}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Schedule</Text>
          <Text style={styles.summaryValue}>{selectedDate} • {selectedTime}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Availability</Text>
          <Text style={[styles.summaryValue, !slotAvailable && styles.errorText]}>
            {slotAvailable ? "Available" : "Unavailable"}
          </Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Total</Text>
          <Text style={styles.totalValue}>${totalCost.toFixed(2)}</Text>
        </View>
      </Card>

      <View style={styles.section}>
        {bookingStatus === "idle" && <Button title="Confirm Booking" onPress={handleConfirmBooking} />}

        {bookingStatus === "insufficient" && (
          <>
            <Card style={styles.warnCard}>
              <Text style={styles.warnTitle}>Insufficient Balance</Text>
              <Text style={styles.warnText}>Add funds from wallet or quick top-up to continue.</Text>
            </Card>
            <Button title="Go to Wallet" variant="outline" onPress={() => router.push("/(parent)/wallet" as any)} />
            <Button title="Quick Add Funds (+$120)" style={styles.inlineGap} onPress={handleAddFunds} />
          </>
        )}

        {bookingStatus === "failed" && (
          <>
            <Card style={styles.warnCard}>
              <Text style={styles.warnTitle}>Payment Failed</Text>
              <Text style={styles.warnText}>Retry payment or cancel this booking.</Text>
            </Card>
            <Button title="Retry Payment" onPress={handleConfirmBooking} />
            <Button
              title="Cancel Booking"
              variant="outline"
              style={styles.inlineGap}
              onPress={() => setBookingStatus("cancelled")}
            />
          </>
        )}

        {bookingStatus === "success" && (
          <Card style={styles.successCard}>
            <Text style={styles.successTitle}>Booking Confirmed</Text>
            <Text style={styles.successText}>Session reminder and join links will appear in schedule.</Text>
          </Card>
        )}

        {bookingStatus === "cancelled" && (
          <Card style={styles.warnCard}>
            <Text style={styles.warnTitle}>Booking Cancelled</Text>
            <Text style={styles.warnText}>You can return to discovery and choose another slot.</Text>
          </Card>
        )}
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
  },
  walletText: {
    ...TYPOGRAPHY.caption,
    color: "rgba(255, 255, 255, 0.9)",
    marginTop: SPACING.sm,
    fontWeight: "700",
  },
  section: {
    paddingHorizontal: SPACING.base,
    marginTop: SPACING.lg,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.dark,
    marginBottom: SPACING.base,
  },
  row: {
    flexDirection: "row",
    gap: SPACING.sm,
  },
  choiceBtn: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.gray300,
    borderRadius: 10,
    alignItems: "center",
    paddingVertical: SPACING.sm,
  },
  choiceBtnActive: {
    borderColor: COLORS.primary,
    backgroundColor: "#e0e7ff",
  },
  choiceText: {
    ...TYPOGRAPHY.label,
    color: COLORS.gray700,
  },
  choiceTextActive: {
    color: COLORS.primaryDark,
    fontWeight: "700",
  },
  pill: {
    marginRight: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.gray300,
    backgroundColor: COLORS.white,
    borderRadius: 999,
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.xs,
  },
  pillActive: {
    borderColor: COLORS.primary,
    backgroundColor: "#e0e7ff",
  },
  pillText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray700,
  },
  pillTextActive: {
    color: COLORS.primaryDark,
    fontWeight: "700",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.sm,
  },
  gridBtn: {
    width: "30%",
    borderWidth: 1,
    borderColor: COLORS.gray300,
    borderRadius: 10,
    alignItems: "center",
    paddingVertical: SPACING.sm,
    backgroundColor: COLORS.white,
  },
  gridBtnActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
  },
  gridText: {
    ...TYPOGRAPHY.label,
    color: COLORS.gray700,
  },
  gridTextActive: {
    color: COLORS.white,
    fontWeight: "700",
  },
  summaryCard: {
    marginHorizontal: SPACING.base,
    marginTop: SPACING.lg,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: SPACING.xs,
  },
  summaryLabel: {
    ...TYPOGRAPHY.body,
    color: COLORS.gray600,
  },
  summaryValue: {
    ...TYPOGRAPHY.body,
    color: COLORS.dark,
    fontWeight: "600",
  },
  totalValue: {
    ...TYPOGRAPHY.bodyLarge,
    color: COLORS.primaryDark,
    fontWeight: "700",
  },
  errorText: {
    color: COLORS.error,
  },
  warnCard: {
    borderWidth: 1,
    borderColor: "#fde68a",
    backgroundColor: "#fffbeb",
  },
  warnTitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.dark,
    fontWeight: "700",
  },
  warnText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray700,
    marginTop: SPACING.xs,
  },
  inlineGap: {
    marginTop: SPACING.sm,
  },
  successCard: {
    borderWidth: 1,
    borderColor: "#86efac",
    backgroundColor: "#ecfdf5",
  },
  successTitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.success,
    fontWeight: "700",
  },
  successText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray700,
    marginTop: SPACING.xs,
  },
});
