import { Stack } from 'expo-router'
import { StyleSheet } from 'react-native'

const AppLayout = () => {
    return (
        <Stack screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name='(tabs)' />
            <Stack.Screen name='(modal)' />
        </Stack>
    )
}

export default AppLayout

const styles = StyleSheet.create({})