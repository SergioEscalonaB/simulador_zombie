"use client";
import { useState, useEffect } from "react";
import { useBatallaStore } from "@/store/batallaStore";
import { Historial } from "../tipos/historial";


export default function HistorialBatallas() {
    const [batallas, setBatallas] = useState<Historial[]>([]);

    // Escuchamos al contador global de zustand
    const actualizar = useBatallaStore((state) => state.actualizar)
    
    // Carga el historial al entrar
    useEffect(() => {
        fetch("/api/historial")
            .then((res) => res.json())
            .then((data) => setBatallas(data));
    }, [actualizar]);

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