import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, useColorScheme } from 'react-native';
import Animated, {
    Easing,
    useAnimatedStyle,
    useReducedMotion,
    useSharedValue,
    withDelay,
    withRepeat,
    withSequence,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';

/**
 * Lumé animated splash.
 *
 * How the handoff works:
 *  1. The NATIVE splash (app.json) shows the static logo on the brand color.
 *  2. This component mounts with the SAME image, same size, same position, so
 *     when we hide the native splash there is no visible jump.
 *  3. Ripples and twinkles animate around the logo while the app boots.
 *  4. When `ready` is true AND `minDuration` has passed, the logo zooms out
 *     gently, the overlay fades, and `onFinish` fires so you can unmount it.
 */

const LOGO = 240; // MUST match "imageWidth" in the expo-splash-screen plugin config
const K = LOGO / 1024; // scale from the 1024px source art to on-screen size
const CX = 512 * K; // sparkle center inside the logo box
const CY = 365 * K;
const RING = 2 * 165 * 1.55 * K; // matches the thin ring baked into the logo

const SPARK =
    'M12 2C12.8 8 16 11.2 22 12 16 12.8 12.8 16 12 22 11.2 16 8 12.8 2 12 8 11.2 11.2 8 12 2Z';

const THEME = {
    light: {
        bg: '#FFEFE4', // must equal backgroundColor in app.json
        image: require('@/assets/images/splash-icon.png'),
        ripple: '#2B1304',
        twinkle: '#F2A58E',
    },
    dark: {
        bg: '#2B1304', // must equal dark.backgroundColor in app.json
        image: require('@/assets/images/splash-icon-dark.png'),
        ripple: '#FFD9BF',
        twinkle: '#FFB48A',
    },
} as const;

type Props = {
    /** Flip to true when fonts, auth state, etc. are ready. */
    ready: boolean;
    /** Called after the exit animation; unmount the splash here. */
    onFinish: () => void;
    /** Minimum time the splash stays up so the animation can be seen (ms). */
    minDuration?: number;
};

/* ---------- Ripple: a ring that expands and fades, on loop ---------- */
function Ripple({ delay, color }: { delay: number; color: string }) {
    const p = useSharedValue(0);

    useEffect(() => {
        p.value = withDelay(
            delay,
            withRepeat(withTiming(1, { duration: 2000, easing: Easing.out(Easing.cubic) }), -1, false),
        );
    }, [delay, p]);

    const style = useAnimatedStyle(() => ({
        opacity: 0.35 * (1 - p.value),
        transform: [{ scale: 1 + 0.9 * p.value }],
    }));

    return <Animated.View pointerEvents="none" style={[styles.ripple, { borderColor: color }, style]} />;
}

/* ---------- Twinkle: a small sparkle that pulses and turns ---------- */
function Twinkle({
    x, y, size, delay, color,
}: { x: number; y: number; size: number; delay: number; color: string }) {
    const s = useSharedValue(0);

    useEffect(() => {
        s.value = withDelay(
            delay,
            withRepeat(
                withSequence(
                    withTiming(1, { duration: 700, easing: Easing.out(Easing.quad) }),
                    withTiming(0, { duration: 700, easing: Easing.in(Easing.quad) }),
                ),
                -1,
                false,
            ),
        );
    }, [delay, s]);

    const style = useAnimatedStyle(() => ({
        opacity: s.value,
        transform: [{ scale: 0.4 + 0.8 * s.value }, { rotate: `${s.value * 45}deg` }],
    }));

    return (
        <Animated.View
            pointerEvents="none"
            style={[{ position: 'absolute', left: x - size / 2, top: y - size / 2, width: size, height: size }, style]}
        >
            <Svg width={size} height={size} viewBox="0 0 24 24">
                <Path d={SPARK} fill={color} />
            </Svg>
        </Animated.View>
    );
}

/* ---------- Main component ---------- */
export default function AnimatedSplash({ ready, onFinish, minDuration = 2000 }: Props) {
    const scheme = useColorScheme();
    const t = THEME[scheme === 'dark' ? 'dark' : 'light'];
    const reduceMotion = useReducedMotion();

    const [minDone, setMinDone] = useState(false);
    const exiting = useRef(false);

    const logoScale = useSharedValue(reduceMotion ? 1 : 0.94);
    const logoOpacity = useSharedValue(1);
    const overlay = useSharedValue(1);

    // Entrance + minimum display timer
    useEffect(() => {
        if (!reduceMotion) {
            logoScale.value = withSpring(1, { damping: 12, stiffness: 120 });
        }
        const id = setTimeout(() => setMinDone(true), minDuration);
        return () => clearTimeout(id);
    }, [logoScale, minDuration, reduceMotion]);

    // Exit once the app is ready AND the minimum time has passed
    useEffect(() => {
        if (!ready || !minDone || exiting.current) return;
        exiting.current = true;

        logoScale.value = withTiming(reduceMotion ? 1 : 1.18, {
            duration: 500,
            easing: Easing.in(Easing.cubic),
        });
        logoOpacity.value = withTiming(0, { duration: 420 });
        overlay.value = withDelay(120, withTiming(0, { duration: 500 }));

        const id = setTimeout(onFinish, 700);
        return () => clearTimeout(id);
    }, [ready, minDone, onFinish, logoScale, logoOpacity, overlay, reduceMotion]);

    const overlayStyle = useAnimatedStyle(() => ({ opacity: overlay.value }));
    const logoStyle = useAnimatedStyle(() => ({
        opacity: logoOpacity.value,
        transform: [{ scale: logoScale.value }],
    }));

    return (
        <Animated.View
            accessible
            accessibilityLabel="Lumé is loading"
            style={[styles.root, { backgroundColor: t.bg }, overlayStyle]}
            // Hide the native splash only once our first frame is laid out (no flash)
            onLayout={() => {
                SplashScreen.hideAsync().catch(() => { });
            }}
        >
            <Animated.View style={[styles.logoBox, logoStyle]}>
                {!reduceMotion && (
                    <>
                        <Ripple delay={0} color={t.ripple} />
                        <Ripple delay={1000} color={t.ripple} />
                        <Twinkle x={30} y={40} size={14} delay={200} color={t.twinkle} />
                        <Twinkle x={212} y={96} size={10} delay={700} color={t.twinkle} />
                        <Twinkle x={205} y={165} size={12} delay={1100} color={t.twinkle} />
                    </>
                )}
                <Image source={t.image} style={styles.logo} resizeMode="contain" />
            </Animated.View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    root: {
        ...StyleSheet.absoluteFill,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 99,
    },
    logoBox: { width: LOGO, height: LOGO },
    logo: { width: LOGO, height: LOGO },
    ripple: {
        position: 'absolute',
        left: CX - RING / 2,
        top: CY - RING / 2,
        width: RING,
        height: RING,
        borderRadius: RING / 2,
        borderWidth: 2,
    },
});