// // App.js

// import React from 'react';
// import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import RootNavigator from './navigation/RootNavigator';
// import { FilterProvider } from './contexts/FilterContext';
// import { SearchProvider } from './contexts/SearchContext';
// import { FavoritesProvider } from './contexts/FavoritesContext';
// import Header from './components/Header';

// export default function App() {
//   return (
//     <SearchProvider>
//       <FilterProvider>
//         <FavoritesProvider>
//           <SafeAreaView style={styles.container}>
//             <StatusBar barStyle="light-content" backgroundColor="#FF7043" />
//             <Header />
//             <NavigationContainer>
//               <RootNavigator />
//             </NavigationContainer>
//           </SafeAreaView>
//         </FavoritesProvider>
//       </FilterProvider>
//     </SearchProvider>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#FFF3E0' },
// });
import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './navigation/RootNavigator';
import { FilterProvider } from './contexts/FilterContext';
import { SearchProvider } from './contexts/SearchContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import Header from './components/Header';
import UserSettingsScreen from './screens/UserSettingsScreen';

export default function App() {
  return (
    <SearchProvider>
      <FilterProvider>
        <FavoritesProvider>
          <NavigationContainer>
            <View style={styles.container}>
              <StatusBar barStyle="light-content" backgroundColor="#FF7043" />
              <Header
                userName="Alice"
                userImage="https://images.unsplash.com/photo-1494790108377-be9c29b29330?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
                onProfilePress={() => navigation.navigate('UserSettingsScreen')}
              />
              <RootNavigator />
            </View>
          </NavigationContainer>
        </FavoritesProvider>
      </FilterProvider>
    </SearchProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF3E0' },
});
