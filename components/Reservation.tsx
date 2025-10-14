import React from "react";
import { Image, Text, View, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import Calendar from "../assets/images/Calendar.png";
import cardPartRed from "../assets/images/cardPart.png";
import cardPartPurple from "../assets/images/cardPartPurple.png";
import { theme } from "../src/theme";

export default function Reservation() {
    // Array de Tarjetas
    const cards = [
        {
            id: 1,
            title: "Espacios deportivos",
            description: "Canchas, Gimnasio, Piscina",
            bgColor: "#E50A17",
            image: cardPartRed,
            route: "/reservation/deportivo"
        },
        {
            id: 2,
            title: "Laboratorios",
            description: "Cómputo, ingeniería, diseño",
            bgColor: "#7961F4",
            image: cardPartPurple,
            route: "/reservation/laboratorio"
        }
    ];

    const handleCardPress = (route: string) => {
        router.push(route);
    };

    return (
        <View className="bg-white rounded-2xl p-[21px] mt-8"
            style={theme.shadows.base}>
            <View className="flex flex-row items-center">
                <Image source={Calendar} />
                <Text style={{ fontFamily: "SolanoGothicMVB-Bold" }} className="text-3xl">
                    RESERVAS
                </Text>
            </View>

            {/* Tarjetas */}
            <View className="mt-[14px] flex flex-row gap-x-3">
                {cards.map((card) => (
                    <TouchableOpacity
                        key={card.id}
                        onPress={() => handleCardPress(card.route)}
                        activeOpacity={0.8}
                        className="w-[155px] h-[105px] rounded-[14px] relative flex justify-center"
                        style={{ backgroundColor: card.bgColor }}
                    >
                        <Image source={card.image} className="absolute top-0 right-0" />
                        <View className="flex gap-y-1 pl-[13px]">
                            <Text className="text-[13px] font-bold text-white">{card.title}</Text>
                            <Text className="text-[12px] font-semibold text-start text-white">{card.description}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}