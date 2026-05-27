import React from 'react';

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
    <button onClick={sendAlert} style={{background:"red",color:"white",padding:"20px",fontSize:"24px",borderRadius:"10px"}}>
       Botão de Pânico
    </button>
  );
}

export default PanicButton;
