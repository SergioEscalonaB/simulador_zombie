"use client";
import { useState, useEffect } from "react";

// El tipo de cada batalla con los personajes completos
type Batalla = {
    id: number;
    turns: number;
    character1: { id: number; name: string; type: string };
    character2: { id: number; name: string; type: string };
    winner:     { id: number; name: string; type: string };
};

export default function HistorialBatallas() {
    const [batallas, setBatallas] = useState<Batalla[]>([]);

    // Carga el historial al entrar
    useEffect(() => {
        fetch("/api/historial")
            .then((res) => res.json())
            .then((data) => setBatallas(data));
    }, []);

    return (
        <div>
            <h2>Historial de Batallas</h2>

            {batallas.length === 0 ? (
                <p>No hay batallas registradas</p>
            ) : (
                <ul>
                    {batallas.map((b) => (
                        <li key={b.id}>
                            <strong>{b.character1.name}</strong> vs <strong>{b.character2.name}</strong>
                            {" → "}
                            El personaje {b.winner.name} ganó en {b.turns} rondas
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}