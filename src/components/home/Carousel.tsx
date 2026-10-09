import { LinearGradient } from 'expo-linear-gradient'
import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import Swiper from "react-native-swiper"

const Carousel = () => {
    const data = [
        {
            title: "Ship your package with ease",
            img: require('@/assets/images/icon.png') // replace with your image
        },
        {
            title: "Fast & Reliable",
            img: require('@/assets/images/icon.png') // replace with your image
        },
        {
            title: "Local & Interstate Delievery",
            img: require('@/assets/images/icon.png') // replace with your image
        }
    ]
    return (
        <View className='bg-brand h-48 my-5 rounded-hero overflow-hidden'>
            <Swiper activeDotStyle={{ width: 20 }} activeDotColor='#ffffff' dotColor='#fff' autoplay loop={true}>
                {data.map((detail, index) => (
                    <ImageBackground key={index} source={detail.img} style={styles.slide} imageStyle={styles.image}>
                        <LinearGradient
                            colors={["rgba(0,0,0,0.7)", "rgba(0,0,0,0.1)"]}
                            style={styles.gradient}
                        >
                            <Text style={styles.title}>{detail.title}</Text>
                        </LinearGradient>
                    </ImageBackground>
                ))}
            </Swiper>
        </View>
    )
}

export default Carousel

const styles = StyleSheet.create({
    wrapper: {
        height: 40, // or hp(25) if using responsive helpers
        width: "100%",
        backgroundColor: "#fff",
        overflow: 'hidden',
        borderRadius: 10,
    },
    slide: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        height: "100%",
        width: '100%',
    },
    image: {
        resizeMode: 'cover',
        borderRadius: 10,
    },
    gradient: {
        width: '100%',
        height: '100%',
        paddingVertical: 5,
        alignItems: 'center',
        justifyContent: "center",
        position: 'absolute',
        bottom: 0,
        left: 0,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    title: {
        fontFamily: "Inter-Bold",
        fontSize: 12,
        color: '#fff',
        textAlign: 'center',
        paddingHorizontal: 16,
        marginBottom: 4
    }
})