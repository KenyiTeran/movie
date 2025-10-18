import React, { useState, useCallback, useRef } from "react";
import { Image, Text, View, TouchableOpacity, ScrollView, Alert, Dimensions, NativeScrollEvent, NativeSyntheticEvent } from "react-native";
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

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH - 84; // Ancho de la tarjeta (considerando padding de 42px a cada lado)

export default function Reservation() {
  const [reservations, setReservations] = useState<ReservationData[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

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
        parsed.sort((a: ReservationData, b: ReservationData) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setReservations(parsed);
      }
    } catch (error) {
      console.error('Error al cargar reservas:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadReservations();
      setActiveIndex(0); // Reset al primer slide
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
              
              // Ajustar el índice activo si eliminamos una tarjeta
              if (activeIndex >= filtered.length && filtered.length > 0) {
                setActiveIndex(filtered.length - 1);
              } else if (filtered.length === 0) {
                setActiveIndex(0);
              }
            } catch (error) {
              console.error('Error al eliminar reserva:', error);
            }
          },
        },
      ]
    );
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / CARD_WIDTH);
    setActiveIndex(index);
  };

  const scrollToIndex = (index: number) => {
    scrollViewRef.current?.scrollTo({
      x: index * CARD_WIDTH,
      animated: true,
    });
  };

  return (
    <View className="bg-white rounded-2xl p-[21px] mt-8" style={theme.shadows.base}>
      <View className="flex flex-row items-center">
        <Image source={Calendar} />
        <Text style={{ fontFamily: "SolanoGothicMVB-Bold" }} className="text-3xl">
          RESERVAS
        </Text>
      </View>

      {/* Tarjetas de opciones */}
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

      {/* Slider de Reservas */}
      {reservations.length > 0 && (
        <View className="mt-6">
          <Text className="text-lg font-bold text-[#1E3A5F] mb-3">
            Mis Reservas
          </Text>
          
          {/* ScrollView Horizontal */}
          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            decelerationRate="fast"
            snapToInterval={CARD_WIDTH}
            snapToAlignment="center"
            contentContainerStyle={{
              paddingRight: 0,
            }}
          >
            {reservations.map((reservation, index) => (
              <View
                key={reservation.id}
                style={{
                  width: CARD_WIDTH,
                  marginRight: index < reservations.length - 1 ? 16 : 0,
                }}
              >
                <View className="bg-gray-50 rounded-lg p-4 border border-gray-200">
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
              </View>
            ))}
          </ScrollView>

          {/* Indicadores de puntos (dots) */}
          {reservations.length > 1 && (
            <View className="flex flex-row justify-center items-center mt-4 gap-x-2">
              {reservations.map((_, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => scrollToIndex(index)}
                  activeOpacity={0.8}
                >
                  <View
                    style={{
                      width: activeIndex === index ? 24 : 8,
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: activeIndex === index ? '#E50A17' : '#D1D5DB',
                      transition: 'all 0.3s ease',
                    }}
                  />
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      )}

      {/* Mensaje cuando no hay reservas */}
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