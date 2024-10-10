import { Classe, ClasseCreate, ClassesArray, ClasseUpdate } from "@/model/classe";
import api from "@/server/server";
import { useState } from "react";

export const useClasseHook = () => {
    const [classe, setClasse] = useState<Classe | null>(null);
    const [classes, setClassees] = useState<ClassesArray | null>(null);

    const criarClasse = async (Classe: ClasseCreate): Promise<void> => {
        const response = await api.post('criar', Classe);
        return response.data;
    };

    const editarClasse = async ( Classe: ClasseUpdate): Promise<ClasseUpdate> => {
        const response = await api.put(`editar/${Classe.id}`, Classe);
        return response.data;
    }

    const deletarClasse = async (ClasseId: string): Promise<void> => {
        const response = await api.delete(`deletar/${ClasseId}`);
        return response.data;
    }

    const listarClasses = async () => {
        const response = await api.get(`listar`);
        if (response.data) {
            setClassees(response.data);
        }
    }

    const selecionarClasse = async (classeId: string) => {
        const response = await api.get(`ator/listar/${classeId}`);
        if (response.data) {
            setClasse(response.data);
        }
    }

    return {criarClasse, deletarClasse, editarClasse, listarClasses, classe, classes, selecionarClasse}
}