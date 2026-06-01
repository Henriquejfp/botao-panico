import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

function Historico() {
  const [alertas, setAlertas] = useState([]);

  useEffect(() => {
  const carregarAlertas = async () => {
    const { data } = await supabase.from("alerta").select("*");
    setAlertas(data);
  };
  carregarAlertas();

  // Novo formato de canal Realtime
  const canal = supabase
    .channel("public:alerta")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "alerta" },
      (payload) => {
        setAlertas((prev) => [...prev, payload.new]);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(canal);
  };
}, []);

  return (
    <div>
      <h2>Histórico de Alertas</h2>
      <ul>
        {alertas.map((a, i) => (
          <li key={i}>{a.mensagem}</li>
        ))}
      </ul>
    </div>
  );
}

export default Historico;
