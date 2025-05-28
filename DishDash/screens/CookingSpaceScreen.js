import React, { useState } from 'react';
import {
  View, Text, Image, StyleSheet, ScrollView, Dimensions,
  Alert, TouchableOpacity, FlatList
} from 'react-native';
import { INGREDIENT_CATEGORIES } from '../data/ingredients';
import { OPENAI_API_KEY } from '@env';


const SCREEN_WIDTH = Dimensions.get('window').width;

export default function CookingSpaceScreen() {
  const [addedIngredients, setAddedIngredients] = useState([]);
  const [generatedRecipes, setGeneratedRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const cook = async () => {
    if (addedIngredients.length === 0) {
      Alert.alert('Add some ingredients first!');
      return;
    }
    setLoading(true);
    const ingredientNames = addedIngredients.map(i => i.name);
    const prompt = `I have these ingredients: ${ingredientNames.join(', ')}. Suggest 3 easy recipes I can cook using them, with short descriptions and instructions formatted in markdown as follows:
// ## Recipe title
// - Ingredients:
// - ingredient 1
// - ingredient 2
// - Instructions:
// 1. step one
// 2. step two`;

    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ${OPENAI_API_KEY}',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 800,
        }),
      });

      const data = await res.json();
      const parsed = parseRecipes(data.choices[0].message.content);
      setGeneratedRecipes(parsed);
    } catch (err) {
      Alert.alert('Error: ' + err.message);
    }
    setLoading(false);
  };

  const parseRecipes = (text) => {
    const blocks = text.split('## ').filter(b => b.trim() !== '');
    return blocks.map(block => {
      const lines = block.trim().split('\n').map(l => l.trim());
      const title = lines[0];
      const ingIndex = lines.findIndex(l => l.toLowerCase().startsWith('- ingredients'));
      const instIndex = lines.findIndex(l => l.toLowerCase().startsWith('- instructions'));
      const ingredients = [];
      const instructions = [];
      if (ingIndex !== -1 && instIndex !== -1) {
        for (let i = ingIndex + 1; i < instIndex; i++) {
          if (lines[i].startsWith('-')) ingredients.push(lines[i].replace(/^- /, ''));
        }
        for (let i = instIndex + 1; i < lines.length; i++) {
          if (/^\d+\./.test(lines[i])) instructions.push(lines[i]);
        }
      }
      return { title, ingredients, instructions };
    });
  };

  const renderColumn = (label, ingredients) => (
    <View style={styles.column}>
      <Text style={styles.label}>{label}</Text>
      <ScrollView style={styles.scrollColumn} contentContainerStyle={{ alignItems: 'center' }}>
        {ingredients.map(item => (
          <TouchableOpacity
            key={item.id}
            onPress={() => {
              setAddedIngredients(prev => [...prev, item]);
              setGeneratedRecipes([]);
            }}
            style={styles.ingredientBox}
          >
            <Image source={item.uri} style={styles.icon} />
            <Text style={styles.itemText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.ingredientColumns}>
        {renderColumn('Vegetables', INGREDIENT_CATEGORIES[0].ingredients)}
        {renderColumn('Fruits', INGREDIENT_CATEGORIES[1].ingredients)}
        {renderColumn('Meat', INGREDIENT_CATEGORIES[2].ingredients)}
        {renderColumn('Spices', INGREDIENT_CATEGORIES[5].ingredients)}
        {renderColumn('Grains', INGREDIENT_CATEGORIES[4].ingredients)}
      </View>

      <View style={styles.board}>
        <Text style={styles.boardLabel}>Cooking Board</Text>
        <View style={styles.boardSpace}>
          {addedIngredients.map((item, index) => (
            <Image key={item.id + index} source={item.uri} style={styles.icon} />
          ))}
        </View>
        <TouchableOpacity style={styles.aiButton} onPress={cook} disabled={loading}>
          <Text style={styles.aiText}>{loading ? 'Cooking...' : 'AI'}</Text>
        </TouchableOpacity>
      </View>

      {generatedRecipes.length > 0 && (
        <View style={styles.recipeArea}>
          <Text style={styles.recipeTitle}>AI GENERATED RECIPES</Text>
          <FlatList
            data={generatedRecipes}
            keyExtractor={(_, i) => i.toString()}
            numColumns={3}
            columnWrapperStyle={{ justifyContent: 'space-around' }}
            renderItem={({ item }) => (
              <View style={styles.recipeCard}>
                <Text style={styles.recipeCardTitle}>{item.title}</Text>
                <Text style={styles.recipeHeader}>Ingredients:</Text>
                {item.ingredients.map((line, idx) => (
                  <Text key={idx} style={styles.recipeText}>• {line}</Text>
                ))}
                <Text style={styles.recipeHeader}>Instructions:</Text>
                {item.instructions.map((step, idx) => (
                  <Text key={idx} style={styles.recipeText}>{step}</Text>
                ))}
              </View>
            )}
          />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF3E0', padding: 10 },
  ingredientColumns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  column: { width: 90 },
  scrollColumn: { height: 280 },
  label: { textAlign: 'center', fontWeight: 'bold', color: '#5D4037', marginBottom: 6 },
  ingredientBox: { alignItems: 'center', marginBottom: 12 },
  itemText: { fontSize: 12, textAlign: 'center', color: '#333', marginTop: 4 },
  icon: {
    width: 60,
    height: 60,
    backgroundColor: 'transparent',
    resizeMode: 'contain',
    marginBottom: 4,
  },
  board: {
    backgroundColor: '#E0D7D2',
    borderRadius: 20,
    alignItems: 'center',
    padding: 16,
    marginHorizontal: 8,
    marginBottom: 20,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  boardLabel: { fontSize: 18, fontWeight: 'bold', color: '#3E2723', marginBottom: 10 },
  boardSpace: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
    minHeight: 100,
  },
  aiButton: {
    backgroundColor: '#5D4037',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 22,
    marginTop: 12,
  },
  aiText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  recipeArea: {
    paddingBottom: 40,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
    color: '#BF360C',
  },
  recipeCard: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 14,
    margin: 10,
    width: SCREEN_WIDTH / 3.4,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  recipeCardTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 6, color: '#BF360C' },
  recipeHeader: { fontWeight: 'bold', marginTop: 10, marginBottom: 4, color: '#5D4037' },
  recipeText: { fontSize: 13, color: '#333', marginLeft: 6, marginBottom: 2 },
});
