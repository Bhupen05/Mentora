import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { COLORS, SPACING, TYPOGRAPHY } from "@/shared/theme";
import { Card, CardHeader, Button } from "@/shared/components";

export function BookingScreen() {
  const [selectedDate, setSelectedDate] = useState("2024-03-20");
  const [selectedTime, setSelectedTime] = useState("14:00");
  const [duration, setDuration] = useState(60);

  const upcomingDates = ["2024-03-20", "2024-03-21", "2024-03-22", "2024-03-23"];
  const timeSlots = ["10:00", "11:00", "14:00", "15:00", "16:00"];
  const durations = [30, 45, 60, 90, 120];

  const handleConfirmBooking = () => {
    console.log("Booking confirmed", { selectedDate, selectedTime, duration });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Book a Lesson</Text>
        <Text style={styles.subtitle}>Select date, time, and duration</Text>
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
        <CardHeader title="Booking Summary" />
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
        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={styles.summaryLabel}>Total Cost:</Text>
          <Text style={styles.totalValue}>${(duration / 60) * 50}</Text>
        </View>
      </Card>

      {/* CTA Buttons */}
      <View style={styles.buttonSection}>
        <Button title="Confirm Booking" onPress={handleConfirmBooking} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light,
  },
  header: {
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.xl,
    backgroundColor: COLORS.primary,
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
  },
});
