import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';

const phones = [
    { id: 1, name: 'iPhone 14', price: '$799', image: 'https://files.refurbed.com/ii/iphone-14-1662615920.jpg', functional: true },
    { id: 2, name: 'Samsung Galaxy S23', price: '$749', image: 'https://assets.gy.digital/h_wVq5zYj4-y9mrI6bmDoFiVpVg=/1000x1000/s3.gy.digital%2Fgotech%2Fuploads%2Fasset%2Fdata%2F9155%2FTL3808_1.jpg', functional: true },
    { id: 3, name: 'Google Pixel 7', price: '$699', image: 'https://m.media-amazon.com/images/I/61wqAYVLYHL._AC_UF894,1000_QL80_.jpg', functional: true },
    { id: 4, name: 'OnePlus 10', price: '$599', image: '', functional: false },
    { id: 5, name: 'Nokia X20', price: '$499', image: '', functional: false },
    { id: 6, name: 'Sony Xperia 5', price: '$899', image: '', functional: false },
    { id: 7, name: 'Motorola Edge', price: '$699', image: '', functional: false },
    { id: 8, name: 'Xiaomi Mi 11', price: '$549', image: '', functional: false },
    { id: 9, name: 'Realme GT', price: '$479', image: '', functional: false },
    { id: 10, name: 'Asus Zenfone 8', price: '$629', image: '', functional: false }
];

export default function MarketplaceSingleScreen() {
  const [tapCount, setTapCount] = useState({});
  const [selectedPhone, setSelectedPhone] = useState(null);

  const handleTap = (phone) => {
    if (!phone.functional) return;

    setTapCount((prev) => {
      const count = (prev[phone.id] || 0) + 1;
      if (count >= 2) {
        setSelectedPhone(phone);
        return { ...prev, [phone.id]: 0 };
      }
      return { ...prev, [phone.id]: count };
    });
  };

  const renderPhoneItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.item, !item.functional && styles.disabled]}
      onPress={() => handleTap(item)}
      disabled={!item.functional}
    >
      <Text style={styles.title}>{item.name}</Text>
      <Text>{item.price}</Text>
      {!item.functional && <Text style={styles.note}>Not functional</Text>}
    </TouchableOpacity>
  );

  const renderPhoneDetail = (phone) => {
    let description = '';
    if (phone.name.includes('iPhone')) {
      description = '6.1" display, A15 chip, Dual camera';
    } else if (phone.name.includes('Samsung')) {
      description = '6.1" AMOLED, Snapdragon 8 Gen 2, Triple camera';
    } else if (phone.name.includes('Pixel')) {
      description = '6.3" OLED, Tensor G2, 50 MP camera';
    }

    return (
      <View style={styles.detailContainer}>
        <Text style={styles.detailTitle}>{phone.name}</Text>
        <Image source={{ uri: phone.image }} style={styles.image} />
        <Text style={styles.price}>{phone.price}</Text>
        <Text>{description}</Text>
        <TouchableOpacity onPress={() => setSelectedPhone(null)} style={styles.backButton}>
          <Text style={styles.backText}>← Back to list</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {selectedPhone ? (
        renderPhoneDetail(selectedPhone)
      ) : (
        <FlatList
          data={phones}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderPhoneItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  item: { padding: 16, backgroundColor: '#e6f2ff', marginBottom: 10, borderRadius: 8 },
  disabled: { backgroundColor: '#ddd' },
  title: { fontSize: 16, fontWeight: 'bold' },
  note: { fontSize: 12, color: 'red' },
  detailContainer: { alignItems: 'center', justifyContent: 'center', padding: 20 },
  detailTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  image: { width: 150, height: 150, marginBottom: 20 },
  price: { fontSize: 20, marginBottom: 10 },
  backButton: { marginTop: 20 },
  backText: { color: 'blue', fontSize: 16 }
});
