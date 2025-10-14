// components/ReservationForm.tsx
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Modal, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type ReservationType = 'deportivo' | 'laboratorio';

interface ReservationFormProps {
  type: ReservationType;
}

const ReservationForm: React.FC<ReservationFormProps> = ({ type }) => {
  const [campus, setCampus] = useState('');
  const [spaceType, setSpaceType] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showCampusDropdown, setShowCampusDropdown] = useState(false);
  const [showSpaceDropdown, setShowSpaceDropdown] = useState(false);

  const campusOptions = ['Monterrico', 'San Isidro', 'San Miguel', 'Villa'];
  
  const spaceOptions = type === 'deportivo' 
    ? [
        'Espacio deportivos/Gimnasios',
        'Espacio deportivos/Losa 1',
        'Espacio deportivos/Losa 2'
      ]
    : [
        'Laboratorio de Computación',
        'Laboratorio de Física',
        'Laboratorio de Química',
        'Laboratorio de Ingeniería',
        'Laboratorio de Diseño'
      ];

  const title = type === 'deportivo' 
    ? 'RESERVAR UN ESPACIO DEPORTIVO' 
    : 'RESERVAR DE LABORATORIO';

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const validateForm = () => {
    if (!campus) {
      Alert.alert('Error', 'Por favor selecciona un campus');
      return false;
    }
    if (!spaceType) {
      Alert.alert('Error', `Por favor selecciona un tipo de ${type === 'deportivo' ? 'espacio deportivo' : 'laboratorio'}`);
      return false;
    }
    return true;
  };

  const handleConsultar = () => {
    if (validateForm()) {
      Alert.alert(
        'Consulta enviada',
        `Campus: ${campus}\nEspacio: ${spaceType}\nFecha: ${formatDate(date)}`,
        [
          {
            text: 'OK',
            onPress: () => console.log('Consulta procesada')
          }
        ]
      );
    }
  };

  const handleSelectCampus = (option: string) => {
    setCampus(option);
    setShowCampusDropdown(false);
  };

  const handleSelectSpace = (option: string) => {
    setSpaceType(option);
    setShowSpaceDropdown(false);
  };

  return (
    <ScrollView style={[styles.container, { zIndex: 1 }]} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={28} color="#000" />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>{title}</Text>

      <Text style={styles.subtitle}>Consulta tus horarios disponibles</Text>

      <View style={styles.formContainer}>
        {/* Campus */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Campus *</Text>
          <TouchableOpacity
            style={[styles.selectInput, showCampusDropdown && styles.selectInputActive]}
            onPress={() => {
              setShowCampusDropdown(!showCampusDropdown);
              setShowSpaceDropdown(false);
            }}
          >
            <Text style={[styles.selectText, !campus && styles.placeholderText]}>
              {campus || '--Seleccionar--'}
            </Text>
            <Ionicons 
              name={showCampusDropdown ? "chevron-up" : "chevron-down"} 
              size={24} 
              color="#666" 
            />
          </TouchableOpacity>
          
          {showCampusDropdown && (
            <View style={styles.dropdownContainer}>
              {campusOptions.map((option, index) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.dropdownOption,
                    index === campusOptions.length - 1 && styles.lastOption
                  ]}
                  onPress={() => handleSelectCampus(option)}
                >
                  <Text style={styles.dropdownOptionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Tipo de espacio */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            Tipo de espacio {type === 'deportivo' ? 'deportivo' : ''} *
          </Text>
          <TouchableOpacity
            style={[styles.selectInput, showSpaceDropdown && styles.selectInputActive]}
            onPress={() => {
              setShowSpaceDropdown(!showSpaceDropdown);
              setShowCampusDropdown(false);
            }}
          >
            <Text style={[styles.selectText, !spaceType && styles.placeholderText]}>
              {spaceType || '--Seleccionar--'}
            </Text>
            <Ionicons 
              name={showSpaceDropdown ? "chevron-up" : "chevron-down"} 
              size={24} 
              color="#666" 
            />
          </TouchableOpacity>
          
          {showSpaceDropdown && (
            <View style={styles.dropdownContainer}>
              {spaceOptions.map((option, index) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.dropdownOption,
                    index === spaceOptions.length - 1 && styles.lastOption
                  ]}
                  onPress={() => handleSelectSpace(option)}
                >
                  <Text style={styles.dropdownOptionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Fecha */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Día de reserva *</Text>
          <TouchableOpacity
            style={styles.dateInput}
            onPress={() => {
              setShowDatePicker(true);
              setShowCampusDropdown(false);
              setShowSpaceDropdown(false);
            }}
          >
            <Text style={styles.dateText}>{formatDate(date)}</Text>
            <Ionicons name="calendar-outline" size={24} color="#666" />
          </TouchableOpacity>
        </View>

        <Modal visible={showDatePicker} transparent animationType="fade">
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                <DateTimePicker
                    value={date}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
                    onChange={(event, selectedDate) => {
                    if (Platform.OS === 'android') {
                        setShowDatePicker(false);
                        if (selectedDate) setDate(selectedDate);
                    } else if (event.type === 'set' && selectedDate) {
                        setDate(selectedDate);
                    }
                    }}
                    minimumDate={new Date()}
                />
                {Platform.OS === 'ios' && (
                    <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setShowDatePicker(false)}
                    >
                    <Text style={styles.closeButtonText}>Listo</Text>
                    </TouchableOpacity>
                )}
                </View>
            </View>
        </Modal>


        {/* Botón Consultar */}
        <TouchableOpacity style={styles.button} onPress={handleConsultar}>
          <Text style={styles.buttonText}>Consultar</Text>
        </TouchableOpacity>

        {/* Resultado */}
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Resultado de horarios disponibles</Text>
          <Text style={styles.resultSubtitle}>
            Completa el formulario para encontrar recursos disponibles:
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    marginBottom: 10,
    color: '#000',
  },
  subtitle: {
    fontSize: 18,
    color: '#1E3A5F',
    fontWeight: '600',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  formContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  inputGroup: {
    marginBottom: 25,
    position: 'relative',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E3A5F',
    marginBottom: 8,
  },
  selectInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 50,
  },
  selectInputActive: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  selectText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  placeholderText: {
    color: '#999',
  },
  dropdownContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderTopWidth: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    overflow: 'hidden',
    elevation: 5, // sombra Android
    shadowColor: '#000', // sombra iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  dropdownOption: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  lastOption: {
    borderBottomWidth: 0,
  },
  dropdownOptionText: {
    fontSize: 16,
    color: '#333',
  },
  dateInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#E31E24',
    borderRadius: 8,
    padding: 18,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
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
    lineHeight: 20,
  },
  modalContainer: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.4)',
  justifyContent: 'center',
  alignItems: 'center',
},
  modalContent: {
  backgroundColor: '#fff',
  borderRadius: 12,
  padding: 20,
  width: '85%',
  alignItems: 'center',
},
  closeButton: {
  marginTop: 15,
  backgroundColor: '#E31E24',
  paddingVertical: 10,
  paddingHorizontal: 25,
  borderRadius: 8,
},
  closeButtonText: {
  color: '#fff',
  fontWeight: 'bold',
  fontSize: 16,
},
});

export default ReservationForm;
