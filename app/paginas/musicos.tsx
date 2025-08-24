import React from "react";
import { FlatList, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useRouter } from "expo-router";

const musicos = [
  { id: "1", nome: "João Silva", instrumento: "Violino" },
  { id: "2", nome: "Maria Costa", instrumento: "Flauta" },
  { id: "3", nome: "Carlos Ferreira", instrumento: "Trompete" },
  { id: "4", nome: "Ana Ribeiro", instrumento: "Clarinete" },
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
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.instrumento}>{item.instrumento}</Text>
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
    backgroundColor: "#3094E6",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 12,
    marginBottom: 10,
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
