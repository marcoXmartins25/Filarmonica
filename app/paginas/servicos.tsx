import React from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const servicos = [
  { id: "1", local: "Auditório Municipal", hora: "16h", seviço: "Concerto" },
  { id: "2", local: "Igreja Matriz", hora: "17h", seviço: "Missa" },
  { id: "3", local: "Praça Central", hora: "18h", seviço: "Teatro" },
];

export default function Servicos() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#222" />
        </TouchableOpacity>
        <Text style={styles.titulo}>Serviços</Text>
      </View>

      <FlatList
        data={servicos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item}>
            <Text style={styles.texto}>{item.local}</Text>
            <View style={styles.infoLinha}>
              <Text style={styles.hora}>{item.hora}</Text>
              <Text style={styles.serviço}>{item.seviço}</Text>
            </View>
          </TouchableOpacity>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#222",
    marginLeft: 10,
  },
  item: {
    backgroundColor: "#3094E6",
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 12,
    marginBottom: 10,
    width: "100%",
  },
  texto: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  infoLinha: {
    flexDirection: "row",
    marginTop: 4,
  },
  hora: {
    color: "#FFD700",
    fontSize: 16,
    fontWeight: "500",
    marginRight: 10,
  },
  serviço: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "400",
  },
});
