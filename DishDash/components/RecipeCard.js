import React, { useContext } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { FavoritesContext } from '../contexts/FavoritesContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function RecipeCard({ recipe, onPress }) {
  const { isFavorite, toggleFavorite } = useContext(FavoritesContext);
  const favorited = isFavorite(recipe.id);

  const scale = React.useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(scale, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableWithoutFeedback onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut}>
      <Animated.View style={[styles.card, { transform: [{ scale }] }]}>
        <ImageBackground source={{ uri: recipe.image }} style={styles.image} imageStyle={{ borderRadius: 15 }}>
          <View style={styles.overlay}>
            <Text style={styles.title} numberOfLines={2}>
              {recipe.name}
            </Text>

            <View style={styles.badges}>
              <View style={styles.badge}>
                <MaterialCommunityIcons name="chef-hat" size={14} color="white" />
                <Text style={styles.badgeText}>{recipe.difficulty}</Text>
              </View>
              <View style={styles.badge}>
                <MaterialCommunityIcons name="timer-sand" size={14} color="white" />
                <Text style={styles.badgeText}>{recipe.cookingTime} min</Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => toggleFavorite(recipe.id)}
              style={styles.heartButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <MaterialCommunityIcons
                name={favorited ? 'heart' : 'heart-outline'}
                size={28}
                color={favorited ? '#FF5252' : 'white'}
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    height: 220,
    borderRadius: 15,
    backgroundColor: '#eee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    padding: 12,
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'relative',
  },
  title: {
    color: 'white',
    fontWeight: '700',
    fontSize: 18,
  },
  badges: {
    marginTop: 6,
    flexDirection: 'row',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF7043',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginRight: 8,
  },
  badgeText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 12,
    marginLeft: 4,
  },
  heartButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});
