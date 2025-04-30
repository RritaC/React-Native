import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const Comments = () => {
    const [comments, setComments] = useState([]);

    const fetchComments = async () => {
        const response = await fetch("https://jsonplaceholder.typicode.com/comments");
        const data = await response.json();
        setComments(data);
    };

    useEffect(() => {
        fetchComments();
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={comments}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.email}>{item.email}</Text>
                        <Text style={styles.body}>{item.body}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#f9f9f9',
        flex: 1,
    },
    card: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
        color: '#333',
    },
    email: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 6,
        color: '#555',
    },
    body: {
        fontSize: 14,
        color: '#666',
    },
});

export default Comments;
