import GradientScreen from '@/components/ui/GradientScreen';
import { Checkbox, Host } from '@expo/ui/jetpack-compose';
import { router } from 'expo-router';
import { Eye, EyeOff, LockIcon, MailIcon, UserIcon } from "lucide-react-native";
import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';


const Signup = () => {
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [agreeTandPP, setagreeTandPP] = useState(true)
    return (
        <GradientScreen
            colors={['#FFD6BF', '#FFEADF', '#FFFFFF']}
            locations={[0, 0.35, 0.7]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            edges={['top', 'bottom', 'left', 'right']}
            statusBarStyle="dark"
        >
            <View className='flex-row  items-center gap-3'>
                <Image resizeMode='contain' className='w-12 h-12 rounded-full' source={require("@/assets/images/icon.png")} />
                <Text className='text-title font-jakarta-bold'>Lume</Text>
            </View>

            <View className='flex-1 my-6 gap-2'>
                <View className=''>
                    <Text className='font-jakarta-bold text-display'>Create Account</Text>
                </View>

                {/* Form */}
                <View className='flex-1 my-5 gap-2'>
                    <View>
                        <Text className='text-body font-jakarta-bold'>Full name</Text>
                        <View className='flex-row items-center gap-2 px-5  focus-within:bg-canvas border-2 border-brand rounded-pill p-2 my-2'>
                            <UserIcon className='fill-brand' />
                            <TextInput autoFocus={false} placeholderTextColor={"#2B1304"} className='flex-w min-w-0 active' numberOfLines={1} placeholder='Amara Okafor' />
                        </View>
                    </View>
                    <View>
                        <Text className='text-body font-jakarta-bold'>Email</Text>
                        <View className='flex-row items-center gap-2 px-5  focus-within:bg-canvas border-2 border-brand rounded-pill p-2 my-2'>
                            <MailIcon className='fill-brand' />
                            <TextInput autoFocus={false} placeholderTextColor={"#2B1304"} className='flex-w min-w-0 active' numberOfLines={1} placeholder='amara@email.com' />
                        </View>
                    </View>
                    <View>
                        <Text className='text-body font-jakarta-bold'>Password</Text>
                        <View className='flex-row items-center gap-2 px-5  focus-within:bg-canvas border-2 border-brand rounded-pill p-2 my-2'>
                            <LockIcon className='fill-brand' />
                            <TextInput secureTextEntry={passwordVisible} autoFocus={false} placeholderTextColor={"#2B1304"} className='flex-1 min-w-0 active' numberOfLines={1} placeholder='amara@email.com' />
                            {!passwordVisible ? <Eye onPress={() => setPasswordVisible(true)} /> :
                                <EyeOff onPress={() => setPasswordVisible(false)} />
                            }

                        </View>
                    </View>
                    <Pressable className='flex-row items-center gap-1'>
                        <Host matchContents>
                            <Checkbox colors={{
                                checkedColor: "#2B1304",
                                checkmarkColor: "#FFFFFF",

                            }} value={agreeTandPP} onCheckedChange={setagreeTandPP} />
                        </Host>
                        <Text>I agree to the</Text>
                        <Text className='font-jakarta-bold text-body'>Terms</Text>
                        <Text>and</Text>
                        <Text className='font-jakarta-bold text-body '>Privacy Policy</Text>
                    </Pressable>

                    <Pressable className='bg-brand rounded-pill p-5 justify-center items-center my-4 active:bg-brand-soft '>
                        <Text className='text-canvas text-body font-jakarta-bold'>Create Account</Text>
                    </Pressable>

                    <View className="flex-row items-center w-full">
                        <View className="flex-1 h-[1px] bg-line" />

                        <Text className="px-3 text-[12px] text-[#8B7A70]">
                            or signup with
                        </Text>

                        <View className="flex-1 h-[1px] bg-line" />
                    </View>

                    <Pressable className='group flex-row items-center gap-3 border-2 border-peach-100 active:bg-brand active:border-brand rounded-pill p-5 justify-center items-center my-4'>
                        <Image source={require("@/assets/icons/google.png")} className='w-7 h-7' />
                        <Text className='text-brand group-active:text-white text-body font-jakarta-bold'>Continue with Google</Text>
                    </Pressable>

                </View>

                {/* Sign in */}
                <View className='flex-row items-center justify-center gap-1'>
                    <Text>Already have an account?</Text>
                    <Pressable onPress={() => router.push("/(public)/signin")}>
                        <Text className='text-brand font-jakarta-bold underline'>Sign in</Text>
                    </Pressable>
                </View>
            </View>
        </GradientScreen>
    )
}

export default Signup

const styles = StyleSheet.create({})