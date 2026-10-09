import { Stack } from 'expo-router'
import { StyleSheet } from 'react-native'

const PublicLayout = () => {
    return (
        <Stack screenOptions={{ headerShown: false }}>

            <Stack.Screen name='signin' options={{ headerShown: false }} />
            <Stack.Screen name='signup' options={{ headerShown: false }} />
            <Stack.Screen name='onboarding' options={{ headerShown: false }} />
        </Stack>
    )
}

export default PublicLayout

const styles = StyleSheet.create({})