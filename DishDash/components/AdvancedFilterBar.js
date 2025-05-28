import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  Pressable,
} from 'react-native';
import { FilterContext } from '../contexts/FilterContext';

const FILTER_CATEGORIES = {
  cuisine: ['Italian', 'Indian', 'Mexican', 'American', 'Greek', 'French', 'Asian', 'Thai', 'Korean', 'Middle Eastern', 'International', 'Chinese'],
  cookingTime: ['<15 min', '15-30 min', '30-60 min', '>60 min'],
  difficulty: ['Easy', 'Medium', 'Hard'],
  diet: ['None', 'Vegan', 'Vegetarian'],
  mealType: ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Appetizer'],
};

export default function AdvancedFilterBar() {
  const { filters, updateFilter } = useContext(FilterContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);

  const openModal = (category) => {
    setActiveCategory(category);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setActiveCategory(null);
  };

  const onOptionPress = (option) => {
    const selected = filters[activeCategory] === option;
    updateFilter(activeCategory, selected ? null : option);
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {Object.keys(FILTER_CATEGORIES).map(category => {
          const hasSelection = !!filters[category];
          return (
            <TouchableOpacity
              key={category}
              style={[styles.categoryButton, hasSelection && styles.categoryButtonActive]}
              onPress={() => openModal(category)}
            >
              <Text style={[styles.categoryButtonText, hasSelection && styles.categoryButtonTextActive]}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Text>
              {hasSelection && (
                <View style={styles.selectedBadge}>
                  <Text style={styles.selectedBadgeText}>1</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <Modal visible={modalVisible} transparent animationType="slide" onRequestClose={closeModal}>
        <Pressable style={styles.modalOverlay} onPress={closeModal}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Select {activeCategory && activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}
            </Text>
            <ScrollView contentContainerStyle={styles.optionsContainer}>
              {activeCategory && FILTER_CATEGORIES[activeCategory].map(option => {
                const selected = filters[activeCategory] === option;
                return (
                  <TouchableOpacity
                    key={option}
                    style={[styles.optionButton, selected && styles.optionButtonSelected]}
                    onPress={() => onOptionPress(option)}
                  >
                    <Text style={[styles.optionText, selected && styles.optionTextSelected]}>
                      {option}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF3E0',
    paddingVertical: 14,
  },
  scrollContent: {
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  categoryButton: {
    backgroundColor: '#FF7043',
    paddingHorizontal: 18,
    paddingVertical: 12,
    marginRight: 14,
    borderRadius: 30,
    position: 'relative',
    shadowColor: '#FF7043',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
  categoryButtonActive: {
    backgroundColor: '#FF5722',
  },
  categoryButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  categoryButtonTextActive: {
    fontWeight: '800',
  },
  selectedBadge: {
    position: 'absolute',
    top: -6,
    right: -8,
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 7,
    paddingVertical: 2,
    elevation: 6,
    shadowColor: '#FF5722',
    shadowOpacity: 0.6,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  selectedBadgeText: {
    color: '#FF5722',
    fontWeight: '700',
    fontSize: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 36,
    maxHeight: '55%',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FF7043',
    marginBottom: 14,
    textAlign: 'center',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  optionButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 11,
    paddingHorizontal: 18,
    borderRadius: 28,
    margin: 7,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  optionButtonSelected: {
    backgroundColor: '#FF7043',
    borderColor: '#FF5722',
  },
  optionText: {
    color: '#555',
    fontWeight: '600',
    fontSize: 15,
  },
  optionTextSelected: {
    color: 'white',
    fontWeight: '700',
  },
  closeButton: {
    marginTop: 22,
    backgroundColor: '#FF7043',
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});
