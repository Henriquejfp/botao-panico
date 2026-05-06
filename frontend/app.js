import React from "react";
import { Button, View } from "react-native";

export default function App() {
  const enviarAlerta = async () => {
    await fetch("http://10.10.108.56:5000/alerta", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mensagem: "Botão de pânico acionado!" })
    });
    alert("Alerta enviado!");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Botão de Pânico" onPress={enviarAlerta} />
    </View>
  );
}
