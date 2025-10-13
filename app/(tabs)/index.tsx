import { Image, ScrollView, Text, View } from "react-native";

// Components
import Reservation from "@/components/Reservation";
import ClassSchedules from '../../components/ClassSchedules';
import ValuesCarousel from '../../components/ValuesCarousel';
import CallToAction from "../../components/CallToAction";

//Images
import Slider from '../../assets/images/slider1.png';
import Campana from "../../assets/svg/campana.svg";

export default function Index() {
  // Define tus imágenes aquí
  const valoresImages = [
    Slider,
    Slider,
    Slider,
  ];

  return (
    <ScrollView>
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
              source={require("../../assets/images/logo.png")}
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
            source={require("../../assets/images/saludo.jpg")}
            className="w-36 h-36"
            resizeMode="contain"
          />
        </View>

        {/* Carrusel */}
        <ValuesCarousel 
          images={valoresImages}
          autoPlay={true}
          autoPlayDuration={3000}
          height={160}
        />

        {/* Horario de clases */}
        <ClassSchedules
          diaActual="Viernes"
          fechaActual="19/09"
          diaSiguiente="Sábado"
          fechaSiguiente="20/09"
          horaInicio="19:00"
          horaFin="20:59"
          curso="Matemática Discreta"
          nrc="2125"
        />
        
        <Reservation/>
        
        {/* Call to action */}
        <CallToAction/>
      </View>
    </ScrollView>
  );
}