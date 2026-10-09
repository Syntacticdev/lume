import CartItemCard from '@/components/cart/CartItemCard'
import SafeScreen from '@/components/ui/SafeScreen'
import { cn, priceFormat } from '@/libs/utils'
import { Image } from 'expo-image'
import { router } from 'expo-router'
import { ChevronLeftIcon } from 'lucide-react-native'
import { useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'

const Cart = () => {
    const paymentMethods = ["Card", "Transfer", "Pay on delivery"]
    const [selectedPM, setSelectedPM] = useState(paymentMethods[0])

    
    return (
        <SafeScreen>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <View className='flex-row items-center justify-between'>

                    <Pressable onPress={() => router.back()} className='bg-chip p-3 rounded-pill'>
                        <ChevronLeftIcon className='w-8 h-8' />
                    </Pressable>
                    <View className='items-center '>
                        <Text className='text-brand font-jakarta-bold text-2xl'>My Bag</Text>
                        <Text>4 items</Text>
                    </View>
                    <Pressable>
                        <Text className='font-jakarta-bold text-brand text-body'>Clear cart</Text>
                    </Pressable>
                </View>

                <View className='my-5 gap-3'>
                    {Array.from({ length: 7 }).map((item, i) => (
                        <CartItemCard key={i} />
                    ))}
                    {/* <FlatList data={Array.from({ length: 4 })} keyExtractor={(item, index) => index.toString()}
                        renderItem={() => (
                            <CartItemCard />
                        )}
                    /> */}
                </View>

                {/* Payment Method */}
                <View>
                    <Text className='text-h3 my-2 font-jakarta-bold'>Pay with</Text>
                    <View className='flex-row items-center gap-3'>
                        {paymentMethods.map((method, i) => (
                            <Pressable onPress={() => setSelectedPM(method)} key={i} className={cn(" active:bg-peach-100 py-4 px-6 rounded-pill",
                                selectedPM == method ? "bg-brand" : "bg-peach-50"
                            )}>
                                <Text className={cn("text-body font-jakarta ",
                                    selectedPM == method ? "text-canvas font-jakarta-bold " : "text-brand"
                                )}>{method}</Text>
                            </Pressable>
                        ))}
                    </View>
                </View>

                {/* Details */}
                <View className='my-3 gap-2'>
                    <View className='flex-row justify-between items-center'>
                        <Text className='text-h3'>Subtotal</Text>
                        <Text className='text-h3 font-jakarta-bold text-brand'>{priceFormat(52300)}</Text>
                    </View>
                    <View className='flex-row justify-between items-center'>
                        <Text className='text-h3'>Delivery</Text>
                        <Text className='text-h3 font-jakarta-bold text-brand'>{priceFormat(2500)}</Text>
                    </View>
                    <View className='flex-row justify-between items-center'>
                        <Text className='text-h3'>Promo GLOW20</Text>
                        <Text className='text-h3 font-jakarta-bold text-brand'>-{priceFormat(3200)}</Text>
                    </View>
                </View>

                {/* Notification */}
                <View className='bg-brand rounded-pill flex-row items-center p-4 gap-2 mt-4 mb-7'>
                    <Image style={{ tintColor: "#FFD9BF" }} className='h-8 w-8  ' source={require("@/assets/svg/icons/spark.svg")} />
                    <Text className='text-canvas text-body'>You’re saving <Text className='text-peach-50 font-jakarta-bold'>{priceFormat(3200)}</Text> with promotion</Text>
                </View>
            </ScrollView>
            <Pressable className='bg-brand rounded-pill px-4 py-6 active:bg-brand-soft'>
                <Text className='text-canvas text-center font-jakarta-bold '>Checkout • {priceFormat(51600)}</Text>
            </Pressable>
        </SafeScreen>
    )
}

export default Cart

const styles = StyleSheet.create({})