import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const MenuScreen = ({ navigation }) => {
    return (
        <View>
            <Text style={styles.container}>
                Welcome to the menu
            </Text>
            <Button
                title='Go to student page'
                onPress={() => navigation.navigate('Student')}
            />
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    text: {
        fontSize: 18,
        marginBottom: 20,
        fontWeight: 'bold',
        color: '#333',
    }
});

export default MenuScreen;