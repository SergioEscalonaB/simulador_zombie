import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

// Conexión a Supabase via Prisma
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

// Creando nuevos personajes
export async function POST(req: Request) {
  const body = await req.json();
  const { name, type, health, attack, defense, speed } = body;

  const personaje = await prisma.character.create({
    data: { name, type, health, attack, defense, speed }
  });

  return Response.json(personaje);
}

// Obteniendo todos los personajes o filtrando por tipo
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");

  let personajes;
  if (type) {
    personajes = await prisma.character.findMany({
      where: { type }
    });
  } else {
    personajes = await prisma.character.findMany();
  }

  return Response.json(personajes);
}

