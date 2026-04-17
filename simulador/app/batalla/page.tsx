import SimuladorBatalla from "../components/SimuladorBatalla";
import HistorialBatallas from "../components/HistorialBatallas";
import Link from "next/link";

export default function PaginaBatalla() {
    return (
        <main className="container mt-4">
            <div className="text-center mb-4">
                <h1 className="display-5 fw-bold">
                    ⚔️ Simulador de Batalla 🛡️
                </h1>
                <p className="text-muted">Selecciona dos personajes y enfréntalos</p>
            </div>

            <section className="mb-5">
                <SimuladorBatalla />
            </section>

            <hr className="mb-4" />

            <section className="mb-4">
                <div className="d-flex align-items-center gap-3 mb-3">
                    <h2 className="h3 mb-0">
                        <i className="bi bi-house-door-fill text-primary me-2"></i>
                        Inicio
                    </h2>
                    <Link href="/" className="btn btn-outline-primary">
                        <i className="bi bi-arrow-left me-2"></i>
                        Ir al Inicio
                    </Link>
                </div>
            </section>

            <section>
                <div className="d-flex align-items-center gap-3 mb-3">
                    <h2 className="h3 mb-0">
                        <i className="bi bi-clock-history text-info me-2"></i>
                        Historial
                    </h2>
                </div>
                <HistorialBatallas />
            </section>
        </main>
    );
}