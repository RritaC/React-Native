// import React, { useRef } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   Image,
//   Dimensions,
//   Animated,
//   FlatList,
// } from 'react-native';
// import { MaterialIcons, FontAwesome, Ionicons, Feather } from '@expo/vector-icons';

// const { width } = Dimensions.get('window');

// // Premium color palette
// const COLORS = {
//   primary: '#FF6B6B',       // Salmon (replaces orange)
//   secondary: '#4ECDC4',     // Teal
//   dark: '#292F36',          // Dark slate
//   light: '#F7FFF7',         // Off-white
//   accent: '#FFE66D',        // Yellow accent
// };

// // Professional SVG icons (using expo vector icons)
// const FEATURES = [
//   {
//     id: '1',
//     title: 'Smart Recipes',
//     description: 'AI-powered recommendations based on your pantry and preferences',
//     icon: <Ionicons name="ios-restaurant" size={32} color={COLORS.primary} />,
//   },
//   {
//     id: '2',
//     title: 'Interactive Cooking',
//     description: 'Step-by-step guidance with voice control and timers',
//     icon: <MaterialIcons name="cooking" size={32} color={COLORS.primary} />,
//   },
//   {
//     id: '3',
//     title: 'Meal Planning',
//     description: 'Automated weekly plans with smart grocery lists',
//     icon: <Feather name="calendar" size={32} color={COLORS.primary} />,
//   },
//   {
//     id: '4',
//     title: 'Nutrition Tracking',
//     description: 'Macro breakdowns and dietary customization',
//     icon: <MaterialIcons name="nutrition" size={32} color={COLORS.primary} />,
//   },
// ];

// const TESTIMONIALS = [
//   {
//     id: '1',
//     name: 'Sarah K.',
//     role: 'Food Blogger',
//     text: "DishDash revolutionized my meal prep. The AI recipe generator saves me hours each week!",
//     avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
//     rating: 5,
//   },
//   {
//     id: '2',
//     name: 'Michael T.',
//     role: 'Busy Dad',
//     text: "Finally an app that makes cooking fun for the whole family. The interactive mode is genius.",
//     avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
//     rating: 5,
//   },
//   {
//     id: '3',
//     name: 'Priya M.',
//     role: 'Nutritionist',
//     text: "My clients love the dietary tracking features. The clean interface makes it so accessible.",
//     avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
//     rating: 4,
//   },
// ];

// const STATS = [
//   { value: '10,000+', label: 'Recipes' },
//   { value: '500K+', label: 'Active Users' },
//   { value: '4.9', label: 'App Rating' },
// ];

// const FeatureCard = ({ feature }) => {
//   const scaleValue = useRef(new Animated.Value(1)).current;

//   const handlePressIn = () => {
//     Animated.spring(scaleValue, {
//       toValue: 0.95,
//       useNativeDriver: true,
//     }).start();
//   };

//   const handlePressOut = () => {
//     Animated.spring(scaleValue, {
//       toValue: 1,
//       friction: 3,
//       useNativeDriver: true,
//     }).start();
//   };

//   return (
//     <TouchableOpacity
//       activeOpacity={0.9}
//       onPressIn={handlePressIn}
//       onPressOut={handlePressOut}
//     >
//       <Animated.View style={[styles.featureCard, { transform: [{ scale: scaleValue }] }]}>
//         <View style={styles.featureIconContainer}>
//           {feature.icon}
//         </View>
//         <Text style={styles.featureTitle}>{feature.title}</Text>
//         <Text style={styles.featureDescription}>{feature.description}</Text>
//       </Animated.View>
//     </TouchableOpacity>
//   );
// };

// const TestimonialCard = ({ item }) => (
//   <View style={styles.testimonialCard}>
//     <View style={styles.testimonialHeader}>
//       <Image source={{ uri: item.avatar }} style={styles.testimonialAvatar} />
//       <View style={styles.testimonialUser}>
//         <Text style={styles.testimonialName}>{item.name}</Text>
//         <Text style={styles.testimonialRole}>{item.role}</Text>
//       </View>
//       <View style={styles.ratingContainer}>
//         {[...Array(item.rating)].map((_, i) => (
//           <MaterialIcons key={i} name="star" size={16} color={COLORS.accent} />
//         ))}
//       </View>
//     </View>
//     <Text style={styles.testimonialText}>"{item.text}"</Text>
//   </View>
// );

