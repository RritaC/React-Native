import React, { useState } from 'react';
import {
  View, Text, Image, StyleSheet, ScrollView, Dimensions,
  Alert, TouchableOpacity, FlatList, Modal, TextInput
} from 'react-native';
import { INGREDIENT_CATEGORIES } from '../data/ingredients';
import Constants from 'expo-constants';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function CookingSpaceScreen() {
  const [addedIngredients, setAddedIngredients] = useState([]);
  const [userRecipes, setUserRecipes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [recipeName, setRecipeName] = useState('');
  const [recipeSteps, setRecipeSteps] = useState('');
  const [selectedIngredient, setSelectedIngredient] = useState(null);

  const openRecipeModal = (ingredient) => {
    if (addedIngredients.length === 0) {
      Alert.alert('Add some ingredients first!');
      return;
    }
    setSelectedIngredient(ingredient);
    setModalVisible(true);
  };

  const saveRecipe = () => {
    if (!recipeName.trim()) {
      Alert.alert('Please enter a recipe name');
      return;
    }

    const newRecipe = {
      title: recipeName,
      ingredients: addedIngredients.map(i => i.name),
      instructions: recipeSteps.split('\n').filter(step => step.trim() !== ''),
      isUserCreated: true
    };

    setUserRecipes(prev => [...prev, newRecipe]);
    setModalVisible(false);
    setRecipeName('');
    setRecipeSteps('');
    setAddedIngredients([]);
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
            <TouchableOpacity 
              key={item.id + index} 
              onPress={() => openRecipeModal(item)}
            >
              <Image source={item.uri} style={styles.icon} />
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity 
          style={styles.logButton} 
          onPress={() => openRecipeModal()}
          disabled={addedIngredients.length === 0}
        >
          <Text style={styles.logText}>Log Recipe</Text>
        </TouchableOpacity>
      </View>

      {/* Recipe Logging Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Create New Recipe</Text>
            
            {selectedIngredient && (
              <Text style={styles.modalText}>
                Selected Ingredient: {selectedIngredient.name}
              </Text>
            )}
            
            <Text style={styles.modalLabel}>Recipe Name:</Text>
            <TextInput
              style={styles.input}
              onChangeText={setRecipeName}
              value={recipeName}
              placeholder="Enter recipe name"
            />
            
            <Text style={styles.modalLabel}>Ingredients:</Text>
            <View style={styles.ingredientsList}>
              {addedIngredients.map((item, index) => (
                <Text key={index} style={styles.ingredientItem}>• {item.name}</Text>
              ))}
            </View>
            
            <Text style={styles.modalLabel}>Instructions:</Text>
            <TextInput
              style={[styles.input, styles.multilineInput]}
              onChangeText={setRecipeSteps}
              value={recipeSteps}
              placeholder="Enter steps (one per line)"
              multiline
              numberOfLines={4}
            />
            
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={saveRecipe}
              >
                <Text style={styles.buttonText}>Save Recipe</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {userRecipes.length > 0 && (
        <View style={styles.recipeArea}>
          <Text style={styles.recipeTitle}>YOUR RECIPES</Text>
          <FlatList
            data={userRecipes}
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
                  <Text key={idx} style={styles.recipeText}>{idx + 1}. {step}</Text>
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
  logButton: {
    backgroundColor: '#5D4037',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 22,
    marginTop: 12,
  },
  logText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
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
  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#5D4037',
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 15,
    color: '#333',
  },
  modalLabel: {
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    color: '#5D4037',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  ingredientsList: {
    marginBottom: 10,
    paddingLeft: 10,
  },
  ingredientItem: {
    fontSize: 14,
    color: '#333',
    marginBottom: 3,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButton: {
    borderRadius: 8,
    padding: 12,
    width: '48%',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#ccc',
  },
  saveButton: {
    backgroundColor: '#5D4037',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});