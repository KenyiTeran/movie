import { Clock } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { theme } from "../src/theme";


interface HorarioClaseProps {
  diaActual: string;
  fechaActual: string;
  diaSiguiente: string;
  fechaSiguiente: string;
  horaInicio: string;
  horaFin: string;
  curso: string;
  nrc: string;
  salon?: string;
}

export default function HorarioClase({
  diaActual,
  fechaActual,
  diaSiguiente,
  fechaSiguiente,
  horaInicio,
  horaFin,
  curso,
  nrc,
  salon,
}: HorarioClaseProps) {
  return (
    <View className="bg-white rounded-2xl p-[22px] mt-8" 
    style={theme.shadows.base}>
      {/* Encabezado */}
      <View className="flex-row justify-between items-center mb-4">
        <View className="flex-row items-center">
          <Clock color="#E50914" size={22} />
          <Text
            style={{ fontFamily: "SolanoGothicMVB-Bold" }}
            className="ml-2 text-3xl text-black"
          >
            HORARIOS
          </Text>
        </View>

        {/* <Text className="text-blue-600 text-base font-semibold">
          Ver todos →
        </Text> */}
      </View>

      {/* Botones de días */}
      <View className="flex-row gap-x-2">
        <TouchableOpacity className="bg-red-600 px-3 py-1.5 rounded-full">
          <Text className="text-white text-sm font-semibold">
            Hoy {diaActual} {fechaActual}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="border border-red-600 px-3 py-1.5 rounded-full">
          <Text className="text-red-600 text-sm font-semibold">
            Mañana {diaSiguiente} {fechaSiguiente}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Contenido de clase */}
      <View className="mt-4 border-t border-gray-200 pt-4 flex flex-row gap-x-5">
        <View>
            <Text className="text-gray-800 text-xl font-bold">{horaInicio}</Text>
            <Text className="text-gray-500 text-base mb-1">{horaFin}</Text>
        </View>

        <View className="w-[1.5px] bg-gray-300 mx-2" />

        <View>
            <Text className="text-gray-900 font-semibold text-lg">
                {curso}
            </Text>
            <Text className="text-gray-500 text-sm">
                NRC: {nrc}  {salon ? `• Salón: ${salon}` : ""}
            </Text>
        </View>

      </View>
    </View>
  );
}