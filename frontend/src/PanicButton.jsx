import React from 'react';
import './PanicButton.css';

function PanicButton() {
  const sendAlert = async () => {
    const response = await fetch("https://botao-panico-production.up.railway.app/alerta", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mensagem: "Botão de pânico acionado!" })
    });
    const data = await response.json();
    alert("✅ Alerta enviado!");
    console.log(data);
  };

  return (
    <button className="panic-button" onClick={sendAlert}>
      🚨 Botão do Pânico
    </button>
  );
}

export default PanicButton;

