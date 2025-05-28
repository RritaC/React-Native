import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
  Alert,
  ScrollView,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import recipesData from '../data/recipes.json';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const MEAL_TIMES = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];
const MEAL_TIME_COLORS = {
  Breakfast: '#FFD54F',
  Lunch: '#4DB6AC',
  Dinner: '#FF7043',
  Snack: '#9575CD',
};

export default function MealPlannerScreen({ navigation }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [meals, setMeals] = useState({}); // { '2025-05-26': [{id, name, recipeId?, mealTime}] }

  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [tab, setTab] = useState('existing'); // 'existing' or 'custom'
  const [searchTerm, setSearchTerm] = useState('');
  const [customMealName, setCustomMealName] = useState('');
  const [customMealTime, setCustomMealTime] = useState(MEAL_TIMES[0]);
  const [existingMealTime, setExistingMealTime] = useState(MEAL_TIMES[0]);

  // Edit meal states
  const [mealToEdit, setMealToEdit] = useState(null);
  const [editMealName, setEditMealName] = useState('');
  const [editMealTime, setEditMealTime] = useState(MEAL_TIMES[0]);

  const filteredRecipes = recipesData.filter((r) =>
    r.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addMeal = (meal) => {
    if (!selectedDate) {
      Alert.alert('Select a date first!');
      return;
    }
    setMeals((prev) => {
      const dayMeals = prev[selectedDate] || [];
      return {
        ...prev,
        [selectedDate]: [...dayMeals, meal],
      };
    });
  };

  const handleAddRecipeMeal = (recipe) => {
    addMeal({
      id: `${Date.now()}-${recipe.id}`,
      name: recipe.name,
      recipeId: recipe.id,
      mealTime: existingMealTime,
    });
    setModalVisible(false);
    setSearchTerm('');
    setExistingMealTime(MEAL_TIMES[0]);
  };

  const handleAddCustomMeal = () => {
    if (!customMealName.trim()) {
      Alert.alert('Please enter a meal name');
      return;
    }
    addMeal({
      id: `${Date.now()}-custom`,
      name: customMealName,
      mealTime: customMealTime,
    });
    setModalVisible(false);
    setCustomMealName('');
    setCustomMealTime(MEAL_TIMES[0]);
  };

  const deleteMeal = (mealId) => {
    if (!selectedDate) return;
    setMeals((prev) => {
      const dayMeals = prev[selectedDate] || [];
      const newDayMeals = dayMeals.filter((m) => m.id !== mealId);
      return {
        ...prev,
        [selectedDate]: newDayMeals,
      };
    });
  };

  const openEditModal = (meal) => {
    setMealToEdit(meal);
    setEditMealName(meal.name);
    setEditMealTime(meal.mealTime);
    setEditModalVisible(true);
  };

  const handleSaveEdit = () => {
    if (!editMealName.trim()) {
      Alert.alert('Meal name cannot be empty');
      return;
    }
    setMeals((prev) => {
      const dayMeals = prev[selectedDate] || [];
      const updatedMeals = dayMeals.map((m) =>
        m.id === mealToEdit.id ? { ...m, name: editMealName, mealTime: editMealTime } : m
      );
      return {
        ...prev,
        [selectedDate]: updatedMeals,
      };
    });
    setEditModalVisible(false);
    setMealToEdit(null);
  };

  const markedDates = {};
  Object.entries(meals).forEach(([date, dayMeals]) => {
    const dots = [];
    MEAL_TIMES.forEach((mt) => {
      if (dayMeals.some((m) => m.mealTime === mt)) {
        dots.push({ key: mt, color: MEAL_TIME_COLORS[mt] });
      }
    });
    markedDates[date] = { dots };
  });
  if (selectedDate) {
    markedDates[selectedDate] = {
      ...(markedDates[selectedDate] || {}),
      selected: true,
      selectedColor: '#FF7043',
    };
  }

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={markedDates}
        markingType="multi-dot"
        style={styles.calendar}
      />

      <View style={styles.mealsContainer}>
        <Text style={styles.selectedDateText}>
          {selectedDate ? `Meals for ${selectedDate}` : 'Select a date to add meals'}
        </Text>

        {selectedDate && (
          <>
            <FlatList
              data={meals[selectedDate] || []}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                const isRecipe = !!item.recipeId;
                return (
                  <View
                    style={[styles.mealItem, { borderLeftColor: MEAL_TIME_COLORS[item.mealTime] }]}
                  >
                    <TouchableOpacity
                      style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
                      onPress={() => {
                        if (isRecipe) {
                          navigation.navigate('RecipeDetails', {
                            recipeId: item.recipeId,
                            recipeName: item.name,
                          });
                        } else {
                          Alert.alert('Custom Meal', item.name);
                        }
                      }}
                    >
                      <View style={styles.mealTimeBadge}>
                        <Text style={styles.mealTimeText}>{item.mealTime}</Text>
                      </View>
                      <Text style={styles.mealName}>{item.name}</Text>
                      {isRecipe && (
                        <MaterialCommunityIcons
                          name="food-apple"
                          size={20}
                          color={MEAL_TIME_COLORS[item.mealTime]}
                          style={{ marginLeft: 8 }}
                        />
                      )}
                    </TouchableOpacity>

                    <View style={styles.mealActions}>
                      <TouchableOpacity onPress={() => openEditModal(item)} style={styles.actionButton}>
                        <MaterialCommunityIcons name="square-edit-outline" size={24} color="#777" />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => deleteMeal(item.id)} style={styles.actionButton}>
                        <MaterialCommunityIcons name="close" size={28} color="#999" />
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              }}
              ListEmptyComponent={<Text style={styles.emptyText}>No meals planned yet.</Text>}
            />

            <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
              <Text style={styles.addButtonText}>Add Meal</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      {/* Add Meal Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Close button */}
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
              hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            >
              <MaterialCommunityIcons name="close" size={28} color="#888" />
            </TouchableOpacity>

            <View style={styles.tabs}>
              <TouchableOpacity
                style={[styles.tabButton, tab === 'existing' && styles.activeTab]}
                onPress={() => setTab('existing')}
              >
                <Text style={[styles.tabText, tab === 'existing' && styles.activeTabText]}>
                  Existing Recipe
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tabButton, tab === 'custom' && styles.activeTab]}
                onPress={() => setTab('custom')}
              >
                <Text style={[styles.tabText, tab === 'custom' && styles.activeTabText]}>
                  Custom Meal
                </Text>
              </TouchableOpacity>
            </View>

            {tab === 'existing' && (
              <>
                <TextInput
                  placeholder="Search recipes..."
                  style={styles.input}
                  value={searchTerm}
                  onChangeText={setSearchTerm}
                />

                <View style={styles.mealTimePicker}>
                  {MEAL_TIMES.map((mt) => (
                    <TouchableOpacity
                      key={mt}
                      style={[
                        styles.mealTimeOption,
                        mt === existingMealTime && styles.mealTimeOptionSelected,
                      ]}
                      onPress={() => setExistingMealTime(mt)}
                    >
                      <Text
                        style={[
                          styles.mealTimeOptionText,
                          mt === existingMealTime && styles.mealTimeOptionTextSelected,
                        ]}
                      >
                        {mt}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <ScrollView style={{ maxHeight: 200, marginTop: 8 }}>
                  {filteredRecipes.length === 0 && (
                    <Text style={styles.emptyText}>No recipes found.</Text>
                  )}
                  {filteredRecipes.map((recipe) => (
                    <TouchableOpacity
                      key={recipe.id}
                      style={styles.recipeItem}
                      onPress={() => handleAddRecipeMeal(recipe)}
                    >
                      <Text style={styles.recipeName}>{recipe.name}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </>
            )}

            {tab === 'custom' && (
              <>
                <TextInput
                  placeholder="Meal name"
                  style={styles.input}
                  value={customMealName}
                  onChangeText={setCustomMealName}
                />

                <View style={styles.mealTimePicker}>
                  {MEAL_TIMES.map((mt) => (
                    <TouchableOpacity
                      key={mt}
                      style={[
                        styles.mealTimeOption,
                        mt === customMealTime && styles.mealTimeOptionSelected,
                      ]}
                      onPress={() => setCustomMealTime(mt)}
                    >
                      <Text
                        style={[
                          styles.mealTimeOptionText,
                          mt === customMealTime && styles.mealTimeOptionTextSelected,
                        ]}
                      >
                        {mt}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <View style={styles.modalButtons}>
                  <Button title="Cancel" onPress={() => setModalVisible(false)} />
                  <Button title="Add Meal" onPress={handleAddCustomMeal} />
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Edit Meal Modal */}
      <Modal visible={editModalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={() => setEditModalVisible(false)}
              style={styles.closeButton}
              hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            >
              <MaterialCommunityIcons name="close" size={28} color="#888" />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Edit Meal</Text>

            <TextInput
              placeholder="Meal name"
              style={styles.input}
              value={editMealName}
              onChangeText={setEditMealName}
            />

            <View style={styles.mealTimePicker}>
              {MEAL_TIMES.map((mt) => (
                <TouchableOpacity
                  key={mt}
                  style={[
                    styles.mealTimeOption,
                    mt === editMealTime && styles.mealTimeOptionSelected,
                  ]}
                  onPress={() => setEditMealTime(mt)}
                >
                  <Text
                    style={[
                      styles.mealTimeOptionText,
                      mt === editMealTime && styles.mealTimeOptionTextSelected,
                    ]}
                  >
                    {mt}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.modalButtons}>
              <Button title="Cancel" onPress={() => setEditModalVisible(false)} />
              <Button title="Save" onPress={handleSaveEdit} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF3E0' },
  calendar: { marginBottom: 10 },

  mealsContainer: { flex: 1, paddingHorizontal: 16 },

  selectedDateText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FF7043',
    marginBottom: 10,
    textAlign: 'center',
  },

  mealItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 6,
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  mealTimeBadge: {
    backgroundColor: '#FF7043',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginRight: 12,
  },
  mealTimeText: {
    color: 'white',
    fontWeight: '700',
  },
  mealName: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },

  mealActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  actionButton: {
    paddingHorizontal: 6,
  },

  emptyText: {
    fontStyle: 'italic',
    color: '#888',
    marginBottom: 8,
    textAlign: 'center',
  },

  addButton: {
    backgroundColor: '#FF7043',
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 30,
  },
  addButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },

  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },

  modalContent: {
    backgroundColor: 'white',
    marginHorizontal: 30,
    borderRadius: 20,
    padding: 20,
  },

  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
  },

  tabs: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 8,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#FF7043',
  },
  tabText: {
    fontWeight: '600',
    textAlign: 'center',
    color: '#888',
  },
  activeTabText: {
    color: '#FF7043',
  },

  input: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 20,
  },

  recipeItem: {
    paddingVertical: 10,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  recipeName: {
    fontSize: 16,
    color: '#555',
  },

  mealTimePicker: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },

  mealTimeOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FF7043',
  },
  mealTimeOptionSelected: {
    backgroundColor: '#FF7043',
  },
  mealTimeOptionText: {
    fontWeight: '600',
    color: '#FF7043',
  },
  mealTimeOptionTextSelected: {
    color: 'white',
  },

  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

});
