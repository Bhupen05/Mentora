import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  User,
  Coffee,
  Plus,
} from "lucide-react-native";

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

type SlotType = "available" | "booked" | "break" | "unavailable";

interface TimeSlot {
  start: string;
  end: string;
  type: SlotType;
  student?: string;
  subject?: string;
}

const COLORS = {
  bg: "#F8FAFC",
  card: "#FFFFFF",
  text: "#0F172A",
  sub: "#64748B",
  border: "#E2E8F0",
  primary: "#2563EB",
  primaryDark: "#1e40af",
  success: "#22C55E",
  warning: "#F59E0B",
  muted: "#94A3B8",
};

const FONT = {
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
} as const;

export function MentorScheduleScreen() {
  const [date, setDate] = useState(new Date());
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const week = useMemo(() => {
    const start = new Date(date);
    start.setDate(date.getDate() - date.getDay());

    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return d;
    });
  }, [date]);

  const slots: TimeSlot[] = [
    { start: "9:00 AM", end: "10:00 AM", type: "available" },
    {
      start: "10:00 AM",
      end: "11:00 AM",
      type: "booked",
      student: "Emily Wilson",
      subject: "React Basics",
    },
    { start: "11:00 AM", end: "12:00 PM", type: "available" },
    { start: "12:00 PM", end: "1:00 PM", type: "break" },
    {
      start: "1:00 PM",
      end: "2:00 PM",
      type: "booked",
      student: "James Taylor",
      subject: "TypeScript",
    },
    { start: "2:00 PM", end: "3:00 PM", type: "available" },
  ];

  const changeWeek = (dir: number) => {
    const d = new Date(date);
    d.setDate(d.getDate() + dir * 7);
    setDate(d);
  };

  const toggle = (i: number) => {
    LayoutAnimation.easeInEaseOut();
    setOpenIndex(openIndex === i ? null : i);
  };

  const slotStyle = (type: SlotType) => {
    switch (type) {
      case "available":
        return { borderLeftColor: COLORS.primary, bg: "#EFF6FF" };
      case "booked":
        return { borderLeftColor: COLORS.success, bg: "#F0FDF4" };
      case "break":
        return { borderLeftColor: COLORS.warning, bg: "#FFFBEB" };
      default:
        return { borderLeftColor: COLORS.muted, bg: "#F1F5F9" };
    }
  };

  const icon = (type: SlotType) => {
    if (type === "booked") return <User size={16} color={COLORS.success} />;
    if (type === "break") return <Coffee size={16} color={COLORS.warning} />;
    return <Clock size={16} color={COLORS.sub} />;
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => changeWeek(-1)}>
            <ChevronLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>

          <Text style={styles.title}>
            {date.toLocaleString("en-US", { month: "long", year: "numeric" })}
          </Text>

          <TouchableOpacity onPress={() => changeWeek(1)}>
            <ChevronRight size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Week strip */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.week}
        >
          {week.map((d, i) => {
            const active = d.toDateString() === date.toDateString();

            return (
              <TouchableOpacity
                key={i}
                style={[styles.dayCard, active && styles.dayActive]}
                onPress={() => setDate(d)}
              >
                <Text style={[styles.dayLabel, active && styles.dayActiveText]}>
                  {days[d.getDay()]}
                </Text>
                <Text style={[styles.dayNum, active && styles.dayActiveText]}>
                  {d.getDate()}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Slots */}
        <View style={styles.slotContainer}>
          {slots.map((s, i) => {
            const style = slotStyle(s.type);
            const open = openIndex === i;

            return (
              <TouchableOpacity
                key={i}
                style={[
                  styles.slot,
                  { borderLeftColor: style.borderLeftColor, backgroundColor: style.bg },
                ]}
                activeOpacity={0.9}
                onPress={() => toggle(i)}
              >
                <View style={styles.slotHeader}>
                  {icon(s.type)}
                  <Text style={styles.time}>
                    {s.start} – {s.end}
                  </Text>
                </View>

                {s.student && <Text style={styles.student}>{s.student}</Text>}
                {s.subject && <Text style={styles.subject}>{s.subject}</Text>}

                {open && (
                  <View style={styles.actions}>
                    {s.type === "available" && (
                      <TouchableOpacity style={styles.primaryBtn}>
                        <Text style={styles.primaryText}>Book Session</Text>
                      </TouchableOpacity>
                    )}

                    {s.type === "booked" && (
                      <View style={styles.row}>
                        <TouchableOpacity style={styles.secondaryBtn}>
                          <Text style={styles.secondaryText}>Message</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.secondaryBtn}>
                          <Text style={styles.secondaryText}>Reschedule</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity style={styles.fab}>
        <Plus size={22} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: COLORS.primaryDark,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 6,
  },

  title: {
    fontSize: 22,
    fontWeight: FONT.black,
    color: "#FFFFFF",
    letterSpacing: 0.4,
    lineHeight: 28,
  },

  week: {
    paddingLeft: 20,
    marginBottom: 20,
    zIndex: 10,
  },

  dayCard: {
    width: 60,
    height: 70,
    borderRadius: 14,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  dayActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },

  dayLabel: {
    fontSize: 12,
    color: COLORS.sub,
  },

  dayNum: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
  },

  dayActiveText: {
    color: "#FFF",
  },

  slotContainer: {
    paddingHorizontal: 20,
  },

  slot: {
    padding: 16,
    borderRadius: 14,
    borderLeftWidth: 4,
    marginBottom: 12,
  },

  slotHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  time: {
    marginLeft: 8,
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.sub,
  },

  student: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
  },

  subject: {
    fontSize: 13,
    color: COLORS.sub,
  },

  actions: {
    marginTop: 10,
  },

  row: {
    flexDirection: "row",
    gap: 10,
  },

  primaryBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },

  primaryText: {
    color: "#FFF",
    fontWeight: "600",
  },

  secondaryBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },

  secondaryText: {
    fontWeight: "600",
    color: COLORS.text,
  },

  fab: {
    position: "absolute",
    right: 20,
    bottom: 30,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
  },
});