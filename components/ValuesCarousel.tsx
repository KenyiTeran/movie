import React, { useState, useEffect, useRef } from 'react';
import { Dimensions, Image, View, Animated, Modal, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface CarouselItem {
  id: number;
  image: any;
}

interface ValuesCarouselProps {
  images: any[];  
  autoPlay?: boolean; 
  autoPlayDuration?: number; 
  height?: number;
}

export default function ValuesCarousel({ 
  images, 
  autoPlay = true,
  autoPlayDuration = 3000,
  height = 160 
}: ValuesCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomedImage, setZoomedImage] = useState<any>(null);
  const [isAutoPlayActive, setIsAutoPlayActive] = useState(autoPlay);
  const carouselRef = useRef<any>(null);
  
  const carouselData: CarouselItem[] = images.map((image, index) => ({
    id: index + 1,
    image: image,
  }));
  
  const animatedValues = useRef(
    carouselData.map(() => new Animated.Value(0))
  ).current;

  // Escala para el zoom
  const scaleValue = useRef(new Animated.Value(1)).current;
  const lastTap = useRef<number>(0);

  useEffect(() => {
    animatedValues.forEach((animValue, index) => {
      Animated.timing(animValue, {
        toValue: index === currentIndex ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    });
  }, [currentIndex]);

  // Manejar doble clic
  const handleDoubleTap = (image: any) => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;

    if (now - lastTap.current < DOUBLE_TAP_DELAY) {
      // Es un doble clic
      setZoomedImage(image);
      setIsZoomed(true);
      setIsAutoPlayActive(false); // Pausar autoplay
      
      // Animar el zoom in
      Animated.spring(scaleValue, {
        toValue: 1,
        useNativeDriver: true,
        friction: 7,
      }).start();
    }
    
    lastTap.current = now;
  };

  // Cerrar zoom
  const handleCloseZoom = () => {
    Animated.timing(scaleValue, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setIsZoomed(false);
      setZoomedImage(null);
      setIsAutoPlayActive(autoPlay); // Reanudar autoplay
    });
  };

  const renderItem = ({ item }: { item: CarouselItem }) => {
    return (
      <TouchableWithoutFeedback onPress={() => handleDoubleTap(item.image)}>
        <View className="flex-1 justify-center items-center px-2">
          <Image
            source={item.image}
            className="w-full rounded-2xl"
            style={{ height }}
            resizeMode="cover"
          />
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <View className="mt-6">
      <Carousel
        ref={carouselRef}
        loop
        width={SCREEN_WIDTH - 40}
        height={height}
        autoPlay={isAutoPlayActive}
        data={carouselData}
        scrollAnimationDuration={autoPlayDuration}
        renderItem={renderItem}
        onSnapToItem={(index) => setCurrentIndex(index)}
        panGestureHandlerProps={{
          activeOffsetX: [-10, 10],
          enabled: !isZoomed, // Deshabilitar gestos cuando está en zoom
        }}
      />
      
      {/* Indicador de paginación */}
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

      {/* Modal de Zoom */}
      <Modal
        visible={isZoomed}
        transparent
        animationType="none"
        onRequestClose={handleCloseZoom}
      >
        <TouchableWithoutFeedback onPress={handleCloseZoom}>
          <View style={styles.modalOverlay}>
            {/* Botón de cerrar */}
            <TouchableWithoutFeedback onPress={handleCloseZoom}>
              <View style={styles.closeButton}>
                <View style={styles.closeIconContainer}>
                  <View style={styles.closeIconLine1} />
                  <View style={styles.closeIconLine2} />
                </View>
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback>
              <Animated.View
                style={[
                  styles.zoomedImageContainer,
                  {
                    transform: [{ scale: scaleValue }],
                  },
                ]}
              >
                <Image
                  source={zoomedImage}
                  style={styles.zoomedImage}
                  resizeMode="contain"
                />
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  zoomedImageContainer: {
    width: SCREEN_WIDTH * 0.95,
    height: SCREEN_HEIGHT * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  zoomedImage: {
    width: '100%',
    height: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 22,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  closeIconContainer: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIconLine1: {
    position: 'absolute',
    width: 20,
    height: 2,
    backgroundColor: '#000',
    transform: [{ rotate: '45deg' }],
  },
  closeIconLine2: {
    position: 'absolute',
    width: 20,
    height: 2,
    backgroundColor: '#000',
    transform: [{ rotate: '-45deg' }],
  },
});