import React, { useContext } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FilterContext } from '../contexts/FilterContext';

const CUISINES = [
  'Italian',
  'Indian',
  'American',
  'Mexican',
  'Greek',
  'French',
  'Asian',
  'International',
  'Thai',
  'Korean',
  'Chinese',
  'Middle Eastern',
];

export default function FilterBar() {
  const { filters, updateFilter } = useContext(FilterContext);

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
      {CUISINES.map(cuisine => {
        const selected = filters.cuisine === cuisine;
        return (
          <TouchableOpacity
            key={cuisine}
            style={[styles.button, selected && styles.selectedButton]}
            onPress={() => updateFilter('cuisine', cuisine)}
          >
            <Text style={[styles.text, selected && styles.selectedText]}>{cuisine}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { maxHeight: 50, marginVertical: 8, paddingHorizontal: 16 },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: '#ddd',
    borderRadius: 20,
    marginRight: 10,
  },
  selectedButton: {
    backgroundColor: '#FF7043',
  },
  text: { color: '#333' },
  selectedText: { color: 'white', fontWeight: 'bold' },
});
