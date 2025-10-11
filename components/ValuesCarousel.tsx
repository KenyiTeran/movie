import React, { useState, useEffect, useRef } from 'react';
import { Dimensions, Image, View, Animated } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface CarouselItem {
  id: number;
  image: any;
}

interface ValuesCarouselProps {
  images: any[];  
  autoPlay?: boolean; 
  autoPlayDuration?: number; 
  height?: number;  // Por defecto 160
}

export default function ValuesCarousel({ 
  images, 
  autoPlay = true,
  autoPlayDuration = 3000,
  height = 160 
}: ValuesCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Convierte el array de imágenes en el formato que necesita el carrusel
  const carouselData: CarouselItem[] = images.map((image, index) => ({
    id: index + 1,
    image: image,
  }));
  
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
          className="w-full rounded-2xl"
          style={{ height }}
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
        height={height}
        autoPlay={autoPlay}
        data={carouselData}
        scrollAnimationDuration={autoPlayDuration}
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