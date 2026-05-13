import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function App() {
  const [mensagem, setMensagem] = useState("Botão de pânico acionado!");
  const [status, setStatus] = useState("");

  const enviarAlerta = async () => {
    try {
      const response = await fetch("http://10.10.108.56:5000/alerta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mensagem })
      });
      const data = await response.json();
      setStatus("✅ Alerta enviado com sucesso!");
    } catch (error) {
      setStatus("❌ Erro ao enviar alerta");
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Botão de Pânico</Text>
      <Button title="Enviar Alerta" onPress={enviarAlerta} />
      <Text style={styles.status}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, marginBottom: 20 },
  status: { marginTop: 20, fontSize: 16 }
});

