import { BookOpen, ChevronDown } from 'lucide-react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../src/theme';

interface Course {
  id: number;
  name: string;
  mode: 'VIRTUAL' | 'PRESENCIAL';
  average: string;
}

interface CoursesSliderProps {
  courses?: Course[];
  autoPlay?: boolean;
  autoPlayDuration?: number;
}

const { width: screenWidth } = Dimensions.get('window');
const CARD_WIDTH = screenWidth - 40; // 20px padding a cada lado

export default function CoursesSlider({
  courses = [
    { id: 1, name: 'Diseño y Tecnologías UX', mode: 'VIRTUAL', average: '-' },
    { id: 2, name: 'Física 2', mode: 'PRESENCIAL', average: '-' },
    { id: 3, name: 'Ingeniería de requerimientos', mode: 'VIRTUAL', average: '-' },
    { id: 4, name: 'Matemática discreta', mode: 'VIRTUAL', average: '-' },
  ],
  autoPlay = true,
  autoPlayDuration = 3500,
}: CoursesSliderProps) {
  const scrollRef = useRef<ScrollView>(null);
  const [expandedCourses, setExpandedCourses] = useState<number[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // Dots animados
  const animatedValues = useRef(
    courses.map(() => new Animated.Value(0))
  ).current;

  // Actualizar animaciones al cambiar de índice
  useEffect(() => {
    animatedValues.forEach((animValue, index) => {
      Animated.timing(animValue, {
        toValue: index === activeIndex ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    });
  }, [activeIndex]);

  // Autoplay
  useEffect(() => {
    if (!autoPlay || courses.length <= 1) return;
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % courses.length;
      scrollRef.current?.scrollTo({
        x: nextIndex * CARD_WIDTH,
        animated: true,
      });
      setActiveIndex(nextIndex);
    }, autoPlayDuration);
    return () => clearInterval(interval);
  }, [activeIndex, autoPlay, autoPlayDuration, courses.length]);

  const toggleExpand = (courseId: number) => {
    setExpandedCourses((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId]
    );
  };

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / CARD_WIDTH);
    setActiveIndex(index);
  };

  return (
    <View className="my-8">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-4 px-5">
        <View className="flex-row items-center">
          <BookOpen color="#000000" size={24} />
          <Text
            style={{ fontFamily: 'SolanoGothicMVB-Bold' }}
            className="ml-2 text-3xl text-black"
          >
            CURSOS
          </Text>
        </View>

        <TouchableOpacity>
          <Text className="text-blue-600 text-base font-semibold">
            Ver todos →
          </Text>
        </TouchableOpacity>
      </View>

      {/* Slider */}
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        pagingEnabled
        snapToInterval={CARD_WIDTH}
        decelerationRate="fast"
        contentContainerStyle={{ paddingHorizontal: 20 }}
      >
        {courses.map((course, index) => (
          <View
            key={course.id}
            className="bg-white rounded-2xl p-4"
            style={[
              theme.shadows.base,
              {
                width: CARD_WIDTH - 40,
                marginRight: index < courses.length - 1 ? 20 : 0,
              },
            ]}
          >
            {/* Course Header */}
            <View className="flex-row items-center mb-3">
              <View className="bg-red-100 p-2 rounded-lg">
                <BookOpen color="#E50914" size={20} />
              </View>
              <View className="ml-3 flex-1">
                <Text className="text-gray-600 text-xs font-medium mb-1">
                  CURSO
                </Text>
                <Text className="text-gray-900 text-base font-bold" numberOfLines={2}>
                  {course.name}
                </Text>
              </View>
            </View>

            {/* Mode Badge */}
            <View
              className={`self-start px-3 py-1.5 rounded-full mb-4 ${
                course.mode === 'VIRTUAL' ? 'bg-green-100' : 'bg-red-100'
              }`}
            >
              <Text
                className={`text-xs font-bold ${
                  course.mode === 'VIRTUAL' ? 'text-green-700' : 'text-red-700'
                }`}
              >
                {course.mode}
              </Text>
            </View>

            {/* Average Section */}
            <View className="bg-gray-50 rounded-xl p-4 mb-3">
              <View className="flex-row justify-between items-center">
                <Text className="text-gray-600 text-sm font-medium">
                  Promedio final:
                </Text>
                <Text className="text-2xl font-bold text-gray-800">
                  {course.average}
                </Text>
              </View>
            </View>

            {/* Expand Button */}
            <TouchableOpacity
              onPress={() => toggleExpand(course.id)}
              className="flex-row items-center justify-center py-2"
            >
              <Text className="text-blue-600 font-semibold mr-1">
                Ver más detalle
              </Text>
              <ChevronDown
                color="#2563EB"
                size={20}
                style={{
                  transform: expandedCourses.includes(course.id)
                    ? [{ rotate: '180deg' }]
                    : [{ rotate: '0deg' }],
                }}
              />
            </TouchableOpacity>

            {/* Expanded Content */}
            {expandedCourses.includes(course.id) && (
              <View className="mt-3 pt-3 border-t border-gray-200">
                <Text className="text-gray-600 text-sm">
                  Aquí puedes agregar información adicional del curso...
                </Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Pagination Dots */}
      <View className="flex-row justify-center items-center mt-4 gap-x-2">
        {courses.map((_, index) => {
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
