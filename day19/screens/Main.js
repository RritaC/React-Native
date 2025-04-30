import React from "react";
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import Swiper from 'react-native-swiper'

//const { width, height } = Dimensions.get("windows")

const Main = () => {
    return (
        <Swiper>
            <View style={styles.slide1}>
                <Text style={styles.text}>HI I AM SLIDE 1</Text>
                <Image source={require('../assets/foto1.jpg')} style={styles.image} />
            </View>
            <View style={styles.slide2}>
                <Text style={styles.text}>HI I AM SLIDE 2</Text>
                <Image source={require('../assets/foto2.jpg')} style={styles.image} />
            </View>
            <View style={styles.slide3}>
                <Text style={styles.text}>HI I AM SLIDE 3</Text>
                <Image source={require('../assets/foto3.png')} style={styles.image} />
            </View>
        </Swiper>
    )

}

const styles = StyleSheet.create({
    wrapper: {

    },
    image: {
        width: 500,    
        height: 250,
        marginRight: 15,
    },
    slide1: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#9DD6EB"
    },
    slide2: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#97CAE5"
    },
    slide3: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#92BBD9"
    },
    text: {
        color: "#fff",
        fontSize: 30,
        fontWeight: "bold"
    }
})

export default Main