import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

// Obtenemos el historial de batallas con los personajes completos
export async function GET() {
    const batallas = await prisma.battle.findMany({
        include: {
            character1: true,
            character2: true,
            winner: true,
        },
        orderBy: {
            id: "desc",
        },
    });
    return Response.json(batallas);
}
