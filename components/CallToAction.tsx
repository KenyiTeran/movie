
import React from "react";
import { Image, Text, View, TouchableOpacity } from "react-native";
import compuUPC from "../assets/images/compuUPC.png";
import { theme } from "../src/theme";
import { ChevronRight } from "lucide-react-native";



export default function CallToAction(){
    
    return(
        <View className="bg-[#4B24B3] rounded-2xl p-[21px] mt-8"
            style={theme.shadows.base}>
            <View className="flex flex-cold gap-x-2">
                <View className="flex flex-row items-center gap-x-3">
                    <Image source={compuUPC}/>
                    <Text style={{ fontFamily: "SolanoGothicMVB-Bold" }} className="text-3xl text-white">
                    ¡AMPLÍA TUS{"\n"}CONOCIMIENTOS!
                    </Text>
                </View>

                <Text className="text-[16px] text-white pt-[11px]">
                Explora nuestros cursos de extensión {"\n"}
                universitaria y potencia tu perfil {"\n"}
                profesional
                </Text>
                <TouchableOpacity className="bg-[#E40A18] py-[13px] flex flex-row justify-center items-center rounded-lg mt-[10px]">
                    <Text className="text-white font-bold">Ver Cursos ahora</Text>
                    <ChevronRight size={20} color="white" style={{ marginLeft: 2 }} />
                </TouchableOpacity>

            </View>            
        </View>
    )
}