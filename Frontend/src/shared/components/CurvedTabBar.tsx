import React, { useEffect, useMemo, useRef, useState } from "react";
import { Animated, StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS, SPACING } from "@/shared/theme";

// Rebuilt curved tab bar: centers a glowing bump under the active tab and lifts the icon.
const BUMP = 60;
const RADIUS = 22;
const H_PAD = SPACING.xl;
const LIFT = 14;
const LABEL_GAP = 6;

export function CurvedTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const translateX = useRef(new Animated.Value(0)).current;
  const bubbleX = useRef(new Animated.Value(0)).current;
  const [barW, setBarW] = useState(0);

  const tabW = useMemo(
    () => (barW > 0 ? (barW - H_PAD * 2) / state.routes.length : 0),
    [barW, state.routes.length]
  );

  const iconAnims = useRef(
    state.routes.map((_, i) => new Animated.Value(state.index === i ? 1 : 0))
  ).current;

  useEffect(() => {
    iconAnims.forEach((anim, i) => {
      Animated.spring(anim, {
        toValue: state.index === i ? 1 : 0,
        useNativeDriver: true,
        friction: 8,
        tension: 160,
      }).start();
    });
  }, [state.index, iconAnims]);

  useEffect(() => {
    if (tabW === 0) return;

    Animated.spring(translateX, {
      toValue: state.index * tabW,
      useNativeDriver: true,
      damping: 16,
      stiffness: 220,
    }).start();

    Animated.spring(bubbleX, {
      toValue: H_PAD + state.index * tabW + tabW / 2 - BUMP / 2,
      useNativeDriver: true,
      damping: 16,
      stiffness: 220,
    }).start();
  }, [state.index, tabW, translateX, bubbleX]);

  return (
    <View
      style={[styles.wrapper, { paddingBottom: Math.max(insets.bottom, SPACING.md) }]}
      pointerEvents="box-none"
    >
      <View
        style={styles.container}
        onLayout={({ nativeEvent }) => setBarW(nativeEvent.layout.width)}
      >
        <Animated.View
          pointerEvents="none"
          style={[
            styles.bump,
            { transform: [{ translateX: bubbleX }] },
          ]}
        />

        <View style={styles.tabsRow}>
          {state.routes.map((route, index) => {
            const isFocused = state.index === index;
            const { options } = descriptors[route.key];
            const anim = iconAnims[index];
            const label =
              (options.tabBarLabel as string) || options.title || route.name.replace(/^\(|\)$/g, "");

            const onPress = () => {
              const event = navigation.emit({ type: "tabPress", target: route.key, canPreventDefault: true });
              if (!isFocused && !event.defaultPrevented) navigation.navigate(route.name, route.params);
            };

            const onLongPress = () => navigation.emit({ type: "tabLongPress", target: route.key });

            const icon =
              options.tabBarIcon?.({ focused: isFocused, color: isFocused ? COLORS.dark : COLORS.gray300, size: 20 }) ??
              null;

            return (
              <TouchableOpacity
                key={route.key}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                onPress={onPress}
                onLongPress={onLongPress}
                style={styles.tabButton}
                activeOpacity={0.9}
              >
                <Animated.View
                  style={[
                    styles.iconWrapper,
                    isFocused && styles.iconWrapperFocused,
                    {
                      transform: [
                        { translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [0, -LIFT] }) },
                        { scale: anim.interpolate({ inputRange: [0, 1], outputRange: [0.9, 1.08] }) },
                      ],
                    },
                  ]}
                >
                  {icon}
                </Animated.View>
                <Animated.Text
                  numberOfLines={1}
                  style={[
                    styles.label,
                    {
                      opacity: anim,
                      transform: [
                        {
                          translateY: anim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [LABEL_GAP, 0],
                          }),
                        },
                      ],
                    },
                  ]}
                >
                  {label}
                </Animated.Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: SPACING.lg,
    alignItems: "center",
    paddingHorizontal: H_PAD,
  },
  container: {
    width: "100%",
    backgroundColor: "#151515",
    borderRadius: RADIUS,
    paddingHorizontal: H_PAD,
    paddingVertical: SPACING.sm,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 18,
    elevation: 16,
    overflow: "visible",
  },
  bump: {
    position: "absolute",
    top: -BUMP / 2,
    width: BUMP,
    height: BUMP,
    borderRadius: BUMP / 2,
    backgroundColor: "#6BFF38",
    shadowColor: "#6BFF38",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 12,
    elevation: 16,
    zIndex: 2,
  },
  tabsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: SPACING.xs,
  },
  iconWrapper: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrapperFocused: {
    backgroundColor: "transparent",
  },
  label: {
    marginTop: LABEL_GAP / 2,
    fontSize: 11,
    fontWeight: "600",
    color: COLORS.white,
  },
});
