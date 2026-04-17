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
    <div className="container mt-4">
        {/* Tarjeta principal */}
        <div className="card shadow-sm border-0">
            <div className="card-header bg-primary text-white py-3">
                <h2 className="h4 mb-0">
                    <i className="bi bi-trophy-fill me-2"></i>
                    Historial de Batallas
                </h2>
            </div>
            
            <div className="card-body">
                {batallas.length === 0 ? (
                    <div className="text-center py-5">
                        <i className="bi bi-emoji-frown display-1 text-muted"></i>
                        <p className="text-muted mt-3 mb-0">No hay batallas registradas</p>
                    </div>
                ) : (
                    <>
                        {/* Badge con el total */}
                        <div className="mb-3">
                            <span className="badge bg-secondary rounded-pill">
                                Total: {batallas.length} batalla{batallas.length !== 1 ? 's' : ''}
                            </span>
                        </div>
                        
                        {/* Lista de batallas */}
                        <div className="list-group">
                            {batallas.map((b, index) => (
                                <div key={b.id} className="list-group-item list-group-item-action">
                                    <div className="row align-items-center">
                                        {/* VS indicator */}
                                        <div className="col-auto">
                                            <span className="badge bg-secondary rounded-circle p-2">
                                                {index + 1}
                                            </span>
                                        </div>
                                        
                                        {/* Characters */}
                                        <div className="col">
                                            <div className="d-flex align-items-center justify-content-start gap-3">
                                                <strong className="text-primary h5 mb-0">
                                                    {b.character1.name}
                                                </strong>
                                                <span className="text-muted fw-bold">VS</span>
                                                <strong className="text-danger h5 mb-0">
                                                    {b.character2.name}
                                                </strong>
                                            </div>
                                        </div>
                                        
                                        {/* Result */}
                                        <div className="col-auto">
                                            <div className="text-end">
                                                <div className="d-flex align-items-center gap-2">
                                                    <i className="bi bi-trophy text-warning"></i>
                                                    <span>
                                                        <span className="fw-semibold">{b.winner.name}</span>
                                                        <span className="text-muted mx-1">ganó en</span>
                                                        <span className="badge bg-success">
                                                            {b.turns} ronda{b.turns !== 1 ? 's' : ''}
                                                        </span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    </div>
);
}