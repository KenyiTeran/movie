import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ResultSectionProps {
  hasSearched: boolean;
  reservationData: {
    type: 'deportivo' | 'laboratorio';
    campus: string;
    spaceType: string;
    date: string;
  };
}

interface ReservationData {
  id: string;
  type: 'deportivo' | 'laboratorio';
  campus: string;
  spaceType: string;
  date: string;
  hour: string;
  createdAt: string;
}

const ResultSection: React.FC<ResultSectionProps> = ({ hasSearched, reservationData }) => {
  const router = useRouter();
  const [selectedHour, setSelectedHour] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const availableHours = ['08:00', '12:00', '21:00'];
  const allHours = [
    '06:00', '07:00', '08:00', '09:00', '10:00',
    '11:00', '12:00', '13:00', '14:00', '15:00',
    '16:00', '17:00', '18:00', '19:00', '20:00',
    '21:00', '22:00'
  ];

  const handleSelectHour = (hour: string) => {
    if (availableHours.includes(hour)) {
      setSelectedHour(hour);
    }
  };

  const saveReservation = async () => {
    if (!selectedHour) return false;

    try {
      const newReservation: ReservationData = {
        id: Date.now().toString(),
        type: reservationData.type,
        campus: reservationData.campus,
        spaceType: reservationData.spaceType,
        date: reservationData.date,
        hour: selectedHour,
        createdAt: new Date().toISOString(),
      };

      // Obtener reservas existentes
      const existingReservations = await AsyncStorage.getItem('reservations');
      const reservations = existingReservations ? JSON.parse(existingReservations) : [];
      
      // Agregar nueva reserva
      reservations.push(newReservation);
      
      // Guardar todas las reservas
      await AsyncStorage.setItem('reservations', JSON.stringify(reservations));
      
      return true;
    } catch (error) {
      console.error('Error al guardar la reserva:', error);
      return false;
    }
  };

  const handleReserve = async () => {
    if (selectedHour) {
      // Guardar la reserva
      const saved = await saveReservation();
      
      if (saved) {
        setShowModal(true);
        // Redirigir al index tras 2 segundos
        setTimeout(() => {
          setShowModal(false);
          router.push('/');
        }, 2000);
      }
    }
  };

  if (!hasSearched) {
    return (
      <View style={styles.resultContainer}>
        <Text style={styles.resultTitle}>Resultado de horarios disponibles</Text>
        <Text style={styles.resultSubtitle}>
          Completa el formulario para encontrar recursos disponibles.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.resultContainer}>
      <Text style={styles.resultTitle}>Resultado de horarios disponibles</Text>
      <Text style={styles.resultSubtitle}>Selecciona un horario disponible.</Text>

      {/* Leyenda */}
      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#BFDBFE' }]} />
          <Text style={styles.legendText}>Disponible</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#D1D5DB' }]} />
          <Text style={styles.legendText}>No disponible</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#6D28D9' }]} />
          <Text style={styles.legendText}>Mi reserva</Text>
        </View>
      </View>

      {/* Mensaje informativo */}
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          ℹ️ La reserva de Espacios Deportivos/Gimnasio es de máximo 1 hora
        </Text>
      </View>

      {/* Cuadrícula de horarios */}
      <View style={styles.gridContainer}>
        {allHours.map((hour) => {
          const isAvailable = availableHours.includes(hour);
          const isSelected = selectedHour === hour;

          let bgColor = '#D1D5DB'; // gris por defecto
          let textColor = '#000';

          if (isAvailable) bgColor = '#BFDBFE'; // azul claro disponible
          if (isSelected) {
            bgColor = '#6D28D9'; // púrpura seleccionado
            textColor = '#FFF';
          }

          return (
            <TouchableOpacity
              key={hour}
              disabled={!isAvailable}
              onPress={() => handleSelectHour(hour)}
              style={[styles.hourButton, { backgroundColor: bgColor }]}
            >
              <Text style={[styles.hourText, { color: textColor }]}>{hour}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Botón Reservar */}
      <TouchableOpacity
        style={[
          styles.reserveButton,
          { opacity: selectedHour ? 1 : 0.6 },
        ]}
        disabled={!selectedHour}
        onPress={handleReserve}
      >
        <Text style={styles.reserveText}>Reservar</Text>
      </TouchableOpacity>

      {/* Modal de reserva exitosa */}
      <Modal visible={showModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Ionicons name="checkmark-circle" size={70} color="#22C55E" />
            <Text style={styles.modalText}>¡Reserva exitosa!</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  resultContainer: {
    marginTop: 20,
    marginBottom: 40,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E3A5F',
    marginBottom: 10,
  },
  resultSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 15,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 15,
    height: 15,
    borderRadius: 4,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    color: '#444',
  },
  infoBox: {
    backgroundColor: '#DBEAFE',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  infoText: {
    color: '#1E40AF',
    fontSize: 13,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  hourButton: {
    width: 60,
    height: 45,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hourText: {
    fontWeight: '600',
  },
  reserveButton: {
    backgroundColor: '#6D28D9',
    borderRadius: 12,
    paddingVertical: 12,
    marginTop: 25,
  },
  reserveText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
  },
  modalText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
});

export default ResultSection;
