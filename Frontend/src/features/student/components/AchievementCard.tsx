import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Card } from "@/shared/components";
import { COLORS, SPACING, TYPOGRAPHY } from "@/shared/theme";

interface AchievementCardProps {
  id: string;
  title: string;
  description: string;
  icon: string;
  rarity: "common" | "rare" | "epic";
  earnedDate: string;
  isPreview?: boolean;
}

export function AchievementCard({
  id,
  title,
  description,
  icon,
  rarity,
  earnedDate,
  isPreview = false,
}: AchievementCardProps) {
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "epic":
        return COLORS.warning;
      case "rare":
        return COLORS.info;
      case "common":
        return COLORS.gray500;
      default:
        return COLORS.gray400;
    }
  };

  const getRarityLabel = (rarity: string) => {
    switch (rarity) {
      case "epic":
        return "EPIC";
      case "rare":
        return "RARE";
      case "common":
        return "COMMON";
      default:
        return "UNKNOWN";
    }
  };

  return (
    <Card style={styles.card}>
      <View style={styles.content}>
        <View style={styles.iconAndRarity}>
          <Text style={styles.icon}>{icon}</Text>
          <View
            style={[
              styles.rarityBadge,
              { borderColor: getRarityColor(rarity) },
            ]}
          >
            <Text
              style={[
                styles.rarityText,
                { color: getRarityColor(rarity) },
              ]}
            >
              {getRarityLabel(rarity)}
            </Text>
          </View>
        </View>
        <View style={styles.textContent}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description} numberOfLines={1}>
            {description}
          </Text>
          <Text style={styles.earnedDate}>Earned {earnedDate}</Text>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.base,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.base,
  },
  iconAndRarity: {
    alignItems: "center",
    gap: SPACING.xs,
  },
  icon: {
    fontSize: 32,
  },
  rarityBadge: {
    paddingHorizontal: SPACING.xs,
    paddingVertical: 2,
    borderWidth: 1,
    borderRadius: 4,
  },
  rarityText: {
    ...TYPOGRAPHY.caption,
    fontSize: 10,
    fontWeight: "700",
  },
  textContent: {
    flex: 1,
  },
  title: {
    ...TYPOGRAPHY.bodyLarge,
    color: COLORS.dark,
    fontWeight: "600",
    marginBottom: SPACING.xs,
  },
  description: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.gray600,
    marginBottom: SPACING.xs,
  },
  earnedDate: {
    ...TYPOGRAPHY.caption,
    color: COLORS.gray500,
  },
});
