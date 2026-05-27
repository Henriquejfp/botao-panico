import { useState } from "react";
import "./App.css";

function App() {
  const [status, setStatus] = useState("");

  const enviarAlerta = async () => {
    setStatus("Enviando alerta...");
    try {
      const response = await fetch("https://botao-panico-production.up.railway.app/alerta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mensagem: "Botão de pânico acionado!" }),
      });

      if (response.ok) {
        setStatus("✅ Alerta enviado com sucesso!");
      } else {
        setStatus("❌ Erro ao enviar alerta!");
      }
    } catch (error) {
      setStatus("⚠️ Falha na conexão com o servidor.");
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1> Botão de Pânico</h1>
      <button className="panic-button" onClick={enviarAlerta}>
        Enviar Alerta
      </button>
      <p>{status}</p>
    </div>
  );
}

export default App;
