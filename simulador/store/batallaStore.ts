import { create } from "zustand";

// Definimos que va a tener el estado global
type BatallaStore = {
    actualizar: number;                  // contador de batallas
    incrementarActualizar: () => void;   // función para avisar que hubo batalla
};

export const useBatallaStore = create<BatallaStore>((set) => ({
    actualizar: 0,

    // Cada vez que se llama, suma 1 al contador
    incrementarActualizar: () => set((state) => ({ 
        actualizar: state.actualizar + 1 
    })),
}));