import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { Badge, Card } from "@/shared/components";
import { COLORS, SPACING, TYPOGRAPHY } from "@/shared/theme";
import { FileText, Link2, Download, Bookmark, Trash2, ArrowLeft } from "lucide-react-native";

interface Resource {
  id: string;
  title: string;
  type: "document" | "link" | "video" | "code";
  subject: string;
  sharedBy: string;
  dateShared: string;
  saved: boolean;
  fileSize?: string;
  url?: string;
}

export function StudentResourcesScreen() {
  const router = useRouter();
  const [resources, setResources] = useState<Resource[]>([
    {
      id: "r1",
      title: "React Hooks Deep Dive - Complete Guide",
      type: "document",
      subject: "React",
      sharedBy: "Sarah Chen",
      dateShared: "3 days ago",
      saved: true,
      fileSize: "2.4 MB",
    },
    {
      id: "r2",
      title: "JavaScript ES6+ Cheat Sheet",
      type: "document",
      subject: "JavaScript",
      sharedBy: "James Rodriguez",
      dateShared: "1 week ago",
      saved: true,
      fileSize: "1.2 MB",
    },
    {
      id: "r3",
      title: "Build a Real-world React App",
      type: "link",
      subject: "React",
      sharedBy: "Sarah Chen",
      dateShared: "5 days ago",
      saved: false,
      url: "https://example.com/react-project",
    },
    {
      id: "r4",
      title: "TypeScript Best Practices",
      type: "video",
      subject: "TypeScript",
      sharedBy: "Michael Park",
      dateShared: "2 days ago",
      saved: true,
    },
    {
      id: "r5",
      title: "Interview Prep Code Snippets",
      type: "code",
      subject: "JavaScript",
      sharedBy: "Emily Watson",
      dateShared: "1 day ago",
      saved: false,
    },
  ]);

  const [selectedFilter, setSelectedFilter] = useState<"all" | "saved">("all");
  const [selectedType, setSelectedType] = useState<"all" | "document" | "link" | "video" | "code">("all");

  const filteredResources = resources.filter((res) => {
    if (selectedFilter === "saved" && !res.saved) return false;
    if (selectedType !== "all" && res.type !== selectedType) return false;
    return true;
  });

  const toggleSave = (id: string) => {
    setResources((prev) =>
      prev.map((res) => (res.id === id ? { ...res, saved: !res.saved } : res))
    );
  };

  const deleteResource = (id: string) => {
    setResources((prev) => prev.filter((res) => res.id !== id));
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "document":
        return COLORS.info;
      case "link":
        return COLORS.primary;
      case "video":
        return COLORS.warning;
      case "code":
        return COLORS.success;
      default:
        return COLORS.gray500;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "document":
        return FileText;
      case "link":
        return Link2;
      case "video":
        return FileText;
      case "code":
        return FileText;
      default:
        return FileText;
    }
  };

  const getTypeLabel = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Back Button Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push("/(student)/lessons")}
        >
          <ArrowLeft size={24} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Resources</Text>
        <View style={styles.backButtonPlaceholder} />
      </View>

      <View style={styles.heroSection}>
        <Text style={styles.heroTitle}>Learning Resources</Text>
        <Text style={styles.heroSubtitle}>Access materials shared by mentors</Text>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <Card style={styles.statBox}>
          <Text style={styles.statLabel}>Total</Text>
          <Text style={styles.statValue}>{resources.length}</Text>
        </Card>
        <Card style={styles.statBox}>
          <Text style={styles.statLabel}>Saved</Text>
          <Text style={styles.statValue}>{resources.filter((r) => r.saved).length}</Text>
        </Card>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterSection}>
        <View style={styles.filterGroup}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedFilter === "all" && styles.filterButtonActive,
            ]}
            onPress={() => setSelectedFilter("all")}
          >
            <Text
              style={[
                styles.filterButtonText,
                selectedFilter === "all" && styles.filterButtonTextActive,
              ]}
            >
              All Resources
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedFilter === "saved" && styles.filterButtonActive,
            ]}
            onPress={() => setSelectedFilter("saved")}
          >
            <Text
              style={[
                styles.filterButtonText,
                selectedFilter === "saved" && styles.filterButtonTextActive,
              ]}
            >
              Saved
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.typeFilterScroll}
        >
          {["all", "document", "link", "video", "code"].map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.typeFilter,
                selectedType === type && styles.typeFilterActive,
              ]}
              onPress={() => setSelectedType(type as any)}
            >
              <Text
                style={[
                  styles.typeFilterText,
                  selectedType === type && styles.typeFilterTextActive,
                ]}
              >
                {type === "all" ? "All Types" : getTypeLabel(type)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Resources List */}
      <View style={styles.section}>
        {filteredResources.map((resource) => {
          const TypeIcon = getTypeIcon(resource.type);
          return (
            <Card key={resource.id} style={styles.resourceCard}>
              <View style={styles.resourceHeader}>
                <View
                  style={[
                    styles.typeIconBox,
                    { backgroundColor: getTypeColor(resource.type) },
                  ]}
                >
                  <TypeIcon size={20} color={COLORS.white} />
                </View>
                <View style={styles.resourceInfo}>
                  <Text style={styles.resourceTitle} numberOfLines={2}>
                    {resource.title}
                  </Text>
                  <View style={styles.resourceMeta}>
                    <Badge
                      label={getTypeLabel(resource.type)}
                      variant="secondary"
                      backgroundColor={getTypeColor(resource.type)}
                      textColor={COLORS.white}
                    />
                    <Text style={styles.subject}>{resource.subject}</Text>
                  </View>
                </View>
                <TouchableOpacity onPress={() => toggleSave(resource.id)}>
                  <Bookmark
                    size={20}
                    color={COLORS.primary}
                    fill={resource.saved ? COLORS.primary : "none"}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.resourceDetails}>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Shared by</Text>
                  <Text style={styles.detailValue}>{resource.sharedBy}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Date</Text>
                  <Text style={styles.detailValue}>{resource.dateShared}</Text>
                </View>
                {resource.fileSize && (
                  <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Size</Text>
                    <Text style={styles.detailValue}>{resource.fileSize}</Text>
                  </View>
                )}
              </View>

              <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.actionButton}>
                  <Download size={16} color={COLORS.primary} />
                  <Text style={styles.actionButtonText}>Download</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => deleteResource(resource.id)}
                >
                  <Trash2 size={16} color={COLORS.error} />
                </TouchableOpacity>
              </View>
            </Card>
          );
        })}
      </View>

      {filteredResources.length === 0 && (
        <View style={styles.emptyState}>
          <FileText size={48} color={COLORS.gray300} style={styles.emptyIcon} />
          <Text style={styles.emptyTitle}>No resources found</Text>
          <Text style={styles.emptySubtitle}>
            {selectedFilter === "saved"
              ? "Save resources from your mentors to see them here"
              : "Your mentors will share learning materials here"}
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    paddingBottom: 120,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.base,
    paddingVertical: SPACING.lg,
    backgroundColor: COLORS.success,
  },
  backButton: {
    padding: SPACING.sm,
  },
  headerTitle: {
    ...TYPOGRAPHY.h2,
    color: COLORS.white,
    flex: 1,
    textAlign: "center",
  },
  backButtonPlaceholder: {
    width: 40,
  },
  heroSection: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.success,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  heroTitle: {
    ...TYPOGRAPHY.h1,
    color: COLORS.white,
    marginBottom: SPACING.xs,
  },
  heroSubtitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.white,
    opacity: 0.9,
  },
  statsRow: {
    flexDirection: "row",
    paddingHorizontal: SPACING.md,
    marginTop: -SPACING.md,
    marginBottom: SPACING.md,
    gap: SPACING.md,
  },
  statBox: {
    flex: 1,
    padding: SPACING.md,
    alignItems: "center",
  },
  statLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray600,
    marginBottom: SPACING.xs,
  },
  statValue: {
    ...TYPOGRAPHY.h2,
    color: COLORS.dark,
  },
  filterSection: {
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.md,
    gap: SPACING.md,
  },
  filterGroup: {
    flexDirection: "row",
    gap: SPACING.sm,
  },
  filterButton: {
    flex: 1,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.gray300,
    alignItems: "center",
  },
  filterButtonActive: {
    backgroundColor: COLORS.success,
    borderColor: COLORS.success,
  },
  filterButtonText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray600,
  },
  filterButtonTextActive: {
    color: COLORS.white,
  },
  typeFilterScroll: {
    marginHorizontal: -SPACING.md,
    paddingHorizontal: SPACING.md,
  },
  typeFilter: {
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.md,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.gray300,
    marginRight: SPACING.sm,
  },
  typeFilterActive: {
    backgroundColor: COLORS.success,
    borderColor: COLORS.success,
  },
  typeFilterText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray600,
  },
  typeFilterTextActive: {
    color: COLORS.white,
  },
  section: {
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.lg,
  },
  resourceCard: {
    marginBottom: SPACING.md,
    padding: SPACING.md,
  },
  resourceHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
    marginBottom: SPACING.md,
  },
  typeIconBox: {
    width: 44,
    height: 44,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  resourceInfo: {
    flex: 1,
  },
  resourceTitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.dark,
    fontWeight: "600",
    marginBottom: SPACING.xs,
  },
  resourceMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
  },
  subject: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray600,
    paddingHorizontal: SPACING.sm,
  },
  resourceDetails: {
    flexDirection: "row",
    gap: SPACING.md,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.sm,
    backgroundColor: COLORS.gray100,
    borderRadius: 8,
    marginBottom: SPACING.md,
  },
  detailItem: {
    flex: 1,
  },
  detailLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray600,
    marginBottom: SPACING.xs,
  },
  detailValue: {
    ...TYPOGRAPHY.body,
    color: COLORS.dark,
    fontWeight: "600",
  },
  actionButtons: {
    flexDirection: "row",
    gap: SPACING.sm,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    backgroundColor: COLORS.gray100,
    borderRadius: 8,
    gap: SPACING.xs,
  },
  actionButtonText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.primary,
    fontWeight: "600",
  },
  deleteButton: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    backgroundColor: COLORS.gray100,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyState: {
    padding: SPACING.lg,
    alignItems: "center",
    justifyContent: "center",
    marginTop: SPACING.lg,
  },
  emptyIcon: {
    marginBottom: SPACING.md,
  },
  emptyTitle: {
    ...TYPOGRAPHY.h2,
    color: COLORS.dark,
    marginBottom: SPACING.xs,
  },
  emptySubtitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.gray600,
    textAlign: "center",
  },
});
