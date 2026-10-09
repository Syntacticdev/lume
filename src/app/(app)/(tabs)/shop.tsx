import { CategoryCard } from '@/components/ui/CategoryCard';
import GradientScreen from '@/components/ui/GradientScreen';
import { Category } from '@/types';
import { HeartIcon, SearchIcon, SlidersHorizontalIcon, TrendingUp } from 'lucide-react-native';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

const Shop = () => {
    const categories: Category[] = [
        { id: "1", name: "Skincare", items: 320, tint: "#FDE3D3", height: 230, image: require("@/assets/svg/products/serum.svg"), itemCount: 320 },
        { id: "3", name: "Fragrance", items: 86, tint: "#FCEBCB", height: 170, image: require("@/assets/svg/products/perfume.svg"), itemCount: 86 },
        { id: "2", name: "Makeup", items: 410, tint: "#FFD9E0", height: 170, image: require("@/assets/svg/products/lipstick.svg"), itemCount: 410 },
        { id: "4", name: "Body & Bath", items: 154, tint: "#DDEEDD", height: 230, image: require("@/assets/svg/products/tube.svg"), itemCount: 154 },
    ];

    const trendingSearches = [
        "Vitamin C serum",
        "Matte lipstick",
        "SPF50",
        "Retinol"
    ]

    return (
        <GradientScreen>

            <FlatList
                ListHeaderComponent={() => (
                    <View>
                        <View className='flex-row items-center justify-between'>
                            <Text className='text-brand text-headline font-jakarta-bold'>Shop</Text>

                            <Pressable className='bg-peach-50 p-3 rounded-pill'>
                                <HeartIcon className='w-8 h-8' />
                            </Pressable>
                        </View>
                        <View className='flex-row items-center bg-peach-50 py-2 px-4 rounded-full my-5'>
                            <SearchIcon />
                            <TextInput className='flex-1' placeholderClassName='text-6xl' placeholder='Search products, brands, concerns' />
                            <View className='bg-brand w-12 h-12 rounded-full items-center justify-center'>
                                <SlidersHorizontalIcon color={"#faf5ff"} />
                            </View>
                        </View>
                        <Text className='text-brand text-title font-jakarta-bold my-4'>Browse categories</Text>
                    </View>
                )}

                data={categories}
                numColumns={2}
                keyExtractor={(c) => c.id}
                contentContainerClassName="gap-3 p-4"
                columnWrapperClassName="gap-3"
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index },) => (
                    <CategoryCard
                        index={index}
                        item={item}
                        onPress={(c) => console.log("open", c.id)} // navigate here
                    />
                )}

                ListFooterComponent={() => (
                    <View className='my-2'>
                        <Text className='text-2xl text-brand font-jakarta-bold '>Trending searches</Text>

                        <View className='flex-row flex-wrap gap-4 my-3'>
                            {trendingSearches.map((search, i) => (
                                <Pressable className='flex-row items-center bg-peach-50 p-4 rounded-pill gap-2 group active:bg-brand' key={i}>
                                    <TrendingUp className='fill-brand group-active:text-canvas ' />
                                    <Text className='text-brand font-semibold group-active:text-canvas '>{search}</Text>
                                </Pressable>
                            ))}
                        </View>
                    </View>
                )}
            />


        </GradientScreen>
    )
}

export default Shop

const styles = StyleSheet.create({})