// screens/UserSettingsScreen.js
import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Header from '../components/Header';

export default function UserSettingsScreen({ navigation }) {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const toggleTheme = () => setIsDarkTheme(prev => !prev);
  const toggleNotifications = () => setNotificationsEnabled(prev => !prev);

  const handleChangePassword = () => {
    Alert.alert('Change Password', 'This would open change password flow.');
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Confirm logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: () => Alert.alert('Logged out') },
    ]);
  };

  return (
    <View style={[styles.container, isDarkTheme && styles.darkBackground]}>
      <Header userName="Jane Doe" userImage={null} navigation={navigation} />

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isDarkTheme && styles.darkText]}>Profile</Text>
          <Text style={[styles.profileText, isDarkTheme && styles.darkText]}>Name: Jane Doe</Text>
          <Text style={[styles.profileText, isDarkTheme && styles.darkText]}>Email: jane.doe@example.com</Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isDarkTheme && styles.darkText]}>Appearance</Text>
          <View style={styles.row}>
            <Text style={[styles.label, isDarkTheme && styles.darkText]}>Dark Theme</Text>
            <Switch value={isDarkTheme} onValueChange={toggleTheme} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isDarkTheme && styles.darkText]}>Notifications</Text>
          <View style={styles.row}>
            <Text style={[styles.label, isDarkTheme && styles.darkText]}>Enable Notifications</Text>
            <Switch value={notificationsEnabled} onValueChange={toggleNotifications} />
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
          <Text style={[styles.buttonText, styles.logoutText]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF3E0' },
  darkBackground: { backgroundColor: '#222' },
  content: { padding: 20, flex: 1 },
  section: { marginBottom: 30 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 10, color: '#333' },
  darkText: { color: '#eee' },
  profileText: { fontSize: 16, marginBottom: 4, color: '#555' },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  label: { fontSize: 16, color: '#555' },
  button: {
    paddingVertical: 14,
    borderRadius: 10,
    backgroundColor: '#FF7043',
    marginBottom: 15,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  logoutButton: { backgroundColor: '#fff', borderWidth: 2, borderColor: '#FF5252' },
  logoutText: { color: '#FF5252' },
});
