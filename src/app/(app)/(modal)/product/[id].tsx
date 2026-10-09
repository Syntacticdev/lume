import SafeScreen from '@/components/ui/SafeScreen'
import { cn, colors, priceFormat } from '@/libs/utils'
import { Image } from 'expo-image'
import { router } from 'expo-router'
import { ChevronLeftIcon, HandbagIcon, HeartIcon, StarIcon } from 'lucide-react-native'
import { useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'

const ProductDetails = () => {
    const [shade, setShade] = useState(colors[0])
    return (
        <SafeScreen>
            <ScrollView>
                <View className='flex-row items-center justify-between'>

                    <Pressable onPress={() => router.back()} className='bg-chip p-3 rounded-pill'>
                        <ChevronLeftIcon className='w-8 h-8' />
                    </Pressable>
                    <Pressable className='bg-chip p-3 rounded-pill'>
                        <HeartIcon className='w-8 h-8' />
                    </Pressable>
                </View>

                <View className='bg-chip my-6 rounded-card'>
                    <Image className='w-56 h-72 self-center -rotate-3' source={require("@/assets/svg/products/perfume.svg")} />
                    <View className='flex-row items-center bg-sage rounded-pill gap-1 px-4 py-2 absolute bottom-2 left-2'>
                        <Image className='w-6 h-6' source={require("@/assets/svg/icons/spark.svg")} />
                        <Text className='text-brand font-jakarta'>Matte · 12h wear</Text>
                    </View>
                </View>
                <View className='gap-2'>
                    <Text className='font-jakarta-bold text-title text-brand line-clamp-1 '>Velvet Matte Lipstick</Text>
                    <Text className='text-body'>Lumé Beauty · 3.5g</Text>
                </View>

                <View className='flex-row justify-between items-center'>
                    <View className='flex-row items-center gap-2 my-3'>
                        <StarIcon size={16} color={"#ca8a04"} fill={"#ca8a04"} />
                        <Text className='text-brand font-jakarta-bold'>4.8</Text>
                        <Text>(1,248) Reviews</Text>
                    </View>

                    <Text className='px-4 py-2 text-brand bg-chip rounded-pill'>In stock</Text>
                </View>

                <View className='flex-row items-center gap-2'>
                    <Text>Shade</Text>
                    <Text>•</Text>
                    <Text className='text-brand font-jakarta-bold text-body'>{shade.name}</Text>
                </View>

                {/* Colors */}
                <View className='flex-row items-center gap-2 my-3'>
                    {colors.map((c, i) => (
                        <Pressable key={i} onPress={() => setShade(c)} className={cn("rounded-pill", c.hex == shade.hex && "border-2 border-black p-1")}>
                            <View key={i} style={{ backgroundColor: c.hex }} className="w-16 h-16 rounded-pill" />
                        </Pressable>
                    ))}
                </View>

                {/* Description */}
                <Text className='text-body text-brand font-jakarta-medium'>A creamy, weightless matte that stays put all day and feels comfortable on every lip.</Text>

            </ScrollView>
            <View className='flex-row items-center my-4 gap-2'>
                <View>
                    <Text className='text-body'>Price</Text>
                    <Text className='font-jakarta-bold text-title'>{priceFormat(9800)}</Text>
                </View>
                <Pressable className='flex-row items-center flex-1 min-w-0 justify-center bg-brand rounded-pill gap-2 p-4'>
                    <HandbagIcon color={"#ca8a04"} className='w-4 h-4' />
                    <Text className='text-canvas font-jakarta-bold text-body'>Add to bag</Text>
                </Pressable>
            </View>
        </SafeScreen>
    )
}

export default ProductDetails

const styles = StyleSheet.create({})