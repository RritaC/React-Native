import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const ButtonScreen = () => {
    const [oddCounter, setOddCounter] = useState(1);
    const [evenCounter, setEvenCounter] = useState(0);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Button Screen</Text>

            <View style={styles.buttonContainer}>
                <Button
                    title='Click ME - EVEN'
                    color="purple"
                    onPress={() => setEvenCounter(evenCounter + 2)}
                />
                <Text style={styles.counterText}>Even Counter: {evenCounter}</Text>
            </View>

            <View style={styles.buttonContainer}>
                <Button
                    title='Click ME - ODD'
                    color="blue"
                    onPress={() => setOddCounter(oddCounter + 2)}
                />
                <Text style={styles.counterText}>Odd Counter: {oddCounter}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5', 
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
        color: '#333', 
    },
    buttonContainer: {
        width: '80%',
        marginBottom: 20,
        backgroundColor: '#fff', 
        padding: 15,
        borderRadius: 10, 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3, 
    },
    counterText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 10,
        color: '#555', 
    },
});

export default ButtonScreen;