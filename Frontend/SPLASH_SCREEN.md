/**
 * SPLASH SCREEN DOCUMENTATION
 * 
 * Purpose
 * -------
 * The splash screen is the first screen users see when launching the app.
 * It serves as an initialization point where the app:
 * - Displays branding and logo
 * - Shows a loading indicator while initializing
 * - Checks user authentication status
 * - Routes users to appropriate screens based on session state
 * 
 * 
 * Features
 * --------
 * 1. Visual Branding
 *    - Animated logo entrance with spring animation
 *    - Mentora branding with colored tagline
 *    - Professional purple/indigo color scheme
 *    - Bottom accent bar with secondary color
 * 
 * 2. Session Initialization
 *    - 2.5-second initialization period
 *    - Checks if user is authenticated
 *    - Loads user profile data
 *    - Retrieves user role
 * 
 * 3. Smart Navigation
 *    After session check completes, routes users to:
 *    - Login Screen: If not authenticated
 *    - Student Dashboard: If user role is "student"
 *    - Mentor Dashboard: If user role is "mentor"
 *    - Parent Dashboard: If user role is "parent"
 * 
 * 4. Error Handling
 *    - Catches auth check errors
 *    - Falls back to login screen on error
 *    - Logs errors to console for debugging
 * 
 * 
 * Component Structure
 * -------------------
 * File: src/features/splash/screens/SplashScreen.tsx
 * Route: app/auth/splash.tsx (page entry)
 * 
 * Props: None - splash screen is autonomous
 * 
 * Returns: JSX.Element
 * 
 * 
 * Usage
 * -----
 * The splash screen is automatically loaded as the first route in the app.
 * It's defined in app/auth/splash.tsx which renders the SplashScreen component.
 * 
 * Router flow:
 * app/_layout.tsx (root) 
 *   → app/auth/_layout.tsx (auth stack)
 *     → app/auth/splash.tsx (FIRST SCREEN)
 *       → (checks auth)
 *         → login.tsx OR (student)/dashboard.tsx OR (mentor)/dashboard.tsx OR (parent)/dashboard.tsx
 * 
 * 
 * Integration with Services
 * -------------------------
 * The splash screen should integrate with authService:
 * 
 * import { isAuthenticated, getCurrentUser } from "@/services/authService";
 * 
 * const checkAuthAndNavigate = async () => {
 *   try {
 *     const authenticated = await isAuthenticated();
 *     if (authenticated) {
 *       const user = await getCurrentUser();
 *       routeByRole(user.role);
 *     } else {
 *       router.replace("../login" as any);
 *     }
 *   } catch (error) {
 *     console.error("Auth check failed:", error);
 *     router.replace("../login" as any);
 *   }
 * };
 * 
 * 
 * Styling Reference
 * -----------------
 * Colors:
 * - Primary (background): #6366f1 (Indigo)
 * - Secondary (accent): #ec4899 (Pink)
 * - White (text): #ffffff
 * - Semi-transparent white (overlay text): rgba(255, 255, 255, 0.7-0.85)
 * 
 * Spacing:
 * - Logo bottom margin: 16px
 * - Logo container bottom margin: 40px
 * - Between elements: 16-24px
 * 
 * Animation:
 * - Duration: 200ms delay + spring animation
 * - Scale: 0 → 1 (entrance)
 * - Bounciness: 8 (natural spring feel)
 * 
 * Total screen time: 2.5 seconds
 * - 0.2s: Logo animation delay
 * - ~0.4s: Logo spring animation
 * - 1.9s: Remaining wait time for session check
 * 
 * 
 * Customization
 * ---------------
 * To customize the splash screen:
 * 
 * 1. Modify colors in styles (container background, text colors)
 * 2. Change logo/emoji at line: <Text style={styles.logo}>🎓</Text>
 * 3. Adjust animation timing: logoScale animation parameters
 * 4. Change total display time: setTimeout value (currently 2500ms)
 * 5. Update tagline text: "Connect with Industry Leaders"
 * 6. Modify loader appearance: ActivityIndicator size and color
 * 
 * 
 * Testing
 * -------
 * To test the splash screen:
 * 
 * 1. Clear app data/cache to simulate fresh install
 * 2. Launch app and observe:
 *    - Logo animation entrance
 *    - Loading indicator animation
 *    - 2.5-second wait
 *    - Navigation to appropriate screen
 * 
 * 3. Test authenticated user:
 *    - Login to create session
 *    - Kill and relaunch app
 *    - Should navigate directly to dashboard
 * 
 * 4. Test non-authenticated user:
 *    - Launch app without logging in
 *    - Should navigate to login screen
 * 
 * 5. Test error state:
 *    - Disable network and launch
 *    - Should fall back to login screen
 */
