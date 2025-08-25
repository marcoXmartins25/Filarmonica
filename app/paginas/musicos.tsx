import { useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const musicos = [
  {
    id: "1",
    nome: "Marco Martins",
    instrumento: "Percurssão",
    foto: require("../../assets/images/marco.jpg"),
  },
  {
    id: "2",
    nome: "Rodrigo",
    instrumento: "Trompete",

    foto: null,
  },
  {
    id: "3",
    nome: "Gonçalo",
    instrumento: "Sax Alto",

    foto: null,
  },
  {
    id: "4",
    nome: "Ana Ribeiro",
    instrumento: "Clarinete",
    foto: null,
  },
];

export default function Musicos() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#222" />
        </TouchableOpacity>
        <Text style={styles.titulo2}>Músicos</Text>
      </View>
      <FlatList
        data={musicos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={item.foto} style={styles.foto} />
            <View>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.instrumento}>{item.instrumento}</Text>
            </View>
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
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 15,
    textAlign: "center",
  },
  item: {
    flexDirection: "row", // Adicionado para alinhar imagem e texto lado a lado
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
  nome: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  instrumento: {
    color: "#FFD700",
    fontSize: 16,
    fontWeight: "500",
    marginTop: 4,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  titulo2: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#222",
    marginLeft: 10,
  },
});
