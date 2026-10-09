import { Pressable, StyleSheet, Text, View } from 'react-native';

type HomeSectionHeaderProps = {
    title: string;
    badgeText?: string;
    showBadgeText?: boolean;
    showAllFn?: () => void;
    showAll?: boolean;
}

const HomeSectionHeader = ({ title, badgeText, showBadgeText = false, showAllFn, showAll = true }: HomeSectionHeaderProps) => {
    return (
        <View className="flex-row item-center justify-between my-3">
            <View className='flex-row gap-2 items-center'>
                <Text className='font-jakarta-bold text-xl text-brand'>{title}</Text>
                {showBadgeText && <Text className='bg-sage py-1 px-2 text-micro rounded-pill'>{badgeText}</Text>}
            </View>

            {showAll && <Pressable onPress={showAllFn}>
                <Text className='underline font-jakarta-semibold text-body'>Show all</Text>
            </Pressable>}
        </View>
    )
}

export default HomeSectionHeader

const styles = StyleSheet.create({})