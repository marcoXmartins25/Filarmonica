import { Button, Text, View, Image, ImageBackground } from "react-native";
import type { ViewStyle } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ImageBackground style={styles.container}>
        <Image style={styles.imagem} 
        source={require("../assets/images/filarmonica.jpg")} />
        <Text>Banda Filarmónica de Miranda do Douro !!!</Text>
        <Button
          title="Clique aqui"
          onPress={() => {
            alert("ola mundo");
          }}
        />
      </ImageBackground>
    </View>
  );
}



const styles = {
  container: {
    width: 600,
    height: 600,
    justifyContent: "center" as const,
    alignItems: "center" as const,
  },
  imagem: {
    marginBottom: 60,
    width: 100,
    height: 100,
  },
};
