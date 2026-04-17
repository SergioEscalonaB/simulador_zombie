import SimuladorBatalla from "../components/SimuladorBatalla";
import HistorialBatallas from "../components/HistorialBatallas";
import Link from "next/link";

export default function PaginaBatalla() {
    return (
        <main>
            <h1>Simulador de Batalla</h1>
            <SimuladorBatalla/>
            <hr />
            <h1>Inicio</h1>
            <Link href="/">Ir al Inicio</Link>
            <HistorialBatallas/>
        </main>
    );
}