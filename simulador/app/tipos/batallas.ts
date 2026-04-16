

import { Personaje } from './personajes';

export interface BattleResult {
    id: number;
    character1Id: number;
    character2Id: number;
    winnerId: number;
    turns: number;
    winner?: Personaje;
}
