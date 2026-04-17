import Link from "next/link";
import FormularioPersonaje from "./components/FormularioPersonaje";
import ListaPersonajes from "./components/ListaPersonajes";

export default function Pagina() {
  return (
    <main className="container mt-4">
      <div className="text-center mb-4">
        <h1 className="display-5 fw-bold">
          🧟 Zombies vs Robots 🤖
        </h1>
        <p className="text-muted">Crea personajes y enfréntalos en batallas épicas</p>
      </div>

      <hr className="mb-4" />

      <section className="mb-5">
        <h2 className="h3 mb-3">
          <i className="bi bi-plus-circle-fill text-success me-2"></i>
          Crear Personaje
        </h2>
        <FormularioPersonaje />
      </section>

      <hr className="mb-4" />

      <section className="mb-4">
        <div className="d-flex justify-content-left gap-3 mb-3">
          <h2 className="h3 mb-0">
            <i className="bi bi-trophy-fill text-warning me-2"></i>
            Batallar
          </h2>
          <Link href="/batalla" className="btn btn-danger">
            <i className="bi bi-crosshair me-2"></i>
            Ir a la Batalla
          </Link>
        </div>
      </section>

      <section>
        <h2 className="h3 mb-3">
          <i className="bi bi-people-fill text-primary me-2"></i>
          Lista de Personajes
        </h2>
        <ListaPersonajes />
      </section>
    </main>
  );
}