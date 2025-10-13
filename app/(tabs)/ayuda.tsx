import { ScrollView, Text, View } from "react-native";

export default function Ayuda() {
  return (
    <ScrollView className="flex-1 bg-[#F8FAFE]">
      <View className="px-5 pt-14">
        <Text 
          style={{ fontFamily: "SolanoGothicMVB-Bold" }}
          className="text-3xl text-black mb-4"
        >
          Ayuda
        </Text>
        <Text className="text-base text-gray-700">
          Aquí puedes encontrar ayuda sobre la aplicación.
        </Text>
      </View>
    </ScrollView>
  );
}