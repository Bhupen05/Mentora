import React, { useState } from "react";
import {
  Alert,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { COLORS, SPACING, TYPOGRAPHY } from "@/shared/theme";
import { Card, CardHeader, Button } from "@/shared/components";
import { useLocalSearchParams, useRouter } from "expo-router";

type SlotType = "individual" | "group";
type BookingStatus = "idle" | "insufficient" | "failed" | "success" | "cancelled";

export function BookingScreen() {
  const router = useRouter();
  const { mentorId, mentorName, rate } = useLocalSearchParams<{
    mentorId?: string;
    mentorName?: string;
    rate?: string;
  }>();

  const parsedRate = Number(rate ?? "50") || 50;
  const [selectedDate, setSelectedDate] = useState("2024-03-20");
  const [selectedTime, setSelectedTime] = useState("14:00");
  const [duration, setDuration] = useState(60);
  const [slotType, setSlotType] = useState<SlotType>("individual");
  const [walletBalance, setWalletBalance] = useState(40);
  const [bookingStatus, setBookingStatus] = useState<BookingStatus>("idle");
  const [retryCount, setRetryCount] = useState(0);

  const upcomingDates = ["2024-03-20", "2024-03-21", "2024-03-22", "2024-03-23"];
  const timeSlots = ["10:00", "11:00", "14:00", "15:00", "16:00"];
  const durations = [30, 45, 60, 90, 120];
  const totalCostNumber = Number(((duration / 60) * parsedRate).toFixed(2));
  const totalCost = totalCostNumber.toFixed(2);
  const slotAvailable = !(selectedDate === "2024-03-23" && selectedTime === "16:00");

  const handleConfirmBooking = () => {
    if (!slotAvailable) {
      Alert.alert("Slot Unavailable", "Please choose another slot.");
      return;
    }

    if (walletBalance < totalCostNumber) {
      setBookingStatus("insufficient");
      return;
    }

    if (retryCount === 0) {
      setBookingStatus("failed");
      setRetryCount((count) => count + 1);
      return;
    }

    setWalletBalance((balance) => Number((balance - totalCostNumber).toFixed(2)));
    setBookingStatus("success");
  };

  const handleAddFunds = () => {
    setWalletBalance((balance) => balance + 100);
    setBookingStatus("idle");
  };

  const handleRetryPayment = () => {
    handleConfirmBooking();
  };

  const handleCancelBooking = () => {
    setBookingStatus("cancelled");
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Book a Lesson</Text>
        <Text style={styles.subtitle}>Select date, time, and duration</Text>
        <View style={styles.selectionPill}>
          <Text style={styles.selectionPillText}>{selectedDate} • {selectedTime} • {duration}m • {slotType}</Text>
        </View>
        <Text style={styles.walletText}>Wallet: ${walletBalance.toFixed(2)}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Slot Type</Text>
        <View style={styles.slotTypeRow}>
          <TouchableOpacity
            style={[styles.slotTypeButton, slotType === "individual" && styles.slotTypeButtonActive]}
            onPress={() => setSlotType("individual")}
            activeOpacity={0.8}
          >
            <Text style={[styles.slotTypeButtonText, slotType === "individual" && styles.slotTypeButtonTextActive]}>
              Individual
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.slotTypeButton, slotType === "group" && styles.slotTypeButtonActive]}
            onPress={() => setSlotType("group")}
            activeOpacity={0.8}
          >
            <Text style={[styles.slotTypeButtonText, slotType === "group" && styles.slotTypeButtonTextActive]}>
              Group
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Date Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📅 Select Date</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.dateScroll}
        >
          {upcomingDates.map((date) => (
            <TouchableOpacity
              key={date}
              style={[
                styles.dateButton,
                selectedDate === date && styles.dateButtonActive,
              ]}
              onPress={() => setSelectedDate(date)}
            >
              <Text
                style={[
                  styles.dateButtonText,
                  selectedDate === date && styles.dateButtonTextActive,
                ]}
              >
                {new Date(date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Time Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>⏰ Select Time</Text>
        <View style={styles.timeGrid}>
          {timeSlots.map((time) => (
            <TouchableOpacity
              key={time}
              style={[
                styles.timeButton,
                selectedTime === time && styles.timeButtonActive,
              ]}
              onPress={() => setSelectedTime(time)}
            >
              <Text
                style={[
                  styles.timeButtonText,
                  selectedTime === time && styles.timeButtonTextActive,
                ]}
              >
                {time}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Duration Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>⏱️ Select Duration</Text>
        <View style={styles.durationGrid}>
          {durations.map((dur) => (
            <TouchableOpacity
              key={dur}
              style={[
                styles.durationButton,
                duration === dur && styles.durationButtonActive,
              ]}
              onPress={() => setDuration(dur)}
            >
              <Text
                style={[
                  styles.durationButtonText,
                  duration === dur && styles.durationButtonTextActive,
                ]}
              >
                {dur}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Summary */}
      <Card style={styles.summaryCard}>
        <CardHeader title="Booking Summary" subtitle={mentorName ? `Mentor: ${mentorName}` : "Mentor selected"} />
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Date:</Text>
          <Text style={styles.summaryValue}>{selectedDate}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Time:</Text>
          <Text style={styles.summaryValue}>{selectedTime}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Duration:</Text>
          <Text style={styles.summaryValue}>{duration} minutes</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Slot:</Text>
          <Text style={styles.summaryValue}>{slotType === "individual" ? "Individual" : "Group"}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Availability:</Text>
          <Text style={[styles.summaryValue, !slotAvailable && styles.unavailableText]}>
            {slotAvailable ? "Available" : "Unavailable"}
          </Text>
        </View>
        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={styles.summaryLabel}>Total Cost:</Text>
          <Text style={styles.totalValue}>${totalCost}</Text>
        </View>
      </Card>

      {/* CTA Buttons */}
      <View style={styles.buttonSection}>
        {bookingStatus === "idle" && (
          <Button title="Confirm Booking" onPress={handleConfirmBooking} />
        )}

        {bookingStatus === "insufficient" && (
          <>
            <Card style={styles.statusCard}>
              <Text style={styles.statusTitle}>Insufficient wallet balance</Text>
              <Text style={styles.statusText}>Add funds to continue with this booking.</Text>
            </Card>
            <Button title="Add Funds (+$100)" onPress={handleAddFunds} />
          </>
        )}

        {bookingStatus === "failed" && (
          <>
            <Card style={styles.statusCard}>
              <Text style={styles.statusTitle}>Payment failed</Text>
              <Text style={styles.statusText}>Retry payment or cancel this booking.</Text>
            </Card>
            <Button title="Retry Payment" onPress={handleRetryPayment} />
            <Button title="Cancel Booking" variant="outline" style={styles.actionGap} onPress={handleCancelBooking} />
          </>
        )}

        {bookingStatus === "success" && (
          <>
            <Card style={styles.statusCardSuccess}>
              <Text style={styles.statusTitleSuccess}>Booking confirmed</Text>
              <Text style={styles.statusTextSuccess}>Session reminder will be shown before start time.</Text>
            </Card>
            <Button title="Go to My Lessons" onPress={() => router.push("/(student)/lessons" as any)} />
          </>
        )}

        {bookingStatus === "cancelled" && (
          <Card style={styles.statusCard}>
            <Text style={styles.statusTitle}>Booking cancelled</Text>
            <Text style={styles.statusText}>You can choose a different slot anytime.</Text>
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
  header: {
    paddingHorizontal: SPACING.base,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.lg,
    backgroundColor: COLORS.primaryDark,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  title: {
    ...TYPOGRAPHY.h2,
    color: COLORS.white,
  },
  subtitle: {
    ...TYPOGRAPHY.body,
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: SPACING.sm,
  },
  selectionPill: {
    alignSelf: "flex-start",
    marginTop: SPACING.base,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 999,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.35)",
  },
  selectionPillText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.white,
    fontWeight: "700",
  },
  walletText: {
    ...TYPOGRAPHY.caption,
    color: "rgba(255, 255, 255, 0.9)",
    marginTop: SPACING.sm,
    fontWeight: "700",
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
  dateScroll: {
    marginHorizontal: -SPACING.base,
    paddingHorizontal: SPACING.base,
  },
  dateButton: {
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.base,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.gray300,
    marginRight: SPACING.sm,
  },
  slotTypeRow: {
    flexDirection: "row",
    gap: SPACING.sm,
  },
  slotTypeButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.gray300,
    borderRadius: 10,
    paddingVertical: SPACING.sm,
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
  slotTypeButtonActive: {
    borderColor: COLORS.primary,
    backgroundColor: "#e0e7ff",
  },
  slotTypeButtonText: {
    ...TYPOGRAPHY.label,
    color: COLORS.gray700,
    fontWeight: "600",
  },
  slotTypeButtonTextActive: {
    color: COLORS.primaryDark,
  },
  dateButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  dateButtonText: {
    ...TYPOGRAPHY.label,
    color: COLORS.gray600,
  },
  dateButtonTextActive: {
    color: COLORS.white,
  },
  timeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.sm,
  },
  timeButton: {
    flex: 0.3,
    paddingVertical: SPACING.base,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.gray300,
    alignItems: "center",
  },
  timeButtonActive: {
    backgroundColor: COLORS.secondary,
    borderColor: COLORS.secondary,
  },
  timeButtonText: {
    ...TYPOGRAPHY.label,
    color: COLORS.gray600,
  },
  timeButtonTextActive: {
    color: COLORS.white,
  },
  durationGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.sm,
  },
  durationButton: {
    flex: 0.3,
    paddingVertical: SPACING.base,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.gray300,
    alignItems: "center",
  },
  durationButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  durationButtonText: {
    ...TYPOGRAPHY.label,
    color: COLORS.gray600,
  },
  durationButtonTextActive: {
    color: COLORS.white,
  },
  summaryCard: {
    marginHorizontal: SPACING.base,
    marginVertical: SPACING.base,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: SPACING.sm,
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
  unavailableText: {
    color: COLORS.error,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: COLORS.gray300,
    paddingTop: SPACING.base,
    marginTop: SPACING.base,
  },
  totalValue: {
    ...TYPOGRAPHY.h3,
    color: COLORS.primary,
  },
  buttonSection: {
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.xl,
    gap: SPACING.base,
  },
  actionGap: {
    marginTop: SPACING.xs,
  },
  statusCard: {
    borderWidth: 1,
    borderColor: "#fde68a",
    backgroundColor: "#fffbeb",
  },
  statusTitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.dark,
    fontWeight: "700",
  },
  statusText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray700,
    marginTop: SPACING.xs,
  },
  statusCardSuccess: {
    borderWidth: 1,
    borderColor: "#86efac",
    backgroundColor: "#ecfdf5",
  },
  statusTitleSuccess: {
    ...TYPOGRAPHY.body,
    color: COLORS.success,
    fontWeight: "700",
  },
  statusTextSuccess: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray700,
    marginTop: SPACING.xs,
  },
});
