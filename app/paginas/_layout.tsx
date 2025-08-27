import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function PaginasLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="servicos"
        options={{
          title: "Serviços",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="musicos"
        options={{
          title: "Músicos",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="criarservicos"
        options={{
          title: "Criar Serviço",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="adicionarmusico"
        options={{
          title: "Adicionar Músico",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