// export default function LandingPage({ navigation }) {
//   return (
//     <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
//       {/* Hero Section */}
//       <View style={styles.hero}>
//         <Image 
//           source={{ uri: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc' }} 
//           style={styles.heroImage}
//           blurRadius={1}
//         />
//         <View style={styles.heroOverlay} />
//         <View style={styles.heroContent}>
//           <Text style={styles.heroTitle}>Elevate Your Cooking Experience</Text>
//           <Text style={styles.heroSubtitle}>AI-powered kitchen assistant with smart meal planning</Text>

//           <View style={styles.heroButtons}>
//             <TouchableOpacity 
//               style={styles.primaryButton}
//               onPress={() => navigation.replace('Tabs')}
//             >
//               <Text style={styles.primaryButtonText}>Start Cooking</Text>
//               <MaterialIcons name="arrow-forward" size={20} color="white" />
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>

//       {/* Stats Bar */}
//       <View style={styles.statsContainer}>
//         {STATS.map((stat, index) => (
//           <View key={stat.label} style={[
//             styles.statItem,
//             index !== STATS.length - 1 && styles.statDivider
//           ]}>
//             <Text style={styles.statValue}>{stat.value}</Text>
//             <Text style={styles.statLabel}>{stat.label}</Text>
//           </View>
//         ))}
//       </View>

//       {/* Features Section */}
//       <View style={styles.section}>
//         <Text style={styles.sectionSubtitle}>WHY CHOOSE DISHDASH</Text>
//         <Text style={styles.sectionTitle}>Smart Kitchen Features</Text>

//         <FlatList
//           data={FEATURES}
//           renderItem={({ item }) => <FeatureCard feature={item} />}
//           keyExtractor={item => item.id}
//           numColumns={2}
//           scrollEnabled={false}
//           contentContainerStyle={styles.featuresGrid}
//         />
//       </View>

//       {/* How It Works */}
//       <View style={[styles.section, styles.darkSection]}>
//         <Text style={[styles.sectionSubtitle, styles.lightText]}>GET STARTED</Text>
//         <Text style={[styles.sectionTitle, styles.lightText]}>How DishDash Works</Text>

//         <View style={styles.stepsContainer}>
//           {[
//             { icon: 'search', text: 'Browse recipes or scan ingredients' },
//             { icon: 'calendar', text: 'Plan your meals for the week' },
//             { icon: 'list', text: 'Generate automated grocery list' },
//             { icon: 'cooking', text: 'Cook with interactive guidance' },
//           ].map((step, index) => (
//             <View key={index} style={styles.step}>
//               <View style={styles.stepIcon}>
//                 <MaterialIcons 
//                   name={step.icon} 
//                   size={24} 
//                   color={COLORS.primary} 
//                 />
//                 <Text style={styles.stepNumber}>{index + 1}</Text>
//               </View>
//               <Text style={styles.stepText}>{step.text}</Text>
//             </View>
//           ))}
//         </View>
//       </View>

//       {/* Testimonials Carousel */}
//       <View style={styles.section}>
//         <Text style={styles.sectionSubtitle}>TESTIMONIALS</Text>
//         <Text style={styles.sectionTitle}>What Our Users Say</Text>

//         <FlatList
//           data={TESTIMONIALS}
//           renderItem={({ item }) => <TestimonialCard item={item} />}
//           keyExtractor={item => item.id}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           pagingEnabled
//           contentContainerStyle={styles.testimonialsContainer}
//         />
//       </View>

//       {/* CTA Section */}
//       <View style={[styles.section, styles.ctaSection]}>
//         <Text style={styles.ctaTitle}>Ready to Transform Your Cooking?</Text>
//         <Text style={styles.ctaSubtitle}>Join thousands of home chefs already using DishDash</Text>

