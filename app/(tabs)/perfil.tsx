import { ScrollView, Text, View, Image } from "react-native";

export default function Perfil() {
  return (
    <ScrollView className="flex-1 bg-[#F8FAFE]">
      <View className="px-5 pt-14">
        <Text 
          style={{ fontFamily: "SolanoGothicMVB-Bold" }}
          className="text-3xl text-black mb-4"
        >
          Perfil
        </Text>
        <View className="items-center mt-4">
          <Image
            source={require("../../assets/images/logo.png")}
            className="w-24 h-24 rounded-full"
          />
          <Text className="text-xl font-bold mt-4">Kenyi Wilson</Text>
          <Text className="text-gray-600">Estudiante UPC</Text>
        </View>
      </View>
    </ScrollView>
  );
}