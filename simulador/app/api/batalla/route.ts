import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

export async function POST(req: Request) {
    const { character1Id, character2Id } = await req.json();

    // Obtener los personajes desde la base de datos
    const character1 = await prisma.character.findUnique({ where: { id: character1Id } });
    const character2 = await prisma.character.findUnique({ where: { id: character2Id } });

    // Validar que ambos personajes existan
    if (!character1 || !character2) {
        return Response.json({ error: "Uno o ambos personajes no existen" }, { status: 404 });
    }

    // Simular la batalla
    const winner = BatallaAleatoria(character1, character2);

    // Guardar el resultado de la batalla en la base de datos
    const battleResult = await prisma.battle.create({
        data: {
            character1Id,
            character2Id,
            winnerId: winner.id,
            turns: 2
        }
    });

    return Response.json({...battleResult,winner});
}

function BatallaAleatoria(character1: any, character2: any) {
    // Ganador aleatorio para probar
    const randomWinner = Math.random() < 0.5 ? character1 : character2;
    return randomWinner;
}

