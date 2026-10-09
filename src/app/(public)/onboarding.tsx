import SkinQuizOnboarding from '@/components/ui/Onboarding';
import { StyleSheet } from 'react-native';

const Onboarding = () => {
    return (
        <SkinQuizOnboarding
            onFinish={(answers) => {
                // Save to your store / backend, then navigate to the shop
                console.log('Quiz answers', answers);
            }}
        />
    )
}

export default Onboarding

const styles = StyleSheet.create({})