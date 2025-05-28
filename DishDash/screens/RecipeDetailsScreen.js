import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import recipesData from '../data/recipes.json';

export default function RecipeDetailsScreen({ route }) {
  const { recipeId } = route.params;

  const recipe = recipesData.find(r => r.id === recipeId);

  if (!recipe) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Recipe not found!</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
      <Image source={{ uri: recipe.image }} style={styles.image} />

      <View style={styles.contentCard}>
        <Text style={styles.title}>{recipe.name}</Text>

        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <MaterialCommunityIcons name="chef-hat" size={20} color="#FF7043" />
            <Text style={styles.infoText}>{recipe.cuisine}</Text>
          </View>
          <View style={styles.infoItem}>
            <MaterialCommunityIcons name="chart-bar" size={20} color="#FF7043" />
            <Text style={styles.infoText}>{recipe.difficulty}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <MaterialCommunityIcons name="timer-sand" size={20} color="#FF7043" />
            <Text style={styles.infoText}>{recipe.cookingTime} min</Text>
          </View>
          <View style={styles.infoItem}>
            <MaterialCommunityIcons name="account-group" size={20} color="#FF7043" />
            <Text style={styles.infoText}>{recipe.servings} servings</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Ingredients</Text>
        <View style={styles.listContainer}>
          {recipe.ingredients.map((ingredient, idx) => (
            <Text key={idx} style={styles.listItem}>• {ingredient}</Text>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Instructions</Text>
        <View style={styles.listContainer}>
          {recipe.instructions.map((step, idx) => (
            <Text key={idx} style={styles.listItem}>
              {idx + 1}. {step}
            </Text>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF3E0',
    flex: 1,
  },
  image: {
    width: '100%',
    height: 280,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  contentCard: {
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginTop: -40,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF7043',
    marginBottom: 18,
    textAlign: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoText: {
    fontSize: 16,
    color: '#555',
    marginLeft: 6,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FF7043',
    marginBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: '#FFCCBC',
    paddingBottom: 6,
  },
  listContainer: {
    marginBottom: 24,
    paddingLeft: 12,
  },
  listItem: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    lineHeight: 24,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});
