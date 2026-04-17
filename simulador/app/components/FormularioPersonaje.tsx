"use client"; 
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FormularioPersonaje() {
  const router = useRouter();

  // Un estado por cada campo del formulario
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState("zombie");
  const [vida, setVida] = useState(100);
  const [ataque, setAtaque] = useState(10);
  const [defensa, setDefensa] = useState(5);
  const [velocidad, setVelocidad] = useState(5);

  async function handleSubmit() {
    // Envía los datos al route.ts que creamos
    const res = await fetch("/api/personajes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: nombre,
        type: tipo,
        health: vida,
        attack: ataque,
        defense: defensa,
        speed: velocidad,
      }),
    });

    if (res.ok) {
      alert("Personaje creado!");
      // Limpia el formulario
      setNombre("");
      setTipo("zombie");
      setVida(100);
      setAtaque(10);
      setDefensa(5);
      setVelocidad(5);
      // Refresca la página
      router.refresh();
    } else {
      alert("Error al crear personaje");
    }
  }

  return (
    <div className="card shadow-sm">
        <div className="card-header bg-success text-white py-2">
            <h5 className="mb-0">
                <i className="bi bi-person-plus-fill me-2"></i>
                Crear Personaje
            </h5>
        </div>

        <div className="card-body py-3">
            <form onSubmit={handleSubmit}>
                <div className="row g-2">
                    <div className="col-md-4">
                        <label className="small text-muted mb-1 d-block">Nombre</label>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            placeholder="Ej: Juancho"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                        />
                    </div>

                    <div className="col-md-4">
                        <label className="small text-muted mb-1 d-block">Tipo</label>
                        <select 
                            className="form-select form-select-sm"
                            value={tipo} 
                            onChange={(e) => setTipo(e.target.value)}
                        >
                            <option value="zombie">🧟 Zombie</option>
                            <option value="robot">🤖 Robot</option>
                        </select>
                    </div>

                    <div className="col-md-1">
                        <label className="small text-muted mb-1 d-block">❤️ Vida</label>
                        <input
                            type="number"
                            className="form-control form-control-sm"
                            placeholder="100"
                            value={vida}
                            onChange={(e) => setVida(Number(e.target.value))}
                            required
                            min="1"
                        />
                    </div>

                    <div className="col-md-1">
                        <label className="small text-muted mb-1 d-block">⚔️ Ataque</label>
                        <input
                            type="number"
                            className="form-control form-control-sm"
                            placeholder="50"
                            value={ataque}
                            onChange={(e) => setAtaque(Number(e.target.value))}
                            required
                            min="1"
                        />
                    </div>

                    <div className="col-md-1">
                        <label className="small text-muted mb-1 d-block">🛡️ Defensa</label>
                        <input
                            type="number"
                            className="form-control form-control-sm"
                            placeholder="30"
                            value={defensa}
                            onChange={(e) => setDefensa(Number(e.target.value))}
                            required
                            min="1"
                        />
                    </div>

                    <div className="col-md-1">
                        <label className="small text-muted mb-1 d-block">⚡ Velocidad</label>
                        <input
                            type="number"
                            className="form-control form-control-sm"
                            placeholder="20"
                            value={velocidad}
                            onChange={(e) => setVelocidad(Number(e.target.value))}
                            required
                            min="1"
                        />
                    </div>

                    <div className="col-12 mt-2">
                        <button type="submit" className="btn btn-success btn-sm w-100">
                            <i className="bi bi-plus-circle me-1"></i>
                            Crear Personaje
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
);
}