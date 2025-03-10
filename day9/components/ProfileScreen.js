import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const ProfileScreen = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>

            <View style={styles.studentInfoContainer}>
                <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8fDA%3D' }}
                    style={styles.profileImage}
                />
                <Text style={styles.fullname}>Jane Smith</Text>
                <Text style={styles.position}>Software Engineer</Text>
                <Text style={styles.description}>
                    Passionate about building mobile and web applications.
                </Text>
            </View>


            <Text style={styles.projectsTitle}>Projects</Text>
            <View style={styles.projectsContainer}>
                <View style={styles.projectItem}>
                    <Image
                        source={{ uri: 'https://dp-cdn.codementor.io/images/home/image-projects.png' }}
                        style={styles.projectImage}
                    />
                    <Text style={styles.projectTitle}>Cryptocurrency Insights</Text>
                    <Text style={styles.projectDescription}>
                        A project about Cryptocurrency and its importance.
                    </Text>
                </View>

                <View style={styles.projectItem}>
                    <Image
                        source={{ uri: 'https://miro.medium.com/v2/resize:fit:1358/1*kxPtSSQlzeLckpKqGssEyg.png' }}
                        style={styles.projectImage}
                    />
                    <Text style={styles.projectTitle}>App Ecosystem</Text>
                    <Text style={styles.projectDescription}>
                        A collection of apps built with React-Native.
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
    },
    studentInfoContainer: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 20,
        elevation: 2,
        width: '100%',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    fullname: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    position: {
        fontSize: 16,
        color: 'gray',
    },
    description: {
        fontSize: 14,
        textAlign: 'center',
        marginTop: 5,
    },
    projectsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    projectsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    projectItem: {
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        margin: 10,
        elevation: 2,
        width: 220,
    },
    projectImage: {
        width: 200,
        height: 150,
        borderRadius: 10,
        marginBottom: 10,
    },
    projectTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 5,
    },
    projectDescription: {
        fontSize: 14,
        textAlign: 'center',
        color: '#666',
    },
});

export default ProfileScreen;
