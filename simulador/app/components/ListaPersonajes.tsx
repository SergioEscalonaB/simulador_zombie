"use client";

import { useState, useEffect } from "react";
import { Personaje } from "@/app/tipos/personajes";

export default function ListaPersonajes() {
  const [personajes, setPersonajes] = useState<Personaje[]>([]);
  const [filtro, setFiltro] = useState("todos");

  // Cada vez que cambia el filtro vuelve a pedir los datos
  useEffect(() => {
    const url =
      filtro === "todos"
        ? "/api/personajes"
        : `/api/personajes?type=${filtro}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => setPersonajes(data));
  }, [filtro]); // Esto solo se ejecuta cuando cambia el filtro

  return (
    <div className="container mt-4">
        <div className="card shadow-sm border-0">
            <div className="card-header bg-primary text-white">
                <h2 className="h4 mb-0">
                    <i className="bi bi-people-fill me-2"></i>
                    Personajes
                </h2>
            </div>

            <div className="card-body">
                {/* Botones de filtro */}
                <div className="mb-4">
                    <div className="btn-group w-100">
                        <button 
                            className={`btn ${filtro === "todos" ? "btn-primary" : "btn-outline-primary"}`}
                            onClick={() => setFiltro("todos")}
                        >
                            Todos
                        </button>
                        <button 
                            className={`btn ${filtro === "zombie" ? "btn-success" : "btn-outline-success"}`}
                            onClick={() => setFiltro("zombie")}
                        >
                            🧟 Zombies
                        </button>
                        <button 
                            className={`btn ${filtro === "robot" ? "btn-info" : "btn-outline-info"}`}
                            onClick={() => setFiltro("robot")}
                        >
                            🤖 Robots
                        </button>
                    </div>
                </div>

                {/* Lista de personajes */}
                {personajes.length === 0 ? (
                    <div className="text-center py-4">
                        <i className="bi bi-emoji-frown display-4 text-muted"></i>
                        <p className="text-muted mt-2 mb-0">No hay personajes</p>
                    </div>
                ) : (
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th>Nombre</th>
                                    <th>Tipo</th>
                                    <th className="text-center">Vida</th>
                                    <th className="text-center">Ataque</th>
                                    <th className="text-center">Defensa</th>
                                    <th className="text-center">Velocidad</th>
                                </tr>
                            </thead>
                            <tbody>
                                {personajes.map((p) => (
                                    <tr key={p.id}>
                                        <td className="fw-semibold">{p.name}</td>
                                        <td>
                                            <span className={`badge bg-${p.type === "zombie" ? "success" : "info"}`}>
                                                {p.type}
                                            </span>
                                        </td>
                                        <td className="text-center text-danger fw-bold">{p.health}</td>
                                        <td className="text-center text-primary fw-bold">{p.attack}</td>
                                        <td className="text-center text-success fw-bold">{p.defense}</td>
                                        <td className="text-center text-warning fw-bold">{p.speed}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    </div>
);
}