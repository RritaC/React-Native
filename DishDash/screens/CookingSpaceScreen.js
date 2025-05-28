// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   Alert,
//   ScrollView,
//   FlatList,
//   Dimensions,
// } from 'react-native';
// import { INGREDIENT_CATEGORIES } from '../data/ingredients';

// const SCREEN_WIDTH = Dimensions.get('window').width;

// export default function CookingSpaceScreen() {
//   const [addedIngredients, setAddedIngredients] = useState([]);
//   const [generatedRecipes, setGeneratedRecipes] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Flatten ingredients
//   const allIngredients = INGREDIENT_CATEGORIES.flatMap(cat => cat.ingredients);

//   // Distribute ingredients into 4 columns evenly
//   const columns = [[], [], [], []];
//   allIngredients.forEach((ingredient, i) => {
//     columns[i % 4].push(ingredient);
//   });

//   const isSelected = (id) => addedIngredients.some(i => i.id === id);

//   const addIngredient = (ingredient) => {
//     if (!isSelected(ingredient.id)) {
//       setAddedIngredients(prev => [...prev, ingredient]);
//       setGeneratedRecipes([]);
//     }
//   };

//   const removeIngredient = (ingredient) => {
//     setAddedIngredients(prev => prev.filter(i => i.id !== ingredient.id));
//     setGeneratedRecipes([]);
//   };

//   const cook = async () => {
//     if (addedIngredients.length === 0) {
//       Alert.alert('Add some ingredients first!');
//       return;
//     }
//     setLoading(true);
//     setGeneratedRecipes([]);

//     // Build prompt with selected ingredients
//     const ingredientNames = addedIngredients.map(i => i.name);
//     const prompt = `I have these ingredients: ${ingredientNames.join(', ')}. Suggest 3 easy recipes I can cook using them, with short descriptions and instructions formatted in markdown as follows:
// ## Recipe title
// - **Ingredients:**
// - ingredient 1
// - ingredient 2
// - **Instructions:**
// 1. step one
// 2. step two`;

//     try {
//       const response = await fetch('https://api.openai.com/v1/chat/completions', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer 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`,
//         },
//         body: JSON.stringify({
//           model: 'gpt-3.5-turbo',
//           messages: [{ role: 'user', content: prompt }],
//           max_tokens: 800,
//           temperature: 0.7,
//         }),
//       });

//       const data = await response.json();

//       if (data.choices && data.choices.length > 0) {
//         const recipesText = data.choices[0].message.content;
//         const parsed = parseRecipes(recipesText);
//         setGeneratedRecipes(parsed);
//       } else {
//         setGeneratedRecipes([]);
//       }
//     } catch (error) {
//       Alert.alert('Error fetching recipes: ' + error.message);
//     }
//     setLoading(false);
//   };

//   // Parse AI markdown style recipes
//   const parseRecipes = (text) => {
//     const blocks = text.split('## ').filter(b => b.trim() !== '');
//     return blocks.map(block => {
//       const lines = block.trim().split('\n').map(l => l.trim());
//       const title = lines[0];
//       const ingIndex = lines.findIndex(l => l.toLowerCase().startsWith('- **ingredients'));
//       const instIndex = lines.findIndex(l => l.toLowerCase().startsWith('- **instructions'));
//       const ingredients = [];
//       const instructions = [];
//       if (ingIndex !== -1 && instIndex !== -1) {
//         for (let i = ingIndex + 1; i < instIndex; i++) {
//           if (lines[i].startsWith('-')) ingredients.push(lines[i].replace(/^- /, ''));
//         }
//         for (let i = instIndex + 1; i < lines.length; i++) {
//           if (/^\d+\./.test(lines[i])) instructions.push(lines[i]);
//         }
//       }
//       return { title, ingredients, instructions };
//     });
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Ingredients Shelf</Text>

