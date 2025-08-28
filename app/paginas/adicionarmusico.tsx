import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function AdicionarMusico() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [instrumento, setInstrumento] = useState("");

  const handleAdicionar = async () => {
    if (!nome.trim() || !instrumento.trim()) {
      Alert.alert("Preencha todos os campos!");
      return;
    }

    const musicosSalvos = await AsyncStorage.getItem("musicos");
    const musicos = musicosSalvos ? JSON.parse(musicosSalvos) : [];

    // ✅ adiciona id único e foto por defeito
    const novoMusico = {
      id: Date.now().toString(),
      nome,
      instrumento,
    };

    musicos.push(novoMusico);
    await AsyncStorage.setItem("musicos", JSON.stringify(musicos));

    Alert.alert(
      "Músico adicionado!",
      `Nome: ${nome}\nInstrumento: ${instrumento}`
    );

    setNome("");
    setInstrumento("");
    router.push("./musicos");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.titulo}>Adicionar Músico</Text>

        <TextInput
          style={[styles.input, { color: "#000" }]}
          placeholder="Nome do músico"
          placeholderTextColor="#5875acff"
          value={nome}
          onChangeText={setNome}
          autoCapitalize="sentences"
        />

        <TextInput
          style={[styles.input, { height: 80, color: "#000" }]}
          placeholder="Instrumento"
          placeholderTextColor="#5875acff"
          value={instrumento}
          onChangeText={setInstrumento}
          multiline
        />

        <TouchableOpacity style={styles.botao} onPress={handleAdicionar}>
          <Text style={styles.textoBotao}>Adicionar Músico</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: "#f4f4f4",
    paddingTop: 60,
    paddingBottom: 40,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
    color: "#000",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  botao: {
    backgroundColor: "#3094E6",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  textoBotao: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
