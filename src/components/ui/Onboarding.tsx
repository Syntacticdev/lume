import {
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
    PlusJakartaSans_800ExtraBold,
    useFonts,
} from '@expo-google-fonts/plus-jakarta-sans';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowRightIcon, CheckIcon, ChevronLeftIcon } from 'lucide-react-native';
import React, { useMemo, useState } from 'react';
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
    useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/* ------------------------------------------------------------------ */
/* Tokens                                                              */
/* ------------------------------------------------------------------ */
const C = {
    bg: '#FFFFFF',
    ink: '#2B1408', // dark espresso: CTA, active states
    inkSoft: '#8A7A70', // second line of headlines
    body: '#6F6259',
    track: '#EFE7E1',
    chip: '#F8EFE8',
    accent: '#E8772E', // highlighted word
    glow: '#FF9A62',
    peach: '#FFDCC6',
};

const F = {
    regular: 'PlusJakartaSans_400Regular',
    medium: 'PlusJakartaSans_500Medium',
    semi: 'PlusJakartaSans_600SemiBold',
    bold: 'PlusJakartaSans_700Bold',
    xbold: 'PlusJakartaSans_800ExtraBold',
};

const softShadow = {
    shadowColor: '#1E1432',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 4,
};

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */
type SkinType = 'dry' | 'combination' | 'oily' | 'sensitive';

const SKIN_TYPES: {
    id: SkinType;
    label: string;
    hint: string;
    tint: string;
    icon: keyof typeof Ionicons.glyphMap;
}[] = [
        { id: 'dry', label: 'Dry', hint: 'Tight, flaky, thirsty', tint: '#FFF1D0', icon: 'sunny-outline' },
        { id: 'combination', label: 'Combination', hint: 'Oily T-zone, drier cheeks', tint: '#FFE3D3', icon: 'contrast' },
        { id: 'oily', label: 'Oily', hint: 'Shiny within hours', tint: '#FFD9E2', icon: 'water-outline' },
        { id: 'sensitive', label: 'Sensitive', hint: 'Reacts or stings easily', tint: '#DDF0E3', icon: 'shield-outline' },
    ];

const CONCERNS = [
    'Dark spots', 'Acne', 'Dullness', 'Dryness', 'Fine lines',
    'Redness', 'Large pores', 'Dark circles',
];
const MAX_CONCERNS = 3;

const TONES = [
    { name: 'Porcelain', color: '#F6DCC9' },
    { name: 'Light Beige', color: '#EFC4A3' },
    { name: 'Sand', color: '#E1A97C' },
    { name: 'Caramel', color: '#C98B5E' },
    { name: 'Honey Brown', color: '#A8693F' },
    { name: 'Deep Brown', color: '#7A4A2B' },
    { name: 'Chestnut', color: '#6A3E22' },
    { name: 'Espresso', color: '#4A2A18' },
];

const UNDERTONES = ['Cool', 'Neutral', 'Warm'] as const;
type Undertone = (typeof UNDERTONES)[number];

const PRODUCTS = [
    { name: 'Vitamin C Serum', price: '₦18,500', match: 96, tint: '#FFE6C7', icon: 'flask' as const },
    { name: 'Velvet Lipstick', price: '₦9,800', match: 94, tint: '#FFD6DE', icon: 'color-palette' as const },
    { name: 'Hydra Gel Cream', price: '₦14,200', match: 91, tint: '#FFF1D0', icon: 'water' as const },
];

const STEP_COUNT = 4;
const CTA_LABELS = ['Continue', 'Continue', 'See My Matches', 'Shop My Matches'];

/* ------------------------------------------------------------------ */
/* Small pieces                                                        */
/* ------------------------------------------------------------------ */
function ProgressBar({ step }: { step: number }) {
    return (
        <View style={s.progressRow}>
            {Array.from({ length: STEP_COUNT }).map((_, i) => (
                <View
                    key={i}
                    style={[s.progressSeg, { backgroundColor: i <= step ? C.ink : C.track }]}
                />
            ))}
        </View>
    );
}

