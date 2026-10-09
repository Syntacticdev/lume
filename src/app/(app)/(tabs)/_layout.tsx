// import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Tabs } from 'expo-router';
import { Home, LayoutGrid, ShoppingBag, User, type LucideIcon } from 'lucide-react-native';
import { ComponentProps } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type BottomTabBarProps = Parameters<
    NonNullable<ComponentProps<typeof Tabs>['tabBar']>
>[0];

const ICONS: Record<string, { Icon: LucideIcon; label: string }> = {
    home: { Icon: Home, label: 'Home' },
    shop: { Icon: LayoutGrid, label: 'Shop' },
    cart: { Icon: ShoppingBag, label: 'Cart' },
    profile: { Icon: User, label: 'Profile' },
};

const ACTIVE_BG = '#2B1408'; // use your brand color
const BAR_BG = '#FFEFE4';

const FloatingTabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
    const insets = useSafeAreaInsets();
    const focusedRoute = state.routes[state.index];
    const focusedOptions = descriptors[focusedRoute.key].options;
    const flatStyle = StyleSheet.flatten(focusedOptions.tabBarStyle) as { display?: string } | undefined;

    if (flatStyle?.display === 'none') return null;
    return (
        <View
            style={{
                position: 'absolute',
                left: 20,
                right: 20,
                bottom: insets.bottom + 12,
                height: 68,
                borderRadius: 40,
                backgroundColor: BAR_BG,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
                paddingHorizontal: 10,
                shadowColor: '#000',
                shadowOpacity: 0.08,
                shadowRadius: 12,
                shadowOffset: { width: 0, height: 4 },
                elevation: 8,
            }}
        >
            {state.routes.map((route, index) => {
                const focused = state.index === index;
                const { options } = descriptors[route.key];
                const meta = ICONS[route.name];
                if (!meta) return null;
                const { Icon, label } = meta;
                const badge = options.tabBarBadge;


                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });
                    if (!focused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                return (
                    <Pressable
                        key={route.key}
                        onPress={onPress}
                        accessibilityRole="button"
                        accessibilityState={focused ? { selected: true } : {}}
                        accessibilityLabel={`${label} Tab`}
                        style={{
                            height: 48,
                            minWidth: 48,
                            paddingHorizontal: focused ? 20 : 0,
                            borderRadius: 24,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 8,
                            backgroundColor: focused ? ACTIVE_BG : 'transparent',
                        }}
                    >
                        <View>
                            <Icon color={focused ? '#fff' : '#6B6B6B'} size={21} />
                            {badge != null && !focused && (
                                <View
                                    style={{
                                        position: 'absolute',
                                        top: -8,
                                        right: -10,
                                        minWidth: 16,
                                        height: 16,
                                        borderRadius: 8,
                                        paddingHorizontal: 4,
                                        backgroundColor: '#EF4444',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Text style={{ color: '#fff', fontSize: 10, fontWeight: '700' }}>
                                        {badge}
                                    </Text>
                                </View>
                            )}
                        </View>
                        {focused && (
                            <Text style={{ color: '#fff', fontWeight: '600', fontSize: 14 }}>
                                {label}
                            </Text>
                        )}
                    </Pressable>
                );
            })}
        </View>
    );
};

const TabsLayout = () => (
    <Tabs
        tabBar={(props) => <FloatingTabBar {...props} />}
        screenOptions={{ headerShown: false, animation: "shift" }}
    >
        <Tabs.Screen name="home" options={{ title: 'Home' }} />
        <Tabs.Screen name="shop" options={{ title: 'Shop' }} />
        <Tabs.Screen name="cart" options={{ title: 'Cart', tabBarBadge: 4, tabBarStyle: { display: "none" }, animation: "shift" }} />
        <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
);

export default TabsLayout;