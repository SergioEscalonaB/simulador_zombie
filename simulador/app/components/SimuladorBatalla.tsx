"use client";
import { useState, useEffect } from "react";
import { Personaje } from "../tipos/personajes";
import { BattleResult } from "../tipos/batallas";
import { useBatallaStore } from "@/store/batallaStore";

export default function SimuladorBatalla() {
  const [personajes, setPersonajes] = useState<Personaje[]>([]); // Lista de personajes disponibles
  const [seleccionados, setSeleccionados] = useState<number[]>([]); // ID de los personajes seleccionados
  const [resultado, setResultado] = useState<BattleResult | null>(null); // Resultado de la batalla
  const [cargando, setCargando] = useState(false); // Estado de carga

  // Tonanos la funcion del estado global de zustand
  const incrementarActualizar = useBatallaStore((state) => state.incrementarActualizar)

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
    
    // Llama a la API para ejecutar la batalla con los IDs seleccionados
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
    incrementarActualizar(); // ACA AVISAMOS AL ESTADO GLOBLAL
  }

  return (
    <div className="container mt-3">
        <div className="card shadow-sm">
            <div className="card-header bg-warning text-dark py-2">
                <h5 className="mb-0">
                    <i className="bi bi-crosshair me-2"></i>
                    Selecciona 2 personajes
                    <span className="badge bg-dark ms-2">{seleccionados.length}/2</span>
                </h5>
            </div>

            <div className="card-body p-2">
                <div className="row g-2">
                    {personajes.map((p) => (
                        <div key={p.id} className="col-md-6 col-lg-4">
                            <div
                                onClick={() => toggleSeleccion(p.id)}
                                className={`card cursor-pointer ${seleccionados.includes(p.id) ? "bg-warning bg-opacity-25 border-warning" : "border"}`}
                                style={{ cursor: "pointer" }}
                            >
                                <div className="card-body py-2 px-3">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <strong className="small">{p.name}</strong>
                                        <span className={`badge bg-${p.type === "zombie" ? "success" : "info"} small`}>
                                            {p.type}
                                        </span>
                                    </div>
                                    <div className="small text-muted mt-1">
                                        ❤️{p.health} ⚔️{p.attack} 🛡️{p.defense} ⚡{p.speed}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="d-grid gap-2 mt-3">
                    <button
                        onClick={ejecutarBatalla}
                        disabled={seleccionados.length !== 2 || cargando}
                        className="btn btn-danger btn-sm"
                    >
                        {cargando ? (
                            <>⏳ Calculando...</>
                        ) : (
                            <>⚔️ Batallar</>
                        )}
                    </button>
                </div>

                {resultado && (
                    <div className="alert alert-success mt-3 mb-0 py-2 text-center">
                        <strong>🏆 Ganador: {resultado.winner?.name}</strong>
                        <br />
                        <small className="text-muted">
                            Tipo: {resultado.winner?.type} | {resultado?.turns} turnos
                        </small>
                    </div>
                )}
            </div>
        </div>
    </div>
);
}