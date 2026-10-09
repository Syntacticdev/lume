import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { ReactNode } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { Edge, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

type GradientColors = readonly [string, string, ...string[]];

type Props = {
    children: ReactNode;
    colors?: GradientColors;
    locations?: readonly [number, number, ...number[]];
    start?: { x: number; y: number };
    end?: { x: number; y: number };
    edges?: Edge[];
    statusBarStyle?: 'light' | 'dark' | 'auto';
    style?: StyleProp<ViewStyle>; // style for the inner content area
};

export default function GradientScreen({
    children,
    colors = ['#FFD6BF', '#FFEADF', '#FFFFFF'],
    locations = [0, 0.35, 0.7],
    start = { x: 0.5, y: 0 },
    end = { x: 0.5, y: 1 },
    edges = ['top', 'bottom', 'left', 'right'],
    statusBarStyle = 'dark',
    style,
}: Props) {
    const insets = useSafeAreaInsets()
    return (
        <LinearGradient
            colors={colors}
            locations={locations}
            start={start}
            end={end}
            style={[styles.fill, { marginBottom: insets.bottom + 42 }]}
        >
            <StatusBar style={statusBarStyle} />
            <SafeAreaView edges={edges} style={[styles.content, style]}>
                {children}
            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    fill: { flex: 1, },
    content: { flex: 1, paddingHorizontal: 24 },
});