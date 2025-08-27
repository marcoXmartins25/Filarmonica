import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Servico = {
  nome?: string;
  hora?: string;
  descricao?: string;
  seviço?: string;
};

export default function Servicos() {
  const router = useRouter();
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [servicoSelecionado, setServicoSelecionado] = useState<Servico | null>(null);

  useFocusEffect(
    React.useCallback(() => {
      const carregarServicos = async () => {
        const servicosSalvos = await AsyncStorage.getItem("servicos");
        setServicos(servicosSalvos ? JSON.parse(servicosSalvos) : []);
      };
      carregarServicos();
    }, [])
  );

  const eliminarServico = (index: number) => {
    Alert.alert(
      "Eliminar Serviço",
      "Tem a certeza que quer eliminar este serviço?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            const novosServicos = [...servicos];
            novosServicos.splice(index, 1);
            setServicos(novosServicos);
            await AsyncStorage.setItem("servicos", JSON.stringify(novosServicos));
          },
        },
      ]
    );
  };

  const abrirModal = (servico: Servico) => {
    setServicoSelecionado(servico);
    setModalVisible(true);
  };

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
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => abrirModal(item)}
          >
            <Text style={styles.texto}>{item.nome}</Text>
            <View style={styles.infoLinha}>
              <Text style={styles.hora}>{item.hora || ""}</Text>
              <TouchableOpacity
                style={styles.botaoEliminar}
                onPress={() => eliminarServico(index)}
              >
                <Ionicons name="trash" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalFundo}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitulo}>{servicoSelecionado?.nome}</Text>
            <Text style={styles.modalTexto}>Hora: {servicoSelecionado?.hora}</Text>
            <Text style={styles.modalTexto}>Descrição: {servicoSelecionado?.descricao || servicoSelecionado?.seviço}</Text>

            <Pressable
              style={styles.botaoFechar}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.textoBotao}>Fechar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
    justifyContent: "space-between",
    marginTop: 10,
    alignItems: "center",
  },
  hora: {
    color: "#FFD700",
    fontSize: 16,
    fontWeight: "500",
  },
  botaoEliminar: {
    backgroundColor: "#FF4C4C",
    padding: 6,
    borderRadius: 8,
  },
  modalFundo: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    width: "80%",
    alignItems: "center",
  },
  modalTitulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalTexto: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: "center",
  },
  botaoFechar: {
    marginTop: 20,
    backgroundColor: "#3094E6",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  textoBotao: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