//       <View style={styles.mainRow}>
//         {/* Left two columns */}
//         <View style={styles.twoColumns}>
//           {columns[0].map(ing => (
//             <IngredientItem
//               key={ing.id}
//               ingredient={ing}
//               selected={isSelected(ing.id)}
//               onPress={() => addIngredient(ing)}
//             />
//           ))}
//           {columns[1].map(ing => (
//             <IngredientItem
//               key={ing.id}
//               ingredient={ing}
//               selected={isSelected(ing.id)}
//               onPress={() => addIngredient(ing)}
//             />
//           ))}
//         </View>

//         {/* Cooking board center */}
//         <View style={styles.cookingBoard}>
//           <Text style={styles.boardTitle}>Cooking Board</Text>
//           <View style={styles.potIngredientsContainer}>
//             {addedIngredients.length === 0 ? (
//               <Text style={styles.potEmptyText}>No ingredients added</Text>
//             ) : (
//               addedIngredients.map(ingredient => (
//                 <TouchableOpacity
//                   key={ingredient.id}
//                   onPress={() => removeIngredient(ingredient)}
//                   style={styles.potIngredientWrapper}
//                 >
//                   <Image
//                     source={{ uri: ingredient.uri }}
//                     style={styles.potIngredientImage}
//                   />
//                 </TouchableOpacity>
//               ))
//             )}
//           </View>
//           <TouchableOpacity
//             style={[styles.cookButton, (addedIngredients.length === 0 || loading) && { opacity: 0.5 }]}
//             disabled={addedIngredients.length === 0 || loading}
//             onPress={cook}
//           >
//             <Text style={styles.cookButtonText}>{loading ? 'Cooking...' : 'Cook!'}</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Right two columns */}
//         <View style={styles.twoColumns}>
//           {columns[2].map(ing => (
//             <IngredientItem
//               key={ing.id}
//               ingredient={ing}
//               selected={isSelected(ing.id)}
//               onPress={() => addIngredient(ing)}
//             />
//           ))}
//           {columns[3].map(ing => (
//             <IngredientItem
//               key={ing.id}
//               ingredient={ing}
//               selected={isSelected(ing.id)}
//               onPress={() => addIngredient(ing)}
//             />
//           ))}
//         </View>
//       </View>

//       {/* AI Generated Recipes Section */}
//       {generatedRecipes.length > 0 && (
//         <View style={styles.recipesSection}>
//           <View style={styles.separator} />
//           <Text style={styles.recipesTitle}>AI GENERATED RECIPES</Text>

//           <FlatList
//             data={generatedRecipes}
//             keyExtractor={(_, i) => i.toString()}
//             numColumns={3}
//             contentContainerStyle={styles.recipeGrid}
//             renderItem={({ item }) => (
//               <View style={styles.recipeCard}>
//                 <Text style={styles.recipeTitle}>{item.title}</Text>
//                 <Text style={styles.recipeSectionHeader}>Ingredients:</Text>
//                 {item.ingredients.map((ing, idx) => (
//                   <Text key={idx} style={styles.recipeText}>• {ing}</Text>
//                 ))}
//                 <Text style={styles.recipeSectionHeader}>Instructions:</Text>
//                 {item.instructions.map((inst, idx) => (
//                   <Text key={idx} style={styles.recipeText}>{inst}</Text>
//                 ))}
//               </View>
//             )}
//           />
//         </View>
//       )}
//     </View>
//   );
// }

