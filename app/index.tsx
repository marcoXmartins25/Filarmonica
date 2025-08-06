import { Button, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

export default function Index() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.imagem}
        source={require("../assets/images/filarmonica1.jpg")}
      />
      <Text style={styles.titulo}>Banda Filarmónica de Miranda do Douro !!!</Text>

      <TouchableOpacity
        style={styles.botaoContainer}
        onPress={() => navigation.navigate("OutraPagina")}
      >
        <Text style={styles.botaoTexto}>Entrar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = {
  container: {
    flex: 1,
    justifyContent: "center" as const,
    alignItems: "center" as const,
    backgroundColor: "#f4f4f4",
  },
  imagem: {
    marginBottom: 80,
    marginTop: 10,
    width: 90,
    height: 130,
  },
  titulo: {
    fontSize: 16,
    marginBottom: 20,
  },
  botaoContainer: {
    backgroundColor: "#3094E6",
    borderWidth: 1,
    borderColor: "#333",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  botaoTexto: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
};
