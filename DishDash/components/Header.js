// // components/Header.js
// import React from 'react';
// import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

// export default function Header({ userName = 'Guest', userImage, onProfilePress }) {
//   return (
//     <View style={styles.container}>
//       <View style={styles.left}>
//         <Text style={styles.title}>xDishDash</Text>
//       </View>
//       <TouchableOpacity
//         style={styles.right}
//         onPress={onProfilePress}  // <-- call the handler passed as prop
//       >
//         {userImage ? (
//           <Image source={{ uri: userImage }} style={styles.avatar} />
//         ) : (
//           <View style={styles.avatarPlaceholder}>
//             <Text style={styles.avatarText}>{userName[0]}</Text>
//           </View>
//         )}
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     height: 60,
//     paddingHorizontal: 16,
//     backgroundColor: '#FF7043',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     elevation: 4,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 2 },
//   },
//   left: { flexDirection: 'row', alignItems: 'center' },
//   title: { fontSize: 24, fontWeight: 'bold', color: 'white' },
//   right: {},
//   avatar: { width: 40, height: 40, borderRadius: 20 },
//   avatarPlaceholder: {
//     backgroundColor: '#FFF3E0',
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   avatarText: { fontSize: 18, fontWeight: 'bold', color: '#FF7043' },
// });

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Header({ userName = 'Guest', userImage, onProfilePress }) {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <MaterialCommunityIcons name="silverware-fork-knife" size={28} color="white" style={{ marginRight: 8 }} />
        <Text style={styles.title}>DishDash</Text>
      </View>
      <TouchableOpacity
        style={styles.right}
        onPress={onProfilePress}
        activeOpacity={0.7}
      >
        {userImage ? (
          <Image source={{ uri: userImage }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>{userName[0].toUpperCase()}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FF7043',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 6,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  left: { flexDirection: 'row', alignItems: 'center' },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 1,
  },
  right: {
    borderRadius: 22,
    overflow: 'hidden',
    elevation: 6, // android shadow around avatar
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: 'white',
  },
  avatarPlaceholder: {
    backgroundColor: 'white',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FF7043',
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF7043',
  },
});
