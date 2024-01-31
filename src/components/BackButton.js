import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function BackButton({ goBack }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity onPress={goBack} style={styles.container}>
        <Image
          style={styles.image}
          source={require('../assets/arrow_back.png')}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    position: 'absolute',
    left: 4,
  },
  container: {
    top: 15,
    left: 5,
  },
  image: {
    width: 24,
    height: 24,
  },
});