function Header({
    onBack,
    onSkip,
    showSkip,
}: {
    onBack: () => void;
    onSkip: () => void;
    showSkip: boolean;
}) {
    return (
        <View style={s.headerRow}>
            <Pressable
                onPress={onBack}
                hitSlop={8}
                accessibilityRole="button"
                accessibilityLabel="Go back"
                style={s.iconBtn}
            >
                <ChevronLeftIcon className='text-brand-ink' />
            </Pressable>
            {showSkip ? (
                <Pressable
                    onPress={onSkip}
                    hitSlop={8}
                    accessibilityRole="button"
                    accessibilityLabel="Skip quiz"
                    style={s.skipBtn}
                >
                    <Text style={s.skipText}>Skip</Text>
                </Pressable>
            ) : (
                <View />
            )}
        </View>
    );
}

function Heading({
    step,
    line1,
    line2,
    sub,
}: {
    step: number;
    line1: string;
    line2: string;
    sub: React.ReactNode;
}) {
    return (
        <View style={{ marginTop: 20 }}>
            <Text style={s.stepLabel}>
                Step {step + 1} of {STEP_COUNT}
            </Text>
            <Text style={s.title}>{line1}</Text>
            <Text style={[s.title, { color: C.inkSoft }]}>{line2}</Text>
            <Text style={s.subtitle}>{sub}</Text>
        </View>
    );
}

/* ------------------------------------------------------------------ */
/* Step 1 – Skin type                                                  */
/* ------------------------------------------------------------------ */
function StepSkinType({
    value,
    onChange,
}: {
    value: SkinType | null;
    onChange: (v: SkinType) => void;
}) {
    const { width } = useWindowDimensions();
    const gap = 12;
    const cardW = (width - 48 - gap) / 2;

    return (
        <>
            <Heading
                step={0}
                line1="What's Your"
                line2="Skin Type?"
                sub={
                    <>
                        Pick the one that feels most <Text style={{ color: C.accent, fontFamily: F.semi }}>like</Text> you.
                    </>
                }
            />
            <View style={[s.grid, { gap }]}>
                {SKIN_TYPES.map((t) => {
                    const selected = value === t.id;
                    return (
                        <Pressable
                            key={t.id}
                            onPress={() => onChange(t.id)}
                            accessibilityRole="radio"
                            accessibilityState={{ selected }}
                            accessibilityLabel={`${t.label}. ${t.hint}`}
                            style={[
                                s.skinCard,
                                { width: cardW, backgroundColor: t.tint },
                                selected && s.skinCardSelected,
                            ]}
                        >
                            <View style={s.skinIcon}>
                                {/* <Ionicons name={t.icon} size={16} color={C.ink} /> */}
                                <Text>Icon Here</Text>
                            </View>
                            {selected && (
                                <View style={s.checkBadge}>
                                    <CheckIcon className='text-white h-4 w-4' />
                                </View>
                            )}
                            <View>
                                <Text style={s.skinLabel}>{t.label}</Text>
                                <Text style={s.skinHint}>{t.hint}</Text>
                            </View>
                        </Pressable>
                    );
                })}
            </View>
        </>
    );
}