// function IngredientItem({ ingredient, selected, onPress }) {
//   return (
//     <TouchableOpacity
//       onPress={onPress}
//       style={[styles.ingredientButton, selected && styles.ingredientSelected]}
//     >
//       <Image source={{ uri: ingredient.uri }} style={styles.ingredientImage} />
//       <Text style={[styles.ingredientLabel, selected && styles.ingredientLabelSelected]}>
//         {ingredient.name}
//       </Text>
//     </TouchableOpacity>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#FFF3E0', padding: 16 },
//   header: {
//     fontSize: 24,
//     fontWeight: '700',
//     color: '#FF7043',
//     marginBottom: 16,
//     textAlign: 'center',
//   },
//   mainRow: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//   },
//   twoColumns: {
//     width: (SCREEN_WIDTH - 64) / 4,
//   },
//   ingredientButton: {
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   ingredientSelected: {
//     borderWidth: 2,
//     borderColor: '#FF7043',
//     borderRadius: 12,
//     padding: 4,
//   },
//   ingredientImage: {
//     width: 60,
//     height: 60,
//     borderRadius: 12,
//     backgroundColor: 'white',
//     padding: 6,
//     resizeMode: 'contain',
//     shadowColor: '#000',
//     shadowOpacity: 0.15,
//     shadowRadius: 4,
//     shadowOffset: { width: 0, height: 2 },
//     elevation: 4,
//   },
//   ingredientLabel: {
//     marginTop: 6,
//     fontSize: 14,
//     color: '#555',
//   },
//   ingredientLabelSelected: {
//     color: '#FF7043',
//     fontWeight: '700',
//   },
//   cookingBoard: {
//     width: (SCREEN_WIDTH - 64) / 4,
//     marginHorizontal: 16,
//     backgroundColor: 'white',
//     borderRadius: 20,
//     padding: 20,
//     elevation: 6,
//     shadowColor: '#FF7043',
//     shadowOpacity: 0.3,
//     shadowRadius: 15,
//     shadowOffset: { width: 0, height: 6 },
//     alignItems: 'center',
//   },
//   boardTitle: {
//     fontSize: 22,
//     fontWeight: '700',
//     color: '#FF7043',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   potIngredientsContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'center',
//     marginBottom: 10,
//   },
//   potIngredientWrapper: {
//     margin: 6,
//   },
//   potIngredientImage: {
//     width: 70,
//     height: 70,
//     borderRadius: 14,
//     backgroundColor: 'white',
//     padding: 8,
//     resizeMode: 'contain',
//     shadowColor: '#000',
//     shadowOpacity: 0.25,
//     shadowRadius: 6,
//     shadowOffset: { width: 0, height: 3 },
//     elevation: 6,
//   },
//   cookButton: {
//     marginTop: 24,
//     backgroundColor: '#FF7043',
//     borderRadius: 30,
//     paddingVertical: 16,
//     paddingHorizontal: 48,
//   },
//   cookButtonText: {
//     color: 'white',
//     fontWeight: '700',
//     fontSize: 18,
//   },
//   recipesSection: {
//     marginTop: 32,
//     alignItems: 'center',
//   },
//   separator: {
//     width: '80%',
//     borderBottomWidth: 1,
//     borderBottomColor: '#FF7043',
//     marginBottom: 12,
//   },
//   recipesTitle: {
//     fontSize: 20,
//     fontWeight: '700',
//     color: '#FF7043',
//     marginBottom: 16,
//   },
//   recipeGrid: {
//     paddingHorizontal: 8,
//     width: '100%',
//     alignItems: 'center',
//   },
//   recipeCard: {
//     backgroundColor: 'white',
//     borderRadius: 12,
//     elevation: 3,
//     padding: 12,
//     margin: 6,
//     maxWidth: '30%',
//     minWidth: '30%',
//   },
//   recipeTitle: {
//     fontWeight: '700',
//     fontSize: 16,
//     color: '#BF360C',
//     marginBottom: 6,
//   },
//   recipeSectionHeader: {
//     fontWeight: '700',
//     marginTop: 6,
//     marginBottom: 4,
//     color: '#FF7043',
//   },
//   recipeText: {
//     fontSize: 12,
//     color: '#444',
//     marginLeft: 8,
//     marginBottom: 2,
//   },
// });


import React, { useState } from 'react';
import {
  View, Text, Image, StyleSheet, ScrollView, Dimensions,
  Alert, TouchableOpacity, FlatList
} from 'react-native';
import { INGREDIENT_CATEGORIES } from '../data/ingredients';

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
          Authorization: 'Bearer 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',
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
