import { ScrollView, Text, View } from "react-native";
import HelpSection from "../../components/HelpSection";

export default function Ayuda() {
  const helpItems = [
    {
      icon: "💻",
      title: "EXPLORA UPC",
      description: "Nuestra base de conocimiento\ndisponible las 24 horas",
    },
    {
      icon: "📱",
      title: "ALMA WHATSAPP",
      description: "Lun-Vie de 9:00 am a 9:00 pm\nSábado de 9:00 am - 2:00 pm",
    },
    {
      icon: "📞",
      title: "CANAL TELEFÓNICO",
      description: "Lun-Vie de 9:00 am a 9:00 pm\nSábado de 9:00 am - 2:00 pm",
    },
    {
      icon: "❤️",
      title: "COMPARTE TU EXPERIENCIA",
      description: "Califícanos y danos tu opinión sobre\nlas aplicaciones",
    },
  ];

  const handlePress = (title: string) => {
    console.log(`Presionado: ${title}`);
    // Aquí puedes agregar la navegación o acción específica
  };

  return (
    <ScrollView className="flex-1 bg-[#F8FAFE]">
      <View className="px-5 pt-[7rem] pb-6">
        <Text
          style={{ fontFamily: "SolanoGothicMVB-Bold" }}
          className="text-[#E3000F] text-2xl mb-2"
        >
          ¿NECESITAS AYUDA?
        </Text>

        <Text 
          className="text-lg text-gray-700 mb-6"
        >
          Resuelve tus consultas fácil y rápido
        </Text>

        {helpItems.map((item, index) => (
          <HelpSection
            key={index}
            icon={item.icon}
            title={item.title}
            description={item.description}
            isLast={index === helpItems.length - 1}
            onPress={() => handlePress(item.title)}
          />
        ))}
      </View>
    </ScrollView>
  );
}