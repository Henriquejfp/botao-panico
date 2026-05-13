import React, { useState } from "react";
import { View, Text, Button, StyleSheet, Image, Platform } from "react-native";

export default function HomeScreen() {
  const [status, setStatus] = useState("");

  const enviarAlerta = async () => {
    try {
      const response = await fetch("http://192.168.0.15:5000/alerta", { // troque pelo seu IP
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mensagem: "Botão de pânico acionado!" })
      });
      await response.json();
      setStatus("✅ Alerta enviado com sucesso!");
    } catch (error) {
      setStatus("❌ Erro ao enviar alerta");
      console.error(error);
    }
  };
}