//         <TouchableOpacity 
//           style={[styles.primaryButton, styles.ctaButton]}
//           onPress={() => navigation.replace('Tabs')}
//         >
//           <Text style={styles.primaryButtonText}>Get Started - It's Free</Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.light,
//   },
//   hero: {
//     height: 600,
//     width: '100%',
//     position: 'relative',
//   },
//   heroImage: {
//     width: '100%',
//     height: '100%',
//     position: 'absolute',
//   },
//   heroOverlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'rgba(41, 47, 54, 0.7)',
//   },
//   heroContent: {
//     position: 'absolute',
//     bottom: 120,
//     left: 0,
//     right: 0,
//     paddingHorizontal: 24,
//   },
//   heroTitle: {
//     fontSize: 42,
//     fontWeight: '800',
//     color: 'white',
//     marginBottom: 16,
//     lineHeight: 50,
//   },
//   heroSubtitle: {
//     fontSize: 20,
//     color: 'rgba(255,255,255,0.9)',
//     marginBottom: 40,
//     fontWeight: '400',
//   },
//   heroButtons: {
//     flexDirection: 'row',
//     gap: 16,
//   },
//   primaryButton: {
//     backgroundColor: COLORS.primary,
//     paddingVertical: 18,
//     paddingHorizontal: 32,
//     borderRadius: 12,
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 10,
//     shadowColor: COLORS.primary,
//     shadowOffset: { width: 0, height: 10 },
//     shadowOpacity: 0.3,
//     shadowRadius: 20,
//     elevation: 5,
//   },
//   primaryButtonText: {
//     color: 'white',
//     fontWeight: '600',
//     fontSize: 16,
//   },
//   statsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     paddingVertical: 40,
//     backgroundColor: 'white',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.05,
//     shadowRadius: 10,
//     elevation: 2,
//   },
//   statItem: {
//     alignItems: 'center',
//     paddingHorizontal: 20,
//   },
//   statDivider: {
//     borderRightWidth: 1,
//     borderRightColor: 'rgba(0,0,0,0.1)',
//   },
//   statValue: {
//     fontSize: 32,
//     fontWeight: '700',
//     color: COLORS.dark,
//     marginBottom: 4,
//   },
//   statLabel: {
//     fontSize: 14,
//     color: COLORS.dark,
//     opacity: 0.7,
//     textTransform: 'uppercase',
//     letterSpacing: 1,
//   },
//   section: {
//     paddingVertical: 80,
//     paddingHorizontal: 24,
//     backgroundColor: 'white',
//   },
//   darkSection: {
//     backgroundColor: COLORS.dark,
//   },
//   lightText: {
//     color: COLORS.light,
//   },
//   sectionSubtitle: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: COLORS.primary,
//     marginBottom: 8,
//     textAlign: 'center',
//     letterSpacing: 2,
//     textTransform: 'uppercase',
//   },
//   sectionTitle: {
//     fontSize: 32,
//     fontWeight: '700',
//     color: COLORS.dark,
//     marginBottom: 48,
//     textAlign: 'center',
//     lineHeight: 40,
//   },
//   featuresGrid: {
//     paddingHorizontal: 12,
//   },
//   featureCard: {
//     flex: 1,
//     backgroundColor: 'white',
//     borderRadius: 16,
//     padding: 24,
//     margin: 8,
//     minHeight: 220,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: 'rgba(0,0,0,0.05)',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 5 },
//     shadowOpacity: 0.05,
//     shadowRadius: 10,
//     elevation: 2,
//   },
//   featureIconContainer: {
//     width: 64,
//     height: 64,
//     borderRadius: 32,
//     backgroundColor: 'rgba(255, 107, 107, 0.1)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   featureTitle: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: COLORS.dark,
//     marginBottom: 12,
//     textAlign: 'center',
//   },
//   featureDescription: {
//     fontSize: 14,
//     color: '#666',
//     textAlign: 'center',
//     lineHeight: 22,
//   },
//   stepsContainer: {
//     marginTop: 24,
//   },
//   step: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 32,
//   },
//   stepIcon: {
//     width: 48,
//     height: 48,
//     borderRadius: 24,
//     backgroundColor: COLORS.light,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 20,
//     position: 'relative',
//   },
//   stepNumber: {
//     position: 'absolute',
//     top: -8,
//     right: -8,
//     backgroundColor: COLORS.primary,
//     color: 'white',
//     width: 24,
//     height: 24,
//     borderRadius: 12,
//     textAlign: 'center',
//     lineHeight: 24,
//     fontSize: 12,
//     fontWeight: 'bold',
//   },
//   stepText: {
//     fontSize: 16,
//     color: COLORS.light,
//     flex: 1,
//     lineHeight: 24,
//   },
//   testimonialsContainer: {
//     paddingHorizontal: 24,
//   },
//   testimonialCard: {
//     width: width - 80,
//     backgroundColor: 'white',
//     borderRadius: 16,
//     padding: 24,
//     marginRight: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 10 },
//     shadowOpacity: 0.05,
//     shadowRadius: 20,
//     elevation: 3,
//   },
//   testimonialHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   testimonialAvatar: {
//     width: 48,
//     height: 48,
//     borderRadius: 24,
//     marginRight: 16,
//   },
//   testimonialUser: {
//     flex: 1,
//   },
//   testimonialName: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: COLORS.dark,
//   },
//   testimonialRole: {
//     fontSize: 14,
//     color: '#999',
//   },
//   ratingContainer: {
//     flexDirection: 'row',
//   },
//   testimonialText: {
//     fontSize: 16,
//     color: '#666',
//     lineHeight: 26,
//     fontStyle: 'italic',
//   },
//   ctaSection: {
//     paddingVertical: 100,
//     backgroundColor: COLORS.secondary,
//     alignItems: 'center',
//   },
//   ctaTitle: {
//     fontSize: 36,
//     fontWeight: '800',
//     color: 'white',
//     marginBottom: 16,
//     textAlign: 'center',
//     lineHeight: 44,
//   },
//   ctaSubtitle: {
//     fontSize: 18,
//     color: 'rgba(255,255,255,0.9)',
//     marginBottom: 40,
//     textAlign: 'center',
//     maxWidth: 500,
//   },
//   ctaButton: {
//     paddingHorizontal: 48,
//     shadowColor: COLORS.dark,
//   },
// });

