import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { COLORS, SPACING, TYPOGRAPHY } from "../theme";

interface AvatarProps {
  size?: number;
  source?: any;
  name?: string;
  backgroundColor?: string;
}

export function Avatar({
  size = 40,
  source,
  name = "U",
  backgroundColor = COLORS.primary,
}: AvatarProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <View
      style={[
        styles.avatar,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: source ? COLORS.gray200 : backgroundColor,
        },
      ]}
    >
      {source ? (
        <Image
          source={source}
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
          }}
        />
      ) : (
        <Text
          style={[
            styles.initials,
            {
              fontSize: size / 2.5,
              color: COLORS.white,
            },
          ]}
        >
          {initials}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  initials: {
    fontWeight: "600",
  },
});
