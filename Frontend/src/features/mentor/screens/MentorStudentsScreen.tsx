import React, { useState, useMemo } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  LayoutAnimation,
  Platform,
  UIManager,
  Image,
} from "react-native";
import { Card } from "@/shared/components";
import { COLORS, SPACING, TYPOGRAPHY } from "@/shared/theme";
import {
  Star,
  TrendingUp,
  MessageCircle,
  Phone,
  Clock,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  Mail,
  Calendar,
  Search,
  Award,
} from "lucide-react-native";

const FONT = {
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
} as const;

interface Student {
  id: string;
  name: string;
  subject: string;
  rating: number;
  sessionsCompleted: number;
  progress: number;
  lastSession: string;
  status: "active" | "at-risk" | "completed";
  studentImage: string | null;
}

export function MentorStudentsScreen() {
  const [filter, setFilter] = useState<"all" | "active" | "at-risk">("all");
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  const students: Student[] = [
    {
      id: "1",
      name: "Emily Wilson",
      subject: "React Fundamentals",
      rating: 4.9,
      sessionsCompleted: 12,
      progress: 85,
      lastSession: "Today",
      status: "active",
      studentImage: null,
    },
    {
      id: "2",
      name: "James Taylor",
      subject: "TypeScript",
      rating: 4.7,
      sessionsCompleted: 8,
      progress: 65,
      lastSession: "2 days ago",
      status: "active",
      studentImage: null,
    },
    {
      id: "3",
      name: "Sophia Brown",
      subject: "Interview Prep",
      rating: 4.5,
      sessionsCompleted: 5,
      progress: 45,
      lastSession: "1 week ago",
      status: "at-risk",
      studentImage: null,
    },
    {
      id: "4",
      name: "Liam Johnson",
      subject: "JavaScript ES6",
      rating: 5,
      sessionsCompleted: 15,
      progress: 100,
      lastSession: "Completed",
      status: "completed",
      studentImage: null,
    },
  ];

  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      if (filter !== "all" && s.status !== filter) return false;

      if (
        search &&
        !s.name.toLowerCase().includes(search.toLowerCase()) &&
        !s.subject.toLowerCase().includes(search.toLowerCase())
      )
        return false;

      return true;
    });
  }, [filter, search]);

  const stats = {
    total: students.length,
    active: students.filter((s) => s.status === "active").length,
    rating: (
      students.reduce((sum, s) => sum + s.rating, 0) / students.length
    ).toFixed(1),
  };

  const toggleExpand = (id: string) => {
    LayoutAnimation.easeInEaseOut();
    setExpanded(expanded === id ? null : id);
  };

  const getColor = (status: string) => {
    switch (status) {
      case "active":
        return COLORS.success;
      case "at-risk":
        return COLORS.warning;
      case "completed":
        return COLORS.info;
      default:
        return COLORS.gray500;
    }
  };

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Students</Text>
        <Text style={styles.subtitle}>Mentor dashboard overview</Text>
      </View>

      {/* STATS */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{stats.total}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>

        <View style={styles.statCard}>
          <TrendingUp size={18} color={COLORS.success} />
          <Text style={styles.statNumber}>{stats.active}</Text>
          <Text style={styles.statLabel}>Active</Text>
        </View>

        <View style={styles.statCard}>
          <Star size={18} color={COLORS.warning} />
          <Text style={styles.statNumber}>{stats.rating}</Text>
          <Text style={styles.statLabel}>Rating</Text>
        </View>
      </View>

      {/* SEARCH */}
      <View style={styles.searchBox}>
        <Search size={18} color={COLORS.gray500} />
        <TextInput
          placeholder="Search students..."
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
      </View>

      {/* FILTER */}
      <View style={styles.filters}>
        {["all", "active", "at-risk"].map((f) => (
          <TouchableOpacity
            key={f}
            onPress={() => setFilter(f as any)}
            style={[
              styles.filter,
              filter === f && { backgroundColor: COLORS.primary },
            ]}
          >
            <Text
              style={[
                styles.filterText,
                filter === f && { color: "#fff" },
              ]}
            >
              {f.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* LIST */}
      <View style={styles.list}>
        {filteredStudents.map((student) => {
          const open = expanded === student.id;
          const color = getColor(student.status);

          return (
            <Card key={student.id} style={styles.card}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => toggleExpand(student.id)}
              >
                <View style={styles.row}>
                  <View
                    style={[
                      styles.avatar,
                      { backgroundColor: color + "20" },
                    ]}
                  >
                    {student.studentImage ? (
                      <Image source={{ uri: student.studentImage }} style={styles.avatarImage} />
                    ) : (
                      <Text style={styles.avatarText}>
                        {getInitials(student.name)}
                      </Text>
                    )}
                  </View>

                  <View style={styles.info}>
                    <Text style={styles.name}>{student.name}</Text>
                    <Text style={styles.subject}>{student.subject}</Text>
                  </View>

                  <ChevronDown
                    size={20}
                    color={COLORS.gray600}
                    style={{
                      transform: [{ rotate: open ? "180deg" : "0deg" }],
                    }}
                  />
                </View>
              </TouchableOpacity>

              {/* PROGRESS */}
              <View style={styles.progress}>
                <View style={styles.progressTrack}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${student.progress}%`,
                        backgroundColor: color,
                      },
                    ]}
                  />
                </View>
                <Text style={styles.progressLabel}>
                  {student.progress}% progress
                </Text>
              </View>

              {/* METRICS */}
              <View style={styles.metrics}>
                <View style={styles.metric}>
                  <Star size={14} color={COLORS.warning} />
                  <Text style={styles.metricText}>{student.rating}</Text>
                </View>

                <View style={styles.metric}>
                  <Calendar size={14} color={COLORS.primary} />
                  <Text style={styles.metricText}>
                    {student.sessionsCompleted}
                  </Text>
                </View>

                <View style={styles.metric}>
                  <Clock size={14} color={COLORS.gray600} />
                  <Text style={styles.metricText}>
                    {student.lastSession}
                  </Text>
                </View>
              </View>

              {/* EXPANDED */}
              {open && (
                <View style={styles.actions}>
                  <TouchableOpacity style={styles.actionBtn}>
                    <MessageCircle size={18} color={COLORS.primary} />
                    <Text style={styles.actionText}>Message</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.actionBtn}>
                    <Phone size={18} color={COLORS.success} />
                    <Text style={styles.actionText}>Call</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.actionBtn}>
                    <Mail size={18} color={COLORS.info} />
                    <Text style={styles.actionText}>Email</Text>
                  </TouchableOpacity>
                </View>
              )}
            </Card>
          );
        })}

        {filteredStudents.length === 0 && (
          <View style={styles.empty}>
            <Award size={30} color={COLORS.gray500} />
            <Text style={styles.emptyText}>No students found</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f6f7fb" },

  header: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xl,
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
    ...TYPOGRAPHY.h2,
    color: "#fff",
    fontWeight: FONT.black,
    letterSpacing: 0.4,
    lineHeight: 32,
  },

  subtitle: {
    ...TYPOGRAPHY.body,
    color: "rgba(255, 255, 255, 0.85)",
    marginTop: SPACING.sm,
    fontWeight: FONT.medium,
    letterSpacing: 0.2,
  },

  statsRow: {
    flexDirection: "row",
    paddingHorizontal: SPACING.lg,
    gap: 12,
  },

  statCard: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },

  statNumber: {
    fontSize: 18,
    fontWeight: "800",
  },

  statLabel: {
    fontSize: 11,
    color: COLORS.gray600,
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: SPACING.lg,
    marginTop: 16,
    paddingHorizontal: 12,
    borderRadius: 10,
    zIndex: 10,
  },

  searchInput: {
    flex: 1,
    paddingVertical: 10,
    marginLeft: 8,
  },

  filters: {
    flexDirection: "row",
    paddingHorizontal: SPACING.lg,
    marginTop: 12,
    gap: 8,
    zIndex: 10,
  },

  filter: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: "#fff",
  },

  filterText: {
    fontSize: 12,
    fontWeight: "700",
  },

  list: {
    padding: SPACING.lg,
  },

  card: {
    marginBottom: 14,
    borderRadius: 14,
    padding: 14,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 42,
    height: 42,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    fontWeight: "800",
  },

  avatarImage: {
    width: 42,
    height: 42,
    borderRadius: 10,
  },

  info: {
    flex: 1,
    marginLeft: 10,
  },

  name: {
    fontWeight: "700",
  },

  subject: {
    fontSize: 12,
    color: COLORS.gray600,
  },

  progress: {
    marginTop: 12,
  },

  progressTrack: {
    height: 6,
    backgroundColor: "#eee",
    borderRadius: 3,
  },

  progressFill: {
    height: 6,
    borderRadius: 3,
  },

  progressLabel: {
    fontSize: 11,
    marginTop: 4,
    color: COLORS.gray600,
  },

  metrics: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  metric: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  metricText: {
    fontSize: 12,
    fontWeight: "600",
  },

  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 14,
    borderTopWidth: 1,
    borderColor: "#eee",
    paddingTop: 10,
  },

  actionBtn: {
    alignItems: "center",
  },

  actionText: {
    fontSize: 11,
    marginTop: 4,
  },

  empty: {
    alignItems: "center",
    marginTop: 40,
  },

  emptyText: {
    marginTop: 8,
    color: COLORS.gray600,
  },
});