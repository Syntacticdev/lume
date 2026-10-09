import Carousel from '@/components/home/Carousel'
import HomeSectionHeader from '@/components/home/home-section-header'
import GradientScreen from '@/components/ui/GradientScreen'
import ProductCard from '@/components/ui/ProductCard'
import { cn } from '@/libs/utils'
import { Image } from "expo-image"
import { BellDotIcon, SearchIcon, SlidersHorizontalIcon } from 'lucide-react-native'
import { useState } from 'react'
import { FlatList, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
const Home = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>("All")
    const avatar = null
    const categories = [
        "All",
        "Skincare",
        "Makeup",
        "Hair",
        "Fragrance"
    ]

    const concerns = [
        {
            name: "Acne",
            icon: require("@/assets/svg/icons/drop.svg"),
            tint: "#ffe4d2"
        },
        {
            name: "Dark spots",
            icon: require("@/assets/svg/icons/sun.svg"),
            tint: "#ffdce3"
        },
        {
            name: "Hydration",
            icon: require("@/assets/svg/icons/drop.svg"),
            tint: "#fff1d6"
        },
        {
            name: "Anti-aging",
            icon: require("@/assets/svg/icons/spark.svg"),
            tint: "#e3f1e6"
        },
        {
            name: "Sentivity",
            icon: require("@/assets/svg/icons/shield.svg"),
            tint: "#f6efea"
        },
    ]
    const brands = [
        {
            name: "Lume",
            tint: "#ffe4d2"
        },
        {
            name: "Aura",
            tint: "#ffdce3"
        },
        {
            name: "Nuri",
            tint: "#fff1d6"
        },
        {
            name: "Glova",
            tint: "#e3f1e6"
        },
    ]


    return (
        <GradientScreen edges={["bottom", "top"]}>
            <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerClassName='pb-8 mb-7'
                keyboardShouldPersistTaps="handled"
                ListHeaderComponent={() => (
                    <View>
                        {/* Top Profile Section */}
                        <View className='flex-row items-center gap-4'>
                            {!avatar ?
                                <View className='w-16 h-16 bg-brand-muted border-2 border-canvas rounded-full items-center justify-center'>
                                    <Text className='font-jakarta-bold text-2xl text-canvas'>A</Text>
                                </View> : ""
                            }
                            <View className='flex-1'>
                                <Text className='text-brand text-2xl font-jakarta-bold'>Hi Amara</Text>
                                <Text>Find your glow today</Text>
                            </View>

                            <Pressable>
                                <View className='bg-canvas p-2 rounded-full'>
                                    <BellDotIcon className='w-8 h-8' />
                                </View>
                            </Pressable>
                        </View>

                        {/* Search */}
                        <View className='flex-row items-center bg-peach-50 py-2 px-4 rounded-full my-5'>
                            <SearchIcon />
                            <TextInput className='flex-1' placeholderClassName='text-6xl' placeholder='Search serums, lipstick...' />
                            <View className='bg-brand w-12 h-12 rounded-full items-center justify-center'>
                                <SlidersHorizontalIcon color={"#faf5ff"} />
                            </View>
                        </View>

                        {/* Categories */}

                        <ScrollView contentContainerClassName='gap-2' horizontal showsHorizontalScrollIndicator={false}>
                            {categories.map((c) => (
                                <Pressable key={c} onPress={() => setSelectedCategory(c)} className={cn("p-4 rounded-full items-center justify-center",
                                    c == selectedCategory ? "bg-brand" : "bg-peach-50"
                                )}>
                                    <Text className={cn("font-jakarta-semibold",
                                        c == selectedCategory ? "font-jakarta-bold text-canvas" : "text-brand"
                                    )}>{c}</Text>
                                </Pressable>
                            ))}
                        </ScrollView>

                        {/* Hero */}
                        <Carousel />

                        {/* Shop by concern*/}
                        <View className='my-3'>
                            <Text className='text-2xl font-jakarta-bold my-3'>Shop by Concern</Text>
                            <ScrollView contentContainerClassName='gap-6' horizontal showsHorizontalScrollIndicator={false}>
                                {concerns.map((c) => (
                                    <Pressable key={c.name}>
                                        <View style={{ backgroundColor: c.tint }} className='h-20 w-20 rounded-full items-center justify-center '>
                                            <Image style={{ width: 25, height: 25 }} source={c.icon} />
                                        </View>
                                        <Text className='text-brand text-center font-jakarta-bold'>{c.name}</Text>
                                    </Pressable>
                                ))}
                            </ScrollView>
                        </View>

                        <View>
                            <HomeSectionHeader title='Picked For You' showBadgeText={true} badgeText='Quiz match' showAllFn={() => { }} />

                            <ScrollView contentContainerClassName='gap-3' horizontal showsHorizontalScrollIndicator={false}>
                                {Array.from({ length: 6 }).map((item, i) => (
                                    <ProductCard key={i} title='Vitamin C Serun' description='Brightening . 30ml' price={18000} size={"30 ml"} showMatch={true} />
                                ))}
                            </ScrollView>
                        </View>

                        <View>
                            <HomeSectionHeader title='Best Sellers' showAllFn={() => { }} />
                            <ScrollView contentContainerClassName='gap-3' horizontal showsHorizontalScrollIndicator={false}>
                                {Array.from({ length: 6 }).map((item, i) => (
                                    <ProductCard key={i} title='Vitamin C Serun' description='Brightening . 30ml' price={18000} size={"30 ml"} discount={i % 2 == 0 ? Math.floor(Math.random() * 41) + 20 : 0} />
                                ))}
                            </ScrollView>
                        </View>

                        <View>
                            <HomeSectionHeader title='New Arrivals' showAllFn={() => { }} />
                            <ScrollView contentContainerClassName='gap-3' horizontal showsHorizontalScrollIndicator={false}>
                                {Array.from({ length: 6 }).map((item, i) => (
                                    <ProductCard key={i} title='Vitamin C Serun' description='Brightening . 30ml' price={18000} size={"30 ml"} showNewTag={true} />
                                ))}
                            </ScrollView>
                        </View>

                        <View>
                            <HomeSectionHeader title='Shop by Brand' showAll={false} />
                            <ScrollView contentContainerClassName='gap-3' horizontal showsHorizontalScrollIndicator={false}>
                                {brands.map((b, i) => (
                                    <View key={b.name}>
                                        <Pressable style={{ backgroundColor: b.tint }} className='w-24 h-24 justify-center items-center rounded-pill'>
                                            <Text className='text-2xl text-brand font-jakarta-bold '>  {b.name.slice(0, 2)}</Text>
                                        </Pressable>
                                        <Text className='text-center text-brand font-jakarta-bold text-body'>{b.name}</Text>
                                    </View>
                                ))}
                            </ScrollView>
                        </View>
                    </View>
                )}
                keyExtractor={(item, i) => i.toString()}

                data={Array.from({ length: 9 })} renderItem={null}

                ListFooterComponent={() => (
                    <View className='flex-row items-start gap-2 bg-peach-100 my-5 p-3 rounded-card'>
                        <View className='bg-peach-50 rounded-pill p-3'>
                            <Image style={{ width: 20, height: 20 }} source={require("@/assets/svg/icons/spark.svg")} />
                        </View>
                        <View className='flex-1 items-start justify-start min-w-0 gap-2'>
                            <Text className='text-brand text-h3 font-jakarta-bold'>Skin tip of the day</Text>
                            <Text className="text-body">Apply Vitamin C in the morning. then SPF.
                                Your combination skin will thank you.</Text>
                        </View>
                    </View>
                )}
            />
        </GradientScreen>
    )
}

export default Home

const styles = StyleSheet.create({})