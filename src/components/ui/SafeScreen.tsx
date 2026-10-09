import { cn } from '@/libs/utils'
import { ComponentProps } from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

type SafeScreenProps = ComponentProps<typeof SafeAreaView>

const SafeScreen = ({ className, ...props }: SafeScreenProps) => {
    return (
        <SafeAreaView className={cn("flex-1 bg-canvas p-4", className)} {...props} />
    )
}

export default SafeScreen

const styles = StyleSheet.create({})