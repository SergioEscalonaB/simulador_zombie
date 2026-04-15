import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

// Conexión a Supabase via Prisma
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

// 
export async function POST(req: Request) {
  const body = await req.json();
  const { name, type, health, attack, defense, speed } = body;

  const personaje = await prisma.character.create({
    data: { name, type, health, attack, defense, speed }
  });

  return Response.json(personaje);
}