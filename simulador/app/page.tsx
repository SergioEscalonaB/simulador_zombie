import Link from "next/link";
import FormularioPersonaje from "./components/FormularioPersonaje";
import ListaPersonajes from "./components/ListaPersonajes";

export default function Pagina() {
  return (
    <main>
      <h1>Zombies vs Robots</h1>
      <hr />
      <FormularioPersonaje />
      <hr />
      <h1>Batallar</h1>
      <Link href="/batalla">Ir a la Batalla</Link>
      <ListaPersonajes />
    </main>
  );
}