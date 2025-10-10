import { useFonts } from "expo-font";
import { Image, Text, View } from "react-native";
import Campana from "../assets/svg/campana.svg"; // Tu icono SVG

export default function Index() {
  const [fontsLoaded] = useFonts({
    "SolanoGothicMVB-Bold": require("../assets/fonts/solano-gothic-mvb-bold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View className="flex-1 bg-[#F8FAFE] px-5 pt-14">
      
      {/* Header */}
      <View className="flex-row justify-between items-center">
        <View className="flex-row items-center gap-x-1">
          <Text
            style={{ fontFamily: "SolanoGothicMVB-Bold" }}
            className="text-2xl text-black"
          >
            MI UPC
          </Text>

          <View className="w-[1.5px] h-6 bg-gray-300 mx-2" />

          <Image
            source={require("../assets/images/logo.png")}
            className="w-8 h-8 rounded-md"
          />
        </View>

        <View className="mr-2 rounded-full p-2 bg-white">
          <Campana width={25} height={25}/>
        </View>
      </View>

      {/* Welcome section */}
      <View className="flex-row justify-between items-center mt-10">
        <View>
          <Text className="text-2xl text-red-600">Hola,</Text>
          <Text
            style={{ fontFamily: "SolanoGothicMVB-Bold" }}
            className="text-3xl text-red-600"
          >
            Kenyi Wilson
          </Text>
          <Text className="text-base text-slate-600 mt-1">
            ¡Te damos la bienvenida!
          </Text>
        </View>

        <Image
          source={require("../assets/images/saludo.jpg")}
          className="w-36 h-36"
          resizeMode="contain"
        />
      </View>
    </View>
  );
}