import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
  Dimensions,
  Animated,
} from 'react-native';
import { MaterialIcons, Ionicons, Feather } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const COLORS = {
  primary: '#FF6B6B',
  secondary: '#4ECDC4',
  dark: '#2C3E50',
  light: '#FFFFFF',
  muted: '#AAB2BD',
};

const FEATURES = [
  {
    id: '1',
    title: 'Smart Recipes',
    description: 'AI-powered recommendations based on your pantry and preferences',
    icon: <Ionicons name="ios-restaurant" size={32} color={COLORS.primary} />,
  },
  {
    id: '2',
    title: 'Interactive Cooking',
    description: 'Step-by-step guidance with voice control and timers',
    icon: <MaterialIcons name="cooking" size={32} color={COLORS.primary} />,
  },
  {
    id: '3',
    title: 'Meal Planning',
    description: 'Automated weekly plans with smart grocery lists',
    icon: <Feather name="calendar" size={32} color={COLORS.primary} />,
  },
  {
    id: '4',
    title: 'Nutrition Tracking',
    description: 'Macro breakdowns and dietary customization',
    icon: <MaterialIcons name="nutrition" size={32} color={COLORS.primary} />,
  },
];

const TESTIMONIALS = [
  {
    id: '1',
    name: 'Sarah K.',
    role: 'Food Blogger',
    text: "DishDash revolutionized my meal prep. The AI recipe generator saves me hours each week!",
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 5,
  },
  {
    id: '2',
    name: 'Michael T.',
    role: 'Busy Dad',
    text: "Finally an app that makes cooking fun for the whole family. The interactive mode is genius.",
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 5,
  },
  {
    id: '3',
    name: 'Priya M.',
    role: 'Nutritionist',
    text: "My clients love the dietary tracking features. The clean interface makes it so accessible.",
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    rating: 4,
  },
];

