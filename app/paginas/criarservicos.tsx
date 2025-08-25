import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
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

export default function CriarServicos() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [hora, setHora] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const router = useRouter();

  const handleAdicionar = async () => {
    if (!nome.trim() || !descricao.trim() || !hora.trim()) {
      Alert.alert("Preencha todos os campos!");
      return;
    }
    const servicosSalvos = await AsyncStorage.getItem("servicos");
    const servicos = servicosSalvos ? JSON.parse(servicosSalvos) : [];
    servicos.push({ nome, descricao, hora });
    await AsyncStorage.setItem("servicos", JSON.stringify(servicos));
    Alert.alert(
      "Serviço criado!",
      `Nome: ${nome}\nDescrição: ${descricao}\nHora: ${hora}`
    );
    setNome("");
    setDescricao("");
    setHora("");
    router.back();
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
        <Text style={styles.titulo}>Criar Serviço</Text>

        <TextInput
          style={[styles.input, { color: "#000" }]} // texto que vai ser escrito
          placeholder="Nome do serviço"
          placeholderTextColor="#5875acff" // placeholder a azul
          value={nome}
          onChangeText={setNome}
          autoCapitalize="sentences"
        />

        <TextInput
          style={[styles.input, { height: 80, color: "#000" }]}
          placeholder="Descrição"
          placeholderTextColor="#5875acff" // placeholder a azul
          value={descricao}
          onChangeText={setDescricao}
          multiline
        />

        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowPicker(true)}
          activeOpacity={0.7}
        >
          <Text style={{ color: "#3094E6" }}>{hora ? hora : "Hora"}</Text>
        </TouchableOpacity>

        {showPicker && (
          <DateTimePicker
            value={hora ? new Date(`1970-01-01T${hora}:00`) : new Date()}
            mode="time"
            is24Hour={true}
            display={Platform.OS === "ios" ? "spinner" : "default"}
            themeVariant="light" // 👈 força sempre fundo claro no iOS
            onChange={(_, selectedDate) => {
              setShowPicker(false);
              if (selectedDate) {
                const h = selectedDate.getHours().toString().padStart(2, "0");
                const m = selectedDate.getMinutes().toString().padStart(2, "0");
                setHora(`${h}:${m}`);
              }
            }}
          />
        )}

        <TouchableOpacity style={styles.botao} onPress={handleAdicionar}>
          <Text style={styles.textoBotao}>Adicionar Serviço</Text>
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
