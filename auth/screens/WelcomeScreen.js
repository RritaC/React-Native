import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native"

const Welcome = () => {
    const route = useRoute()
    const { username } = route.params
    return (
        <View>
            <Text>Welcome Back,{username} !</Text>
        </View>
    )
}

export default Welcome; 