const LandingPage = ({ navigation }) => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const FeatureCard = ({ feature }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.featureCard}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
      >
        <Animated.View style={[{ transform: [{ scale: scaleValue }] }]}>
          <View style={styles.featureIconContainer}>{feature.icon}</View>
          <Text style={styles.featureTitle}>{feature.title}</Text>
          <Text style={styles.featureDescription}>{feature.description}</Text>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  const TestimonialCard = ({ item }) => (
    <View style={styles.testimonialCard}>
      <View style={styles.testimonialHeader}>
        <Image source={{ uri: item.avatar }} style={styles.testimonialAvatar} />
        <View style={styles.testimonialUser}>
          <Text style={styles.testimonialName}>{item.name}</Text>
          <Text style={styles.testimonialRole}>{item.role}</Text>
        </View>
        <View style={styles.ratingContainer}>
          {[...Array(item.rating)].map((_, i) => (
            <MaterialIcons key={i} name="star" size={16} color={COLORS.primary} />
          ))}
        </View>
      </View>
      <Text style={styles.testimonialText}>"{item.text}"</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero Section */}
      <View style={styles.hero}>
        <Image
          source={{ uri: 'https://www.georgeinstitute.org/sites/default/files/2020-10/world-food-day-2020.png' }}
          style={styles.heroImage}
          blurRadius={1}
        />
        <View style={styles.heroOverlay} />
        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>Elevate Your Cooking Experience</Text>
          <Text style={styles.heroSubtitle}>AI-powered kitchen assistant with smart meal planning</Text>

          <View style={styles.heroButtons}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => navigation.replace('Tabs')}
              activeOpacity={0.8}
            >
              <Text style={styles.primaryButtonText}>Start Cooking</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Stats Bar */}
      <View style={styles.statsContainer}>
        {[
          { value: '10,000+', label: 'Recipes' },
          { value: '500K+', label: 'Active Users' },
          { value: '4.9', label: 'App Rating' },
        ].map((stat, index, arr) => (
          <View
            key={stat.label}
            style={[styles.statItem, index !== arr.length - 1 && styles.statDivider]}
          >
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Features Section */}
      <View style={styles.section}>
        <Text style={styles.sectionSubtitle}>WHY CHOOSE DISHDASH</Text>
        <Text style={styles.sectionTitle}>Smart Kitchen Features</Text>

        <FlatList
          data={FEATURES}
          renderItem={({ item }) => <FeatureCard feature={item} />}
          keyExtractor={item => item.id}
          numColumns={2}
          scrollEnabled={false}
          contentContainerStyle={styles.featuresGrid}
        />
      </View>

      {/* How It Works */}
      <View style={[styles.section, styles.darkSection]}>
        <Text style={[styles.sectionSubtitle, styles.lightText]}>GET STARTED</Text>
        <Text style={[styles.sectionTitle, styles.lightText]}>How DishDash Works</Text>

        <View style={styles.stepsContainer}>
          {[
            { icon: 'search', text: 'Browse recipes or scan ingredients' },
            { icon: 'calendar', text: 'Plan your meals for the week' },
            { icon: 'list', text: 'Generate automated grocery list' },
            { icon: 'cooking', text: 'Cook with interactive guidance' },
          ].map((step, index) => (
            <View key={index} style={styles.step}>
              <View style={styles.stepIcon}>
                <MaterialIcons name={step.icon} size={24} color={COLORS.primary} />
                <Text style={styles.stepNumber}>{index + 1}</Text>
              </View>
              <Text style={[styles.stepText, styles.lightText]}>{step.text}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Testimonials Carousel */}
      <View style={styles.section}>
        <Text style={styles.sectionSubtitle}>TESTIMONIALS</Text>
        <Text style={styles.sectionTitle}>What Our Users Say</Text>

        <FlatList
          data={TESTIMONIALS}
          renderItem={({ item }) => <TestimonialCard item={item} />}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          contentContainerStyle={styles.testimonialsContainer}
        />
      </View>

      {/* CTA Section */}
      <View style={[styles.section, styles.ctaSection]}>
        <Text style={styles.ctaTitle}>Ready to Transform Your Cooking?</Text>
        <Text style={styles.ctaSubtitle}>Join thousands of home chefs already using DishDash</Text>

        <TouchableOpacity
          style={[styles.primaryButton, styles.ctaButton]}
          onPress={() => navigation.replace('Tabs')}
        >
          <Text style={styles.primaryButtonText}>Get Started - It's Free</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light,
  },
  hero: {
    height: 600,
    width: '100%',
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(41, 47, 54, 0.7)',
  },
  heroContent: {
    position: 'absolute',
    bottom: 120,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
  },
  heroTitle: {
    fontSize: 42,
    fontWeight: '800',
    color: COLORS.light,
    marginBottom: 16,
    lineHeight: 50,
  },
  heroSubtitle: {
    fontSize: 20,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 40,
    fontWeight: '400',
  },
  heroButtons: {
    flexDirection: 'row',
    gap: 16,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 5,
  },
  primaryButtonText: {
    color: COLORS.light,
    fontWeight: '600',
    fontSize: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 40,
    backgroundColor: COLORS.light,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  statItem: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  statDivider: {
    borderRightWidth: 1,
    borderRightColor: 'rgba(0,0,0,0.1)',
  },
  statValue: {
    fontSize: 32,
    fontWeight: '700',
    color: COLORS.dark,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: COLORS.dark,
    opacity: 0.7,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  section: {
    paddingVertical: 80,
    paddingHorizontal: 24,
    backgroundColor: COLORS.light,
  },
  darkSection: {
    backgroundColor: COLORS.dark,
  },
  lightText: {
    color: COLORS.light,
  },
  sectionSubtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
    marginBottom: 8,
    textAlign: 'center',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  sectionTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: COLORS.dark,
    marginBottom: 48,
    textAlign: 'center',
    lineHeight: 40,
  },
  featuresGrid: {
    paddingHorizontal: 12,
  },
  featureCard: {
    flex: 1,
    backgroundColor: COLORS.light,
    borderRadius: 16,
    padding: 24,
    margin: 8,
    minHeight: 220,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  featureIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 107, 107, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 12,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 14,
    color: '#444',
    textAlign: 'center',
    lineHeight: 22,
  },
  stepsContainer: {
    marginTop: 24,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  stepIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.light,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    position: 'relative',
  },
  stepNumber: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: COLORS.primary,
    color: 'white',
    width: 24,
    height: 24,
    borderRadius: 12,
    textAlign: 'center',
    lineHeight: 24,
    fontSize: 12,
    fontWeight: 'bold',
  },
  stepText: {
    fontSize: 16,
    color: COLORS.light,
    flex: 1,
    lineHeight: 24,
  },
  testimonialsContainer: {
    paddingHorizontal: 24,
  },
  testimonialCard: {
    width: width - 80,
    backgroundColor: COLORS.light,
    borderRadius: 16,
    padding: 24,
    marginRight: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 3,
  },
  testimonialHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  testimonialAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  testimonialUser: {
    flex: 1,
  },
  testimonialName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.dark,
  },
  testimonialRole: {
    fontSize: 14,
    color: '#777',
  },
  ratingContainer: {
    flexDirection: 'row',
  },
  testimonialText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 26,
    fontStyle: 'italic',
  },
  ctaSection: {
    paddingVertical: 100,
    backgroundColor: COLORS.secondary,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 36,
    fontWeight: '800',
    color: COLORS.light,
    marginBottom: 16,
    textAlign: 'center',
    lineHeight: 44,
  },
  ctaSubtitle: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 40,
    textAlign: 'center',
    maxWidth: 500,
  },
  ctaButton: {
    paddingHorizontal: 48,
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
});

export default LandingPage;
