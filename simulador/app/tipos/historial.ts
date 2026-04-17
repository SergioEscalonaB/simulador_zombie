
export interface Historial {
    id: number;
    turns: number;
    character1: { id: number; name: string; type: string };
    character2: { id: number; name: string; type: string };
    winner:     { id: number; name: string; type: string };
}