/* ------------------------------------------------------------------ */
/* Step 2 – Concerns (multi-select, max 3)                             */
/* ------------------------------------------------------------------ */
function StepConcerns({
    value,
    onToggle,
}: {
    value: string[];
    onToggle: (c: string) => void;
}) {
    return (
        <>
            <Heading
                step={1}
                line1="Any Skin"
                line2="Concerns?"
                sub="Choose up to 3 so we can prioritise."
            />
            <View style={s.chipWrap}>
                {CONCERNS.map((c) => {
                    const selected = value.includes(c);
                    const locked = !selected && value.length >= MAX_CONCERNS;
                    return (
                        <Pressable
                            key={c}
                            onPress={() => onToggle(c)}
                            disabled={locked}
                            accessibilityRole="checkbox"
                            accessibilityState={{ checked: selected, disabled: locked }}
                            style={[
                                s.chip,
                                selected && s.chipSelected,
                                locked && { opacity: 0.45 },
                            ]}
                        >
                            {selected && (
                                <CheckIcon className='text-white mr-3' />
                            )}
                            <Text style={[s.chipText, selected && { color: '#fff' }]}>{c}</Text>
                        </Pressable>
                    );
                })}
            </View>

            <Text style={s.counter}>
                {value.length} of {MAX_CONCERNS} selected
            </Text>

            <View style={s.note}>
                <View style={s.noteIcon}>
                    {/* <Ionicons name="sparkles" size={14} color={C.ink} /> */}
                    <Text>Sparkles</Text>
                </View>
                <Text style={s.noteText}>
                    Your answers stay private and only shape your product matches.
                </Text>
            </View>
        </>
    );
}

/* ------------------------------------------------------------------ */
/* Step 3 – Skin tone + undertone                                      */
/* ------------------------------------------------------------------ */
function StepTone({
    toneIndex,
    onTone,
    undertone,
    onUndertone,
}: {
    toneIndex: number;
    onTone: (i: number) => void;
    undertone: Undertone;
    onUndertone: (u: Undertone) => void;
}) {
    return (
        <>
            <Heading
                step={2}
                line1="Find Your"
                line2="Skin Tone"
                sub="Tap the closest match, even if it's not exact."
            />

            <View style={s.swatchGrid}>
                {TONES.map((t, i) => {
                    const selected = i === toneIndex;
                    return (
                        <Pressable
                            key={t.name}
                            onPress={() => onTone(i)}
                            accessibilityRole="radio"
                            accessibilityLabel={t.name}
                            accessibilityState={{ selected }}
                            style={[s.swatchRing, selected && { borderColor: C.ink }]}
                        >
                            <View style={[s.swatch, { backgroundColor: t.color }]}>
                                {selected && <CheckIcon className='text-white' />}
                            </View>
                        </Pressable>
                    );
                })}
            </View>

            <Text style={s.toneName}>{TONES[toneIndex].name}</Text>
            <Text style={s.toneHint}>Now choose your undertone</Text>

            <View style={s.segment} accessibilityRole="radiogroup">
                {UNDERTONES.map((u) => {
                    const selected = u === undertone;
                    return (
                        <Pressable
                            key={u}
                            onPress={() => onUndertone(u)}
                            accessibilityRole="radio"
                            accessibilityState={{ selected }}
                            style={[s.segItem, selected && s.segItemSelected]}
                        >
                            <Text style={[s.segText, selected && { color: '#fff' }]}>{u}</Text>
                        </Pressable>
                    );
                })}
            </View>
        </>
    );
}

