import { Text, TouchableOpacity, View } from "react-native";

interface HelpSectionProps {
  icon: string;
  title: string;
  description: string;
  isLast?: boolean;
  onPress?: () => void;
}

export default function HelpSection({ 
  icon, 
  title, 
  description, 
  isLast,
  onPress 
}: HelpSectionProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-row items-center p-4 mb-3 rounded-xl ${
        isLast ? 'bg-[#3A1192]' : 'bg-white'
      }`}
      activeOpacity={0.7}
    >
      <View className="mr-4">
        <Text className="text-3xl">{icon}</Text>
      </View>
      
      <View className="flex-1">
        <Text
          style={{ fontFamily: "SolanoGothicMVB-Bold" }}
          className={`text-base mb-1 ${isLast ? 'text-white' : 'text-black'}`}
        >
          {title}
        </Text>
        <Text 
          className={`text-sm leading-5 ${isLast ? 'text-white/90' : 'text-gray-600'}`}
        >
          {description}
        </Text>
      </View>
      
      <View>
        <Text className={`text-2xl ${isLast ? 'text-white' : 'text-[#E3000F]'}`}>
          ›
        </Text>
      </View>
    </TouchableOpacity>
  );
}