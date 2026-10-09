import GradientScreen from '@/components/ui/GradientScreen'
import { BellDotIcon, BoxIcon, ChevronRightIcon, CircleQuestionMarkIcon, CreditCardIcon, MapPinIcon } from 'lucide-react-native'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'

const Profile = () => {
    return (
        <GradientScreen colors={['#FFE4D2', '#e6ddd8', '#FFFFFF']}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View className='flex-row items-center justify-between'>
                    <Text className='text-brand text-headline font-jakarta-bold'>Profile</Text>

                    {/* <Pressable className='bg-peach-50 p-3 rounded-pill'>
                        <HeartIcon className='w-8 h-8' />
                    </Pressable> */}
                </View>

                {/* Profile Avatart */}

                <View className='w-28 h-28 bg-brand-muted border-4 self-center my-6 border-canvas rounded-full items-center justify-center'>
                    <Text className='font-jakarta-bold text-[45px] text-canvas'>A</Text>
                </View>

                <View className='items-center'>
                    <Text className='text-headline font-jakarta-bold'>Amara Okafor</Text>
                    <Text className='text-brand text-body font-jakarta'>amara@email.com · Member since 2026</Text>
                </View>

                {/* Skin Profile */}
                <View className='my-4 bg-peach-100 p-4 rounded-card'>
                    <View>
                        <Text className='text-h3 text-brand font-jakarta-bold'>My skin profile</Text>
                    </View>
                    <View className='flex-row flex-wrap gap-2 my-3'>
                        <Text className='text-body text-brand font-jakarta-semibold bg-peach-50 p-2 rounded-pill '>Combination</Text>
                        <Text className='text-body text-brand font-jakarta-semibold bg-peach-50 p-2 rounded-pill '>Deep Brown</Text>
                        <Text className='text-body text-brand font-jakarta-semibold bg-peach-50 p-2 rounded-pill '>Warm</Text>
                        <Text className='text-body text-brand font-jakarta-semibold bg-peach-50 p-2 rounded-pill '>Dark spots</Text>
                    </View>
                </View>

                {/* Menu Section */}

                <View className='gap-3'>
                    <Pressable>
                        <View className='flex-row items-center gap-3'>
                            <View className='bg-peach-100 p-4 rounded-pill'>
                                <BoxIcon className="w-10 h-10 " />
                            </View>
                            <View className='flex-row flex-1 items-center justify-between mr-5 '>
                                <Text className='text-h3 font-jakarta-bold'>My Orders</Text>
                                <Text className='p-2 rounded-pill text-h3 bg-brand text-peach-50'>1</Text>
                            </View>

                            <ChevronRightIcon className='w-8 h-8' />
                        </View>
                    </Pressable>
                    <Pressable>
                        <View className='flex-row items-center gap-3'>
                            <View className='bg-peach-100 p-4 rounded-pill'>
                                <MapPinIcon className="w-10 h-10 " />
                            </View>
                            <View className='flex-row flex-1 items-center justify-between mr-5 '>
                                <Text className='text-h3 font-jakarta-bold'>Saved Addresses</Text>
                            </View>

                            <ChevronRightIcon className='w-8 h-8' />
                        </View>
                    </Pressable>
                    <Pressable>
                        <View className='flex-row items-center gap-3'>
                            <View className='bg-peach-100 p-4 rounded-pill'>
                                <CreditCardIcon className="w-10 h-10 " />
                            </View>
                            <View className='flex-row flex-1 items-center justify-between mr-5 '>
                                <Text className='text-h3 font-jakarta-bold'>Payment Methods</Text>
                            </View>

                            <ChevronRightIcon className='w-8 h-8' />
                        </View>
                    </Pressable>
                    <Pressable>
                        <View className='flex-row items-center gap-3'>
                            <View className='bg-peach-100 p-4 rounded-pill'>
                                <BellDotIcon className="w-10 h-10 " />
                            </View>
                            <View className='flex-row flex-1 items-center justify-between mr-5 '>
                                <Text className='text-h3 font-jakarta-bold'>Notifications</Text>
                            </View>

                            <ChevronRightIcon className='w-8 h-8' />
                        </View>
                    </Pressable>
                    <Pressable>
                        <View className='flex-row items-center gap-3'>
                            <View className='bg-peach-100 p-4 rounded-pill'>
                                <CircleQuestionMarkIcon className="w-10 h-10 " />
                            </View>
                            <View className='flex-row flex-1 items-center justify-between mr-5 '>
                                <Text className='text-h3 font-jakarta-bold'>Help & Supports</Text>
                            </View>

                            <ChevronRightIcon className='w-8 h-8' />
                        </View>
                    </Pressable>
                </View>

                {/* Actions */}

                <View className='my-7 items-center'>
                    <Pressable>
                        <Text className='underline font-bold text-h3'>Sign out</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </GradientScreen>
    )
}

export default Profile

const styles = StyleSheet.create({})