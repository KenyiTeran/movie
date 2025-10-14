// app/reservation/deportivo.tsx
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ReservationForm from '../../components/ReservationForm';

export default function DeportivoScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ReservationForm type="deportivo" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
});