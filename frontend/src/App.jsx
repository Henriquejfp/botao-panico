import React, { useState, useEffect, useRef } from "react";
import "./PanicButton.css";

const API_URL = "https://botao-panico-production.up.railway.app/alerta";

function pad(n) {
  return n.toString().padStart(2, "0");
}
function timeNow() {
  const d = new Date();
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

function PanicButton() {
  const [mode, setMode] = useState("identified"); // "identified" | "anonymous"
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [log, setLog] = useState([{ t: timeNow(), msg: "Sistema pronto." }]);
  const logRef = useRef(null);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = 0;
  }, [log]);

  function pushLog(msg) {
    setLog((l) => [{ t: timeNow(), msg }, ...l].slice(0, 20));
  }

  async function sendAlert() {
    if (status === "sending") return;

    if (mode === "identified" && !name.trim()) {
      pushLog("Erro: informe seu nome ou use o modo anônimo.");
      setStatus("error");
      return;
    }

    setStatus("sending");
    pushLog("Enviando alerta…");

    const payload = {
      mensagem:
        comment.trim() ||
        (mode === "anonymous" ? "Alerta anônimo acionado!" : "Botão de pânico acionado!"),
      anonimo: mode === "anonymous",
      nome: mode === "anonymous" ? null : name.trim(),
      telefone: mode === "anonymous" ? null : phone.trim(),
      comentario: comment.trim() || null,
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Falha na resposta do servidor");

      const data = await response.json();
      console.log(data);

      setStatus("sent");
      pushLog("Alerta confirmado e registrado.");
      setComment("");
    } catch (err) {
      setStatus("error");
      pushLog("Falha ao enviar. Tente novamente.");
      console.error(err);
    }
  }

  const isSending = status === "sending";
  const isSent = status === "sent";

  return (
    <div className="panic-page">
      <div className="panic-card">
        {/* Header */}
        <div className="panic-header">
          <h1 className="panic-title">BOTÃO DO PÂNICO</h1>
        </div>

        {/* SOS button */}
        <div className="panic-sos-wrap">
          <div className="panic-sos-orbit">
            <span className={`panic-ring ${isSending ? "fast" : ""}`} />
            <span className={`panic-ring delay ${isSending ? "fast" : ""}`} />
            <button
              className="panic-sos-btn"
              onClick={sendAlert}
              disabled={isSending}
            >
              {isSending ? "…" : "SOS"}
            </button>
          </div>
          <div className={`panic-status-pill ${isSent ? "sent" : ""}`}>
            {isSending
              ? "ENVIANDO…"
              : isSent
              ? "ALERTA ENVIADO ✓"
              : "PRONTO PARA ENVIAR"}
          </div>
        </div>

        {/* Identity toggle */}
        <div className="panic-body">
          <div className="panic-toggle">
            <button
              className={mode === "identified" ? "active" : ""}
              onClick={() => setMode("identified")}
            >
              Identificado
            </button>
            <button
              className={mode === "anonymous" ? "active" : ""}
              onClick={() => setMode("anonymous")}
            >
              Anônimo
            </button>
          </div>

          {mode === "identified" && (
            <div className="panic-fields">
              <input
                type="text"
                placeholder="Seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="tel"
                placeholder="Telefone (opcional)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          )}

          {mode === "anonymous" && (
            <p className="panic-anon-note">
              Sua identidade não será enviada junto com o alerta.
            </p>
          )}

          <textarea
            className="panic-textarea"
            placeholder="Descreva rapidamente o que está acontecendo (opcional)"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
            maxLength={280}
          />
          <div className="panic-charcount">{comment.length}/280</div>

        </div>

        {/* Dispatch log */}
        <div className="panic-log">
          <div className="panic-log-label">REGISTRO</div>
          <div className="panic-log-scroll" ref={logRef}>
            {log.map((entry, i) => (
              <div className="panic-log-entry" key={i}>
                <span className="panic-log-time">{entry.t}</span>
                <span>{entry.msg}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PanicButton;
