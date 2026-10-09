import { priceFormat } from '@/libs/utils'
import { Image } from 'expo-image'
import { MinusIcon, PlusIcon } from 'lucide-react-native'
import { Pressable, StyleSheet, Text, View } from 'react-native'

const CartItemCard = () => {
    return (
        <View className='flex-row items-center gap-4'>
            <View className='bg-peach-100 p-4 rounded-card'>
                <Image source={require("@/assets/svg/products/lipstick.svg")}
                    className='w-16 h-16'
                />
            </View>
            <View className='flex-1 min-w-0'>
                <Text numberOfLines={2} className='text-h3 font-jakarta-bold'>Vitamin C Glow Serum</Text>
                <Text>30ml</Text>
                <Text className='text-h3'>{priceFormat(18000)}</Text>
            </View>

            <View className='flex-row items-center gap-2 border-2 border-sage rounded-card p-2'>
                <Pressable className='bg-peach-50 p-2 rounded-pill'>
                    <MinusIcon />
                </Pressable>
                <Text className='text-h3 font-jakarta-semibold'>1</Text>
                <Pressable className='bg-peach-50 p-2 rounded-pill'>
                    <PlusIcon />
                </Pressable>
            </View>
        </View>
    )
}

export default CartItemCard

const styles = StyleSheet.create({})