import { Diretor, DiretorCreate, DiretoresArray, DiretorUpdate } from "@/model/diretor";
import api from "@/server/server";
import { useState } from "react";

export const useDiretorHook = () => {
    const [diretor, setDiretor ] = useState<Diretor | null> (null);
    const [diretores, setDiretores] = useState<DiretoresArray | null>(null);

    const criarDiretor = async (Diretor: DiretorCreate): Promise<void> => {
        const response = await api.post('criar', Diretor);
        return response.data;
    };

    const editarDiretor = async ( Diretor: DiretorUpdate): Promise<DiretorUpdate> => {
        const response = await api.put(`editar/${Diretor.id}`, Diretor);
        return response.data;
    }

    const deletarDiretor = async (DiretorId: string): Promise<void> => {
        const response = await api.delete(`deletar/${DiretorId}`);
        return response.data;
    }

    const listarDiretores = async () => {
        const response = await api.get(`listar`);
        if (response.data) {
            setDiretores(response.data);
        }
    }

    const selecionarDiretor = async (diretorId: string) => {
        const response = await api.get(`ator/listar/${diretorId}`);
        if (response.data) {
            setDiretor(response.data);
        }
    }

    return {criarDiretor, deletarDiretor, editarDiretor, listarDiretores, selecionarDiretor,diretor, diretores}
}