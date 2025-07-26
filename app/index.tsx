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
        source={require("../assets/images/filarmonica.png")} />
        <Text>Banda Filarmónica de Miranda do Douro</Text>
        <Button
          title="Clique aqui"
          onPress={() => {
            alert("ola");
          }}
        />
      </ImageBackground>
    </View>
  );
}



const styles = {
  container: {
    width: 300,
    height: 300,
    justifyContent: "center" as ViewStyle["justifyContent"],
    alignItems: "center" as ViewStyle["alignItems"],
    borderRadius: 10,
    overflow: "hidden" as ViewStyle["overflow"],
  },
  imagem: {
    marginBottom: 60,
  },
};
