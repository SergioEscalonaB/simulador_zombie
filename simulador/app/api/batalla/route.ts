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
    const { winner, turns } = simularBatalla(character1, character2);

    // Guardar el resultado de la batalla en la base de datos
    const battleResult = await prisma.battle.create({
        data: {
            character1Id,
            character2Id,
            winnerId: winner.id,
            turns,
        }
    });

    return Response.json({...battleResult,winner});
}

function BatallaAleatoria(character1: any, character2: any) {
    // Ganador aleatorio para probar
    const randomWinner = Math.random() < 0.5 ? character1 : character2;
    return randomWinner;
}

function simularBatalla(character1: any, character2: any) {
    // Con esto no modificamos los datos originales de los personajes, solo trabajamos con copias de sus puntos de vida
    let vida1 = character1.health;
    let vida2 = character2.health;
    let turns = 0;

    // El mas rapido ataca primero
    // Si tienen igual velocidad, ataca character1
    const [primero, segundo] = character1.speed >= character2.speed ? [character1, character2] : [character2, character1];
    let primeraVida = character1.speed >= character2.speed ? vida1 : vida2;
    let segundaVida = character1.speed >= character2.speed ? vida2 : vida1;

    while (primeraVida > 0 && segundaVida > 0) {

        turns++; // cuenta el turno RONDASSSSS

        // Turno del primero, este le pega al segundo
        const golpe1 = Math.max(1, primero.attack - segundo.defense * 0.5);
        segundaVida -= golpe1;
        
        // Verificamos si el segundo ya estiro la pata
        if (segundaVida <= 0) break;

        // Turno del segundo, este le pega al primero
        const golpe2 = Math.max(1, segundo.attack - primero.defense * 0.5);
        primeraVida -= golpe2;
    }

    // El ganador es quien quedo con vida
    const winner = primeraVida > 0 ? primero : segundo;

    return { winner, turns };
}