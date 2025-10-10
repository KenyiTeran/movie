import React, { useState, useEffect, useRef } from 'react';
import { Dimensions, Image, View, Animated } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

import slider from "../assets/images/slider1.png";

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface CarouselItem {
  id: number;
  image: any;
}

const carouselData: CarouselItem[] = [
  {
    id: 1,
    image: slider,
  },
  {
    id: 2,
    image: slider,
  },
  {
    id: 3,
    image: slider,
  },
];

export default function ValuesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Crear referencias animadas para cada indicador
  const animatedValues = useRef(
    carouselData.map(() => new Animated.Value(0))
  ).current;

  // Animar los indicadores cuando cambia el índice
  useEffect(() => {
    animatedValues.forEach((animValue, index) => {
      Animated.timing(animValue, {
        toValue: index === currentIndex ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    });
  }, [currentIndex]);

  const renderItem = ({ item }: { item: CarouselItem }) => {
    return (
      <View className="flex-1 justify-center items-center px-2">
        <Image
          source={item.image}
          className="w-full h-40 rounded-2xl"
          resizeMode="cover"
        />
      </View>
    );
  };

  return (
    <View className="mt-6">
      <Carousel
        loop
        width={SCREEN_WIDTH - 40}
        height={160}
        autoPlay={true}
        data={carouselData}
        scrollAnimationDuration={3000}
        renderItem={renderItem}
        onSnapToItem={(index) => setCurrentIndex(index)}
        panGestureHandlerProps={{
          activeOffsetX: [-10, 10],
        }}
      />
      
      {/* Indicador de paginación con animación */}
      <View className="flex-row justify-center items-center mt-4 gap-x-2">
        {carouselData.map((_, index) => {
          const width = animatedValues[index].interpolate({
            inputRange: [0, 1],
            outputRange: [8, 32],
          });

          const backgroundColor = animatedValues[index].interpolate({
            inputRange: [0, 1],
            outputRange: ['#D1D5DB', '#DC2626'],
          });

          return (
            <Animated.View
              key={index}
              style={{
                width,
                backgroundColor,
                height: 8,
                borderRadius: 9999,
              }}
            />
          );
        })}
      </View>
    </View>
  );
}