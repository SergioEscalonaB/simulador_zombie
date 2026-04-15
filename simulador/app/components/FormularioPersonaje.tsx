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
    <div>
      <h2>Crear Personaje</h2>

      <div>
        <label>Nombre</label>
        <input
          type="text"
          placeholder="Nombre del personaje"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>

      <div>
        <label>Tipo</label>
        <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option value="zombie">Zombie</option>
          <option value="robot">Robot</option>
        </select>
      </div>

      <div>
        <label>Vida</label>
        <input
          type="number"
          value={vida}
          onChange={(e) => setVida(Number(e.target.value))}
        />
      </div>

      <div>
        <label>Ataque</label>
        <input
          type="number"
          value={ataque}
          onChange={(e) => setAtaque(Number(e.target.value))}
        />
      </div>

      <div>
        <label>Defensa</label>
        <input
          type="number"
          value={defensa}
          onChange={(e) => setDefensa(Number(e.target.value))}
        />
      </div>

      <div>
        <label>Velocidad</label>
        <input
          type="number"
          value={velocidad}
          onChange={(e) => setVelocidad(Number(e.target.value))}
        />
      </div>

      <button onClick={handleSubmit}>Crear Personaje</button>
    </div>
  );
}