/* ------------------------------------------------------------------ */
/* Step 4 – Result                                                     */
/* ------------------------------------------------------------------ */
function StepResult({
    skin,
    concerns,
    tone,
    undertone,
    onRetake,
}: {
    skin: SkinType | null;
    concerns: string[];
    tone: string;
    undertone: Undertone;
    onRetake: () => void;
}) {
    const skinLabel = SKIN_TYPES.find((t) => t.id === skin)?.label ?? '—';
    const rows = [
        ['Skin type', skinLabel],
        ['Tone · Undertone', `${tone} · ${undertone}`],
        ['Focus on', concerns.length ? concerns.join(', ') : 'General care'],
    ];

    return (
        <View>
            <Text style={[s.title, { marginTop: 20 }]}>Your Glow</Text>
            <Text style={[s.title, { color: C.inkSoft }]}>Profile</Text>

            <View style={[s.profileCard, softShadow]}>
                <View style={s.readyBadge}>
                    {/* <Ionicons name="sparkles" size={11} color="#fff" /> */}
                    <Text>Sparkles icon</Text>
                    <Text style={s.readyText}>Profile ready</Text>
                </View>
                {rows.map(([k, v]) => (
                    <View key={k} style={s.profileRow}>
                        <Text style={s.profileKey}>{k}</Text>
                        <Text style={s.profileVal} numberOfLines={1}>
                            {v}
                        </Text>
                    </View>
                ))}
            </View>

            <View style={s.pickedHeader}>
                <Text style={s.pickedTitle}>Picked for you</Text>
                <Pressable hitSlop={8}>
                    <Text style={s.seeAll}>See all 18</Text>
                </Pressable>
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                // negative margin lets the rail bleed to the screen edge so the next card peeks
                style={{ marginHorizontal: -24 }}
                contentContainerStyle={{ paddingHorizontal: 24, gap: 12 }}
            >
                {PRODUCTS.map((p) => (
                    <View key={p.name} style={{ width: 140 }}>
                        <View style={[s.productImg, { backgroundColor: p.tint }]}>
                            <View style={s.matchBadge}>
                                <Text style={s.matchText}>{p.match}% match</Text>
                            </View>
                            {/* <Ionicons name={p.icon} size={44} color={C.ink} style={{ opacity: 0.85 }} /> */}
                            <Text>icon here</Text>
                        </View>
                        <Text style={s.productName} numberOfLines={1}>
                            {p.name}
                        </Text>
                        <Text style={s.productPrice}>{p.price}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

/* ------------------------------------------------------------------ */
/* Screen                                                              */
/* ------------------------------------------------------------------ */
export default function SkinQuizOnboarding({
    onFinish,
}: {
    onFinish?: (answers: {
        skin: SkinType | null;
        concerns: string[];
        tone: string;
        undertone: Undertone;
    }) => void;
}) {
    const [fontsLoaded] = useFonts({
        PlusJakartaSans_400Regular,
        PlusJakartaSans_500Medium,
        PlusJakartaSans_600SemiBold,
        PlusJakartaSans_700Bold,
        PlusJakartaSans_800ExtraBold,
    });

    const [step, setStep] = useState(0);
    const [skin, setSkin] = useState<SkinType | null>(null);
    const [concerns, setConcerns] = useState<string[]>([]);
    const [toneIndex, setToneIndex] = useState(5);
    const [undertone, setUndertone] = useState<Undertone>('Warm');

    const isResult = step === STEP_COUNT - 1;
    const canContinue = step === 0 ? skin !== null : true;

    const answers = useMemo(
        () => ({ skin, concerns, tone: TONES[toneIndex].name, undertone }),
        [skin, concerns, toneIndex, undertone]
    );

    if (!fontsLoaded) return null;

    const toggleConcern = (c: string) =>
        setConcerns((prev) =>
            prev.includes(c)
                ? prev.filter((x) => x !== c)
                : prev.length < MAX_CONCERNS
                    ? [...prev, c]
                    : prev
        );

    const next = () => {
        if (isResult) {
            onFinish?.(answers);
            return;
        }
        setStep((n) => n + 1);
    };

    const back = () => setStep((n) => Math.max(0, n - 1));
    const skip = () => setStep(STEP_COUNT - 1);
    const retake = () => {
        setSkin(null);
        setConcerns([]);
        setToneIndex(5);
        setUndertone('Warm');
        setStep(0);
    };

    return (
        <View style={{ flex: 1, backgroundColor: C.bg }}>
            {/* Peach wash behind the result screen */}
            {isResult && (
                <LinearGradient
                    colors={[C.peach, '#FFEFE4', '#FFFFFF']}
                    locations={[0, 0.45, 1]}
                    style={StyleSheet.absoluteFill}
                    pointerEvents="none"
                />
            )}

            <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
                <View style={s.container}>
                    <ProgressBar step={step} />
                    <Header onBack={back} onSkip={skip} showSkip={!isResult} />

                    <ScrollView
                        style={{ flex: 1 }}
                        contentContainerStyle={{ paddingBottom: 24 }}
                        showsVerticalScrollIndicator={false}
                    >
                        {step === 0 && <StepSkinType value={skin} onChange={setSkin} />}
                        {step === 1 && <StepConcerns value={concerns} onToggle={toggleConcern} />}
                        {step === 2 && (
                            <StepTone
                                toneIndex={toneIndex}
                                onTone={setToneIndex}
                                undertone={undertone}
                                onUndertone={setUndertone}
                            />
                        )}
                        {step === 3 && (
                            <StepResult
                                skin={skin}
                                concerns={concerns}
                                tone={TONES[toneIndex].name}
                                undertone={undertone}
                                onRetake={retake}
                            />
                        )}
                    </ScrollView>

                    {/* Footer CTA */}
                    <View style={s.footer}>
                        <Pressable
                            onPress={next}
                            disabled={!canContinue}
                            accessibilityRole="button"
                            accessibilityLabel={CTA_LABELS[step]}
                            style={({ pressed }) => [
                                s.cta,
                                !canContinue && { opacity: 0.4 },
                                pressed && { transform: [{ scale: 0.98 }] },
                            ]}
                        >
                            <Text style={s.ctaText}>{CTA_LABELS[step]}</Text>
                            <ArrowRightIcon className='text-white ml-3' />

                        </Pressable>

                        {isResult && (
                            <Pressable onPress={retake} hitSlop={10} style={{ marginTop: 14 }}>
                                <Text style={s.retake}>Retake quiz</Text>
                            </Pressable>
                        )}
                    </View>
                </View>
            </SafeAreaView>
        </View>
    );
}

/* ------------------------------------------------------------------ */
/* Styles                                                              */
/* ------------------------------------------------------------------ */
const s = StyleSheet.create({
    container: { flex: 1, paddingHorizontal: 24 },

    // progress + header
    progressRow: { flexDirection: 'row', gap: 6, marginTop: 8 },
    progressSeg: { flex: 1, height: 3, borderRadius: 2 },
    headerRow: {
        marginTop: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    iconBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: C.chip,
        alignItems: 'center',
        justifyContent: 'center',
    },
    skipBtn: {
        height: 36,
        minWidth: 52,
        paddingHorizontal: 14,
        borderRadius: 18,
        backgroundColor: C.chip,
        alignItems: 'center',
        justifyContent: 'center',
    },
    skipText: { fontFamily: F.semi, fontSize: 13, color: C.body },

    // headings
    stepLabel: { fontFamily: F.medium, fontSize: 12, color: C.body, marginBottom: 6 },
    title: {
        fontFamily: F.xbold,
        fontSize: 30,
        lineHeight: 34,
        letterSpacing: -0.6,
        color: C.ink,
    },
    subtitle: {
        fontFamily: F.regular,
        fontSize: 14,
        lineHeight: 20,
        color: C.body,
        marginTop: 10,
    },

    // step 1
    grid: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 24 },
    skinCard: {
        height: 150,
        borderRadius: 24,
        padding: 16,
        justifyContent: 'space-between',
        borderWidth: 2,
        borderColor: 'transparent',
    },
    skinCardSelected: { borderColor: C.ink },
    skinIcon: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkBadge: {
        position: 'absolute',
        top: 12,
        right: 12,
        width: 22,
        height: 22,
        borderRadius: 11,
        backgroundColor: C.ink,
        alignItems: 'center',
        justifyContent: 'center',
    },
    skinLabel: { fontFamily: F.bold, fontSize: 15, color: C.ink },
    skinHint: { fontFamily: F.regular, fontSize: 11, lineHeight: 15, color: C.body, marginTop: 2 },

    // step 2
    chipWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 24 },
    chip: {
        minHeight: 44,
        paddingHorizontal: 18,
        borderRadius: 22,
        backgroundColor: C.chip,
        flexDirection: 'row',
        alignItems: 'center',
    },
    chipSelected: { backgroundColor: C.ink },
    chipText: { fontFamily: F.semi, fontSize: 14, color: C.ink },
    counter: { fontFamily: F.medium, fontSize: 12, color: C.body, marginTop: 18 },
    note: {
        marginTop: 24,
        padding: 16,
        borderRadius: 20,
        backgroundColor: '#FFF1D6',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    noteIcon: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    noteText: { flex: 1, fontFamily: F.regular, fontSize: 12, lineHeight: 17, color: C.ink },

    // step 3
    swatchGrid: {
        marginTop: 28,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        rowGap: 14,
    },
    swatchRing: {
        width: 68,
        height: 68,
        borderRadius: 34,
        borderWidth: 2,
        borderColor: 'transparent',
        padding: 3,
    },
    swatch: { flex: 1, borderRadius: 30, alignItems: 'center', justifyContent: 'center' },
    toneName: {
        fontFamily: F.bold,
        fontSize: 16,
        color: C.ink,
        textAlign: 'center',
        marginTop: 24,
    },
    toneHint: {
        fontFamily: F.regular,
        fontSize: 12,
        color: C.body,
        textAlign: 'center',
        marginTop: 4,
    },
    segment: {
        marginTop: 16,
        flexDirection: 'row',
        padding: 4,
        borderRadius: 26,
        backgroundColor: C.chip,
    },
    segItem: {
        flex: 1,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
    },
    segItemSelected: { backgroundColor: C.ink },
    segText: { fontFamily: F.semi, fontSize: 14, color: C.body },

    // step 4
    profileCard: {
        marginTop: 28,
        backgroundColor: '#fff',
        borderRadius: 24,
        paddingHorizontal: 18,
        paddingTop: 26,
        paddingBottom: 14,
    },
    readyBadge: {
        position: 'absolute',
        top: -14,
        left: 12,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        height: 28,
        paddingHorizontal: 12,
        borderRadius: 14,
        backgroundColor: C.ink,
    },
    readyText: { fontFamily: F.semi, fontSize: 11, color: '#fff' },
    profileRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 7,
        gap: 16,
    },
    profileKey: { fontFamily: F.regular, fontSize: 12, color: C.body },
    profileVal: {
        flexShrink: 1,
        fontFamily: F.bold,
        fontSize: 12,
        color: C.ink,
        textAlign: 'right',
    },
    pickedHeader: {
        marginTop: 28,
        marginBottom: 14,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    pickedTitle: { fontFamily: F.bold, fontSize: 15, color: C.ink },
    seeAll: { fontFamily: F.semi, fontSize: 12, color: C.ink, textDecorationLine: 'underline' },
    productImg: {
        height: 130,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    matchBadge: {
        position: 'absolute',
        top: 10,
        left: 10,
        height: 22,
        paddingHorizontal: 9,
        borderRadius: 11,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    matchText: { fontFamily: F.bold, fontSize: 10, color: C.ink },
    productName: { fontFamily: F.semi, fontSize: 12, color: C.ink, marginTop: 10 },
    productPrice: { fontFamily: F.bold, fontSize: 12, color: C.body, marginTop: 2 },

    // footer
    footer: { alignItems: 'center', paddingTop: 8, paddingBottom: 12 },
    cta: {
        width: '100%',
        height: 56,
        borderRadius: 28,
        backgroundColor: C.ink,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // warm glow under the dark button
        shadowColor: C.glow,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.45,
        shadowRadius: 16,
        elevation: 8,
    },
    ctaText: { fontFamily: F.bold, fontSize: 16, color: '#fff' },
    retake: {
        fontFamily: F.semi,
        fontSize: 13,
        color: C.ink,
        textDecorationLine: 'underline',
    },
});