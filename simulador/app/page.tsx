import FormularioPersonaje from "./components/FormularioPersonaje";
import ListaPersonajes from "./components/ListaPersonajes";

export default function Pagina() {
  return (
    <main>
      <h1>Zombies vs Robots</h1>
      <FormularioPersonaje />
      <hr />
      <ListaPersonajes />
    </main>
  );
}