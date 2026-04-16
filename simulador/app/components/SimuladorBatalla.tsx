"use client";
import { useState, useEffect } from "react";
import { Personaje } from "../tipos/personajes";
import { BattleResult } from "../tipos/batallas";


export default function SimuladorBatalla() {
  const [personajes, setPersonajes] = useState<Personaje[]>([]); // Lista de personajes disponibles
  const [seleccionados, setSeleccionados] = useState<number[]>([]); // ID de los personajes seleccionados
  const [resultado, setResultado] = useState<BattleResult | null>(null); // Resultado de la batalla
  const [cargando, setCargando] = useState(false); // Estado de carga

  // Carga todos los personajes al entrar
  useEffect(() => {
    fetch("/api/personajes")
      .then((res) => res.json())
      .then((data) => setPersonajes(data));
  }, []);

  // Función para seleccionar/deseleccionar personajes (Esto para usar en el frontend)
  function toggleSeleccion(id: number) {
    // Si ya está seleccionado, lo quitamos de la lista
    if (seleccionados.includes(id)) {
      setSeleccionados(seleccionados.filter((s) => s !== id));
      return;
    }
    // Solo permite seleccionar 2
    if (seleccionados.length >= 2) return;
    setSeleccionados([...seleccionados, id]);
  }

  async function ejecutarBatalla() {
    if (seleccionados.length !== 2) {
      alert("Selecciona exactamente 2 personajes");
      return;
    }
    setCargando(true);

    const res = await fetch("/api/batalla", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        character1Id: seleccionados[0],
        character2Id: seleccionados[1],
      }),
    });

    const data = await res.json();
    setResultado(data);
    setCargando(false);
  }

  return (
    <div>
      <h2>Selecciona 2 personajes para batallar</h2>
      <p>Seleccionados: {seleccionados.length}/2</p>

      {/* Lista de personajes clickeables */}
      <ul>
        {personajes.map((p) => (
          <li
            key={p.id}
            onClick={() => toggleSeleccion(p.id)}
            style={{
              cursor: "pointer",
              // Resaltar cuando se selecciona
              background: seleccionados.includes(p.id) ? "yellow" : "transparent",
              padding: "8px",
              margin: "4px",
              border: "1px solid #ccc",
            }}
          >
            <strong>{p.name}</strong> — {p.type} |
            Vida: {p.health} Ataque: {p.attack} Defensa: {p.defense} Velocidad: {p.speed}
          </li>
        ))}
      </ul>

      <button
        onClick={ejecutarBatalla}
        disabled={seleccionados.length !== 2 || cargando}
      >
        {cargando ? "Calculando..." : "⚔️ Batallar"}
      </button>

      {/* Muestra el resultado */}
      {resultado && (
        <div>
          <h3>Ganador: {resultado.winner?.name}</h3>
          <p>Tipo: {resultado.winner?.type}</p>
          <p>Turnos: {resultado?.turns}</p>
        </div>
      )}
    </div>
  );
}