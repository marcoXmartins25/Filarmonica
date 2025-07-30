import { Button, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.imagem}
        source={require("../assets/images/filarmonica.jpg")}
      />
      <Text style={styles.titulo}>Banda Filarmónica de Miranda do Douro !!!</Text>

      <TouchableOpacity
        style={styles.botaoContainer}
        onPress={() => alert("ola mundo")}
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
    marginBottom: 60,
    marginTop: 10,
    width: 100,
    height: 100,
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
