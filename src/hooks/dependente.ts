import { Dependente, DependenteCreate, DependentesArray, DependenteUpdate } from "@/model/dependente";
import api from "@/server/server";
import { useState } from "react"

export const useDependenteHook = () => {
    const [dependente, setDependente] = useState<Dependente | null>(null);
    const [dependentes, setDependentes] = useState<DependentesArray | null>(null);

    const criarDependente = async (dependente: DependenteCreate): Promise<Dependente> => {
        const response = await api.post('dependente/criar', dependente);
        return response.data;
    };

    const editarDependente = async ( dependente: DependenteUpdate): Promise<DependenteUpdate> => {
        const response = await api.put(`dependente/editar`, dependente);
        return response.data;
    }

    const deletarDependente = async (dependenteId: number): Promise<void> => {
        const response = await api.delete(`dependente/deletar/${dependenteId}`);
        return response.data;
    }

    const listarDependentes = async () => {
        const response = await api.get(`dependente/listar`);
        if (response.data) {
            setDependentes(response.data);
        }
    }

    const selecionarDependente = async (dependenteId: number) => {
        const response = await api.get(`dependente/listar/${dependenteId}`);
        if (response.data) {
            setDependente(response.data);
        }
    }

    const ativarDependente = async (dependente: DependenteUpdate): Promise<void> => {
        const response = await api.put(`dependente/ativar`, dependente);
        return response.data;
    }

    const desativarDependente = async (dependente: DependenteUpdate): Promise<void> => {
        const response = await api.put(`dependente/desativar`, dependente);
        return response.data;
    }

    return {criarDependente, deletarDependente, editarDependente, listarDependentes, selecionarDependente, ativarDependente, desativarDependente, dependentes, dependente}
}