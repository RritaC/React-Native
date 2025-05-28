import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import RecipeCard from '../components/RecipeCard';
import { FavoritesContext } from '../contexts/FavoritesContext';
import recipesData from '../data/recipes.json';

export default function FavoritesScreen({ navigation }) {
  const { favoriteIds } = useContext(FavoritesContext);

  const favoriteRecipes = recipesData.filter(recipe => favoriteIds.includes(recipe.id));

  const handleRecipePress = (recipe) => {
    navigation.navigate('RecipeDetails', { recipeId: recipe.id, recipeName: recipe.name });
  };
  

  if (favoriteRecipes.length === 0) {
    return (
      <SafeAreaView style={styles.emptyContainer}>
        <Text style={styles.emptyEmoji}>💖</Text>
        <Text style={styles.emptyText}>You have no favorite recipes yet.</Text>
        <Text style={styles.emptySubText}>Tap the heart icon on any recipe to save it here!</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Your Favorite Recipes</Text>
      <FlatList
        data={favoriteRecipes}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <RecipeCard recipe={item} onPress={() => handleRecipePress(item)} />
        )}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 12,
  },

  header: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FF7043',
    paddingVertical: 16,
    textAlign: 'center',
  },

  listContent: {
    paddingBottom: 60,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 20,
  },

  emptyEmoji: {
    fontSize: 80,
    marginBottom: 16,
  },

  emptyText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#555',
    marginBottom: 8,
    textAlign: 'center',
  },

  emptySubText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
});
