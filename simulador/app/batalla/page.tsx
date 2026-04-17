import HistorialBatallas from "../components/HistorialBatallas";
import SimuladorBatalla from "../components/SimuladorBatalla";

export default function PaginaBatalla() {
  return (
    <main>
      <h1>Simulador de Batalla</h1>
      <SimuladorBatalla />
      <hr />
      <HistorialBatallas />
    </main>
  );
}