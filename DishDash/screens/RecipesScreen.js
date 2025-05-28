import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import SearchBar from '../components/SearchBar';
import AdvancedFilterBar from '../components/AdvancedFilterBar';
import RecipeCard from '../components/RecipeCard';
import { SearchContext } from '../contexts/SearchContext';
import { FilterContext } from '../contexts/FilterContext';
import recipesData from '../data/recipes.json';

export default function RecipesScreen({ navigation }) {
  const { searchTerm, setSearchTerm } = useContext(SearchContext);
  const { filters } = useContext(FilterContext);

  const [filteredRecipes, setFilteredRecipes] = useState(recipesData);

  useEffect(() => {
    let filtered = recipesData;

    if (searchTerm) {
      filtered = filtered.filter(recipe =>
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (filters.cuisine) {
      filtered = filtered.filter(recipe => recipe.cuisine === filters.cuisine);
    }
    if (filters.difficulty) {
      filtered = filtered.filter(recipe => recipe.difficulty === filters.difficulty);
    }
    if (filters.diet && filters.diet !== 'None') {
      filtered = filtered.filter(recipe => recipe.diet === filters.diet);
    }
    if (filters.mealType) {
      filtered = filtered.filter(recipe => recipe.mealType === filters.mealType);
    }
    if (filters.cookingTime) {
      const [min, max] = {
        '<15 min': [0, 15],
        '15-30 min': [15, 30],
        '30-60 min': [30, 60],
        '>60 min': [60, Infinity],
      }[filters.cookingTime];

      filtered = filtered.filter(
        recipe => recipe.cookingTime >= min && recipe.cookingTime < max
      );
    }

    setFilteredRecipes(filtered);
  }, [searchTerm, filters]);

  const handleRecipePress = (recipe) => {
    navigation.navigate('RecipeDetails', { recipeId: recipe.id, recipeName: recipe.name });
  };


  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      <View style={styles.searchFilterContainer}>
        <SearchBar
          value={searchTerm}
          onChangeText={setSearchTerm}
          placeholder="Search recipes..."
        />
        <div></div>
        <View style={styles.filterBarWrapper}>
          <AdvancedFilterBar />
        </View>
      </View>

      <FlatList
        data={filteredRecipes}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <RecipeCard recipe={item} onPress={() => handleRecipePress(item)} />
        )}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<Text style={styles.noResults}>No recipes found.</Text>}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF3E0' },

  searchFilterContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: '#FFF3E0',
  },

  filterBarWrapper: {
    marginTop: 8,
    zIndex: 10,
    elevation: 10,
    backgroundColor: '#FFF3E0',
  },

  listContent: {
    paddingHorizontal: 8,
    paddingBottom: 50,
  },

  noResults: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 18,
    color: '#888',
  },
});
