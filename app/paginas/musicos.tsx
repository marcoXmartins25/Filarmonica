import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

type Musico = {
  id: string;
  nome: string;
  instrumento: string;
  foto?: string | ImageSourcePropType; // pode ser string (URL) ou require()
};

const defaultFoto = require("../../assets/images/filarmonica1.jpg");

function getImageSource(
  foto?: string | ImageSourcePropType | null
): ImageSourcePropType {
  if (!foto) return defaultFoto; // se for undefined, null ou vazio
  if (typeof foto === "string") return { uri: foto }; // string (URL)
  return foto; // se já for require()
}

export default function Musicos() {
  const router = useRouter();
  const [musicos, setMusicos] = useState<Musico[]>([]);

  const carregarMusicos = async () => {
    const musicosSalvos = await AsyncStorage.getItem("musicos");
    setMusicos(musicosSalvos ? JSON.parse(musicosSalvos) : []);
  };

  // carregar sempre que volta para o ecrã
  useFocusEffect(
    React.useCallback(() => {
      carregarMusicos();
    }, [])
  );

  const eliminarMusico = async (id: string) => {
    Alert.alert(
      "Eliminar Músico",
      "Tens a certeza que queres eliminar este músico?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            const novos = musicos.filter((m) => m.id !== id);
            setMusicos(novos);
            await AsyncStorage.setItem("musicos", JSON.stringify(novos));
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo2}>Músicos</Text>
      </View>

      <FlatList
        data={musicos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={getImageSource(item.foto)} style={styles.foto} />
            <View style={{ flex: 1 }}>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.instrumento}>{item.instrumento}</Text>
            </View>
            <TouchableOpacity onPress={() => eliminarMusico(item.id)}>
              <Ionicons name="trash" size={24} color="white" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    paddingHorizontal: 10,
    paddingTop: 50,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3094E6",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  foto: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
    backgroundColor: "#ccc",
  },
  nome: { color: "white", fontSize: 18, fontWeight: "600" },
  instrumento: {
    color: "#FFD700",
    fontSize: 16,
    fontWeight: "500",
    marginTop: 4,
  },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  titulo2: { fontSize: 24, fontWeight: "bold", color: "#222", marginLeft: 10 },
});
