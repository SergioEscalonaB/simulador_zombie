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
    <div>
      <h2>Personajes</h2>

      {/* Botones de filtro */}
      <div>
        <button onClick={() => setFiltro("todos")}>Todos</button>
        <button onClick={() => setFiltro("zombie")}>Zombies</button>
        <button onClick={() => setFiltro("robot")}>Robots</button>
      </div>

      {/* Lista de personajes */}
      {personajes.length === 0 ? (
        <p>No hay personajes</p>
      ) : (
        <ul>
          {personajes.map((p) => (
            <li key={p.id}>
              <strong>{p.name}</strong> — {p.type} |
              Vida:{p.health} Ataque:{p.attack} Defensa:{p.defense} Velocidad:{p.speed}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}