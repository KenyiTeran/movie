import React, { useState, useCallback } from "react";
import { Image, Text, View, TouchableOpacity, ScrollView, Alert } from "react-native";
import { router, useFocusEffect } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Calendar from "../assets/images/Calendar.png";
import cardPartRed from "../assets/images/cardPart.png";
import cardPartPurple from "../assets/images/cardPartPurple.png";
import { theme } from "../src/theme";

interface ReservationData {
  id: string;
  type: 'deportivo' | 'laboratorio';
  campus: string;
  spaceType: string;
  date: string;
  hour: string;
  createdAt: string;
}

export default function Reservation() {
  const [reservations, setReservations] = useState<ReservationData[]>([]);

  const cards = [
    {
      id: 1,
      title: "Espacios deportivos",
      description: "Canchas, Gimnasio, Piscina",
      bgColor: "#E50A17",
      image: cardPartRed,
      route: "/reservation/deportivo"
    },
    {
      id: 2,
      title: "Laboratorios",
      description: "Cómputo, ingeniería, diseño",
      bgColor: "#7961F4",
      image: cardPartPurple,
      route: "/reservation/laboratorio"
    }
  ];

  const loadReservations = async () => {
    try {
      const storedReservations = await AsyncStorage.getItem('reservations');
      if (storedReservations) {
        const parsed = JSON.parse(storedReservations);
        // Ordenar por fecha de creación (más recientes primero)
        parsed.sort((a: ReservationData, b: ReservationData) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setReservations(parsed);
      }
    } catch (error) {
      console.error('Error al cargar reservas:', error);
    }
  };

  // Recargar reservas cuando la pantalla obtiene foco
  useFocusEffect(
    useCallback(() => {
      loadReservations();
    }, [])
  );

  const handleCardPress = (route: string) => {
    router.push(route);
  };

  const handleDeleteReservation = async (id: string) => {
    Alert.alert(
      'Eliminar reserva',
      '¿Estás seguro de que deseas eliminar esta reserva?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              const filtered = reservations.filter(r => r.id !== id);
              await AsyncStorage.setItem('reservations', JSON.stringify(filtered));
              setReservations(filtered);
            } catch (error) {
              console.error('Error al eliminar reserva:', error);
            }
          },
        },
      ]
    );
  };

  return (
    <View className="bg-white rounded-2xl p-[21px] mt-8" style={theme.shadows.base}>
      <View className="flex flex-row items-center">
        <Image source={Calendar} />
        <Text style={{ fontFamily: "SolanoGothicMVB-Bold" }} className="text-3xl">
          RESERVAS
        </Text>
      </View>

      {/* Tarjetas */}
      <View className="mt-[14px] flex flex-row gap-x-3">
        {cards.map((card) => (
          <TouchableOpacity
            key={card.id}
            onPress={() => handleCardPress(card.route)}
            activeOpacity={0.8}
            className="w-[155px] h-[105px] rounded-[14px] relative flex justify-center"
            style={{ backgroundColor: card.bgColor }}
          >
            <Image source={card.image} className="absolute top-0 right-0" />
            <View className="flex gap-y-1 pl-[13px]">
              <Text className="text-[13px] font-bold text-white">{card.title}</Text>
              <Text className="text-[12px] font-semibold text-start text-white">
                {card.description}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Lista de Reservas */}
      {reservations.length > 0 && (
        <View className="mt-6">
          <Text className="text-lg font-bold text-[#1E3A5F] mb-3">
            Mis Reservas
          </Text>
          <ScrollView style={{ maxHeight: 400 }} showsVerticalScrollIndicator={false}>
            {reservations.map((reservation) => (
              <View
                key={reservation.id}
                className="bg-gray-50 rounded-lg p-4 mb-3 border border-gray-200"
              >
                <View className="flex flex-row justify-between items-start">
                  <View className="flex-1">
                    <View className="flex flex-row items-center mb-2">
                      <View
                        className="w-3 h-3 rounded-full mr-2"
                        style={{
                          backgroundColor:
                            reservation.type === 'deportivo' ? '#E50A17' : '#7961F4',
                        }}
                      />
                      <Text className="text-base font-bold text-gray-800">
                        {reservation.type === 'deportivo'
                          ? 'Espacio Deportivo'
                          : 'Laboratorio'}
                      </Text>
                    </View>

                    <View className="ml-5">
                      <View className="flex flex-row items-center mb-1">
                        <Ionicons name="location-outline" size={16} color="#666" />
                        <Text className="text-sm text-gray-600 ml-1">
                          {reservation.campus}
                        </Text>
                      </View>

                      <View className="flex flex-row items-center mb-1">
                        <Ionicons name="cube-outline" size={16} color="#666" />
                        <Text className="text-sm text-gray-600 ml-1" numberOfLines={2}>
                          {reservation.spaceType}
                        </Text>
                      </View>

                      <View className="flex flex-row items-center mb-1">
                        <Ionicons name="calendar-outline" size={16} color="#666" />
                        <Text className="text-sm text-gray-600 ml-1">
                          {reservation.date}
                        </Text>
                      </View>

                      <View className="flex flex-row items-center">
                        <Ionicons name="time-outline" size={16} color="#666" />
                        <Text className="text-sm text-gray-600 ml-1">
                          {reservation.hour}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <TouchableOpacity
                    onPress={() => handleDeleteReservation(reservation.id)}
                    className="p-2"
                  >
                    <Ionicons name="trash-outline" size={20} color="#E50A17" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      )}

      {reservations.length === 0 && (
        <View className="mt-6 p-4 bg-gray-50 rounded-lg">
          <Text className="text-center text-gray-500 text-sm">
            No tienes reservas activas. Haz clic en una tarjeta para crear una.
          </Text>
        </View>
      )}
    </View>
  );
}