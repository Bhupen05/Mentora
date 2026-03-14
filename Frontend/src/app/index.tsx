import React, { useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
  Animated,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

const COLORS = {
  primary: "#6366f1",
  secondary: "#ec4899",
  dark: "#1f2937",
  light: "#f9fafb",
  gray: "#6b7280",
  white: "#ffffff",
};

export default function Index() {
  const router = useRouter();
  const logoScale = React.useRef(new Animated.Value(0)).current;
  const fadeIn = React.useRef(new Animated.Value(0)).current;
  const slideUp = React.useRef(new Animated.Value(50)).current;

  useEffect(() => {
    // Animate logo entrance with bounce effect
    Animated.sequence([
      Animated.delay(300),
      Animated.spring(logoScale, {
        toValue: 1,
        useNativeDriver: true,
        bounciness: 10,
      }),
    ]).start();

    // Fade in text content
    Animated.sequence([
      Animated.delay(600),
      Animated.timing(fadeIn, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // Slide up button
    Animated.sequence([
      Animated.delay(900),
      Animated.timing(slideUp, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero Section with Loading Animation */}
      <View style={styles.heroSection}>
        {/* Animated Logo */}
        <Animated.View
          style={[
            styles.logoContainer,
            { transform: [{ scale: logoScale }] },
          ]}
        >
          <Text style={styles.logoEmoji}>🎓</Text>
        </Animated.View>

        <Text style={styles.logoText}>Mentora</Text>

        {/* Animated Text Content */}
        <Animated.View
          style={[
            styles.textContainer,
            { opacity: fadeIn },
          ]}
        >
          <Text style={styles.heroTitle}>Connect with Industry Leaders</Text>
          <Text style={styles.heroSubtitle}>
            Transform your career through personalized mentorship from experienced
            professionals
          </Text>

          {/* Loading Animation */}
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color={COLORS.secondary} />
            <Text style={styles.loadingText}>Preparing your experience...</Text>
          </View>
        </Animated.View>

        {/* Animated Button */}
        <Animated.View
          style={[
            styles.buttonContainer,
            { transform: [{ translateY: slideUp }], opacity: fadeIn },
          ]}
        >
          <TouchableOpacity 
            style={styles.ctaButton}
            onPress={() => router.push("auth/login" as any)}
          >
            <Text style={styles.ctaButtonText}>Get Started</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* Features Section with Images */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Why Choose Mentora?</Text>
        <View style={styles.featuresGrid}>
          <FeatureCardWithImage
            title="Expert Mentors"
            description="Learn from industry professionals"
            icon="👨‍💼"
            color={COLORS.primary}
          />
          <FeatureCardWithImage
            title="Personalized Learning"
            description="Customized guidance for your goals"
            icon="🎯"
            color={COLORS.secondary}
          />
          <FeatureCardWithImage
            title="Real-time Guidance"
            description="Connect via video calls & messaging"
            icon="💬"
            color="#10b981"
          />
          <FeatureCardWithImage
            title="Career Growth"
            description="Track progress and milestones"
            icon="📈"
            color="#f59e0b"
          />
        </View>
      </View>

      {/* How It Works Section with Animated Steps */}
      <View style={[styles.section, styles.alternateSection]}>
        <Text style={styles.sectionTitle}>How It Works</Text>
        <AnimatedStepCard
          number={1}
          title="Create Your Profile"
          description="Tell us about your career goals and interests"
          delay={100}
        />
        <AnimatedStepCard
          number={2}
          title="Browse Mentors"
          description="Explore profiles of experienced mentors"
          delay={200}
        />
        <AnimatedStepCard
          number={3}
          title="Connect & Learn"
          description="Get matched with the perfect mentor"
          delay={300}
        />
        <AnimatedStepCard
          number={4}
          title="Grow Your Career"
          description="Build skills and achieve aspirations"
          delay={400}
        />
      </View>

      {/* Testimonials with Avatar Images */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>What Our Users Say</Text>
        <TestimonialCardWithAvatar
          name="Sarah Chen"
          role="Product Manager"
          text="Mentora helped me transition into tech. My mentor's guidance was invaluable!"
          avatar="👩‍💼"
          color="#ec4899"
        />
        <TestimonialCardWithAvatar
          name="James Rodriguez"
          role="Software Engineer"
          text="The best investment in my career. Found the perfect mentor match immediately."
          avatar="👨‍💻"
          color="#6366f1"
        />
        <TestimonialCardWithAvatar
          name="Emily Watson"
          role="Startup Founder"
          text="Connected with amazing mentors who helped me scale my business."
          avatar="👩‍🎓"
          color="#10b981"
        />
      </View>

      {/* Stats Section with Animated Counters */}
      <View style={styles.statsSection}>
        <AnimatedStatBox number="50K+" label="Active Users" />
        <AnimatedStatBox number="10K+" label="Expert Mentors" />
        <AnimatedStatBox number="100K+" label="Success Matches" />
      </View>

      {/* CTA Section */}
      <View style={styles.ctaSection}>
        <Text style={styles.logoEmojiLarge}>✨</Text>
        <Text style={styles.ctaTitle}>Ready to Start Your Journey?</Text>
        <Text style={styles.ctaDescription}>
          Join Mentora today and accelerate your career growth
        </Text>
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => router.push("auth/register" as any)}
        >
          <Text style={styles.primaryButtonText}>Sign Up Now</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={() => router.push("auth/login" as any)}
        >
          <Text style={styles.secondaryButtonText}>Sign In</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2024 Mentora. All rights reserved.</Text>
        <View style={styles.footerLinks}>
          <Text style={styles.footerLink}>Privacy</Text>
          <Text style={[styles.footerLink, styles.linkDivider]}>•</Text>
          <Text style={styles.footerLink}>Terms</Text>
          <Text style={[styles.footerLink, styles.linkDivider]}>•</Text>
          <Text style={styles.footerLink}>Contact</Text>
        </View>
      </View>
    </ScrollView>
  );
}

// Feature Card with Image
const FeatureCardWithImage = ({ 
  title, 
  description, 
  icon, 
  color 
}: { 
  title: string; 
  description: string; 
  icon: string;
  color: string;
}) => {
  const scaleAnim = React.useRef(new Animated.Value(0.8)).current;

  React.useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      bounciness: 6,
    }).start();
  }, []);

  return (
    <Animated.View 
      style={[
        styles.featureCard, 
        { transform: [{ scale: scaleAnim }] }
      ]}
    >
      <View style={[styles.featureIconBg, { backgroundColor: color }]}>
        <Text style={styles.featureIcon}>{icon}</Text>
      </View>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDescription}>{description}</Text>
    </Animated.View>
  );
};

// Animated Step Card
const AnimatedStepCard = ({ 
  number, 
  title, 
  description, 
  delay 
}: { 
  number: number; 
  title: string; 
  description: string;
  delay: number;
}) => {
  const slideInAnim = React.useRef(new Animated.Value(-50)).current;
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.sequence([
      Animated.delay(delay),
      Animated.parallel([
        Animated.timing(slideInAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  return (
    <Animated.View 
      style={[
        styles.stepCard,
        { 
          transform: [{ translateX: slideInAnim }],
          opacity: fadeAnim,
        },
      ]}
    >
      <View style={styles.stepNumber}>
        <Text style={styles.stepNumberText}>{number}</Text>
      </View>
      <View style={{ flex: 1, marginLeft: 16 }}>
        <Text style={styles.stepTitle}>{title}</Text>
        <Text style={styles.stepDescription}>{description}</Text>
      </View>
    </Animated.View>
  );
};

// Testimonial Card with Avatar
const TestimonialCardWithAvatar = ({ 
  name, 
  role, 
  text, 
  avatar,
  color,
}: { 
  name: string; 
  role: string; 
  text: string;
  avatar: string;
  color: string;
}) => (
  <View style={styles.testimonialCard}>
    <View style={styles.testimonialHeader}>
      <View style={[styles.avatarBox, { backgroundColor: color }]}>
        <Text style={styles.avatar}>{avatar}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.testimonialName}>{name}</Text>
        <Text style={styles.testimonialRole}>{role}</Text>
      </View>
    </View>
    <Text style={styles.testimonialText}>"{text}"</Text>
  </View>
);

// Animated Stat Box
const AnimatedStatBox = ({ number, label }: { number: string; label: string }) => {
  const scaleAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      delay: 500,
      bounciness: 8,
    }).start();
  }, []);

  return (
    <Animated.View 
      style={[
        styles.statBox,
        { transform: [{ scale: scaleAnim }] },
      ]}
    >
      <Text style={styles.statNumber}>{number}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  /* Hero Section */
  heroSection: {
    paddingHorizontal: 24,
    paddingVertical: 80,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    minHeight: height * 0.7,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  logoEmoji: {
    fontSize: 50,
  },
  logoText: {
    fontSize: 32,
    fontWeight: "800",
    color: COLORS.white,
    marginBottom: 16,
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: "700",
    color: COLORS.white,
    textAlign: "center",
    marginBottom: 12,
  },
  heroSubtitle: {
    fontSize: 15,
    color: "rgba(255, 255, 255, 0.85)",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 24,
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 20,
  },
  loadingText: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 13,
    fontWeight: "500",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  ctaButton: {
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 48,
    paddingVertical: 14,
    borderRadius: 50,
    width: "100%",
    alignItems: "center",
  },
  ctaButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "600",
  },
  /* Section Styles */
  section: {
    paddingHorizontal: 24,
    paddingVertical: 48,
  },
  alternateSection: {
    backgroundColor: COLORS.light,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: COLORS.dark,
    marginBottom: 32,
    textAlign: "center",
  },
  /* Features Grid */
  featuresGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 16,
  },
  featureCard: {
    width: (width - 48 - 16) / 2,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  featureIconBg: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  featureIcon: {
    fontSize: 32,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.dark,
    marginBottom: 8,
    textAlign: "center",
  },
  featureDescription: {
    fontSize: 13,
    color: COLORS.gray,
    textAlign: "center",
    lineHeight: 18,
  },
  /* Step Cards */
  stepCard: {
    flexDirection: "row",
    marginBottom: 24,
    alignItems: "flex-start",
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  stepNumber: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.secondary,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  stepNumberText: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: "700",
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.dark,
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 13,
    color: COLORS.gray,
    lineHeight: 20,
  },
  /* Testimonial Cards */
  testimonialCard: {
    backgroundColor: COLORS.light,
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  testimonialHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  avatarBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  avatar: {
    fontSize: 24,
  },
  testimonialText: {
    fontSize: 14,
    color: COLORS.dark,
    fontStyle: "italic",
    lineHeight: 22,
  },
  testimonialName: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.dark,
  },
  testimonialRole: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 2,
  },
  /* Stats Section */
  statsSection: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 24,
    paddingVertical: 48,
    backgroundColor: COLORS.primary,
  },
  statBox: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 32,
    fontWeight: "700",
    color: COLORS.white,
    marginBottom: 6,
  },
  statLabel: {
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.8)",
    fontWeight: "500",
  },
  /* CTA Section */
  ctaSection: {
    paddingHorizontal: 24,
    paddingVertical: 56,
    alignItems: "center",
    backgroundColor: COLORS.light,
  },
  logoEmojiLarge: {
    fontSize: 48,
    marginBottom: 16,
  },
  ctaTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: COLORS.dark,
    marginBottom: 12,
    textAlign: "center",
  },
  ctaDescription: {
    fontSize: 15,
    color: COLORS.gray,
    textAlign: "center",
    marginBottom: 28,
    lineHeight: 22,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 48,
    paddingVertical: 14,
    borderRadius: 50,
    marginBottom: 12,
    width: "100%",
    alignItems: "center",
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  primaryButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButton: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 48,
    paddingVertical: 14,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: COLORS.primary,
    width: "100%",
    alignItems: "center",
  },
  secondaryButtonText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "600",
  },
  /* Footer */
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 32,
    backgroundColor: COLORS.dark,
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.6)",
    marginBottom: 12,
  },
  footerLinks: {
    flexDirection: "row",
    gap: 8,
  },
  footerLink: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.8)",
  },
  linkDivider: {
    color: "rgba(255, 255, 255, 0.4)",
  },
});
