import { cn, priceFormat } from "@/libs/utils";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Heart, Plus, Star, StarIcon } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';
type ProductCardProps = {
    title: string;
    description: string;
    size: string;
    showMatch?: boolean;
    showRating?: boolean;
    rating?: number;
    ratingCount?: number;
    price: number;
    showNewTag?: boolean
    discount?: number
}
const ProductCard = ({ title, description, size, showMatch = false, showRating = false, rating, ratingCount, price, showNewTag = false, discount }: ProductCardProps) => {
    return (
        <Pressable onPress={() => router.push({ pathname: "/(app)/(modal)/product/[id]", params: { id: 123 } })}>
            <View className=" w-64 ">
                <View className='relative h-44 items-center justify-center bg-peach-100 rounded-card w-full'>
                    <View className='flex-row justify-between items-center absolute top-2 left-2'>
                        <View className={cn("flex-row items-center w-[95%]",
                            showMatch || discount || showNewTag ? "justify-between" : "justify-end"
                        )}>
                            {showMatch && <View className="flex-row items-center gap-1 bg-peach-50 py-1 px-2 rounded-pill">
                                <StarIcon size={16} />
                                <Text className="text-brand text-macro font-jakarta-semibold">96% match</Text>
                            </View>}
                            {/* {discount && <Text className="bg-brand rounded-pill text-canvas px-4 py-1">-{discount}%</Text>} */}
                            {showNewTag && <Text className="bg-brand rounded-pill text-canvas px-4 py-1">New</Text>}

                            <Pressable className=" bg-peach-50 p-2  rounded-full ">
                                <Heart />
                            </Pressable>
                        </View>
                    </View>
                    <Image style={{ width: 90, height: 80 }} className='w-9 h-9' source={require("@/assets/svg/products/lipstick.svg")} />
                </View>
                <View className="gap-2 mt-2">
                    <View>
                        <Text className="font-jakarta-semibold text-body" numberOfLines={1}>Vitamin C Glow Serum</Text>
                        <Text className="text-body">Brightening . 30ml</Text>
                    </View>
                    {showRating && <View className="flex-row items-center gap-1">
                        <Star fill={"#eea81e"} color={"#eea81e"} />
                        <Text className="font-semibold text-body">4.8</Text>
                        <Text className="text-body">(1.2k)</Text>
                    </View>}

                    <View className="flex-row justify-between items-center">
                        <Text className="text-xl font-jakarta-bold">{priceFormat(price)}</Text>

                        <Pressable className="bg-brand p-3 rounded-pill">
                            <Plus color={"#fff"} />
                        </Pressable>
                    </View>
                </View>
            </View>
        </Pressable>
    )
}

export default ProductCard

const styles = StyleSheet.create({})