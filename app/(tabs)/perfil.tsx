import { Image, ImageBackground, Linking, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../../src/theme";

export default function Perfil() {
  const handleTIUVirtual = () => {
    console.log("Navegando a TIU Virtual");
    // Aquí puedes agregar la navegación o apertura de link
  };

  const handleLogout = () => {
    console.log("Cerrando sesión");
    // Aquí puedes agregar la lógica de cierre de sesión
  };

  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView className="flex-1 bg-[#F8FAFE]">
      <View className="pt-8 pb-6">
        {/* Header con imagen de fondo universitaria */}
        <View className="mb-6">
          
          <ImageBackground source={require("../../assets/images/HeaderBackground.jpg")} className="h-[144px] items-center justify-center" imageStyle={{resizeMode: "cover"}}>

          </ImageBackground>
          
          {/* Foto de perfil */}
          <View className="items-center -mt-[6.5rem] mb-4">
            <View className="w-auto h-[105px] bg-white rounded-full items-center justify-center" style={theme.shadows.base}>
                  <Image source={require('../../assets/images/user.png')}/>
            </View>
          </View>

          {/* Información del estudiante */}
          <View className="items-center pb-6 px-4">
            <Text
              style={{ fontFamily: "SolanoGothicMVB-Bold" }}
              className="text-[#E3000F] text-[26px] mb-1 text-center"
            >
              NOMBRE DE USUARIO
            </Text>
            
            <Text className="text-gray-700 text-lg mb-4 font-bold">
              Ingeniería de Sistemas
            </Text>

            {/* Email */}
            <View className="bg-[#E6EDF3] rounded-lg px-6 py-3 mb-3 w-full">
              <Text className="text-gray-700 text-center text-base">
                U200000000@upc.edu.pe
              </Text>
            </View>

            {/* Campus */}
            <Text className="text-gray-700 text-base mb-2">
              Campus Monterrico
            </Text>

            {/* Código de alumno */}
            <View className="flex-row items-center mb-1">
              <Text className="text-gray-700 text-base">
                Código de alumno:{" "}
              </Text>
              <Text                
                className="text-gray-900 text-base font-bold"
              >
                200000000
              </Text>
            </View>

            {/* ID Banner */}
            <View className="flex-row items-center">
              <Text className="text-gray-700 text-base">
                ID Banner:{" "}
              </Text>
              <Text                
                className="text-gray-900 text-base font-bold"
              >
                N00000000
              </Text>
            </View>
          </View>
        </View>

        {/* Botón TIU Virtual */}
        <TouchableOpacity
          onPress={handleTIUVirtual}
          className="bg-white rounded-xl p-4 mb-6 flex-row items-center justify-between mx-5"
          activeOpacity={0.7}
        >
          <View className="flex-row items-center">
            <View className="mr-4">
              <Text className="text-3xl">🎓</Text>
            </View>
            <Text
              style={{ fontFamily: "SolanoGothicMVB-Bold" }}
              className="text-black text-[20px]"
            >
              TIU VIRTUAL
            </Text>
          </View>
          <Text className="text-[#E3000F] text-2xl">›</Text>
        </TouchableOpacity>

        {/* Enlaces de políticas */}
        <View className="mb-6 flex items-center">
          <Text className="text-gray-700 text-center text-base leading-6 max-w-[23rem]">
            Revisa los{" "}
            <Text
              className="text-blue-600 underline font-bold"
              onPress={() => openLink("https://www.upc.edu.pe/terminos")}
            >
              Términos y condiciones
            </Text>
            ,{" "}
            <Text
              className="text-blue-600 underline font-bold"
              onPress={() => openLink("https://www.upc.edu.pe/privacidad")}
            >
              Política de privacidad
            </Text>
            {"\n"}y la{" "}
            <Text
              className="text-blue-600 underline font-bold"
              onPress={() => openLink("https://www.upc.edu.pe/portal-pdf")}
            >
              Portal PDF
            </Text>
            {" y "}
            <Text
              className="text-blue-600 underline font-bold"
              onPress={() => openLink("https://www.upc.edu.pe/arco")}
            >
              Derechos ARCO
            </Text>
            {" "}de la aplicación.
          </Text>
        </View>

        {/* Botón Cerrar sesión */}
        <TouchableOpacity
          onPress={handleLogout}
          className="bg-white border-2 border-[#E3000F] rounded-full py-4 mx-5"
          activeOpacity={0.7}
        >
          <Text            
            className="text-[#E3000F] text-center text-lg"
          >
            Cerrar sesión
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}